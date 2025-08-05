
'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'

interface ValidationItem {
  id: string
  category: string
  description: string
  status: 'passed' | 'failed' | 'warning' | 'pending'
  details: string
}

const mockValidations: ValidationItem[] = [
  {
    id: '1',
    category: '🎯 10% Delay Rule',
    description: 'Critical schedule delay threshold (Your Experience)',
    status: 'passed',
    details: 'Current delay is 5% - below critical 10% threshold that requires immediate intervention'
  },
  {
    id: '2',
    category: '🚨 Contractor Failure Pattern',
    description: 'Management disconnect + low productivity (25+ year pattern)',
    status: 'warning',
    details: 'Contractor responses slower than normal, but management still connected to site operations'
  },
  {
    id: '3',
    category: '⚠️ Pressure Response Test',
    description: 'How contractor handles pressure situations',
    status: 'passed',
    details: 'Contractor responds with solutions rather than defensive "stop work" threats'
  },
  {
    id: '4',
    category: '📉 Labor Productivity Decline',
    description: 'Visible decline pattern + idle equipment',
    status: 'failed',
    details: 'Labor productivity dropped to 4/10 with equipment sitting idle - classic decline pattern'
  },
  {
    id: '5',
    category: '🏗️ Housekeeping Predictor',
    description: 'Material organization predicts productivity',
    status: 'warning',
    details: 'Site housekeeping declining for 3 consecutive days - leading productivity indicator'
  },
  {
    id: '6',
    category: '🎯 TIME Factor',
    description: 'Schedule performance and momentum',
    status: 'passed',
    details: 'Weekly progress meeting targets, good momentum maintained'
  },
  {
    id: '7',
    category: '🛡️ SAFETY Factor',
    description: 'Culture and compliance patterns',
    status: 'passed',
    details: 'Safety culture strong, compliance patterns consistent'
  },
  {
    id: '8',
    category: '⚡ QUALITY Factor',
    description: 'Standards clarity and continuous monitoring',
    status: 'passed',
    details: 'Quality standards clear, monitoring processes effective'
  }
]

export default function PMValidationDashboard() {
  const [validations] = useState<ValidationItem[]>(mockValidations)
  const [selectedValidation, setSelectedValidation] = useState<ValidationItem | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const statusCounts = validations.reduce((acc, validation) => {
    acc[validation.status] = (acc[validation.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Passed</p>
              <p className="text-2xl font-bold text-green-900">{statusCounts.passed || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-yellow-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-900">{statusCounts.warning || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-6 rounded-lg">
          <div className="flex items-center">
            <XCircle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm text-red-600">Failed</p>
              <p className="text-2xl font-bold text-red-900">{statusCounts.failed || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Pending</p>
              <p className="text-2xl font-bold text-blue-900">{statusCounts.pending || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Validation List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">PM Validation Checks</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {validations.map((validation) => (
            <div 
              key={validation.id} 
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedValidation(validation)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(validation.status)}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{validation.category}</h4>
                    <p className="text-sm text-gray-500">{validation.description}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(validation.status)}`}>
                  {validation.status.charAt(0).toUpperCase() + validation.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Details Modal */}
      {selectedValidation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedValidation.category}</h3>
              <button 
                onClick={() => setSelectedValidation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                {getStatusIcon(selectedValidation.status)}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedValidation.status)}`}>
                  {selectedValidation.status.charAt(0).toUpperCase() + selectedValidation.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{selectedValidation.description}</p>
              <p className="text-sm text-gray-800 mb-4">{selectedValidation.details}</p>
              
              {/* PM Learning Feedback */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">🧠 PM Experience Feedback</h4>
                <p className="text-xs text-blue-700 mb-3">
                  Help SegaCore learn from your 25+ years of experience
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 bg-green-100 hover:bg-green-200 rounded text-sm">
                    ✅ AI analysis matches my experience
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded text-sm">
                    ⚠️ Partially correct - needs adjustment
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-sm">
                    ❌ Disagree - I've seen this pattern before
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setSelectedValidation(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
