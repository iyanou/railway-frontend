'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/nextAuth'
import { getSession, signOut } from 'next-auth/react'
import { 
  Crown, 
  Check, 
  ArrowRight, 
  Loader2, 
  AlertTriangle,
  Sparkles,
  BarChart3,
  Download,
  Shield,
  Zap,
  Users,
  Clock,
  Database,
  Activity,
  Star,
  ChevronRight,
  Heart,
  Target,
  Rocket,
  TrendingUp,
  Lock,
  Unlock
} from 'lucide-react'
import Navbar from '../../components/Navbar'

const UpgradePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [upgrading, setUpgrading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Redirect if not authenticated or already professional
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?callbackUrl=/upgrade')
    } else if (!isLoading && user?.pricingTier === 'professional') {
      router.push('/dashboard')
    }
  }, [isLoading, isAuthenticated, user, router])

  const handleUpgrade = async () => {
    if (!user) {
      console.log('❌ No user found for upgrade')
      setError('User not found. Please try logging in again.')
      return
    }
    
    console.log('🔄 Starting upgrade process for user:', {
      id: user.id,
      email: user.email,
      currentTier: user.pricingTier
    })
    
    setUpgrading(true)
    setError('')

    try {
      // Call upgrade API
      const response = await fetch('/api/upgrade-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          newPlan: 'professional'
        })
      })

      console.log('📡 Upgrade API response status:', response.status)
      const result = await response.json()
      console.log('📄 Upgrade API result:', result)

      if (result.success) {
        console.log('✅ Upgrade successful!')
        
        // Sign out and redirect directly to login with success message
        console.log('🔄 Signing out and redirecting to login...')
        
        try {
          // Sign out the user to clear the session
          await signOut({ 
            redirect: false // Don't auto-redirect, we'll handle it
          })
          
          console.log('✅ User signed out, redirecting to login...')
          // Redirect directly to login with upgrade success parameters
          window.location.href = '/login?upgraded=true&message=upgrade_success'
          
        } catch (signOutError) {
          console.error('Sign out error:', signOutError)
          // Fallback: force redirect anyway
          window.location.href = '/login?upgraded=true&message=upgrade_success'
        }
      } else {
        console.log('❌ Upgrade failed:', result.error)
        setError(result.error || 'Upgrade failed. Please try again.')
      }
    } catch (error) {
      console.error('💥 Upgrade error:', error)
      setError('Failed to upgrade. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated or already professional (redirects will handle)
  if (!isAuthenticated || user?.pricingTier === 'professional') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-3 mb-8 shadow-lg">
              <Crown className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-bold">Upgrade to Professional</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ready to scale up,
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> {user?.name?.split(' ')[0]}?</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get 10x more daily diagnoses, advanced analytics, and enterprise-grade monitoring. 
              <strong className="text-gray-900">Everything you need to monitor production clusters.</strong>
            </p>
            
            {/* Value Props Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">10x</div>
                <div className="text-gray-700 font-medium">More diagnoses daily</div>
                <div className="text-sm text-gray-500 mt-1">50 vs 5 on free plan</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-indigo-600 mb-2">22+</div>
                <div className="text-gray-700 font-medium">Advanced health checks</div>
                <div className="text-sm text-gray-500 mt-1">vs 8 basic checks</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">4x</div>
                <div className="text-gray-700 font-medium">Longer data retention</div>
                <div className="text-sm text-gray-500 mt-1">30 vs 7 days</div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 max-w-lg mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-bold text-white">+</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong className="text-green-700">Join 500+</strong> teams already using Professional
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">Trusted by DevOps teams worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Current Plan */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  Current Plan
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Developer</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">Free</div>
                <p className="text-gray-500">Perfect for getting started</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-700">5 daily diagnoses</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-700">8 basic health checks</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-700">7-day data retention</span>
                </div>
                <div className="flex items-center">
                  <Lock className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-400">Advanced analytics</span>
                </div>
                <div className="flex items-center">
                  <Lock className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-400">Report downloads</span>
                </div>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl border-2 border-blue-200 p-8 relative overflow-visible transform hover:scale-105 transition-all duration-300">
              
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center whitespace-nowrap">
                  <Star className="w-3 h-3 mr-1" />
                  RECOMMENDED
                </div>
              </div>
              
              <div className="pt-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">$39</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <p className="text-gray-600">For growing teams and production workloads</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">50 daily diagnoses</span>
                    <span className="ml-auto text-blue-600 text-sm font-bold bg-blue-100 px-2 py-1 rounded-full">+45</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">22+ comprehensive checks</span>
                    <span className="ml-auto text-blue-600 text-sm font-bold bg-blue-100 px-2 py-1 rounded-full">+14</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">30-day retention</span>
                    <span className="ml-auto text-blue-600 text-sm font-bold bg-blue-100 px-2 py-1 rounded-full">+23</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Unlock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Advanced analytics dashboard</span>
                    <span className="ml-auto text-emerald-600 text-sm font-bold bg-emerald-100 px-2 py-1 rounded-full">NEW</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Unlock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Download detailed reports</span>
                    <span className="ml-auto text-emerald-600 text-sm font-bold bg-emerald-100 px-2 py-1 rounded-full">NEW</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Unlock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Priority support</span>
                    <span className="ml-auto text-emerald-600 text-sm font-bold bg-emerald-100 px-2 py-1 rounded-full">NEW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Section */}
          <div className="mb-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why teams choose Professional</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Save hours of debugging time and prevent costly downtime with proactive monitoring</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">90%</div>
                <div className="text-gray-600 font-medium">Faster issue detection</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">5hrs</div>
                <div className="text-gray-600 font-medium">Saved per week</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Uptime achieved</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">85%</div>
                <div className="text-gray-600 font-medium">Issues prevented</div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-red-800 font-medium">Upgrade Failed</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Upgrade Section */}
          <div className="text-center">
            <div className="max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to upgrade your monitoring?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Join hundreds of teams already using Professional to prevent downtime and optimize performance.
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
              >
                {upgrading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    <span>Processing upgrade...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6 mr-3 group-hover:-translate-y-1 transition-transform duration-300" />
                    <span>Upgrade Now - $39/month</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium">Secure billing</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-medium">Instant access</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-emerald-500" />
                  <span className="font-medium">Cancel anytime</span>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm">
                Questions about the upgrade? 
                <a href="mailto:support@elasticdoctor.com" className="text-blue-600 hover:text-blue-700 font-medium underline">
                  Chat with our team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradePage