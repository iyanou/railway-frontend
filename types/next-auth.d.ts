import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: number
      pricingTier?: string
      emailVerified?: boolean
      needsRegistration?: boolean
      googleId?: string
      isNewUser?: boolean
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id?: number
    pricingTier?: string
    emailVerified?: boolean
    needsRegistration?: boolean
    googleId?: string
    isNewUser?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId?: number
    pricingTier?: string
    emailVerified?: boolean
    needsRegistration?: boolean
    googleId?: string
    userEmail?: string
    userName?: string
    userImage?: string
    isNewUser?: boolean
  }
}
