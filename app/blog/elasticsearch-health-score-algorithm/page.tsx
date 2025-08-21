import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Calculator, Target, Info, Settings } from 'lucide-react'

export default function ElasticsearchHealthScoreAlgorithm() {
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
            <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
              Technical Deep Dive
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The Elasticsearch Health Score: How ElasticDoctor Calculates Your Cluster's Fitness
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Deep dive into the weighted scoring algorithm behind ElasticDoctor's 0-100 health score and why different checks have different importance levels.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              December 10, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              5 min read
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
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
              <div className="flex">
                <Calculator className="w-6 h-6 text-orange-400 mt-1 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Beyond Green, Yellow, Red</h3>
                  <p className="text-orange-700">
                    While Elasticsearch gives you basic cluster status colors, ElasticDoctor provides a comprehensive 0-100 health score that considers 22 diagnostic checks across 4 critical phases, each weighted by real-world impact on cluster stability and performance.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A single number that tells you everything about your Elasticsearch cluster's health. That's the promise of ElasticDoctor's health score algorithm. But behind this simple metric lies a sophisticated weighted scoring system that considers infrastructure stability, performance metrics, data layer health, and operational efficiency.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Algorithm Fundamentals</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• How the 0-100 score is calculated</li>
                    <li>• Why different checks have different weights</li>
                    <li>• The 4-phase diagnostic framework</li>
                    <li>• Score interpretation and thresholds</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Practical Application</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Reading your cluster's health score</li>
                    <li>• Understanding score trends over time</li>
                    <li>• Prioritizing improvements based on impact</li>
                    <li>• Customizing weights for your environment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Health Score Framework */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              The 4-Phase Diagnostic Framework
            </h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Simple English Explanation</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Think of ElasticDoctor like a doctor examining a patient. Just as a doctor checks different body systems (heart, lungs, blood, etc.) with different levels of concern, ElasticDoctor examines your cluster in 4 phases, each with different importance levels.
              </p>
              <p className="text-yellow-700">
                Some problems (like a heart attack) are more serious than others (like a minor cut), so they get more weight in the overall health assessment.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phase 1: Foundation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <span className="text-blue-800 font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Foundation Phase (Weight: 35%)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These are the "life support" checks. If these fail, your cluster is in serious trouble.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Critical Checks</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• <strong>Cluster Health</strong>: Is the cluster responding?</li>
                      <li>• <strong>Cluster Info</strong>: Can we connect and get basic info?</li>
                      <li>• <strong>License Status</strong>: Are features available?</li>
                      <li>• <strong>Cluster Settings</strong>: Are configurations safe?</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Why High Weight?</h4>
                    <p className="text-gray-600 text-sm">
                      These issues can cause immediate outages, data loss, or complete cluster failure. They're like checking if the patient is breathing - nothing else matters if these fail.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase 2: Infrastructure */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <span className="text-green-800 font-bold text-sm">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Infrastructure Phase (Weight: 30%)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These checks validate that your servers have adequate resources and are configured properly.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Resource Checks</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• <strong>Node Performance</strong>: CPU, memory, disk usage</li>
                      <li>• <strong>Node Info</strong>: Hardware specifications</li>
                      <li>• <strong>Node Settings</strong>: JVM and OS configuration</li>
                      <li>• <strong>Node Stats</strong>: Real-time resource metrics</li>
                      <li>• <strong>Hot Threads</strong>: Performance bottlenecks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Why Important?</h4>
                    <p className="text-gray-600 text-sm">
                      Resource problems cause performance issues, instability, and eventual failures. It's like checking the patient's vital signs - heart rate, blood pressure, temperature.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase 3: Data Layer */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-2 mr-4">
                    <span className="text-purple-800 font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Data Layer Phase (Weight: 25%)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These checks ensure your data is properly stored, distributed, and accessible.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Data Checks</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• <strong>Cat Indices</strong>: Index health overview</li>
                      <li>• <strong>Index Settings</strong>: Configuration optimization</li>
                      <li>• <strong>Index Stats</strong>: Performance metrics</li>
                      <li>• <strong>Cat Shards</strong>: Shard distribution</li>
                      <li>• <strong>Allocation Explain</strong>: Shard assignment issues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Why Moderate Weight?</h4>
                    <p className="text-gray-600 text-sm">
                      Data issues affect performance and availability but usually don't cause immediate total failure. Like checking specific organs - important but not immediately life-threatening.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase 4: Operations */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 rounded-full p-2 mr-4">
                    <span className="text-yellow-800 font-bold text-sm">4</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Operations Phase (Weight: 10%)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  These are optimization and maintenance checks that improve long-term health and efficiency.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Operational Checks</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• <strong>Cluster Tasks</strong>: Long-running operations</li>
                      <li>• <strong>Pending Tasks</strong>: Queue management</li>
                      <li>• <strong>Ingest Pipelines</strong>: Data processing</li>
                      <li>• <strong>Snapshots</strong>: Backup strategies</li>
                      <li>• <strong>Deprecations</strong>: Future-proofing</li>
                      <li>• <strong>ILM Policies</strong>: Lifecycle management</li>
                      <li>• <strong>Data Tiers</strong>: Storage optimization</li>
                      <li>• <strong>Mappings</strong>: Field optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Why Lower Weight?</h4>
                    <p className="text-gray-600 text-sm">
                      These are optimization opportunities, not critical problems. Like recommending exercise or vitamins - good for long-term health but not urgent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Score Calculation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-3 text-blue-600" />
              Score Calculation Method
            </h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">The Formula</h3>
              <div className="bg-gray-900 rounded p-4 mb-4">
                <code className="text-green-300 text-sm">
                  Final Score = (Foundation × 0.35) + (Infrastructure × 0.30) + (Data Layer × 0.25) + (Operations × 0.10)
                </code>
              </div>
              <p className="text-gray-600 text-sm">
                Each phase score is calculated by averaging the individual check scores within that phase, then the weighted average gives the final 0-100 score.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">🚨 Critical (0-50)</h4>
                <p className="text-red-700 text-sm mb-2">Your cluster needs immediate attention.</p>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Major issues in Foundation phase</li>
                  <li>• Risk of data loss or outages</li>
                  <li>• Immediate action required</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warning (51-75)</h4>
                <p className="text-yellow-700 text-sm mb-2">Performance issues or risks present.</p>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Infrastructure or data layer problems</li>
                  <li>• Degraded performance likely</li>
                  <li>• Plan improvements soon</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Healthy (76-100)</h4>
                <p className="text-green-700 text-sm mb-2">Your cluster is performing well.</p>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• All critical systems functioning</li>
                  <li>• Good performance and stability</li>
                  <li>• Focus on optimization opportunities</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Example Calculation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Real-World Example
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Sample Cluster: "production-logs"</h3>
              <p className="text-blue-700 mb-4">
                Let's walk through how ElasticDoctor calculated a score of 84 for a real production cluster.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Phase 1: Foundation (Weight: 35%)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Individual Scores</h5>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Cluster Health: 100 (Green status)</li>
                      <li>• Cluster Info: 100 (All info available)</li>
                      <li>• License: 85 (Expires in 45 days)</li>
                      <li>• Settings: 90 (Minor optimization needed)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Calculation</h5>
                    <div className="bg-gray-900 rounded p-3">
                      <code className="text-green-300 text-sm">
                        Foundation = (100 + 100 + 85 + 90) / 4 = 93.75
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Phase 2: Infrastructure (Weight: 30%)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Individual Scores</h5>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Node Performance: 75 (High memory usage)</li>
                      <li>• Node Info: 85 (Adequate hardware)</li>
                      <li>• Node Settings: 80 (Some tuning needed)</li>
                      <li>• Node Stats: 70 (CPU pressure)</li>
                      <li>• Hot Threads: 60 (Some bottlenecks)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Calculation</h5>
                    <div className="bg-gray-900 rounded p-3">
                      <code className="text-green-300 text-sm">
                        Infrastructure = (75 + 85 + 80 + 70 + 60) / 5 = 74
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Final Score Calculation</h4>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <pre className="text-green-300 text-sm">
{`Final Score = (Foundation × 0.35) + (Infrastructure × 0.30) + (Data Layer × 0.25) + (Operations × 0.10)

Final Score = (93.75 × 0.35) + (74 × 0.30) + (86 × 0.25) + (77.5 × 0.10)
Final Score = 32.81 + 22.2 + 21.5 + 7.75
Final Score = 84.26 → 84`}
                  </pre>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full px-4 py-2 mr-4">
                    <span className="text-green-800 font-bold">Score: 84</span>
                  </div>
                  <div className="text-green-700">
                    <span className="font-semibold">Status: Healthy</span> - Good performance with some optimization opportunities
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Cluster's Health</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Key Insights</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Weighted Intelligence</strong>: Not all issues are equal - critical problems get more attention</li>
                    <li>• <strong>Holistic View</strong>: Considers all aspects of cluster health, not just basic status</li>
                    <li>• <strong>Actionable Prioritization</strong>: Higher-weighted issues should be addressed first</li>
                    <li>• <strong>Trend Monitoring</strong>: Track scores over time to identify patterns</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Best Practices</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Monitor health scores regularly, not just during incidents</li>
                    <li>• Focus on Foundation and Infrastructure phases first</li>
                    <li>• Use score trends to predict and prevent issues</li>
                    <li>• Customize weights based on your specific requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <Link href="/blog/multi-version-diagnostics" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Multi-Version Diagnostics
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
