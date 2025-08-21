import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Database, Server, AlertTriangle, CheckCircle, Code, Target, Shield, Search, Zap, Info, FileText, Layers } from 'lucide-react'

export default function AllocationExplainCheckGuide() {
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
            Allocation Explain Check: The Ultimate Guide to Debugging Shard Assignment Issues
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Master the allocation explain API to troubleshoot shard assignment problems, understand allocation decisions, and resolve the most complex Elasticsearch distribution issues.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 30, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              18 min read
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
                <Search className="w-6 h-6 text-purple-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">The Troubleshooter's Best Friend</h3>
                  <p className="text-purple-700">
                    When shards won't allocate, the allocation explain API is your diagnostic superpower. It reveals exactly why Elasticsearch made allocation decisions and provides actionable solutions to fix distribution problems.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              You've seen the red cluster status. You know shards are unassigned. But why? The allocation explain API is Elasticsearch's built-in detective, revealing the exact reasons behind shard allocation decisions. This check transforms cryptic allocation failures into clear, actionable troubleshooting guidance.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Core Concepts</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• How Elasticsearch makes allocation decisions</li>
                    <li>• Understanding allocation constraints and filters</li>
                    <li>• Reading allocation explain responses</li>
                    <li>• Common allocation failure patterns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Practical Skills</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Diagnosing unassigned shard root causes</li>
                    <li>• Resolving disk space allocation issues</li>
                    <li>• Fixing node attribute constraints</li>
                    <li>• Optimizing allocation performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Allocation Explain API Deep Dive
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">ES 5.x+ (Enhanced in 6.x+)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_cluster/allocation/explain</code>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Simple English Explanation</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Think of this API as asking Elasticsearch: "Hey, why didn't you put this shard on that node?" 
                Elasticsearch then explains its decision-making process, like a teacher showing their work on a math problem.
              </p>
              <p className="text-yellow-700">
                It's especially helpful when you have unassigned shards (shards that aren't placed on any node) and need to understand what's blocking the allocation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">📋 What It Reveals</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Allocation decisions</strong>: Why shards are placed or rejected</li>
                  <li>• <strong>Constraint violations</strong>: What rules prevent allocation</li>
                  <li>• <strong>Node-by-node analysis</strong>: Per-node allocation feasibility</li>
                  <li>• <strong>Timing information</strong>: When decisions were made</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 Usage Modes</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Automatic</strong>: Explains first unassigned shard</li>
                  <li>• <strong>Specific shard</strong>: Analyze particular index/shard</li>
                  <li>• <strong>Primary vs replica</strong>: Different allocation rules</li>
                  <li>• <strong>Include decisions</strong>: Detailed node-by-node breakdown</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Understanding Allocation Decisions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Layers className="w-6 h-6 mr-3 text-blue-600" />
              Understanding Allocation Decisions
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">How Elasticsearch Thinks About Allocation</h3>
              <p className="text-blue-700 mb-3">
                Elasticsearch considers allocation like a careful librarian organizing books. It has rules about:
              </p>
              <ul className="text-blue-700 space-y-2">
                <li>• <strong>Space</strong>: Is there enough room on the shelf (disk space)?</li>
                <li>• <strong>Balance</strong>: Are books evenly distributed across shelves (shard balance)?</li>
                <li>• <strong>Rules</strong>: Are there special requirements (allocation filters)?</li>
                <li>• <strong>Safety</strong>: Don't put original and copy on same shelf (same node)</li>
              </ul>
            </div>

            <div className="space-y-6">
              {/* Allocation Stages */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Allocation Decision Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <span className="text-blue-800 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Can Allocate Check</h4>
                      <p className="text-gray-600 text-sm">
                        Basic eligibility: Does the node have enough disk space, memory, and meet basic requirements?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-4">
                      <span className="text-green-800 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Allocation Filters</h4>
                      <p className="text-gray-600 text-sm">
                        Specific rules: Are there constraints like "only allocate to hot tier" or "avoid this node"?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 rounded-full p-2 mr-4">
                      <span className="text-yellow-800 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Balance and Optimization</h4>
                      <p className="text-gray-600 text-sm">
                        Performance considerations: Which node gives the best distribution and performance?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Allocation Failures */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Allocation Failures & Solutions</h3>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      <h4 className="font-semibold text-red-800">Disk Space Issues</h4>
                    </div>
                    <p className="text-red-700 text-sm mb-2">
                      Most common reason: Node has exceeded disk usage thresholds (default 85% warning, 90% critical).
                    </p>
                    <div className="bg-white rounded p-3">
                      <p className="font-semibold text-gray-800 text-sm mb-1">Quick Fix:</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Delete old indices or increase disk capacity</li>
                        <li>• Adjust watermark settings temporarily</li>
                        <li>• Move shards to nodes with more space</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-yellow-800">Same Shard Same Node</h4>
                    </div>
                    <p className="text-yellow-700 text-sm mb-2">
                      Primary and replica can't be on the same node for data safety.
                    </p>
                    <div className="bg-white rounded p-3">
                      <p className="font-semibold text-gray-800 text-sm mb-1">Quick Fix:</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Add more nodes to the cluster</li>
                        <li>• Reduce replica count if redundancy allows</li>
                        <li>• Check if node filters are too restrictive</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <div className="flex items-center mb-2">
                      <Info className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-blue-800">Allocation Filtering</h4>
                    </div>
                    <p className="text-blue-700 text-sm mb-2">
                      Custom rules prevent allocation (e.g., "only hot nodes" but no hot nodes available).
                    </p>
                    <div className="bg-white rounded p-3">
                      <p className="font-semibold text-gray-800 text-sm mb-1">Quick Fix:</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Review and adjust allocation filters</li>
                        <li>• Add nodes with required attributes</li>
                        <li>• Temporarily relax filtering rules</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Practical Troubleshooting Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Basic Allocation Explain</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Get explanation for first unassigned shard
curl -X GET "localhost:9200/_cluster/allocation/explain?pretty"

# Response shows why shard can't be allocated
{
  "index": "my-index",
  "shard": 0,
  "primary": true,
  "current_state": "unassigned",
  "unassigned_info": {
    "reason": "CLUSTER_RECOVERED",
    "at": "2024-12-15T10:30:00.000Z"
  },
  "can_allocate": "no",
  "allocate_explanation": "cannot allocate because all nodes are above the disk watermark"
}`}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800 font-semibold mb-2">Translation:</p>
                  <p className="text-yellow-700 text-sm">
                    "I can't place this shard anywhere because all your nodes are running out of disk space. 
                    You need to either free up space or add more nodes with available storage."
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Detailed Node-by-Node Analysis</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Get detailed explanation with node decisions
curl -X GET "localhost:9200/_cluster/allocation/explain?include_disk_info=true&include_yes_decisions=true&pretty"

# Response includes per-node analysis
{
  "index": "logs-2024",
  "shard": 1,
  "primary": false,
  "current_state": "unassigned",
  "node_allocation_decisions": [
    {
      "node_id": "node-1",
      "node_name": "elasticsearch-node-1",
      "node_decision": "no",
      "deciders": [
        {
          "decider": "disk_threshold",
          "decision": "NO",
          "explanation": "the node has exceeded the low disk watermark [85%]"
        }
      ]
    },
    {
      "node_id": "node-2", 
      "node_name": "elasticsearch-node-2",
      "node_decision": "no",
      "deciders": [
        {
          "decider": "same_shard",
          "decision": "NO", 
          "explanation": "the shard cannot be allocated to the same node on which a copy of the shard already exists"
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-800 font-semibold mb-2">Translation:</p>
                  <p className="text-blue-700 text-sm">
                    "Node-1 is full (85% disk used), and Node-2 already has a copy of this shard. 
                    I need either more disk space on Node-1 or a third node to place this replica."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Allocation Best Practices & Prevention
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Proactive Prevention</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Monitor disk usage and set alerts at 75%</li>
                    <li>• Maintain at least 3 nodes for replica allocation</li>
                    <li>• Use allocation awareness for rack/zone distribution</li>
                    <li>• Implement automated disk cleanup policies</li>
                    <li>• Test allocation filters before applying</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Troubleshooting Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Always start with allocation explain for unassigned shards</li>
                    <li>• Check cluster health before making changes</li>
                    <li>• Use include_disk_info for space-related issues</li>
                    <li>• Monitor allocation during cluster changes</li>
                    <li>• Document allocation filter decisions</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Mistakes</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignoring disk watermark warnings</li>
                    <li>• Setting overly restrictive allocation filters</li>
                    <li>• Not having enough nodes for replica placement</li>
                    <li>• Making allocation changes without understanding impact</li>
                    <li>• Forgetting to monitor after "quick fixes"</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Emergency Procedures</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• For red status: Address primary shard issues first</li>
                    <li>• Use reroute API for manual allocation if needed</li>
                    <li>• Consider empty_primary allocation for data loss acceptance</li>
                    <li>• Document all emergency allocation decisions</li>
                    <li>• Plan proper recovery after emergency fixes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Integration with ElasticDoctor */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              Integration with ElasticDoctor Health Checks
            </h2>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Allocation Explain in the Diagnostic Flow</h3>
              <p className="text-green-700">
                The allocation explain check is triggered automatically when ElasticDoctor detects unassigned shards during the cluster health check. It provides the detailed "why" behind allocation failures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Triggers This Check</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Cluster Health</strong>: Detects unassigned shards</li>
                  <li>• <strong>Cat Shards</strong>: Identifies specific unassigned shards</li>
                  <li>• <strong>Manual Request</strong>: Troubleshooting specific allocation issues</li>
                  <li>• <strong>Scheduled Diagnostics</strong>: Regular allocation health validation</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Informs Other Checks</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Node Stats</strong>: Validates disk space concerns</li>
                  <li>• <strong>Cluster Settings</strong>: Reviews allocation-related settings</li>
                  <li>• <strong>Index Settings</strong>: Checks index-specific allocation rules</li>
                  <li>• <strong>Recommendations</strong>: Provides specific remediation actions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering Allocation Troubleshooting</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Takeaways</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Diagnostic Power</strong>: Allocation explain reveals exact reasons for shard placement decisions</li>
                    <li>• <strong>Prevention Focus</strong>: Monitor disk usage and allocation constraints proactively</li>
                    <li>• <strong>Systematic Approach</strong>: Use structured troubleshooting for allocation issues</li>
                    <li>• <strong>Documentation</strong>: Record allocation decisions for future reference</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Next Steps</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Set up automated monitoring for unassigned shards</li>
                    <li>• Create allocation explain automation for red clusters</li>
                    <li>• Document your allocation filtering strategies</li>
                    <li>• Practice allocation troubleshooting in test environments</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/cat-shards-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cat Shards Check
              </Link>
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Back to Blog
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
