import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Activity, Target, Zap, Shield, Map, FileText } from 'lucide-react'

export default function MappingsCheckGuide() {
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
            <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              Health Checks - Operations
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mappings Check: Field Mapping Analysis and Optimization
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Analyze field mappings, prevent mapping explosions, and optimize for search performance with comprehensive mapping validation.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 22, 2024
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
            <div className="bg-emerald-50 border-l-4 border-emerald-400 p-6 mb-8">
              <div className="flex">
                <Map className="w-6 h-6 text-emerald-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">The Foundation of Search Performance</h3>
                  <p className="text-emerald-700">
                    Field mappings define how your data is stored, indexed, and searched. Poor mapping design can lead to mapping explosions, slow queries, and storage inefficiency. Well-designed mappings improve search performance by 2-10x and prevent operational issues.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The mappings check analyzes your field mapping configuration, identifies optimization opportunities, and detects potential issues like mapping explosions, inefficient field types, and missing analyzer configurations. Proper mapping design is crucial for both performance and operational stability.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Mappings API
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">Mapping Management APIs</span>
                <span className="text-gray-400 text-sm">All ES Versions</span>
              </div>
              <div className="space-y-2">
                <div><code className="text-green-300">GET /index/_mapping</code> <span className="text-gray-400">- Get index mappings</span></div>
                <div><code className="text-green-300">GET /_cluster/settings</code> <span className="text-gray-400">- Mapping limits</span></div>
                <div><code className="text-green-300">GET /_cat/indices?v&h=index,pri,docs.count,store.size</code> <span className="text-gray-400">- Index stats</span></div>
                <div><code className="text-green-300">PUT /index/_mapping</code> <span className="text-gray-400">- Update mappings</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ What This Check Monitors</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Field count and mapping explosion risks</li>
                  <li>• Field type optimization opportunities</li>
                  <li>• Dynamic mapping configuration</li>
                  <li>• Analyzer and tokenizer usage</li>
                  <li>• Index template effectiveness</li>
                  <li>• Storage efficiency impact</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 Field Types</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Text</strong>: Full-text search fields</li>
                  <li>• <strong>Keyword</strong>: Exact match, aggregations</li>
                  <li>• <strong>Numeric</strong>: Numbers, ranges, math</li>
                  <li>• <strong>Date</strong>: Timestamps and date ranges</li>
                  <li>• <strong>Boolean</strong>: True/false values</li>
                  <li>• <strong>Object</strong>: Nested JSON structures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mapping Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Mapping Analysis and Optimization
            </h2>

            <div className="space-y-6">
              {/* Field Count Analysis */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Field Count and Mapping Explosion</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Check field count limits
GET /_cluster/settings
{
  "index.mapping.total_fields.limit": 1000,      # Default field limit
  "index.mapping.depth.limit": 20,               # Nesting depth
  "index.mapping.nested_fields.limit": 50,       # Nested fields
  "index.mapping.nested_objects.limit": 10000    # Nested objects
}

# Get field count for an index
GET /my-index/_field_caps?fields=*
# Count total fields in response`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Warning Thresholds</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <span className="text-green-600">Good</span>: &lt;500 fields</li>
                      <li>• <span className="text-yellow-600">Warning</span>: 500-800 fields</li>
                      <li>• <span className="text-red-600">Critical</span>: 800-1000 fields</li>
                      <li>• <span className="text-red-600">Danger</span>: Approaching limit</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Impact of Too Many Fields</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Slower cluster state updates</li>
                      <li>• Increased memory usage</li>
                      <li>• Slower indexing performance</li>
                      <li>• Higher storage overhead</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Field Type Optimization */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Field Type Optimization</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Inefficient mapping
{
  "properties": {
    "id": {
      "type": "text"        # Should be keyword for exact match
    },
    "status": {
      "type": "text",       # Should be keyword
      "analyzer": "standard" # Unnecessary for status values
    },
    "message": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256  # May be too small
        }
      }
    }
  }
}

# Optimized mapping
{
  "properties": {
    "id": {
      "type": "keyword"     # Exact match, aggregations
    },
    "status": {
      "type": "keyword"     # Limited values, exact match
    },
    "message": {
      "type": "text",
      "analyzer": "standard",
      "fields": {
        "raw": {
          "type": "keyword",
          "ignore_above": 1024  # Appropriate for log messages
        }
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Efficient Types</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• <strong>keyword</strong>: IDs, statuses, tags</li>
                      <li>• <strong>long</strong>: Integer numbers</li>
                      <li>• <strong>date</strong>: Timestamps</li>
                      <li>• <strong>boolean</strong>: True/false flags</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Use Carefully</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• <strong>text</strong>: Only for full-text search</li>
                      <li>• <strong>nested</strong>: Complex relationships</li>
                      <li>• <strong>object</strong>: Structured data</li>
                      <li>• <strong>geo_point</strong>: Location data</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Avoid When Possible</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• <strong>text + keyword</strong>: Doubles storage</li>
                      <li>• <strong>Dynamic true</strong>: Uncontrolled growth</li>
                      <li>• <strong>Unnecessary analyzers</strong>: CPU overhead</li>
                      <li>• <strong>Deep nesting</strong>: Query complexity</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dynamic Mapping */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Dynamic Mapping Configuration</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Controlled dynamic mapping
{
  "dynamic": "strict",          # Reject unknown fields
  "dynamic_templates": [
    {
      "strings_as_keywords": {
        "match_mapping_type": "string",
        "mapping": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    {
      "integers": {
        "match_mapping_type": "long",
        "mapping": {
          "type": "long"
        }
      }
    }
  ]
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Dynamic Settings</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <strong>true</strong>: Auto-create fields (risky)</li>
                      <li>• <strong>false</strong>: Ignore unknown fields</li>
                      <li>• <strong>strict</strong>: Reject unknown fields</li>
                      <li>• <strong>templates</strong>: Controlled creation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Best Practices</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Use strict mode in production</li>
                      <li>• Define templates for common patterns</li>
                      <li>• Test with realistic data</li>
                      <li>• Monitor field growth</li>
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
              Common Mapping Issues
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Mapping Explosion</h3>
                <p className="text-red-700 mb-4">Field count approaching or exceeding cluster limits, causing performance degradation.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Identify indices with highest field counts</li>
                    <li>2. Review dynamic mapping settings</li>
                    <li>3. Implement field limits and controls</li>
                    <li>4. Consider reindexing with optimized mappings</li>
                    <li>5. Use dynamic templates to control growth</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Inefficient Field Types</h3>
                <p className="text-yellow-700 mb-4">Field types not optimized for actual usage patterns, wasting storage and performance.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optimization Steps:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Analyze query patterns to determine optimal types</li>
                    <li>• Convert text fields to keyword for exact matching</li>
                    <li>• Remove unnecessary multi-fields</li>
                    <li>• Optimize numeric field precision</li>
                    <li>• Review analyzer requirements</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Suboptimal Dynamic Configuration</h3>
                <p className="text-blue-700 mb-4">Dynamic mapping settings allow uncontrolled field growth or miss optimization opportunities.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Configuration Improvements:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Implement strict dynamic mapping</li>
                    <li>• Create dynamic templates for common patterns</li>
                    <li>• Set appropriate field limits</li>
                    <li>• Monitor and alert on field growth</li>
                    <li>• Standardize mapping patterns across indices</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Mapping Design Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Design Principles</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Plan schema before implementation</li>
                    <li>• Use appropriate field types for data</li>
                    <li>• Implement strict dynamic mapping</li>
                    <li>• Monitor field count growth</li>
                    <li>• Test with realistic data volumes</li>
                    <li>• Document mapping decisions</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Optimization Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Use keyword for exact match fields</li>
                    <li>• Avoid text+keyword unless necessary</li>
                    <li>• Set appropriate ignore_above values</li>
                    <li>• Use date detection carefully</li>
                    <li>• Optimize numeric field types</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Pitfalls</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Uncontrolled dynamic mapping</li>
                    <li>• Using text for all string fields</li>
                    <li>• Excessive field nesting</li>
                    <li>• Not setting field limits</li>
                    <li>• Ignoring storage implications</li>
                    <li>• Not planning for schema evolution</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Performance Impact</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Too many fields slow cluster state</li>
                    <li>• Wrong types increase storage cost</li>
                    <li>• Deep nesting complicates queries</li>
                    <li>• Unnecessary analyzers waste CPU</li>
                    <li>• Poor planning requires reindexing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Mapping Management Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Field Count Analysis</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Get mapping for analysis
GET /my-index/_mapping

# Check field limits
GET /_cluster/settings?include_defaults=true&filter_path=*.index.mapping.*

# Count fields programmatically
GET /my-index/_field_caps?fields=*

# Get index statistics
GET /_cat/indices/my-index?v&h=index,docs.count,store.size,pri.store.size`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ElasticDoctor Mapping Analysis</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Mappings</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Field Count Monitoring</h5>
                      <p className="text-gray-600 text-sm">
                        ElasticDoctor automatically counts fields across all indices and alerts when approaching cluster limits, helping prevent mapping explosions.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Type Optimization</h5>
                      <p className="text-gray-600 text-sm">
                        Analyzes field usage patterns and suggests optimal types based on query patterns, storage efficiency, and performance requirements.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Dynamic Mapping Review</h5>
                      <p className="text-gray-600 text-sm">
                        Reviews dynamic mapping configuration and suggests improvements to prevent uncontrolled field growth while maintaining flexibility.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Storage Impact Analysis</h5>
                      <p className="text-gray-600 text-sm">
                        Calculates storage impact of different field types and suggests optimizations to reduce storage costs and improve performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering Elasticsearch Mappings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Takeaways</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Proper mapping design is crucial for performance</li>
                    <li>• Field count limits prevent mapping explosions</li>
                    <li>• Right field types optimize storage and queries</li>
                    <li>• Dynamic templates provide controlled flexibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Best Practices</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Plan your schema before implementation</li>
                    <li>• Monitor field growth and set limits</li>
                    <li>• Use appropriate field types for your data</li>
                    <li>• Test mappings with realistic workloads</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/data-tiers-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Data Tiers Check
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
