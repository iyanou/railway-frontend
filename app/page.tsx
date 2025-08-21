import React from 'react'
import Navbar from '../components/Navbar'
import { HeroSection, FeaturesSection, HowItWorksSection, TestimonialSection } from '../components/LandingComponents'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <PricingSection />
      <Footer />
    </main>
  )
}
