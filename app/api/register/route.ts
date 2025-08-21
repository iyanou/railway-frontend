import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// Database connection
const createConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'elasticdoctor',
    password: process.env.DB_PASSWORD || 'elastic-1905Bis-doctor9420',
    database: process.env.DB_NAME || 'elasticdoctor',
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { googleId, email, name, given_name, family_name, profile_picture_url, pricing_tier } = body

    // Validate required fields
    if (!googleId || !email || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const connection = await createConnection()
    
    try {
      // Check if user already exists
      const [existingUsers] = await connection.execute(
        'SELECT * FROM users WHERE google_id = ? OR email = ?',
        [googleId, email]
      )

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        return NextResponse.json(
          { success: false, error: 'User already exists' },
          { status: 409 }
        )
      }

      // Create new user
      const [result] = await connection.execute(
        `INSERT INTO users (
          google_id, email, name, given_name, family_name, 
          profile_picture_url, email_verified, pricing_tier
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          googleId,
          email,
          name,
          given_name || '',
          family_name || '',
          profile_picture_url || '',
          true, // Google emails are verified
          pricing_tier || 'developer'
        ]
      )

      // Get the created user
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [(result as any).insertId]
      )

      const newUser = Array.isArray(rows) && rows.length > 0 ? rows[0] : null

      return NextResponse.json({
        success: true,
        user: newUser,
        message: 'User registered successfully'
      })

    } finally {
      await connection.end()
    }

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    )
  }
}
