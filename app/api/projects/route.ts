
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock project data
    const projects = [
      {
        id: '1',
        name: 'Downtown Office Complex',
        status: 'In Progress',
        progress: 65,
        manager: 'John Smith',
        budget: 2500000,
        spent: 1625000,
        deadline: '2024-06-30'
      },
      {
        id: '2',
        name: 'Residential Tower East',
        status: 'Planning',
        progress: 15,
        manager: 'Sarah Johnson',
        budget: 4200000,
        spent: 630000,
        deadline: '2024-12-15'
      },
      {
        id: '3',
        name: 'Shopping Center Renovation',
        status: 'Completed',
        progress: 100,
        manager: 'Mike Wilson',
        budget: 1800000,
        spent: 1750000,
        deadline: '2024-01-30'
      }
    ]

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    
    // Mock creating a new project
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      status: 'Planning'
    }

    return NextResponse.json({
      message: 'Project created successfully',
      project: newProject
    })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
