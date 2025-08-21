import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User, Tag, Search, Filter, TrendingUp, Database, Shield, Settings, Activity, Eye, Server, FileText, Zap, Award, BookOpen, Target } from 'lucide-react'

export default function BlogPage() {
  const featuredPosts = [
    {
      id: 'elasticsearch-health-score-algorithm',
      title: 'The Elasticsearch Health Score: How ElasticDoctor Calculates Your Cluster\'s Fitness',
      excerpt: 'Deep dive into the weighted scoring algorithm behind ElasticDoctor\'s 0-100 health score and why different checks have different importance levels.',
      author: 'ElasticDoctor Team',
      date: '2024-12-15',
      readTime: '5 min read',
      category: 'Technical Deep Dive',
      image: '/blog/health-score.jpg',
      featured: true,
      tags: ['Algorithm', 'Health Score', 'Monitoring']
    },
    {
      id: 'cluster-health-check',
      title: 'Elasticsearch Cluster Health Check: Complete Guide to /_cluster/health API',
      excerpt: 'Master the most important Elasticsearch diagnostic API. Learn how to interpret cluster status, understand shard allocation, and prevent outages.',
      author: 'ElasticDoctor Team',
      date: '2024-12-14',
      readTime: '4 min read',
      category: 'Health Checks',
      image: '/blog/cluster-health.jpg',
      featured: true,
      tags: ['Cluster Health', 'API', 'Monitoring']
    },
    {
      id: 'multi-version-diagnostics',
      title: 'Multi-Version Elasticsearch Diagnostics: Why Your Monitoring Tool Should Understand ES History',
      excerpt: 'Explore the evolution of Elasticsearch APIs from 5.x to 9.x and how ElasticDoctor handles version-specific diagnostic challenges.',
      author: 'ElasticDoctor Team',
      date: '2024-12-13',
      readTime: '6 min read',
      category: 'Technical Deep Dive',
      image: '/blog/multi-version.jpg',
      featured: true,
      tags: ['Versions', 'Compatibility', 'Evolution']
    }
  ]

  const healthCheckPosts = [
    // Phase 1: Foundation
    {
      id: 'cluster-info-check',
      title: 'Cluster Info Check: Foundation of Elasticsearch Diagnostics',
      excerpt: 'Understand cluster identification, version detection, and the critical information gathered from the root API endpoint.',
      category: 'Health Checks - Foundation',
      readTime: '4 min read',
      date: '2024-12-12',
      tags: ['Foundation', 'Cluster Info', 'Version Detection']
    },
    {    
      id: 'cluster-health-check',
      title: 'Elasticsearch Cluster Health Check: Complete Guide to /_cluster/health API',
      excerpt: 'Master the most important Elasticsearch diagnostic API. Learn how to interpret cluster status, understand shard allocation, and prevent outages.',
      category: 'Health Checks - Foundation',
      readTime: '4 min read',
      date: '2024-12-14',
      tags: ['Cluster Health', 'API', 'Monitoring']
    },
    {
      id: 'cluster-license-check',
      title: 'Cluster License Check: Managing Elasticsearch Features and Compliance',
      excerpt: 'Navigate Elasticsearch licensing, feature availability, and ensure compliance across different license types.',
      category: 'Health Checks - Foundation',
      readTime: '4 min read',
      date: '2024-12-11',
      tags: ['License', 'Features', 'Compliance']
    },
    {
      id: 'cluster-settings-check',
      title: 'Cluster Settings Check: Configuration Optimization and Security',
      excerpt: 'Analyze cluster-level settings for performance optimization, security hardening, and operational excellence.',
      category: 'Health Checks - Foundation',
      readTime: '7 min read',
      date: '2024-12-10',
      tags: ['Settings', 'Configuration', 'Security']
    },
    
    // Phase 2: Infrastructure
    {
      id: 'nodes-info-check',
      title: 'Nodes Info Check: Hardware Assessment and Role Validation',
      excerpt: 'Evaluate node hardware specifications, roles, and infrastructure requirements for optimal cluster performance.',
      category: 'Health Checks - Infrastructure',
      readTime: '6 min read',
      date: '2024-12-09',
      tags: ['Nodes', 'Hardware', 'Infrastructure']
    },
    {
      id: 'nodes-performance-check',
      title: 'Node Performance Check: CPU, Memory, and Resource Monitoring',
      excerpt: 'Monitor node-level performance metrics, identify bottlenecks, and optimize resource utilization.',
      category: 'Health Checks - Infrastructure',
      readTime: '4 min read',
      date: '2024-12-08',
      tags: ['Performance', 'Resources', 'Optimization']
    },
    {
      id: 'nodes-settings-check',
      title: 'Node Settings Check: Configuration Best Practices per Node',
      excerpt: 'Validate node-specific configurations, JVM settings, and ensure consistent cluster behavior.',
      category: 'Health Checks - Infrastructure',
      readTime: '5 min read',
      date: '2024-12-07',
      tags: ['Node Settings', 'JVM', 'Configuration']
    },
    {
      id: 'nodes-stats-check',
      title: 'Node Stats Check: Real-time Metrics and Health Indicators',
      excerpt: 'Analyze real-time node statistics, track performance trends, and predict capacity needs.',
      category: 'Health Checks - Infrastructure',
      readTime: '6 min read',
      date: '2024-12-06',
      tags: ['Statistics', 'Real-time', 'Metrics']
    },
    {
      id: 'nodes-hot-threads-check',
      title: 'Hot Threads Check: Performance Bottleneck Detection',
      excerpt: 'Identify performance bottlenecks through thread analysis and resolve high CPU usage issues.',
      category: 'Health Checks - Infrastructure',
      readTime: '7 min read',
      date: '2024-12-05',
      tags: ['Hot Threads', 'Bottlenecks', 'CPU']
    },

    // Phase 3: Data Layer
    {
      id: 'cat-indices-check',
      title: 'Cat Indices Check: Index Health and Overview Analysis',
      excerpt: 'Monitor index health, size, document counts, and identify problematic indices quickly.',
      category: 'Health Checks - Data Layer',
      readTime: '5 min read',
      date: '2024-12-04',
      tags: ['Indices', 'Health', 'Monitoring']
    },
    {
      id: 'indices-settings-check',
      title: 'Index Settings Check: Configuration Optimization Guide',
      excerpt: 'Optimize index settings for performance, storage efficiency, and search responsiveness.',
      category: 'Health Checks - Data Layer',
      readTime: '8 min read',
      date: '2024-12-03',
      tags: ['Index Settings', 'Optimization', 'Performance']
    },
    {
      id: 'indices-stats-check',
      title: 'Index Stats Check: Performance Metrics and Usage Analysis',
      excerpt: 'Analyze index performance metrics, search patterns, and optimize for your workload.',
      category: 'Health Checks - Data Layer',
      readTime: '6 min read',
      date: '2024-12-02',
      tags: ['Index Stats', 'Performance', 'Analysis']
    },
    {
      id: 'cat-shards-check',
      title: 'Cat Shards Check: Shard Distribution and Health Monitoring',
      excerpt: 'Monitor shard allocation, identify unassigned shards, and ensure optimal data distribution.',
      category: 'Health Checks - Data Layer',
      readTime: '7 min read',
      date: '2024-12-01',
      tags: ['Shards', 'Distribution', 'Allocation']
    },
    {
      id: 'allocation-explain-check',
      title: 'Allocation Explain Check: Debugging Shard Assignment Issues',
      excerpt: 'Master the allocation explain API to troubleshoot shard assignment problems and resolve allocation issues.',
      category: 'Health Checks - Data Layer',
      readTime: '5 min read',
      date: '2024-11-30',
      tags: ['Allocation', 'Debugging', 'Troubleshooting']
    },

    // Phase 4: Operations
    {
      id: 'cluster-tasks-check',
      title: 'Cluster Tasks Check: Monitoring Long-running Operations',
      excerpt: 'Track cluster tasks, identify stuck operations, and manage cluster workload efficiently.',
      category: 'Health Checks - Operations',
      readTime: '5 min read',
      date: '2024-11-29',
      tags: ['Tasks', 'Operations', 'Monitoring']
    },
    {
      id: 'pending-tasks-check',
      title: 'Pending Tasks Check: Queue Management and Performance',
      excerpt: 'Monitor pending cluster tasks, prevent queue buildup, and ensure responsive cluster operations.',
      category: 'Health Checks - Operations',
      readTime: '4 min read',
      date: '2024-11-28',
      tags: ['Pending Tasks', 'Queue', 'Performance']
    },
    {
      id: 'ingest-pipelines-check',
      title: 'Ingest Pipelines Check: Data Processing and Transformation',
      excerpt: 'Validate ingest pipelines, optimize data processing, and ensure efficient data transformation.',
      category: 'Health Checks - Operations',
      readTime: '6 min read',
      date: '2024-11-27',
      tags: ['Ingest', 'Pipelines', 'Data Processing']
    },
    {
      id: 'snapshots-check',
      title: 'Snapshots Check: Backup Strategy and Disaster Recovery',
      excerpt: 'Ensure robust backup strategies, validate snapshot policies, and prepare for disaster recovery.',
      category: 'Health Checks - Operations',
      readTime: '8 min read',
      date: '2024-11-26',
      tags: ['Snapshots', 'Backup', 'Disaster Recovery']
    },
    {
      id: 'deprecations-check',
      title: 'Deprecations Check: Future-proofing Your Elasticsearch Cluster',
      excerpt: 'Identify deprecated features, plan migration paths, and stay ahead of breaking changes.',
      category: 'Health Checks - Operations',
      readTime: '5 min read',
      date: '2024-11-25',
      tags: ['Deprecations', 'Migration', 'Future-proofing']
    },
    {
      id: 'ilm-policies-check',
      title: 'ILM Policies Check: Index Lifecycle Management Optimization',
      excerpt: 'Optimize index lifecycle policies, manage data tiers, and automate index management.',
      category: 'Health Checks - Operations',
      readTime: '9 min read',
      date: '2024-11-24',
      tags: ['ILM', 'Lifecycle', 'Automation']
    },
    {
      id: 'data-tiers-check',
      title: 'Data Tiers Check: Hot, Warm, and Cold Storage Optimization',
      excerpt: 'Configure data tiers effectively, optimize storage costs, and improve query performance.',
      category: 'Health Checks - Operations',
      readTime: '7 min read',
      date: '2024-11-23',
      tags: ['Data Tiers', 'Storage', 'Cost Optimization']
    },
    {
      id: 'mappings-check',
      title: 'Mappings Check: Field Mapping Analysis and Optimization',
      excerpt: 'Analyze field mappings, prevent mapping explosions, and optimize for search performance.',
      category: 'Health Checks - Operations',
      readTime: '7 min read',
      date: '2024-11-22',
      tags: ['Mappings', 'Fields', 'Optimization']
    }
  ]

  const categories = [
    'All Posts',
    'Health Checks - Foundation',
    'Health Checks - Infrastructure', 
    'Health Checks - Data Layer',
    'Health Checks - Operations',
    'Technical Deep Dive',
    'Best Practices',
    'Case Studies'
  ]

  const allPosts = [...featuredPosts, ...healthCheckPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ElasticDoctor Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth technical guides on Elasticsearch diagnostics, health monitoring, and cluster optimization
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block group">
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <Database className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Health Check Series */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Health Check Deep Dives</h2>
            <div className="flex items-center text-blue-600">
              <Award className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">22-Part Series</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <Target className="w-6 h-6 text-blue-600 mt-1 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Complete Health Check Series</h3>
                <p className="text-blue-800 mb-4">
                  Deep technical analysis of all 22 ElasticDoctor health checks. Each article covers the APIs used, 
                  importance levels, thresholds, and actionable recommendations.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white p-3 rounded">
                    <div className="font-semibold text-blue-900">Phase 1: Foundation</div>
                    <div className="text-blue-700">4 checks</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-semibold text-blue-900">Phase 2: Infrastructure</div>
                    <div className="text-blue-700">5 checks</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-semibold text-blue-900">Phase 3: Data Layer</div>
                    <div className="text-blue-700">5 checks</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-semibold text-blue-900">Phase 4: Operations</div>
                    <div className="text-blue-700">8 checks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthCheckPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                <article className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Elasticsearch Insights
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest technical articles, health check guides, and Elasticsearch best practices delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}