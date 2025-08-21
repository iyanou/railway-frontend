'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Shield, Database, Download, Trash2, AlertTriangle } from 'lucide-react'
import { useAuth } from '../../lib/nextAuth'
import { ProtectedRoute } from '../../lib/auth-utils'
import { apiClient } from '../../lib/api-client'
import { signOut } from 'next-auth/react'

const SettingsPage = () => {
  const { user } = useAuth()
  const [exporting, setExporting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleExportData = async () => {
    try {
      setExporting(true)
      
      // Get all diagnosis data for the user
      const result = await apiClient.getDiagnosisHistory(user?.email || 'demo_user')
      
      if (result.success && result.data?.diagnoses) {
        // Create export data
        const exportData = {
          user: {
            email: user?.email,
            name: user?.name,
            plan: user?.pricingTier,
            exportDate: new Date().toISOString()
          },
          diagnoses: result.data.diagnoses,
          totalDiagnoses: result.data.diagnoses.length
        }
        
        // Create and download JSON file
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `elasticdoctor-export-${user?.email}-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        // Success feedback is now just the file download, no popup
      } else {
        alert('No data to export or failed to retrieve data')
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export data. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = () => {
    setShowDeleteModal(true)
  }

  const confirmDeleteAccount = async () => {
    try {
      console.log('🗑️ Starting account deletion process...')
      
      const result = await apiClient.deleteAccount()
      
      console.log('✅ Account deletion result:', result)
      
      if (result.success) {
        // Silently log out and redirect - no popup
        await signOut({ callbackUrl: '/login?message=account_deactivated' })
      } else {
        throw new Error(result.error || 'Account deletion failed')
      }
    } catch (error) {
      console.error('💥 Account deletion failed:', error)
      alert(`Failed to delete account: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again or contact support if the problem persists.`)
    } finally {
      setShowDeleteModal(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account and application settings</p>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                  <div className={`inline-block px-4 py-2 rounded-xl text-sm font-medium ${
                    user?.pricingTier === 'professional' 
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.pricingTier?.toUpperCase()} PLAN
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-500">Profile editing will be available in a future update.</p>
              </div>
            </div>

            {/* Subscription & Plan Management */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Database className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Subscription & Billing</h2>
              </div>
              
              {user?.pricingTier === 'developer' ? (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-purple-900 text-lg mb-2">Developer Plan (Free)</h3>
                      <p className="text-purple-700 mb-4">You're currently using our free tier with basic features.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Daily Diagnoses</div>
                          <div className="text-lg font-bold text-purple-900">5</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Health Checks</div>
                          <div className="text-lg font-bold text-purple-900">8 Core</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Data Retention</div>
                          <div className="text-lg font-bold text-purple-900">7 days</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Max Nodes</div>
                          <div className="text-lg font-bold text-purple-900">3 per cluster</div>
                        </div>
                      </div>
                      
                      <Link 
                        href="/upgrade"
                        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Shield className="w-5 h-5 mr-2" />
                        Upgrade to Professional
                        <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-purple-900 text-lg mb-2">Professional Plan</h3>
                      <p className="text-purple-700 mb-4">You have access to all premium features including:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Daily Diagnoses</div>
                          <div className="text-lg font-bold text-purple-900">50</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Health Checks</div>
                          <div className="text-lg font-bold text-purple-900">22+ Comprehensive</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Data Retention</div>
                          <div className="text-lg font-bold text-purple-900">30 days</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3">
                          <div className="text-sm text-purple-600 font-medium">Max Nodes</div>
                          <div className="text-lg font-bold text-purple-900">20 per cluster</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-600 mb-1">$39</div>
                      <div className="text-sm text-purple-600">per month</div>
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mt-2">
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Data & Privacy */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Data & Privacy</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Data Retention</div>
                    <div className="text-sm text-gray-500">
                      {user?.pricingTier === 'professional' ? '30 days' : '7 days'}
                    </div>
                  </div>
                </div>
                {user?.pricingTier === 'professional' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Export Data</div>
                      <div className="text-sm text-gray-500">Download all your diagnosis data</div>
                    </div>
                    <button 
                      onClick={handleExportData}
                      disabled={exporting}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {exporting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </>
                      )}
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Delete Account</div>
                    <div className="text-sm text-gray-500">Permanently delete your account and data</div>
                  </div>
                  <button 
                    onClick={handleDeleteAccount}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Delete Account Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Deactivate Account</h3>
                <div className="text-gray-600 mb-6">
                  <p className="mb-3">Are you sure you want to deactivate your account?</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteAccount}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deactivate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}

export default SettingsPage
