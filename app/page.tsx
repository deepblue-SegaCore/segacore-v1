
'use client'

import { useState } from 'react'
import { Upload, BarChart3, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SegaCore V1.0
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered Construction Intelligence Platform for project management, 
            document analysis, and PM validation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Document Upload</h3>
            <p className="text-gray-600">Upload construction documents for AI analysis</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Intelligence Dashboard</h3>
            <p className="text-gray-600">View AI-generated insights and analytics</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">PM Validation</h3>
            <p className="text-gray-600">Validate project management decisions</p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/dashboard" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Get Started
          </a>
        </div>
      </main>
    </div>
  )
}
