import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

export async function POST(request: NextRequest) {
  try {
    console.log('Force refresh requested')
    
    // Get current session
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 })
    }

    console.log('Forcing session refresh for:', session.user.email)
    
    // **FIX 2: Return success without forcing sign out**
    // This allows gentle refresh instead of full re-authentication
    const response = NextResponse.json({ 
      success: true, 
      message: 'Session refresh triggered',
      timestamp: new Date().toISOString()
    })
    
    // **FIX 2: Add cache-busting headers to force session re-evaluation**
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response

  } catch (error) {
    console.error('Force refresh error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// **FIX 2: Add GET endpoint for session refresh**
export async function GET() {
  try {
    console.log('Session refresh check requested')
    
    const response = NextResponse.json({
      success: true,
      message: 'Session refresh endpoint',
      timestamp: new Date().toISOString()
    })
    
    // Add cache-busting headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Session refresh error:', error)
    return NextResponse.json(
      { success: false, error: 'Session refresh failed' },
      { status: 500 }
    )
  }
}
