
'use client'

import PMValidationDashboard from '../../components/PMValidationDashboard'

export default function ValidationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">PM Validation Dashboard</h1>
        <PMValidationDashboard />
      </div>
    </div>
  )
}
