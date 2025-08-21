import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Info, Play, Download, Code, Zap, Shield, Database } from 'lucide-react'

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/docs" className="hover:text-gray-700">Documentation</Link>
            <span>/</span>
            <span className="text-gray-900">Getting Started</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Getting Started with ElasticDoctor
          </h1>
          <p className="text-xl text-gray-600">
            Get up and running with your first Elasticsearch health diagnosis in under 5 minutes
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Start Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Start</h3>
              <p className="text-blue-800 mb-4">
                Ready to diagnose your cluster right now? Skip the setup and try our live demo.
              </p>
              <Link href="/diagnose" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Play className="w-4 h-4 mr-2" />
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Requirements</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                Elasticsearch Versions
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Elasticsearch 5.x
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Elasticsearch 6.x
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Elasticsearch 7.x
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Elasticsearch 8.x
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Elasticsearch 9.x
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Network Access
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  HTTP/HTTPS access to your cluster
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Read-only permissions sufficient
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  VPN and proxy support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Cloud providers supported
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step-by-step Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Setup</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Access the Diagnosis Page
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Navigate to the ElasticDoctor diagnosis page to start your first health check.
                  </p>
                  <Link href="/diagnose" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    Go to Diagnosis Page
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Enter Your Cluster Information
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Provide your Elasticsearch cluster connection details:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Host:</strong> your-cluster.com
                      </div>
                      <div>
                        <strong>Port:</strong> 9200 (default)
                      </div>
                      <div>
                        <strong>Protocol:</strong> HTTP/HTTPS
                      </div>
                      <div>
                        <strong>Authentication:</strong> Optional
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Configure Authentication (Optional)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    If your cluster requires authentication, provide your credentials:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Username/Password:</strong> Basic authentication
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>API Key:</strong> For enhanced security
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <strong>Certificate:</strong> SSL client certificates
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">4</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Run Your First Diagnosis
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click "Run Diagnosis" to start your first health check. The analysis typically takes 2-5 seconds.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                      <div>
                        <p className="text-green-800 font-medium">What happens next:</p>
                        <ul className="text-green-700 text-sm mt-1 space-y-1">
                          <li>• ElasticDoctor connects to your cluster</li>
                          <li>• Runs comprehensive health checks</li>
                          <li>• Generates actionable recommendations</li>
                          <li>• Displays results in easy-to-understand format</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Your Results</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Critical Issues</h3>
                <p className="text-sm text-gray-600">
                  Require immediate attention to prevent outages or data loss
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Warnings</h3>
                <p className="text-sm text-gray-600">
                  Should be addressed to optimize performance and reliability
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Informational</h3>
                <p className="text-sm text-gray-600">
                  General insights and recommendations for best practices
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/docs/health-checks" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Learn About Health Checks
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Understand all 22 health checks and how to interpret results
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  View Health Checks
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
            
            <Link href="/docs/connection" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Advanced Connection Setup
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Configure authentication, SSL, and troubleshoot connections
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  Connection Guide
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Support */}
        <section className="bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-300 mb-6">
            If you're having trouble getting started, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center">
              Contact Support
            </Link>
            <Link href="/docs/connection" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center">
              Connection Guide
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
