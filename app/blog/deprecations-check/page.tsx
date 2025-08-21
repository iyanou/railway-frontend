import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Activity, Target, Zap, Shield, AlertCircle, TrendingUp } from 'lucide-react'

export default function DeprecationsCheckGuide() {
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
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
              Health Checks - Operations
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Deprecations Check: Future-proofing Your Elasticsearch Cluster
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Identify deprecated features, plan migration paths, and stay ahead of breaking changes to ensure smooth Elasticsearch upgrades.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 25, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              10 min read
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
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex">
                <AlertCircle className="w-6 h-6 text-yellow-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Why Deprecations Matter</h3>
                  <p className="text-yellow-700">
                    Elasticsearch evolves rapidly, and features that work today may be removed in future versions. The deprecations check helps you identify usage of deprecated APIs, settings, and features before they become breaking changes, ensuring smooth upgrades and preventing unexpected failures.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The deprecations check proactively scans your cluster configuration, mappings, queries, and usage patterns to identify deprecated features. By addressing these warnings early, you can maintain compatibility with newer Elasticsearch versions and avoid emergency migrations.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              Deprecation Detection APIs
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">Deprecation APIs</span>
                <span className="text-gray-400 text-sm">ES 7.0+</span>
              </div>
              <div className="space-y-2">
                <div><code className="text-green-300">GET /_migration/deprecations</code> <span className="text-gray-400">- Cluster deprecations</span></div>
                <div><code className="text-green-300">GET /index/_migration/deprecations</code> <span className="text-gray-400">- Index deprecations</span></div>
                <div><code className="text-green-300">GET /_nodes/hot_threads</code> <span className="text-gray-400">- Runtime deprecations</span></div>
                <div><code className="text-green-300">GET /_cluster/settings</code> <span className="text-gray-400">- Settings deprecations</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ What This Check Identifies</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Deprecated cluster settings</li>
                  <li>• Obsolete index configurations</li>
                  <li>• Legacy mapping types</li>
                  <li>• Deprecated query syntax</li>
                  <li>• Outdated API usage</li>
                  <li>• Plugin compatibility issues</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 Deprecation Categories</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Critical</strong>: Removed in next major version</li>
                  <li>• <strong>Warning</strong>: Scheduled for removal</li>
                  <li>• <strong>Info</strong>: Performance or behavior changes</li>
                  <li>• <strong>Template</strong>: Index template issues</li>
                  <li>• <strong>Mapping</strong>: Field mapping problems</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Deprecations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
              Common Deprecation Patterns
            </h2>

            <div className="space-y-6">
              {/* Mapping Types */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Mapping Types (Removed in 8.0)</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Deprecated (ES 6.x and earlier)
PUT /my-index/my-type/_mapping
{
  "properties": {
    "field1": { "type": "text" }
  }
}

# Modern approach (ES 7.x+)
PUT /my-index/_mapping
{
  "properties": {
    "field1": { "type": "text" }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Migration Impact</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• All indices must use _doc type</li>
                      <li>• Update application code and scripts</li>
                      <li>• Reindex multi-type indices</li>
                      <li>• Modify index templates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">ElasticDoctor Detection</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Scans all index mappings</li>
                      <li>• Identifies custom types</li>
                      <li>• Checks index templates</li>
                      <li>• Validates application queries</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Settings Deprecations */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Cluster Settings</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Common deprecated settings:
cluster.routing.allocation.same_shard.host        # Use ...awareness.attributes
index.merge.policy.max_merged_segment            # Use index.merge.policy.max_merge_at_once
index.translog.flush_threshold_ops               # Use index.translog.flush_threshold_size
discovery.zen.minimum_master_nodes               # Use cluster.initial_master_nodes
node.max_local_storage_nodes                     # No longer supported`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Settings Migration</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Update elasticsearch.yml</li>
                      <li>• Modify cluster settings API calls</li>
                      <li>• Review index templates</li>
                      <li>• Update deployment scripts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Version Changes</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• ES 7.x: Many zen discovery settings</li>
                      <li>• ES 8.x: Transport and security settings</li>
                      <li>• ES 9.x: Index lifecycle settings</li>
                      <li>• Each version: Performance tuning settings</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Query Deprecations */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Query Syntax Changes</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`# Deprecated query patterns:
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "field": {
            "query": "value",
            "type": "phrase"          # Deprecated: use match_phrase
          }
        }
      }
    }
  }
}

# Modern equivalent:
{
  "query": {
    "bool": {
      "must": {
        "match_phrase": {
          "field": "value"
        }
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Query Updates</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Replace deprecated query types</li>
                      <li>• Update aggregation syntax</li>
                      <li>• Modify script parameters</li>
                      <li>• Review sorting options</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Application Impact</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Update client libraries</li>
                      <li>• Modify search queries</li>
                      <li>• Test query performance</li>
                      <li>• Update documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Migration Planning */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Migration Planning Strategy
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Migration Roadmap</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Phase 1: Assessment</h4>
                    <ul className="text-blue-600 space-y-1 text-sm">
                      <li>• Run deprecation check across all clusters</li>
                      <li>• Catalog all deprecated features in use</li>
                      <li>• Prioritize by criticality and effort</li>
                      <li>• Estimate migration timeline</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Phase 2: Planning</h4>
                    <ul className="text-blue-600 space-y-1 text-sm">
                      <li>• Create migration plan for each deprecation</li>
                      <li>• Identify application code changes needed</li>
                      <li>• Plan testing and validation procedures</li>
                      <li>• Schedule migration windows</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Migration Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Testing Strategy</h4>
                    <ul className="text-green-600 space-y-1 text-sm">
                      <li>• Test migrations in development first</li>
                      <li>• Validate functionality after changes</li>
                      <li>• Performance test updated queries</li>
                      <li>• Create rollback procedures</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Implementation</h4>
                    <ul className="text-green-600 space-y-1 text-sm">
                      <li>• Address critical deprecations first</li>
                      <li>• Update in small, manageable batches</li>
                      <li>• Monitor for issues after each change</li>
                      <li>• Document all modifications</li>
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
              Common Deprecation Issues
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: Breaking Changes Detected</h3>
                <p className="text-red-700 mb-4">Features in use will be removed in the next major version, requiring immediate attention.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Priority Actions:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Document all breaking changes and their impact</li>
                    <li>2. Create migration plan with timelines</li>
                    <li>3. Update applications and configurations</li>
                    <li>4. Test thoroughly in staging environment</li>
                    <li>5. Plan coordinated production rollout</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Deprecated Features in Use</h3>
                <p className="text-yellow-700 mb-4">Features marked for future removal are actively being used in your cluster.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Planning Actions:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Review deprecation timeline and removal schedule</li>
                    <li>• Research recommended alternatives</li>
                    <li>• Plan migration during maintenance windows</li>
                    <li>• Update documentation and procedures</li>
                    <li>• Monitor for additional deprecations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Performance Impact Changes</h3>
                <p className="text-blue-700 mb-4">Some features may have performance implications or behavior changes in newer versions.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Evaluation Steps:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Analyze performance impact of changes</li>
                    <li>• Test with realistic workloads</li>
                    <li>• Consider gradual rollout strategy</li>
                    <li>• Monitor performance metrics closely</li>
                    <li>• Have rollback plan ready</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Deprecation Management Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Proactive Monitoring</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Run deprecation checks regularly</li>
                    <li>• Monitor Elasticsearch release notes</li>
                    <li>• Set up alerts for new deprecations</li>
                    <li>• Include checks in CI/CD pipeline</li>
                    <li>• Track migration progress</li>
                    <li>• Document all changes made</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Planning Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Address deprecations before they become critical</li>
                    <li>• Test changes in non-production environments</li>
                    <li>• Plan migrations during low-traffic periods</li>
                    <li>• Have rollback procedures ready</li>
                    <li>• Coordinate with application teams</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Mistakes</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Ignoring deprecation warnings</li>
                    <li>• Waiting until forced to upgrade</li>
                    <li>• Not testing changes thoroughly</li>
                    <li>• Making changes without documentation</li>
                    <li>• Upgrading without migration plan</li>
                    <li>• Not coordinating with dependent systems</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Risk Factors</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Critical deprecations near removal date</li>
                    <li>• Complex application integrations</li>
                    <li>• Large-scale data migrations required</li>
                    <li>• Limited maintenance windows</li>
                    <li>• Lack of testing environments</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Deprecation Check Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Check Cluster Deprecations</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`# Get all cluster-level deprecations
GET /_migration/deprecations

# Check specific index deprecations
GET /my-index/_migration/deprecations

# Example response:
{
  "cluster_settings": [
    {
      "level": "critical",
      "message": "setting [cluster.routing.allocation.node_concurrent_recoveries] is deprecated",
      "url": "https://...",
      "details": "Use cluster.routing.allocation.node_concurrent_incoming_recoveries instead"
    }
  ],
  "node_settings": [],
  "index_settings": {
    "my-index": [
      {
        "level": "warning",
        "message": "index template [legacy_template] uses deprecated _template API",
        "url": "https://...",
        "details": "Use composable index templates instead"
      }
    ]
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">ElasticDoctor Integration</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">🔍 How ElasticDoctor Analyzes Deprecations</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Automated Detection</h5>
                      <p className="text-gray-600 text-sm">
                        ElasticDoctor automatically scans cluster configurations, mappings, and settings to identify deprecated features and provides prioritized recommendations for migration.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Impact Assessment</h5>
                      <p className="text-gray-600 text-sm">
                        Evaluates the business impact of each deprecation and provides migration timelines based on Elasticsearch release schedules and criticality levels.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Migration Planning</h5>
                      <p className="text-gray-600 text-sm">
                        Generates comprehensive migration plans with step-by-step instructions, testing procedures, and rollback strategies for each deprecated feature.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Continuous Monitoring</h5>
                      <p className="text-gray-600 text-sm">
                        Continuously monitors for new deprecations across Elasticsearch versions and provides early warnings to help plan future upgrades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-yellow-50 to-blue-50 border border-yellow-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Staying Ahead of Changes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Benefits</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Prevents unexpected breaking changes</li>
                    <li>• Enables planned, controlled migrations</li>
                    <li>• Maintains compatibility with newer versions</li>
                    <li>• Reduces emergency maintenance situations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Action Plan</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Schedule regular deprecation checks</li>
                    <li>• Create migration roadmap for identified issues</li>
                    <li>• Test changes in staging environments</li>
                    <li>• Monitor Elasticsearch release announcements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/snapshots-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Snapshots Check
              </Link>
              <Link href="/blog/ilm-policies-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: ILM Policies Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
