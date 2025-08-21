import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Database, Server, AlertTriangle, CheckCircle, Code, Target, Shield, Settings, Cpu, MemoryStick, Info, Zap } from 'lucide-react'

export default function NodeSettingsCheckGuide() {
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
            Node Settings Check: JVM and Configuration Optimization Guide
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Validate node-specific configurations, optimize JVM settings, and ensure consistent cluster behavior through proper node-level configuration management.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 7, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              16 min read
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
                <Settings className="w-6 h-6 text-green-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Configuration is King</h3>
                  <p className="text-green-700">
                    Proper node configuration is the difference between a high-performing, stable cluster and one plagued by outages and performance issues. This check validates JVM settings, system configuration, and node-specific parameters.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              While hardware provides the foundation, configuration determines how effectively that hardware is utilized. The node settings check examines JVM parameters, memory allocation, garbage collection settings, and system-level configuration to ensure optimal performance and stability.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">JVM Optimization</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Heap sizing best practices</li>
                    <li>• Garbage collector selection and tuning</li>
                    <li>• JVM flags and performance options</li>
                    <li>• Memory locking and swap management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">System Configuration</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• File descriptor limits and ulimits</li>
                    <li>• Network and discovery settings</li>
                    <li>• Path and storage configuration</li>
                    <li>• Security and authentication setup</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Configuration Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Critical Configuration Categories
            </h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Simple English Explanation</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Think of node configuration like tuning a car engine. You need the right fuel mixture (JVM settings), proper oil levels (memory), good spark timing (GC settings), and all systems working together harmoniously.
              </p>
              <p className="text-yellow-700">
                One misconfigured setting can cause the whole "engine" to run poorly or even break down completely.
              </p>
            </div>

            <div className="space-y-6">
              {/* JVM Settings */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Cpu className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">JVM Configuration</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚨 Critical: Heap Size</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">Best Practices</h5>
                        <ul className="text-red-700 space-y-1 text-sm">
                          <li>• Set -Xms and -Xmx to same value</li>
                          <li>• Use 50% of RAM maximum</li>
                          <li>• Never exceed 32GB (compressed OOPs)</li>
                          <li>• Leave RAM for file system cache</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">Example Configuration</h5>
                        <div className="bg-gray-900 rounded p-2">
                          <code className="text-green-300 text-xs">
                            -Xms16g<br/>
                            -Xmx16g<br/>
                            # For 32GB RAM server
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">⚡ Important: Garbage Collector</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-semibold text-orange-700 mb-2">G1GC (Recommended)</h5>
                        <ul className="text-orange-700 space-y-1 text-xs">
                          <li>• Best for heaps &gt;8GB</li>
                          <li>• Low-latency collection</li>
                          <li>• Good for production</li>
                        </ul>
                        <div className="bg-gray-900 rounded p-1 mt-2">
                          <code className="text-green-300 text-xs">-XX:+UseG1GC</code>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-orange-700 mb-2">CMS (Legacy)</h5>
                        <ul className="text-orange-700 space-y-1 text-xs">
                          <li>• Older ES versions</li>
                          <li>• Being phased out</li>
                          <li>• Not recommended</li>
                        </ul>
                        <div className="bg-gray-900 rounded p-1 mt-2">
                          <code className="text-green-300 text-xs">-XX:+UseConcMarkSweepGC</code>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-orange-700 mb-2">ZGC (Future)</h5>
                        <ul className="text-orange-700 space-y-1 text-xs">
                          <li>• Very large heaps</li>
                          <li>• Ultra-low latency</li>
                          <li>• Experimental</li>
                        </ul>
                        <div className="bg-gray-900 rounded p-1 mt-2">
                          <code className="text-green-300 text-xs">-XX:+UseZGC</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🔧 Essential JVM Flags</h4>
                    <div className="bg-gray-900 rounded p-4">
                      <pre className="text-green-300 text-sm overflow-x-auto">
{`# Memory and GC
-Xms16g
-Xmx16g
-XX:+UseG1GC
-XX:G1HeapRegionSize=32m

# Performance
-XX:+UnlockExperimentalVMOptions
-XX:+UseCGroupMemoryLimitForHeap
-XX:+AlwaysPreTouch

# Error handling
-XX:+ExitOnOutOfMemoryError
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/var/lib/elasticsearch

# JIT optimization
-XX:+UseStringDeduplication
-XX:+UnlockDiagnosticVMOptions
-XX:+DebugNonSafepoints`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Server className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">System Configuration</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚨 Critical: Memory Locking</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">Configuration</h5>
                        <div className="bg-gray-900 rounded p-2 mb-2">
                          <code className="text-green-300 text-sm">
                            bootstrap.memory_lock: true
                          </code>
                        </div>
                        <p className="text-red-700 text-sm">Prevents JVM heap from being swapped to disk</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">System Requirements</h5>
                        <div className="bg-gray-900 rounded p-2">
                          <code className="text-green-300 text-xs">
                            # /etc/security/limits.conf<br/>
                            elasticsearch soft memlock unlimited<br/>
                            elasticsearch hard memlock unlimited
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important: File Descriptors</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-yellow-700 mb-2">Why It Matters</h5>
                        <ul className="text-yellow-700 space-y-1 text-sm">
                          <li>• Each index segment uses file descriptors</li>
                          <li>• Network connections consume FDs</li>
                          <li>• Low limits cause hard failures</li>
                          <li>• Minimum 65536 required</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-yellow-700 mb-2">Configuration</h5>
                        <div className="bg-gray-900 rounded p-2">
                          <code className="text-green-300 text-xs">
                            # /etc/security/limits.conf<br/>
                            elasticsearch soft nofile 65536<br/>
                            elasticsearch hard nofile 65536<br/>
                            <br/>
                            # Check current limit<br/>
                            ulimit -n
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🔧 Additional System Settings</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">Virtual Memory</h5>
                        <div className="bg-gray-900 rounded p-2">
                          <code className="text-green-300 text-xs">
                            # Increase virtual memory areas<br/>
                            vm.max_map_count=262144<br/>
                            <br/>
                            # Add to /etc/sysctl.conf<br/>
                            echo 'vm.max_map_count=262144' &gt;&gt; /etc/sysctl.conf
                          </code>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-700 mb-2">Swap Disable</h5>
                        <div className="bg-gray-900 rounded p-2">
                          <code className="text-green-300 text-xs">
                            # Disable swap completely<br/>
                            sudo swapoff -a<br/>
                            <br/>
                            # Or reduce swappiness<br/>
                            vm.swappiness=1
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elasticsearch Settings */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Database className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Elasticsearch Configuration</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📍 Essential elasticsearch.yml Settings</h4>
                    <div className="bg-gray-900 rounded p-4">
                      <pre className="text-green-300 text-sm overflow-x-auto">
{`# Cluster identification
cluster.name: production-cluster
node.name: es-node-01

# Node roles (ES 7.x+)
node.roles: [master, data, ingest]

# Memory
bootstrap.memory_lock: true

# Network
network.host: 0.0.0.0
http.port: 9200
transport.port: 9300

# Discovery
discovery.seed_hosts: ["node-01", "node-02", "node-03"]
cluster.initial_master_nodes: ["node-01", "node-02", "node-03"]

# Paths
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch

# Action destructive requires name
action.destructive_requires_name: true`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚙️ Performance Tuning Settings</h4>
                    <div className="bg-gray-900 rounded p-4">
                      <pre className="text-green-300 text-sm overflow-x-auto">
{`# Thread pools
thread_pool.write.queue_size: 1000
thread_pool.search.queue_size: 1000

# Circuit breakers
indices.breaker.total.limit: 85%
indices.breaker.fielddata.limit: 40%
indices.breaker.request.limit: 60%

# Indexing performance
indices.memory.index_buffer_size: 20%
indices.memory.min_index_buffer_size: 96mb

# Search performance
indices.queries.cache.size: 20%
indices.requests.cache.size: 2%`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
              Common Configuration Issues
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Heap Size Misconfiguration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Common Mistakes</h4>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Setting heap &gt;32GB (loses compressed OOPs)</li>
                      <li>• Different -Xms and -Xmx values</li>
                      <li>• Using &gt;50% of available RAM</li>
                      <li>• Not leaving memory for OS cache</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Quick Fixes</h4>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Reduce heap to 31GB maximum</li>
                      <li>• Set -Xms = -Xmx for consistency</li>
                      <li>• Calculate: (RAM * 0.5) or 31GB, whichever is smaller</li>
                      <li>• Monitor heap usage trends</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Memory Lock Failures</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">Symptoms</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• "Unable to lock JVM Memory" warnings</li>
                      <li>• Degraded performance under load</li>
                      <li>• GC pause time increases</li>
                      <li>• Swap usage in monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">Resolution Steps</h4>
                    <ol className="text-yellow-700 space-y-1 text-sm">
                      <li>1. Check ulimit -l (should be unlimited)</li>
                      <li>2. Verify /etc/security/limits.conf</li>
                      <li>3. Restart Elasticsearch service</li>
                      <li>4. Disable swap if possible</li>
                      <li>5. Monitor memory lock status</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: File Descriptor Exhaustion</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Detection</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• "Too many open files" errors</li>
                      <li>• Cannot create new indices</li>
                      <li>• Network connection failures</li>
                      <li>• Indexing operations fail</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Prevention</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Set ulimit -n to 65536+</li>
                      <li>• Monitor current FD usage</li>
                      <li>• Plan for growth in indices/shards</li>
                      <li>• Use index lifecycle management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Configuration Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ JVM Optimization</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Use G1GC for heaps &gt;8GB</li>
                    <li>• Set heap to 50% of RAM (max 31GB)</li>
                    <li>• Enable heap dumps for debugging</li>
                    <li>• Use -XX:+AlwaysPreTouch for consistent performance</li>
                    <li>• Enable string deduplication</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 System Tuning</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Disable swap or use swappiness=1</li>
                    <li>• Set file descriptors to 65536+</li>
                    <li>• Configure virtual memory areas</li>
                    <li>• Enable memory locking</li>
                    <li>• Use dedicated elasticsearch user</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Configuration Pitfalls</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Using default JVM settings</li>
                    <li>• Ignoring ulimit configuration</li>
                    <li>• Running on systems with swap enabled</li>
                    <li>• Not monitoring configuration drift</li>
                    <li>• Inconsistent settings across nodes</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Monitoring Points</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Heap usage trends and patterns</li>
                    <li>• GC frequency and pause times</li>
                    <li>• File descriptor utilization</li>
                    <li>• Memory lock status</li>
                    <li>• Configuration consistency across nodes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Excellence</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Principles</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Consistency</strong>: Uniform configuration across similar nodes</li>
                    <li>• <strong>Optimization</strong>: Tune settings for your specific workload</li>
                    <li>• <strong>Monitoring</strong>: Track configuration effectiveness over time</li>
                    <li>• <strong>Documentation</strong>: Record all configuration decisions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Items</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Audit current JVM and system settings</li>
                    <li>• Implement configuration management</li>
                    <li>• Set up monitoring for key metrics</li>
                    <li>• Plan configuration testing and rollback</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/nodes-info-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Nodes Info Check
              </Link>
              <Link href="/blog/nodes-stats-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Node Stats Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
