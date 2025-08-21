import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Server, Activity, Target, Zap, Shield, BarChart3, TrendingUp, Search, FileText } from 'lucide-react'

export default function IndicesStatsCheckGuide() {
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
            Index Stats Check: 13 Critical Performance Metrics for Elasticsearch Optimization
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Deep dive into index performance analytics: query optimization, cache efficiency, indexing throughput, and I/O operations for peak Elasticsearch performance.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 12, 2024
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
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
              <div className="flex">
                <BarChart3 className="w-6 h-6 text-purple-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Performance Intelligence at Index Level</h3>
                  <p className="text-purple-700">
                    The Index Stats check is your performance microscope, analyzing 13 critical sub-metrics across query performance, indexing efficiency, cache utilization, and I/O operations to identify optimization opportunities.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              While cluster health gives you the big picture, index statistics reveal the detailed performance story. This comprehensive check examines cache hit ratios, query latency, document processing speed, and I/O efficiency across all your indices, providing actionable insights for optimization.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Performance Metrics</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Query and search performance analysis</li>
                    <li>• Cache efficiency and optimization</li>
                    <li>• Indexing throughput and bottlenecks</li>
                    <li>• I/O operations and disk efficiency</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Optimization Insights</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Identifying slow-performing indices</li>
                    <li>• Cache tuning opportunities</li>
                    <li>• Query optimization recommendations</li>
                    <li>• Resource allocation improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Index Stats API Deep Dive
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">GET Request</span>
                <span className="text-gray-400 text-sm">All ES Versions (5.x - 9.x)</span>
              </div>
              <code className="text-green-300 text-lg">GET /_stats</code>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Simple English Explanation</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Think of this API as getting a detailed performance report for each index in your cluster. It's like asking: "How fast are searches? How efficient is caching? Are there any bottlenecks?"
              </p>
              <p className="text-yellow-700">
                This data helps you understand which indices are performing well and which need optimization.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">📊 Metric Categories</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Search Stats</strong>: Query performance and latency</li>
                  <li>• <strong>Indexing Stats</strong>: Document processing speed</li>
                  <li>• <strong>Cache Stats</strong>: Hit ratios and efficiency</li>
                  <li>• <strong>Store Stats</strong>: Storage and I/O metrics</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">⏱️ Key Performance Indicators</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Query latency</strong>: Average response times</li>
                  <li>• <strong>Cache hit ratios</strong>: Memory efficiency</li>
                  <li>• <strong>Indexing throughput</strong>: Documents per second</li>
                  <li>• <strong>I/O efficiency</strong>: Disk operations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Critical Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              13 Critical Performance Metrics
            </h2>

            <div className="space-y-6">
              {/* Search Performance */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Search className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Search Performance Metrics</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🔍 Query Performance</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• <strong>query_total</strong>: Total queries executed</li>
                      <li>• <strong>query_time_in_millis</strong>: Total query time</li>
                      <li>• <strong>query_current</strong>: Currently executing queries</li>
                      <li>• <strong>avg_query_time</strong>: Average latency</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">📄 Fetch Operations</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• <strong>fetch_total</strong>: Document fetches</li>
                      <li>• <strong>fetch_time_in_millis</strong>: Fetch time</li>
                      <li>• <strong>fetch_current</strong>: Active fetches</li>
                      <li>• <strong>avg_fetch_time</strong>: Fetch efficiency</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">📊 Scroll Operations</h4>
                    <ul className="text-purple-700 space-y-1 text-sm">
                      <li>• <strong>scroll_total</strong>: Scroll queries</li>
                      <li>• <strong>scroll_time_in_millis</strong>: Scroll time</li>
                      <li>• <strong>scroll_current</strong>: Active scrolls</li>
                      <li>• Monitor for long-running scrolls</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Indexing Performance */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Indexing Performance Metrics</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">📝 Document Operations</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• <strong>index_total</strong>: Documents indexed</li>
                      <li>• <strong>index_time_in_millis</strong>: Indexing time</li>
                      <li>• <strong>index_current</strong>: Active indexing</li>
                      <li>• <strong>delete_total</strong>: Documents deleted</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">⚡ Throughput Analysis</h4>
                    <ul className="text-orange-700 space-y-1 text-sm">
                      <li>• Calculate docs/second indexing rate</li>
                      <li>• Monitor indexing latency trends</li>
                      <li>• Identify indexing bottlenecks</li>
                      <li>• Track failed indexing operations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cache Efficiency */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Activity className="w-6 h-6 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Cache Efficiency Metrics</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🧠 Query Cache</h4>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• <strong>query_cache_hit_count</strong>: Cache hits</li>
                      <li>• <strong>query_cache_miss_count</strong>: Cache misses</li>
                      <li>• <strong>query_cache_memory_size</strong>: Memory usage</li>
                      <li>• <strong>hit_ratio</strong>: Cache efficiency (%)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded p-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">💾 Request Cache</h4>
                    <ul className="text-indigo-700 space-y-1 text-sm">
                      <li>• <strong>request_cache_hit_count</strong>: Request hits</li>
                      <li>• <strong>request_cache_miss_count</strong>: Request misses</li>
                      <li>• <strong>request_cache_evictions</strong>: Cache evictions</li>
                      <li>• Monitor cache pressure indicators</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
              Performance Analysis &amp; Optimization
            </h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Query Performance Optimization</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚨 Performance Warning Signs</h4>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Average query time &gt; 1000ms</li>
                      <li>• High number of concurrent queries</li>
                      <li>• Low cache hit ratios (&lt;80%)</li>
                      <li>• Frequent cache evictions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Optimization Actions</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• Optimize slow queries and filters</li>
                      <li>• Increase cache sizes if memory allows</li>
                      <li>• Implement query result caching</li>
                      <li>• Review index mapping and settings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">ElasticDoctor Analysis</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Index Performance</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Performance Benchmarking</h5>
                      <p className="text-gray-600 text-sm">
                        ElasticDoctor compares your index performance metrics against industry benchmarks and best practices to identify optimization opportunities.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Cache Efficiency Analysis</h5>
                      <p className="text-gray-600 text-sm">
                        Analyzes cache hit ratios and memory utilization patterns to recommend optimal cache sizing and configuration adjustments.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Bottleneck Detection</h5>
                      <p className="text-gray-600 text-sm">
                        Identifies performance bottlenecks in query execution, indexing operations, and I/O patterns with specific recommendations for improvement.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Trend Analysis</h5>
                      <p className="text-gray-600 text-sm">
                        Tracks performance trends over time to predict capacity needs and identify gradual performance degradation before it impacts users.
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
              Performance Monitoring Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Performance Excellence</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Monitor query latency continuously</li>
                    <li>• Maintain cache hit ratios &gt;80%</li>
                    <li>• Track indexing throughput trends</li>
                    <li>• Set alerts for performance degradation</li>
                    <li>• Regular performance baseline reviews</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Optimization Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Use filters instead of queries when possible</li>
                    <li>• Implement proper index warming strategies</li>
                    <li>• Optimize mapping for your use case</li>
                    <li>• Monitor and tune garbage collection</li>
                    <li>• Use appropriate refresh intervals</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Performance Killers</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignoring slow query patterns</li>
                    <li>• Undersized cache configurations</li>
                    <li>• Not monitoring cache evictions</li>
                    <li>• Allowing unlimited scroll operations</li>
                    <li>• Missing performance baseline data</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warning Thresholds</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Query latency: &gt;100ms warning, &gt;1s critical</li>
                    <li>• Cache hit ratio: &lt;80% warning, &lt;60% critical</li>
                    <li>• Indexing rate: Monitor for sudden drops</li>
                    <li>• Current operations: Alert on high counts</li>
                    <li>• Memory usage: Track cache memory growth</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Index Stats API Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Index Stats Retrieval</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Get stats for all indices
GET /_stats

# Get stats for specific indices
GET /logs-*/_stats

# Get specific metric groups
GET /_stats/search,indexing,cache

# Get stats with human-readable sizes
GET /_stats?human=true`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics Analysis</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Example response structure
{
  "indices": {
    "logs-2024.12.15": {
      "primaries": {
        "search": {
          "query_total": 150234,
          "query_time_in_millis": 45671,
          "query_current": 3,
          "fetch_total": 89456,
          "fetch_time_in_millis": 12345
        },
        "indexing": {
          "index_total": 2345678,
          "index_time_in_millis": 234567,
          "index_current": 12,
          "delete_total": 1234
        },
        "query_cache": {
          "memory_size_in_bytes": 234567890,
          "hit_count": 45678,
          "miss_count": 1234,
          "cache_size": 5678,
          "cache_count": 234
        }
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cache Optimization Commands</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Clear query cache for performance testing
POST /logs-*/_cache/clear?query=true

# Clear request cache
POST /logs-*/_cache/clear?request=true

# Clear all caches
POST /logs-*/_cache/clear

# Warm up cache with common queries
GET /logs-*/_search
{
  "query": {
    "match_all": {}
  },
  "size": 0
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              Performance Troubleshooting Guide
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 High Query Latency</h3>
                <p className="text-red-700 mb-4">Average query time consistently exceeds 1000ms, indicating performance bottlenecks.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Diagnostic Steps:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Analyze slow query logs for problematic patterns</li>
                    <li>2. Check index mapping efficiency and field types</li>
                    <li>3. Review query structure and filter usage</li>
                    <li>4. Monitor shard size and distribution</li>
                    <li>5. Evaluate hardware resources (CPU, memory, disk)</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Low Cache Hit Ratio</h3>
                <p className="text-yellow-700 mb-4">Query cache hit ratio below 80% suggests inefficient cache usage or configuration.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optimization Actions:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Increase query cache size if memory permits</li>
                    <li>• Analyze query patterns for cacheable operations</li>
                    <li>• Implement proper filter contexts for caching</li>
                    <li>• Review cache eviction patterns and frequency</li>
                    <li>• Consider index warming strategies for common queries</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Indexing Performance Issues</h3>
                <p className="text-blue-700 mb-4">Slow indexing throughput affecting real-time data ingestion performance.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Performance Tuning:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Optimize bulk request sizes (5-15MB per request)</li>
                    <li>• Adjust refresh interval for better throughput</li>
                    <li>• Review mapping complexity and analyzer usage</li>
                    <li>• Monitor merge operations and I/O patterns</li>
                    <li>• Consider using multiple indexing threads</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Index Performance Mastery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Critical Insights</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Query Performance</strong>: Monitor latency and optimization opportunities</li>
                    <li>• <strong>Cache Efficiency</strong>: Maximize memory utilization for speed</li>
                    <li>• <strong>Indexing Throughput</strong>: Ensure optimal document processing</li>
                    <li>• <strong>Trend Analysis</strong>: Predict and prevent performance issues</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Plan</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Implement continuous performance monitoring</li>
                    <li>• Set up automated alerting for key metrics</li>
                    <li>• Create performance optimization procedures</li>
                    <li>• Establish regular performance review cycles</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/nodes-performance-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Node Performance Check
              </Link>
              <Link href="/blog/cat-shards-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Cat Shards Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
