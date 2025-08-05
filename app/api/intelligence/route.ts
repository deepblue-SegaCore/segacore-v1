
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { documentId, analysisType } = await request.json()

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    // Mock intelligence analysis
    const intelligence = {
      id: Date.now().toString(),
      documentId,
      analysisType: analysisType || 'comprehensive',
      insights: [
        {
          category: 'Risk Assessment',
          level: 'Medium',
          description: 'Potential timeline delays identified in project phases 3-4'
        },
        {
          category: 'Cost Analysis',
          level: 'Low',
          description: 'Material costs align with current market rates'
        },
        {
          category: 'Compliance',
          level: 'High',
          description: 'All safety requirements met according to local regulations'
        }
      ],
      recommendations: [
        'Consider accelerating phase 2 to offset potential delays',
        'Monitor material supply chain for phase 4',
        'Schedule additional safety inspections'
      ],
      generatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      message: 'Intelligence analysis completed',
      intelligence
    })
  } catch (error) {
    console.error('Intelligence analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate intelligence' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Mock data for recent intelligence reports
    const reports = [
      {
        id: '1',
        projectName: 'Office Complex A',
        status: 'completed',
        riskLevel: 'Low',
        lastUpdated: '2024-01-15'
      },
      {
        id: '2',
        projectName: 'Residential Tower B',
        status: 'in-progress',
        riskLevel: 'Medium',
        lastUpdated: '2024-01-14'
      }
    ]

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('Get intelligence reports error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch intelligence reports' },
      { status: 500 }
    )
  }
}
