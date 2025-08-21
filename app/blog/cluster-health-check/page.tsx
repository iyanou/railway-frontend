import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Server, Activity, Target, Zap, Shield } from 'lucide-react'

export default function ClusterHealthCheckGuide() {
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
              Health Checks - Foundation
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Elasticsearch Cluster Health Check: Complete Guide to /_cluster/health API
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Master the most important Elasticsearch diagnostic API. Learn how to interpret cluster status, understand shard allocation, and prevent outages.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 14, 2024
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
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <Info className="w-6 h-6 text-blue-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Why Cluster Health Matters</h3>
                  <p className="text-blue-700">
                    The cluster health check is the foundation of Elasticsearch diagnostics. It provides the most critical overview of your cluster's operational status and is often the first indicator of problems that need immediate attention.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The <code className="bg-gray-100 px-2 py-1 rounded text-sm">/_cluster/health</code> API is your first line of defense against Elasticsearch outages. This check validates core cluster health status, shard distribution, and operational stability. Understanding how to interpret its output can mean the difference between preventing an outage and experiencing data loss.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              API Endpoint and Compatibility
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">All ES Versions (5.x - 9.x)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_cluster/health</code>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ Version Compatibility</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Elasticsearch 5.x - 9.x</li>
                  <li>• OpenSearch 1.x - 2.x</li>
                  <li>• Consistent API across versions</li>
                  <li>• No breaking changes</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 Optional Parameters</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <code>level=shards</code> - Detailed shard info</li>
                  <li>• <code>wait_for_status=green</code> - Wait for status</li>
                  <li>• <code>timeout=30s</code> - Request timeout</li>
                  <li>• <code>local=true</code> - Local node only</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-blue-600" />
              Key Metrics Analyzed
            </h2>

            <div className="space-y-6">
              {/* Cluster Status */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Cluster Status</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-800">GREEN</span>
                    </div>
                    <p className="text-green-700 text-sm">All shards are active and allocated. Cluster is fully operational.</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-semibold text-yellow-800">YELLOW</span>
                    </div>
                    <p className="text-yellow-700 text-sm">Some replica shards are unassigned. Reduced redundancy but functional.</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <div className="flex items-center mb-2">
                      <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      <span className="font-semibold text-red-800">RED</span>
                    </div>
                    <p className="text-red-700 text-sm">Primary shards are unassigned. Data loss or unavailability possible.</p>
                  </div>
                </div>
              </div>

              {/* Node Count */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Node Count Validation</h3>
                <div className="bg-gray-50 rounded p-4">
                  <pre className="text-sm text-gray-700">
{`"number_of_nodes": 3,
"number_of_data_nodes": 3`}
                  </pre>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Production Minimums</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Total nodes: 3+ (split-brain prevention)</li>
                      <li>• Data nodes: 2+ (replica allocation)</li>
                      <li>• Master nodes: 3+ (odd number)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">ElasticDoctor Thresholds</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <span className="text-red-600">Critical</span>: &lt; 1 total node</li>
                      <li>• <span className="text-yellow-600">Warning</span>: &lt; 3 total nodes</li>
                      <li>• <span className="text-yellow-600">Warning</span>: &lt; 2 data nodes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Shard Health */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Shard Distribution</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`"active_primary_shards": 15,
"active_shards": 30,
"relocating_shards": 0,
"initializing_shards": 0,
"unassigned_shards": 0,
"delayed_unassigned_shards": 0,
"active_shards_percent_as_number": 100.0`}
                  </pre>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Health Indicators</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <strong>Active shards</strong>: Functional data segments</li>
                      <li>• <strong>Unassigned</strong>: Shards without node allocation</li>
                      <li>• <strong>Relocating</strong>: Shards moving between nodes</li>
                      <li>• <strong>Initializing</strong>: Shards being created/recovered</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Warning Thresholds</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Unassigned shards: &gt; 1</li>
                      <li>• Active shard %: &lt; 95%</li>
                      <li>• High relocating: &gt; 10</li>
                      <li>• High initializing: &gt; 20</li>
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
              Common Issues Detected
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: RED Cluster Status</h3>
                <p className="text-red-700 mb-4">Primary shards are unassigned, indicating potential data loss or unavailability.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Check allocation explain: <code className="bg-gray-100 px-1 rounded">GET /_cluster/allocation/explain</code></li>
                    <li>2. Verify node availability and connectivity</li>
                    <li>3. Check disk space on data nodes</li>
                    <li>4. Review recent cluster changes or failures</li>
                    <li>5. Consider shard reallocation if nodes are healthy</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Single Node Deployment</h3>
                <p className="text-yellow-700 mb-4">Running on a single node provides no redundancy and is unsuitable for production.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Recommended Actions:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Add additional nodes for high availability</li>
                    <li>• Implement minimum 3-node setup for production</li>
                    <li>• Configure dedicated master nodes for larger clusters</li>
                    <li>• Review backup strategies for disaster recovery</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Cluster Activity</h3>
                <p className="text-blue-700 mb-4">Shards are relocating or initializing, indicating cluster maintenance or scaling.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Monitoring Points:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Monitor relocation progress and completion</li>
                    <li>• Check if activity is planned maintenance</li>
                    <li>• Verify performance impact during activity</li>
                    <li>• Consider limiting concurrent relocations if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Configuration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Threshold Configuration
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ElasticDoctor Default Thresholds</h3>
              <div className="bg-gray-900 rounded p-4">
                <pre className="text-green-300 text-sm">
{`# From shared/utils/constants.py
CLUSTER_THRESHOLDS = {
    "min_production_nodes": 3,
    "min_data_nodes": 2,
    "unassigned_shards_warning": 1,
    "unassigned_shards_critical": 10,
    "active_shards_percent_warning": 90,
    "active_shards_percent_critical": 85,
    "high_relocating_shards": 10,
    "high_initializing_shards": 20
}`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Customizing Thresholds</h4>
                <p className="text-gray-600 mb-4">
                  Adjust thresholds based on your cluster size and requirements:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Small clusters</strong>: Lower node count minimums</li>
                  <li>• <strong>Large clusters</strong>: Higher shard activity tolerance</li>
                  <li>• <strong>Development</strong>: Relaxed production rules</li>
                  <li>• <strong>Critical systems</strong>: Stricter availability requirements</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Configuration Methods</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Config file</strong>: Update constants.py</li>
                  <li>• <strong>Environment variables</strong>: Override defaults</li>
                  <li>• <strong>API parameters</strong>: Runtime customization</li>
                  <li>• <strong>Per-cluster settings</strong>: Cluster-specific rules</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Integration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              Integration with Other Checks
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Cluster Health as Foundation</h3>
              <p className="text-blue-700">
                The cluster health check provides essential metrics used by other diagnostic phases. Its results influence the execution and interpretation of subsequent checks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Dependent Checks</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Node Info/Stats</strong>: Node count validation</li>
                  <li>• <strong>Cat Shards</strong>: Detailed shard analysis</li>
                  <li>• <strong>Allocation Explain</strong>: Unassigned shard investigation</li>
                  <li>• <strong>Index Health</strong>: Per-index status correlation</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Shared Metrics</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Node count for capacity planning</li>
                  <li>• Shard distribution for performance analysis</li>
                  <li>• Cluster status for severity assessment</li>
                  <li>• Activity indicators for timing considerations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Implementation Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Health Check</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Basic health check
curl -X GET "localhost:9200/_cluster/health?pretty"

# Response
{
  "cluster_name": "my-cluster",
  "status": "green",
  "timed_out": false,
  "number_of_nodes": 3,
  "number_of_data_nodes": 3,
  "active_primary_shards": 15,
  "active_shards": 30,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 0,
  "delayed_unassigned_shards": 0,
  "number_of_pending_tasks": 0,
  "number_of_in_flight_fetch": 0,
  "task_max_waiting_in_queue_millis": 0,
  "active_shards_percent_as_number": 100.0
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ElasticDoctor Implementation</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Cluster Health</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Status Validation</h5>
                      <p className="text-gray-600 text-sm">
                        ElasticDoctor automatically categorizes cluster status (GREEN/YELLOW/RED) and maps each status to appropriate severity levels with actionable recommendations.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Node Count Analysis</h5>
                      <p className="text-gray-600 text-sm">
                        Validates production readiness by checking minimum node requirements and assessing deployment architecture against best practices.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Shard Health Assessment</h5>
                      <p className="text-gray-600 text-sm">
                        Analyzes shard distribution patterns, identifies allocation issues, and monitors cluster activity levels to detect potential problems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Health Monitoring</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Wait for specific status with timeout
curl -X GET "localhost:9200/_cluster/health?wait_for_status=green&timeout=30s"

# Get detailed shard-level information
curl -X GET "localhost:9200/_cluster/health?level=shards&pretty"

# Monitor specific indices
curl -X GET "localhost:9200/_cluster/health/my-index?pretty"

# Check for no relocating shards
curl -X GET "localhost:9200/_cluster/health?wait_for_no_relocating_shards=true&timeout=5m"`}
                  </pre>
                </div>
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
                  <h4 className="font-semibold text-green-800 mb-2">✅ Do</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Monitor cluster health continuously</li>
                    <li>• Set up alerts for status changes</li>
                    <li>• Maintain minimum 3-node production clusters</li>
                    <li>• Plan for shard allocation during maintenance</li>
                    <li>• Use wait_for_status for deployment scripts</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Yellow status is often acceptable for dev environments</li>
                    <li>• High initialization activity after node additions is normal</li>
                    <li>• Use allocation explain for detailed shard investigation</li>
                    <li>• Monitor trends, not just current status</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Don't</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignore RED status - investigate immediately</li>
                    <li>• Run single-node clusters in production</li>
                    <li>• Forget to check after cluster changes</li>
                    <li>• Assume YELLOW is always a problem</li>
                    <li>• Make allocation changes during high activity</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warnings</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Health can change rapidly during failures</li>
                    <li>• Network partitions can show false health</li>
                    <li>• Some operations require cluster stability</li>
                    <li>• Resource constraints can cause status changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Critical Points</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Cluster health is the foundation of all diagnostics</li>
                    <li>• RED status requires immediate investigation</li>
                    <li>• Node count affects availability and performance</li>
                    <li>• Shard distribution impacts cluster stability</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Next Steps</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Implement automated health monitoring</li>
                    <li>• Learn allocation explain for troubleshooting</li>
                    <li>• Review node and shard check guides</li>
                    <li>• Set up alerting for status changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <Link href="/blog/nodes-performance-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Node Performance Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}