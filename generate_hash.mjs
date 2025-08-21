/**
 * Generate correct bcrypt hash for demo123
 */

import bcrypt from 'bcryptjs'

async function generateHash() {
  try {
    console.log('🔐 Generating bcrypt hash for "demo123"...')
    
    const password = 'demo123'
    const hash = await bcrypt.hash(password, 12)
    
    console.log('Password:', password)
    console.log('Generated hash:', hash)
    
    // Test the hash immediately
    const isValid = await bcrypt.compare(password, hash)
    console.log('Verification test:', isValid ? '✅ VALID' : '❌ INVALID')
    
    // Also test the old hash from schema.sql
    const oldHash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBdXinKjkC00NW'
    const oldTest = await bcrypt.compare(password, oldHash)
    console.log('Old hash test:', oldTest ? '✅ VALID' : '❌ INVALID')
    
    console.log('')
    console.log('🔄 Use this SQL to fix the demo users:')
    console.log(`UPDATE users SET password_hash = '${hash}' WHERE email IN ('demo_dev@elasticdoctor.com', 'demo_pro@elasticdoctor.com');`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

generateHash()
