// Mock NextAuth route for Railway deployment  
// Simplified version to avoid complex database typing issues

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'

// Mock user for demo
const mockUser = {
  id: 1,
  email: 'demo@elasticdoctor.com',
  name: 'Demo User',
  google_id: 'demo_google_id',
  pricing_tier: 'developer',
  is_active: true,
  email_verified: true,
  profile_picture_url: ''
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Simple redirect logic for demo
      if (url.startsWith(baseUrl)) return url
      return `${baseUrl}/dashboard`
    },
    
    async signIn({ user, account, profile }) {
      // Always allow sign in for demo
      return true
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        // Mock user data for demo
        token.userId = mockUser.id
        token.pricingTier = mockUser.pricing_tier
        token.emailVerified = mockUser.email_verified
        token.needsRegistration = false
      }
      return token
    },

    async session({ session, token }) {
      // Provide mock session data
      if (token.userId) {
        session.user.id = token.userId as number
        session.user.pricingTier = token.pricingTier as string
        session.user.emailVerified = token.emailVerified as boolean
        session.user.needsRegistration = false
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
