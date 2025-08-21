'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Eye, Download, Trash2 } from 'lucide-react'
import { useAuth } from '../../lib/mysqlAuth'
import { ProtectedRoute } from '../../lib/auth-utils'
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

const HistoryPage = () => {
  const { user, isAuthenticated } = useAuth()
  const [diagnoses, setDiagnoses] = useState<DiagnosisRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load real data from API
  useEffect(() => {
    if (!isClient || !isAuthenticated) return
    loadHistory()
  }, [isClient, isAuthenticated])

  const loadHistory = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('[HISTORY] Loading data for user:', user?.email || 'demo_user')
      console.log('[HISTORY] User object:', user)
      console.log('[HISTORY] isAuthenticated:', isAuthenticated)
      console.log('[HISTORY] isClient:', isClient)
      
      const result = await apiClient.getDiagnosisHistory(user?.email || 'demo_user')
      
      console.log('[HISTORY] API result:', result)
      console.log('[HISTORY] API result.success:', result.success)
      console.log('[HISTORY] API result.data:', result.data)
      console.log('[HISTORY] API result.data?.diagnoses:', result.data?.diagnoses)
      
      if (result.success) {
        console.log('[HISTORY] Setting diagnoses:', result.data.diagnoses || [])
        setDiagnoses(result.data.diagnoses || [])
      } else {
        console.log('[HISTORY] API failed:', result.error)
        // Show empty state instead of error for common cases
        if (result.error?.includes('no diagnoses found') || 
            result.error?.includes('404') ||
            result.error?.includes('Not Found')) {
          setDiagnoses([])
        } else {
          setError('Unable to connect to the diagnostic service. Please ensure your backend is running.')
        }
      }
    } catch (err) {
      console.error('[HISTORY] History load error:', err)
      setError('Unable to connect to the diagnostic service. Please ensure your backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, clusterName: string) => {
    if (!confirm(`Delete diagnosis for ${clusterName}? This action cannot be undone.`)) {
      return
    }

    const result = await apiClient.deleteDiagnosis(id, user?.email || 'demo_user')
    if (result.success) {
      setDiagnoses(prev => prev.filter(d => d.id !== id))
    } else {
      alert('Failed to delete diagnosis: ' + result.error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
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

  // Redirect if not authenticated
  useEffect(() => {
    if (isClient && !isAuthenticated) {
      window.location.href = '/login?redirect=/history'
    }
  }, [isClient, isAuthenticated])

  // Show loading until client-side hydration is complete
  if (!isClient || !isAuthenticated || !user) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading history...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Diagnosis History</h1>
              <p className="text-gray-600">View and manage all your Elasticsearch diagnoses</p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading diagnosis history...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">{error}</div>
                <button 
                  onClick={loadHistory}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Retry
                </button>
              </div>
            ) : diagnoses.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No diagnoses found</h3>
                <p className="text-gray-600 mb-6">You haven't run any diagnoses yet.</p>
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
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
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
                          <span className="text-2xl font-bold">{diagnosis.health_score}%</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={getStatusBadge(diagnosis.status)}>
                            {diagnosis.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono">{diagnosis.elasticsearch_version}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-600">{formatDate(diagnosis.created_at)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Link 
                              href={`/diagnosis/${diagnosis.id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Link>
                            <button 
                              onClick={() => handleDelete(diagnosis.id, diagnosis.cluster_name)}
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
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default HistoryPage
