
import { analyzeConstructionDocument, generateProjectIntelligence, AnalysisResult } from './claude-analyzer'
import { getDatabase } from './database'

export interface IntelligenceReport {
  id: string
  documentId?: string
  projectId?: string
  analysisType: string
  insights: Array<{
    category: string
    level: string
    description: string
  }>
  recommendations: string[]
  riskLevel: string
  summary: string
  generatedAt: Date
}

export async function generateDocumentIntelligence(
  documentId: string,
  documentContent: string,
  documentType: string
): Promise<IntelligenceReport> {
  try {
    const analysis = await analyzeConstructionDocument(documentContent, documentType)
    
    const report: IntelligenceReport = {
      id: generateId(),
      documentId,
      analysisType: 'document_analysis',
      insights: analysis.insights,
      recommendations: analysis.recommendations,
      riskLevel: analysis.riskLevel,
      summary: analysis.summary,
      generatedAt: new Date()
    }

    // Save to database if available
    await saveIntelligenceReport(report)
    
    return report
  } catch (error) {
    console.error('Document intelligence generation error:', error)
    throw error
  }
}

export async function generateProjectIntelligenceReport(
  projectId: string,
  projectData: any
): Promise<IntelligenceReport> {
  try {
    const analysis = await generateProjectIntelligence(projectData)
    
    const report: IntelligenceReport = {
      id: generateId(),
      projectId,
      analysisType: 'project_analysis',
      insights: analysis.insights,
      recommendations: analysis.recommendations,
      riskLevel: analysis.riskLevel,
      summary: analysis.summary,
      generatedAt: new Date()
    }

    await saveIntelligenceReport(report)
    
    return report
  } catch (error) {
    console.error('Project intelligence generation error:', error)
    throw error
  }
}

export async function getIntelligenceHistory(
  projectId?: string,
  documentId?: string
): Promise<IntelligenceReport[]> {
  try {
    const db = getDatabase()
    let query = 'SELECT * FROM intelligence WHERE 1=1'
    const params: any[] = []
    
    if (projectId) {
      query += ' AND project_id = $' + (params.length + 1)
      params.push(projectId)
    }
    
    if (documentId) {
      query += ' AND document_id = $' + (params.length + 1)
      params.push(documentId)
    }
    
    query += ' ORDER BY generated_at DESC'
    
    const result = await db.query(query, params)
    return result.rows.map(row => ({
      id: row.id,
      documentId: row.document_id,
      projectId: row.project_id,
      analysisType: row.analysis_type,
      insights: row.insights,
      recommendations: row.recommendations,
      riskLevel: row.risk_level,
      summary: row.summary || '',
      generatedAt: row.generated_at
    }))
  } catch (error) {
    console.error('Error fetching intelligence history:', error)
    return []
  }
}

async function saveIntelligenceReport(report: IntelligenceReport): Promise<void> {
  try {
    const db = getDatabase()
    await db.query(`
      INSERT INTO intelligence (
        id, document_id, project_id, analysis_type, insights, 
        recommendations, risk_level, generated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      report.id,
      report.documentId || null,
      report.projectId || null,
      report.analysisType,
      JSON.stringify(report.insights),
      report.recommendations,
      report.riskLevel,
      report.generatedAt
    ])
  } catch (error) {
    console.error('Error saving intelligence report:', error)
    // Don't throw here to avoid breaking the main flow
  }
}

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export async function validatePMDecisions(
  projectData: any,
  decisions: Array<{
    category: string
    decision: string
    rationale: string
  }>
): Promise<{
  validations: Array<{
    category: string
    status: 'passed' | 'failed' | 'warning'
    feedback: string
  }>
  overallScore: number
}> {
  // Mock PM validation logic
  const validations = decisions.map(decision => {
    // Simulate validation logic
    const score = Math.random()
    let status: 'passed' | 'failed' | 'warning'
    let feedback: string
    
    if (score > 0.7) {
      status = 'passed'
      feedback = `${decision.category} decision is well-justified and aligns with best practices.`
    } else if (score > 0.4) {
      status = 'warning'
      feedback = `${decision.category} decision may need additional consideration.`
    } else {
      status = 'failed'
      feedback = `${decision.category} decision requires revision based on project constraints.`
    }
    
    return {
      category: decision.category,
      status,
      feedback
    }
  })
  
  const overallScore = validations.reduce((acc, v) => {
    return acc + (v.status === 'passed' ? 100 : v.status === 'warning' ? 60 : 20)
  }, 0) / validations.length
  
  return {
    validations,
    overallScore
  }
}
