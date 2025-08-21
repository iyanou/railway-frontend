import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Activity, Target, Zap, Shield, Layers, HardDrive } from 'lucide-react'

export default function DataTiersCheckGuide() {
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
            <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
              Health Checks - Operations
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data Tiers Check: Hot, Warm, and Cold Storage Optimization
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Configure data tiers effectively, optimize storage costs, and improve query performance with intelligent data placement strategies.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 23, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              13 min read
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
            <div className="bg-teal-50 border-l-4 border-teal-400 p-6 mb-8">
              <div className="flex">
                <Layers className="w-6 h-6 text-teal-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-teal-800 mb-2">Smart Storage Management</h3>
                  <p className="text-teal-700">
                    Data tiers allow you to optimize storage costs and performance by automatically moving data through different storage classes based on access patterns. Proper tier configuration can reduce storage costs by 60-80% while maintaining query performance for active data.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The data tiers check evaluates your storage tier configuration, node allocation, and data distribution patterns. It identifies cost optimization opportunities, performance bottlenecks, and ensures your data placement strategy aligns with access patterns and business requirements.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Data Tiers API
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">Data Tier APIs</span>
                <span className="text-gray-400 text-sm">ES 7.10+</span>
              </div>
              <div className="space-y-2">
                <div><code className="text-green-300">GET /_nodes/stats</code> <span className="text-gray-400">- Node tier information</span></div>
                <div><code className="text-green-300">GET /_cat/allocation?v</code> <span className="text-gray-400">- Shard allocation by tier</span></div>
                <div><code className="text-green-300">GET /_ilm/policy</code> <span className="text-gray-400">- ILM tier transitions</span></div>
                <div><code className="text-green-300">GET /_cluster/settings</code> <span className="text-gray-400">- Tier routing settings</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ What This Check Monitors</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Node tier configuration and roles</li>
                  <li>• Data distribution across tiers</li>
                  <li>• ILM policy effectiveness</li>
                  <li>• Storage cost optimization</li>
                  <li>• Performance by tier</li>
                  <li>• Capacity utilization</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🏗️ Tier Architecture</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Hot</strong>: Active data, fast SSD storage</li>
                  <li>• <strong>Warm</strong>: Occasionally accessed data</li>
                  <li>• <strong>Cold</strong>: Rarely accessed, searchable</li>
                  <li>• <strong>Frozen</strong>: Archive, searchable snapshots</li>
                  <li>• <strong>Content</strong>: General purpose data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tier Configuration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HardDrive className="w-6 h-6 mr-3 text-blue-600" />
              Tier Configuration and Management
            </h2>

            <div className="space-y-6">
              {/* Hot Tier */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Hot Tier (data_hot)</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Hot tier node configuration
node.roles: ["data_hot", "master"]

# Index template for hot tier
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "index.routing.allocation.include._tier_preference": "data_hot",
      "index.number_of_shards": 1,
      "index.number_of_replicas": 1,
      "index.refresh_interval": "1s"
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Characteristics</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Fastest storage (NVMe SSD)</li>
                      <li>• High CPU and memory</li>
                      <li>• Real-time indexing and search</li>
                      <li>• Most expensive per GB</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Use Cases</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Recent logs and metrics</li>
                      <li>• Active application data</li>
                      <li>• Real-time analytics</li>
                      <li>• Frequently searched data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Warm Tier */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Warm Tier (data_warm)</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Warm tier transition policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "7d"
          }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "allocate": {
            "require": {
              "_tier_preference": "data_warm"
            },
            "number_of_replicas": 0
          },
          "forcemerge": {
            "max_num_segments": 1
          }
        }
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Characteristics</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Standard SSD storage</li>
                      <li>• Reduced replica count</li>
                      <li>• Force-merged segments</li>
                      <li>• 50% cost savings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Optimizations</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Reduce replicas to 0 or 1</li>
                      <li>• Force merge to 1 segment</li>
                      <li>• Longer refresh intervals</li>
                      <li>• Compress source data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cold Tier */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Cold Tier (data_cold)</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Cold tier configuration
{
  "cold": {
    "min_age": "30d",
    "actions": {
      "allocate": {
        "require": {
          "_tier_preference": "data_cold"
        },
        "number_of_replicas": 0
      },
      "readonly": {},
      "forcemerge": {
        "max_num_segments": 1
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Characteristics</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Cheaper storage (HDD/slower SSD)</li>
                      <li>• Read-only access</li>
                      <li>• No replicas typically</li>
                      <li>• 80% cost savings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Optimizations</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Mark indices as read-only</li>
                      <li>• Single segment per shard</li>
                      <li>• Maximum compression</li>
                      <li>• Minimal compute resources</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Frozen Tier */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Frozen Tier (data_frozen)</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Frozen tier with searchable snapshots
{
  "frozen": {
    "min_age": "365d",
    "actions": {
      "searchable_snapshot": {
        "snapshot_repository": "my_repository",
        "force_merge_index": true
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Characteristics</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Object storage (S3, GCS, Azure)</li>
                      <li>• Searchable snapshots</li>
                      <li>• Very slow query performance</li>
                      <li>• 95% cost savings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Best Practices</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Use for compliance/archive data</li>
                      <li>• Configure cache settings</li>
                      <li>• Optimize snapshot repository</li>
                      <li>• Plan for query latency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-blue-600" />
              Tier Performance Analysis
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">📊 Performance Characteristics by Tier</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center bg-white rounded p-4">
                  <div className="text-2xl font-bold text-red-600">~1ms</div>
                  <div className="text-sm text-red-700">Hot Tier</div>
                  <div className="text-xs text-red-600">Query latency</div>
                </div>
                <div className="text-center bg-white rounded p-4">
                  <div className="text-2xl font-bold text-yellow-600">~10ms</div>
                  <div className="text-sm text-yellow-700">Warm Tier</div>
                  <div className="text-xs text-yellow-600">Query latency</div>
                </div>
                <div className="text-center bg-white rounded p-4">
                  <div className="text-2xl font-bold text-blue-600">~100ms</div>
                  <div className="text-sm text-blue-700">Cold Tier</div>
                  <div className="text-xs text-blue-600">Query latency</div>
                </div>
                <div className="text-center bg-white rounded p-4">
                  <div className="text-2xl font-bold text-purple-600">~1-10s</div>
                  <div className="text-sm text-purple-700">Frozen Tier</div>
                  <div className="text-xs text-purple-600">Query latency</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">🎯 ElasticDoctor Tier Analysis</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Distribution Analysis</h5>
                    <ul className="text-green-600 space-y-1 text-sm">
                      <li>• Evaluates data distribution across tiers</li>
                      <li>• Identifies misallocated indices</li>
                      <li>• Calculates cost optimization opportunities</li>
                      <li>• Monitors tier utilization patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Performance Optimization</h5>
                    <ul className="text-green-600 space-y-1 text-sm">
                      <li>• Analyzes query patterns by tier</li>
                      <li>• Recommends tier transition timing</li>
                      <li>• Identifies hot tier bottlenecks</li>
                      <li>• Optimizes frozen tier cache usage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Data Tier Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Design Principles</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Plan tier transitions based on access patterns</li>
                    <li>• Configure appropriate hardware per tier</li>
                    <li>• Use ILM policies for automatic transitions</li>
                    <li>• Monitor storage costs and utilization</li>
                    <li>• Test query performance across tiers</li>
                    <li>• Plan for disaster recovery scenarios</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Optimization Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Size hot tier for active data only</li>
                    <li>• Use force merge in warm/cold tiers</li>
                    <li>• Reduce replicas as data ages</li>
                    <li>• Implement searchable snapshots for archives</li>
                    <li>• Monitor and adjust ILM timing</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Mistakes</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Keeping all data in hot tier</li>
                    <li>• Poor ILM policy timing</li>
                    <li>• Not optimizing storage per tier</li>
                    <li>• Ignoring query performance differences</li>
                    <li>• Inadequate capacity planning</li>
                    <li>• Not monitoring tier utilization</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Performance Considerations</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Plan for query latency increases</li>
                    <li>• Monitor cold/frozen tier performance</li>
                    <li>• Optimize cache settings for frozen data</li>
                    <li>• Consider cross-tier query patterns</li>
                    <li>• Plan maintenance windows for transitions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              Cost Analysis and Optimization
            </h2>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-teal-800 mb-3">💰 Storage Cost Comparison</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">$1.00</div>
                  <div className="text-sm text-teal-700">Hot Tier</div>
                  <div className="text-xs text-teal-600">per GB/month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">$0.50</div>
                  <div className="text-sm text-yellow-700">Warm Tier</div>
                  <div className="text-xs text-yellow-600">50% savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$0.20</div>
                  <div className="text-sm text-blue-700">Cold Tier</div>
                  <div className="text-xs text-blue-600">80% savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$0.05</div>
                  <div className="text-sm text-purple-700">Frozen Tier</div>
                  <div className="text-xs text-purple-600">95% savings</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">📊 Cost Optimization Strategies</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Data Lifecycle Management</h5>
                    <ul className="text-green-600 space-y-1 text-sm">
                      <li>• Implement aggressive ILM policies</li>
                      <li>• Use searchable snapshots for frozen data</li>
                      <li>• Optimize retention policies by use case</li>
                      <li>• Monitor data access patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">Hardware Optimization</h5>
                    <ul className="text-green-600 space-y-1 text-sm">
                      <li>• Use appropriate storage types per tier</li>
                      <li>• Scale nodes based on tier requirements</li>
                      <li>• Implement compression strategies</li>
                      <li>• Optimize replica counts by tier</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Optimizing Data Storage Strategy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Benefits</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Significant cost reduction through intelligent tiering</li>
                    <li>• Improved query performance for active data</li>
                    <li>• Efficient resource utilization across tiers</li>
                    <li>• Scalable architecture for long-term growth</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Implementation Strategy</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Analyze current data access patterns</li>
                    <li>• Configure appropriate node roles and hardware</li>
                    <li>• Implement ILM policies for automatic transitions</li>
                    <li>• Monitor and optimize tier utilization</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/ilm-policies-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: ILM Policies Check
              </Link>
              <Link href="/blog/mappings-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Mappings Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
