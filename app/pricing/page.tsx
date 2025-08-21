'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Check, Star, Zap, Shield, ArrowRight, Sparkles, Download, LogIn, Database, Users, Crown, Trophy, X } from 'lucide-react'
import Navbar from '../../components/Navbar'

function PricingContent() {
  const [isAnnual, setIsAnnual] = useState(false)
  const searchParams = useSearchParams()
  const source = searchParams.get('source')
  
  // Check if user is coming from login flow
  const isFromLogin = source === 'login'

  const plans = [
    {
      id: 'developer',
      name: 'Developer',
      description: 'Perfect for testing your full development pipeline',
      icon: <Database className="w-8 h-8" />,
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        '5 daily diagnoses',
        'Core 8 health checks',
        'Basic health score & recommendations',
        'Checks History and statistics',
        'Max 3 nodes per cluster',
        '7-days data retention'
      ],
      limitations: [
        'No all 22 comprehensive checks',
        'No check report download',
        'No Analytics Dashboard Access'
      ],
      buttonText: 'Start Free',
      buttonStyle: 'btn-secondary',
      href: '/register?plan=developer',
      popular: false,
      badge: 'Free Forever'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Complete monitoring with reports and analytics Dashboard',
      icon: <Zap className="w-8 h-8" />,
      priceMonthly: 39,
      priceAnnual: 39 * 12 * 0.8, // 20% discount
      features: [
        'Everything in Developer',
        '50 daily diagnoses',
        'All 22 comprehensive health checks',
        'Download check report',
        'Advanced analytics & insights',
        'Priority Email support',
        'Max 20 nodes per cluster',
        '30-days data retention'
      ],
      limitations: [],
      buttonText: 'Start Now',
      buttonStyle: 'btn-primary',
      href: '/register?plan=professional',
      popular: true,
      badge: 'Most Popular'
    }
  ]

  const formatPrice = (monthly, annual) => {
    if (typeof monthly === 'string') return monthly
    if (monthly === 0) return 'Free'
    
    if (isAnnual) {
      // Calculate monthly price from annual total
      const monthlyFromAnnual = annual / 12
      return `${monthlyFromAnnual.toFixed(0)}`
    } else {
      return `${monthly}`
    }
  }

  const calculateSavings = (monthly, annual) => {
    if (typeof monthly === 'string' || monthly === 0) return null
    const monthlyCost = monthly * 12
    const savings = monthlyCost - annual
    const percentage = Math.round((savings / monthlyCost) * 100)
    return percentage
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-xl text-white rounded-full px-6 py-3 mb-6 shadow-lg border border-white/20">
            <Sparkles className="w-5 h-5 mr-2 text-blue-300" />
            <span className="text-sm font-bold uppercase tracking-wide">
              {isFromLogin ? 'Complete Your Setup' : 'Start Monitoring in 1 Minute'}
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {isFromLogin ? (
              <>
                <span className="block text-white mb-3">Choose Your</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Perfect Plan
                </span>
              </>
            ) : (
              <>
                <span className="block text-white mb-3">Simple</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Transparent
                </span>
                <span className="block text-white">Pricing</span>
              </>
            )}
          </h1>
          
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            {isFromLogin 
              ? 'Select the plan that best fits your Elasticsearch monitoring needs. You can always upgrade or downgrade later.'
              : 'Start monitoring in 1 minute. Try unlimited diagnostics for free, then upgrade to Professional for comprehensive reports and team features.'
            }
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/95 backdrop-blur-xl rounded-2xl p-1.5 border-2 border-white/20 shadow-2xl">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                !isAnnual
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                isAnnual
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Annual
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white">
                20% off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((plan, index) => {
            const savings = calculateSavings(plan.priceMonthly, plan.priceAnnual)
            
            return (
              <div 
                key={plan.id}
                className={`relative group ${
                  plan.popular 
                    ? 'lg:scale-105 lg:-mt-4 lg:mb-4' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                      <Trophy className="w-4 h-4 inline mr-2" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {!plan.popular && plan.badge && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gray-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl border-2 border-white">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 transition-all duration-500 group transform hover:-translate-y-2 h-full relative overflow-hidden ${
                  plan.popular 
                    ? 'border-blue-500 ring-4 ring-blue-100' 
                    : 'border-white/20 hover:border-blue-200'
                }`}>
                  
                  {/* Plan Header */}
                  <div className="text-center mb-8 p-8 pb-0 relative">
                    {plan.popular && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-3xl blur-xl"></div>
                    )}
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500 relative z-10 ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6'
                        : 'bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-lg group-hover:scale-110'
                    }`}>
                      {plan.icon}
                    </div>
                    
                    <h3 className={`text-3xl font-black mb-3 transition-colors duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 bg-clip-text text-transparent'
                        : 'text-slate-700 group-hover:text-slate-800'
                    }`}>
                      {plan.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      {plan.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-10">
                      <div className="flex items-baseline justify-center">
                        <span className={`text-6xl font-black transition-all duration-300 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'
                            : 'text-slate-600 group-hover:text-slate-700'
                        }`}>
                          {formatPrice(plan.priceMonthly, plan.priceAnnual)}
                        </span>
                        {plan.priceMonthly > 0 && (
                          <span className="text-gray-600 ml-2 text-xl">/month</span>
                        )}
                      </div>
                      
                      {isAnnual && savings && (
                        <div className="text-sm text-emerald-600 font-bold mt-3 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                          💰 Save {savings}% annually
                        </div>
                      )}
                      
                      {plan.priceMonthly > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          Billed {isAnnual ? `annually (${plan.priceAnnual.toFixed(2)} total)` : 'monthly'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-8 space-y-6 mb-10">
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                      What's Included
                    </h4>
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start group/feature">
                          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover/feature:bg-emerald-200 transition-colors">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="text-gray-700 font-medium leading-relaxed group-hover/feature:text-gray-900 transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-3">
                          Not Included
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start">
                              <X className="w-4 h-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                              <span className="text-gray-500 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="p-8 pt-0">
                    <Link 
                      href={`${plan.href}${isFromLogin ? '&source=login' : ''}`}
                      className={`w-full py-4 px-8 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center text-lg group/btn transform hover:scale-[1.02] ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white shadow-2xl'
                          : 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white shadow-lg'
                      }`}
                    >
                      <span className="relative z-10 font-bold">
                        {isFromLogin ? `Choose ${plan.name}` : plan.buttonText}
                      </span>
                      <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300 relative z-10" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 mb-16 border border-white/20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Compare Plans
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-bold text-gray-900">Developer</th>
                  <th className="text-center py-4 px-6 font-bold text-blue-600">Professional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Daily Diagnoses</td>
                  <td className="text-center py-4 px-6 text-gray-600">5</td>
                  <td className="text-center py-4 px-6 text-blue-600 font-bold">50</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Health Checks</td>
                  <td className="text-center py-4 px-6 text-gray-600">8 Core</td>
                  <td className="text-center py-4 px-6 text-blue-600 font-bold">22 Comprehensive</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Max Nodes per Cluster</td>
                  <td className="text-center py-4 px-6 text-gray-600">3</td>
                  <td className="text-center py-4 px-6 text-blue-600 font-bold">20</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Data Retention</td>
                  <td className="text-center py-4 px-6 text-gray-600">7 days</td>
                  <td className="text-center py-4 px-6 text-blue-600 font-bold">30 days</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Download Reports</td>
                  <td className="text-center py-4 px-6 text-gray-400">—</td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Support</td>
                  <td className="text-center py-4 px-6 text-gray-600">Community</td>
                  <td className="text-center py-4 px-6 text-blue-600 font-bold">Priority Email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const PricingPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PricingContent />
    </Suspense>
  )
}

export default PricingPage