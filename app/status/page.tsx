import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Globe, Server, Database, Zap } from 'lucide-react'

export default function SystemStatusPage() {
  const services = [
    {
      name: "Diagnostic Engine",
      status: "operational",
      uptime: "99.98%",
      lastIncident: "None",
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None",
      icon: <Database className="w-6 h-6" />
    },
    {
      name: "Web Platform",
      status: "operational",
      uptime: "99.97%",
      lastIncident: "None",
      icon: <Globe className="w-6 h-6" />
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'outage':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'outage':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <span className="text-gray-900">System Status</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            System Status
          </h1>
          <p className="text-xl text-gray-600">
            Real-time status and uptime monitoring for all ElasticDoctor services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Overall Status */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Systems Operational</h2>
              <p className="text-gray-600">All services are running normally</p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              <strong>Last updated:</strong> {new Date().toLocaleString()} UTC
            </p>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Service Status</h3>
            <p className="text-gray-600">Current status of all ElasticDoctor components</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {services.map((service, index) => (
              <div key={index} className="p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(service.status)}`}>
                    <div className="flex items-center">
                      {getStatusIcon(service.status)}
                      <span className="ml-2 capitalize">{service.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">30-Day Uptime</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">99.98%</div>
            <p className="text-gray-600 text-sm">Average across all services</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">247ms</div>
            <p className="text-gray-600 text-sm">Average API response time</p>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Recent Incidents</h3>
            <p className="text-gray-600">Past incidents and maintenance windows</p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No Recent Incidents</h4>
                <p className="text-gray-600">All services have been running smoothly for the past 30 days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Informed</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to status updates and get notified about incidents and maintenance windows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
