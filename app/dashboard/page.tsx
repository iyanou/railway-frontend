'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  Clock, 
  Plus, 
  Eye, 
  Download, 
  Mail, 
  LogOut, 
  Settings, 
  Crown, 
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Trash2,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { useAuth } from '../../lib/nextAuth'
import { useSession, signOut } from 'next-auth/react'
import { apiClient } from '../../lib/api-client'

interface DiagnosisRecord {
  id: string
  cluster_name: string
  host: string
  port: number
  health_score: number
  status: 'healthy' | 'warning' | 'critical'
  created_at: string
  findings_count: number
  elasticsearch_version: string
  execution_time_ms: number
}

const DashboardPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const { data: session } = useSession()
  
  // **EMERGENCY FIX: Force bypass for existing users**
  const [forceNormalRender, setForceNormalRender] = useState(false)
  
  useEffect(() => {
    // Check if user is existing and force normal render
    if (user?.email && user?.id && !user?.needsRegistration) {
      console.log('EMERGENCY: Forcing normal render for existing user')
      setForceNormalRender(true)
      
      // Also immediately clear all problematic states
      setShouldPreventRender(false)
      setRegistrationInProgress(false)
      setFlow2Plan('')
      setFlow1Plan('')
      setIsFlow1(false)
      localStorage.removeItem('registration_intent')
      
      // Clean URL if needed
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('autoRegister') || urlParams.get('source')) {
        window.history.replaceState({}, '', '/dashboard')
      }
    }
  }, [user])
  
  const [diagnoses, setDiagnoses] = useState<DiagnosisRecord[]>([])
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)
  const [registrationInProgress, setRegistrationInProgress] = useState(false)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{show: boolean, id: string, clusterName: string}>({show: false, id: '', clusterName: ''})
  
  // **HYDRATION-SAFE FIX: Prevent render for any registration flow**
  const [shouldPreventRender, setShouldPreventRender] = useState(false)
  const [flow2Plan, setFlow2Plan] = useState('')
  const [flow1Plan, setFlow1Plan] = useState('')
  const [isFlow1, setIsFlow1] = useState(false)
  
  // **EMERGENCY FALLBACK: Force normal render after 3 seconds if still stuck**
  useEffect(() => {
    const timer = setTimeout(() => {
      if (registrationInProgress && user?.email) {
        console.log('EMERGENCY FALLBACK: Forcing normal render after timeout')
        setForceNormalRender(true)
        setShouldPreventRender(false)
        setRegistrationInProgress(false)
        setLoading(false)
      }
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [registrationInProgress, user])
  useEffect(() => {
    console.log('🔍 Dashboard bypass check:', {
      user,
      session,
      hasUserId: !!user?.id,
      needsRegistration: user?.needsRegistration,
      urlParams: window.location.search
    })
    
    // Multiple conditions to detect existing users
    const isExistingUser = (
      (user?.id && !user?.needsRegistration) || // Fully registered user
      (session?.user?.id && !session?.user?.needsRegistration) || // Session has user ID
      (user?.email && !user?.needsRegistration) // Has email but not needs registration
    )
    
    if (isExistingUser) {
      const urlParams = new URLSearchParams(window.location.search)
      const hasRegistrationParams = urlParams.get('autoRegister') || urlParams.get('source')
      
      if (hasRegistrationParams) {
        console.log('🔧 Existing user detected, cleaning up registration URL params')
        window.history.replaceState({}, '', '/dashboard')
      }
      
      // Force clear all registration states
      console.log('🔧 Clearing all registration states for existing user')
      setShouldPreventRender(false)
      setRegistrationInProgress(false)
      setFlow2Plan('')
      setFlow1Plan('')
      setIsFlow1(false)
      
      // Clear localStorage registration intent
      localStorage.removeItem('registration_intent')
      
      // Set loading to false if we're certain this is an existing user
      if (user?.id || session?.user?.id) {
        setLoading(false)
      }
    }
  }, [user, session])

  // Check for any auto-registration after client-side hydration
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const autoRegisterPlan = urlParams.get('autoRegister')
    const source = urlParams.get('source')
    
    // Flow 2: Direct from pricing
    if (autoRegisterPlan && source === 'pricing') {
      console.log(`🔄 Flow 2 ${autoRegisterPlan} detected - preventing render`)
      setShouldPreventRender(true)
      setFlow2Plan(autoRegisterPlan)
      setIsFlow1(false)
    }
    // Flow 1: Check for registration intent in localStorage
    else {
      const storedIntent = localStorage.getItem('registration_intent')
      if (storedIntent) {
        try {
          const intent = JSON.parse(storedIntent)
          if (intent.isNewRegistration && (Date.now() - intent.timestamp < 600000)) {
            console.log(`🔄 Flow 1 ${intent.plan} detected - preventing render`)
            setShouldPreventRender(true)
            setFlow1Plan(intent.plan)
            setIsFlow1(true)
          }
        } catch (error) {
          console.log('Error parsing registration intent:', error)
        }
      }
    }
  }, [])

  // Fix hydration mismatch and handle registration completion
  useEffect(() => {
    setIsClient(true)
    
    // Check for upgrade success parameter
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('upgraded') === 'true') {
        console.log('🎉 Upgrade completed! User should now see Professional features')
        // Clean the URL
        window.history.replaceState({}, '', '/dashboard')
        // You could show a success toast here
      }
    }
    
    // Check for Flow 2 auto-registration from URL parameters
    const handleAutoRegistration = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const autoRegisterPlan = urlParams.get('autoRegister')
      const source = urlParams.get('source')
      
      if (autoRegisterPlan && source === 'pricing') {
        console.log('Dashboard: Flow 2 auto-registration detected:', autoRegisterPlan)
        
        // Clean URL immediately
        window.history.replaceState({}, '', '/dashboard')
        
        // Get current session
        const { getSession } = await import('next-auth/react')
        let session = null
        let retries = 0
        const maxRetries = 10
        
        // Wait for session with more retries since this happens right after OAuth
        while (!session && retries < maxRetries) {
          session = await getSession()
          console.log(`Dashboard: Auto-registration session check ${retries + 1}:`, session)
          
          if (!session || !session.user) {
            await new Promise(resolve => setTimeout(resolve, 500))
            retries++
          } else {
            break
          }
        }
        
        if (session?.user?.needsRegistration) {
          console.log('Dashboard: Creating user in background for Flow 2...')
          
          try {
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
                selectedPlan: autoRegisterPlan
              })
            })

            const registerResult = await registerResponse.json()
            console.log('Dashboard: Background registration result:', registerResult)

            if (registerResult.success) {
              console.log('Dashboard: Flow 2 registration completed in background!')
              
              // **IMPROVED FIX: For any tier, keep loading state during reload if needed**
              if (autoRegisterPlan === 'professional') {
                console.log('🔄 Professional tier detected - keeping loading state and reloading')
                // Keep all loading states true to prevent showing wrong tier
                setRegistrationInProgress(true)
                setLoading(true)
                setShouldPreventRender(true)
                setFlow2Plan(autoRegisterPlan)
                
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
                return
              } else {
                console.log('🔄 Developer tier detected - keeping loading state briefly')
                // For developer tier, also prevent flash but shorter reload
                setRegistrationInProgress(true)
                setLoading(true)
                setShouldPreventRender(true)
                setFlow2Plan(autoRegisterPlan)
                
                setTimeout(() => {
                  window.location.reload()
                }, 800)
                return
              }
              
              // **FIX 1: Use gentle session refresh for other plans**
              setRegistrationInProgress(false)
              
              // **FIX 1 & 2: Better session refresh using NextAuth update**
              try {
                // Force NextAuth to refresh session data
                const { getSession } = await import('next-auth/react')
                await getSession() // This triggers session refresh
                
                // Also trigger a custom event to notify other components
                const event = new CustomEvent('sessionUpdated', { 
                  detail: { tier: autoRegisterPlan, source: 'flow2' } 
                })
                window.dispatchEvent(event)
                
                setLoading(false)
                console.log('Dashboard: Flow 2 completed with session refresh')
              } catch (refreshError) {
                console.warn('Session refresh failed, proceeding anyway:', refreshError)
                setLoading(false)
              }
              
            } else {
              console.error('Dashboard: Background registration failed:', registerResult.error)
              setError(`Registration failed: ${registerResult.error}`)
              setRegistrationInProgress(false)
              setLoading(false)
            }
          } catch (error) {
            console.error('Dashboard: Background registration error:', error)
            setError('Failed to complete registration. Please try again.')
          }
        } else {
          console.log('Dashboard: User already registered or no session')
        }
      }
    }
    
    // Handle registration completion from Flow 1 (existing logic)
    const handleRegistrationIntent = async () => {
      console.log('Dashboard: Checking for registration intent...')
      
      // Skip if we just handled Flow 2 auto-registration
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('autoRegister')) {
        console.log('Skipping Flow 1 handler - Flow 2 auto-registration detected')
        return
      }
      
      if (typeof window !== 'undefined') {
        const storedIntent = localStorage.getItem('registration_intent')
        console.log('Found registration intent:', storedIntent)
        
        if (storedIntent) {
          try {
            const intent = JSON.parse(storedIntent)
            // Check if intent is recent (< 10 minutes) and is new registration
            if (intent.isNewRegistration && (Date.now() - intent.timestamp < 600000)) {
              console.log('Valid registration intent found, completing registration...', intent)
              
              // Show loading state during registration
              setRegistrationInProgress(true)
              setLoading(true)
              
              // Get current session with retries
              let currentSession = null
              let retries = 0
              const maxRetries = 5
              
              while (!currentSession && retries < maxRetries) {
                const { getSession } = await import('next-auth/react')
                currentSession = await getSession()
                console.log(`Session check attempt ${retries + 1}:`, currentSession)
                
                if (!currentSession) {
                  console.log('Session not ready, waiting...')
                  await new Promise(resolve => setTimeout(resolve, 1000))
                  retries++
                }
              }
              
              if (currentSession?.user?.needsRegistration) {
                console.log('User needs registration, calling registration API...')
                
                try {
                  // Complete registration
                  const registerResponse = await fetch('/api/auth/register-google', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      googleData: {
                        id: currentSession.user.googleId,
                        email: currentSession.user.email,
                        name: currentSession.user.name || '',
                        picture: currentSession.user.image || ''
                      },
                      selectedPlan: intent.plan
                    })
                  })

                  const registerResult = await registerResponse.json()
                  
                  if (registerResult.success) {
                    console.log('Registration completed successfully!')
                    // Clean up registration intent
                    localStorage.removeItem('registration_intent')
                    
                    // **FIX 1: Use gentle session refresh instead of page reload**
                    setRegistrationInProgress(false)
                    
                    // **FIX 1 & 2: Better session refresh using NextAuth update**
                    try {
                      // Force NextAuth to refresh session data
                      const { getSession } = await import('next-auth/react')
                      await getSession() // This triggers session refresh
                      
                      // Also trigger a custom event to notify other components
                      const event = new CustomEvent('sessionUpdated', { 
                        detail: { tier: intent.plan, source: 'flow1' } 
                      })
                      window.dispatchEvent(event)
                      
                      setLoading(false)
                      console.log('Registration: Flow 1 completed with session refresh')
                    } catch (refreshError) {
                      console.warn('Session refresh failed, proceeding anyway:', refreshError)
                      setLoading(false)
                    }
                    
                  } else {
                    console.error('Registration failed:', registerResult.error)
                    setRegistrationInProgress(false)
                    setLoading(false)
                    setError(`Registration failed: ${registerResult.error}`)
                  }
                } catch (registrationError) {
                  console.error('Registration API call failed:', registrationError)
                  setRegistrationInProgress(false)
                  setLoading(false)
                  setError('Failed to complete registration. Please try again.')
                }
              } else if (currentSession?.user) {
                console.log('User already registered, cleaning up intent')
                localStorage.removeItem('registration_intent')
                setRegistrationInProgress(false)
                setLoading(false)
              } else {
                console.log('No session available after retries, cleaning up intent')
                localStorage.removeItem('registration_intent')
                setRegistrationInProgress(false)
                setLoading(false)
                // Redirect back to login
                window.location.href = '/login?callbackUrl=/dashboard'
              }
            } else {
              console.log('Registration intent expired or invalid, cleaning up')
              localStorage.removeItem('registration_intent')
            }
          } catch (error) {
            console.error('Error handling registration intent:', error)
            localStorage.removeItem('registration_intent')
            setRegistrationInProgress(false)
            setLoading(false)
          }
        }
      }
    }
    
    // Run both handlers
    handleAutoRegistration()
    handleRegistrationIntent()
  }, [])

  // Load real data from API
  useEffect(() => {
    if (!isClient || !isAuthenticated) return
    loadDashboardData()
  }, [isClient, isAuthenticated])

  // Redirect if not authenticated (only after loading is complete)
  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      console.log('Redirecting to login - not authenticated')
      window.location.href = '/login?callbackUrl=/dashboard'
    }
  }, [isClient, isAuthenticated, isLoading])

  // Debug user data to understand profile picture issues - MOVED TO TOP
  useEffect(() => {
    if (user) {
      console.log('🔍 User data for profile:', {
        name: user.name,
        email: user.email,
        image: user.image,
        imageType: typeof user.image,
        imageLength: user.image?.length,
        pricingTier: user.pricingTier,
        fullUser: user
      })
      
      // Test if the image URL is accessible
      if (user.image) {
        console.log('🖼️ Testing image URL:', user.image)
        const testImg = new Image()
        testImg.onload = () => {
          console.log('✅ Image loaded successfully:', user.image)
          console.log('📐 Image dimensions:', testImg.naturalWidth, 'x', testImg.naturalHeight)
        }
        testImg.onerror = (e) => {
          console.log('❌ Image failed to load:', user.image)
          console.log('Error details:', e)
          
          // Try common Google image URL fixes
          const fixes = [
            user.image.replace(/=s\d+-c/, '=s200-c'),
            user.image.replace(/\/s\d+(-c)?\//, '/s200-c/'),
            user.image + '?sz=200'
          ]
          
          console.log('🔧 Trying these URL fixes:', fixes)
        }
        testImg.src = user.image
      } else {
        console.log('❌ No image URL found in user data')
      }
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')      
      const result = await apiClient.getDiagnosisHistory(user?.email || 'demo_user')
      
      if (result.success && result.data?.diagnoses?.length > 0) {
        setDiagnoses(result.data.diagnoses)
      } 
    } catch (err) {
      console.error('Dashboard load error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const handleDeleteDiagnosis = async (id: string, clusterName: string) => {
    setDeleteModal({show: true, id, clusterName})
  }

  const confirmDelete = async () => {
    const { id, clusterName } = deleteModal
    
    try {
		// Delete from backend
		const result = await apiClient.deleteDiagnosis(id, user?.email || 'demo_user')
		
		if (result.success) {
		  // Update the UI only after backend confirms deletion
		  setDiagnoses(prev => prev.filter(d => d.id !== id))
		  
		  // Close modal
		  setDeleteModal({show: false, id: '', clusterName: ''})
		  
		} else {
		  // Show error if backend deletion fails
		  alert(`Failed to delete diagnosis: ${result.error}`)
		}
		
	} catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete diagnosis. Please try again.')
      setDeleteModal({show: false, id: '', clusterName: ''})
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut({ redirect: true, callbackUrl: '/' })
    } catch (error) {
      console.error('Sign out error:', error)
      setLoggingOut(false)
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'professional':
        return <Crown className="w-5 h-5 text-purple-500" />
      case 'developer':
        return <Zap className="w-5 h-5 text-blue-500" />
      default:
        return <Settings className="w-5 h-5 text-gray-500" />
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'professional':
        return 'bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold uppercase'
      case 'developer':
        return 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase'
      default:
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase'
    }
  }

  // ===== CONDITIONAL RETURNS AFTER ALL HOOKS =====

  // **EMERGENCY OVERRIDE: Force normal dashboard for existing users**
  if (forceNormalRender) {
    console.log('EMERGENCY: Rendering normal dashboard for existing user')
    // Skip all registration logic and render normal dashboard
  } else if (isClient && shouldPreventRender) {
    const currentPlan = isFlow1 ? flow1Plan : flow2Plan
    const isProfessional = currentPlan === 'professional'
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isProfessional 
              ? 'bg-purple-100' 
              : 'bg-blue-100'
          }`}>
            <Loader2 className={`w-8 h-8 animate-spin ${
              isProfessional 
                ? 'text-purple-600' 
                : 'text-blue-600'
            }`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isFlow1 
              ? (isProfessional ? 'Completing Professional Registration' : 'Completing Developer Registration')
              : (isProfessional ? 'Setting Up Professional Account' : 'Setting Up Developer Account')
            }
          </h2>
          <p className="text-gray-600 mb-4">
            {isFlow1 
              ? (isProfessional ? 'Finalizing your Professional ElasticDoctor account...' : 'Finalizing your Developer ElasticDoctor account...')
              : (isProfessional ? 'Creating your Professional ElasticDoctor account...' : 'Creating your Developer ElasticDoctor account...')
            }
          </p>
          <div className={`border rounded-lg p-4 ${
            isProfessional 
              ? 'bg-purple-50 border-purple-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm ${
              isProfessional 
                ? 'text-purple-800' 
                : 'text-blue-800'
            }`}>
              {isProfessional 
                ? '🚀 Unlocking all 22+ comprehensive health checks' 
                : '🔧 Setting up 8 essential health checks'
              }
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (registrationInProgress) {
    // **ENHANCED LOADING: Different messages for different flows**
    const urlParams = new URLSearchParams(window.location.search)
    const isFlow1 = !urlParams.get('autoRegister') // Flow 1 = no autoRegister param
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isFlow1 
              ? 'Completing Your Registration' 
              : 'Setting Up Your Account'
            }
          </h2>
          <p className="text-gray-600 mb-4">
            {isFlow1 
              ? 'Finalizing your ElasticDoctor account with your selected plan...' 
              : 'Creating your ElasticDoctor account with your selected plan...'
            }
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              {isFlow1 
                ? '✅ Applying your plan and setting up features' 
                : 'This will only take a moment. Please don\'t close this window.'
              }
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show loading until client-side hydration is complete and auth is loaded
  if (!forceNormalRender && (!isClient || isLoading || loggingOut)) {
    const loadingMessage = loggingOut ? 'Signing out...' : 'Loading dashboard...'
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    )
  }

  // If not authenticated after loading, show unauthorized message
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Unauthorized Access</div>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  // Calculate stats from real data
  const totalClusters = diagnoses.length
  const averageHealthScore = diagnoses.length > 0 
    ? Math.round(diagnoses.reduce((sum, d) => sum + d.health_score, 0) / totalClusters)
    : 0
  
  // Calculate total findings from all diagnoses
  const activeIssues = diagnoses.reduce((sum, d) => {    
    return sum + (d.findings_count || 0)
  }, 0)
  
  const healthyClusters = diagnoses.filter(d => d.status === 'healthy').length
  const warningClusters = diagnoses.filter(d => d.status === 'warning').length
  const criticalClusters = diagnoses.filter(d => d.status === 'critical').length

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium'
      case 'critical':
        return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium'
      default:
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium'
    }
  }

  const getTimeSince = (dateString: string) => {
    try {
      // Parse the date from API (should be in ISO format or valid date string)
      const date = new Date(dateString)
      const now = new Date()
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Unknown time'
      }
      
      // Calculate difference in milliseconds
      const diffMs = now.getTime() - date.getTime()
      
      // If negative, it means the date is in the future (which shouldn't happen)
      if (diffMs < 0) {
        return 'Just now'
      }
      
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMinutes / 60)
      const diffDays = Math.floor(diffHours / 24)
      
      if (diffMinutes < 1) return 'Just now'
      if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
      if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
    } catch (error) {
      console.error('Error calculating time difference:', error, 'for date:', dateString)
      return 'Unknown time'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Diagnosis</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the diagnosis for{' '}
                <span className="font-semibold text-gray-900">{deleteModal.clusterName}</span>?
                <br />
                <span className="text-sm text-red-600">This action cannot be undone.</span>
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteModal({show: false, id: '', clusterName: ''})}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="flex items-center h-16 px-6 border-b border-gray-700">
          <Link href="/" className="text-xl font-bold hover:text-blue-300 transition-colors cursor-pointer">🔍 ElasticDoctor</Link>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link href="/dashboard" className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link href="/diagnose" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
              <Plus className="w-5 h-5 mr-3" />
              New Diagnosis
            </Link>
            <Link href="/settings" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
            
            {/* Upgrade to Professional Button for Developer Tier - Sidebar */}
            {user.pricingTier === 'developer' && (
              <Link href="/upgrade" className="flex items-center px-4 py-2 text-purple-300 hover:bg-purple-800 hover:text-white rounded-lg transition-colors">
                <Crown className="w-5 h-5 mr-3" />
                Upgrade to Pro
              </Link>
            )}
            
            {user.pricingTier === 'professional' && (
              <Link href="/analytics" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5 mr-3" />
                Analytics
              </Link>
            )}
            
            <button 
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors disabled:opacity-50 mt-4"
            >
              {loggingOut ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5 mr-3" />
              )}
              {loggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-gray-600">
              Here's your dashboard overview
            </p>
          </div>
          
          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4">
            {/* Plan Status */}
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
                user.pricingTier === 'professional' 
                  ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300' 
                  : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
              }`}>
                {user.pricingTier === 'professional' ? (
                  <>
                    <Crown className="w-4 h-4 mr-1.5" />
                    Professional
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-1.5" />
                    Developer
                  </>
                )}
              </div>
            </div>
            
            {/* User Avatar & Dropdown */}
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    {/* Profile Picture with better fallback */}
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile Picture"
                        className="w-12 h-12 rounded-full ring-2 ring-gray-200 object-cover hover:ring-blue-300 transition-all"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          console.log('❌ Profile image failed to load:', user.image, e)
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling.style.display = 'flex'
                        }}
                        onLoad={() => {
                          console.log('✅ Profile image loaded successfully:', user.image)
                        }}
                      />
                    ) : null}
                    {/* Fallback Avatar */}
                    <div 
                      className={`w-12 h-12 rounded-full ring-2 ring-gray-200 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg hover:ring-blue-300 transition-all ${
                        user.image ? 'hidden' : 'flex'
                      }`}
                      style={{ display: user.image ? 'none' : 'flex' }}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    {/* Plan indicator badge */}
                    <div className="absolute -top-1 -left-1">
                      {user.pricingTier === 'professional' ? (
                        <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                
                {/* User Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3 mb-3">
                      {/* Profile Picture in Dropdown with better fallback */}
                      {user.image ? (
                        <img
                          src={user.image}
                          alt="Profile Picture"
                          className="w-10 h-10 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            console.log('❌ Dropdown image failed to load:', user.image, e)
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextElementSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      {/* Fallback Avatar in Dropdown */}
                      <div 
                        className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm ${
                          user.image ? 'hidden' : 'flex'
                        }`}
                        style={{ display: user.image ? 'none' : 'flex' }}
                      >
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    
                    {/* Plan Badge in Dropdown */}
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      user.pricingTier === 'professional' 
                        ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300' 
                        : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
                    }`}>
                      {user.pricingTier === 'professional' ? (
                        <>
                          <Crown className="w-3 h-3 mr-1.5" />
                          Professional Plan
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 mr-1.5" />
                          Developer Plan
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Account Settings
                    </Link>
                    {user.pricingTier === 'developer' && (
                      <Link href="/upgrade" className="flex items-center px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 transition-colors">
                        <Crown className="w-4 h-4 mr-3" />
                        Upgrade to Professional
                      </Link>
                    )}
                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      {loggingOut ? (
                        <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4 mr-3" />
                      )}
                      {loggingOut ? 'Signing Out...' : 'Sign Out'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <Link href="/diagnose" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">New Diagnosis</span>
                <span className="sm:hidden">New</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
              <button 
                onClick={() => setError('')}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Plan Status Section - Simplified */}
        {user.pricingTier === 'developer' && (
          <div className="bg-white border border-blue-200 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Developer Plan</h3>
                  <p className="text-gray-600 text-sm">You're using 8 core health checks. Upgrade for 14+ advanced checks.</p>
                </div>
              </div>
              <Link href="/upgrade" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center animate-pulse hover:animate-none">
                <Crown className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Upgrade to Pro</span>
                <span className="sm:hidden">Upgrade</span>
              </Link>
            </div>
          </div>
        )}

        {/* Professional Plan Status */}
        {user.pricingTier === 'professional' && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 border border-purple-200 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900 text-lg flex items-center">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide mr-3">
                      Professional Plan
                    </span>
                    Full Access
                  </h3>
                  <p className="text-purple-700 text-sm">You have access to all 22+ comprehensive health checks</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600 mb-1">22+</div>
                <div className="text-sm text-purple-600">Health Checks</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{totalClusters}</div>
                <div className="text-gray-600">Diagnoses Run</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">{activeIssues}</div>
                <div className="text-gray-600">Total Findings</div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-3xl font-bold mb-2 ${totalClusters > 0 ? getHealthScoreColor(averageHealthScore) : 'text-gray-400'}`}>
                  {totalClusters > 0 ? `${averageHealthScore}%` : '--'}
                </div>
                <div className="text-gray-600">Avg Health Score</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">{healthyClusters}</div>
                <div className="text-gray-600">Healthy Clusters</div>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Diagnostics */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Diagnostics</h2>
            <Link href="/history" className="text-blue-600 hover:text-blue-500 text-sm font-medium flex items-center">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your diagnostics...</p>
            </div>
          ) : diagnoses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No diagnostics yet</h3>
              <p className="text-gray-600 mb-6">Start by running your first Elasticsearch diagnosis</p>
              <Link href="/diagnose" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Run Your First Diagnosis
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Cluster</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Health Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Version</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Check</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnoses.map((diagnosis) => (
                    <tr key={diagnosis.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold text-gray-900">{diagnosis.cluster_name}</div>
                          <div className="text-sm text-gray-500">{diagnosis.host}:{diagnosis.port}</div>
                          <div className="text-sm text-gray-500">{diagnosis.findings_count} findings</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`text-2xl font-bold ${getHealthScoreColor(diagnosis.health_score)}`}>
                          {diagnosis.health_score}%
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={getStatusBadge(diagnosis.status)}>
                          {diagnosis.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900 font-mono">{diagnosis.elasticsearch_version}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">
                          {getTimeSince(diagnosis.created_at)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Link 
						    href={`/diagnosis/${diagnosis.id}?user_email=${encodeURIComponent(user?.email)}`}
							className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                          <button 
                            onClick={() => handleDeleteDiagnosis(diagnosis.id, diagnosis.cluster_name)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Run New Diagnosis</h3>
            <p className="text-gray-600 text-sm mb-4">
              Analyze a new cluster or re-check an existing one
            </p>
            <Link href="/diagnose" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors w-full inline-block">
              Start Diagnosis
            </Link>
          </div>

          {user?.pricingTier === 'professional' ? (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">View Analytics</h3>
              <p className="text-gray-600 text-sm mb-4">
                Track trends and monitor cluster health over time
              </p>
              <Link href="/analytics" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors w-full inline-block">
                View Analytics
              </Link>
            </div>
          ) : (
            <div className="relative group">
              <div className="bg-gray-100 rounded-2xl p-6 shadow-lg border border-gray-200 text-center opacity-60 cursor-not-allowed">
                <div className="w-12 h-12 bg-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-600">View Analytics</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Track trends and monitor cluster health over time
                </p>
                <div className="bg-gray-400 text-white font-semibold py-3 px-4 rounded-xl w-full inline-block cursor-not-allowed opacity-60">
                  View Analytics
                </div>
                <div className="mt-3 inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-xs font-medium">
                  🔒 Professional Feature
                </div>
              </div>
              
              {/* Upgrade overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link 
                  href="/upgrade"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  Upgrade Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage