import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Database, Info, Code, Target, Shield, CheckCircle, AlertTriangle } from 'lucide-react'

export default function ClusterInfoCheckGuide() {
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
            Cluster Info Check: Foundation of Elasticsearch Diagnostics
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Understand cluster identification, version detection, and the critical information gathered from the root API endpoint that forms the foundation of all diagnostics.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 12, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              8 min read
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
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">The Foundation Check</h3>
                  <p className="text-blue-700">
                    Every diagnostic journey begins with cluster info. This fundamental check establishes cluster identity, version compatibility, and basic operational status—the cornerstone upon which all other diagnostics build.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The cluster info check is the first and most fundamental diagnostic in ElasticDoctor's arsenal. By querying the root API endpoint, it establishes the cluster's identity, determines version compatibility, and validates basic connectivity—essential groundwork for all subsequent health checks.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Why This Check Matters</h3>
              <p className="text-yellow-700 mb-4">
                Think of this check as showing your ID card when entering a building. Just like security needs to verify who you are before letting you in, ElasticDoctor needs to understand what kind of cluster it's dealing with before it can run the right diagnostic tests.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Establishes Context</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Identifies cluster name and purpose</li>
                    <li>• Determines Elasticsearch version</li>
                    <li>• Validates basic connectivity</li>
                    <li>• Sets up routing for other checks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Prevents Issues</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Catches connection problems early</li>
                    <li>• Identifies version incompatibilities</li>
                    <li>• Detects naming conflicts</li>
                    <li>• Validates authentication setup</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              The Root API Endpoint
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">Universal - All ES Versions</span>
              </div>
              <code className="text-green-300 text-lg">GET /</code>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Understanding the Response</h3>
              <p className="text-green-700 mb-4">
                When you make a simple GET request to the root endpoint of your Elasticsearch cluster, you receive a JSON response that contains essential information about your cluster. This response is like an ID card for your cluster—it tells you who it is, what version it's running, and basic details about its configuration.
              </p>
              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Key Information Included:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• <strong>Cluster Name</strong>: The unique identifier for your cluster</li>
                  <li>• <strong>Node Name</strong>: The name of the node you're connected to</li>
                  <li>• <strong>Version Details</strong>: Elasticsearch version, build info, and Lucene version</li>
                  <li>• <strong>Cluster UUID</strong>: Unique identifier that persists across restarts</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
              Common Issues and Solutions
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Default Cluster Name</h3>
                <p className="text-red-700 mb-4">
                  Your cluster is using the default name "elasticsearch" instead of a descriptive, environment-specific name. This is like having multiple people named "John" in the same office—it becomes impossible to tell them apart.
                </p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Why This Matters:</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Makes it impossible to distinguish between different clusters</li>
                    <li>• Can cause accidental connections to wrong clusters</li>
                    <li>• Complicates monitoring and alerting setup</li>
                    <li>• Indicates lack of proper cluster configuration</li>
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">How to Fix:</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Set cluster.name in elasticsearch.yml</li>
                    <li>• Use descriptive names like "logs-production" or "search-staging"</li>
                    <li>• Include environment and purpose in the name</li>
                    <li>• Restart all nodes after changing the name</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Version Mismatch</h3>
                <p className="text-yellow-700 mb-4">
                  Different nodes in your cluster are running different versions of Elasticsearch. This is like having team members speaking different languages—communication breaks down and things don't work as expected.
                </p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Potential Problems:</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Cluster instability and unexpected behavior</li>
                    <li>• Communication issues between nodes</li>
                    <li>• Features may not work consistently</li>
                    <li>• Difficult to troubleshoot issues</li>
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Resolution Steps:</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Plan a coordinated upgrade to align all nodes</li>
                    <li>• Use rolling restart procedure for zero downtime</li>
                    <li>• Test the upgrade in staging first</li>
                    <li>• Monitor cluster health during the process</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Connection Successful</h3>
                <p className="text-blue-700 mb-4">
                  Great news! ElasticDoctor can successfully connect to your cluster and retrieve essential information. This means your cluster is responding properly and ready for comprehensive health analysis.
                </p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">What This Means:</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Network connectivity is working properly</li>
                    <li>• Authentication (if enabled) is properly configured</li>
                    <li>• Elasticsearch service is running and responding</li>
                    <li>• Ready to proceed with additional health checks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              How to Check Your Cluster Info
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Request</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Simple request to get cluster information
curl -X GET "localhost:9200/?pretty"

# With authentication (if security is enabled)
curl -u username:password -X GET "https://localhost:9200/?pretty"

# Using Kibana Dev Tools
GET /`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Response</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`{
  "name" : "elasticsearch-node-01",
  "cluster_name" : "production-logs-cluster",
  "cluster_uuid" : "ABC123DEF456GHI789JKL012MNO345P",
  "version" : {
    "number" : "9.15.0",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "1a77947",
    "build_date" : "2024-12-10T09:35:21.782467Z",
    "build_snapshot" : false,
    "lucene_version" : "9.11.1"
  },
  "tagline" : "You Know, for Search"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Foundation for Success</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Why This Check is Critical</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Version Detection</strong>: Ensures compatibility with diagnostic tools</li>
                    <li>• <strong>Cluster Identity</strong>: Establishes context for all analysis</li>
                    <li>• <strong>Connectivity Validation</strong>: Confirms basic operational status</li>
                    <li>• <strong>Foundation Building</strong>: Sets up routing for other health checks</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Next Steps</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Review and improve cluster naming conventions</li>
                    <li>• Document version upgrade timeline and procedures</li>
                    <li>• Implement automated cluster info monitoring</li>
                    <li>• Proceed to comprehensive cluster health validation</li>
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
              <Link href="/blog/cluster-health-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Cluster Health Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
