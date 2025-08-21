'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Database,
  Zap,
  Eye,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Sparkles,
  Target,
  Brain,
  Crown
} from 'lucide-react'
import { useAuth } from '../../lib/nextAuth'
import { ProtectedRoute } from '../../lib/auth-utils'
import { apiClient } from '../../lib/api-client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

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
  type: string
}

const AnalyticsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [diagnoses, setDiagnoses] = useState<DiagnosisRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load real data from API
  useEffect(() => {
    if (!isClient || !isAuthenticated) return
    loadAnalyticsData()
  }, [isClient, isAuthenticated])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('[ANALYTICS] Loading data for user:', user?.email || 'demo_user')
      console.log('[ANALYTICS] User object:', user)
      console.log('[ANALYTICS] isAuthenticated:', isAuthenticated)
      console.log('[ANALYTICS] isClient:', isClient)
      
      // Use API instead of localStorage
      const result = await apiClient.getDiagnosisHistory(user?.email || 'demo_user')
      
      console.log('[ANALYTICS] API result:', result)
      console.log('[ANALYTICS] API result.success:', result.success)
      console.log('[ANALYTICS] API result.data:', result.data)
      console.log('[ANALYTICS] API result.data?.diagnoses:', result.data?.diagnoses)
      console.log('[ANALYTICS] API result.data?.diagnoses?.length:', result.data?.diagnoses?.length)
      
      if (result.success && result.data?.diagnoses?.length > 0) {
        console.log('[ANALYTICS] Processing', result.data.diagnoses.length, 'diagnoses')
        
        // Data is already formatted by the API - no need for calculations
        const processedResults = result.data.diagnoses.map((item: DiagnosisRecord) => ({
          ...item,
          date: new Date(item.created_at),
          // Calculate findings by severity if needed (but API should provide this)
          critical_count: 0, // API should provide this breakdown if needed
          warning_count: 0,  // API should provide this breakdown if needed
          notice_count: 0,   // API should provide this breakdown if needed
          total_findings: item.findings_count || 0
        }))
        
        console.log('[ANALYTICS] Processed results:', processedResults)
        
        // Sort by date (newest first)
        processedResults.sort((a, b) => b.date.getTime() - a.date.getTime())
        setDiagnoses(processedResults)
      } else {
        console.log('[ANALYTICS] No data found or API failed')
        console.log('[ANALYTICS] result.success:', result.success)
        console.log('[ANALYTICS] result.data:', result.data)
        console.log('[ANALYTICS] diagnoses array:', result.data?.diagnoses)
        setDiagnoses([])
      }
    } catch (error) {
      console.error('[ANALYTICS] Failed to load analytics data:', error)
      setError('Failed to load analytics data. Please try again.')
      setDiagnoses([])
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadAnalyticsData()
    setRefreshing(false)
  }

  // Redirect if not authenticated (only after loading is complete)
  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      console.log('Analytics: Redirecting to login - not authenticated')
      window.location.href = '/login?redirect=/analytics'
    }
  }, [isClient, isAuthenticated, isLoading])

  // Show loading until client-side hydration is complete and auth is loaded
  if (!isClient || isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  // If not authenticated after loading, return null (ProtectedRoute will handle redirect)
  if (!isAuthenticated || !user) {
    return (
      <ProtectedRoute>
        <div></div>
      </ProtectedRoute>
    )
  }

  // Check if user has access to analytics (Professional plan only)
  if (user?.pricingTier !== 'professional') {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors mb-4 group">
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Dashboard
                </Link>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Analytics Dashboard</h1>
              </div>
            </div>
            
            {/* Professional Plan Required */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-3xl p-12 text-center shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Crown className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">Professional Plan Required</h3>
              <p className="text-blue-800 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
                Advanced analytics and insights are available with our Professional plan. 
                Unlock comprehensive cluster health trends, performance metrics, and detailed reporting.
              </p>
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-2 bg-white/60 rounded-xl p-4">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-800 font-medium">Health Score Trends</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 bg-white/60 rounded-xl p-4">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-blue-800 font-medium">Performance Analytics</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 bg-white/60 rounded-xl p-4">
                    <Activity className="w-5 h-5 text-purple-600" />
                    <span className="text-blue-800 font-medium">Cluster Insights</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 bg-white/60 rounded-xl p-4">
                    <Database className="w-5 h-5 text-emerald-600" />
                    <span className="text-blue-800 font-medium">Historical Data</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/#pricing"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Upgrade to Professional
                </Link>
                <Link 
                  href="/dashboard"
                  className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl text-slate-700 px-8 py-4 rounded-2xl transition-all duration-300 font-medium"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  // Show all data instead of filtering by time range
  const filteredData = diagnoses

  // Calculate analytics metrics using API data
  const totalDiagnoses = filteredData.length
  const uniqueClusters = new Set(filteredData.map(d => d.cluster_name)).size
  const averageHealthScore = filteredData.length > 0 ? 
    Math.round(filteredData.reduce((sum, d) => sum + d.health_score, 0) / filteredData.length) : 0
  const totalIssuesFound = filteredData.reduce((sum, d) => sum + (d.findings_count || 0), 0)
  
  // Health score trend data
  const healthTrendData = filteredData
    .slice(-10) // Last 10 diagnoses
    .reverse()
    .map((d, index) => ({
      name: `Run ${index + 1}`,
      date: new Date(d.created_at).toLocaleDateString(),
      health: d.health_score,
      cluster: d.cluster_name,
      created_at: new Date(d.created_at).toLocaleDateString()
    }))

  // Status-based distribution (since API provides status)
  const statusCounts = filteredData.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statusDistributionData = [
    { name: 'Healthy', value: statusCounts.healthy || 0, color: '#10B981' },
    { name: 'Warning', value: statusCounts.warning || 0, color: '#F59E0B' },
    { name: 'Critical', value: statusCounts.critical || 0, color: '#EF4444' }
  ].filter(item => item.value > 0)

  // Cluster health distribution using API data
  const clusterHealthData = Array.from(new Set(filteredData.map(d => d.cluster_name)))
    .map(clusterName => {
      const clusterDiagnoses = filteredData.filter(d => d.cluster_name === clusterName)
      const avgHealth = Math.round(clusterDiagnoses.reduce((sum, d) => sum + d.health_score, 0) / clusterDiagnoses.length)
      const latestDiagnosis = clusterDiagnoses[0]
      
      return {
        cluster: clusterName,
        health: avgHealth,
        diagnoses: clusterDiagnoses.length,
        lastChecked: new Date(latestDiagnosis.created_at),
        issues: clusterDiagnoses.reduce((sum, d) => sum + (d.findings_count || 0), 0),
        status: latestDiagnosis.status
      }
    })

  // Recent activity (last 10 activities)
  const recentActivity = filteredData.slice(0, 10).map(d => ({
    id: d.id,
    type: d.status,
    message: `Diagnosis completed for ${d.cluster_name}`,
    detail: `Health score: ${d.health_score}% (${d.findings_count || 0} findings)`,
    timestamp: new Date(d.created_at),
    cluster: d.cluster_name,
    health_score: d.health_score
  }))

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors mb-4 group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Analytics Dashboard</h1>
              <p className="text-slate-600 mt-2">Advanced insights and trends for your Elasticsearch clusters with AI-powered analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl text-slate-700 px-4 py-3 rounded-2xl transition-all duration-300 disabled:opacity-50 flex items-center font-medium"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
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

          {totalDiagnoses === 0 ? (
            // Enhanced No Data State
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No Analytics Data</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">Run some diagnostics to see advanced analytics and insights here. Get comprehensive cluster health trends and performance metrics.</p>
              <Link 
                href="/diagnose"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Run First Diagnosis
              </Link>
            </div>
          ) : (
            <>
              {/* Enhanced Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">{totalDiagnoses}</div>
                      <div className="text-slate-600 font-medium">Total Diagnoses</div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-sm text-blue-600 mt-2 font-medium">
                    All time
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-emerald-600 mb-2">{averageHealthScore}%</div>
                      <div className="text-slate-600 font-medium">Avg Health Score</div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm mt-2">
                    {averageHealthScore >= 80 ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                        <span className="text-emerald-600 font-medium">Good health</span>
                      </>
                    ) : averageHealthScore >= 60 ? (
                      <>
                        <Activity className="w-4 h-4 text-amber-600 mr-1" />
                        <span className="text-amber-600 font-medium">Needs attention</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-red-600 font-medium">Critical health</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-amber-600 mb-2">{totalIssuesFound}</div>
                      <div className="text-slate-600 font-medium">Issues Found</div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-sm text-amber-600 mt-2 font-medium">
                    Across {uniqueClusters} clusters
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">{uniqueClusters}</div>
                      <div className="text-slate-600 font-medium">Active Clusters</div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Server className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-sm text-purple-600 mt-2 font-medium">
                    Being monitored
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Health Score Trend */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Health Score Trend</h3>
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={healthTrendData}>
                        <defs>
                          <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis 
                          dataKey="name" 
                          stroke="#6B7280"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#6B7280"
                          fontSize={12}
                          domain={[0, 100]}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                          formatter={(value: any, name: any, props: any) => [
                            `${value}%`,
                            'Health Score'
                          ]}
                          labelFormatter={(label: any, payload: any) => {
                            if (payload && payload[0]) {
                              return `${payload[0].payload.cluster} - ${payload[0].payload.created_at}`
                            }
                            return label
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="health"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          fill="url(#healthGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Cluster Status Distribution */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Cluster Status Distribution</h3>
                    <AlertTriangle className="w-5 h-5 text-gray-500" />
                  </div>
                  {statusDistributionData.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusDistributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {statusDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <p className="text-gray-600">No clusters found!</p>
                        <p className="text-sm text-gray-500">Run some diagnostics to see status distribution</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cluster Health Overview */}
              {clusterHealthData.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Cluster Health Overview</h3>
                    <Database className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clusterHealthData.map((cluster, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 truncate">{cluster.cluster}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            cluster.status === 'healthy' ? 'bg-green-100 text-green-800' :
                            cluster.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cluster.health}%
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Diagnoses:</span>
                            <span>{cluster.diagnoses}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Issues:</span>
                            <span>{cluster.issues}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="capitalize font-medium">{cluster.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last check:</span>
                            <span>{cluster.lastChecked.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.type === 'healthy' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{activity.message}</div>
                        <div className="text-sm text-gray-600 mt-1">{activity.detail}</div>
                      </div>
                      <div className="text-sm text-gray-500 whitespace-nowrap">
                        {activity.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AnalyticsPage