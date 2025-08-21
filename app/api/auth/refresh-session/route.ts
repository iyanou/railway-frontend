import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import mysql from 'mysql2/promise'

// Database connection
const createConnection = async () => {
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'elasticdoctor',
    password: process.env.DB_PASSWORD || 'elastic-1905Bis-doctor9420',
    database: process.env.DB_NAME || 'elasticdoctor',
    port: parseInt(process.env.DB_PORT || '3306'),
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    timeout: 10000, // 10 seconds
    reconnect: true,
    idleTimeout: 300000, // 5 minutes
  }
  
  try {
    const connection = await mysql.createConnection(connectionConfig)
    return connection
  } catch (error) {
    console.error('Database connection failed:', error)
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

export async function POST() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 })
    }

    // Force a session update by checking the database
    const connection = await createConnection()
    
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [session.user.email]
      )
      
      const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null
      
      if (user) {
        console.log('Session refresh - found user in database:', user.id)
        return NextResponse.json({ 
          success: true, 
          message: 'Session refreshed',
          user: {
            id: user.id,
            needsRegistration: false
          }
        })
      } else {
        console.log('Session refresh - user not found in database')
        return NextResponse.json({ 
          success: true, 
          message: 'User needs registration',
          user: {
            needsRegistration: true
          }
        })
      }
    } finally {
      await connection.end()
    }

  } catch (error) {
    console.error('Session refresh error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
