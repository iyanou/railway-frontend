import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Database, Server, AlertTriangle, CheckCircle, Code, Target, Shield, FileText, BarChart3, TrendingUp, Info, Eye } from 'lucide-react'

export default function CatIndicesCheckGuide() {
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
            Cat Indices Check: Index Health Overview and Quick Assessment
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Monitor index health, analyze size and document counts, and identify problematic indices quickly with Elasticsearch's most essential data layer diagnostic tool.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 4, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              12 min read
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
                <Eye className="w-6 h-6 text-purple-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Your Data Layer Dashboard</h3>
                  <p className="text-purple-700">
                    The cat indices check is your first look at the data layer health. It provides a quick overview of all indices, their health status, document counts, and storage usage - essential for understanding your cluster's data landscape.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Among all Elasticsearch APIs, cat indices is probably the most frequently used by administrators. It gives you an instant snapshot of your cluster's data: which indices exist, how healthy they are, how much space they use, and how many documents they contain. This check forms the foundation of data layer diagnostics.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Index Assessment</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Reading index health indicators</li>
                    <li>• Understanding size and document metrics</li>
                    <li>• Identifying index naming patterns</li>
                    <li>• Spotting storage inefficiencies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Problem Detection</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Finding oversized or undersized indices</li>
                    <li>• Detecting index proliferation issues</li>
                    <li>• Identifying stale or unused indices</li>
                    <li>• Monitoring storage growth patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Cat Indices API Deep Dive
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">All ES Versions (5.x - 9.x)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_cat/indices?v&amp;s=store.size:desc</code>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Simple English Explanation</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Think of this API as getting a "table of contents" for your data. It's like asking: "What books (indices) do I have on my shelf, how thick are they (size), how many pages (documents), and are they in good condition (health)?"
              </p>
              <p className="text-yellow-700">
                It's the first thing most administrators check when investigating data-related issues.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Output</h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`health status index                    pri rep docs.count docs.deleted store.size pri.store.size
green  open   logs-2024.12.04          1   1    1234567           123      2.1gb        1.0gb
yellow open   metrics-2024.12.04       1   1     987654            45      1.8gb        900mb
green  open   users                    1   1       5432             0      12.4mb       6.2mb
red    open   corrupted-index          1   1          0             0         0b           0b
green  open   .kibana_7.15.0_001       1   1        156             3      1.2mb        600kb`}
                  </pre>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">📊 Key Columns</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• <strong>health</strong>: green/yellow/red status</li>
                    <li>• <strong>status</strong>: open/close state</li>
                    <li>• <strong>index</strong>: Index name</li>
                    <li>• <strong>pri/rep</strong>: Primary/replica shard counts</li>
                    <li>• <strong>docs.count</strong>: Total documents</li>
                    <li>• <strong>store.size</strong>: Total storage used</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🔧 Useful Parameters</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• <strong>?v</strong>: Show column headers</li>
                    <li>• <strong>?s=store.size:desc</strong>: Sort by size</li>
                    <li>• <strong>?h=health,index,docs.count,store.size</strong>: Custom columns</li>
                    <li>• <strong>?bytes=b</strong>: Show exact byte values</li>
                    <li>• <strong>logs-*</strong>: Filter by pattern</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
              Common Index Issues and Solutions
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Red Index Status</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Immediate Impact</h4>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Data unavailable or partially accessible</li>
                      <li>• Search results incomplete</li>
                      <li>• Indexing may fail for affected shards</li>
                      <li>• Potential data loss risk</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Emergency Actions</h4>
                    <ol className="text-red-700 space-y-1 text-sm">
                      <li>1. Check allocation explain for specific shard</li>
                      <li>2. Verify node availability and disk space</li>
                      <li>3. Review cluster logs for errors</li>
                      <li>4. Consider restoring from backup</li>
                      <li>5. Use allocation reroute if safe</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Index Proliferation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">Symptoms</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Hundreds or thousands of indices</li>
                      <li>• Many small indices (&lt;1GB each)</li>
                      <li>• Poor search performance</li>
                      <li>• High cluster state overhead</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">Solutions</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Implement data streams for time-series data</li>
                      <li>• Use rollover policies to control index size</li>
                      <li>• Delete old indices with ILM</li>
                      <li>• Consider index templates for consistency</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Storage Optimization Opportunities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Optimization Targets</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Large indices that could be split</li>
                      <li>• Old indices suitable for cold storage</li>
                      <li>• Indices with high deleted document ratio</li>
                      <li>• Unused or forgotten indices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Optimization Actions</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Force merge indices with high deletions</li>
                      <li>• Move old data to warm/cold tiers</li>
                      <li>• Delete unused indices after verification</li>
                      <li>• Implement automated lifecycle policies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ElasticDoctor Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              ElasticDoctor Analysis Implementation
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Index Health</h3>
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Health Status Assessment</h4>
                  <p className="text-gray-600 text-sm">
                    ElasticDoctor automatically categorizes indices by health status (red/yellow/green) and provides immediate alerts for any indices with availability issues or reduced redundancy.
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Size and Storage Analysis</h4>
                  <p className="text-gray-600 text-sm">
                    Identifies oversized indices that may impact performance, calculates storage efficiency metrics, and detects indices with high document deletion ratios that waste disk space.
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Index Proliferation Detection</h4>
                  <p className="text-gray-600 text-sm">
                    Monitors index creation patterns to identify proliferation issues, recommends consolidation strategies, and suggests lifecycle management improvements.
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optimization Recommendations</h4>
                  <p className="text-gray-600 text-sm">
                    Provides actionable recommendations for force merging, data tier migration, index lifecycle policies, and capacity planning based on usage patterns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Index Management Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Healthy Index Patterns</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Use consistent naming conventions</li>
                    <li>• Implement time-based indices for logs</li>
                    <li>• Keep shard sizes between 10-50GB</li>
                    <li>• Monitor and maintain green health status</li>
                    <li>• Use index templates for consistency</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Monitoring Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Check indices health daily</li>
                    <li>• Monitor storage growth trends</li>
                    <li>• Set up alerts for red/yellow status</li>
                    <li>• Track index creation patterns</li>
                    <li>• Review document deletion ratios</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Index Anti-Patterns</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignoring red index status</li>
                    <li>• Creating too many small indices</li>
                    <li>• Not implementing lifecycle management</li>
                    <li>• Keeping unused indices indefinitely</li>
                    <li>• Allowing unlimited index growth</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Performance Impact</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Red indices affect search completeness</li>
                    <li>• Too many indices slow cluster operations</li>
                    <li>• Large indices can impact query performance</li>
                    <li>• High deletion ratios waste storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Index Health Mastery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Essential Insights</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Health First</strong>: Green status should be the norm</li>
                    <li>• <strong>Size Matters</strong>: Monitor and control index growth</li>
                    <li>• <strong>Pattern Recognition</strong>: Identify optimization opportunities</li>
                    <li>• <strong>Proactive Management</strong>: Prevent issues before they impact users</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Plan</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Implement daily index health monitoring</li>
                    <li>• Set up automated lifecycle management</li>
                    <li>• Create index optimization procedures</li>
                    <li>• Establish capacity planning processes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/nodes-hot-threads-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Hot Threads Check
              </Link>
              <Link href="/blog/indices-settings-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Index Settings Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
