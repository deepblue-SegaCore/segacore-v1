
'use client'

import { useState } from 'react'
import { Upload, File, CheckCircle } from 'lucide-react'

interface UploadedFile {
  id: string
  filename: string
  size: number
  uploadedAt: string
}

export default function DocumentUpload() {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setUploadedFiles(prev => [...prev, result.file])
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Upload Construction Documents
        </h3>
        <p className="text-gray-500 mb-4">
          Supported formats: PDF, DOC, DOCX, XLS, XLSX, JSON (Docling processed)
        </p>
        <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.json"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          {uploading ? 'Uploading...' : 'Choose File'}
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-4">Uploaded Documents</h4>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <File className="w-5 h-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{file.filename}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)} • Uploaded {new Date(file.uploadedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
