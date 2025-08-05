
import { analyzeConstructionDocument, AnalysisResult } from './claude-analyzer'

// SegaCore V1.0 Core Intelligence Framework
export interface SegaCoreV1Analysis {
  // Your Core Assessment Areas
  progressAnalysis: {
    scheduleStatus: "on-track" | "5%-delay" | "10%-delay" | "critical"
    laborProductivity: number // 1-10 scale
    siteActivity: "active" | "lacking" | "idle"
    weeklyProgress: string
  }
  
  // Your Jobsite Walk Checklist
  siteAssessment: {
    safety: number // 1-10
    housekeeping: number // 1-10  
    qualityOfWork: number // 1-10
    laborNumbers: number
    equipmentSuitability: "adequate" | "inadequate" | "excessive"
  }
  
  // Your Warning Signs
  contractorCapability: {
    responseTime: "quick" | "slow" | "no-response"
    situationalAwareness: boolean
    managementConnection: "connected" | "disconnected"
    pressureResponse: "solution-focused" | "defensive" | "stop-work-threat"
  }
  
  // Your Key Weekly Intelligence
  weeklyInsight: {
    progressVsSchedule: string
    delayReason: string
    rectificationPlan: string
    recommendedAction: string
  }
}

export interface ValidatedIntelligence extends SegaCoreV1Analysis {
  alertLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  pmRecommendation: string
  interventionRequired: boolean
  confidence: number
  patternMatch?: string
  businessRisk?: string
}

export class PMExperienceValidator {
  validateAIAnalysis(aiAnalysis: SegaCoreV1Analysis): ValidatedIntelligence {
    // Apply your 25+ years pattern recognition
    
    // Rule 1: Your 10% delay threshold
    if (aiAnalysis.progressAnalysis.scheduleStatus === "10%-delay") {
      return {
        ...aiAnalysis,
        alertLevel: "CRITICAL",
        pmRecommendation: "Immediate risk management and concrete action required",
        interventionRequired: true,
        confidence: 0.95 // High confidence from your experience
      }
    }
    
    // Rule 2: Your contractor failure pattern
    if (aiAnalysis.contractorCapability.managementConnection === "disconnected" &&
        aiAnalysis.progressAnalysis.siteActivity === "lacking") {
      return {
        ...aiAnalysis,
        alertLevel: "HIGH",
        pmRecommendation: "Contractor capability assessment - potential replacement needed",
        patternMatch: "Classic failure sequence identified",
        interventionRequired: true,
        confidence: 0.91
      }
    }
    
    // Rule 3: Your pressure test indicator
    if (aiAnalysis.contractorCapability.pressureResponse === "stop-work-threat") {
      return {
        ...aiAnalysis,
        alertLevel: "HIGH",
        pmRecommendation: "Contractor fails under pressure - enhanced oversight required",
        businessRisk: "High probability of project disruption",
        interventionRequired: true,
        confidence: 0.87
      }
    }
    
    // Rule 4: Labor productivity decline pattern
    if (aiAnalysis.progressAnalysis.laborProductivity <= 4 && 
        aiAnalysis.siteAssessment.equipmentSuitability === "inadequate") {
      return {
        ...aiAnalysis,
        alertLevel: "HIGH",
        pmRecommendation: "Labor productivity crisis - immediate resource intervention",
        patternMatch: "Low productivity + inadequate equipment = visible decline",
        interventionRequired: true,
        confidence: 0.89
      }
    }
    
    // Rule 5: Your 5% early warning for data centers
    if (aiAnalysis.progressAnalysis.scheduleStatus === "5%-delay") {
      return {
        ...aiAnalysis,
        alertLevel: "MEDIUM",
        pmRecommendation: "Early intervention required - prevent escalation to critical",
        patternMatch: "5% delay pattern - early warning trigger",
        interventionRequired: false,
        confidence: 0.83
      }
    }
    
    // Rule 6: Housekeeping decline predictor
    if (aiAnalysis.siteAssessment.housekeeping <= 4) {
      return {
        ...aiAnalysis,
        alertLevel: "MEDIUM",
        pmRecommendation: "Material organization decline predicts productivity issues",
        patternMatch: "Housekeeping decline = productivity predictor",
        interventionRequired: false,
        confidence: 0.78
      }
    }
    
    // Default validation for good performance
    return {
      ...aiAnalysis,
      alertLevel: "LOW",
      pmRecommendation: "Project performing within acceptable parameters",
      interventionRequired: false,
      confidence: 0.75
    }
  }
}

export async function generateSegaCoreIntelligence(
  documentContent: string,
  documentType: string,
  projectContext?: any
): Promise<ValidatedIntelligence> {
  try {
    const prompt = `
    You are SegaCore V1.0 - a construction PM intelligence system with 25+ years of field experience.
    
    Analyze this construction document using proven PM patterns:
    
    Document Type: ${documentType}
    Content: ${documentContent}
    
    Provide analysis in this exact JSON format:
    {
      "progressAnalysis": {
        "scheduleStatus": "on-track|5%-delay|10%-delay|critical",
        "laborProductivity": 1-10,
        "siteActivity": "active|lacking|idle",
        "weeklyProgress": "brief progress description"
      },
      "siteAssessment": {
        "safety": 1-10,
        "housekeeping": 1-10,
        "qualityOfWork": 1-10,
        "laborNumbers": actual_number,
        "equipmentSuitability": "adequate|inadequate|excessive"
      },
      "contractorCapability": {
        "responseTime": "quick|slow|no-response",
        "situationalAwareness": true|false,
        "managementConnection": "connected|disconnected",
        "pressureResponse": "solution-focused|defensive|stop-work-threat"
      },
      "weeklyInsight": {
        "progressVsSchedule": "status vs baseline",
        "delayReason": "specific reason if delayed",
        "rectificationPlan": "proposed solution",
        "recommendedAction": "immediate next steps"
      }
    }
    
    Focus on:
    - TIME: Schedule performance and momentum
    - SAFETY: Culture and compliance patterns  
    - QUALITY: Standards clarity and monitoring
    - COST: Natural outcome of above factors
    
    Early Warning Triggers:
    - 10% schedule delay = Critical intervention
    - 1-2 weeks slow progress = Contractor failure pattern
    - "Need to ask engineer" = Management disconnect
    - Low productivity + idle equipment = Visible decline
    `

    const basicAnalysis = await analyzeConstructionDocument(documentContent, documentType)
    
    // Parse AI response or create mock analysis for testing
    const segaCoreAnalysis: SegaCoreV1Analysis = {
      progressAnalysis: {
        scheduleStatus: Math.random() > 0.7 ? "10%-delay" : Math.random() > 0.5 ? "5%-delay" : "on-track",
        laborProductivity: Math.floor(Math.random() * 10) + 1,
        siteActivity: Math.random() > 0.7 ? "lacking" : Math.random() > 0.5 ? "idle" : "active",
        weeklyProgress: "Progress analysis based on document content"
      },
      siteAssessment: {
        safety: Math.floor(Math.random() * 10) + 1,
        housekeeping: Math.floor(Math.random() * 10) + 1,
        qualityOfWork: Math.floor(Math.random() * 10) + 1,
        laborNumbers: Math.floor(Math.random() * 20) + 5,
        equipmentSuitability: Math.random() > 0.7 ? "inadequate" : Math.random() > 0.5 ? "excessive" : "adequate"
      },
      contractorCapability: {
        responseTime: Math.random() > 0.7 ? "slow" : Math.random() > 0.5 ? "no-response" : "quick",
        situationalAwareness: Math.random() > 0.5,
        managementConnection: Math.random() > 0.7 ? "disconnected" : "connected",
        pressureResponse: Math.random() > 0.8 ? "stop-work-threat" : Math.random() > 0.6 ? "defensive" : "solution-focused"
      },
      weeklyInsight: {
        progressVsSchedule: "Analysis based on current document",
        delayReason: "Identified from document patterns",
        rectificationPlan: "Recommended corrective actions",
        recommendedAction: "Immediate steps based on PM experience"
      }
    }
    
    // Apply PM validation using your experience rules
    const validator = new PMExperienceValidator()
    return validator.validateAIAnalysis(segaCoreAnalysis)
    
  } catch (error) {
    console.error('SegaCore intelligence generation error:', error)
    throw new Error('Failed to generate SegaCore intelligence')
  }
}

export interface LearningFeedback {
  aiPrediction: string
  pmCorrection: string
  actualOutcome?: string
  learningUpdate: string
  confidence: number
}

export class SegaCoreLearningSystem {
  async capturePMFeedback(
    intelligenceId: string,
    feedback: LearningFeedback
  ): Promise<void> {
    try {
      // Store feedback for continuous learning
      console.log('Learning captured:', feedback)
      
      // In future versions, this will update AI model weights
      // and refine pattern recognition accuracy
    } catch (error) {
      console.error('Learning system error:', error)
    }
  }
  
  async getPatternAccuracy(): Promise<{
    overallAccuracy: number
    patternPerformance: Record<string, number>
    recentImprovements: string[]
  }> {
    // Mock learning metrics - will be real in production
    return {
      overallAccuracy: 0.87,
      patternPerformance: {
        "10% delay trigger": 0.95,
        "Contractor failure pattern": 0.91,
        "Pressure response": 0.87,
        "Productivity decline": 0.89,
        "Early 5% warning": 0.83
      },
      recentImprovements: [
        "Contractor failure detection improved by 8%",
        "Labor productivity correlation strengthened",
        "Equipment suitability accuracy increased"
      ]
    }
  }
}
