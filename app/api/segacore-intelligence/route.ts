
import { NextRequest, NextResponse } from 'next/server'
import { generateSegaCoreIntelligence, SegaCoreLearningSystem } from '../../../lib/segacore-intelligence'

export async function GET() {
  try {
    // Mock document content for demonstration
    const mockDocumentContent = `
    Daily Site Report - Metro Construction Phase 3
    Date: ${new Date().toDateString()}
    
    Progress Update:
    - Concrete pour completed for Level 2
    - Steel framing 75% complete
    - 18 workers on site today
    - Weather conditions: Clear
    
    Issues:
    - Material delivery delayed by 2 hours
    - Crane operator called in sick
    - Some tools scattered around work area
    
    Safety:
    - All workers wearing PPE
    - Safety briefing conducted
    - No incidents reported
    
    Quality:
    - Concrete test results pending
    - Steel connections inspected and approved
    - Housekeeping needs improvement in east section
    `
    
    const intelligence = await generateSegaCoreIntelligence(
      mockDocumentContent,
      'daily_site_report'
    )

    return NextResponse.json({ 
      intelligence,
      message: 'SegaCore V1.0 intelligence generated successfully'
    })
  } catch (error) {
    console.error('SegaCore intelligence API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate SegaCore intelligence' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { documentContent, documentType, feedback } = await request.json()

    if (feedback) {
      // Handle learning feedback
      const learningSystem = new SegaCoreLearningSystem()
      await learningSystem.capturePMFeedback('mock-id', feedback)
      
      return NextResponse.json({
        message: 'PM feedback captured for learning system'
      })
    }

    if (!documentContent) {
      return NextResponse.json(
        { error: 'Document content required' },
        { status: 400 }
      )
    }

    const intelligence = await generateSegaCoreIntelligence(
      documentContent,
      documentType || 'general_document'
    )

    return NextResponse.json({
      intelligence,
      message: 'SegaCore intelligence analysis completed'
    })
  } catch (error) {
    console.error('SegaCore intelligence POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process SegaCore intelligence request' },
      { status: 500 }
    )
  }
}
