
'use client'

import { useState } from 'react'
import DocumentUpload from '../../components/DocumentUpload'
import IntelligenceDashboard from '../../components/IntelligenceDashboard'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('upload')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Construction Intelligence Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 py-3">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Document Upload
              </button>
              <button
                onClick={() => setActiveTab('intelligence')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'intelligence'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Intelligence Dashboard
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'upload' && <DocumentUpload />}
            {activeTab === 'intelligence' && <IntelligenceDashboard />}
          </div>
        </div>
      </div>
    </div>
  )
}
