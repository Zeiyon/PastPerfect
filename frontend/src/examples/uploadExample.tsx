// Example React component showing how to upload an image to the backend
// This is a minimal example - integrate this pattern into your existing RestorePage

import { useState } from 'react'

export function ImageUploadExample() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile) // Key name must match backend parameter

      const response = await fetch('http://127.0.0.1:8000/restore', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log('Upload response:', data)
      setResult(data)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {result && (
        <div>
          <p>Success: {result.success ? 'Yes' : 'No'}</p>
          {result.saved_file && <p>Saved as: {result.saved_file}</p>}
        </div>
      )}
    </div>
  )
}

