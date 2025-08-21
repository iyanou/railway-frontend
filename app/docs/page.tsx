import React from 'react'
import Link from 'next/link'
import { ArrowRight, Book, Zap, Shield, Settings, HelpCircle, CheckCircle } from 'lucide-react'

export default function DocumentationPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: <Zap className="w-6 h-6" />,
      description: "Quick setup and first diagnosis",
      items: [
        "Quick Start Guide",
        "Installation Requirements",
        "First Diagnosis",
        "Authentication Setup"
      ],
      href: "/docs/getting-started"
    },
    {
      title: "Connection & Setup",
      icon: <Settings className="w-6 h-6" />,
      description: "Connect to your Elasticsearch cluster",
      items: [
        "Elasticsearch Connection",
        "Authentication Methods",
        "Network Configuration",
        "SSL/TLS Configuration"
      ],
      href: "/docs/connection"
    },
    {
      title: "Health Checks",
      icon: <CheckCircle className="w-6 h-6" />,
      description: "Understanding all 22 health checks",
      items: [
        "Complete Health Checks Guide",
        "Check Categories",
        "Severity Levels",
        "Remediation Steps"
      ],
      href: "/docs/health-checks"
    },
    {
      title: "Features & Dashboard",
      icon: <Shield className="w-6 h-6" />,
      description: "Using ElasticDoctor's features",
      items: [
        "Dashboard Overview",
        "PDF Reports",
        "Email Notifications",
        "Scheduled Diagnostics"
      ],
      href: "/docs/features"
    },
    {
      title: "Best Practices",
      icon: <Book className="w-6 h-6" />,
      description: "Elasticsearch optimization guides",
      items: [
        "Performance Optimization",
        "Security Hardening",
        "Monitoring Strategies",
        "Version Upgrade Guides"
      ],
      href: "/docs/best-practices"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ElasticDoctor Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to monitor, optimize, and maintain your Elasticsearch clusters
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Banner */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">New to ElasticDoctor?</h2>
              <p className="text-blue-100">Get up and running in under 5 minutes</p>
            </div>
            <Link href="/docs/getting-started" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Quick Start Guide
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </Link>
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Link key={index} href={section.href} className="block">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 hover:border-blue-200 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{section.description}</p>
                
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    Learn more
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Popular Topics
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/docs/health-checks" className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">22 Health Checks</h3>
              <p className="text-sm text-gray-600">Complete diagnostic reference</p>
            </Link>
            
            <Link href="/docs/connection" className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">ES Versions 5.x-9.x</h3>
              <p className="text-sm text-gray-600">Multi-version support</p>
            </Link>
            
            <Link href="/docs/features" className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">PDF Reports & Automation</h3>
              <p className="text-sm text-gray-600">Scheduled diagnostics</p>
            </Link>
            
            <Link href="/docs/best-practices" className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Production Best Practices</h3>
              <p className="text-sm text-gray-600">Optimization & security</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Support CTA */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Support
              </Link>
              <Link href="/docs/best-practices" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Best Practices Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
