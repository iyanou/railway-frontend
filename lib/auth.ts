/**
 * Authentication utilities for server-side use
 * Mock implementation for Railway deployment
 */

// Mock session for demo
const mockSession = {
  user: {
    id: 1,
    email: 'demo@elasticdoctor.com',
    name: 'Demo User',
    pricingTier: 'developer'
  }
}

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

// Mock authentication functions
export async function getCurrentUser() {
  // Return mock user for demo
  return {
    id: 1,
    email: 'demo@elasticdoctor.com',
    name: 'Demo User',
    pricing_tier: 'developer'
  }
}

export async function getServerAuth() {
  return mockSession
}

export async function requireAuth() {
  return mockSession
}

export function hasPermission(session: any, requiredTier: 'developer' | 'professional'): boolean {
  if (!session) return false
  
  const userTier = session.user?.pricingTier || 'developer'
  
  if (requiredTier === 'developer') {
    return userTier === 'developer' || userTier === 'professional'
  }
  
  if (requiredTier === 'professional') {
    return userTier === 'professional'
  }
  
  return false
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
