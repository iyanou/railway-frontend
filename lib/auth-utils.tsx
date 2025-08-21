'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredTier?: 'developer' | 'professional'
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredTier = 'developer',
  redirectTo = '/login' 
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      // No session, redirect to login
      router.push(redirectTo)
      return
    }

    // Check if user has required tier access
    if (requiredTier === 'professional' && session.user?.pricingTier !== 'professional') {
      // User doesn't have professional access, redirect to upgrade
      router.push('/upgrade')
      return
    }
  }, [session, status, router, requiredTier, redirectTo])

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If no session, don't render children (will redirect)
  if (!session) {
    return null
  }

  // Check tier access
  if (requiredTier === 'professional' && session.user?.pricingTier !== 'professional') {
    return null // Will redirect to upgrade
  }

  // All checks passed, render children
  return <>{children}</>
}

export default ProtectedRoute
