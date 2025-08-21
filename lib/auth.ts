/**
 * NextAuth-based authentication utilities for server-side use
 */

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Session } from 'next-auth'

// Pricing tier configuration
export const PRICING_TIERS = {
  developer: {
    name: 'Developer',
    price: 0,
    active_cluster_limit: 2,
    max_nodes_per_cluster: 5,
    diagnoses_per_day_limit: 5,
    data_retention_days: 7,
  },
  professional: {
    name: 'Professional',
    price: 39,
    active_cluster_limit: 15,
    max_nodes_per_cluster: 25,
    diagnoses_per_day_limit: 50,
    data_retention_days: 30,
  }
}

export function getTierConfig(tier: string) {
  return PRICING_TIERS[tier as keyof typeof PRICING_TIERS] || PRICING_TIERS.developer
}

// Server-side authentication utilities
export async function getServerAuth() {
  return await getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getServerAuth()
  if (!session) {
    throw new Error('Authentication required')
  }
  return session
}

export function hasPermission(session: Session | null, requiredTier: 'developer' | 'professional'): boolean {
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

// Email validation (still useful for forms)
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
