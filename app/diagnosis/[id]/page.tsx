'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info,
  Download,
  Clock,
  Server,
  Activity,
  Shield,
  Settings,
  Zap,
  Database,
  AlertCircle,
  TrendingUp,
  Eye,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  FileText,
  Globe,
  Users,
  HardDrive,
  Target,
  Lightbulb,
  BookOpen,
  Award,
  Gauge,
  Heart,
  Sparkles,
  ThumbsUp,
  Brain,
  Rocket,
  Star,
  ArrowRight,
  Archive,
  BarChart3
} from 'lucide-react'
import { ProtectedRoute } from '../../../lib/auth-utils'
import { useAuth } from '../../../lib/nextAuth'
import { apiClient } from '../../../lib/api-client'

interface Finding {
  title: string
  severity: 'CRITICAL' | 'WARNING' | 'NOTICE' | 'INFO'
  message: string
  recommendations?: string[]
  details?: any
}

interface CheckResult {
  check_name: string
  status: string
  severity: string
  summary: string
  findings: Finding[]
  execution_time_ms: number
  timestamp: string
  details?: any
}

interface DiagnosisData {
  id: string
  timestamp: string
  cluster_name: string
  host: string
  port: number
  result: {
    summary: any
    results: CheckResult[]
    preview?: string
    metadata?: any
  }
  type: string
}

