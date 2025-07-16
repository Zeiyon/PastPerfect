import { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Download, 
  Sparkles, 
  Image,
  File,
  X,
  Loader2,
  Check,
  Settings,
  Info,
  Monitor
} from 'lucide-react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

interface UploadedFile {
  file: File
  preview: string
  type: 'image' | 'video'
}

interface ProcessingSettings {
  enhancementType: 'upscale' | 'enhance'
  upscaleFactor: number
  faceEnhancement: boolean
}

export default function UpscalerPage() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [settings, setSettings] = useState<ProcessingSettings>({
    enhancementType: 'upscale',
    upscaleFactor: 2,
    faceEnhancement: false
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState<string | null>(null)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Close lightbox on ESC
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    // Prevent background scroll
    document.body.classList.add('overflow-hidden')
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overflow-hidden')
    }
  }, [isLightboxOpen])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'video'
      const preview = URL.createObjectURL(file)
      setUploadedFile({ file, preview, type })
      setProcessedFile(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.bmp'],
      'video/*': ['.mp4', '.avi', '.mov', '.mkv']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024
  })

  const handleProcess = async () => {
    if (!uploadedFile) return
    
    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 200)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setProcessingProgress(100)
    setTimeout(() => {
      setProcessedFile(uploadedFile.preview)
      setIsProcessing(false)
      setProcessingProgress(0)
    }, 500)
  }

  const handleDownload = () => {
    if (!processedFile || !uploadedFile) return;
    
    const link = document.createElement('a');
    link.href = processedFile;
    link.download = `enhanced-${uploadedFile.file.name || 'file'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const removeFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview)
      setUploadedFile(null)
      setProcessedFile(null)
    }
  }

  const getUpscaleOptions = () => {
    return settings.enhancementType === 'upscale' ? [2, 3, 4] : [1, 2]
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getEnhancedFileSize = () => {
    if (!uploadedFile) return null
    const originalSize = uploadedFile.file.size
    const factor = settings.upscaleFactor
    // Rough estimate: file size increases by factor^2 for images
    return Math.round(originalSize * factor * factor)
  }

  const getResolutionInfo = () => {
    if (!uploadedFile) return null
    // Mock resolution - in real app you'd get actual image dimensions
    const baseWidth = 1920
    const baseHeight = 1080
    const factor = settings.upscaleFactor
    return {
      original: `${baseWidth} × ${baseHeight}`,
      enhanced: `${baseWidth * factor} × ${baseHeight * factor}`
    }
  }

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return
      
      const rect = sliderRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }
    
    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="relative min-h-screen bg-white pt-20">
      {/* Animated Hue Background */}
      <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">AI Image Enhancement</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your photos with professional-grade AI enhancement technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Upload and Settings */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Upload Area */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-orange-500" />
                Upload Your Image
              </h2>
              
              <AnimatePresence mode="wait">
                {!uploadedFile ? (
                  <motion.div
                    key="upload-area"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col justify-center items-center`
                        + (isDragActive
                          ? ' border-orange-500 bg-orange-50'
                          : ' border-slate-300 hover:border-orange-400 hover:bg-orange-50')}
                      style={{ minHeight: 260, height: 260 }}
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-slate-700 mb-2">
                        {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
                      </p>
                      <p className="text-slate-500 mb-4">or click to browse files</p>
                      <div className="flex justify-center space-x-4 text-sm text-slate-500">
                        <span>JPG, PNG, WEBP</span>
                        <span>•</span>
                        <span>Max 100MB</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <File className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="text-slate-800 font-medium">{uploadedFile.file.name}</span>
                          <div className="text-slate-500 text-sm">{formatFileSize(uploadedFile.file.size)}</div>
                        </div>
                      </div>
                      <button
                        onClick={removeFile}
                        className="cursor-pointer p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                   <div
                     className="relative overflow-hidden rounded-lg shadow-md flex items-center justify-center"
                     style={{ minHeight: 260, height: 260 }}
                   >
                     {uploadedFile.type === 'image' ? (
                       <img
                         src={uploadedFile.preview}
                         alt="Preview"
                         className="max-h-full max-w-full object-contain"
                         style={{ height: '100%', width: '100%' }}
                       />
                     ) : (
                       <video
                         src={uploadedFile.preview}
                         controls
                         className="max-h-full max-w-full object-contain"
                         style={{ height: '100%', width: '100%' }}
                       />
                     )}
                   </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center relative group">
                <Settings className="w-5 h-5 mr-2 text-orange-500" />
                Enhancement Settings
                <span className="ml-2 relative group">
                  <Info className="w-4 h-4 text-slate-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                    Choose between increasing resolution or improving overall quality
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                  </div>
                </span>
              </h2>
              
              <div className="space-y-6">
                {/* Enhancement Type */}
                <div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, enhancementType: 'upscale' }))}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                        settings.enhancementType === 'upscale'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-center">
                        <Sparkles className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-medium">Upscale</div>
                        <div className="text-sm text-slate-500">Increase resolution</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, enhancementType: 'enhance' }))}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                        settings.enhancementType === 'enhance'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-center">
                        <Image className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-medium">Enhance</div>
                        <div className="text-sm text-slate-500">Improve quality</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Upscale Factor and Face Enhancement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Upscale Factor */}
                  <div>
                    <label className="block text-base font-medium text-slate-700 mb-4 flex items-center">
                      Upscale Factor: <span className="text-orange-600 font-semibold ml-1">{settings.upscaleFactor}x</span>
                      <div className="ml-2 relative group">
                        <Info className="w-4 h-4 text-slate-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                          Higher factors create larger files and take longer to process
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                        </div>
                      </div>
                    </label>
                    <div className="flex space-x-3">
                      {getUpscaleOptions().map((factor) => (
                        <button
                          key={factor}
                          onClick={() => setSettings(prev => ({ ...prev, upscaleFactor: factor }))}
                          className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            settings.upscaleFactor === factor
                              ? 'bg-orange-500 text-white shadow-md'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {factor}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Face Enhancement */}
                  <div>
                    <label className="block text-base font-medium text-slate-700 mb-4 flex items-center">
                      Face Enhancement
                      <div className="ml-2 relative group">
                        <Info className="w-4 h-4 text-slate-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                          Automatically detects and improves facial features
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.faceEnhancement}
                          onChange={(e) => setSettings(prev => ({ ...prev, faceEnhancement: e.target.checked }))}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          settings.faceEnhancement
                            ? 'bg-orange-500 border-orange-500'
                            : 'border-slate-300'
                        }`}>
                          {settings.faceEnhancement && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Improve facial details</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Process Button */}
                <button
                  onClick={handleProcess}
                  disabled={!uploadedFile || isProcessing}
                  className="cursor-pointer w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing... {processingProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Enhance Image</span>
                    </>
                  )}
                </button>

                {/* Progress Bar */}
                {isProcessing && (
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Results */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
              Enhanced Result
            </h2>
            
            <AnimatePresence mode="wait">
              {processedFile && uploadedFile ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Enhanced Image Large Display */}
                  <div className="relative w-full max-h-[410px] h-auto rounded-lg overflow-hidden shadow-md flex items-center justify-center">
                    <img
                      src={processedFile}
                      alt="Enhanced"
                      className="w-full h-auto object-contain rounded-lg select-none cursor-zoom-in"
                      style={{ maxHeight: '410px', maxWidth: '100%' }}
                      onClick={() => setIsLightboxOpen(true)}
                    />
                    {/* Lightbox Modal (Portal) */}
                    {isLightboxOpen && typeof window !== 'undefined' && createPortal(
                      <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
                        onClick={() => setIsLightboxOpen(false)}
                        style={{ cursor: 'zoom-out' }}
                      >
                        <button
                          onClick={() => setIsLightboxOpen(false)}
                          className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition z-[10000]"
                          style={{ cursor: 'pointer' }}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                        <img
                          src={processedFile}
                          alt="Enhanced Fullscreen"
                          className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl border-4 border-white"
                          style={{ margin: 32, background: 'white', cursor: 'auto' }}
                          onClick={e => e.stopPropagation()}
                        />
                      </div>,
                      document.body
                    )}
                  </div>

                  {/* File Information */}
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Resolution</span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {getResolutionInfo()?.original} → {getResolutionInfo()?.enhanced}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">File Size</span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {formatFileSize(uploadedFile.file.size)} → ~{formatFileSize(getEnhancedFileSize() || 0)}
                      </div>
                    </div>
                  </div>
                  {/* Modern Download Button */}
                  <button
                    onClick={handleDownload}
                    className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm border border-green-700/10 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <Download className="w-5 h-5" />
                    Download Enhanced Image
                  </button>
                  {/* Modern Social Buttons */}
                  <div className="flex flex-wrap gap-2 w-full justify-center items-center mt-2">
                    {/* X (Twitter) */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20AI-enhanced%20photo%20from%20PastPerfect!&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-[#1da1f2] hover:bg-[#1877c9] text-white rounded-lg font-medium transition-all duration-200 gap-2 shadow-sm"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.6 1.67 4.905a4.48 4.48 0 0 0-.607 2.26c0 1.56.795 2.94 2.01 3.75a4.48 4.48 0 0 1-2.034-.563v.057c0 2.18 1.55 4 3.6 4.42-.377.104-.775.16-1.185.16-.29 0-.57-.028-.845-.08.57 1.78 2.23 3.08 4.2 3.12A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.697z"/></svg>
                      X
                    </a>
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white rounded-lg font-medium transition-all duration-200 gap-2 shadow-sm"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                      Instagram
                    </a>
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg font-medium transition-all duration-200 gap-2 shadow-sm"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                      Facebook
                    </a>
                    {/* Copy Link */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href)
                      }}
                      className="cursor-pointer flex items-center px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-all duration-200 gap-2 shadow-sm"
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7-7l1-1"/><path d="M14 11a5 5 0 0 0-7-7l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
                      Copy Link
                    </button>
                  </div>
                  <button
                    onClick={removeFile}
                    className="cursor-pointer w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl font-semibold text-base border border-slate-300 transition-all duration-200"
                  >
                    Enhance another image
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-80"
                >
                  <div className="text-center text-slate-400">
                    <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No Result Yet</p>
                    <p className="text-slate-500">Upload an image and enhance it to see the result here</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>




        <section className="max-w-7xl mx-auto w-full mt-20 mb-24 px-4 relative z-10 space-y-24">

  {/* Why our AI is unique */}
  <div className="text-center max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-slate-900 mb-4 flex justify-center items-center gap-2">
      <Sparkles className="w-6 h-6 text-orange-500" />
      Why Our AI Stands Out
    </h2>
    <p className="text-lg text-slate-600">
      Unlike typical upscalers trained on art or anime, our models are fine-tuned on thousands of real-world photo pairs — DSLR vs old phone captures — so your memories look sharp and authentic, not artificially smoothed.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8 text-center">
    <div className="flex flex-col items-center bg-white rounded-2xl shadow border border-slate-100 p-8">
      <Sparkles className="w-8 h-8 mb-4 text-orange-500" />
      <h3 className="font-semibold text-slate-800 mb-2 text-lg">Custom Fine-Tuning</h3>
      <p className="text-slate-600 text-sm">
        Built on Real-ESRGAN, specially trained to enhance old mobile photos so they look DSLR-quality.
      </p>
    </div>
    <div className="flex flex-col items-center bg-white rounded-2xl shadow border border-slate-100 p-8">
      <Monitor className="w-8 h-8 mb-4 text-blue-500" />
      <h3 className="font-semibold text-slate-800 mb-2 text-lg">Intelligent Restoration</h3>
      <p className="text-slate-600 text-sm">
        Reconstructs edges, textures and lost details — far beyond simple pixel scaling.
      </p>
    </div>
    <div className="flex flex-col items-center bg-white rounded-2xl shadow border border-slate-100 p-8">
      <Check className="w-8 h-8 mb-4 text-green-500" />
      <h3 className="font-semibold text-slate-800 mb-2 text-lg">Private & Secure</h3>
      <p className="text-slate-600 text-sm">
        Processed images auto-delete after processing. You keep full copyright.
      </p>
    </div>
  </div>

  {/* Example transformations */}
  <div className="text-center max-w-4xl mx-auto space-y-8">
    <h2 className="text-3xl font-bold text-slate-900 mb-4 flex justify-center items-center gap-2">
      <Sparkles className="w-6 h-6 text-orange-500" />
      Example Transformations
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className="relative group">
          <img src={`/examples/before-${i}.jpg`} alt="Before example" className="rounded-xl shadow group-hover:opacity-0 transition duration-300" />
          <img src={`/examples/after-${i}.jpg`} alt="After example" className="rounded-xl shadow absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300" />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs rounded px-2 py-1 pointer-events-none">Hover to see result</div>
        </div>
      ))}
    </div>
    <p className="text-sm text-slate-500">Hover over any photo to see how our AI restores it to DSLR-like clarity.</p>
  </div>

  {/* How it works */}
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-slate-900 mb-6 flex justify-center items-center gap-2">
      <Sparkles className="w-6 h-6 text-orange-500" />
      How It Works
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">1</div>
        <h4 className="font-semibold mb-1 text-slate-800">Upload</h4>
        <p className="text-slate-600 text-sm">Pick your old phone photo (JPG, PNG, WEBP).</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">2</div>
        <h4 className="font-semibold mb-1 text-slate-800">Adjust</h4>
        <p className="text-slate-600 text-sm">Choose upscale level & enable face enhancement if needed.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">3</div>
        <h4 className="font-semibold mb-1 text-slate-800">Process</h4>
        <p className="text-slate-600 text-sm">Our AI rebuilds textures and details in seconds.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">4</div>
        <h4 className="font-semibold mb-1 text-slate-800">Download</h4>
        <p className="text-slate-600 text-sm">Save your enhanced high-res image securely.</p>
      </div>
    </div>
  </div>

  {/* Mini FAQ */}
  <div className="max-w-3xl mx-auto space-y-8 text-center">
    <h2 className="text-3xl font-bold text-slate-900 mb-4 flex justify-center items-center gap-2">
      <Sparkles className="w-6 h-6 text-orange-500" />
      FAQs
    </h2>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-slate-800">Is this really free?</h4>
        <p className="text-slate-600 text-sm">Yes — you can upscale photos for free up to your daily quota. No signup needed.</p>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">Will my images be stored?</h4>
        <p className="text-slate-600 text-sm">Images are processed, matched securely to your session, and auto-deleted shortly after.</p>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">What’s different about your AI?</h4>
        <p className="text-slate-600 text-sm">We’ve fine-tuned Real-ESRGAN on DSLR vs old phone photos specifically — most tools use models trained on art or anime.</p>
      </div>
    </div>
  </div>

  {/* Privacy trust */}
  <div className="text-center max-w-3xl mx-auto mt-12">
    <p className="text-slate-500 text-sm">
      Your privacy matters. We process your images securely, never train on your data, and automatically delete everything after you’re done. You remain the full copyright holder, always.
    </p>
  </div>
</section>
  </div>
  )
} 