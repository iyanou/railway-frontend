import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import mysql from 'mysql2/promise'

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
    const connection = await mysql.createConnection(connectionConfig)
    return connection
  } catch (error) {
    console.error('Database connection failed:', error)
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { plan } = await request.json()
    
    if (!['developer', 'professional'].includes(plan)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan' },
        { status: 400 }
      )
    }

    // Update user's pricing tier
    const connection = await createConnection()
    try {
      await connection.execute(
        'UPDATE users SET pricing_tier = ?, updated_at = NOW() WHERE id = ?',
        [plan, session.user.id]
      )
      
      console.log(`Updated user ${session.user.id} to ${plan} plan`)
      
      return NextResponse.json({
        success: true,
        message: `Successfully updated to ${plan} plan`,
        plan: plan
      })
    } finally {
      await connection.end()
    }
    
  } catch (error) {
    console.error('Plan update error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
