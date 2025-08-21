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
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const connection = await createConnection()
    
    try {
      // Check if user exists by email
      const [rows] = await connection.execute(
        'SELECT id, email, pricing_tier FROM users WHERE email = ?',
        [email]
      )

      const userExists = Array.isArray(rows) && rows.length > 0
      
      return NextResponse.json({
        success: true,
        exists: userExists,
        user: userExists ? rows[0] : null
      })

    } finally {
      await connection.end()
    }

  } catch (error) {
    console.error('User check error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
