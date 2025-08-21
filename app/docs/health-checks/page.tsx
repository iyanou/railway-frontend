import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Info, Shield, Database, Activity, TrendingUp, Users, Lock, Server, Search, Gauge, Clock, BarChart3, AlertTriangle, Eye, Cpu, Layers, Timer, Wifi, HardDrive, Zap } from 'lucide-react'

export default function HealthChecksPage() {
  
  const healthChecks = [
    {
      category: 'Cluster Health',
      icon: <Database className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      checks: [
        {
          name: 'Cluster Status',
          description: 'Monitors overall cluster health (green/yellow/red)',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'Node Availability',
          description: 'Checks if all nodes are online and reachable',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'Shard Allocation',
          description: 'Verifies proper shard distribution across nodes',
          severity: 'Warning',
          impact: 'Medium'
        },
        {
          name: 'Unassigned Shards',
          description: 'Identifies shards that cannot be allocated',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'Cluster Settings',
          description: 'Reviews cluster-level configuration settings',
          severity: 'Info',
          impact: 'Low'
        }
      ]
    },
    {
      category: 'Performance',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      checks: [
        {
          name: 'Query Performance',
          description: 'Analyzes query response times and throughput',
          severity: 'Warning',
          impact: 'Medium'
        },
        {
          name: 'Indexing Performance',
          description: 'Monitors indexing speed and efficiency',
          severity: 'Warning',
          impact: 'Medium'
        },
        {
          name: 'Memory Usage',
          description: 'Checks heap memory utilization across nodes',
          severity: 'Warning',
          impact: 'High'
        },
        {
          name: 'Disk Usage',
          description: 'Monitors disk space usage and growth trends',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'CPU Utilization',
          description: 'Tracks CPU usage patterns and bottlenecks',
          severity: 'Warning',
          impact: 'Medium'
        },
        {
          name: 'JVM Performance',
          description: 'Analyzes JVM metrics and garbage collection',
          severity: 'Warning',
          impact: 'Medium'
        }
      ]
    },
    {
      category: 'Security',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      checks: [
        {
          name: 'Authentication',
          description: 'Verifies authentication mechanisms are enabled',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'Authorization',
          description: 'Checks role-based access control configuration',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'SSL/TLS Configuration',
          description: 'Validates encryption in transit settings',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'Audit Logging',
          description: 'Ensures security events are being logged',
          severity: 'Warning',
          impact: 'Medium'
        },
        {
          name: 'Network Security',
          description: 'Reviews network binding and firewall settings',
          severity: 'Warning',
          impact: 'Medium'
        }
      ]
    },
    {
      category: 'Operations',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      checks: [
        {
          name: 'Backup Configuration',
          description: 'Validates snapshot and backup settings',
          severity: 'Critical',
          impact: 'High'
        },
        {
          name: 'Index Management',
          description: 'Reviews index lifecycle policies and settings',
          severity: 'Warning',
          impact: 'Medium'
        },
        {
          name: 'Monitoring Setup',
          description: 'Checks if proper monitoring is configured',
          severity: 'Info',
          impact: 'Low'
        },
        {
          name: 'Log Configuration',
          description: 'Verifies logging levels and output settings',
          severity: 'Info',
          impact: 'Low'
        },
        {
          name: 'Version Compatibility',
          description: 'Identifies version-specific issues and recommendations',
          severity: 'Warning',
          impact: 'Medium'
        },
        {
          name: 'Plugin Management',
          description: 'Reviews installed plugins and their configurations',
          severity: 'Info',
          impact: 'Low'
        }
      ]
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'Warning': return 'bg-yellow-100 text-yellow-800'
      case 'Info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/docs" className="hover:text-gray-700">Documentation</Link>
            <span>/</span>
            <span className="text-gray-900">Health Checks</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Health Checks Reference
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive guide to all 22 health checks performed by ElasticDoctor
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <p className="text-gray-600 mb-4">
              ElasticDoctor performs 22 comprehensive health checks across four critical categories. 
              Each check is designed to identify potential issues before they impact your cluster's performance or availability.
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-gray-600">Cluster Health</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-gray-600">Performance</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Security</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">6</div>
                <div className="text-sm text-gray-600">Operations</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <p className="text-blue-800 font-medium">Severity Levels</p>
                <p className="text-blue-700 text-sm">
                  Each check is classified by severity: Critical issues require immediate attention, 
                  Warnings should be addressed for optimal performance, and Informational items provide insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Health Check Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Check Categories</h2>
          
          <div className="space-y-8">
            {healthChecks.map((category, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                      <span className={category.color}>{category.icon}</span>
                    </div>
                    {category.category}
                    <span className="ml-4 text-sm text-gray-500">({category.checks.length} checks)</span>
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {category.checks.map((check, checkIndex) => (
                      <div key={checkIndex} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{check.name}</h4>
                          <p className="text-gray-600 text-sm mb-3">{check.description}</p>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(check.severity)}`}>
                              {check.severity}
                            </span>
                            <span className="text-xs text-gray-500">
                              Impact: {check.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Severity Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Severity Levels</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Critical</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Issues that require immediate attention to prevent data loss, service disruption, or security breaches.
              </p>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-medium">Examples:</p>
                <ul className="text-red-700 text-sm mt-1 space-y-1">
                  <li>• Red cluster status</li>
                  <li>• Unassigned shards</li>
                  <li>• Disabled authentication</li>
                  <li>• Missing backups</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Warning</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Issues that should be addressed to maintain optimal performance and prevent future problems.
              </p>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-yellow-800 text-sm font-medium">Examples:</p>
                <ul className="text-yellow-700 text-sm mt-1 space-y-1">
                  <li>• High memory usage</li>
                  <li>• Slow query performance</li>
                  <li>• Suboptimal settings</li>
                  <li>• Version compatibility</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Info className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Informational</h3>
              </div>
              <p className="text-gray-600 mb-4">
                General insights and recommendations for best practices and optimization opportunities.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">Examples:</p>
                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                  <li>• Configuration recommendations</li>
                  <li>• Best practice suggestions</li>
                  <li>• Optimization opportunities</li>
                  <li>• Version upgrade paths</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Interpret Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Interpret Results</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Review Critical Issues First</h4>
                  <p className="text-gray-600 text-sm">
                    Start with critical issues as they pose the highest risk to your cluster's stability and data integrity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Prioritize by Impact</h4>
                  <p className="text-gray-600 text-sm">
                    Focus on issues with high impact that affect multiple nodes or the entire cluster.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Follow Remediation Steps</h4>
                  <p className="text-gray-600 text-sm">
                    Each check includes specific remediation steps and best practices for resolution.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Monitor Progress</h4>
                  <p className="text-gray-600 text-sm">
                    Re-run diagnostics after making changes to verify improvements and track your cluster's health over time.
                  </p>
                </div>
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
                  Run a Health Check
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Start diagnosing your cluster to see these health checks in action
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  Start Diagnosis
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
            
            <Link href="/docs/features" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Learn About Features
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover how to use dashboards, generate reports, and set up automation
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  View Features
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Support */}
        <section className="bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help Understanding Results?</h2>
          <p className="text-gray-300 mb-6">
            Our team can help you interpret health check results and provide guidance on remediation strategies.
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
