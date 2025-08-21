'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Gauge, 
  Mail, 
  ArrowRight,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container section-padding">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Gauge className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">
                  ElasticDoctor
                </span>
                <div className="text-xs text-blue-200 -mt-1">
                  Cluster Health Platform
                </div>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-8 leading-relaxed max-w-sm">
              The production-ready Elasticsearch health monitoring platform 
              trusted by <span className="font-semibold text-blue-200">150+ companies</span> worldwide. 
              Prevent outages and optimize performance with comprehensive health checks.
            </p>
            
            {/* Contact Info - Enhanced */}
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Get Support</div>
                  <a href="mailto:support@elasticdoctor.com" className="text-white hover:text-blue-200 transition-colors font-medium">
                    support@elasticdoctor.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Product & Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Product
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Features</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Pricing</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Documentation</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              Support
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Contact Sales</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>System Status</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Blog & Insights</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Terms of Service</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Privacy Policy</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>
        </div>


      </div>

      {/* Enhanced Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center text-sm text-gray-400">
              <span>© {currentYear} ElasticDoctor. All rights reserved.</span>
              <span className="mx-3 text-gray-600">•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span className="mx-3 text-gray-600">•</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center text-sm text-gray-400">
                <span>Built with</span>
                <Heart className="w-4 h-4 mx-2 text-red-500 animate-pulse" />
                <span>for the Elasticsearch community</span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer