import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Info, Shield, Database, Activity, TrendingUp, Users, Lock, Server, Search, Gauge, Clock, BarChart3, AlertTriangle, Eye, Cpu, Layers, Timer, Wifi, HardDrive, Zap, Settings, Target, FileText, BookOpen, Lightbulb, Star, Crown, Award } from 'lucide-react'

export default function BestPracticesPage() {
  const practiceCategories = [
    {
      title: "Performance Optimization",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      practices: [
        {
          title: "JVM Heap Sizing",
          description: "Configure optimal heap sizes for your workload",
          priority: "High",
          effort: "Medium",
          tips: [
            "Set heap size to 50% of available RAM, max 32GB",
            "Use compressed OOPs for heaps under 32GB",
            "Monitor GC frequency and adjust accordingly",
            "Consider G1GC for large heaps (&gt;6GB)"
          ]
        },
        {
          title: "Index Management",
          description: "Optimize index settings for performance",
          priority: "High", 
          effort: "Medium",
          tips: [
            "Use time-based indices for time-series data",
            "Set appropriate refresh intervals",
            "Optimize shard count: aim for 20-40GB per shard",
            "Use index templates for consistent settings"
          ]
        },
        {
          title: "Query Optimization",
          description: "Write efficient queries and avoid common pitfalls",
          priority: "Medium",
          effort: "Low",
          tips: [
            "Use filters instead of queries when possible",
            "Avoid deep pagination with from/size",
            "Use scroll API for large result sets",
            "Profile slow queries with _profile API"
          ]
        }
      ]
    },
    {
      title: "Security Hardening",
      icon: <Shield className="w-6 h-6" />,
      color: "text-green-600", 
      bgColor: "bg-green-100",
      practices: [
        {
          title: "Authentication & Authorization",
          description: "Implement proper access controls",
          priority: "Critical",
          effort: "High",
          tips: [
            "Enable X-Pack Security or Open Distro Security",
            "Use strong passwords and enforce password policies",
            "Implement role-based access control (RBAC)",
            "Regular audit of user permissions"
          ]
        },
        {
          title: "Network Security",
          description: "Secure network communications",
          priority: "Critical",
          effort: "Medium",
          tips: [
            "Enable TLS for all communications",
            "Use VPN or private networks for cluster traffic",
            "Implement IP whitelisting",
            "Disable unnecessary HTTP endpoints"
          ]
        },
        {
          title: "API Key Management",
          description: "Secure API access with proper key management",
          priority: "High",
          effort: "Low",
          tips: [
            "Use API keys instead of username/password",
            "Implement key rotation policies",
            "Restrict API key permissions to minimum required",
            "Monitor API key usage patterns"
          ]
        }
      ]
    },
    {
      title: "Monitoring & Observability",
      icon: <Eye className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100", 
      practices: [
        {
          title: "Metrics Collection",
          description: "Implement comprehensive monitoring",
          priority: "High",
          effort: "Medium",
          tips: [
            "Monitor cluster health, node stats, and indices metrics",
            "Set up alerts for critical thresholds",
            "Use Elastic Stack monitoring or external tools",
            "Track query performance and slow queries"
          ]
        },
        {
          title: "Log Management",
          description: "Centralize and analyze Elasticsearch logs",
          priority: "Medium",
          effort: "Low",
          tips: [
            "Configure appropriate log levels",
            "Centralize logs using Filebeat or similar",
            "Set up log rotation and retention policies",
            "Monitor for ERROR and WARN level messages"
          ]
        },
        {
          title: "Health Checks",
          description: "Regular health assessments",
          priority: "Medium",
          effort: "Low",
          tips: [
            "Run ElasticDoctor diagnostics weekly",
            "Monitor cluster status and shard allocation",
            "Check disk space and memory usage trends",
            "Review deprecated features and upgrade paths"
          ]
        }
      ]
    },
    {
      title: "Infrastructure & Scaling",
      icon: <Server className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      practices: [
        {
          title: "Node Configuration",
          description: "Optimize node settings for reliability",
          priority: "High",
          effort: "Medium",
          tips: [
            "Use dedicated master nodes for clusters &gt;3 nodes",
            "Configure minimum master nodes properly",
            "Separate hot and warm data nodes for time-series",
            "Use coordinating nodes for heavy query loads"
          ]
        },
        {
          title: "Capacity Planning",
          description: "Plan for growth and resource needs",
          priority: "High",
          effort: "High",
          tips: [
            "Monitor growth trends and plan accordingly",
            "Size nodes based on workload requirements",
            "Plan for peak loads and seasonal variations",
            "Implement automated scaling where possible"
          ]
        },
        {
          title: "Backup & Recovery",
          description: "Implement robust backup strategies",
          priority: "Critical",
          effort: "Medium",
          tips: [
            "Set up automated snapshot policies",
            "Test backup restoration procedures regularly",
            "Store backups in multiple locations",
            "Document recovery procedures and RTO/RPO"
          ]
        }
      ]
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
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
            <span className="text-gray-900">Best Practices</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Elasticsearch Best Practices
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive guide to optimize performance, security, and reliability of your Elasticsearch clusters
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <p className="text-gray-600 mb-4">
              This guide covers essential best practices for running Elasticsearch in production environments. 
              Each recommendation is categorized by priority and implementation effort to help you focus on the most impactful improvements.
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Performance Tips</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">9</div>
                <div className="text-sm text-gray-600">Security Practices</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">9</div>
                <div className="text-sm text-gray-600">Monitoring Setup</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-600">Infrastructure</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <p className="text-blue-800 font-medium">Implementation Priority</p>
                <p className="text-blue-700 text-sm">
                  Start with Critical and High priority items, then gradually implement Medium and Low priority improvements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices by Category</h2>
          
          <div className="space-y-12">
            {practiceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                      <span className={category.color}>{category.icon}</span>
                    </div>
                    {category.title}
                    <span className="ml-4 text-sm text-gray-500">({category.practices.length} practices)</span>
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {category.practices.map((practice, practiceIndex) => (
                      <div key={practiceIndex} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{practice.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{practice.description}</p>
                            <div className="flex items-center space-x-3 mb-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(practice.priority)}`}>
                                Priority: {practice.priority}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(practice.effort)}`}>
                                Effort: {practice.effort}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Implementation Tips:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {practice.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Version-Specific Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Version-Specific Recommendations</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 text-green-600 mr-2" />
                Elasticsearch 8.x
              </h3>
              <p className="text-gray-600 mb-4">Latest version with enhanced security and performance</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Security enabled by default</li>
                <li>• Improved query performance</li>
                <li>• Better memory management</li>
                <li>• Enhanced monitoring capabilities</li>
                <li>• Natural language processing features</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 text-blue-600 mr-2" />
                Elasticsearch 7.x
              </h3>
              <p className="text-gray-600 mb-4">Stable and widely adopted version</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Mature ecosystem and plugins</li>
                <li>• Well-tested in production</li>
                <li>• Good documentation and examples</li>
                <li>• Consider upgrade path to 8.x</li>
                <li>• Plan for end-of-life timeline</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Wins */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Wins (Low Effort, High Impact)</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Immediate Actions</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Enable cluster health monitoring
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Set up basic authentication
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Configure log rotation
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Review default settings
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Weekly Tasks</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                    Run ElasticDoctor diagnostics
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                    Check disk space usage
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                    Review slow query logs
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                    Monitor cluster health trends
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Roadmap</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 text-red-600 mr-2" />
                Week 1-2: Critical Security & Stability
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Enable authentication and authorization</li>
                <li>• Configure TLS/SSL for all communications</li>
                <li>• Set up automated backups</li>
                <li>• Configure proper master node settings</li>
                <li>• Run comprehensive health check</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 text-orange-600 mr-2" />
                Week 3-4: Performance Optimization
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Optimize JVM heap sizing</li>
                <li>• Review and optimize index settings</li>
                <li>• Set up monitoring and alerting</li>
                <li>• Implement log management</li>
                <li>• Optimize query patterns</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                Month 2: Advanced Configuration
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Implement capacity planning</li>
                <li>• Set up automated scaling</li>
                <li>• Configure advanced security features</li>
                <li>• Optimize for specific use cases</li>
                <li>• Document procedures and runbooks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Pitfalls to Avoid</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Over-sharding</h4>
                  <p className="text-gray-600 text-sm">Too many small shards can hurt performance. Aim for 20-40GB per shard.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Ignoring heap size limits</h4>
                  <p className="text-gray-600 text-sm">Never exceed 32GB heap size. Use 50% of available RAM as a starting point.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Running without backups</h4>
                  <p className="text-gray-600 text-sm">Always have automated backup policies in place and test recovery procedures.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Mixing node roles inappropriately</h4>
                  <p className="text-gray-600 text-sm">Use dedicated master nodes for clusters with more than 3 nodes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs/health-checks" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Health Checks Guide</h3>
                <p className="text-gray-600 text-sm">Understanding ElasticDoctor's comprehensive health checks</p>
              </div>
            </Link>
            
            <Link href="/docs/connection" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <Settings className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Connection Setup</h3>
                <p className="text-gray-600 text-sm">Secure connection configuration across all ES versions</p>
              </div>
            </Link>
            
            <Link href="/docs/features" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <Shield className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Features & Automation</h3>
                <p className="text-gray-600 text-sm">Set up monitoring and automated diagnostics</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/diagnose" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Assess Your Cluster
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Run ElasticDoctor to identify which best practices to implement first
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  Start Assessment
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
            
            <Link href="/docs/features" className="block">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Automate Monitoring
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Set up scheduled diagnostics and automated reporting
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
          <h2 className="text-2xl font-bold mb-4">Need Implementation Help?</h2>
          <p className="text-gray-300 mb-6">
            Our team can help you implement these best practices and provide guidance on optimization strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center">
              Contact Support
            </Link>
            <Link href="/docs/health-checks" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center">
              Health Checks Guide
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}