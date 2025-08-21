import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag, AlertTriangle, CheckCircle, XCircle, Info, Code, Database, Settings, Activity, Target, Zap, Shield, RotateCcw, Layers } from 'lucide-react'

export default function ILMPoliciesCheckGuide() {
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
              Health Checks - Operations
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ILM Policies Check: Index Lifecycle Management Optimization
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Optimize index lifecycle policies, manage data tiers, and automate index management for efficient storage and performance.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 24, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              17 min read
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
                <RotateCcw className="w-6 h-6 text-green-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Automate Your Data Lifecycle</h3>
                  <p className="text-green-700">
                    Index Lifecycle Management (ILM) automatically manages your indices through their lifecycle - from creation to deletion. Proper ILM policies can reduce storage costs by 60-80% while maintaining optimal performance for different data access patterns.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              ILM policies define how your indices transition through different phases based on age, size, or document count. This check analyzes your current ILM configuration, identifies optimization opportunities, and ensures your data management strategy aligns with business requirements and cost objectives.
            </p>
          </section>

          {/* API Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              ILM API Endpoints
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">ILM Management APIs</span>
                <span className="text-gray-400 text-sm">ES 6.6+ (X-Pack)</span>
              </div>
              <div className="space-y-2">
                <div><code className="text-green-300">GET /_ilm/policy</code> <span className="text-gray-400">- List all ILM policies</span></div>
                <div><code className="text-green-300">GET /_ilm/policy/policy_name</code> <span className="text-gray-400">- Get specific policy</span></div>
                <div><code className="text-green-300">GET /index_name/_ilm/explain</code> <span className="text-gray-400">- Index lifecycle status</span></div>
                <div><code className="text-green-300">GET /_ilm/status</code> <span className="text-gray-400">- ILM operation status</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">✅ What This Check Analyzes</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Policy configuration and effectiveness</li>
                  <li>• Phase transitions and timing</li>
                  <li>• Storage tier utilization</li>
                  <li>• Rollover and deletion policies</li>
                  <li>• Index template integration</li>
                  <li>• Cost optimization opportunities</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔧 ILM Phases</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Hot</strong>: Active indexing and querying</li>
                  <li>• <strong>Warm</strong>: Querying only, no indexing</li>
                  <li>• <strong>Cold</strong>: Infrequent access, compressed</li>
                  <li>• <strong>Frozen</strong>: Archived data, searchable snapshots</li>
                  <li>• <strong>Delete</strong>: Automated cleanup</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ILM Phases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Layers className="w-6 h-6 mr-3 text-blue-600" />
              ILM Phase Configuration
            </h2>

            <div className="space-y-6">
              {/* Hot Phase */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Hot Phase Configuration</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50gb",
            "max_age": "7d",
            "max_docs": 100000000
          },
          "set_priority": {
            "priority": 100
          }
        }
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Rollover Triggers</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• <strong>Size-based</strong>: Index reaches size limit</li>
                      <li>• <strong>Age-based</strong>: Time since index creation</li>
                      <li>• <strong>Document count</strong>: Number of documents</li>
                      <li>• <strong>Combined triggers</strong>: Any condition met</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Hot Phase Actions</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• High priority for recovery</li>
                      <li>• Force merge optimization</li>
                      <li>• Shard allocation to fast storage</li>
                      <li>• Automatic rollover management</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Warm Phase */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Warm Phase Optimization</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`{
  "warm": {
    "min_age": "30d",
    "actions": {
      "allocate": {
        "number_of_replicas": 1,
        "require": {
          "box_type": "warm"
        }
      },
      "forcemerge": {
        "max_num_segments": 1
      },
      "set_priority": {
        "priority": 50
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Warm Phase Benefits</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Reduced storage costs</li>
                      <li>• Optimized for read-only access</li>
                      <li>• Force merge for better compression</li>
                      <li>• Move to slower, cheaper storage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Allocation Strategy</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Reduce replica count</li>
                      <li>• Allocate to warm nodes</li>
                      <li>• Lower recovery priority</li>
                      <li>• Optimize for query performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cold and Frozen Phases */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Cold and Frozen Phases</h3>
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <pre className="text-sm text-gray-700">
{`{
  "cold": {
    "min_age": "90d",
    "actions": {
      "allocate": {
        "number_of_replicas": 0,
        "require": {
          "box_type": "cold"
        }
      },
      "searchable_snapshot": {
        "snapshot_repository": "cold-snapshots"
      }
    }
  },
  "frozen": {
    "min_age": "365d",
    "actions": {
      "searchable_snapshot": {
        "snapshot_repository": "frozen-snapshots"
      }
    }
  }
}`}
                  </pre>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Cold Phase (90+ days)</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Zero replicas for maximum savings</li>
                      <li>• Searchable snapshots for low cost</li>
                      <li>• Reduced search performance</li>
                      <li>• Suitable for compliance/archival</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Frozen Phase (1+ year)</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Lowest cost storage option</li>
                      <li>• Snapshot-based access only</li>
                      <li>• Slow query performance</li>
                      <li>• Long-term retention</li>
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
              Common ILM Configuration Issues
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical: No ILM Policies Configured</h3>
                <p className="text-red-700 mb-4">Time-series indices are growing indefinitely without lifecycle management, leading to storage bloat and performance degradation.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Implementation Steps:</h4>
                  <ol className="text-gray-700 space-y-1">
                    <li>1. Create ILM policies for each data type</li>
                    <li>2. Configure rollover triggers based on data patterns</li>
                    <li>3. Set up data tier allocation</li>
                    <li>4. Update index templates to use ILM policies</li>
                    <li>5. Monitor policy execution and adjust as needed</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning: Inefficient Phase Transitions</h3>
                <p className="text-yellow-700 mb-4">Indices are staying in hot phase too long or transitioning to cold storage too quickly, impacting performance or costs.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optimization Actions:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Analyze access patterns to optimize transition timing</li>
                    <li>• Adjust rollover thresholds based on actual usage</li>
                    <li>• Review warm phase duration for query performance</li>
                    <li>• Consider searchable snapshots for cold data</li>
                    <li>• Monitor storage costs vs. query performance trade-offs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Info: Policy Execution Delays</h3>
                <p className="text-blue-700 mb-4">ILM policies are experiencing delays in execution, potentially due to cluster resource constraints or configuration issues.</p>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Investigation Steps:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Check cluster resources during ILM operations</li>
                    <li>• Review ILM poll interval settings</li>
                    <li>• Verify node allocation attributes</li>
                    <li>• Monitor force merge and snapshot operations</li>
                    <li>• Consider staggering policy execution times</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              ILM Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Configuration Best Practices</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Size rollover triggers: 10-50GB per shard</li>
                    <li>• Age-based transitions: 30d hot, 90d warm, 365d cold</li>
                    <li>• Use searchable snapshots for cold data</li>
                    <li>• Force merge in warm phase for compression</li>
                    <li>• Reduce replicas in cold phase</li>
                    <li>• Set appropriate recovery priorities</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Optimization Tips</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Monitor actual data access patterns</li>
                    <li>• Adjust policies based on business needs</li>
                    <li>• Use index templates for consistent application</li>
                    <li>• Test policies on non-production data first</li>
                    <li>• Consider custom allocation attributes</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Common Mistakes</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Overly aggressive rollover triggers</li>
                    <li>• Not considering query patterns</li>
                    <li>• Ignoring storage tier capabilities</li>
                    <li>• Forgetting to update index templates</li>
                    <li>• Not monitoring policy execution</li>
                    <li>• Inadequate testing before production</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Monitoring Points</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Policy execution success and timing</li>
                    <li>• Storage costs across tiers</li>
                    <li>• Query performance after transitions</li>
                    <li>• Index size and document count trends</li>
                    <li>• Resource usage during ILM operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Configuration Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-600" />
              Complete ILM Policy Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Log Data Policy</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`PUT /_ilm/policy/logs-policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50gb",
            "max_age": "7d"
          },
          "set_priority": {
            "priority": 100
          }
        }
      },
      "warm": {
        "min_age": "30d",
        "actions": {
          "allocate": {
            "number_of_replicas": 1,
            "require": {
              "box_type": "warm"
            }
          },
          "forcemerge": {
            "max_num_segments": 1
          },
          "set_priority": {
            "priority": 50
          }
        }
      },
      "cold": {
        "min_age": "90d",
        "actions": {
          "allocate": {
            "number_of_replicas": 0,
            "require": {
              "box_type": "cold"
            }
          },
          "searchable_snapshot": {
            "snapshot_repository": "cold-snapshots"
          }
        }
      },
      "delete": {
        "min_age": "730d"
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Metrics Data Policy</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`PUT /_ilm/policy/metrics-policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "30gb",
            "max_age": "1d"
          },
          "set_priority": {
            "priority": 100
          }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "allocate": {
            "number_of_replicas": 0,
            "require": {
              "box_type": "warm"
            }
          },
          "forcemerge": {
            "max_num_segments": 1
          },
          "set_priority": {
            "priority": 50
          }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "searchable_snapshot": {
            "snapshot_repository": "cold-snapshots"
          }
        }
      },
      "delete": {
        "min_age": "90d"
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Apply Policy to Index Template</h3>
                <div className="bg-gray-900 rounded-lg p-6">
                  <pre className="text-green-300 text-sm overflow-x-auto">
{`PUT /_index_template/logs-template
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 1,
      "index.lifecycle.name": "logs-policy",
      "index.lifecycle.rollover_alias": "logs"
    }
  }
}

