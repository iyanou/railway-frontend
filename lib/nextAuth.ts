/**
 * NextAuth-based authentication utilities
 * Replaces the old MySQL-based authentication system
 */

import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

export interface User {
  id: number
  email: string
  name?: string
  image?: string
  pricingTier: string
  emailVerified: boolean
}

// Custom hook for authentication with NextAuth
export const useAuth = () => {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  
  const user: User | null = session ? {
    id: session.user.id || 0,
    email: session.user.email || '',
    name: session.user.name || undefined,
    image: session.user.image || undefined,
    pricingTier: session.user.pricingTier || 'developer',
    emailVerified: session.user.emailVerified || false
  } : null

  return {
    user,
    isAuthenticated,
    isLoading,
    session
  }
}

// Helper function to get user from session
export const getUserFromSession = (session: Session | null): User | null => {
  if (!session) return null
  
  return {
    id: session.user.id || 0,
    email: session.user.email || '',
    name: session.user.name || undefined,
    image: session.user.image || undefined,
    pricingTier: session.user.pricingTier || 'developer',
    emailVerified: session.user.emailVerified || false
  }
}

// Authentication check for API routes
export const isUserAuthenticated = (session: Session | null): boolean => {
  return !!session && !!session.user
}

// Check if user has specific pricing tier
export const hasPermission = (session: Session | null, requiredTier: 'developer' | 'professional'): boolean => {
  if (!session) return false
  
  const userTier = session.user.pricingTier
  
  if (requiredTier === 'developer') {
    return userTier === 'developer' || userTier === 'professional'
  }
  
  if (requiredTier === 'professional') {
    return userTier === 'professional'
  }
  
  return false
}
