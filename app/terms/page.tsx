import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Terms of Service - ElasticDoctor',
  description: 'Terms of Service for ElasticDoctor Elasticsearch diagnostic platform'
}

const TermsOfServicePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using ElasticDoctor ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              ElasticDoctor is a Software-as-a-Service (SaaS) platform that provides comprehensive health diagnostics for Elasticsearch clusters.
              The service includes but is not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Automated health checks and diagnostics for Elasticsearch clusters</li>
              <li>Performance analysis and optimization recommendations</li>
              <li>Security audits and compliance reporting</li>
              <li>Migration compatibility analysis</li>
              <li>Dashboard and reporting tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              To access certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your password and identification</li>
              <li>Accept all risks of unauthorized access to your account and information</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
            <p className="text-gray-700 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Upload viruses or other malicious code</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Interfere with or circumvent the security features of the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data and Privacy</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
              to understand our practices. By using our Service, you consent to the collection and use of information as 
              described in our Privacy Policy.
            </p>
            <p className="text-gray-700 mb-4">
              You retain all rights to your data. We will not share, sell, or otherwise distribute your Elasticsearch 
              configuration data or diagnostic results to third parties without your explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription and Billing</h2>
            <p className="text-gray-700 mb-4">
              Some features of our Service are offered on a subscription basis. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Pay all subscription fees according to your selected plan</li>
              <li>Provide current and accurate billing information</li>
              <li>Notify us of any changes to your billing information</li>
              <li>Accept that subscription fees are non-refundable except as required by law</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We reserve the right to change our subscription plans and pricing at any time, with reasonable notice to existing subscribers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              We strive to maintain high service availability but do not guarantee uninterrupted access. We reserve the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Modify or discontinue the Service temporarily or permanently</li>
              <li>Perform scheduled maintenance and updates</li>
              <li>Suspend or terminate accounts that violate these terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of 
              ElasticDoctor and its licensors. The Service is protected by copyright, trademark, and other laws. 
              Our trademarks and trade dress may not be used without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers</h2>
            <p className="text-gray-700 mb-4">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO REPRESENTATIONS OR WARRANTIES 
              OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SERVICE OR THE INFORMATION, CONTENT, MATERIALS, 
              OR PRODUCTS INCLUDED ON THE SERVICE.
            </p>
            <p className="text-gray-700 mb-4">
              While we strive to provide accurate diagnostic information, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Diagnostic results are advisory in nature and should be reviewed by qualified personnel</li>
              <li>You are responsible for implementing any recommendations safely in your environment</li>
              <li>We cannot guarantee the accuracy or completeness of all diagnostic results</li>
              <li>You should always test changes in a non-production environment first</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              IN NO EVENT SHALL ELASTICDOCTOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE 
              DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, 
              RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
              under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by contacting us or through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which ElasticDoctor operates, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
              we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will 
              be determined at our sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@elasticdoctor.com<br/>
                <strong>Address:</strong> ElasticDoctor Legal Department<br/>
                <strong>Response Time:</strong> We aim to respond within 5 business days
              </p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}

export default TermsOfServicePage
