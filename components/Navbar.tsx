'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, ArrowRight, Gauge, User, LogOut, Settings, BarChart3, ChevronDown, Crown, Shield } from 'lucide-react'
import ProfileImage from './ProfileImage'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    setIsUserMenuOpen(false)
    console.log('Starting sign out process...')
    
    try {
      // Clear any cached session data first
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
        window.sessionStorage.clear()
      }
      
      // Try NextAuth signOut first
      const result = await signOut({ 
        callbackUrl: '/',
        redirect: false // Don't redirect automatically to handle it ourselves
      })
      
      console.log('NextAuth signOut result:', result)
      
      // Force redirect after signout
      window.location.href = '/'
      
    } catch (error) {
      console.error('NextAuth sign out error:', error)
      
      // Fallback: try custom signout route
      try {
        const response = await fetch('/api/signout', {
          method: 'POST',
          credentials: 'same-origin'
        })
        
        if (response.ok) {
          window.location.href = '/'
        } else {
          throw new Error('Custom signout failed')
        }
      } catch (fallbackError) {
        console.error('Fallback signout error:', fallbackError)
        // Last resort: force reload to clear any cached state
        window.location.href = '/'
      }
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'enterprise':
        return <Crown className="w-3 h-3 text-yellow-500" />
      case 'pro':
      case 'professional':
        return <Shield className="w-3 h-3 text-blue-500" />
      default:
        return <User className="w-3 h-3 text-gray-500" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'enterprise':
        return 'text-yellow-600 bg-yellow-50'
      case 'pro':
      case 'professional':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    ElasticDoctor
                  </span>
                  <span className="text-xs -mt-1 text-gray-600 transition-colors">
                    Cluster Health Platform
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {/* Always show public navigation */}
              <Link href="/#features" className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg">
                Features
              </Link>
              <Link href="/#how-it-works" className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg">
                How It Works
              </Link>
              <Link href="/#pricing" className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-lg">
                Pricing
              </Link>
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:block">
            {status === "loading" ? (
              <div className="flex items-center space-x-3">
                <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
              </div>
            ) : session && !session.user?.needsRegistration ? (
              // User is authenticated and has completed registration
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 group"
                >
                  <ProfileImage
                    src={session.user?.image}
                    alt={session.user?.name || 'Profile'}
                    size="md"
                    showOnlineIndicator={true}
                    className="group-hover:ring-gray-200"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{session.user?.name}</p>
                    <div className="flex items-center space-x-1">
                      {getTierIcon(session.user?.pricingTier || 'developer')}
                      <span className="text-xs font-medium capitalize text-gray-500">
                        {session.user?.pricingTier || 'Developer'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Enhanced User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <ProfileImage
                          src={session.user?.image}
                          alt={session.user?.name || 'Profile'}
                          size="lg"
                          showOnlineIndicator={true}
                          className="ring-3 ring-white shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 mt-1 rounded-full text-xs font-medium ${
                            getTierColor(session.user?.pricingTier || 'developer')
                          }`}>
                            {getTierIcon(session.user?.pricingTier || 'developer')}
                            <span className="capitalize">{session.user?.pricingTier || 'Developer'} Plan</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Dashboard</p>
                          <p className="text-xs text-gray-500">View analytics & clusters</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                      </Link>
                      
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors duration-200">
                          <Settings className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Settings</p>
                          <p className="text-xs text-gray-500">Account & preferences</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                      </Link>
                      
                      {/* Upgrade to Professional for Developer Tier */}
                      {session.user?.pricingTier === 'developer' && (
                        <Link
                          href="/upgrade"
                          className="flex items-center px-4 py-3 text-sm font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all duration-200 group border-t border-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors duration-200">
                            <Crown className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-purple-700">Upgrade to Professional</p>
                            <p className="text-xs text-purple-600 opacity-75">Unlock 14+ advanced checks</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-purple-500 group-hover:text-purple-700 transition-colors duration-200" />
                        </Link>
                      )}
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-100 mx-4"></div>
                    
                    {/* Sign Out */}
                    <div className="py-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors duration-200">
                          <LogOut className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">Sign Out</p>
                          <p className="text-xs text-gray-500 opacity-75">End your session</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // User is not authenticated
              <div className="flex items-center space-x-3">
                <Link href="/register?plan=developer" className="px-6 py-2 text-base font-semibold text-white hover:text-white bg-green-600 hover:bg-green-700 border border-green-600 hover:border-green-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center">
                  Get Started Free
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/login" className="px-6 py-2 text-base font-semibold text-white hover:text-white bg-blue-600 hover:bg-blue-700 border border-blue-600 hover:border-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-6 space-y-1 bg-white/98 backdrop-blur-md border-t border-gray-200 rounded-b-2xl shadow-xl">
              {session && (
                // Show user info if authenticated
                <div className="flex items-center space-x-3 px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4 border border-blue-100">
                  <ProfileImage
                    src={session.user?.image}
                    alt={session.user?.name || 'Profile'}
                    size="lg"
                    showOnlineIndicator={true}
                    className="ring-2 ring-white shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 mt-1 rounded-full text-xs font-medium ${
                      getTierColor(session.user?.pricingTier || 'developer')
                    }`}>
                      {getTierIcon(session.user?.pricingTier || 'developer')}
                      <span className="capitalize">{session.user?.pricingTier || 'Developer'} Plan</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Always show public navigation */}
              <Link 
                href="/#features" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/#how-it-works" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/#pricing" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              
              
              {session && !session.user?.needsRegistration ? (
                // Show authenticated user options only for completed registrations
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-3 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/settings" 
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    
                    {/* Upgrade to Professional for Developer Tier - Mobile */}
                    {session.user?.pricingTier === 'developer' && (
                      <Link 
                        href="/upgrade" 
                        className="block px-4 py-3 text-base font-medium text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200 mx-2 my-2 flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Crown className="w-5 h-5 mr-3 text-purple-600" />
                        <div className="flex-1">
                          <div className="font-medium text-purple-700">Upgrade to Professional</div>
                          <div className="text-xs text-purple-600 opacity-75">Unlock 14+ advanced checks</div>
                        </div>
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                // Show sign in button for non-authenticated users
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link 
                    href="/register?plan=developer" 
                    className="block w-full text-center px-4 py-3 text-base font-semibold text-white hover:text-white bg-green-600 hover:bg-green-700 border border-green-600 hover:border-green-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started Free
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    href="/login" 
                    className="block w-full text-center px-4 py-3 text-base font-semibold text-white hover:text-white bg-blue-600 hover:bg-blue-700 border border-blue-600 hover:border-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
