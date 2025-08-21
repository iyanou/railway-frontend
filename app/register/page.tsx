'use client'

import React, { useState, Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSession, signIn } from 'next-auth/react'
import { CheckCircle, Shield, Users, Zap, Star, Crown, LogIn, Sparkles, AlertCircle, ArrowRight } from 'lucide-react'
import Navbar from '../../components/Navbar'

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [errorState, setErrorState] = useState<{
    type: 'USER_EXISTS' | 'GENERAL' | null
    message: string
    userEmail?: string
  }>({ type: null, message: '' })
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedPlan = searchParams.get('plan') || 'developer'
  const source = searchParams.get('source') // Track where user came from
  
  // Debug logging
  useEffect(() => {
    console.log('Register page - URL search params:', {
      plan: searchParams.get('plan'),
      source: searchParams.get('source'),
      error: searchParams.get('error'),
      selectedPlan,
      fullURL: window.location.href
    })
    
    // Check for URL error parameters (from OAuth redirects)
    const urlError = searchParams.get('error')
    if (urlError) {
      console.log('URL error parameter detected:', urlError)
      setErrorState({
        type: 'GENERAL',
        message: 'There was an issue with the authentication process. Please try again.'
      })
    }
    
    // Validate plan parameter
    const planParam = searchParams.get('plan')
    if (planParam && !['developer', 'professional'].includes(planParam)) {
      console.warn('Invalid plan parameter:', planParam, 'defaulting to developer')
    }
  }, [searchParams, selectedPlan])

  useEffect(() => {
    setIsClient(true)
    
    // Check if user is already authenticated and handle registration completion
    const handleRegistrationFlow = async () => {
      const session: any = await getSession()
      
      if (session?.user) {
        // If user has a complete account (not needs registration), redirect them
        if (session.user.id && !session.user.needsRegistration) {
          if (source === 'diagnose') {
            router.push('/diagnose')
          } else {
            router.push('/dashboard')
          }
          return
        }
        
        // If user needs registration and we have session data, Flow 1 only shows Create Account button
        if (session.user.needsRegistration) {
          console.log('User needs registration with selected plan:', selectedPlan)
          // For Flow 1, just show the Create Account button - no auto-registration
        }
      }
    }
    
    // Small delay to ensure session is loaded
    const timer = setTimeout(handleRegistrationFlow, 500)
    return () => clearTimeout(timer)
  }, [source, router, selectedPlan])

  const handleGoToLogin = () => {
    // Clear any error state and redirect to login with plan info
    setErrorState({ type: null, message: '' })
    router.push(`/login?callbackUrl=${encodeURIComponent(source === 'diagnose' ? '/diagnose' : '/dashboard')}&plan=${selectedPlan}`)
  }

  const handleTryAgain = () => {
    // Clear error state and URL parameters, then allow user to try again
    setErrorState({ type: null, message: '' })
    setIsLoading(false)
    
    // Clear error from URL if present
    const currentParams = new URLSearchParams(window.location.search)
    if (currentParams.has('error')) {
      currentParams.delete('error')
      const newUrl = `${window.location.pathname}?${currentParams.toString()}`
      window.history.replaceState({}, '', newUrl)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setErrorState({ type: null, message: '' }) // Clear previous errors
    
    try {
      // Check if user is already authenticated (coming from login redirect)
      const session: any = await getSession()
      
      if (session?.user?.needsRegistration) {
        // FLOW 1: User is already authenticated but needs registration
        // This handles the manual "Create Account" button click for Flow 1
        console.log('Flow 1: User clicked Create Account, registering with existing session...')
        
        // Create account directly using existing session
        const registerResponse = await fetch('/api/auth/register-google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            googleData: {
              id: session.user.googleId,
              email: session.user.email,
              name: session.user.name || '',
              picture: session.user.image || ''
            },
            selectedPlan: selectedPlan
          })
        })

        const registerResult = await registerResponse.json()

        if (registerResult.success) {
          console.log('Registration successful with plan:', selectedPlan)
          
          // **FIX 1 & 2: Use NextAuth session refresh instead of hard redirect**
          // This prevents double refresh and ensures proper session data
          try {
            // Trigger NextAuth session update without forcing page reload
            const event = new Event('visibilitychange')
            document.dispatchEvent(event)
            
            // Wait for session to update, then use router navigation
            setTimeout(() => {
              if (source === 'diagnose') {
                router.push('/diagnose')
              } else {
                router.push('/dashboard')
              }
            }, 1000) // Increased timeout to ensure session update
          } catch (refreshError) {
            console.warn('Session refresh failed, using fallback redirect:', refreshError)
            // Fallback: Use window.location but only as last resort
            window.location.href = source === 'diagnose' ? '/diagnose' : '/dashboard'
          }
        } else {
          console.error('Registration failed:', registerResult.error)
          
          // Handle specific error cases
          if (registerResult.error === 'USER_ALREADY_EXISTS') {
            setErrorState({
              type: 'USER_EXISTS',
              message: registerResult.message || 'An account with this email already exists.',
              userEmail: registerResult.userEmail || session.user.email
            })
          } else {
            setErrorState({
              type: 'GENERAL',
              message: registerResult.message || 'Registration failed. Please try again.'
            })
          }
          setIsLoading(false)
        }
        return
      }
      
      // FLOW 2: User is not authenticated - coming from pricing page
      // Show Google account selection immediately
      console.log('Flow 2: User not authenticated, showing Google account selection...')
      
      // Use NextAuth signIn method - for Flow 2, go directly to dashboard after OAuth
      const currentUrl = window.location.href
      console.log('Flow 2: Current URL before OAuth:', currentUrl)
      
      // Store registration data in sessionStorage AND URL for OAuth callback
      sessionStorage.setItem('pendingRegistration', JSON.stringify({
        plan: selectedPlan,
        source: source || 'pricing',
        timestamp: Date.now()
      }))
      
      const result = await signIn('google', {
        callbackUrl: `${window.location.origin}/dashboard?autoRegister=${selectedPlan}&source=pricing&tier=${selectedPlan}`,
        redirect: false // Don't auto-redirect so we can handle errors
      })
      
      if (result?.error) {
        console.error('OAuth sign-in error:', result.error)
        setErrorState({
          type: 'GENERAL',
          message: 'Failed to sign in with Google. Please try again.'
        })
        setIsLoading(false)
      } else if (result?.url) {
        // Successful OAuth, redirect manually
        window.location.href = result.url
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      setErrorState({
        type: 'GENERAL',
        message: 'An unexpected error occurred. Please try again.'
      })
      setIsLoading(false)
    }
  }

  const getPlanDetails = (plan: string) => {
    console.log('getPlanDetails called with plan:', plan)
    switch (plan) {
      case 'professional':
        return { 
          name: 'Professional', 
          price: '$39/month', 
          emoji: '⚡', 
          trial: 'Start immediately', 
          features: [
            '50 daily diagnoses',
            'All 22 comprehensive health checks',
            'Max 20 nodes per cluster',
            'Download check report',
            'Email support'
          ],
          icon: <Crown className="w-5 h-5" />,
          bgColor: 'from-blue-50 to-purple-50',
          borderColor: 'border-blue-200'
        }
      case 'developer':
      default:
        return { 
          name: 'Developer', 
          price: 'Free', 
          emoji: '🛠️', 
          trial: 'Free forever', 
          features: [
            '5 daily diagnoses',
            'Core 8 health checks',
            'Max 3 nodes per cluster',
            '7-days data retention'
          ],
          icon: <Star className="w-5 h-5" />,
          bgColor: 'from-slate-50 to-gray-50',
          borderColor: 'border-slate-200'
        }
    }
  }

  const planDetails = getPlanDetails(selectedPlan)

  // Google Icon Component
  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // For Flow 2 (source=pricing), show minimal loading UI while auto-registration happens
  if (source === 'pricing' && isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Creating your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Plan benefits */}
          <div className="hidden lg:block">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-xl text-white rounded-full px-6 py-3 border border-white/20 shadow-lg">
                <Sparkles className="w-5 h-5 mr-2 text-blue-300" />
                <span className="text-sm font-bold uppercase tracking-wide">
                  {planDetails.name} Plan Selected
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-white mb-3">Join</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  ElasticDoctor
                </span>
                <span className="block text-white">{planDetails.name}</span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                {source === 'diagnose' 
                  ? 'Start analyzing your Elasticsearch clusters instantly with expert diagnostics and actionable insights.'
                  : 'Get comprehensive health monitoring and expert recommendations for your Elasticsearch infrastructure.'
                }
              </p>
              
              {/* Plan Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">What's included:</h3>
                {planDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-green-400/30">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Social Proof */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Trusted by 150+ Teams</h4>
                    <p className="text-white/70 text-sm">Join companies using ElasticDoctor</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm italic">
                  "ElasticDoctor helped us identify critical performance issues before they impacted production."
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side - Registration form */}
          <div className="w-full">
            {/* Main registration card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <LogIn className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {source === 'diagnose' ? 'Start Your Analysis' : `Get Started with ${planDetails.name}`}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Create your account with Google to access ElasticDoctor's powerful diagnostic tools instantly
                  </p>
                </div>

                {/* Error Display */}
                {errorState.type && (
                  <div className={`rounded-xl p-4 mb-6 ${
                    errorState.type === 'USER_EXISTS' 
                      ? 'bg-orange-50 border border-orange-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-start">
                      <AlertCircle className={`w-5 h-5 mr-3 mt-0.5 ${
                        errorState.type === 'USER_EXISTS' ? 'text-orange-600' : 'text-red-600'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold mb-2 ${
                          errorState.type === 'USER_EXISTS' ? 'text-orange-900' : 'text-red-900'
                        }`}>
                          {errorState.type === 'USER_EXISTS' ? 'Account Already Exists' : 'Registration Failed'}
                        </h4>
                        <p className={`text-sm mb-3 ${
                          errorState.type === 'USER_EXISTS' ? 'text-orange-800' : 'text-red-800'
                        }`}>
                          {errorState.message}
                        </p>
                        
                        {/* Action buttons for different error types */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          {errorState.type === 'USER_EXISTS' ? (
                            <>
                              <button
                                onClick={handleGoToLogin}
                                className="flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
                              >
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Go to Sign In
                              </button>
                              <button
                                onClick={handleTryAgain}
                                className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                              >
                                Try Different Account
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={handleTryAgain}
                              className="flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              Try Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Google Sign Up Button */}
                <div className="space-y-6">
                  <button
                    onClick={handleGoogleSignUp}
                    disabled={isLoading || errorState.type === 'USER_EXISTS'}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border border-gray-300 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent mr-3"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <GoogleIcon />
                        <span className="ml-3">
                          {source === 'diagnose' ? 'Create Account & Start Analysis' : `Create Account`}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Benefits callout */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-green-900 mb-1">Instant Access</h4>
                        <p className="text-sm text-green-800">
                          {selectedPlan === 'developer' 
                            ? 'Start using ElasticDoctor immediately with our free Developer plan. No credit card required!'
                            : 'Get instant access to all Professional features. Upgrade or downgrade anytime.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Security notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Secure & Private</h4>
                        <p className="text-sm text-blue-800">
                          We use Google OAuth for secure, password-free authentication. Your data is encrypted and never shared.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Already have account */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                      Sign in here
                    </a>
                  </p>
                </div>

                {/* Terms and privacy */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By creating an account, you agree to our{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RegisterPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}

export default RegisterPage
