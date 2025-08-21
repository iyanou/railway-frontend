import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Privacy Policy - ElasticDoctor',
  description: 'Privacy Policy for ElasticDoctor Elasticsearch diagnostic platform'
}

const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              ElasticDoctor respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and protect your information when you use our 
              Elasticsearch diagnostic platform and related services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-700 mb-4">We collect information you provide directly, including:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, company name, and password</li>
              <li><strong>Billing Information:</strong> Payment details, billing address, and subscription preferences</li>
              <li><strong>Cluster Connection Details:</strong> Elasticsearch connection parameters you configure</li>
              <li><strong>Support Communications:</strong> Information you provide when contacting customer support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Information Collected Automatically</h3>
            <p className="text-gray-700 mb-4">When you use our Service, we automatically collect:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Usage Data:</strong> Features used, diagnostic reports generated, login times</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
              <li><strong>Log Data:</strong> Server logs, error reports, and performance metrics</li>
              <li><strong>Cookies:</strong> Session data, preferences, and analytical information</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Diagnostic Data</h3>
            <p className="text-gray-700 mb-4">
              When you run diagnostics, we process metadata about your Elasticsearch cluster including configuration settings, 
              performance metrics, and health statistics. We do not access or store your actual data content from Elasticsearch indices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Process and analyze your Elasticsearch cluster diagnostics</li>
              <li>Generate health reports and recommendations</li>
              <li>Provide customer support and troubleshooting</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service-related communications</li>
              <li>Improve our service and develop new features</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or transfer your personal information to third parties, except:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Service Providers:</strong> Trusted partners who assist in operating our service (hosting, payments, support)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement comprehensive security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Encryption:</strong> Data encrypted in transit and at rest</li>
              <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
              <li><strong>Network Security:</strong> Firewalls and intrusion detection</li>
              <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
              <li><strong>Employee Training:</strong> Security awareness and data protection protocols</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 mb-4">We retain your information for different periods:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Account Data:</strong> Until you delete your account</li>
              <li><strong>Diagnostic Results:</strong> According to your subscription plan (7-30 days)</li>
              <li><strong>Billing Information:</strong> For tax and legal compliance (typically 7 years)</li>
              <li><strong>Usage Analytics:</strong> Aggregated data may be retained indefinitely</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise these rights, contact us at privacy@elasticdoctor.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand site usage</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your information may be processed in countries other than your own. We ensure appropriate 
              safeguards are in place including standard contractual clauses and privacy frameworks.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of material changes 
              by email and prominent website notice. Your continued use constitutes acceptance of updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@elasticdoctor.com<br/>
                <strong>Data Protection Officer:</strong> dpo@elasticdoctor.com<br/>
                <strong>Response Time:</strong> Within 30 days<br/>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Compliance</h2>
            <p className="text-gray-700 mb-4">
              We comply with applicable data protection laws including GDPR, CCPA, and other regional privacy regulations.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}

export default PrivacyPolicyPage
