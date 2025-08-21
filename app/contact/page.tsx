import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Clock, CheckCircle, Star, Users, Award, Shield, Zap, ArrowRight, Globe, Headphones, TrendingUp } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header with enhanced gradient background */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `
          }} />
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/10 rounded-full blur-lg animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300/5 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg text-white rounded-full px-8 py-3 mb-8 border border-white/20 shadow-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-medium tracking-wide">EXPERT SUPPORT • AVAILABLE NOW</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="block mb-2">Get Expert</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Elasticsearch
              </span>
              <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Support
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Connect with our certified Elasticsearch specialists who have optimized 
              <span className="font-semibold text-yellow-200">1000+ clusters</span> across the globe
            </p>
            
            {/* Quick stats in header */}
            <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>4-6 Hour Response</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                <span>24/7 Global Support</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                <span>99.5% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        
        {/* Enhanced Primary Contact Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-20 relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
          
          <div className="relative p-8 md:p-16">
            <div className="text-center mb-12">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-20 scale-110" />
                <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                  <Mail className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Direct Expert Access
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Skip the queue. Connect directly with our senior Elasticsearch consultants who have 
                <span className="font-semibold text-blue-600">solved complex cluster challenges</span> for Fortune 500 companies.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-8">
              <a 
                href="mailto:support@elasticdoctor.com" 
                className="group relative inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <Mail className="relative w-7 h-7 mr-4 group-hover:animate-bounce" />
                <span className="relative">support@elasticdoctor.com</span>
                <ArrowRight className="relative w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-green-600 bg-green-50 px-6 py-3 rounded-xl border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Typical response in 4-6 hours</span>
                </div>
                
                <div className="flex items-center text-blue-600 bg-blue-50 px-6 py-3 rounded-xl border border-blue-200">
                  <Headphones className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Senior consultants only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-200 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Experts</h3>
            <p className="text-gray-600 leading-relaxed">Elastic Certified Engineers with 10+ years of hands-on cluster optimization experience</p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-200 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">99.5% Success Rate</h3>
            <p className="text-gray-600 leading-relaxed">Industry-leading issue resolution rate with comprehensive follow-up and prevention strategies</p>
            <div className="mt-4">
              <span className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified Results
              </span>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-purple-200 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">Priority handling with average first response under 6 hours, including weekends and holidays</p>
            <div className="mt-4">
              <span className="inline-flex items-center bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 mr-1" />
                24/7 Available
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Support Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to frequently asked questions. Can't find what you're looking for? 
              <a href="mailto:support@elasticdoctor.com" className="text-blue-600 hover:text-blue-700 font-medium">Email us directly</a>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/docs/getting-started" className="group block">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      Getting Started with ElasticDoctor
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Step-by-step guide to run your first cluster diagnosis in under 5 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/docs/connection" className="group block">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      Connection & Authentication Issues
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Troubleshoot cluster connectivity, SSL certificates, and authentication problems.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/docs/health-checks" className="group block">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      Understanding Health Check Results
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Learn how to interpret all 22 health checks and prioritize recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/docs/best-practices" className="group block">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                      Cluster Optimization & Best Practices
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Expert guidance on performance tuning, security hardening, and operational excellence.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still Need Help?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our Elasticsearch experts are standing by to help you resolve any issues and optimize your cluster performance.
          </p>
          <a 
            href="mailto:support@elasticdoctor.com" 
            className="inline-flex items-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Our Support Team
          </a>
        </div>
      </div>

      {/* Back to docs */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link href="/docs" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
