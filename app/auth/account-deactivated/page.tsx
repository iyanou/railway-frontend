'use client'

import React from 'react'
import Link from 'next/link'
import { AlertTriangle, Mail, ArrowLeft } from 'lucide-react'

const AccountDeactivatedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Account Deactivated</h1>
          
          <div className="text-slate-600 mb-8 space-y-4">
            <p className="leading-relaxed">
              Your account has been deactivated and you cannot sign in at this time.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                <strong>Need to reactivate your account?</strong><br />
                Your data is safely preserved and your account can be restored.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <a 
              href="mailto:support@elasticdoctor.com?subject=Account Reactivation Request"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </a>
            
            <Link 
              href="/"
              className="w-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl text-slate-700 px-6 py-4 rounded-2xl transition-all duration-300 font-medium flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDeactivatedPage
