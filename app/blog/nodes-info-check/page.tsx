import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Database, Server, AlertTriangle, CheckCircle, Code, Target, Shield, Cpu, MemoryStick, HardDrive, Info, Settings } from 'lucide-react'

export default function NodesInfoCheckGuide() {
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
            Nodes Info Check: Hardware Assessment and Infrastructure Validation
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Evaluate node hardware specifications, validate node roles, and ensure optimal infrastructure configuration for your Elasticsearch cluster's performance and reliability.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 9, 2024
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
                <Server className="w-6 h-6 text-green-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Infrastructure Foundation Assessment</h3>
                  <p className="text-green-700">
                    The nodes info check is your infrastructure health assessment, validating hardware specifications, node roles, and configuration requirements to ensure optimal Elasticsearch performance and prevent capacity issues.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Every Elasticsearch cluster is only as strong as its weakest node. The nodes info check provides a comprehensive assessment of your infrastructure, validating hardware specifications, node roles, and configuration consistency. This foundational check ensures your cluster has the right hardware foundation for performance and growth.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Hardware Assessment</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• CPU specifications and recommendations</li>
                    <li>• Memory allocation and JVM sizing</li>
                    <li>• Storage types and capacity planning</li>
                    <li>• Network configuration validation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Node Role Management</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Master, data, and ingest node roles</li>
                    <li>• Dedicated node configuration</li>
                    <li>• Role-based resource requirements</li>
                    <li>• Cluster topology optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Nodes Info API Deep Dive
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">All ES Versions (5.x - 9.x)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_nodes</code>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Simple English Explanation</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Think of this API as asking each server in your cluster: "Tell me about yourself - what hardware do you have, what's your role, and how are you configured?"
              </p>
              <p className="text-yellow-700">
                Unlike performance metrics that change constantly, this information is relatively static - it tells you about the infrastructure foundation rather than current usage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">🔍 Hardware Information</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>CPU</strong>: Processor model, cores, and architecture</li>
                  <li>• <strong>Memory</strong>: Total RAM and available memory</li>
                  <li>• <strong>Storage</strong>: Disk types, capacity, and file systems</li>
                  <li>• <strong>Network</strong>: IP addresses and interface details</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">⚙️ Configuration Details</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Node roles</strong>: Master, data, ingest, ML capabilities</li>
                  <li>• <strong>JVM settings</strong>: Heap size, garbage collector</li>
                  <li>• <strong>Elasticsearch version</strong>: Version consistency</li>
                  <li>• <strong>Plugins</strong>: Installed extensions and tools</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Infrastructure Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Hardware Optimization</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Use SSD storage for production workloads</li>
                    <li>• Size JVM heap to 50% of RAM (max 32GB)</li>
                    <li>• Ensure adequate CPU cores (4-8 for production)</li>
                    <li>• Use local storage over network storage</li>
                    <li>• Enable memory locking in production</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Topology Planning</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Use dedicated master nodes for large clusters</li>
                    <li>• Separate data and coordinating node roles</li>
                    <li>• Plan for minimum 3 master-eligible nodes</li>
                    <li>• Consider rack/zone awareness for availability</li>
                    <li>• Use appropriate node attributes for allocation</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Infrastructure Pitfalls</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Using spinning disks for active workloads</li>
                    <li>• Setting JVM heap larger than 32GB (loses compressed OOPs)</li>
                    <li>• Insufficient CPU cores (less than 2 cores)</li>
                    <li>• Enabling swap on production systems</li>
                    <li>• Mixed node roles without proper planning</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Common Issues</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Inconsistent hardware across nodes</li>
                    <li>• Inadequate capacity planning</li>
                    <li>• Network latency between nodes</li>
                    <li>• Virtualization resource contention</li>
                    <li>• Insufficient monitoring of resource usage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Infrastructure Excellence</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Foundation Principles</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Right-sized Hardware</strong>: Match resources to workload requirements</li>
                    <li>• <strong>Appropriate Topology</strong>: Design node roles for optimal performance</li>
                    <li>• <strong>Consistent Configuration</strong>: Maintain uniformity across similar nodes</li>
                    <li>• <strong>Future Planning</strong>: Design for growth and scalability</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Items</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Audit current node hardware specifications</li>
                    <li>• Validate node role assignments</li>
                    <li>• Plan capacity for future growth</li>
                    <li>• Implement infrastructure monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/cluster-settings-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Cluster Settings Check
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
