import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// Database connection with timeout and retry logic
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
    console.log('Attempting to connect to database at:', connectionConfig.host + ':' + connectionConfig.port)
    const connection = await mysql.createConnection(connectionConfig)
    console.log('Database connection successful')
    return connection
  } catch (error) {
    console.error('Database connection failed:', error)
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

// Database operations
const dbOperations = {
  async findUserByEmail(email: string) {
    const connection = await createConnection()
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      )
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    } finally {
      await connection.end()
    }
  },

  async createGoogleUser(userData: any) {
    const connection = await createConnection()
    try {
      const [result] = await connection.execute(
        `INSERT INTO users (
          google_id, email, name, given_name, family_name, 
          profile_picture_url, email_verified, pricing_tier
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userData.google_id,
          userData.email,
          userData.name,
          userData.given_name,
          userData.family_name,
          userData.profile_picture_url,
          true, // Google emails are verified
          userData.pricing_tier || 'developer'
        ]
      )
      
      // Get the created user
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [(result as any).insertId]
      )
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    } finally {
      await connection.end()
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { googleData, selectedPlan = 'developer' } = body

    if (!googleData || !googleData.email || !googleData.id) {
      return NextResponse.json(
        { success: false, error: 'Invalid Google user data' },
        { status: 400 }
      )
    }

    // Check if user already exists by email
    let existingUser = await dbOperations.findUserByEmail(googleData.email)
    
    if (existingUser) {
      // User already exists - return specific error for existing users
      console.log('User already exists:', googleData.email)
      return NextResponse.json({
        success: false,
        error: 'USER_ALREADY_EXISTS',
        message: 'An account with this email already exists. Please sign in instead.',
        userEmail: googleData.email
      }, { status: 409 }) // 409 Conflict status
    }

    // Create new user
    const name = googleData.name || ''
    const [firstName, ...lastNameParts] = name.split(' ')
    const lastName = lastNameParts.join(' ')

    try {
      const newUser = await dbOperations.createGoogleUser({
        google_id: googleData.id,
        email: googleData.email,
        name: name,
        given_name: firstName,
        family_name: lastName,
        profile_picture_url: googleData.picture || '',
        pricing_tier: selectedPlan
      })

      if (newUser) {
        console.log('New user created successfully:', newUser.id)
        return NextResponse.json({
          success: true,
          message: 'User registered successfully',
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            pricing_tier: newUser.pricing_tier
          }
        })
      } else {
        return NextResponse.json(
          { success: false, error: 'Failed to create user' },
          { status: 500 }
        )
      }
    } catch (createError: any) {
      // Handle duplicate entry error specifically
      if (createError.code === 'ER_DUP_ENTRY') {
        console.log('Duplicate entry detected for email:', googleData.email)
        return NextResponse.json({
          success: false,
          error: 'USER_ALREADY_EXISTS',
          message: 'An account with this email already exists. Please sign in instead.',
          userEmail: googleData.email
        }, { status: 409 })
      }
      throw createError // Re-throw if not a duplicate entry error
    }

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
