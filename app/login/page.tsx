'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { signIn, getSession, signOut } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { LogIn, Shield, Users, Zap, Sparkles, RefreshCw } from 'lucide-react'
import Navbar from '../../components/Navbar'
import ProfileImage from '../../components/ProfileImage'

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasExistingSession, setHasExistingSession] = useState(false)
  const [isReturnVisit, setIsReturnVisit] = useState(false)
  const [sessionData, setSessionData] = useState<any>(null)
  const [upgradeSuccess, setUpgradeSuccess] = useState(false)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectTo = searchParams.get('callbackUrl') || '/dashboard'
  const upgraded = searchParams.get('upgraded') === 'true'
  const upgradeMessage = searchParams.get('message')

  useEffect(() => {
    setIsLoaded(true)
    
    // Check for upgrade success
    if (upgraded && upgradeMessage === 'upgrade_success') {
      setUpgradeSuccess(true)
      console.log('🎉 Upgrade completed! User needs to log back in.')
    }
    
    // Function to check session and redirect if needed
    const checkSessionAndRedirect = async () => {
      const session: any = await getSession()
      console.log('Login page - checking session:', session)
      
      // Store session data for display
      setSessionData(session)
      
      if (session && session.user?.id && !session.user?.needsRegistration) {
        // User is fully authenticated and registered, redirect to dashboard
        console.log('User fully authenticated, redirecting to dashboard')
        router.push(redirectTo)
      } else if (session && session.user?.needsRegistration) {
        // User needs registration - this is Flow 1
        console.log('Flow 1: User needs registration, showing registration options')
        
        // Check if user has been here before
        const visitKey = `login_visit_${session.user?.email}`
        const lastVisit = localStorage.getItem(visitKey)
        const now = Date.now()
        
        if (lastVisit) {
          const timeSinceLastVisit = now - parseInt(lastVisit)
          // If they were here more than 30 seconds ago, it's a return visit
          if (timeSinceLastVisit > 30000) {
            console.log('Detected return visit')
            setIsReturnVisit(true)
          }
        }
        
        // Store current visit time
        localStorage.setItem(visitKey, now.toString())
        
        // Show the registration options UI
        setHasExistingSession(true)
        
        // Stop loading since we're showing the UI
        setIsLoading(false)
      } else {
        // No session or incomplete session - show normal login
        console.log('No valid session, showing normal login')
        setHasExistingSession(false)
        setIsReturnVisit(false)
        setIsLoading(false)
      }
    }
    
    // Check immediately
    checkSessionAndRedirect()
    
    // Also check after a short delay (in case session is still updating after OAuth callback)
    const timer = setTimeout(checkSessionAndRedirect, 2000)
    
    return () => clearTimeout(timer)
  }, [redirectTo, router])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      console.log('Starting Google sign-in...')
      console.log('NextAuth URL:', process.env.NEXTAUTH_URL || window.location.origin)
      
      const result = await signIn('google', { 
        redirect: true, // Let NextAuth handle the redirect
        callbackUrl: '/login' // Come back to login page after OAuth
      })
      
      console.log('signIn result:', result)
      
      // If redirect is true, this code won't execute as the page will redirect
      // But if there's an error, it will still run
      if (result?.error) {
        console.error('Sign-in error:', result.error)
        
        // Handle specific OAuth errors
        if (result.error === 'OAuthSignin') {
          alert('OAuth configuration error. Please check that:\n1. Google OAuth is properly configured\n2. Redirect URIs are set correctly\n3. Network connectivity is available')
        } else if (result.error === 'OAuthCallback') {
          alert('OAuth callback error. Please try again.')
        } else if (result.error.includes('timeout')) {
          alert('Connection timeout. Please check your internet connection and try again.')
        } else {
          alert(`Sign-in failed: ${result.error}. Please try again.`)
        }
        
        setIsLoading(false)
      }
      
    } catch (error) {
      console.error('Sign in error:', error)
      alert(`An error occurred during sign-in: ${error.message || error}. Please try again.`)
      setIsLoading(false)
    }
  }

  const handleContinueWithExistingAccount = () => {
    // Flow 1: Redirect to standalone pricing page so user can choose plan
    router.push('/pricing?source=login')
  }

  const handleTryDifferentAccount = async () => {
    setIsLoading(true)
    try {
      // Clear visit tracking for this email before signing out
      const session: any = await getSession()
      if (session?.user?.email) {
        const visitKey = `login_visit_${session.user.email}`
        localStorage.removeItem(visitKey)
      }
      
      // Sign out to clear the session
      await signOut({ redirect: false })
      // Reset state
      setHasExistingSession(false)
      setIsReturnVisit(false)
      setSessionData(null)
      setIsLoading(false)
      console.log('Session cleared, user can now try different account')
    } catch (error) {
      console.error('Error signing out:', error)
      setIsLoading(false)
    }
  }

  // Google Icon Component
  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )

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
          
          {/* Left side - Marketing content */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="text-white space-y-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-xl text-white rounded-full px-6 py-3 border border-white/20 shadow-lg">
                <Sparkles className="w-5 h-5 mr-2 text-blue-300" />
                <span className="text-sm font-bold uppercase tracking-wide">Trusted by Enterprise Teams</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-white mb-3">Monitor Your</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Elasticsearch
                </span>
                <span className="block text-white">Like a Pro</span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Get comprehensive health insights, prevent critical issues, and optimize 
                performance with advanced diagnostic capabilities.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <Sparkles className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Advanced Diagnostics</h3>
                    <p className="text-white/70 text-sm">Comprehensive health insights and analysis</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <Zap className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Lightning Fast Analysis</h3>
                    <p className="text-white/70 text-sm">Get results in under 60 seconds</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <Users className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Trusted by 150+ Teams</h3>
                    <p className="text-white/70 text-sm">Join leading companies worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Main login card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Header with icon */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <LogIn className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome to ElasticDoctor
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {hasExistingSession 
                      ? (isReturnVisit 
                          ? "Welcome back! You previously signed in with Google but haven't completed registration yet."
                          : "Your Google account is not registered yet. Complete your registration to start monitoring your clusters.")
                      : "Sign in with your Google account to access your dashboard and start monitoring your clusters"
                    }
                  </p>
                </div>

                {/* Upgrade Success Message */}
                {upgradeSuccess && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-green-900 mb-2">
                        🎉 Upgrade to Professional Complete!
                      </h3>
                      <p className="text-green-800 mb-4">
                        Your account has been successfully upgraded. Please sign in again to access your new Professional features.
                      </p>
                      <div className="bg-white/60 rounded-lg p-3 border border-green-200">
                        <p className="text-sm text-green-700 font-medium">
                          ✅ 22+ Comprehensive Health Checks<br/>
                          ✅ 50 Daily Diagnoses<br/>
                          ✅ Advanced Analytics Dashboard<br/>
                          ✅ Download Reports
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Conditional rendering based on session state */}
                {hasExistingSession ? (
                  /* Show options for existing session */
                  <div className="space-y-4">
                    {/* Return visit badge */}
                    {isReturnVisit && (
                      <div className="flex items-center justify-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          Welcome Back
                        </div>
                      </div>
                    )}
                    
                    {/* User Account Display */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <ProfileImage
                            src={sessionData?.user?.image}
                            alt={sessionData?.user?.name || 'Profile'}
                            size="lg"
                            className="ring-2 ring-gray-200"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {sessionData?.user?.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {sessionData?.user?.email}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-xs text-orange-600 font-medium">Pending Registration</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Account found notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start">
                        <Users className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-blue-900 mb-1">
                            {isReturnVisit ? "Ready to Complete Registration?" : "Account Not Registered"}
                          </h4>
                          <p className="text-sm text-blue-800">
                            {isReturnVisit 
                              ? "You can complete your registration now to access all features, or try signing in with a different Google account that might already be registered."
                              : "Your Google account is not registered in our system yet. You can either complete your registration now or try a different account that might already be registered."
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleContinueWithExistingAccount}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isReturnVisit 
                          ? `Complete Registration for ${sessionData?.user?.name?.split(' ')[0] || 'Account'}` 
                          : `Choose Plan & Register ${sessionData?.user?.name?.split(' ')[0] || 'This Account'}`
                        }
                      </button>
                      
                      <button
                        onClick={handleTryDifferentAccount}
                        disabled={isLoading}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent mr-3"></div>
                            Switching Account...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-5 h-5 mr-3" />
                            Use Different Google Account
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Show normal login flow */
                  <div className="space-y-6">
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-xl border border-gray-300 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group shadow-sm"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent mr-3"></div>
                          Checking Account...
                        </>
                      ) : (
                        <>
                          <GoogleIcon />
                          <span className="ml-3">Continue with Google</span>
                        </>
                      )}
                    </button>

                    {/* Security notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-blue-900 mb-1">Secure Authentication</h4>
                          <p className="text-sm text-blue-800">
                            We use Google OAuth for secure, password-free authentication. 
                            Your credentials are never stored on our servers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms and privacy */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    By signing in, you agree to our{' '}
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

const LoginPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
