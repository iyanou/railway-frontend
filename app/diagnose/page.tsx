'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft, 
  Play, 
  AlertTriangle,
  Wifi,
  ArrowRight,
  Crown,
  Activity,
  Shield,
  Settings,
  Server,
  Target,
  Brain,
  CheckCircle,
  Sparkles,
  Database,
  Lock,
  Globe,
  Clock,
  Zap,
  Eye,
  EyeOff,
  Gauge,
  ChevronRight,
  Rocket,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  CheckCircle2,
  X,
  HelpCircle,
  WifiOff
} from 'lucide-react';
import { useAuth } from '../../lib/nextAuth';
import { apiClient } from '../../lib/api-client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface DiagnosisFormData {
  host: string;
  port: number;
  scheme: 'http' | 'https';
  username?: string;
  password?: string;
  clusterName?: string;
  checkTypes: string[];
  timeout: number;
}

const DiagnosePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // MOVE ALL HOOKS BEFORE ANY CONDITIONAL RETURNS
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<any>(null);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'failed' | 'node_limit_exceeded'>('idle');
  const [nodeInfo, setNodeInfo] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Usage tracking state
  const [usageStats, setUsageStats] = useState<any>(null);
  const [loadingUsage, setLoadingUsage] = useState(false);
  const [usageError, setUsageError] = useState('');
  
  const isDeveloper = user?.pricingTier === 'developer';

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DiagnosisFormData>({
    defaultValues: {
      host: '',
      port: 9200,
      scheme: 'https',
      timeout: 30,
      checkTypes: []
    }
  });

  const watchedFields = watch();

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isClient, isLoading, isAuthenticated, router]);

  // Auto-advance to next step when connection is successful
  useEffect(() => {
    if (connectionStatus === 'success' && currentStep === 1) {
      setTimeout(() => setCurrentStep(2), 1000);
    }
  }, [connectionStatus, currentStep]);

  // Debug error state
  useEffect(() => {
    if (error) {
      console.log('Current error state:', error);
      console.log('Is rate limit error:', error.isRateLimit);
    }
  }, [error]);

  // Fetch usage statistics when component mounts
  useEffect(() => {
    if (isClient && isAuthenticated && user?.email) {
      fetchUsageStats();
    }
  }, [isClient, isAuthenticated, user?.email]);

  const fetchUsageStats = async () => {
    if (!user?.email) return;
    
    setLoadingUsage(true);
    setUsageError('');
    
    try {
      const response = await fetch(`/api/usage/stats?user_email=${encodeURIComponent(user.email)}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsageStats(data);
      } else {
        const errorData = await response.json();
        setUsageError(errorData.detail || 'Failed to load usage statistics');
      }
    } catch (err: any) {
      setUsageError('Failed to load usage statistics');
      console.error('Usage stats error:', err);
    } finally {
      setLoadingUsage(false);
    }
  };

  // NOW DO CONDITIONAL RETURNS AFTER ALL HOOKS
  // Show loading state
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  const testConnection = async () => {
    const formData = watch();
    
    if (!formData.host || !formData.port) {
      setError({ message: 'Please fill in host and port before testing connection', isRateLimit: false });
      return;
    }

    setTestingConnection(true);
    setConnectionStatus('testing');
    setError(null);
    setNodeInfo(null);

    try {
      const credentials = {
        host: formData.host,
        port: formData.port,
        scheme: formData.scheme,
        username: formData.username || undefined,
        password: formData.password || undefined,
        timeout: formData.timeout,
        verify_certs: false
      };

      // First test basic connection
      const connectionResponse = await apiClient.testConnection(credentials, user?.email);

      if (connectionResponse.success) {
        // If basic connection succeeds, validate cluster size against tier limits
        const validationResponse = await apiClient.validateClusterSize(credentials, user?.pricingTier || 'developer', user?.email);
        
        if (validationResponse.success) {
          const clusterInfo = validationResponse.data.cluster_info;
          const validation = validationResponse.data.validation;
          
          setNodeInfo({
            ...clusterInfo,
            validation
          });
          
          if (validation.is_allowed) {
            setConnectionStatus('success');
            // Auto-fill cluster name if available and not already set
            if (clusterInfo.cluster_name && !formData.clusterName) {
              setValue('clusterName', clusterInfo.cluster_name);
            }
          } else {
            setConnectionStatus('node_limit_exceeded');
            setError({ message: validation.message, isRateLimit: false });
          }
        } else {
          setConnectionStatus('failed');
          setError({ message: validationResponse.error || 'Cluster size validation failed', isRateLimit: false });
        }
      } else {
        setConnectionStatus('failed');
        setError({ message: connectionResponse.error || 'Connection test failed', isRateLimit: false });
      }
    } catch (err: any) {
      setConnectionStatus('failed');
      setError({ message: err.message || 'Connection test failed', isRateLimit: false });
    } finally {
      setTestingConnection(false);
    }
  };
	
  const onSubmit = async (data: DiagnosisFormData) => {
    setIsRunning(true);
    setError(null);

    try {
      const credentials = {
        host: data.host,
        port: data.port,
        scheme: data.scheme,
        username: data.username || undefined,
        password: data.password || undefined,
        timeout: data.timeout,
        verify_certs: false
      };

      // Validate cluster size before running diagnosis
      if (connectionStatus !== 'success' || !nodeInfo?.validation?.is_allowed) {
        const validationResponse = await apiClient.validateClusterSize(credentials, user?.pricingTier || 'developer', user?.email);
        
        if (!validationResponse.success || !validationResponse.data.validation.is_allowed) {
          const validation = validationResponse.data?.validation;
          setError({ message: validation?.message || 'Cluster size exceeds plan limits. Please test connection first.', isRateLimit: false });
          return;
        }
      }

      let result;
      
      if (user?.pricingTier === 'developer') {
        result = await apiClient.runQuickDiagnosis(credentials, user?.email);
      } else {
        const diagnosticRequest = {
          credentials,
          check_names: data.checkTypes.length > 0 ? data.checkTypes : undefined,
          run_all: data.checkTypes.length === 0,
          verbose: true,
          include_details: true
        };
        result = await apiClient.runDiagnosis(diagnosticRequest, user?.email);
      }

      if (result.success) {
        // Refresh usage stats after successful diagnosis
        fetchUsageStats();
        
        // Results are now stored automatically in MySQL by the gateway
        // Get the session UUID from the gateway response
        const sessionUuid = result.data?.gateway_metadata?.session_uuid;
        const storedInMysql = result.data?.gateway_metadata?.results_stored;
        
        if (sessionUuid && storedInMysql) {
          // Navigate to results page using the session UUID
          window.location.href = `/diagnosis/${sessionUuid}?user_email=${encodeURIComponent(user?.email || 'demo_user')}`;
        } else if (sessionUuid) {
          // Session exists but storage might have failed - still show results
          setError({ message: 'Diagnosis completed but results storage had issues. Redirecting to results...', isRateLimit: false });
          setTimeout(() => {
            window.location.href = `/diagnosis/${sessionUuid}?user_email=${encodeURIComponent(user?.email || 'demo_user')}`;
          }, 2000);
        } else {
          // No session UUID - this shouldn't happen with authenticated users
          setError({ message: 'Diagnosis completed but session information is missing. Please try again or contact support.', isRateLimit: false });
        }
      } else {
        // Check if it's a rate limit error
        console.log('API Result:', result); // Debug log
        console.log('Result status:', result.status); // Debug log
        console.log('Result error:', result.error); // Debug log
        
        if (result.status === 429 || result.error?.includes('rate limit') || result.error?.includes('Rate limit') || result.error?.includes('limit exceeded')) {
          console.log('Rate limit detected!'); // Debug log
          const errorData = result.data || {};
          const upgradeUrl = errorData.details?.upgrade_url || '/upgrade';
          const recommendations = errorData.recommendations || [];
          
          // Set a more user-friendly error message
          let rateLimitMessage = result.error || 'Daily diagnosis limit exceeded.';
          
          if (recommendations.length > 0) {
            rateLimitMessage += '\n\n' + recommendations.join('\n');
          }
          
          // Store the upgrade URL for the upgrade button
          const rateErrorObj = { 
            message: rateLimitMessage,
            isRateLimit: true,
            upgradeUrl: upgradeUrl,
            details: errorData.details
          };
          
          console.log('Setting rate limit error:', rateErrorObj); // Debug log
          setError(rateErrorObj);
          
          // Refresh usage stats to show updated limits
          fetchUsageStats();
        } else {
          console.log('Regular error detected:', result.error); // Debug log
          setError({ message: result.error || 'Diagnosis failed', isRateLimit: false });
        }
      }
    } catch (err: any) {
      setError({ message: err.message || 'Diagnosis failed. Please check your connection settings.', isRateLimit: false });
    } finally {
      setIsRunning(false);
    }
  };

  const buttonText = isDeveloper ? 'Start Quick Diagnosis' : 'Start Full Diagnosis';
  const runningText = isDeveloper ? 'Running Quick Diagnosis...' : 'Running Diagnosis...';

  const isFormValid = watchedFields.host && watchedFields.port && watchedFields.username && watchedFields.password;
  
  // Check if user has reached rate limit based on their tier
  const isRateLimited = usageStats && (
    (user?.pricingTier === 'developer' && (usageStats.current_limits?.quick_diagnoses?.remaining || 0) <= 0) ||
    (user?.pricingTier === 'professional' && (usageStats.current_limits?.full_diagnoses?.remaining || 0) <= 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-emerald-400/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-all duration-300 mb-6 group bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-white/20">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Gauge className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                    New Diagnosis
                  </h1>
                  <p className="text-slate-600 text-lg mt-1">Professional Elasticsearch health analysis in seconds</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className={`inline-flex items-center px-6 py-3 rounded-2xl font-bold shadow-lg border-2 transition-all duration-300 ${
                  isDeveloper 
                    ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200 hover:shadow-xl'
                    : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200 hover:shadow-xl'
                }`}>
                  <Crown className="w-5 h-5 mr-2" />
                  {user?.pricingTier?.toUpperCase()} PLAN
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className={`flex items-center transition-all duration-300 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {connectionStatus === 'success' ? <CheckCircle2 className="w-6 h-6" /> : '1'}
                  </div>
                  <span className="ml-3 font-semibold">Connect</span>
                </div>
                
                <div className={`w-16 h-1 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                
                <div className={`flex items-center transition-all duration-300 ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isRunning ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : '2'}
                  </div>
                  <span className="ml-3 font-semibold">Analyze</span>
                </div>
              </div>
              
              <div className="text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 inline mr-2" />
                Est. time: &lt; 1 minute
              </div>
            </div>
          </div>
        </div>

        {/* Usage Statistics Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
              Daily Usage Limits
            </h3>
            <button
              onClick={fetchUsageStats}
              disabled={loadingUsage}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors disabled:opacity-50"
            >
              {loadingUsage ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loadingUsage ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-slate-600">Loading usage statistics...</span>
            </div>
          ) : usageError ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-red-700 font-medium">{usageError}</p>
            </div>
          ) : usageStats ? (
            <div className="space-y-6">
              {/* Quick Diagnoses Usage - Only show for Developer users */}
              {user?.pricingTier === 'developer' && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-blue-900 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Quick Diagnoses
                    </h4>
                    <span className="text-sm text-blue-700 font-medium">
                      {usageStats.current_limits?.quick_diagnoses?.used || 0} / {usageStats.current_limits?.quick_diagnoses?.limit || 0} used
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-blue-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          (usageStats.current_limits?.quick_diagnoses?.used || 0) >= (usageStats.current_limits?.quick_diagnoses?.limit || 1)
                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                            : (usageStats.current_limits?.quick_diagnoses?.used || 0) / (usageStats.current_limits?.quick_diagnoses?.limit || 1) > 0.8
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}
                        style={{ 
                          width: `${Math.min(100, ((usageStats.current_limits?.quick_diagnoses?.used || 0) / (usageStats.current_limits?.quick_diagnoses?.limit || 1)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-blue-700">
                      <span>Remaining: {usageStats.current_limits?.quick_diagnoses?.remaining || 0}</span>
                      <span>Resets: {new Date(usageStats.current_limits?.quick_diagnoses?.reset_at || '').toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Diagnoses Usage (Professional only) */}
              {user?.pricingTier === 'professional' && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-purple-900 flex items-center">
                      <Crown className="w-5 h-5 mr-2" />
                      Full Diagnoses
                    </h4>
                    <span className="text-sm text-purple-700 font-medium">
                      {usageStats.current_limits?.full_diagnoses?.used || 0} / {usageStats.current_limits?.full_diagnoses?.limit || 0} used
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-purple-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          (usageStats.current_limits?.full_diagnoses?.used || 0) >= (usageStats.current_limits?.full_diagnoses?.limit || 1)
                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                            : (usageStats.current_limits?.full_diagnoses?.used || 0) / (usageStats.current_limits?.full_diagnoses?.limit || 1) > 0.8
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                        style={{ 
                          width: `${Math.min(100, ((usageStats.current_limits?.full_diagnoses?.used || 0) / (usageStats.current_limits?.full_diagnoses?.limit || 1)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-purple-700">
                      <span>Remaining: {usageStats.current_limits?.full_diagnoses?.remaining || 0}</span>
                      <span>Resets: {new Date(usageStats.current_limits?.full_diagnoses?.reset_at || '').toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              )}


            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Usage statistics will appear here once loaded</p>
            </div>
          )}
        </div>

        {/* Plan Information */}
        {isDeveloper ? (
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl"></div>
            
            <div className="flex items-start relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mr-6 flex-shrink-0 shadow-xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-amber-900 text-2xl mb-3">Developer Plan - Essential Diagnostics</h3>
                <div className="space-y-4 text-amber-800 mb-8">
                  <div className="bg-amber-100/60 rounded-2xl p-4 border border-amber-200">
                    <p className="font-bold text-lg mb-2">🎯 What You'll Get:</p>
                    <p className="font-semibold">
                      <span className="bg-amber-200 px-3 py-1 rounded-lg font-black">8 Core Health Checks</span> covering cluster essentials:
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Cluster Info & Health</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Nodes Overview</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Indices Management</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Basic Performance Stats</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100/60 to-red-100/60 rounded-2xl p-4 border border-orange-200">
                    <p className="font-bold text-orange-800 mb-2">⚡ Missing 14 Professional Checks:</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Cluster License Check</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Nodes Performance Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Node Settings Deep Dive</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Nodes Stats Monitoring</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Hot Threads Detection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Indices Settings Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Ingest Pipelines Check</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Field Mappings Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>ILM Policies Assessment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Data Tiers Configuration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Cluster Tasks Monitoring</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Pending Tasks Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Snapshots & Repositories</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-orange-600" />
                        <span>Deprecations Check</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link href="/upgrade" className="inline-flex items-center bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-700 hover:via-amber-700 hover:to-yellow-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  <Rocket className="w-6 h-6 mr-3" />
                  Unlock All 22+ Professional Checks
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl"></div>
            <div className="flex items-start relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mr-6 flex-shrink-0 shadow-xl">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-emerald-900 text-2xl mb-3">Professional Plan - Complete Diagnostics</h3>
                <div className="bg-emerald-100/60 rounded-2xl p-4 border border-emerald-200 mb-6">
                  <p className="text-emerald-800 text-lg leading-relaxed">
                    <span className="font-black">🚀 Full Access:</span> All 22+ comprehensive checks including advanced performance analysis, 
                    security audits, migration insights, and recommendations with ROI calculations.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Star className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">22+ Health Checks</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Performance Optimization</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Security Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Detailed Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Connection Settings */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Server className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                    Connection Settings
                  </h2>
                  <p className="text-slate-600">Connect securely to your Elasticsearch cluster</p>
                </div>
              </div>
              
              {connectionStatus === 'success' && (
                <div className="flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Connected Successfully</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
              {/* Cluster Name */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                  <Database className="w-4 h-4 mr-2 text-slate-500" />
                  Cluster Name 
                  <span className="ml-2 text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  {...register('clusterName')}
                  type="text"
                  className="w-full px-4 py-4 bg-slate-50/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 text-slate-900 placeholder-slate-400"
                  placeholder="Production Elasticsearch Cluster"
                />
              </div>

              {/* Protocol & Host */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-slate-500" />
                  Protocol
                </label>
                <select
                  {...register('scheme')}
                  className="w-full px-4 py-4 bg-slate-50/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 text-slate-900"
                >
                  <option value="https">HTTPS (Secure)</option>
                  <option value="http">HTTP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                  <Server className="w-4 h-4 mr-2 text-slate-500" />
                  Host <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('host', { required: 'Host is required' })}
                  type="text"
                  className={`w-full px-4 py-4 bg-slate-50/80 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-300 text-slate-900 placeholder-slate-400 ${
                    errors.host ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                  }`}
                  placeholder="your-elasticsearch-host.com"
                />
                {errors.host && (
                  <p className="text-red-600 text-sm mt-2 flex items-center font-medium">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.host.message}
                  </p>
                )}
              </div>

              {/* Port */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-slate-500" />
                  Port <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('port', { 
                    required: 'Port is required',
                    min: { value: 1, message: 'Port must be positive' },
                    max: { value: 65535, message: 'Port must be valid' }
                  })}
                  type="number"
                  className={`w-full px-4 py-4 bg-slate-50/80 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-300 text-slate-900 placeholder-slate-400 ${
                    errors.port ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                  }`}
                  placeholder="9200"
                />
                {errors.port && (
                  <p className="text-red-600 text-sm mt-2 flex items-center font-medium">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.port.message}
                  </p>
                )}
              </div>

              {/* Authentication */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-slate-500" />
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('username', { required: 'Username is required' })}
                  type="text"
                  className={`w-full px-4 py-4 bg-slate-50/80 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-300 text-slate-900 placeholder-slate-400 ${
                    errors.username ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                  }`}
                  placeholder=""
                />
                {errors.username && (
                  <p className="text-red-600 text-sm mt-2 flex items-center font-medium">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-slate-500" />
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-4 pr-12 bg-slate-50/80 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-300 text-slate-900 placeholder-slate-400 ${
                      errors.password ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-2 flex items-center font-medium">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Advanced Settings Toggle */}
              <div className="lg:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                  <ChevronRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                    showAdvanced ? 'rotate-90' : ''
                  }`} />
                </button>
              </div>

              {/* Advanced Settings */}
              {showAdvanced && (
                <div className="lg:col-span-2 bg-slate-50/50 rounded-2xl p-6 border border-slate-200/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-slate-500" />
                        Timeout (seconds)
                      </label>
                      <input
                        {...register('timeout', { 
                          required: 'Timeout is required',
                          min: { value: 5, message: 'Timeout must be at least 5 seconds' },
                          max: { value: 300, message: 'Timeout cannot exceed 300 seconds' }
                        })}
                        type="number"
                        className={`w-full px-4 py-4 bg-white border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-300 text-slate-900 placeholder-slate-400 ${
                          errors.timeout ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                        }`}
                        placeholder="30"
                      />
                      {errors.timeout && (
                        <p className="text-red-600 text-sm mt-2 flex items-center font-medium">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.timeout.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                        <div className="flex items-center text-blue-700 mb-2">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          <span className="font-semibold text-sm">Connection Tips</span>
                        </div>
                        <p className="text-xs text-blue-600">
                          • Use HTTPS for production clusters<br/>
                          • Default port is 9200<br/>
                          • Timeout 30-60s for remote clusters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Connection Test Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shadow-lg transition-all duration-300 ${
                  connectionStatus === 'success' ? 'bg-gradient-to-br from-emerald-500 to-green-500' :
                  connectionStatus === 'failed' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                  connectionStatus === 'node_limit_exceeded' ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                  connectionStatus === 'testing' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  'bg-gradient-to-br from-slate-400 to-slate-500'
                }`}>
                  {connectionStatus === 'testing' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : connectionStatus === 'success' ? (
                    <CheckCircle className="w-7 h-7 text-white" />
                  ) : connectionStatus === 'node_limit_exceeded' ? (
                    <AlertTriangle className="w-7 h-7 text-white" />
                  ) : connectionStatus === 'failed' ? (
                    <WifiOff className="w-7 h-7 text-white" />
                  ) : (
                    <Wifi className="w-7 h-7 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Connection Test
                  </h2>
                  <p className="text-slate-600">
                    {connectionStatus === 'testing' ? 'Testing connection and validating cluster size...' :
                     connectionStatus === 'success' ? 'Connection established and cluster size validated!' :
                     connectionStatus === 'node_limit_exceeded' ? 'Connection successful but cluster exceeds plan limits' :
                     connectionStatus === 'failed' ? 'Connection failed - check your settings' :
                     'Verify your cluster connection before diagnosis'}
                  </p>
                </div>
              </div>
              
              {connectionStatus === 'success' && (
                <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-bold">Ready for Diagnosis</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative z-10">
              <button
                type="button"
                onClick={testConnection}
                disabled={testingConnection || isRunning || !isFormValid}
                className={`transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center font-bold py-4 px-8 rounded-2xl ${
                  connectionStatus === 'success' ? 
                    'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white' :
                  connectionStatus === 'failed' ?
                    'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' :
                  'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                }`}
              >
                {testingConnection ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Testing Connection...
                  </>
                ) : connectionStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Test Again
                  </>
                ) : connectionStatus === 'failed' ? (
                  <>
                    <WifiOff className="w-5 h-5 mr-3" />
                    Retry Connection
                  </>
                ) : (
                  <>
                    <Wifi className="w-5 h-5 mr-3" />
                    Test Connection
                  </>
                )}
              </button>
              
              {!isFormValid && (
                <p className="text-slate-500 text-sm mt-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Please fill in all required fields to test connection
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Error Display */}
          {error && (
            <div className={`rounded-3xl p-8 shadow-2xl relative overflow-hidden ${
              error.isRateLimit 
                ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-2 border-amber-200'
                : 'bg-gradient-to-r from-red-50 via-red-50 to-orange-50 border-2 border-red-200'
            }`}>
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl ${
                error.isRateLimit ? 'bg-amber-200/30' : 'bg-red-200/30'
              }`}></div>
              
              <div className="flex items-start relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg ${
                  error.isRateLimit 
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                    : 'bg-gradient-to-br from-red-500 to-red-600'
                }`}>
                  {error.isRateLimit ? (
                    <AlertTriangle className="w-7 h-7 text-white" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  {error.isRateLimit ? (
                    // Enhanced Rate Limit Error Display
                    <>
                      {/* Always show the rate limit error when isRateLimit is true */}
                      <div className="bg-red-100/80 border-2 border-red-300 rounded-2xl p-6 mb-6">
                        <h3 className="font-black text-xl text-red-900 mb-3 flex items-center">
                          <X className="w-6 h-6 mr-2" />
                          ❌ Error Occurred
                        </h3>
                        <p className="text-red-800 font-bold text-lg mb-4">
                          Rate limit exceeded - Your daily diagnosis limit has been reached.
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                          <p className="text-red-700 font-medium mb-3">
                            📊 <strong>Your Current Usage:</strong>
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="text-center bg-white/50 rounded-lg p-3">
                              <div className="font-bold text-lg text-red-700">
                                {error.details?.used || usageStats?.current_limits?.[user?.pricingTier === 'developer' ? 'quick_diagnoses' : 'full_diagnoses']?.used || 'N/A'}
                              </div>
                              <div className="text-red-600 text-xs">Used Today</div>
                            </div>
                            <div className="text-center bg-white/50 rounded-lg p-3">
                              <div className="font-bold text-lg text-red-700">
                                {error.details?.limit || usageStats?.current_limits?.[user?.pricingTier === 'developer' ? 'quick_diagnoses' : 'full_diagnoses']?.limit || 'N/A'}
                              </div>
                              <div className="text-red-600 text-xs">Daily Limit</div>
                            </div>
                            <div className="text-center bg-white/50 rounded-lg p-3">
                              <div className="font-bold text-lg text-red-700">
                                {error.details?.remaining !== undefined ? error.details.remaining : '0'}
                              </div>
                              <div className="text-red-600 text-xs">Remaining</div>
                            </div>
                          </div>
                          
                          {error.details?.reset_at && (
                            <div className="text-center mt-4 pt-4 border-t border-red-200">
                              <p className="text-sm text-red-700">
                                <Clock className="w-4 h-4 inline mr-1" />
                                Resets at: <span className="font-bold">
                                  {new Date(error.details.reset_at).toLocaleString()}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <p className="text-amber-800 font-medium mb-2">💡 <strong>What you can do:</strong></p>
                          <ul className="text-amber-700 text-sm space-y-1 ml-4">
                            <li>• Wait for your daily limit to reset at midnight UTC</li>
                            {user?.pricingTier === 'developer' && (
                              <li>• Upgrade to Professional for 50 daily diagnoses instead of 5</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Regular error display
                    <>
                      <h3 className="font-bold text-lg mb-3 text-red-900">
                        ❌ Error Occurred
                      </h3>
                      <p className="text-red-800 font-medium text-lg mb-4">
                        {error.message}
                      </p>
                    </>
                  )}
                  
                  {/* Action buttons section - only show for non-rate-limit errors or provide upgrade option */}
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {error.isRateLimit && user?.pricingTier === 'developer' && (
                      <Link 
                        href="/upgrade"
                        className="inline-flex items-center bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <Crown className="w-5 h-5 mr-2" />
                        Upgrade to Professional
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    )}
                    
                    <button
                      onClick={() => setError(null)}
                      className="text-slate-600 hover:text-slate-800 font-medium underline transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Diagnosis Action */}
          <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  {isRunning ? (
                    <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Rocket className="w-10 h-10 text-white" />
                  )}
                </div>
                
                <h2 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                  {isRunning ? 'Analyzing Your Cluster...' : 'Ready to Start Analysis'}
                </h2>
                
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  {isRunning ? (
                    <>Running {isDeveloper ? '8 essential' : '22+ comprehensive'} health checks on your Elasticsearch cluster...</>
                  ) : (
                    <>Your cluster will be analyzed with {isDeveloper ? '8 essential' : '22+ comprehensive'} health checks to identify issues and optimization opportunities.</>
                  )}
                </p>
              </div>

              {/* Diagnosis Features Preview */}
              {!isRunning && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Gauge className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Health Score</h3>
                    <p className="text-slate-600 text-sm">Get an overall health score with detailed breakdown</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Recommendations</h3>
                    <p className="text-slate-600 text-sm">Actionable insights to improve performance</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Detailed Report</h3>
                    <p className="text-slate-600 text-sm">Comprehensive analysis with visualizations</p>
                  </div>
                </div>
              )}

              {/* Enhanced Progress Bar for Running State */}
              {isRunning && (
                <div className="mb-8">
                  {/* Main Progress Bar */}
                  <div className="relative bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl h-6 mb-6 overflow-hidden shadow-inner border border-slate-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl transition-all duration-1000 ease-out" 
                         style={{width: '85%', animation: 'progress-shimmer 2s ease-in-out infinite alternate'}}>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[slide_2s_ease-in-out_infinite]" 
                         style={{background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'slide 2s ease-in-out infinite'}}></div>
                  </div>
                  
                  {/* Progress Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="text-slate-700 font-semibold">Running {isDeveloper ? '8 essential' : '22+ comprehensive'} health checks...</span>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                      <Clock className="w-4 h-4 inline mr-1" />
                      ~45s remaining
                    </div>
                  </div>
                  
                  {/* Current Step Indicator */}
                  <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-white animate-pulse" />
                        </div>
                        <span className="font-bold text-slate-900">Currently analyzing:</span>
                      </div>
                      <div className="text-green-600 font-bold text-sm">85% Complete</div>
                    </div>
                    <div className="text-slate-700 bg-slate-50 rounded-lg px-3 py-2 text-sm font-medium">
                      🔍 Examining cluster health and node performance metrics...
                    </div>
                  </div>
                </div>
              )}

              {/* Main Action Button */}
              <button
                type="submit"
                disabled={isRunning || connectionStatus !== 'success'}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-black py-6 px-12 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center text-xl mx-auto"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-7 w-7 border-3 border-white border-t-transparent mr-4"></div>
                    {runningText}
                  </>
                ) : (
                  <>
                    <Play className="w-7 h-7 mr-4" />
                    {buttonText}
                  </>
                )}
              </button>
              
              {connectionStatus !== 'success' && !isRunning && (
                <p className="text-slate-500 text-sm mt-4 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Please test your connection successfully before starting diagnosis
                </p>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes progress-shimmer {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.2); }
        }
        
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default DiagnosePage;