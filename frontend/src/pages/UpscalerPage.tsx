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

export default function UpscalerPage() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [settings, setSettings] = useState<ProcessingSettings>({
    upscaleFactor: 2,
    style: 'Photorealistic',
    mode: 'Balance',
    enhancementType: 'both'
  })
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState<string | null>(null)

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">
          AI Media Enhancement
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Upload your image or video and let our AI models enhance it with advanced upscaling and restoration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-slate-100 mb-6">Upload Media</h2>
            
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                  isDragActive 
                    ? "border-orange-500 bg-orange-900/20" 
                    : "border-slate-600 hover:border-orange-500 hover:bg-slate-700/50"
                )}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-200 mb-2">
                  {isDragActive ? "Drop your file here" : "Drag & drop your file here"}
                </p>
                <p className="text-slate-400 mb-4">
                  or click to browse
                </p>
                <div className="flex justify-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Image size={16} />
                    <span>Images</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video size={16} />
                    <span>Videos</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Max 100MB • JPG, PNG, MP4, AVI supported
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  {uploadedFile.type === 'image' ? (
                    <img 
                      src={uploadedFile.preview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <video 
                      src={uploadedFile.preview} 
                      controls 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <button
                    onClick={removeFile}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <File size={16} />
                  <span>{uploadedFile.file.name}</span>
                  <span className="text-slate-400">
                    ({(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-100">Enhancement Settings</h2>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Settings size={16} />
                <span className="text-sm font-medium">Advanced</span>
                {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            <div className="space-y-6">
              {/* Upscale Factor */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Upscale Factor: {settings.upscaleFactor}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={settings.upscaleFactor}
                  onChange={(e) => setSettings(prev => ({ ...prev, upscaleFactor: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1x</span>
                  <span>2x</span>
                  <span>3x</span>
                  <span>4x</span>
                </div>
              </div>

              {/* Style Preference */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Style Preference
                </label>
                <select
                  value={settings.style}
                  onChange={(e) => setSettings(prev => ({ ...prev, style: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-200"
                >
                  <option value="Photorealistic">Photorealistic</option>
                  <option value="Anime">Anime</option>
                  <option value="Old Film">Old Film</option>
                  <option value="Auto">Auto</option>
                </select>
              </div>

              {/* Mode */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Enhancement Mode
                </label>
                <select
                  value={settings.mode}
                  onChange={(e) => setSettings(prev => ({ ...prev, mode: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-200"
                >
                  <option value="Balance">Balance</option>
                  <option value="Fidelity">Fidelity</option>
                  <option value="Sharpness">Sharpness</option>
                </select>
              </div>

              {/* Enhancement Type */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Enhancement Type
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'upscale', label: 'Upscaling Only' },
                    { value: 'restore', label: 'Restoration Only' },
                    { value: 'both', label: 'Both (Recommended)' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        checked={settings.enhancementType === option.value}
                        onChange={(e) => setSettings(prev => ({ ...prev, enhancementType: e.target.value as any }))}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-slate-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Advanced Settings */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 pt-4 border-t border-slate-600"
                  >
                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Photo Type
                      </label>
                      <select
                        value={settings.photoType || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, photoType: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-200"
                      >
                        <option value="">Auto Detect</option>
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                        <option value="document">Document</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Denoise Level: {settings.denoiseLevel || 0}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={settings.denoiseLevel || 0}
                        onChange={(e) => setSettings(prev => ({ ...prev, denoiseLevel: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Texture Richness: {settings.textureRichness || 5}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={settings.textureRichness || 5}
                        onChange={(e) => setSettings(prev => ({ ...prev, textureRichness: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-200 mb-2">
                        Text Prompt (Optional)
                      </label>
                      <textarea
                        value={settings.textPrompt || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, textPrompt: e.target.value }))}
                        placeholder="Describe the desired enhancement style..."
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-200"
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleProcess}
              disabled={!uploadedFile || isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Enhance Media</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-slate-100 mb-6">Results</h2>
            
            {!uploadedFile ? (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  Upload a file to see the enhanced result
                </p>
              </div>
            ) : isProcessing ? (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
                <p className="text-slate-200 font-medium mb-2">Processing your media...</p>
                <p className="text-sm text-slate-400">
                  This may take a few minutes depending on file size
                </p>
              </div>
            ) : processedFile ? (
              <div className="space-y-4">
                <div className="relative">
                  {uploadedFile.type === 'image' ? (
                    <img 
                      src={processedFile} 
                      alt="Enhanced" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <video 
                      src={processedFile} 
                      controls 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-300">
                    <p className="font-medium">Enhanced successfully!</p>
                    <p>Upscaled to {settings.upscaleFactor}x • {settings.style} style</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  Click "Enhance Media" to process your file
                </p>
              </div>
            )}
          </div>

          {/* Processing Info */}
          {uploadedFile && (
            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <h3 className="font-semibold text-slate-100 mb-3">Processing Information</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>File Type:</span>
                  <span className="font-medium">{uploadedFile.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="font-medium">{(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Upscale Factor:</span>
                  <span className="font-medium">{settings.upscaleFactor}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="font-medium">{settings.style}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mode:</span>
                  <span className="font-medium">{settings.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Enhancement:</span>
                  <span className="font-medium capitalize">{settings.enhancementType}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 