import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Fixing demo user passwords...')
    
    // Generate correct hash for demo123
    const correctHash = await bcrypt.hash('demo123', 12)
    console.log('✅ Generated correct hash for demo123')
    
    // Update both demo users with correct hash
    const result = await query(
      `UPDATE users SET password_hash = ? WHERE email IN ('demo_dev@elasticdoctor.com', 'demo_pro@elasticdoctor.com')`,
      [correctHash]
    )
    
    console.log(`✅ Updated ${result.affectedRows} users`)
    
    // Test the fix immediately
    const testUser = await query('SELECT password_hash FROM users WHERE email = ?', ['demo_dev@elasticdoctor.com'])
    
    if (testUser.length > 0) {
      const verificationTest = await bcrypt.compare('demo123', testUser[0].password_hash)
      console.log('🔍 Verification test:', verificationTest ? 'PASS' : 'FAIL')
      
      return NextResponse.json({
        success: true,
        message: 'Demo user passwords fixed successfully',
        affectedRows: result.affectedRows,
        verificationTest: verificationTest ? 'PASS' : 'FAIL',
        newHash: correctHash
      })
    } else {
      throw new Error('Demo user not found after update')
    }
    
  } catch (error) {
    console.error('❌ Failed to fix demo users:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
