
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface AnalysisResult {
  insights: Array<{
    category: string
    level: 'low' | 'medium' | 'high'
    description: string
  }>
  recommendations: string[]
  riskLevel: 'low' | 'medium' | 'high'
  summary: string
}

export async function analyzeConstructionDocument(
  documentContent: string,
  documentType: string
): Promise<AnalysisResult> {
  try {
    const prompt = `
    You are a construction industry AI analyst. Analyze the following construction document and provide insights:

    Document Type: ${documentType}
    Content: ${documentContent}

    Please provide:
    1. Key insights categorized by type (Risk Assessment, Cost Analysis, Timeline, Safety, Compliance)
    2. Risk level assessment (low/medium/high)
    3. Actionable recommendations
    4. Brief summary

    Format your response as JSON with the following structure:
    {
      "insights": [
        {
          "category": "Risk Assessment",
          "level": "medium",
          "description": "Description of the insight"
        }
      ],
      "recommendations": ["Recommendation 1", "Recommendation 2"],
      "riskLevel": "medium",
      "summary": "Brief summary of analysis"
    }
    `

    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    
    try {
      return JSON.parse(responseText) as AnalysisResult
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        insights: [
          {
            category: 'General Analysis',
            level: 'medium',
            description: 'Document analyzed successfully but formatting error occurred'
          }
        ],
        recommendations: ['Review document manually for additional insights'],
        riskLevel: 'medium',
        summary: 'Analysis completed with technical limitations'
      }
    }
  } catch (error) {
    console.error('Claude analysis error:', error)
    throw new Error('Failed to analyze document with Claude AI')
  }
}

export async function generateProjectIntelligence(
  projectData: any
): Promise<AnalysisResult> {
  try {
    const prompt = `
    Analyze this construction project data and provide intelligence insights:

    Project: ${JSON.stringify(projectData, null, 2)}

    Provide analysis on:
    - Project timeline and milestones
    - Budget allocation and spending patterns
    - Resource utilization
    - Risk factors
    - Recommendations for optimization

    Return response as JSON in the same format as document analysis.
    `

    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    return JSON.parse(responseText) as AnalysisResult
  } catch (error) {
    console.error('Project intelligence generation error:', error)
    throw new Error('Failed to generate project intelligence')
  }
}
