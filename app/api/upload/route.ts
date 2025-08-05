
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Save file
    const filename = `${Date.now()}-${file.name}`
    const path = join(uploadDir, filename)
    await writeFile(path, buffer)

    // Detect if it's a JSON file and check for Docling processing
    let fileType = file.type
    let isDoclingProcessed = false
    
    if (file.name.endsWith('.json')) {
      fileType = 'application/json'
      try {
        const content = buffer.toString('utf-8')
        const jsonData = JSON.parse(content)
        isDoclingProcessed = !!(jsonData.docling_processed || jsonData.document_content || jsonData.extracted_text)
      } catch (e) {
        // Not valid JSON
      }
    }

    // Here you would typically save file info to database
    const fileData = {
      id: Date.now().toString(),
      filename: file.name,
      size: file.size,
      type: fileType,
      uploadedAt: new Date().toISOString(),
      path: `/uploads/${filename}`,
      isDoclingProcessed
    }

    return NextResponse.json({
      message: 'File uploaded successfully',
      file: fileData
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
