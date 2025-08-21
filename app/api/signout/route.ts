import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('Custom signout route called')
  
  try {
    // Create response with redirect to home
    const response = NextResponse.redirect(new URL('/', request.url))
    
    // Clear all NextAuth cookies
    const cookieNames = [
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      'next-auth.callback-url',
      '__Secure-next-auth.callback-url',
      'next-auth.csrf-token',
      '__Host-next-auth.csrf-token',
      '__Secure-next-auth.csrf-token'
    ]
    
    cookieNames.forEach(cookieName => {
      response.cookies.set({
        name: cookieName,
        value: '',
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
    })
    
    return response
  } catch (error) {
    console.error('Error in custom signout:', error)
    return NextResponse.json({ error: 'Signout failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Also handle GET requests for direct navigation
  return POST(request)
}
