import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Settings, 
  Download, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Image,
  Video,
  File,
  X,
  Loader2
} from 'lucide-react'
import { cn } from '../lib/utils'

interface UploadedFile {
  file: File
  preview: string
  type: 'image' | 'video'
}

interface ProcessingSettings {
  upscaleFactor: number
  style: string
  mode: string
  enhancementType: 'upscale' | 'restore' | 'both'
  // Advanced settings
  photoType?: string
  denoiseLevel?: number
  textureRichness?: number
  textPrompt?: string
}

const styles = ['Photorealistic', 'Anime', 'Old Film', 'Auto']
const modes = ['Balance', 'Fidelity', 'Sharpness']
const enhancementTypes = ['Upscale', 'Restore', 'Both']

export default function UpscalerPage() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [settings, setSettings] = useState<ProcessingSettings>({
    upscaleFactor: 2,
    style: styles[0],
    mode: modes[0],
    enhancementType: 'both'
  })
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState<string | null>(null)
  const [advanced, setAdvanced] = useState({ photoType: '', denoise: 0, texture: 0, prompt: '' })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'video'
      const preview = URL.createObjectURL(file)
      setUploadedFile({ file, preview, type })
      setProcessedFile(null) // Reset processed file when new file is uploaded
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.bmp'],
      'video/*': ['.mp4', '.avi', '.mov', '.mkv']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB
  })

  const handleProcess = async () => {
    if (!uploadedFile) return
    
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // For demo purposes, we'll just use the original file as "processed"
    // In a real app, this would be the actual processed file from your API
    setProcessedFile(uploadedFile.preview)
    setIsProcessing(false)
  }

  const handleDownload = () => {
    if (!processedFile) return
    
    const link = document.createElement('a')
    link.href = processedFile
    link.download = `enhanced-${uploadedFile?.file.name || 'file'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const removeFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview)
      setUploadedFile(null)
      setProcessedFile(null)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">AI Image & Video Upscaler</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
        {/* Upload */}
        <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-500 hover:bg-orange-50'}`}>
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-slate-900 mb-2">{isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}</p>
          <p className="text-slate-500 mb-4">or click to browse</p>
          <div className="flex justify-center space-x-4 text-sm text-slate-500">
            <span>Images & Videos</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Max 100MB • JPG, PNG, MP4, AVI supported</p>
        </div>
        {uploadedFile && (
          <div className="mt-6 flex flex-col items-center">
            {uploadedFile.type === 'image' ? (
              <img src={uploadedFile.preview} alt="Preview" className="w-full max-w-xs h-56 object-cover rounded-lg shadow mb-2" />
            ) : (
              <video src={uploadedFile.preview} controls className="w-full max-w-xs h-56 object-cover rounded-lg shadow mb-2" />
            )}
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <File size={16} />
              <span>{uploadedFile.file.name}</span>
              <span className="text-slate-400">({(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB)</span>
            </div>
          </div>
        )}
        {/* Settings */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Upscale Factor</label>
            <input type="range" min={1} max={4} step={1} value={settings.upscaleFactor} onChange={(e) => setSettings(prev => ({ ...prev, upscaleFactor: Number(e.target.value) }))} className="w-full accent-orange-500" />
            <div className="text-sm text-slate-500 mt-1">{settings.upscaleFactor}x</div>
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Style</label>
            <select value={settings.style} onChange={(e) => setSettings(prev => ({ ...prev, style: e.target.value }))} className="w-full rounded-md border border-slate-200 p-2 focus:ring-2 focus:ring-orange-400">
              {styles.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Mode</label>
            <select value={settings.mode} onChange={(e) => setSettings(prev => ({ ...prev, mode: e.target.value }))} className="w-full rounded-md border border-slate-200 p-2 focus:ring-2 focus:ring-orange-400">
              {modes.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Enhancement</label>
            <select value={settings.enhancementType} onChange={(e) => setSettings(prev => ({ ...prev, enhancementType: e.target.value as any }))} className="w-full rounded-md border border-slate-200 p-2 focus:ring-2 focus:ring-orange-400">
              {enhancementTypes.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>
        {/* Advanced Settings */}
        <button type="button" onClick={() => setShowAdvanced(v => !v)} className="mt-6 flex items-center text-orange-500 font-semibold hover:underline">
          {showAdvanced ? <ChevronUp className="w-5 h-5 mr-1" /> : <ChevronDown className="w-5 h-5 mr-1" />} Advanced Settings
        </button>
        {showAdvanced && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Photo Type</label>
              <input type="text" value={advanced.photoType} onChange={(e) => setAdvanced(a => ({ ...a, photoType: e.target.value }))} className="w-full rounded-md border border-slate-200 p-2" placeholder="e.g. Portrait, Landscape" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Denoise Level</label>
              <input type="number" min={0} max={100} value={advanced.denoise} onChange={(e) => setAdvanced(a => ({ ...a, denoise: Number(e.target.value) }))} className="w-full rounded-md border border-slate-200 p-2" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Texture Richness</label>
              <input type="number" min={0} max={100} value={advanced.texture} onChange={(e) => setAdvanced(a => ({ ...a, texture: Number(e.target.value) }))} className="w-full rounded-md border border-slate-200 p-2" />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Text Prompt (optional)</label>
              <input type="text" value={advanced.prompt} onChange={(e) => setAdvanced(a => ({ ...a, prompt: e.target.value }))} className="w-full rounded-md border border-slate-200 p-2" placeholder="Describe your desired result..." />
            </div>
          </motion.div>
        )}
        {/* Process Button */}
        <button onClick={handleProcess} disabled={!uploadedFile || isProcessing} className="mt-8 w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
          {isProcessing ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
          {isProcessing ? 'Processing...' : 'Enhance Now'}
        </button>
      </div>
      {/* Result */}
      {processedFile && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-white rounded-2xl shadow-lg p-8 mt-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Result</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex-1">
              <h3 className="text-slate-700 font-semibold mb-2 text-center">Original</h3>
              {uploadedFile?.type === 'image' ? (
                <img src={uploadedFile.preview} alt="Original" className="w-full max-w-xs h-56 object-cover rounded-lg shadow mx-auto" />
              ) : (
                <video src={uploadedFile.preview} controls className="w-full max-w-xs h-56 object-cover rounded-lg shadow mx-auto" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-slate-700 font-semibold mb-2 text-center">Enhanced</h3>
              {uploadedFile?.type === 'image' ? (
                <img src={processedFile} alt="Enhanced" className="w-full max-w-xs h-56 object-cover rounded-lg shadow mx-auto" />
              ) : (
                <video src={processedFile} controls className="w-full max-w-xs h-56 object-cover rounded-lg shadow mx-auto" />
              )}
              <button onClick={handleDownload} className="mt-4 w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform">Download</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
} 