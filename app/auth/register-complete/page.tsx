'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'
import Navbar from '../../../components/Navbar'

function RegisterCompleteForm() {
  const [status, setStatus] = useState<'loading' | 'creating' | 'success' | 'error' | 'existing_user'>('loading')
  const [error, setError] = useState('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  
  // Safety timeout to prevent infinite loading
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (status === 'loading' || status === 'creating') {
        console.error('Registration process timed out after 30 seconds')
        setError('Registration is taking longer than expected. Please try again.')
        setStatus('error')
      }
    }, 30000) // 30 second timeout
    
    setTimeoutId(safetyTimeout)
    
    return () => {
      if (safetyTimeout) clearTimeout(safetyTimeout)
    }
  }, [])
  
  // Clear timeout when status changes to success or error
  useEffect(() => {
    if ((status === 'success' || status === 'error' || status === 'existing_user') && timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
  }, [status, timeoutId])
  
  // Get plan and source from URL params OR localStorage
  const getRegistrationDetails = () => {
    const urlPlan = searchParams.get('plan')
    const urlSource = searchParams.get('source')
    
    // Check localStorage for registration intent
    if (typeof window !== 'undefined') {
      const storedIntent = localStorage.getItem('registration_intent')
      if (storedIntent) {
        try {
          const intent = JSON.parse(storedIntent)
          // Use stored intent if URL params are missing and intent is recent (< 10 minutes)
          if ((!urlPlan || !urlSource) && (Date.now() - intent.timestamp < 600000)) {
            return {
              plan: intent.plan || 'developer',
              source: intent.source || 'pricing'
            }
          }
        } catch (e) {
          console.error('Error parsing registration intent:', e)
        }
      }
    }
    
    return {
      plan: urlPlan || 'developer',
      source: urlSource || 'pricing'
    }
  }
  
  const { plan: selectedPlan, source } = getRegistrationDetails()

  useEffect(() => {
    if (sessionStatus === 'loading') return

    if (sessionStatus === 'unauthenticated') {
      // User is not authenticated, redirect to login
      router.push('/login')
      return
    }

    if (sessionStatus === 'authenticated' && session?.user) {
      // User is authenticated but we need to check if they have an account in our DB
      checkAndCreateAccount()
    }
  }, [session, sessionStatus, selectedPlan, source, router])

  const checkAndCreateAccount = async () => {
    try {
      setStatus('creating')
      
      if (!session?.user?.email) {
        setError('No user information available from Google')
        setStatus('error')
        return
      }

      // If user already has an account (user.id exists), redirect them
      if (session.user.id && !session.user.needsRegistration) {
        setStatus('success')
        setTimeout(() => {
          if (source === 'diagnose') {
            router.push('/diagnose')
          } else {
            router.push('/dashboard')
          }
        }, 1000)
        return
      }

      // Get Google ID from the session
      const googleId = session.user.googleId || session.user.id
      
      // Try to create account
      const registerResponse = await fetch('/api/auth/register-google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleData: {
            id: googleId,
            email: session.user.email,
            name: session.user.name || '',
            picture: session.user.image || ''
          },
          selectedPlan: selectedPlan
        })
      })

      const registerResult = await registerResponse.json()

      if (registerResult.success) {
        setStatus('success')
        
        // Clean up registration intent from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('registration_intent')
        }
        
        console.log('New user created, redirecting to dashboard')
        setTimeout(() => {
          if (source === 'diagnose') {
            window.location.href = '/diagnose'
          } else {
            window.location.href = '/dashboard'
          }
        }, 2000)
      } else if (registerResult.error === 'USER_ALREADY_EXISTS') {
        // **NEW: Handle existing user case**
        console.log('User already exists, showing login message')
        setStatus('existing_user')
      } else {
        setError(registerResult.error || 'Failed to create account')
        setStatus('error')
      }

    } catch (error) {
      console.error('Account creation error:', error)
      setError('Something went wrong while creating your account')
      setStatus('error')
    }
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'professional': return 'Professional'
      case 'developer': return 'Developer'
      default: return 'Developer'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          
          {status === 'loading' && (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Loader className="w-10 h-10 text-white animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Preparing Your Account
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Setting up your {getPlanName(selectedPlan)} account...
              </p>
            </>
          )}

          {status === 'creating' && (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Loader className="w-10 h-10 text-white animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Setting Up Your Account
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Preparing your {getPlanName(selectedPlan)} ElasticDoctor account...
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  🚀 Unlocking all features for you
                </p>
              </div>
            </>
          )}

          {status === 'existing_user' && (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Account Already Exists
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                An account with email <strong>{session?.user?.email}</strong> already exists.
                Please sign in to access your ElasticDoctor account.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  🔑 Use the same Google account to sign in
                </p>
              </div>
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
              >
                Go to Sign In
              </button>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Welcome to ElasticDoctor!
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your {getPlanName(selectedPlan)} account has been created successfully!
                You can now start monitoring your Elasticsearch clusters with our powerful diagnostic tools.
              </p>
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  Redirecting you to your dashboard...
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Account Setup Issue
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {error}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/register')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
                >
                  Try Again
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const RegisterCompletePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <RegisterCompleteForm />
    </Suspense>
  )
}

export default RegisterCompletePage