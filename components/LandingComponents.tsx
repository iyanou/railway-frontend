'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle,
  Star,
  Users,
  User,
  Clock,
  AlertTriangle,
  BarChart3,
  Play,
  Award,
  Target,
  Activity,
  Database,
  Search,
  Gauge,
  Brain,
  Rocket,
  Lock,
  Globe,
  Monitor,
  Code,
  Sparkles,
  Eye,
  Cpu,
  Server,
  Layers,
  Timer,
  Wifi,
  ChevronRight,
  Infinity,
  TrendingDown,
  Bell,
  FileText,
  BarChart,
  Heart,
  CheckCircle2,
  UserPlus
} from 'lucide-react'

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedText, setTypedText] = useState('')
  const heroRef = useRef(null)
  
  const stats = [
    { number: "99.8%", label: "Outages Prevented", icon: "🛡️", color: "from-emerald-400 to-teal-500", description: "Critical issues detected before impact" },
    { number: "45%", label: "Performance Boost", icon: "🚀", color: "from-blue-400 to-cyan-500", description: "Average query speed improvement" },
    { number: "$2.4M", label: "Downtime Saved", icon: "💰", color: "from-yellow-400 to-orange-500", description: "Annual cost savings per enterprise" },
    { number: "150+", label: "Enterprise Teams", icon: "🏆", color: "from-purple-400 to-pink-500", description: "Production clusters monitored" }
  ]

  const phrases = [
    "outages before they happen",
    "performance bottlenecks instantly", 
    "security vulnerabilities early",
    "capacity issues proactively"
  ]

  const floatingIcons = [
    { Icon: Database, delay: 0, position: { top: '20%', left: '15%' } },
    { Icon: Server, delay: 1, position: { top: '30%', right: '20%' } },
    { Icon: Monitor, delay: 2, position: { bottom: '30%', left: '10%' } },
    { Icon: Brain, delay: 0.5, position: { top: '60%', right: '15%' } },
    { Icon: Gauge, delay: 1.5, position: { bottom: '20%', right: '25%' } },
    { Icon: Shield, delay: 2.5, position: { top: '40%', left: '25%' } }
  ]

  useEffect(() => {
    setIsLoaded(true)
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({ 
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Typing animation effect
  useEffect(() => {
    let currentPhrase = 0
    let currentChar = 0
    let isDeleting = false
    
    const typeInterval = setInterval(() => {
      const phrase = phrases[currentPhrase]
      
      if (!isDeleting) {
        setTypedText(phrase.substring(0, currentChar + 1))
        currentChar++
        
        if (currentChar === phrase.length) {
          setTimeout(() => { isDeleting = true }, 2000)
        }
      } else {
        setTypedText(phrase.substring(0, currentChar - 1))
        currentChar--
        
        if (currentChar === 0) {
          isDeleting = false
          currentPhrase = (currentPhrase + 1) % phrases.length
        }
      }
    }, isDeleting ? 50 : 100)
    
    return () => clearInterval(typeInterval)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Clean animated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 50%, rgba(51, 65, 85, 0.5) 100%)
            `
          }}
        />
        
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
        
        {floatingIcons.map((item, index) => {
          const { Icon, delay, position } = item
          return (
            <div
              key={index}
              className="absolute opacity-10 animate-float"
              style={{
                ...position,
                animationDelay: `${delay}s`,
                animationDuration: '8s'
              }}
            >
              <Icon className="w-8 h-8 text-blue-300" />
            </div>
          )
        })}
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          <div className={`mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl text-white rounded-full px-8 py-4 mb-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold tracking-wide">TRUSTED BY 150+ ENTERPRISE TEAMS</span>
                <div className="flex space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <span className="text-xs text-white/80">4.9/5</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
              <span className="block text-white mb-4">Detect Elasticsearch</span>
              <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                {typedText}<span className="animate-pulse">|</span>
              </span>
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl">
                with 99.8% accuracy
              </span>
            </h1>
          </div>

          <div className={`mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-5xl mx-auto">
              <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed font-medium">
                The only platform that{' '}
                <span className="text-emerald-300 font-bold">prevents $2.4M+ in annual downtime costs</span> and{' '}
                <span className="text-blue-300 font-bold">boosts performance by 45%</span>
                {' '}across all Elasticsearch versions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 text-white/90 text-sm mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-semibold">22 Expert Health Checks</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-semibold">ES 5.x → Latest Support</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-semibold">Enterprise Security</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-semibold">1-Minute Setup</span>
                </div>
              </div>

            </div>
          </div>

          <div className={`flex flex-col lg:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnose" className="group">
                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-6 rounded-xl flex items-center transition-all duration-300 group-hover:scale-105 shadow-2xl border border-white/20">
                  <Rocket className="w-7 h-7 mr-4" />
                  <div className="text-left">
                    <div className="font-bold text-xl">Start Free Diagnosis</div>
                    <div className="text-sm opacity-90">See results in 60 seconds</div>
                  </div>
                  <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </div>

            {/* Enhanced Dynamic Stats Block */}
            <div className={`transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl px-8 py-6 shadow-2xl">
                <div className="text-center">
                  <div className="text-sm text-white/70 mb-2 font-medium uppercase tracking-wide">
                    Live Impact Metrics
                  </div>
                  <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stats[currentStat].color} bg-clip-text text-transparent`}>
                    {stats[currentStat].number}
                  </div>
                  <div className="text-white font-semibold mb-1">
                    {stats[currentStat].label}
                  </div>
                  <div className="text-white/70 text-sm">
                    {stats[currentStat].description}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center space-x-2">
                  {stats.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStat 
                          ? 'bg-white scale-125' 
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                      onClick={() => setCurrentStat(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const sectionRef = useRef(null)

  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Prevent $2.4M+ Downtime Costs",
      description: "Advanced analytics detect critical issues before they cause outages. Our algorithms analyze 1000+ data points to prevent catastrophic failures and maintain system stability.",
      benefits: ["99.8% issue detection accuracy", "Average $2.4M annual savings", "Zero-downtime deployments", "Proactive alert system"],
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-50 to-orange-50",
      stat: "99.8%",
      statLabel: "Accuracy Rate",
      icon2: <AlertTriangle className="w-6 h-6" />
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "45% Performance Boost Guaranteed", 
      description: "Advanced query optimization and resource analysis deliver measurable performance improvements. Our recommendations are backed by real-world data from 350+ enterprise deployments.",
      benefits: ["45-85% query speed improvement", "40% infrastructure cost reduction", "Smart resource optimization", "Performance guarantee SLA"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      stat: "45%",
      statLabel: "Min Performance Gain",
      icon2: <TrendingUp className="w-6 h-6" />
    },
    {
      icon: <Gauge className="w-12 h-12" />,
      title: "Complete Version Coverage",
      description: "The only platform supporting ALL Elasticsearch versions from 5.x to latest 9.x. Seamless compatibility across your entire infrastructure with version-specific optimizations.",
      benefits: ["ES 5.x → 9.x support", "Version-specific checks", "Migration assistance", "Legacy cluster support"],
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      stat: "5.x-9.x",
      statLabel: "ES Versions",
      icon2: <Database className="w-6 h-6" />
    }
  ]

  const capabilities = [
    { 
      icon: <Database className="w-8 h-8" />, 
      title: "Multi-Version Mastery", 
      description: "Native support for ES 5.x through latest with version-specific optimizations", 
      color: "from-blue-500 to-blue-600",
      metric: "ES 5-9.x"
    },
    { 
      icon: <Search className="w-8 h-8" />, 
      title: "Deep Health Analysis", 
      description: "22 comprehensive diagnostic checks covering every aspect of cluster health", 
      color: "from-emerald-500 to-emerald-600",
      metric: "22 Checks"
    },
    { 
      icon: <Activity className="w-8 h-8" />, 
      title: "Real-Time Intelligence", 
      description: "Continuous monitoring with ML-powered anomaly detection and trending", 
      color: "from-purple-500 to-purple-600",
      metric: "24/7"
    },
    { 
      icon: <Target className="w-8 h-8" />, 
      title: "Actionable Insights", 
      description: "Priority-ranked recommendations with ROI calculations and implementation guides", 
      color: "from-orange-500 to-orange-600",
      metric: "ROI-Based"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full px-6 py-3 mb-8 border border-blue-200 shadow-lg">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent uppercase tracking-wide">Enterprise-Grade Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="block">Proactive Health Monitoring</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Before Issues Become Disasters
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Transform your Elasticsearch operations with advanced diagnostics, comprehensive insights, 
          and enterprise-grade reliability that prevents outages before they happen.
          </p>
        </div>

        <div className={`grid lg:grid-cols-3 gap-10 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Background gradient that appears on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Floating stat badge */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <div className={`bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                  <div className="text-lg font-black">{feature.stat}</div>
                  <div className="text-xs opacity-90">{feature.statLabel}</div>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                <ul className="space-y-4">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-colors duration-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </div>
          ))}
        </div>

        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Built for Enterprise Scale
                  </span>
                </h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Professional-grade architecture engineered for mission-critical environments 
                  with enterprise security, compliance, and scalability.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {capabilities.map((capability, index) => (
                  <div key={index} className="group text-center p-8 rounded-2xl hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${capability.color} rounded-2xl flex items-center justify-center mx-auto text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        {capability.icon}
                      </div>
                      {/* Metric badge */}
                      <div className="absolute -top-2 -right-2 bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {capability.metric}
                      </div>
                    </div>
                    
                    <h4 className="font-black text-xl text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                      {capability.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {capability.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HowItWorksSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const sectionRef = useRef(null)

  const steps = [
    {
      step: "01",
      title: "Instant Connection",
      description: "Connect your Elasticsearch cluster in seconds with our intelligent auto-detection system. We instantly identify your version, configuration, and security settings.",
      icon: <Database className="w-12 h-12" />,
      features: ["Auto-version detection", "Secure TLS connection", "Zero configuration required", "Multi-cluster support"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      time: "< 30 seconds"
    },
    {
      step: "02", 
      title: "Comprehensive Analysis",
      description: "Our advanced diagnostic engine performs 22+ comprehensive health checks using proven algorithms and expert knowledge accumulated from thousands of production clusters.",
      icon: <BarChart3 className="w-12 h-12" />,
      features: ["22+ diagnostic checks", "Expert-driven insights", "Real-time analysis", "Performance benchmarking"],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      time: "< 60 seconds"
    },
    {
      step: "03",
      title: "Actionable Intelligence",
      description: "Receive prioritized recommendations with ROI calculations, step-by-step implementation guides, and real-time impact analysis tailored to your environment.",
      icon: <Target className="w-12 h-12" />,
      features: ["Priority-ranked issues", "ROI calculations", "Implementation guides", "Success metrics"],
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
      time: "Instant delivery"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-4 py-2 mb-6">
            <Activity className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">SIMPLE PROCESS</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Health Insights in
            <br />
            <span className="text-green-600">Three Simple Steps</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From connection to actionable recommendations in under 5 seconds.
          </p>
        </div>

        <div className={`grid lg:grid-cols-3 gap-12 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-12 h-1 z-10">
                  <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`} style={{transitionDelay: `${index * 500}ms`}}></div>
                  </div>
                  <ChevronRight className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-6 h-6 text-gray-400 bg-white rounded-full" />
                </div>
              )}
              
              <div className={`text-center p-8 rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border-2 ${currentStep === index ? 'bg-gradient-to-br ' + step.bgColor + ' border-transparent shadow-xl scale-105' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                {/* Step number */}
                <div className="relative mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl font-black text-lg mb-6 transition-all duration-500 ${currentStep === index ? 'bg-gradient-to-r ' + step.color + ' text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-600'}`}>
                    {step.step}
                  </div>
                  
                  {/* Time badge */}
                  <div className={`absolute -top-2 -right-4 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${currentStep === index ? 'bg-white text-gray-800 shadow-lg opacity-100' : 'opacity-0'}`}>
                    {step.time}
                  </div>
                </div>
                
                <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {step.icon}
                </div>
                
                <h3 className={`text-2xl font-black mb-6 transition-all duration-300 ${currentStep === index ? 'text-transparent bg-gradient-to-r bg-clip-text from-gray-900 to-gray-700' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {step.description}
                </p>

                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center text-gray-700">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${currentStep === index ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                        <CheckCircle2 className={`w-4 h-4 ${currentStep === index ? 'text-emerald-600' : 'text-gray-500'}`} />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Step indicators */}
        <div className="flex justify-center space-x-3 mb-16">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-emerald-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>

        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-3xl p-16 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-full mb-8 shadow-xl">
                <Rocket className="w-5 h-5 mr-2" />
                <span className="font-bold text-sm uppercase tracking-wide">Ready to Get Started?</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent">
                  Join 150+ Enterprise Teams
                </span>
              </h3>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                See why leading companies trust ElasticDoctor for mission-critical 
                Elasticsearch operations and comprehensive health monitoring.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="#pricing" className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl group-hover:scale-105 transition-all duration-300 flex items-center">
                    <Eye className="w-6 h-6 mr-3" />
                    View Pricing Plans
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
                
                <div className="flex items-center space-x-8 text-gray-600">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="font-semibold">Free plan available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="font-semibold">Simple pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const sectionRef = useRef(null)

  const testimonials = [
    {
    quote: "ElasticDoctor prevented a catastrophic Black Friday outage that would have cost us $4.2M in lost revenue. The advanced analytics detected a critical memory leak before it could crash our production cluster. ROI was 2,800% in the first month.",
    author: "Sarah Chen",
    role: "VP of Engineering", 
    company: "TechFlow E-commerce", 
    avatar: "SC",
    impact: "$4.2M disaster prevented",
    rating: 5,
    category: "Revenue Protection",
      metrics: "2,800% ROI",
        clusterSize: "850 nodes"
      },
    {
      quote: "The ES 6 to 8 migration was flawless - zero downtime, zero data loss. Their compatibility matrix and step-by-step guidance made it feel effortless.",
      author: "Marcus Rodriguez", 
      role: "DevOps Lead",
      company: "FinTech Startup",
      avatar: "MR", 
      impact: "Zero-downtime migration",
      rating: 5,
      category: "Migration Success"
    },
    {
    quote: "Query performance improved 73% within the first week of implementing ElasticDoctor's recommendations. The advanced analysis identified bottlenecks our team missed for months. Infrastructure costs dropped 40% while handling 3x more traffic.",
    author: "Lisa Park",
    role: "Principal Data Engineer", 
    company: "StreamMedia Corp",
    avatar: "LP",
    impact: "73% performance boost + 40% cost reduction",
    rating: 5,
    category: "Performance",
      metrics: "3x traffic capacity",
        clusterSize: "320 nodes"
      },
    {
      quote: "Security audit uncovered 12 critical vulnerabilities we missed. ElasticDoctor's recommendations fast-tracked our SOC 2 compliance by 4 months.",
      author: "David Kumar",
      role: "CISO",
      company: "Healthcare Tech",
      avatar: "DK",
      impact: "SOC 2 compliance achieved",
      rating: 5,
      category: "Security"
    },
    {
      quote: "The automated monitoring caught a memory leak at 3 AM before it could crash our production cluster. Our SLA went from 99.5% to 99.99%.",
      author: "Emma Thompson",
      role: "Site Reliability Engineer",
      company: "SaaS Platform",
      avatar: "ET",
      impact: "99.99% SLA achieved",
      rating: 5,
      category: "Reliability"
    },
    {
      quote: "Managing 15 clusters across 3 environments became trivial. The unified dashboard gives us complete visibility and control we never had before.",
      author: "Alex Johnson",
      role: "Platform Lead",
      company: "Gaming Company",
      avatar: "AJ",
      impact: "15 clusters unified",
      rating: 5,
      category: "Operations"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000) // Change every 5 seconds
      return () => clearInterval(timer)
    }
  }, [isVisible, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center bg-purple-100 text-purple-800 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold">CUSTOMER SUCCESS</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Trusted by Teams
            <br />
            <span className="text-purple-600">Around the World</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real results from real teams who transformed their Elasticsearch operations.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className={`grid lg:grid-cols-3 gap-8 mb-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={`${currentTestimonial}-${index}`} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6">
                  <div className="text-3xl text-blue-200 mb-4">"</div>
                  <p className="text-gray-700 leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
                
                <div className="mb-6">
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    📈 {testimonial.impact}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mr-4 shadow-lg">
                    {testimonial.gender === 'female' ? (
                      <Users className="w-6 h-6" />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-purple-600 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
        
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">99.9% SLA</div>
                <div className="text-gray-600 text-sm">Guaranteed uptime</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">150+ Customers</div>
                <div className="text-gray-600 text-sm">Growing enterprise base</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroSection, FeaturesSection, HowItWorksSection, TestimonialSection }