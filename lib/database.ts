
// Database connection utilities for SegaCore V1
import { Pool } from 'pg'

let pool: Pool | null = null

export function getDatabase() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
  }
  return pool
}

export interface Project {
  id: string
  name: string
  description?: string
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  manager: string
  budget: number
  spent: number
  progress: number
  deadline: string
  created_at: Date
  updated_at: Date
}

export interface Document {
  id: string
  project_id: string
  filename: string
  original_name: string
  file_size: number
  file_type: string
  upload_path: string
  uploaded_at: Date
}

export interface Intelligence {
  id: string
  document_id: string
  analysis_type: string
  insights: any
  recommendations: string[]
  risk_level: 'low' | 'medium' | 'high'
  generated_at: Date
}

// Database initialization functions
export async function createTables() {
  const db = getDatabase()
  
  await db.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'planning',
      manager VARCHAR(255) NOT NULL,
      budget DECIMAL(12, 2) NOT NULL,
      spent DECIMAL(12, 2) DEFAULT 0,
      progress INTEGER DEFAULT 0,
      deadline DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS documents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id UUID REFERENCES projects(id),
      filename VARCHAR(255) NOT NULL,
      original_name VARCHAR(255) NOT NULL,
      file_size INTEGER NOT NULL,
      file_type VARCHAR(100) NOT NULL,
      upload_path VARCHAR(500) NOT NULL,
      uploaded_at TIMESTAMP DEFAULT NOW()
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS intelligence (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      document_id UUID REFERENCES documents(id),
      analysis_type VARCHAR(100) NOT NULL,
      insights JSONB,
      recommendations TEXT[],
      risk_level VARCHAR(50),
      generated_at TIMESTAMP DEFAULT NOW()
    )
  `)
}
