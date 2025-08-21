import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Server, Activity, Target, Zap, Shield, Cpu, MemoryStick, HardDrive } from 'lucide-react'

export default function NodesPerformanceCheckGuide() {
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
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              Health Checks - Infrastructure
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Node Performance Check: Critical JVM and System Resource Monitoring
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Monitor node-level performance metrics, identify bottlenecks, and optimize resource utilization for peak Elasticsearch performance.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 13, 2024
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
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
              <div className="flex">
                <Activity className="w-6 h-6 text-green-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Performance is Everything</h3>
                  <p className="text-green-700">
                    Node performance monitoring is critical for Elasticsearch stability. This check validates JVM memory usage, garbage collection, CPU utilization, and system resources to prevent outages and optimize performance.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Node Performance check is your early warning system for resource exhaustion and performance degradation. It monitors five critical areas: heap memory, garbage collection, CPU utilization, system memory, and file descriptors. Understanding these metrics can prevent crashes and maintain optimal cluster performance.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              API Endpoint and Data Sources
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">All ES Versions (5.x - 9.x)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_nodes/stats</code>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">📊 Data Categories</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>JVM Stats</strong>: Heap, non-heap, GC performance</li>
                  <li>• <strong>OS Stats</strong>: CPU, memory, swap usage</li>
                  <li>• <strong>Process Stats</strong>: File descriptors, uptime</li>
                  <li>• <strong>System Resources</strong>: Load averages, I/O</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">🔄 Update Frequency</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Real-time</strong>: Current resource usage</li>
                  <li>• <strong>Cumulative</strong>: GC counts, total operations</li>
                  <li>• <strong>Averages</strong>: Calculated performance metrics</li>
                  <li>• <strong>Peak values</strong>: Maximum observed usage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Critical Checks - Heap Memory */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Five Critical Performance Checks
            </h2>

            <div className="space-y-8">
              {/* Heap Memory */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <MemoryStick className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">1. Heap Memory Usage (Most Critical)</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-red-50 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Why It Matters</h4>
                    <p className="text-red-700 text-sm">
                      Heap exhaustion causes OutOfMemoryError, leading to node crashes and data loss. The most critical metric for Elasticsearch stability.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Default Thresholds</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• <span className="text-yellow-600">Warning</span>: ≥75% heap usage</li>
                      <li>• <span className="text-red-600">Critical</span>: ≥90% heap usage</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900 rounded p-4 mb-4">
                  <pre className="text-green-300 text-sm">
{`"jvm": {
  "mem": {
    "heap_used_in_bytes": 7516192768,
    "heap_used_percent": 89,
    "heap_max_in_bytes": 8589934592
  }
}`}
                  </pre>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚡ Immediate Actions for High Heap Usage</h4>
                  <ol className="text-yellow-700 space-y-1 text-sm">
                    <li>1. <strong>Increase heap size</strong>: -Xms8g -Xmx8g (up to 50% of RAM)</li>
                    <li>2. <strong>Monitor field data</strong>: GET /_cat/fielddata?v</li>
                    <li>3. <strong>Check query cache</strong>: Clear if evictions are high</li>
                    <li>4. <strong>Review mappings</strong>: Reduce unnecessary field storage</li>
                    <li>5. <strong>Scale horizontally</strong>: Add more nodes if vertical scaling isn't sufficient</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Integration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              Integration with Other Checks
            </h2>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Performance as Infrastructure Foundation</h3>
              <p className="text-green-700">
                Node performance metrics influence nearly every other diagnostic check. Poor performance can mask other issues or indicate root causes of problems detected elsewhere.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Dependent Checks</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Hot Threads</strong>: CPU issue investigation</li>
                  <li>• <strong>Cluster Tasks</strong>: Resource impact on operations</li>
                  <li>• <strong>Index Stats</strong>: Performance correlation with usage</li>
                  <li>• <strong>Cache Performance</strong>: Memory pressure effects</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Performance Indicators</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Memory pressure affects query performance</li>
                  <li>• CPU saturation slows all operations</li>
                  <li>• GC pauses cause cluster communication issues</li>
                  <li>• Resource exhaustion leads to node failures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Best Practices & Recommendations
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Performance Optimization</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Set heap to 50% of RAM maximum</li>
                    <li>• Monitor GC frequency and duration regularly</li>
                    <li>• Increase file descriptor limits to 65536+</li>
                    <li>• Disable swap or use memory locking</li>
                    <li>• Use G1GC for heaps &gt;8GB</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Monitoring Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Track trends, not just current values</li>
                    <li>• Set alerts at warning levels for proactive action</li>
                    <li>• Monitor during peak usage periods</li>
                    <li>• Correlate performance with application metrics</li>
                    <li>• Baseline normal performance for comparison</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Performance Killers</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignoring gradual memory leaks</li>
                    <li>• Setting heap size &gt;32GB without compressed OOPs</li>
                    <li>• Running with swap enabled</li>
                    <li>• Allowing sustained high CPU usage</li>
                    <li>• Insufficient file descriptor limits</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Common Mistakes</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Reactive instead of proactive monitoring</li>
                    <li>• Ignoring GC tuning opportunities</li>
                    <li>• Overlooking system-level resource limits</li>
                    <li>• Not monitoring performance during scaling</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Monitoring Essentials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Critical Metrics</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Heap usage</strong>: Most critical for stability</li>
                    <li>• <strong>GC performance</strong>: Impacts all operations</li>
                    <li>• <strong>CPU utilization</strong>: Indicates processing capacity</li>
                    <li>• <strong>System memory</strong>: Prevents swapping issues</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Plan</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Implement continuous performance monitoring</li>
                    <li>• Set up proactive alerting at warning thresholds</li>
                    <li>• Create performance baselines for your workload</li>
                    <li>• Develop capacity planning based on trends</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/cluster-health-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cluster Health Check
              </Link>
              <Link href="/blog/indices-stats-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Indices Stats Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}