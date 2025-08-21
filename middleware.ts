import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    console.log("Middleware running for:", req.nextUrl.pathname)
    console.log("Token:", req.nextauth.token)
    
    // Skip middleware for register page and dashboard to avoid redirect loops
    if (req.nextUrl.pathname.startsWith('/register') || req.nextUrl.pathname.startsWith('/dashboard')) {
      console.log("Skipping middleware for register/dashboard page")
      return
    }
    
    // Check if user has completed registration (has userId)
    if (!req.nextauth.token?.userId) {
      console.log("User not fully registered, redirecting to login page")
      // Let the login page handle the flow logic
      return NextResponse.redirect(new URL('/login', req.url))
    }
    
    console.log("User authenticated and registered, allowing access")
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access if user has a token (they're authenticated with Google)
        // Additional checks are done in the middleware function above
        return !!token
      }
    },
  }
)

// Protect these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/diagnose/:path*", 
    "/diagnosis/:path*",
    "/history/:path*",
    "/settings/:path*",
    "/analytics/:path*",
    "/api/clusters/:path*"
  ]
}
