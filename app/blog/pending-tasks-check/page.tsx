import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Activity, Target, Zap, Shield, Timer, List } from 'lucide-react'

export default function PendingTasksCheckGuide() {
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
              Health Checks - Operations
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pending Tasks Check: Queue Management and Performance
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Monitor pending cluster tasks, prevent queue buildup, and ensure responsive cluster operations with effective queue management.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 28, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              4 min read
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
                <List className="w-6 h-6 text-purple-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Understanding Task Queues</h3>
                  <p className="text-purple-700">
                    Pending tasks represent cluster operations waiting to be executed. When pending tasks accumulate, it indicates resource constraints, bottlenecks, or configuration issues that can severely impact cluster performance and responsiveness.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The pending tasks check monitors the cluster's task queue depth and execution patterns. By analyzing pending task trends, you can identify performance bottlenecks, resource constraints, and configuration issues before they impact cluster operations.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Pending Tasks API
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">Task Queue API</span>
                <span className="text-gray-400 text-sm">ES 5.x - 9.x</span>
              </div>
              <div className="space-y-2">
                <div><code className="text-green-300">GET /_cluster/pending_tasks</code> <span className="text-gray-400">- List pending tasks</span></div>
                <div><code className="text-green-300">GET /_cluster/health</code> <span className="text-gray-400">- Includes pending task count</span></div>
                <div><code className="text-green-300">GET /_cluster/stats</code> <span className="text-gray-400">- Queue statistics</span></div>
                <div><code className="text-green-300">GET /_nodes/stats</code> <span className="text-gray-400">- Node-level queue info</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ What This Check Monitors</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Queue depth and buildup trends</li>
                  <li>• Task execution time patterns</li>
                  <li>• Queue processing rate</li>
                  <li>• Resource bottlenecks</li>
                  <li>• Task priority distribution</li>
                  <li>• Queue starvation scenarios</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 Common Task Types</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Cluster state updates</strong>: Settings, mappings</li>
                  <li>• <strong>Shard operations</strong>: Allocation, recovery</li>
                  <li>• <strong>Index operations</strong>: Creation, deletion</li>
                  <li>• <strong>Node operations</strong>: Join, leave</li>
                  <li>• <strong>Snapshot operations</strong>: Create, restore</li>
                  <li>• <strong>Template operations</strong>: Create, update</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Queue Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Timer className="w-6 h-6 mr-3 text-blue-600" />
              Queue Analysis and Patterns
            </h2>

            <div className="space-y-6">
              {/* Queue Depth */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Queue Depth Analysis</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`{
  "tasks": [
    {
      "insert_order": 12345,
      "priority": "HIGH",
      "source": "create-index [my-index]",
      "executing": false,
      "time_in_queue_millis": 1500,
      "time_in_queue": "1.5s"
    },
    {
      "insert_order": 12346,
      "priority": "NORMAL",
      "source": "update-mapping [logs-template]",
      "executing": false,
      "time_in_queue_millis": 800,
      "time_in_queue": "800ms"
    }
  ]
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Queue Depth Thresholds</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <span className="text-green-600">Normal</span>: 0-5 pending tasks</li>
                      <li>• <span className="text-yellow-600">Warning</span>: 6-20 pending tasks</li>
                      <li>• <span className="text-red-600">Critical</span>: 21+ pending tasks</li>
                      <li>• <span className="text-red-600">Emergency</span>: 100+ pending tasks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Impact Indicators</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Slow cluster state updates</li>
                      <li>• Delayed shard allocations</li>
                      <li>• Increased operation latency</li>
                      <li>• Potential cluster instability</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Queue Processing */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Queue Processing Rate</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# ElasticDoctor analysis example:
Queue Processing Metrics:
- Average task completion time: 250ms
- Tasks processed per second: 4
- Queue growth rate: +2 tasks/min
- Longest waiting task: 5.2s
- Priority distribution: 60% HIGH, 30% NORMAL, 10% LOW`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Healthy Queue (&lt;1s)</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Fast task processing</li>
                      <li>• Minimal queue buildup</li>
                      <li>• Responsive operations</li>
                      <li>• Stable performance</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Slow Queue (1-5s)</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Moderate delays</li>
                      <li>• Occasional buildup</li>
                      <li>• Resource contention</li>
                      <li>• Needs monitoring</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Stuck Queue (&gt;5s)</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Severe bottlenecks</li>
                      <li>• Rapid queue growth</li>
                      <li>• Poor performance</li>
                      <li>• Immediate action needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Priority Management */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Task Priority Management</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Task priority levels and typical operations:
URGENT     # Node failures, cluster recovery
HIGH       # Index creation, shard allocation
NORMAL     # Mapping updates, settings changes
LOW        # Cleanup operations, optimizations
LANGUID    # Background maintenance tasks`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Priority Issues</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Low priority task starvation</li>
                      <li>• High priority task flooding</li>
                      <li>• Unbalanced queue distribution</li>
                      <li>• Priority inversion problems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Queue Health Indicators</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Balanced priority distribution</li>
                      <li>• Reasonable wait times per priority</li>
                      <li>• No excessive queue growth</li>
                      <li>• Consistent processing rates</li>
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
              Common Queue Issues
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Queue Buildup</h3>
                <p className="text-red-700 mb-4">Pending tasks are accumulating faster than they can be processed, indicating severe resource constraints.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Check master node resource usage (CPU, memory)</li>
                    <li>2. Identify resource-intensive operations</li>
                    <li>3. Temporarily pause non-critical operations</li>
                    <li>4. Review cluster state size and complexity</li>
                    <li>5. Consider scaling master node resources</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Slow Queue Processing</h3>
                <p className="text-yellow-700 mb-4">Tasks are taking longer than expected to process, indicating potential performance issues.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Investigation Steps:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Monitor master node performance metrics</li>
                    <li>• Check for competing high-priority tasks</li>
                    <li>• Review cluster state update frequency</li>
                    <li>• Analyze task complexity and resource usage</li>
                    <li>• Consider queue processing optimizations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Priority Imbalance</h3>
                <p className="text-blue-700 mb-4">Queue shows uneven distribution of task priorities, which may affect processing efficiency.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optimization Options:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Review task priority assignments</li>
                    <li>• Balance urgent vs. routine operations</li>
                    <li>• Implement task scheduling strategies</li>
                    <li>• Monitor low-priority task completion</li>
                    <li>• Consider priority queue tuning</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Queue Management Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Monitoring Essentials</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Set up alerts for queue depth (&gt;10 tasks)</li>
                    <li>• Monitor queue processing rate trends</li>
                    <li>• Track task completion times</li>
                    <li>• Watch for priority distribution imbalances</li>
                    <li>• Monitor master node resource usage</li>
                    <li>• Set up queue growth rate alerts</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Performance Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Batch related operations when possible</li>
                    <li>• Schedule heavy operations during off-peak</li>
                    <li>• Use appropriate task priorities</li>
                    <li>• Monitor and optimize cluster state size</li>
                    <li>• Consider master node scaling</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Pitfalls</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignoring queue depth warnings</li>
                    <li>• Overwhelming cluster with simultaneous operations</li>
                    <li>• Not monitoring master node resources</li>
                    <li>• Inappropriate task priority usage</li>
                    <li>• Lack of queue processing rate monitoring</li>
                    <li>• Poor operation scheduling</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warning Signs</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Consistently high queue depth</li>
                    <li>• Increasing task completion times</li>
                    <li>• Frequent queue buildup spikes</li>
                    <li>• Master node resource exhaustion</li>
                    <li>• Unresponsive cluster operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Queue Monitoring Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Check Pending Tasks</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Get current pending tasks
GET /_cluster/pending_tasks

# Example response
{
  "tasks": [
    {
      "insert_order": 12345,
      "priority": "HIGH",
      "source": "create-index [logs-2024.12.15]",
      "executing": false,
      "time_in_queue_millis": 1500,
      "time_in_queue": "1.5s"
    }
  ]
}

# Check queue depth in cluster health
GET /_cluster/health
{
  "number_of_pending_tasks": 3,
  "task_max_waiting_in_queue_millis": 1500
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ElasticDoctor Queue Analysis</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Queue Health</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Queue Depth Monitoring</h5>
                      <p className="text-gray-600 text-sm">
                        ElasticDoctor continuously monitors pending task queue depth and alerts when thresholds are exceeded, helping prevent performance degradation.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Wait Time Analysis</h5>
                      <p className="text-gray-600 text-sm">
                        Tracks task wait times and identifies when operations are taking unusually long to process, indicating potential bottlenecks.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Priority Distribution</h5>
                      <p className="text-gray-600 text-sm">
                        Analyzes task priority distribution to ensure balanced processing and prevent low-priority task starvation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Queue Monitoring Script</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`#!/bin/bash
# Simple queue monitoring script

CLUSTER_URL="http://localhost:9200"
ALERT_THRESHOLD=10
CRITICAL_THRESHOLD=20

# Get pending tasks count
PENDING_COUNT=$(curl -s "$CLUSTER_URL/_cluster/health" | jq '.number_of_pending_tasks')

echo "Pending tasks: $PENDING_COUNT"

if [ "$PENDING_COUNT" -gt "$CRITICAL_THRESHOLD" ]; then
    echo "CRITICAL: Queue depth exceeds critical threshold!"
    # Send alert
elif [ "$PENDING_COUNT" -gt "$ALERT_THRESHOLD" ]; then
    echo "WARNING: Queue depth exceeds warning threshold"
    # Send warning
else
    echo "OK: Queue depth is normal"
fi

# Get detailed queue info
curl -s "$CLUSTER_URL/_cluster/pending_tasks" | jq '.tasks[] | {priority, source, time_in_queue}'`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintaining Queue Health</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Insights</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Queue depth directly impacts cluster responsiveness</li>
                    <li>• Master node resources critically affect queue processing</li>
                    <li>• Task priority management prevents starvation</li>
                    <li>• Early detection prevents cascade failures</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Items</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Implement queue depth monitoring and alerts</li>
                    <li>• Monitor master node resource usage</li>
                    <li>• Review and optimize task scheduling</li>
                    <li>• Set up automated queue health checks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/cluster-tasks-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cluster Tasks Check
              </Link>
              <Link href="/blog/ingest-pipelines-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Ingest Pipelines Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
