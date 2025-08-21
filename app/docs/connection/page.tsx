import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Info, Shield, Database, Key, Globe, Lock, Server, Code, Copy } from 'lucide-react'

export default function ConnectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/docs" className="hover:text-gray-700">Documentation</Link>
            <span>/</span>
            <span className="text-gray-900">Connection & Setup</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connection & Setup
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to connect ElasticDoctor to your Elasticsearch cluster across all supported versions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Supported Versions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Elasticsearch Versions</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <div className="grid md:grid-cols-5 gap-4">
              {['5.x', '6.x', '7.x', '8.x', '9.x'].map((version) => (
                <div key={version} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Database className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">ES {version}</h3>
                  <p className="text-xs text-gray-600">Fully Supported</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <p className="text-blue-800 font-medium">Auto-Detection</p>
                <p className="text-blue-700 text-sm">
                  ElasticDoctor automatically detects your Elasticsearch version and uses the appropriate client library for optimal compatibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connection Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connection Methods</h2>
          
          <div className="space-y-6">
            {/* Basic HTTP */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                Basic HTTP Connection
              </h3>
              <p className="text-gray-600 mb-4">
                Connect to your Elasticsearch cluster using HTTP protocol (recommended for development).
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <code className="text-sm font-mono text-gray-800">
                      Host: http://localhost:9200<br/>
                      Port: 9200<br/>
                      Protocol: HTTP
                    </code>
                  </div>
                  <button className="ml-4 p-2 text-gray-500 hover:text-gray-700">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* HTTPS */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-600" />
                HTTPS Connection
              </h3>
              <p className="text-gray-600 mb-4">
                Secure connection using HTTPS protocol (recommended for production).
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <code className="text-sm font-mono text-gray-800">
                      Host: https://your-cluster.com:9200<br/>
                      Port: 9200<br/>
                      Protocol: HTTPS<br/>
                      Verify SSL: false (default)
                    </code>
                  </div>
                  <button className="ml-4 p-2 text-gray-500 hover:text-gray-700">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cloud Providers */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-600" />
                Cloud Providers
              </h3>
              <p className="text-gray-600 mb-4">
                Connect to managed Elasticsearch services from major cloud providers.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">AWS Elasticsearch</h4>
                  <p className="text-sm text-gray-600">
                    Use your AWS domain endpoint with IAM authentication
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Elastic Cloud</h4>
                  <p className="text-sm text-gray-600">
                    Connect using your cloud deployment URL
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Cloud</h4>
                  <p className="text-sm text-gray-600">
                    Use GCP Elasticsearch service endpoint
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication Methods</h2>
          
          <div className="space-y-6">
            {/* Username/Password */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2 text-blue-600" />
                Username & Password
              </h3>
              <p className="text-gray-600 mb-4">
                Basic authentication using username and password credentials.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      placeholder="elastic" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-green-800 font-medium">Security Note</p>
                    <p className="text-green-700 text-sm">
                      Only read-only permissions are required. ElasticDoctor never modifies your cluster.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* API Key */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                API Key Authentication
              </h3>
              <p className="text-gray-600 mb-4">
                Enhanced security using Elasticsearch API keys (recommended for production).
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input 
                  type="text" 
                  placeholder="VnVhQ2ZHY0JDZGJrUW0td..." 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                  readOnly
                />
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-green-800 font-medium">Recommended</p>
                    <p className="text-green-700 text-sm">
                      API keys provide fine-grained access control and can be easily revoked.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-purple-600" />
                CA Certificate (Optional)
              </h3>
              <p className="text-gray-600 mb-4">
                Upload CA certificate for custom certificate authorities (optional for self-signed certificates).
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CA Certificate (Optional)</label>
                    <input 
                      type="file" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      accept=".crt,.pem"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connection Testing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing Your Connection</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-4">
              Before running a full diagnosis, ElasticDoctor tests your connection to ensure everything is configured correctly.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Connection Validation</h4>
                  <p className="text-gray-600 text-sm">Verifies that ElasticDoctor can reach your cluster</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Authentication Check</h4>
                  <p className="text-gray-600 text-sm">Confirms that your credentials are valid</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Version Detection</h4>
                  <p className="text-gray-600 text-sm">Automatically detects your Elasticsearch version</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Permissions Validation</h4>
                  <p className="text-gray-600 text-sm">Ensures read access to necessary cluster information</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Connection Issues</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Connection Refused
              </h3>
              <p className="text-gray-600 mb-4">Unable to connect to the Elasticsearch cluster.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Common Causes:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Incorrect host or port</li>
                  <li>• Firewall blocking connections</li>
                  <li>• Elasticsearch service not running</li>
                  <li>• Network connectivity issues</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                Authentication Failed
              </h3>
              <p className="text-gray-600 mb-4">Invalid credentials or insufficient permissions.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Common Causes:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Incorrect username or password</li>
                  <li>• Expired API key</li>
                  <li>• Insufficient read permissions</li>
                  <li>• Certificate issues</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                SSL Certificate Error
              </h3>
              <p className="text-gray-600 mb-4">Issues with SSL/TLS certificate validation.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Common Causes:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Self-signed certificates</li>
                  <li>• Certificate authority not trusted</li>
                  <li>• Hostname mismatch</li>
                  <li>• Expired certificates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/diagnose" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Run Your First Diagnosis
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Now that you understand connections, try diagnosing your cluster
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  Start Diagnosis
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
            
            <Link href="/docs/health-checks" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Learn About Health Checks
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Understand what ElasticDoctor checks in your cluster
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  View Health Checks
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Support */}
        <section className="bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Still Having Connection Issues?</h2>
          <p className="text-gray-300 mb-6">
            Our support team can help you troubleshoot connection problems and get you up and running quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center">
              Contact Support
            </Link>
            <Link href="/docs/best-practices" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center">
              Best Practices Guide
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
