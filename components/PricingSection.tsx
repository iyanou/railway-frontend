'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Star, Zap, Users, Crown, ArrowRight, X, Mail, FileText, History, Calendar, Database, Clock, Sparkles, Shield, Trophy } from 'lucide-react'

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false)

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
      href: '/register?plan=developer'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Complete monitoring with reports and analytics Dashboard',
      icon: <Zap className="w-8 h-8" />,
      priceMonthly: 39,
      priceAnnual: 39 * 12 * 0.8, // 20% discount
      popular: true,
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
      href: '/register?plan=professional'
    }
  ]

  const formatPrice = (monthly, annual) => {
    if (typeof monthly === 'string') return monthly
    if (monthly === 0) return 'Free'
    
    if (isAnnual) {
      // Calculate monthly price from annual total
      const monthlyFromAnnual = annual / 12
      return `$${monthlyFromAnnual.toFixed(0)}`
    } else {
      return `$${monthly}`
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
    <section id="pricing" className="section-padding pricing-gradient">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-800 rounded-full px-6 py-3 mb-6 shadow-lg border border-emerald-200">
            <Sparkles className="w-4 h-4 mr-2 text-emerald-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">
              Start Monitoring in 1 Minute
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Simple Pricing
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Start Free, Scale When Ready
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Start monitoring in 1 minute. Try unlimited diagnostics for free, then upgrade 
            to Professional for comprehensive reports and team features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-2xl p-1.5 border-2 border-gray-200 shadow-lg">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                !isAnnual
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                isAnnual
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`card h-full relative overflow-hidden ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-500 shadow-2xl ring-4 ring-blue-100' 
                    : plan.id === 'developer'
                    ? 'bg-gradient-to-br from-gray-50 via-white to-slate-50 border-2 border-gray-300 shadow-lg hover:shadow-xl'
                    : 'bg-white hover:shadow-2xl border-2 border-gray-200 hover:border-blue-200'
                } transition-all duration-500 group transform hover:-translate-y-2`}>
                  
                  {/* Plan Header */}
                  <div className="text-center mb-8 relative">
                    {plan.popular && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 rounded-3xl blur-xl"></div>
                    )}
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500 relative z-10 ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6'
                        : plan.id === 'developer'
                        ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-lg group-hover:scale-110'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 group-hover:text-blue-600 group-hover:scale-110'
                    }`}>
                      {plan.icon}
                    </div>
                    
                    <h3 className={`text-3xl font-black mb-3 transition-colors duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 bg-clip-text text-transparent'
                        : plan.id === 'developer'
                        ? 'text-slate-700 group-hover:text-slate-800'
                        : 'text-gray-900 group-hover:text-blue-600'
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
                            : plan.id === 'developer'
                            ? 'text-slate-600 group-hover:text-slate-700'
                            : 'text-gray-900 group-hover:text-blue-600'
                        }`}>
                          {formatPrice(plan.priceMonthly, plan.priceAnnual)}
                        </span>
                        {typeof plan.priceMonthly === 'number' && plan.priceMonthly > 0 && (
                          <span className="text-gray-600 ml-2 text-xl">/month</span>
                        )}
                      </div>
                      
                      {isAnnual && savings && (
                        <div className="text-sm text-emerald-600 font-bold mt-3 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                          💰 Save {savings}% annually
                        </div>
                      )}
                      
                      {typeof plan.priceMonthly === 'number' && plan.priceMonthly > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          Billed {isAnnual ? `annually ($${plan.priceAnnual.toFixed(2)} total)` : 'monthly'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-6 mb-10">
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
                  <div className="mt-auto pt-6">
                    <Link 
                      href={plan.href}
                      onClick={() => {
                        console.log('Pricing button clicked:', {
                          planId: plan.id,
                          planName: plan.name,
                          href: plan.href,
                          buttonText: plan.buttonText
                        })
                      }}
                      className={`btn w-full justify-center group relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white shadow-2xl'
                          : plan.id === 'developer'
                          ? 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white shadow-lg'
                          : 'btn-secondary hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white border-2 hover:border-blue-600'
                      }`}
                    >
                      <span className="relative z-10 font-bold text-lg">{plan.buttonText}</span>
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                      {plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Everything You Need to Monitor Elasticsearch
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From evaluation to production - we've got you covered with comprehensive health monitoring
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">22</div>
                <div className="text-gray-600 text-sm">Health Checks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">5-50</div>
                <div className="text-gray-600 text-sm">Daily Diagnoses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">ES 5-9</div>
                <div className="text-gray-600 text-sm">All Versions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">$39</div>
                <div className="text-gray-600 text-sm">Simple Pricing</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Questions? We're Here to Help
          </h3>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Our team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-secondary">
              Contact Sales
            </Link>
            <Link href="/docs" className="btn btn-primary">
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection