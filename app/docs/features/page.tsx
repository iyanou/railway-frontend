import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Info, Shield, Database, Activity, TrendingUp, Users, Lock, Server, Search, Gauge, Clock, BarChart3, AlertTriangle, Eye, Cpu, Layers, Timer, Wifi, HardDrive, Zap, FileText, Mail, Calendar, Download, Settings, Star, Crown } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/docs" className="hover:text-gray-700">Documentation</Link>
            <span>/</span>
            <span className="text-gray-900">Features & Dashboard</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Features & Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to use ElasticDoctor's dashboard, generate reports, and set up automation
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Dashboard Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <p className="text-gray-600 mb-4">
              The ElasticDoctor dashboard provides a comprehensive view of your cluster's health status, 
              with intuitive visualizations and actionable insights.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Health Score</h3>
                <p className="text-sm text-gray-600">
                  Overall cluster health score from 0-100 based on all checks
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Issue Summary</h3>
                <p className="text-sm text-gray-600">
                  Breakdown of critical, warning, and informational issues
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Prioritized action items with step-by-step guidance
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <p className="text-blue-800 font-medium">Real-time Updates</p>
                <p className="text-blue-700 text-sm">
                  Dashboard refreshes automatically every 30 seconds when viewing live results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Reports */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PDF Report Generation</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Available Plans</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  Standard Plan
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Generate professional PDF reports with all health check results.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Complete health check results</li>
                  <li>• Executive summary</li>
                  <li>• Remediation recommendations</li>
                  <li>• Cluster overview</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Crown className="w-4 h-4 text-blue-600 mr-2" />
                  Premium Plan
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Enhanced reports with historical data and trends.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Everything in Standard</li>
                  <li>• Historical trend analysis</li>
                  <li>• Performance metrics over time</li>
                  <li>• Custom branding options</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Generate Reports</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Run Diagnosis</h4>
                  <p className="text-gray-600 text-sm">Complete a health check of your cluster</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Click "Generate Report"</h4>
                  <p className="text-gray-600 text-sm">Button appears after successful diagnosis</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Download PDF</h4>
                  <p className="text-gray-600 text-sm">Professional report ready to share with your team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Email Notifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Notifications</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Premium Feature</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Premium subscribers can receive automated email notifications with health check results and reports.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">What's Included</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Executive summary</li>
                  <li>• Critical issues alerts</li>
                  <li>• PDF report attachment</li>
                  <li>• Dashboard link</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Delivery Options</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Immediate after diagnosis</li>
                  <li>• Scheduled daily/weekly</li>
                  <li>• Only for critical issues</li>
                  <li>• Multiple recipients</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <p className="text-yellow-800 font-medium">Email Setup Required</p>
                <p className="text-yellow-700 text-sm">
                  Configure your email preferences in account settings to receive notifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scheduled Diagnostics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheduled Diagnostics</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Automation (Premium)</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Automate your cluster health monitoring with scheduled diagnostics that run daily or weekly.
            </p>
            
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Schedule Options</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Daily</h5>
                    <p className="text-sm text-gray-600">Run diagnostics every day at specified time</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Weekly</h5>
                    <p className="text-sm text-gray-600">Run diagnostics on specific days of the week</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Proactive monitoring without manual effort</li>
                  <li>• Consistent health tracking over time</li>
                  <li>• Automatic email delivery of results</li>
                  <li>• Early detection of degrading performance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Setting Up Scheduled Diagnostics</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Access Settings</h4>
                  <p className="text-gray-600 text-sm">Go to Account Settings &gt; Scheduled Diagnostics</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Configure Schedule</h4>
                  <p className="text-gray-600 text-sm">Choose frequency (daily/weekly) and time</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Set Notifications</h4>
                  <p className="text-gray-600 text-sm">Configure email recipients and alert preferences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health Score History */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Score History</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Track Progress Over Time</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Premium subscribers can view historical health scores and track improvements over time.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Available Metrics</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Overall health score trends</li>
                  <li>• Issue count by severity</li>
                  <li>• Performance metrics over time</li>
                  <li>• Remediation progress tracking</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Time Ranges</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Last 7 days</li>
                  <li>• Last 30 days</li>
                  <li>• Last 90 days</li>
                  <li>• Custom date ranges</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Plan Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Availability by Plan</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Starter
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Standard
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Dashboard Access
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    PDF Reports
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Email Notifications
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Scheduled Diagnostics
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Health Score History
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/diagnose" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Try the Dashboard
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Run a diagnosis to see the dashboard and features in action
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  Start Diagnosis
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
            
            <Link href="/#pricing" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Upgrade Your Plan
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get access to PDF reports, email notifications, and automation
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  View Pricing
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Support */}
        <section className="bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help with Features?</h2>
          <p className="text-gray-300 mb-6">
            Our team can help you set up reports, configure notifications, and get the most out of ElasticDoctor.
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
