import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Activity, Target, Zap, Shield, Timer, Layers } from 'lucide-react'

export default function ClusterTasksCheckGuide() {
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
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Health Checks - Operations
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cluster Tasks Check: Monitoring Long-running Operations
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Track cluster tasks, identify stuck operations, and manage cluster workload efficiently with comprehensive task monitoring.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 29, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              9 min read
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
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <Activity className="w-6 h-6 text-blue-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Understanding Cluster Operations</h3>
                  <p className="text-blue-700">
                    Cluster tasks represent long-running operations that Elasticsearch performs in the background. Monitoring these tasks is crucial for understanding cluster performance, identifying bottlenecks, and detecting stuck operations that could impact cluster stability.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The cluster tasks check provides visibility into all active operations within your cluster - from shard movements and index creation to snapshot operations and cluster state updates. By monitoring task duration, resource usage, and completion rates, you can proactively identify and resolve performance issues.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Task Management APIs
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">Task APIs</span>
                <span className="text-gray-400 text-sm">ES 5.x - 9.x</span>
              </div>
              <div className="space-y-2">
                <div><code className="text-green-300">GET /_tasks</code> <span className="text-gray-400">- List all active tasks</span></div>
                <div><code className="text-green-300">GET /_tasks?detailed=true</code> <span className="text-gray-400">- Detailed task information</span></div>
                <div><code className="text-green-300">GET /_tasks?group_by=parents</code> <span className="text-gray-400">- Group by parent tasks</span></div>
                <div><code className="text-green-300">POST /_tasks/task_id/_cancel</code> <span className="text-gray-400">- Cancel specific task</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ What This Check Monitors</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Active task count and duration</li>
                  <li>• Long-running and stuck operations</li>
                  <li>• Resource-intensive tasks</li>
                  <li>• Task completion rates</li>
                  <li>• Failed or cancelled tasks</li>
                  <li>• Task queue buildup</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 Common Task Types</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Shard operations</strong>: Movement, recovery</li>
                  <li>• <strong>Index operations</strong>: Creation, deletion, forcemerge</li>
                  <li>• <strong>Search operations</strong>: Query execution</li>
                  <li>• <strong>Bulk operations</strong>: Indexing, updates</li>
                  <li>• <strong>Snapshot operations</strong>: Backup, restore</li>
                  <li>• <strong>Cluster operations</strong>: Settings, mapping updates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Task Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Timer className="w-6 h-6 mr-3 text-blue-600" />
              Task Analysis and Monitoring
            </h2>

            <div className="space-y-6">
              {/* Task Duration */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Task Duration Analysis</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`{
  "nodes": {
    "node_id": {
      "name": "node-1",
      "transport_address": "127.0.0.1:9300",
      "host": "127.0.0.1",
      "ip": "127.0.0.1:9300",
      "tasks": {
        "task_id": {
          "node": "node_id",
          "id": 12345,
          "type": "transport",
          "action": "indices:data/write/bulk",
          "start_time_in_millis": 1701234567890,
          "running_time_in_nanos": 5000000000,
          "description": "requests[50], indices[logs-2024.12.15]"
        }
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Duration Thresholds</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <span className="text-green-600">Normal</span>: &lt; 30 seconds</li>
                      <li>• <span className="text-yellow-600">Warning</span>: 30s - 5 minutes</li>
                      <li>• <span className="text-red-600">Critical</span>: &gt; 5 minutes</li>
                      <li>• <span className="text-red-600">Stuck</span>: &gt; 30 minutes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">ElasticDoctor Analysis</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Identifies long-running operations</li>
                      <li>• Detects stuck or hanging tasks</li>
                      <li>• Monitors resource consumption</li>
                      <li>• Tracks task completion patterns</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Task Types */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Task Type Classification</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Common task actions and their typical durations:
indices:data/write/bulk              # 100ms - 2s
indices:data/read/search             # 50ms - 1s
indices:admin/create                 # 1s - 10s
indices:admin/forcemerge             # 30s - 30min
cluster:admin/snapshot/create        # 5min - 2h
indices:data/write/reindex           # 10min - 8h
cluster:admin/reroute                # 1s - 5min`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Quick Tasks (&lt;1s)</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Individual search queries</li>
                      <li>• Small bulk operations</li>
                      <li>• Cluster state updates</li>
                      <li>• Index status checks</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Medium Tasks (1s-5min)</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Large bulk operations</li>
                      <li>• Index creation/deletion</li>
                      <li>• Shard allocation</li>
                      <li>• Mapping updates</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Long Tasks (&gt;5min)</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Snapshot operations</li>
                      <li>• Force merge operations</li>
                      <li>• Reindex operations</li>
                      <li>• Shard recovery</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Task Resource Usage */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Resource Impact Assessment</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Resource-intensive task identification:
- High CPU: search, aggregations, forcemerge
- High Memory: large bulk operations, snapshots
- High I/O: reindex, snapshot, shard recovery
- High Network: cross-cluster operations, snapshots`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Performance Impact</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• CPU-intensive tasks block other operations</li>
                      <li>• Memory-heavy tasks can cause GC pressure</li>
                      <li>• I/O intensive tasks slow disk operations</li>
                      <li>• Network tasks can saturate bandwidth</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Monitoring Strategy</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Track concurrent task count</li>
                      <li>• Monitor resource usage patterns</li>
                      <li>• Identify resource bottlenecks</li>
                      <li>• Set up task duration alerts</li>
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
              Common Task-Related Issues
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Stuck Long-running Tasks</h3>
                <p className="text-red-700 mb-4">Tasks have been running for an unusually long time (&gt;30 minutes) and may be stuck or hanging.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Investigation Steps:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Identify the stuck task using <code className="bg-gray-100 px-1 rounded">GET /_tasks?detailed=true</code></li>
                    <li>2. Check cluster resources (CPU, memory, disk I/O)</li>
                    <li>3. Review cluster logs for error messages</li>
                    <li>4. Consider canceling the task if safe to do so</li>
                    <li>5. Monitor for repeated occurrences</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: High Task Concurrency</h3>
                <p className="text-yellow-700 mb-4">Unusually high number of concurrent tasks may indicate resource contention or queue buildup.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optimization Actions:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Analyze task types and their resource requirements</li>
                    <li>• Implement task throttling or scheduling</li>
                    <li>• Review cluster sizing and resource allocation</li>
                    <li>• Consider separating workloads by time or node</li>
                    <li>• Monitor task queue patterns</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Resource-Intensive Operations</h3>
                <p className="text-blue-700 mb-4">Tasks are consuming significant cluster resources, potentially impacting other operations.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Management Options:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Schedule intensive operations during off-peak hours</li>
                    <li>• Implement resource throttling for background tasks</li>
                    <li>• Monitor and limit concurrent operations</li>
                    <li>• Consider dedicated nodes for heavy operations</li>
                    <li>• Use task priorities to manage resource allocation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Task Management Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Monitoring Essentials</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Set up alerts for long-running tasks (&gt;5 minutes)</li>
                    <li>• Monitor task queue depth and buildup</li>
                    <li>• Track task completion rates and failures</li>
                    <li>• Identify patterns in task execution times</li>
                    <li>• Monitor resource usage during task execution</li>
                    <li>• Set up automated stuck task detection</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Performance Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Schedule heavy operations during low traffic</li>
                    <li>• Use task cancellation for stuck operations</li>
                    <li>• Implement task throttling for resource management</li>
                    <li>• Consider task priorities for critical operations</li>
                    <li>• Monitor task impact on cluster performance</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Issues</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignoring long-running tasks</li>
                    <li>• Not monitoring task resource usage</li>
                    <li>• Running multiple intensive operations simultaneously</li>
                    <li>• Lack of task timeout mechanisms</li>
                    <li>• Poor task scheduling and prioritization</li>
                    <li>• Inadequate task failure handling</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warning Signs</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Tasks running longer than expected</li>
                    <li>• Increasing task queue depth</li>
                    <li>• High task failure rates</li>
                    <li>• Resource contention during operations</li>
                    <li>• Degraded cluster performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Task Management Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitor All Active Tasks</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Get all active tasks
GET /_tasks

# Get detailed task information
GET /_tasks?detailed=true&group_by=parents

# Filter tasks by action
GET /_tasks?actions=indices:data/write/bulk

# Get tasks running longer than 30 seconds
GET /_tasks?timeout=30s`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancel Stuck Tasks</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Cancel a specific task
POST /_tasks/oTUltX4IQMOUUVeiohTt8A:12345/_cancel

# Cancel all tasks of a specific type
POST /_tasks/_cancel?actions=indices:data/write/reindex

# Cancel tasks on specific nodes
POST /_tasks/_cancel?nodes=node1,node2`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ElasticDoctor Task Analysis</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Tasks</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Duration Monitoring</h5>
                      <p className="text-gray-600 text-sm">
                        ElasticDoctor automatically tracks task execution times and identifies operations that exceed normal duration thresholds, alerting you to potential stuck or inefficient operations.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Resource Impact Assessment</h5>
                      <p className="text-gray-600 text-sm">
                        Analyzes the resource consumption patterns of active tasks to identify operations that may be causing performance bottlenecks or resource contention.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Stuck Task Detection</h5>
                      <p className="text-gray-600 text-sm">
                        Automatically detects tasks that have been running unusually long and provides recommendations for investigation and resolution.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Performance Correlation</h5>
                      <p className="text-gray-600 text-sm">
                        Correlates task execution with cluster performance metrics to identify when background operations are impacting overall cluster responsiveness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Effective Task Management</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Insights</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Regular task monitoring prevents performance issues</li>
                    <li>• Long-running tasks require special attention</li>
                    <li>• Resource management is crucial for task efficiency</li>
                    <li>• Task cancellation can resolve stuck operations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Items</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Implement task monitoring and alerting</li>
                    <li>• Set up automated stuck task detection</li>
                    <li>• Schedule resource-intensive operations</li>
                    <li>• Monitor task impact on cluster performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/allocation-explain-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Allocation Explain Check
              </Link>
              <Link href="/blog/pending-tasks-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Pending Tasks Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
