'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import Navbar from '../../../components/Navbar'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case 'AccessDenied':
        return {
          title: 'Account Deactivated',
          description: 'Your account has been deactivated and you cannot sign in at this time.',
          suggestion: 'If you believe this is an error, please contact our support team to reactivate your account.',
          isAccountDeactivated: true
        }
      case 'Configuration':
        return {
          title: 'Server Configuration Error',
          description: 'There is a problem with the server configuration. Please contact support.',
          suggestion: 'This is likely a temporary issue. Please try again later.',
          isAccountDeactivated: false
        }
      case 'Verification':
        return {
          title: 'Verification Error',
          description: 'The verification link has expired or is invalid.',
          suggestion: 'Please request a new verification link.',
          isAccountDeactivated: false
        }
      case 'Default':
      default:
        return {
          title: 'Authentication Error',
          description: 'An error occurred during the authentication process.',
          suggestion: 'Please try signing in again. If the problem persists, contact support.',
          isAccountDeactivated: false
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              {/* Error Message */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {errorInfo.title}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {errorInfo.description}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  {errorInfo.suggestion}
                </p>
              </div>

              {/* Error Details - Only show for non-deactivated accounts */}
              {error && !errorInfo.isAccountDeactivated && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-gray-500 font-mono">
                    Error Code: {error}
                  </p>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {errorInfo.isAccountDeactivated ? (
                  <>
                    <a
                      href="mailto:support@elasticdoctor.com?subject=Account Reactivation Request"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Contact Support
                    </a>
                    
                    <Link
                      href="/"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Go Home
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Link>
                    
                    <Link
                      href="/"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Go Home
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  )
}
