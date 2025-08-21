import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Settings, Activity, Target, Zap, Shield, Layers, Gauge } from 'lucide-react'

export default function IndicesSettingsCheckGuide() {
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
            Index Settings Check: Configuration Optimization Guide
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Optimize index settings for performance, storage efficiency, and search responsiveness. Learn how to configure indices for maximum efficiency.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 3, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              16 min read
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
                <Settings className="w-6 h-6 text-purple-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Why Index Settings Matter</h3>
                  <p className="text-purple-700">
                    Index settings control how your data is stored, indexed, and searched. Proper configuration can dramatically improve performance, reduce storage costs, and enhance search relevance. Poor settings can lead to slow queries, wasted disk space, and operational issues.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Index settings are the foundation of Elasticsearch performance optimization. They determine how your data is processed, stored, and retrieved. ElasticDoctor's index settings check analyzes your configuration against best practices and identifies optimization opportunities that can improve performance by 40-60%.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              API Endpoint and Usage
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">ES 5.x - 9.x</span>
              </div>
              <code className="text-green-300 text-lg">GET /index_name/_settings</code>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ What This Check Analyzes</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Number of shards and replicas</li>
                  <li>• Refresh interval settings</li>
                  <li>• Mapping and field limits</li>
                  <li>• Allocation and routing settings</li>
                  <li>• Codec and compression settings</li>
                  <li>• Merge and translog configuration</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 Key Settings Categories</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Performance</strong>: Refresh, merge, translog</li>
                  <li>• <strong>Capacity</strong>: Shards, replicas, routing</li>
                  <li>• <strong>Storage</strong>: Compression, codec</li>
                  <li>• <strong>Limits</strong>: Fields, mapping size</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Settings */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Layers className="w-6 h-6 mr-3 text-blue-600" />
              Critical Settings Analysis
            </h2>

            <div className="space-y-6">
              {/* Shard Configuration */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Shard Configuration</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`"settings": {
  "index": {
    "number_of_shards": "5",
    "number_of_replicas": "1",
    "shard": {
      "check_on_startup": "false"
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Optimal Shard Sizing</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <strong>Target size</strong>: 10-50GB per shard</li>
                      <li>• <strong>Document count</strong>: 10M-1B documents</li>
                      <li>• <strong>Too many shards</strong>: Overhead, slow cluster state</li>
                      <li>• <strong>Too few shards</strong>: Poor distribution, large segments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Replica Strategy</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <strong>Production</strong>: At least 1 replica</li>
                      <li>• <strong>High availability</strong>: 2+ replicas</li>
                      <li>• <strong>Read-heavy</strong>: More replicas for scaling</li>
                      <li>• <strong>Write-heavy</strong>: Fewer replicas for speed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Refresh Interval */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Refresh Interval Optimization</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`"settings": {
  "index": {
    "refresh_interval": "30s"
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Real-time (1s)</h4>
                    <p className="text-green-700 text-sm">Use for dashboards, monitoring, or when immediate visibility is critical.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Balanced (30s)</h4>
                    <p className="text-blue-700 text-sm">Good for most use cases. Balances performance with reasonable freshness.</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Bulk Loading (-1)</h4>
                    <p className="text-purple-700 text-sm">Disable refresh during bulk operations, then enable afterward.</p>
                  </div>
                </div>
              </div>

              {/* Compression and Storage */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Compression and Storage</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`"settings": {
  "index": {
    "codec": "best_compression",
    "store": {
      "preload": ["doc", "term"]
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Compression Options</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <strong>default</strong>: Fastest indexing, larger size</li>
                      <li>• <strong>best_compression</strong>: Slower indexing, 50% smaller</li>
                      <li>• Consider storage costs vs. indexing speed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Store Preloading</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Loads file extensions into memory</li>
                      <li>• Improves search performance</li>
                      <li>• Requires sufficient heap memory</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
              Common Configuration Issues
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Too Many Shards</h3>
                <p className="text-red-700 mb-4">Index has excessive number of shards relative to data size, causing cluster state bloat and performance degradation.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Solutions:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Use shrink API to reduce shard count: <code className="bg-gray-100 px-1 rounded">POST /source/_shrink/target</code></li>
                    <li>2. Reindex with proper shard count for future indices</li>
                    <li>3. Consider index templates for automatic configuration</li>
                    <li>4. Review shard sizing guidelines (10-50GB per shard)</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Aggressive Refresh Interval</h3>
                <p className="text-yellow-700 mb-4">Refresh interval is too frequent, causing unnecessary resource consumption and reduced indexing performance.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optimization:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Increase refresh interval to 30s or higher for bulk operations</li>
                    <li>• Use _refresh API sparingly for immediate visibility needs</li>
                    <li>• Consider application-level caching for frequently accessed data</li>
                    <li>• Monitor segment merge activity and I/O patterns</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Single Replica in Production</h3>
                <p className="text-blue-700 mb-4">Index has only one replica, which may be insufficient for high availability or read scaling requirements.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Considerations:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Increase replicas for better availability and read performance</li>
                    <li>• Balance replica count with cluster capacity</li>
                    <li>• Consider allocation awareness for rack/zone distribution</li>
                    <li>• Monitor query load distribution across replicas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Index Settings Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Performance Optimization</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Size shards to 10-50GB for optimal performance</li>
                    <li>• Use appropriate refresh intervals (30s+ for bulk data)</li>
                    <li>• Enable best_compression for archival data</li>
                    <li>• Configure merge policy for your write patterns</li>
                    <li>• Set routing for even distribution</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Operational Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Use index templates for consistent configuration</li>
                    <li>• Monitor shard sizes and rebalance when needed</li>
                    <li>• Implement allocation rules for hardware tiers</li>
                    <li>• Set up rollover policies for time-based indices</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Mistakes</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Creating too many small shards</li>
                    <li>• Using 1s refresh for non-realtime data</li>
                    <li>• Ignoring replica count in production</li>
                    <li>• Not considering compression for cold data</li>
                    <li>• Forgetting to update settings after migration</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Monitoring Points</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Track shard size growth over time</li>
                    <li>• Monitor refresh and merge activity</li>
                    <li>• Watch for allocation failures</li>
                    <li>• Check storage utilization patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Configuration Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Configuration Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">High-Performance Real-time Index</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`PUT /realtime-logs
{
  "settings": {
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 2,
      "refresh_interval": "1s",
      "translog": {
        "flush_threshold_size": "1gb",
        "sync_interval": "30s"
      },
      "merge": {
        "policy": {
          "max_merged_segment": "5gb"
        }
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bulk Loading Optimized Index</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`PUT /bulk-data
{
  "settings": {
    "index": {
      "number_of_shards": 1,
      "number_of_replicas": 0,
      "refresh_interval": -1,
      "translog": {
        "flush_threshold_size": "2gb",
        "durability": "async"
      },
      "merge": {
        "policy": {
          "max_merge_at_once": 30,
          "segments_per_tier": 30
        }
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Archive/Cold Storage Index</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`PUT /archive-data
{
  "settings": {
    "index": {
      "number_of_shards": 1,
      "number_of_replicas": 1,
      "refresh_interval": "30s",
      "codec": "best_compression",
      "routing": {
        "allocation": {
          "require": {
            "box_type": "cold"
          }
        }
      },
      "store": {
        "preload": ["doc"]
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Optimizing Your Index Settings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Takeaways</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Proper shard sizing is critical for performance</li>
                    <li>• Refresh intervals should match your use case</li>
                    <li>• Compression settings can significantly reduce storage</li>
                    <li>• Replica count affects both availability and performance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Items</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Review current shard sizes and distribution</li>
                    <li>• Adjust refresh intervals based on requirements</li>
                    <li>• Implement index templates for consistency</li>
                    <li>• Monitor performance after configuration changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/cat-indices-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cat Indices Check
              </Link>
              <Link href="/blog/indices-stats-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Index Stats Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
