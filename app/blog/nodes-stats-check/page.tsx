import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Database, Server, AlertTriangle, CheckCircle, Code, Target, Shield, Activity, BarChart3, TrendingUp, Info, Zap } from 'lucide-react'

export default function NodeStatsCheckGuide() {
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
            Node Stats Check: Real-time Metrics and Performance Indicators
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Analyze real-time node statistics, track performance trends, and predict capacity needs through comprehensive monitoring of system and application metrics.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 6, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              15 min read
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
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Real-time Cluster Pulse</h3>
                  <p className="text-green-700">
                    Node stats provide the real-time heartbeat of your cluster. This check monitors live performance metrics, resource utilization, and operational statistics to predict issues before they impact users.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              While node info tells you about hardware capabilities and settings show configuration, node stats reveal what's actually happening right now. This dynamic check monitors real-time metrics, tracks performance trends, and helps predict capacity needs before problems occur.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Performance Metrics</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Real-time resource utilization</li>
                    <li>• JVM and garbage collection statistics</li>
                    <li>• Index and search performance metrics</li>
                    <li>• Network and I/O throughput</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Trend Analysis</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Capacity planning indicators</li>
                    <li>• Performance degradation detection</li>
                    <li>• Resource exhaustion prediction</li>
                    <li>• Operational efficiency measurement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Node Stats API Deep Dive
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">All ES Versions (5.x - 9.x)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_nodes/stats</code>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Simple English Explanation</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Think of this API as asking each server: "What are you doing right now? How busy are you? How much memory are you using? How many requests have you handled?"
              </p>
              <p className="text-yellow-700">
                It's like checking your car's dashboard while driving - fuel level, engine temperature, RPM, speed - all the live information you need to know if everything is running smoothly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">📊 Metric Categories</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>JVM Stats</strong>: Memory, GC, threads, uptime</li>
                  <li>• <strong>Process Stats</strong>: CPU, memory, file descriptors</li>
                  <li>• <strong>OS Stats</strong>: System load, memory, disk I/O</li>
                  <li>• <strong>Index Stats</strong>: Documents, operations, storage</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">⏱️ Update Frequency</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Real-time</strong>: Current resource usage</li>
                  <li>• <strong>Cumulative</strong>: Total operations since startup</li>
                  <li>• <strong>Rate-based</strong>: Operations per second</li>
                  <li>• <strong>Averaged</strong>: Load averages and trends</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Critical Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Critical Performance Metrics
            </h2>

            <div className="space-y-6">
              {/* JVM Statistics */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">JVM Performance Metrics</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚨 Critical: Heap Memory Usage</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">Key Metrics</h5>
                        <ul className="text-red-700 space-y-1 text-sm">
                          <li>• <strong>heap_used_percent</strong>: Current heap utilization</li>
                          <li>• <strong>heap_max_in_bytes</strong>: Maximum heap size</li>
                          <li>• <strong>heap_committed_in_bytes</strong>: Committed memory</li>
                          <li>• <strong>non_heap_used_in_bytes</strong>: Non-heap usage</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">Warning Thresholds</h5>
                        <ul className="text-red-700 space-y-1 text-sm">
                          <li>• <span className="text-yellow-600">Warning</span>: ≥75% heap usage</li>
                          <li>• <span className="text-red-600">Critical</span>: ≥90% heap usage</li>
                          <li>• <span className="text-red-600">Emergency</span>: ≥95% heap usage</li>
                          <li>• Track trends over time</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">⚡ Important: Garbage Collection</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-orange-700 mb-2">GC Metrics</h5>
                        <ul className="text-orange-700 space-y-1 text-sm">
                          <li>• <strong>collection_count</strong>: Total GC cycles</li>
                          <li>• <strong>collection_time_in_millis</strong>: Time spent in GC</li>
                          <li>• <strong>gc_frequency</strong>: Collections per minute</li>
                          <li>• <strong>avg_collection_time</strong>: Average GC pause</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-orange-700 mb-2">Health Indicators</h5>
                        <ul className="text-orange-700 space-y-1 text-sm">
                          <li>• GC pause time &lt;100ms (good)</li>
                          <li>• GC frequency &lt;1/minute (stable)</li>
                          <li>• GC time &lt;5% of total uptime</li>
                          <li>• No frequent full GCs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🧵 Thread Pool Statistics</h4>
                    <div className="bg-gray-900 rounded p-3 mb-3">
                      <pre className="text-green-300 text-sm">
{`"thread_pool": {
  "search": {
    "threads": 13,
    "queue": 0,
    "active": 0,
    "rejected": 0,
    "largest": 13,
    "completed": 1234567
  },
  "write": {
    "threads": 8,
    "queue": 0,
    "active": 1,
    "rejected": 0,
    "completed": 987654
  }
}`}
                      </pre>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Monitor queue sizes and rejection counts to identify bottlenecks in search and indexing operations.
                    </p>
                  </div>
                </div>
              </div>

              {/* System Resources */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Server className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">System Resource Metrics</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">💻 CPU and Load</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-yellow-700 mb-2">CPU Metrics</h5>
                        <ul className="text-yellow-700 space-y-1 text-sm">
                          <li>• <strong>cpu_percent</strong>: Current CPU usage</li>
                          <li>• <strong>load_average</strong>: System load (1m, 5m, 15m)</li>
                          <li>• <strong>cpu_total_in_millis</strong>: Total CPU time</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-yellow-700 mb-2">Load Analysis</h5>
                        <ul className="text-yellow-700 space-y-1 text-sm">
                          <li>• Load &lt; CPU cores (healthy)</li>
                          <li>• Load = CPU cores (fully utilized)</li>
                          <li>• Load &gt; CPU cores (overloaded)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">💾 Memory and Storage</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-green-700 mb-2">Memory Stats</h5>
                        <ul className="text-green-700 space-y-1 text-sm">
                          <li>• <strong>total_in_bytes</strong>: Total system memory</li>
                          <li>• <strong>free_in_bytes</strong>: Available memory</li>
                          <li>• <strong>used_in_bytes</strong>: Memory in use</li>
                          <li>• <strong>free_percent</strong>: Available percentage</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-700 mb-2">File System</h5>
                        <ul className="text-green-700 space-y-1 text-sm">
                          <li>• <strong>total_in_bytes</strong>: Total disk space</li>
                          <li>• <strong>available_in_bytes</strong>: Free space</li>
                          <li>• <strong>free_in_bytes</strong>: Available space</li>
                          <li>• Monitor disk usage trends</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Index Operations */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Index and Search Operations</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📝 Indexing Performance</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• <strong>index_total</strong>: Total documents indexed</li>
                      <li>• <strong>index_time_in_millis</strong>: Time spent indexing</li>
                      <li>• <strong>index_current</strong>: Currently indexing</li>
                      <li>• <strong>index_failed</strong>: Failed indexing operations</li>
                      <li>• <strong>docs/sec</strong>: Indexing throughput</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">🔍 Search Performance</h4>
                    <ul className="text-purple-700 space-y-1 text-sm">
                      <li>• <strong>query_total</strong>: Total search queries</li>
                      <li>• <strong>query_time_in_millis</strong>: Time spent searching</li>
                      <li>• <strong>query_current</strong>: Currently executing</li>
                      <li>• <strong>fetch_total</strong>: Fetch operations</li>
                      <li>• <strong>avg_query_time</strong>: Average query latency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trend Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
              Performance Trend Analysis
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Why Trends Matter More Than Snapshots</h3>
              <p className="text-blue-700">
                A single measurement can be misleading. Trends reveal patterns, predict problems, and help you understand your cluster's behavior over time. ElasticDoctor analyzes statistical trends to provide actionable insights.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Capacity Planning Indicators</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚨 Memory Growth</h4>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Heap usage trending upward</li>
                      <li>• Consistent memory pressure</li>
                      <li>• Frequent GC activity</li>
                      <li>• Reduced cache efficiency</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ CPU Saturation</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Load average increasing</li>
                      <li>• CPU usage &gt;80% sustained</li>
                      <li>• Thread pool rejections</li>
                      <li>• Query latency increases</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">💾 Storage Growth</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Disk usage trending up</li>
                      <li>• Index size growth rate</li>
                      <li>• Approaching disk watermarks</li>
                      <li>• Shard size increases</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Degradation Detection</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Detects Performance Trends</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Heap Usage Trends</h5>
                      <p className="text-gray-600 text-sm">
                        Analyzes heap usage patterns over time to predict memory exhaustion before it occurs. Tracks growth rates and calculates estimated time to capacity.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Query Latency Analysis</h5>
                      <p className="text-gray-600 text-sm">
                        Monitors query response time trends to detect performance degradation. Identifies patterns that indicate resource contention or capacity issues.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Predictive Alerts</h5>
                      <p className="text-gray-600 text-sm">
                        Uses statistical analysis to predict when thresholds will be reached, enabling proactive capacity planning and performance optimization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Monitoring Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Proactive Monitoring</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Monitor trends, not just current values</li>
                    <li>• Set alerts based on rate of change</li>
                    <li>• Track performance baselines</li>
                    <li>• Monitor during different load patterns</li>
                    <li>• Use percentile-based thresholds</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Key Metrics to Watch</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Heap usage percentage and growth rate</li>
                    <li>• GC frequency and pause times</li>
                    <li>• CPU load average and utilization</li>
                    <li>• Thread pool queue sizes and rejections</li>
                    <li>• Search and indexing latencies</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Monitoring Anti-Patterns</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Only checking metrics during incidents</li>
                    <li>• Ignoring gradual performance degradation</li>
                    <li>• Setting alerts too late (95% thresholds)</li>
                    <li>• Not correlating metrics across nodes</li>
                    <li>• Focusing on averages instead of outliers</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Alert Thresholds</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Heap usage: 75% warning, 85% critical</li>
                    <li>• CPU load: &gt;cores warning, &gt;1.5×cores critical</li>
                    <li>• GC pause: &gt;100ms warning, &gt;1s critical</li>
                    <li>• Thread rejections: &gt;0 warning</li>
                    <li>• Disk usage: 80% warning, 90% critical</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-time Performance Excellence</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Monitoring Principles</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Proactive</strong>: Predict issues before they occur</li>
                    <li>• <strong>Trend-based</strong>: Focus on patterns, not snapshots</li>
                    <li>• <strong>Comprehensive</strong>: Monitor all critical subsystems</li>
                    <li>• <strong>Actionable</strong>: Connect metrics to specific actions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Implementation Steps</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Set up continuous node stats monitoring</li>
                    <li>• Establish performance baselines</li>
                    <li>• Configure trend-based alerting</li>
                    <li>• Create capacity planning processes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/nodes-settings-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Node Settings Check
              </Link>
              <Link href="/blog/nodes-hot-threads-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Hot Threads Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
