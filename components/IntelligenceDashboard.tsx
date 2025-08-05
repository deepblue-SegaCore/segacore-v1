
'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, AlertTriangle, DollarSign, Calendar, Clock, Users, HardHat, CheckCircle } from 'lucide-react'
import { ValidatedIntelligence } from '../lib/segacore-intelligence'

const mockData = [
  { name: 'Jan', projects: 4, budget: 2400000, spent: 1800000 },
  { name: 'Feb', projects: 6, budget: 3200000, spent: 2400000 },
  { name: 'Mar', projects: 8, budget: 4100000, spent: 3100000 },
  { name: 'Apr', projects: 5, budget: 2800000, spent: 2200000 },
  { name: 'May', projects: 7, budget: 3900000, spent: 2900000 },
  { name: 'Jun', projects: 9, budget: 4500000, spent: 3200000 }
]

const riskData = [
  { name: 'Low Risk', value: 40, color: '#10B981' },
  { name: 'Medium Risk', value: 35, color: '#F59E0B' },
  { name: 'High Risk', value: 25, color: '#EF4444' }
]

export default function IntelligenceDashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [segaCoreIntelligence, setSegaCoreIntelligence] = useState<ValidatedIntelligence | null>(null)

  useEffect(() => {
    fetchProjects()
    fetchSegaCoreIntelligence()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSegaCoreIntelligence = async () => {
    try {
      const response = await fetch('/api/segacore-intelligence')
      if (response.ok) {
        const data = await response.json()
        setSegaCoreIntelligence(data.intelligence)
      }
    } catch (error) {
      console.error('Failed to fetch SegaCore intelligence:', error)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* SegaCore V1.0 PM Intelligence */}
      {segaCoreIntelligence && (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">🎯 SegaCore V1.0 PM Intelligence</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              segaCoreIntelligence.alertLevel === 'CRITICAL' ? 'bg-red-500' :
              segaCoreIntelligence.alertLevel === 'HIGH' ? 'bg-orange-500' :
              segaCoreIntelligence.alertLevel === 'MEDIUM' ? 'bg-yellow-500' :
              'bg-green-500'
            }`}>
              {segaCoreIntelligence.alertLevel} RISK
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                <div>
                  <p className="text-sm opacity-80">Schedule Status</p>
                  <p className="font-bold">{segaCoreIntelligence.progressAnalysis.scheduleStatus}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2" />
                <div>
                  <p className="text-sm opacity-80">Labor Productivity</p>
                  <p className="font-bold">{segaCoreIntelligence.progressAnalysis.laborProductivity}/10</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center">
                <HardHat className="w-6 h-6 mr-2" />
                <div>
                  <p className="text-sm opacity-80">Safety Score</p>
                  <p className="font-bold">{segaCoreIntelligence.siteAssessment.safety}/10</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                <div>
                  <p className="text-sm opacity-80">Quality Score</p>
                  <p className="font-bold">{segaCoreIntelligence.siteAssessment.qualityOfWork}/10</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">🧠 PM Recommendation</h3>
            <p className="mb-2">{segaCoreIntelligence.pmRecommendation}</p>
            {segaCoreIntelligence.patternMatch && (
              <p className="text-sm opacity-80">Pattern: {segaCoreIntelligence.patternMatch}</p>
            )}
            <div className="mt-2 text-sm">
              Confidence: {Math.round(segaCoreIntelligence.confidence * 100)}% | 
              {segaCoreIntelligence.interventionRequired ? ' Intervention Required' : ' Monitoring Sufficient'}
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Active Projects</p>
              <p className="text-2xl font-bold text-blue-900">{projects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Total Budget</p>
              <p className="text-2xl font-bold text-green-900">$8.5M</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-yellow-600">Risk Alerts</p>
              <p className="text-2xl font-bold text-yellow-900">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-purple-600">Avg Completion</p>
              <p className="text-2xl font-bold text-purple-900">78%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Project Budget Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Bar dataKey="budget" fill="#3B82F6" name="Budget" />
              <Bar dataKey="spent" fill="#10B981" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Projects</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project: any) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.manager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(project.budget / 1000000).toFixed(1)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
