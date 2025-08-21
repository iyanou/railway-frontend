import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import mysql from 'mysql2/promise'
import { authOptions } from '../auth/[...nextauth]/route'

// Database connection
const createConnection = async () => {
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'elasticdoctor',
    password: process.env.DB_PASSWORD || 'elastic-1905Bis-doctor9420',
    database: process.env.DB_NAME || 'elasticdoctor',
    port: parseInt(process.env.DB_PORT || '3306'),
    connectTimeout: 10000,
    acquireTimeout: 10000,
    timeout: 10000,
    reconnect: true,
    idleTimeout: 300000,
  }
  
  try {
    console.log('Connecting to database for plan upgrade...')
    const connection = await mysql.createConnection(connectionConfig)
    console.log('Database connection successful')
    return connection
  } catch (error) {
    console.error('Database connection failed:', error)
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the current session to verify authentication - FIXED: Added authOptions
    const session = await getServerSession(authOptions)
    
    console.log('Upgrade API - Session check:', {
      hasSession: !!session,
      userId: session?.user?.id,
      email: session?.user?.email,
      needsRegistration: session?.user?.needsRegistration
    })
    
    if (!session?.user?.id || session.user?.needsRegistration) {
      console.log('Upgrade API - Authentication failed')
      return NextResponse.json(
        { success: false, error: 'Not authenticated or registration incomplete' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId, newPlan } = body

    console.log('Upgrade API - Request data:', { userId, newPlan, sessionUserId: session.user.id })

    // Verify the user ID matches the session
    if (session.user.id !== userId) {
      console.log('Upgrade API - User ID mismatch')
      return NextResponse.json(
        { success: false, error: 'Unauthorized - user ID mismatch' },
        { status: 403 }
      )
    }

    // Validate the new plan
    if (!['developer', 'professional'].includes(newPlan)) {
      console.log('Upgrade API - Invalid plan:', newPlan)
      return NextResponse.json(
        { success: false, error: 'Invalid plan' },
        { status: 400 }
      )
    }

    const connection = await createConnection()
    
    try {
      // Get current user details
      const [userRows] = await connection.execute(
        'SELECT id, email, pricing_tier FROM users WHERE id = ?',
        [userId]
      )

      if (!Array.isArray(userRows) || userRows.length === 0) {
        console.log('Upgrade API - User not found in database')
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        )
      }

      const user = userRows[0] as any
      console.log(`Upgrading user ${user.email} from ${user.pricing_tier} to ${newPlan}`)

      // Update the user's pricing tier
      const [result] = await connection.execute(
        'UPDATE users SET pricing_tier = ?, updated_at = NOW() WHERE id = ?',
        [newPlan, userId]
      )

      const updateResult = result as any
      if (updateResult.affectedRows === 0) {
        console.log('Upgrade API - Database update failed')
        return NextResponse.json(
          { success: false, error: 'Failed to update user plan' },
          { status: 500 }
        )
      }

      // Get updated user data
      const [updatedRows] = await connection.execute(
        'SELECT id, email, name, pricing_tier FROM users WHERE id = ?',
        [userId]
      )

      const updatedUser = (updatedRows as any[])[0]

      console.log(`✅ Successfully upgraded user ${updatedUser.email} to ${updatedUser.pricing_tier}`)

      return NextResponse.json({
        success: true,
        message: 'Plan upgraded successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          pricing_tier: updatedUser.pricing_tier
        }
      })

    } finally {
      await connection.end()
    }

  } catch (error) {
    console.error('Plan upgrade error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
