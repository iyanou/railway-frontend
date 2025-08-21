import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Database, Server, AlertTriangle, CheckCircle, Code, Target, Shield, BarChart3 } from 'lucide-react'

export default function CatShardsCheckGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="mb-6">
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              Health Checks - Data Layer
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cat Shards Check: Shard Distribution and Health Monitoring
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Monitor shard allocation, identify unassigned shards, and ensure optimal data distribution across your Elasticsearch cluster for peak performance and reliability.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 7, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              14 min read
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              ElasticDoctor Team
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-sm p-8">
          
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
              <div className="flex">
                <BarChart3 className="w-6 h-6 text-purple-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Shard Health Microscope</h3>
                  <p className="text-purple-700">
                    The cat shards API provides detailed visibility into shard allocation, distribution patterns, and health status across all indices. It's your window into the data layer's operational state.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Shard distribution is the foundation of Elasticsearch's scalability and resilience. The cat shards check examines every shard in your cluster, analyzing allocation patterns, identifying problematic shards, and ensuring optimal data distribution for performance and availability.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Cat Shards API Deep Dive
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">All ES Versions (5.x - 9.x)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_cat/shards?v&amp;h=index,shard,prirep,state,docs,store,ip,node&amp;s=index</code>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔍 Shard Information</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>State</strong>: STARTED, INITIALIZING, RELOCATING, UNASSIGNED</li>
                  <li>• <strong>Type</strong>: Primary (p) or Replica (r)</li>
                  <li>• <strong>Size</strong>: Storage utilization per shard</li>
                  <li>• <strong>Documents</strong>: Document count per shard</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">📊 Distribution Analysis</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Node Allocation</strong>: Which node hosts each shard</li>
                  <li>• <strong>Balance</strong>: Even distribution across nodes</li>
                  <li>• <strong>Hotspots</strong>: Overloaded nodes identification</li>
                  <li>• <strong>Availability</strong>: Replica placement validation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ElasticDoctor Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              ElasticDoctor Shard Analysis
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Shard Distribution</h3>
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Distribution Balance Analysis</h4>
                  <p className="text-gray-600 text-sm">
                    ElasticDoctor evaluates shard distribution across nodes to identify imbalances and hotspots that could impact performance and availability.
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Unassigned Shard Detection</h4>
                  <p className="text-gray-600 text-sm">
                    Automatically identifies unassigned shards and categorizes them by severity, with immediate alerts for unassigned primary shards that affect data availability.
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Shard Size Optimization</h4>
                  <p className="text-gray-600 text-sm">
                    Monitors shard sizes to identify oversized shards that may impact performance and undersized shards that waste resources.
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Allocation Health Scoring</h4>
                  <p className="text-gray-600 text-sm">
                    Provides comprehensive allocation health scoring based on distribution balance, shard states, and replica placement patterns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Shard Management Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Optimal Distribution</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Aim for even shard distribution across nodes</li>
                    <li>• Keep shard sizes between 10-50GB for optimal performance</li>
                    <li>• Ensure primary and replica shards on different nodes</li>
                    <li>• Monitor and maintain balanced storage utilization</li>
                    <li>• Use allocation awareness for rack/zone distribution</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Monitoring Strategy</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Regular shard health checks</li>
                    <li>• Alert on unassigned shard conditions</li>
                    <li>• Track shard size growth over time</li>
                    <li>• Monitor rebalancing operations</li>
                    <li>• Validate replica placement</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Distribution Anti-Patterns</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Too many small shards (&lt;1GB)</li>
                    <li>• Oversized shards (&gt;50GB)</li>
                    <li>• All shards on single node</li>
                    <li>• Primary and replica on same node</li>
                    <li>• Ignoring unassigned shards</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Performance Impact</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Unbalanced load affects query performance</li>
                    <li>• Large shards slow search operations</li>
                    <li>• Too many shards increase overhead</li>
                    <li>• Relocation impacts cluster performance</li>
                    <li>• Unassigned shards cause data unavailability</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shard Health Mastery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Distribution Excellence</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Balanced Allocation</strong>: Even distribution across nodes</li>
                    <li>• <strong>Optimal Sizing</strong>: Right-sized shards for performance</li>
                    <li>• <strong>High Availability</strong>: Proper replica placement</li>
                    <li>• <strong>Proactive Monitoring</strong>: Early issue detection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Operational Excellence</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Monitor shard states continuously</li>
                    <li>• Address unassigned shards immediately</li>
                    <li>• Maintain balanced distribution</li>
                    <li>• Plan for capacity and growth</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/indices-stats-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Index Stats Check
              </Link>
              <Link href="/blog/allocation-explain-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Allocation Explain Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
