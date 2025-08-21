import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../[...nextauth]/route'
import mysql from 'mysql2/promise'

// Database connection helper
const createConnection = async () => {
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'elasticdoctor',
    password: process.env.DB_PASSWORD || 'elastic-1905Bis-doctor9420',
    database: process.env.DB_NAME || 'elasticdoctor',
    port: parseInt(process.env.DB_PORT || '3306'),
    connectTimeout: 15000,
    acquireTimeout: 15000,
    timeout: 15000,
    reconnect: true,
    idleTimeout: 300000,
  }
  
  try {
    console.log('Delete Account API: Attempting to connect to database')
    const connection = await mysql.createConnection(connectionConfig)
    console.log('Delete Account API: Database connection successful')
    return connection
  } catch (error) {
    console.error('Delete Account API: Database connection failed:', error)
    throw new Error('Database connection failed')
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }

    const { confirmDelete } = await request.json()
    
    if (!confirmDelete) {
      return NextResponse.json({
        success: false,
        error: 'Confirmation required'
      }, { status: 400 })
    }

    console.log('🗑️ Processing account deletion for:', session.user.email)

    // Get database connection
    const connection = await createConnection()

    try {
      // Start transaction
      await connection.beginTransaction()

      // Instead of deleting, we'll just mark the account as inactive
      // This preserves data integrity and allows for account recovery
      const [result] = await connection.execute(
        'UPDATE users SET is_active = FALSE, updated_at = NOW() WHERE email = ?',
        [session.user.email]
      ) as any

      if (result.affectedRows === 0) {
        await connection.rollback()
        await connection.end()
        return NextResponse.json({
          success: false,
          error: 'User not found'
        }, { status: 404 })
      }

      // Optionally, you could also soft delete diagnosis data
      // For now, we'll keep it for data retention policies
      
      // Commit transaction
      await connection.commit()
      await connection.end()

      console.log('✅ Account successfully marked as inactive for:', session.user.email)

      return NextResponse.json({
        success: true,
        message: 'Account has been deactivated successfully'
      })

    } catch (dbError) {
      await connection.rollback()
      await connection.end()
      console.error('❌ Database error during account deletion:', dbError)
      throw dbError
    }

  } catch (error) {
    console.error('❌ Account deletion failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Account deletion failed'
    }, { status: 500 })
  }
}