# Create initial index with alias
PUT /logs-000001
{
  "aliases": {
    "logs": {
      "is_write_index": true
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Optimization */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              Cost Optimization with ILM
            </h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">📊 Storage Cost Reduction</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Typical Savings</h4>
                  <ul className="text-green-600 space-y-1 text-sm">
                    <li>• Hot to Warm: 40-50% cost reduction</li>
                    <li>• Warm to Cold: 60-70% cost reduction</li>
                    <li>• Cold to Frozen: 80-90% cost reduction</li>
                    <li>• Overall: 60-80% total storage savings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Optimization Strategies</h4>
                  <ul className="text-green-600 space-y-1 text-sm">
                    <li>• Aggressive compression in cold phase</li>
                    <li>• Searchable snapshots for archival</li>
                    <li>• Replica reduction in older phases</li>
                    <li>• Automated deletion of old data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">💰 Cost Monitoring</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">Storage Metrics</h5>
                    <ul className="text-blue-600 space-y-1 text-sm">
                      <li>• Track storage usage by phase</li>
                      <li>• Monitor compression ratios</li>
                      <li>• Calculate cost per GB by tier</li>
                      <li>• Measure data growth trends</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">Performance Impact</h5>
                    <ul className="text-blue-600 space-y-1 text-sm">
                      <li>• Query latency by phase</li>
                      <li>• Searchable snapshot performance</li>
                      <li>• Index recovery times</li>
                      <li>• Resource utilization patterns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mastering Index Lifecycle Management</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Benefits</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Automated index management reduces operational overhead</li>
                    <li>• Significant cost reduction through data tiering</li>
                    <li>• Improved query performance with optimized allocation</li>
                    <li>• Compliance with data retention requirements</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Implementation Steps</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Analyze current data patterns and access requirements</li>
                    <li>• Design ILM policies based on business needs</li>
                    <li>• Test policies thoroughly before production deployment</li>
                    <li>• Monitor and optimize based on actual usage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/deprecations-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Deprecations Check
              </Link>
              <Link href="/blog/data-tiers-check" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Data Tiers Check
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
