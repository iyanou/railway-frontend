import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email, tier } = await request.json()
    
    if (!email || !tier) {
      return NextResponse.json({
        error: 'Email and tier are required'
      }, { status: 400 })
    }
    
    console.log('🔧 Upgrading user tier:', { email, tier })
    
    // Update user tier
    const result = await query(
      'UPDATE users SET pricing_tier = ? WHERE email = ?',
      [tier, email]
    )
    
    if (result.affectedRows === 0) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }
    
    // Get updated user
    const updatedUser = await query('SELECT id, email, pricing_tier FROM users WHERE email = ?', [email])
    
    return NextResponse.json({
      success: true,
      message: `User ${email} upgraded to ${tier} plan`,
      user: updatedUser[0]
    })
    
  } catch (error) {
    console.error('❌ Failed to upgrade user:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