const DiagnosisResultPage = ({ params }: { params: { id: string } }) => {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedChecks, setExpandedChecks] = useState<Set<string>>(new Set())
  const [showPreview, setShowPreview] = useState(false)

  const formatExecutionTime = (timeMs: number) => {
    if (timeMs < 1000) {
      return `${timeMs}ms`
    } else if (timeMs < 60000) {
      return `${(timeMs / 1000).toFixed(1)}s`
    } else if (timeMs < 3600000) {
      const minutes = Math.floor(timeMs / 60000)
      const seconds = Math.floor((timeMs % 60000) / 1000)
      return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`
    } else {
      const hours = Math.floor(timeMs / 3600000)
      const minutes = Math.floor((timeMs % 3600000) / 60000)
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
    }
  }



  useEffect(() => {
    loadDiagnosisData()
  }, [params.id])

  const loadDiagnosisData = async () => {
    try {
      setLoading(true)
      setError('')

      // First try to get data from URL parameters (direct navigation from diagnose page)
      const urlData = searchParams.get('data')
      if (urlData) {
        try {
          const data = JSON.parse(decodeURIComponent(urlData))
          setDiagnosisData(data)
          setLoading(false)
          return
        } catch (e) {
          console.warn('Failed to parse URL data, trying API')
        }
      }

      // Try API first
      const userEmail = searchParams.get('user_email') || user?.email || 'demo_user'
      const apiResult = await apiClient.getDiagnosisDetails(params.id, userEmail)
      
      if (apiResult.success && apiResult.data?.diagnosis) {
        setDiagnosisData(apiResult.data.diagnosis)
        setLoading(false)
        return
      }

    } catch (err) {
      console.error('Failed to load diagnosis:', err)
      setError('Failed to load diagnosis results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleCheckExpansion = (checkName: string) => {
    const newExpanded = new Set(expandedChecks)
    if (newExpanded.has(checkName)) {
      newExpanded.delete(checkName)
    } else {
      newExpanded.add(checkName)
    }
    setExpandedChecks(newExpanded)
  }

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          icon: <XCircle className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-r from-red-50 to-red-100',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-500',
          accentColor: 'bg-red-500',
          priority: '🔥 Critical',
          description: 'Immediate attention required'
        }
      case 'WARNING':
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-r from-amber-50 to-yellow-100',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-800',
          iconColor: 'text-amber-500',
          accentColor: 'bg-amber-500',
          priority: '⚠️ Warning',
          description: 'Requires attention soon'
        }
      case 'NOTICE':
        return {
          icon: <Info className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-100',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-500',
          accentColor: 'bg-blue-500',
          priority: '💡 Notice',
          description: 'Good to know'
        }
      case 'INFO':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-r from-gray-50 to-slate-100',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-500',
          accentColor: 'bg-gray-500',
          priority: 'ℹ️ Info',
          description: 'For your information'
        }
      default:
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bgColor: 'bg-gradient-to-r from-emerald-50 to-green-100',
          borderColor: 'border-emerald-200',
          textColor: 'text-emerald-800',
          iconColor: 'text-emerald-500',
          accentColor: 'bg-emerald-500',
          priority: '✅ Healthy',
          description: 'All good'
        }
    }
  }
  
  const isCheckHealthy = (result: CheckResult) => {
	  // A check is considered healthy if:
	  // 1. It has no findings at all, OR
	  // 2. It only has INFO severity findings (informational, not actual issues)
	  if (result.findings.length === 0) {
		return true;
	  }
	  
	  // Check if all findings are INFO severity
	  const onlyInfoFindings = result.findings.every(finding => finding.severity === 'INFO');
	  return onlyInfoFindings;
  }

  const getCheckIcon = (checkName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'cluster_info': <Server className="w-6 h-6" />,
      'cluster_health': <Heart className="w-6 h-6" />,
      'cluster_settings': <Settings className="w-6 h-6" />,
      'nodes_info': <Database className="w-6 h-6" />,
      'nodes_stats': <TrendingUp className="w-6 h-6" />,
      'nodes_performances': <Gauge className="w-6 h-6" />,
      'security': <Shield className="w-6 h-6" />,
      'indices_stats': <Activity className="w-6 h-6" />,
      'allocation_explain': <Target className="w-6 h-6" />,
      'cat_indices': <FileText className="w-6 h-6" />,
      'cat_shards': <HardDrive className="w-6 h-6" />,
      'mappings': <Globe className="w-6 h-6" />,
      'snapshots': <Archive className="w-6 h-6" />
    }
    return iconMap[checkName] || <CheckCircle className="w-6 h-6" />
  }

  const getCheckDescription = (checkName: string) => {
    const descriptions: Record<string, string> = {
      'cluster_info': 'Core cluster information and version details',
      'cluster_health': 'Overall cluster health and node status',
      'cluster_settings': 'Cluster configuration and system settings',
      'nodes_info': 'Node hardware and software information',
      'nodes_stats': 'Node performance metrics and statistics',
      'nodes_performances': 'Detailed performance analysis and bottlenecks',
      'indices_stats': 'Index health, size, and performance metrics',
      'allocation_explain': 'Shard allocation decisions and optimization',
      'cat_indices': 'Index overview and status summary',
      'cat_shards': 'Shard distribution and health analysis',
      'mappings': 'Field mappings and data structure analysis',
      'snapshots': 'Backup and snapshot configuration review'
    }
    return descriptions[checkName] || 'Health check analysis'
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  const getHealthScoreGradient = (score: number) => {
    if (score >= 90) return 'from-emerald-500 to-green-500'
    if (score >= 80) return 'from-blue-500 to-indigo-500'
    if (score >= 60) return 'from-amber-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const downloadJSON = () => {
    if (!diagnosisData) return
    
    const dataStr = JSON.stringify(diagnosisData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    const fileName = `elasticsearch-diagnosis-${diagnosisData.cluster_name?.replace(/[^a-zA-Z0-9]/g, '-') || 'cluster'}-${new Date().toISOString().split('T')[0]}.json`
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Analyzing diagnosis results...</p>
            <p className="text-slate-500 text-sm mt-2">This may take a few moments</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors mb-8 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-200 p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-red-800 mb-4">Unable to Load Diagnosis</h2>
              <p className="text-red-700 mb-8 text-lg leading-relaxed">{error}</p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={loadDiagnosisData}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Try Again
                </button>
                <Link 
                  href="/dashboard"
                  className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl text-slate-700 px-8 py-4 rounded-2xl transition-all duration-300 font-medium"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!diagnosisData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors mb-8 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-slate-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">Diagnosis Not Found</h2>
              <p className="text-gray-600 mb-8 text-lg">The requested diagnosis could not be found or may have been deleted.</p>
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const healthScore = diagnosisData.overall_health_score || diagnosisData.result?.summary?.health_score || 0
  const totalChecks = diagnosisData.checks ? Object.keys(diagnosisData.checks).length : (diagnosisData.result?.results?.length || 0)
  const checks = diagnosisData.checks || diagnosisData.result?.results || []
  
  // Convert checks object to array if needed
  const checksArray = Array.isArray(checks) ? checks : Object.values(checks)
  
  const totalFindings = checksArray.reduce((acc, result) => {
    const findings = result.findings || []
    return acc + findings.length
  }, 0)
  
  const criticalFindings = checksArray.reduce((acc, result) => {
    const findings = result.findings || []
    return acc + findings.filter(f => f.severity === 'CRITICAL').length
  }, 0)
  
  const warningFindings = checksArray.reduce((acc, result) => {
    const findings = result.findings || []
    return acc + findings.filter(f => f.severity === 'WARNING').length
  }, 0)

  // Calculate total execution time across all checks
  const totalExecutionTime = checksArray.reduce((acc, result) => {
    return acc + (result.execution_time_ms || 0)
  }, 0)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors mb-4 group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Diagnosis Report
                  </h1>
                  <p className="text-slate-600 mt-1">
                    {diagnosisData.cluster_name || 'Unknown Cluster'} • {diagnosisData.created_at ? formatTimestamp(diagnosisData.created_at) : diagnosisData.timestamp ? formatTimestamp(diagnosisData.timestamp) : 'Unknown Time'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {(diagnosisData.result?.preview || diagnosisData.preview) && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl text-slate-700 px-6 py-3 rounded-2xl transition-all duration-300 font-medium flex items-center"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Quick Preview
                </button>
              )}
              
              {user?.pricingTier === 'professional' ? (
                <button
                  onClick={downloadJSON}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </button>
              ) : (
                <div className="relative group">
                  <button
                    className="bg-gray-300 cursor-not-allowed text-gray-500 px-6 py-3 rounded-2xl font-bold flex items-center opacity-60"
                    disabled
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Report
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <div className="text-center">
                      <div className="font-bold text-yellow-400">🔒 Professional Feature</div>
                      <div className="mt-1">Upgrade to download reports</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Health Score Hero Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center mb-8">
                <div className={`relative w-32 h-32 rounded-full bg-gradient-to-r ${getHealthScoreGradient(healthScore)} p-1 shadow-2xl`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-4xl font-black ${getHealthScoreColor(healthScore)}`}>
                        {healthScore}
                      </div>
                      <div className="text-slate-500 text-sm font-medium">/100</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {healthScore >= 90 ? '🎉 Excellent Health!' : 
                 healthScore >= 80 ? '👍 Good Health' : 
                 healthScore >= 60 ? '⚠️ Needs Attention' : 
                 '🔥 Critical Issues'}
              </h2>
              
              <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
                {healthScore >= 90 ? 'Your Elasticsearch cluster is performing exceptionally well with minimal issues detected.' : 
                 healthScore >= 80 ? 'Your cluster is healthy overall, but there are some areas for improvement.' : 
                 healthScore >= 60 ? 'Your cluster has some issues that should be addressed to improve performance and reliability.' : 
                 'Your cluster has critical issues that require immediate attention to prevent outages and data loss.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center p-4 bg-white/60 rounded-2xl">
                  <div className="text-2xl font-bold text-slate-700 mb-1">{totalChecks}</div>
                  <div className="text-sm text-slate-600">Health Checks</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-2xl">
                  <div className="text-2xl font-bold text-amber-600 mb-1">{totalFindings}</div>
                  <div className="text-sm text-slate-600">Total Findings</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-2xl">
                  <div className="text-2xl font-bold text-red-600 mb-1">{criticalFindings}</div>
                  <div className="text-sm text-slate-600">Critical Issues</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-2xl">
                  <div className="text-2xl font-bold text-slate-700 mb-1">{diagnosisData.type === 'quick' ? 'Quick' : 'Full'}</div>
                  <div className="text-sm text-slate-600">Scan Type</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{formatExecutionTime(totalExecutionTime)}</div>
                  <div className="text-sm text-slate-600">Total Duration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cluster Information */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Server className="w-7 h-7 mr-3 text-blue-600" />
              Cluster Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-1">Cluster Name</div>
                <div className="font-bold text-blue-900 text-lg">{diagnosisData.cluster_name || 'Unknown Cluster'}</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl border border-emerald-200">
                <div className="text-sm text-emerald-700 font-medium mb-1">Endpoint</div>
                <div className="font-bold text-emerald-900 text-lg">{(diagnosisData.host || 'Unknown')}:{(diagnosisData.port || 'Unknown')}</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-1">Scan Time</div>
                <div className="font-bold text-purple-900 text-lg">{diagnosisData.created_at ? formatTimestamp(diagnosisData.created_at) : diagnosisData.timestamp ? formatTimestamp(diagnosisData.timestamp) : 'Unknown'}</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl border border-amber-200">
                <div className="text-sm text-amber-700 font-medium mb-1">Analysis Type</div>
                <div className="font-bold text-amber-900 text-lg capitalize">{diagnosisData.type || 'Full'}</div>
              </div>
            </div>
          </div>

          {/* Quick Preview Modal */}
          {showPreview && (diagnosisData.result?.preview || diagnosisData.preview) && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3 text-blue-600" />
                    Quick Preview
                  </h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="prose prose-slate max-w-none">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono leading-relaxed">
                      {diagnosisData.result?.preview || diagnosisData.preview}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Diagnostic Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-slate-900 flex items-center">
                <Award className="w-8 h-8 mr-3 text-blue-600" />
                Detailed Analysis
              </h3>
              <div className="text-sm text-slate-600 bg-white/60 px-4 py-2 rounded-xl">
                {checksArray.filter(r => !r.findings || r.findings.length === 0).length} of {totalChecks} checks passed
              </div>
            </div>
            
            {checksArray.map((result, index) => {
			  const isExpanded = expandedChecks.has(result.check_name)
			  const hasActualIssues = !isCheckHealthy(result) // Use our new function
			  const checkIcon = getCheckIcon(result.check_name)
			  const checkDescription = getCheckDescription(result.check_name)
			  
			  return (
				<div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
				  <div 
					className="p-8 cursor-pointer hover:bg-white/40 transition-all duration-300"
					onClick={() => toggleCheckExpansion(result.check_name)}
				  >
					<div className="flex items-center justify-between">
					  <div className="flex items-center flex-1">
					  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
					  <div className="text-white">
					  {checkIcon}
					  </div>
					  </div>
					  <div className="flex-1">
					    <div className="flex items-center justify-between mb-2">
					      <h4 className="text-xl font-bold text-slate-900 capitalize">
					    {result.check_name.replace(/_/g, ' ')}
					    </h4>
					    {result.execution_time_ms && (
					  <div className="flex items-center bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">
					  <Clock className="w-4 h-4 mr-1" />
					  {formatExecutionTime(result.execution_time_ms)}
					  </div>
					  )}
					  </div>
					  <p className="text-slate-600 mb-3 leading-relaxed">{checkDescription}</p>
					  <p className="text-slate-700 font-medium">{result.summary}</p>
					  </div>
					  </div>
					  <div className="flex items-center ml-6">
						{hasActualIssues ? (
						  <div className="flex items-center mr-6">
							<div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
							  <AlertTriangle className="w-6 h-6 text-white" />
							</div>
							<div className="text-right">
							  <div className="text-lg font-bold text-amber-600">
								{result.findings.filter(f => f.severity !== 'INFO').length}
							  </div>
							  <div className="text-sm text-amber-700">
								{result.findings.filter(f => f.severity !== 'INFO').length === 1 ? 'Issue' : 'Issues'}
							  </div>
							</div>
						  </div>
						) : (
						  <div className="flex items-center mr-6">
							<div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
							  <CheckCircle className="w-6 h-6 text-white" />
							</div>
							<div className="text-right">
							  <div className="text-lg font-bold text-emerald-600">Healthy</div>
							  <div className="text-sm text-emerald-700">
								{result.findings.length === 0 ? 'No issues' : 'Info only'}
							  </div>
							</div>
						  </div>
						)}
						<div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center transition-transform duration-300">
						  {isExpanded ? (
							<ChevronDown className="w-5 h-5 text-slate-600" />
						  ) : (
							<ChevronRight className="w-5 h-5 text-slate-600" />
						  )}
						</div>
					  </div>
					</div>
				  </div>

				  {isExpanded && (
					<div className="border-t border-white/30 bg-gradient-to-br from-white/60 to-slate-50/60 p-8">
					  {result.findings.length > 0 ? (
						<div className="space-y-6">
						  <div className="flex items-center justify-between mb-6">
							<h5 className="text-xl font-bold text-slate-900 flex items-center">
							  <Target className="w-5 h-5 mr-2 text-blue-600" />
							  {hasActualIssues ? 'Issues Discovered' : 'Informational Notes'}
							</h5>
							<div className="text-sm text-slate-600 bg-white/80 px-3 py-1 rounded-lg">
							  {hasActualIssues ? 'Priority-ranked by impact' : 'For your information'}
							</div>
						  </div>
						  
						  {result.findings.map((finding, findingIndex) => {
							const severityConfig = getSeverityConfig(finding.severity)
							
							return (
							  <div 
								key={findingIndex}
								className={`relative rounded-3xl border-2 ${severityConfig.borderColor} ${severityConfig.bgColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
							  >
								{/* Priority stripe */}
								<div className={`absolute left-0 top-0 bottom-0 w-1 ${severityConfig.accentColor} rounded-l-3xl`}></div>
								
								<div className="flex items-start">
								  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shadow-lg ${severityConfig.accentColor}`}>
									<div className="text-white">
									  {severityConfig.icon}
									</div>
								  </div>
								  <div className="flex-1">
									<div className="flex items-center justify-between mb-3">
									  <h6 className={`text-lg font-bold ${severityConfig.textColor}`}>
										{finding.title}
									  </h6>
									  <div className={`px-3 py-1 rounded-full text-xs font-bold ${severityConfig.bgColor} ${severityConfig.textColor} border ${severityConfig.borderColor}`}>
										{severityConfig.priority}
									  </div>
									</div>
									
									<div className={`text-base leading-relaxed mb-4 ${severityConfig.textColor}`}>
									  {finding.message}
									</div>
									
									{finding.recommendations && finding.recommendations.length > 0 && (
									  <div className="mt-6">
										<h6 className={`flex items-center text-base font-bold mb-4 ${severityConfig.textColor}`}>
										  <Lightbulb className="w-4 h-4 mr-2" />
										  💡 Action Plan ({finding.recommendations.length} steps)
										</h6>
										<div className="space-y-3">
										  {finding.recommendations.map((rec, recIndex) => (
											<div key={recIndex} className="flex items-start bg-white/70 rounded-2xl p-4 border border-white/40">
											  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold text-white ${severityConfig.accentColor} flex-shrink-0 mt-0.5`}>
												{recIndex + 1}
											  </div>
											  <div className={`flex-1 ${severityConfig.textColor} leading-relaxed`}>
												{rec}
											  </div>
											</div>
										  ))}
										</div>
									  </div>
									)}
									
									{/* Show details if available and relevant */}
									{finding.details && Object.keys(finding.details).length > 0 && (
									  <details className="mt-6 group">
										<summary className={`cursor-pointer font-semibold flex items-center ${severityConfig.textColor} hover:opacity-80 transition-opacity`}>
										  <BookOpen className="w-4 h-4 mr-2" />
										  Technical Details
										  <ChevronRight className="w-4 h-4 ml-auto group-open:rotate-90 transition-transform" />
										</summary>
										<div className="mt-4 bg-white/80 rounded-2xl p-4 border border-white/60">
										  <pre className="text-xs text-slate-600 overflow-auto font-mono leading-relaxed whitespace-pre-wrap">
											{JSON.stringify(finding.details, null, 2)}
										  </pre>
										</div>
									  </details>
									)}
								  </div>
								</div>
							  </div>
							)
						  })}
						</div>
					  ) : (
						<div className="text-center py-12">
						  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
							<ThumbsUp className="w-10 h-10 text-white" />
						  </div>
						  <h5 className="text-xl font-bold text-emerald-800 mb-3">
							✨ Excellent! No Issues Found
						  </h5>
						  <p className="text-emerald-700 leading-relaxed max-w-md mx-auto">
							This component of your Elasticsearch cluster is performing optimally with no issues detected.
						  </p>
						</div>
					  )}
					  
					  {/* Technical Details Section - rest remains the same */}
					  {result.details && Object.keys(result.details).length > 0 && (
						<div className="mt-8 pt-6 border-t border-white/30">
						  <details className="group">
							<summary className="cursor-pointer font-semibold text-slate-700 hover:text-slate-900 transition-colors flex items-center">
							  <Database className="w-4 h-4 mr-2" />
							  Raw Data & Technical Information
							  <ChevronRight className="w-4 h-4 ml-auto group-open:rotate-90 transition-transform" />
							</summary>
							<div className="mt-4 bg-slate-800 text-green-400 rounded-2xl p-6 shadow-inner">
							  <div className="flex items-center justify-between mb-4">
								<div className="flex items-center text-green-300">
								  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
								  <span className="text-sm font-mono">elasticsearch-diagnostic-data</span>
								</div>
								<button 
								  onClick={() => navigator.clipboard.writeText(JSON.stringify(result.details, null, 2))}
								  className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-lg transition-colors"
								>
								  Copy
								</button>
							  </div>
							  <pre className="text-xs overflow-auto max-h-64 font-mono leading-relaxed whitespace-pre-wrap">
								{JSON.stringify(result.details, null, 2)}
							  </pre>
							</div>
						  </details>
						</div>
					  )}
					</div>
				  )}
				</div>
			  )})}
          </div>

          {/* Summary & Next Steps */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl shadow-2xl border border-blue-200 p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-300/20 to-blue-300/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  🎯 Ready to Optimize Your Cluster?
                </h3>
                <p className="text-blue-800 leading-relaxed max-w-2xl mx-auto">
                  {totalFindings > 0 
                    ? `We've identified ${totalFindings} areas for improvement. Take action on the recommendations above to enhance your cluster's performance, reliability, and security.`
                    : "Your cluster is performing well! Consider running regular health checks to maintain optimal performance."
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link 
                  href="/diagnose" 
                  className="group bg-white/80 hover:bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Run New Scan</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Check your cluster again after implementing improvements</p>
                </Link>
                
                <Link 
                  href="/dashboard" 
                  className="group bg-white/80 hover:bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">View Dashboard</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Monitor all your clusters and track improvements over time</p>
                </Link>
                
                {user?.pricing_tier === 'professional' ? (
                  <button 
                    onClick={downloadReport}
                    className="group bg-white/80 hover:bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40 text-left"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Save Report</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Download detailed analysis for your records and team sharing</p>
                  </button>
                ) : (
                  <div className="relative group">
                    <div className="bg-gray-100 rounded-2xl p-6 shadow-lg border border-gray-200 text-left opacity-60 cursor-not-allowed">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mb-4">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-600 mb-2">Save Report</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">Download detailed analysis for your records and team sharing</p>
                      <div className="mt-3 inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-xs font-medium">
                        🔒 Professional Feature
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link 
                        href="/#pricing"
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 flex items-center"
                      >
                        Upgrade Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {user?.pricing_tier === 'developer' && (
                <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-900 mb-2">🚀 Unlock Advanced Diagnostics</h4>
                      <p className="text-amber-800 text-sm leading-relaxed mb-4">
                        You're seeing {totalChecks} essential checks. Upgrade to Professional for 22+ comprehensive checks including performance analysis, security audits, and migration insights.
                      </p>
                      <Link 
                        href="/#pricing"
                        className="inline-flex items-center bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
                      >
                        Upgrade Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default DiagnosisResultPage