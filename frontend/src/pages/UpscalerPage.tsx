import { useState, useCallback, useRef } from 'react'
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
                    <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                      isDragActive 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-slate-300 hover:border-orange-400 hover:bg-orange-50'
                    }`}>
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
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                    <div className="relative overflow-hidden rounded-lg shadow-md">
                      {uploadedFile.type === 'image' ? (
                        <img 
                          src={uploadedFile.preview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover" 
                        />
                      ) : (
                        <video 
                          src={uploadedFile.preview} 
                          controls 
                          className="w-full h-48 object-cover" 
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-orange-500" />
                Enhancement Settings
              </h2>
              
              <div className="space-y-6">
                {/* Enhancement Type */}
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-4 flex items-center">
                    Enhancement Type
                    <div className="ml-2 relative group">
                      <Info className="w-4 h-4 text-slate-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                        Choose between increasing resolution or improving overall quality
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                      </div>
                    </div>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, enhancementType: 'upscale' }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
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
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
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
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
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
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
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
                  {/* Before/After Slider */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src={uploadedFile.preview}
                          alt="Original"
                          style={{ borderRadius: '0.75rem' }}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={processedFile}
                          alt="Enhanced"
                          style={{ borderRadius: '0.75rem' }}
                        />
                      }
                      style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
                      handle={<div className="custom-slider-handle" />}
                    />
                    {/* Before/After Labels */}
                    <span className="absolute left-4 top-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none">
                      Before
                    </span>
                    <span className="absolute right-4 top-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 select-none">
                      After
                    </span>
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
                  
                  <button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Enhanced Image</span>
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
              {/* Modern Info Section */}
        <section className="max-w-7xl mx-auto w-full mt-20 mb-24 px-4 bg-white shadow-lg rounded-2xl relative z-10" aria-label="AI Image Upscaling Info">
        {/* SEO Meta Description */}
        <meta name="description" content="Upscale your images up to 4x with advanced AI. 100% free, private, and secure. Supports large images, bulk upscaling, and transparent images. No sign-up required." />
        {/* Hero/Intro */}
        <div className="p-10 md:p-14 mb-14 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
              <Sparkles className="w-7 h-7 text-orange-500" />
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">AI Image Upscaling</h1>
          </div>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-2 font-medium">
            Upscale your images up to <b>4x</b> with advanced AI. Private, secure, and free for small-scale use.
          </p>
          <div className="mt-2 text-slate-500 text-sm max-w-xl mx-auto">
            <span>Images up to <b>16MP</b> (max 16,000 × 16,000 px). No sign-up required. Images deleted after processing for your privacy.</span>
          </div>
        </div>

        {/* Features as Icon Cards */}
        <section className="mb-16" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" /> Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-7 shadow border border-slate-100">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mb-3">
                <Sparkles className="w-7 h-7 text-orange-500" />
              </span>
              <h3 className="font-semibold text-slate-900 mb-1 text-lg">Top Quality Results</h3>
              <p className="text-slate-600 text-sm">Best for art, anime, and illustrations (except faces)</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-7 shadow border border-slate-100">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-3">
                <Check className="w-7 h-7 text-green-500" />
              </span>
              <h3 className="font-semibold text-slate-900 mb-1 text-lg">100% Free</h3>
              <p className="text-slate-600 text-sm">No paywall, no sign-up. Daily free quota applies.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-7 shadow border border-slate-100">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-3">
                <Download className="w-7 h-7 text-blue-500" />
              </span>
              <h3 className="font-semibold text-slate-900 mb-1 text-lg">Bulk & Large Images</h3>
              <p className="text-slate-600 text-sm">Supports up to 4096×4096, transparent images, and bulk upscaling.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-7 shadow border border-slate-100">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-3">
                <Monitor className="w-7 h-7 text-purple-500" />
              </span>
              <h3 className="font-semibold text-slate-900 mb-1 text-lg">API & Android</h3>
              <p className="text-slate-600 text-sm">API available (see PyPI), and Android APK download.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-7 shadow border border-slate-100">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-200 mb-3">
                <Image className="w-7 h-7 text-orange-500" />
              </span>
              <h3 className="font-semibold text-slate-900 mb-1 text-lg">AI 4x Upscale</h3>
              <p className="text-slate-600 text-sm">Scale images up to 4x with AI. Improve blurred or pixelated faces.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-2xl p-7 shadow border border-slate-100">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-200 mb-3">
                <Info className="w-7 h-7 text-slate-500" />
              </span>
              <h3 className="font-semibold text-slate-900 mb-1 text-lg">Fast & Friendly</h3>
              <p className="text-slate-600 text-sm">Modern, easy-to-use interface. Results in minutes.</p>
            </div>
          </div>
        </section>

        {/* Steps as Timeline */}
        <section className="mb-16" aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" /> How It Works
          </h2>
          <ol className="flex flex-col md:flex-row items-center justify-between gap-8">
            <li className="flex flex-col items-center flex-1 min-w-[160px]">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">1</div>
              <h3 className="font-semibold mb-1 text-slate-800">Upload</h3>
              <p className="text-slate-600 text-sm text-center">Select an image (max 16MP). For 3x/4x: up to 2MP. For 1x/2x: up to 8MP.</p>
            </li>
            <li className="hidden md:block w-10 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
            <li className="flex flex-col items-center flex-1 min-w-[160px]">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">2</div>
              <h3 className="font-semibold mb-1 text-slate-800">Processing</h3>
              <p className="text-slate-600 text-sm text-center">AI upscaling starts. Large images may take a few minutes. You can return later.</p>
            </li>
            <li className="hidden md:block w-10 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
            <li className="flex flex-col items-center flex-1 min-w-[160px]">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">3</div>
              <h3 className="font-semibold mb-1 text-slate-800">Download</h3>
              <p className="text-slate-600 text-sm text-center">Once ready, download your high-res image. Check back in a few minutes if needed.</p>
            </li>
            <li className="hidden md:block w-10 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
            <li className="flex flex-col items-center flex-1 min-w-[160px]">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-500 mb-2">4</div>
              <h3 className="font-semibold mb-1 text-slate-800">Cleanup</h3>
              <p className="text-slate-600 text-sm text-center">Images are deleted a few hours after processing for your privacy.</p>
            </li>
          </ol>
        </section>

        {/* AI vs. Traditional Scaling */}
        <section className="mb-16" aria-labelledby="ai-vs-traditional-heading">
          <h2 id="ai-vs-traditional-heading" className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" /> AI Upscaling vs. Traditional Scaling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 flex flex-col items-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mb-3">
                <Sparkles className="w-7 h-7 text-orange-500" />
              </span>
              <h3 className="font-bold text-orange-600 mb-2 text-lg">AI Upscaling</h3>
              <ul className="list-disc ml-5 text-slate-700 text-sm text-left">
                <li>Enhanced detail and vibrancy</li>
                <li>Preserves original quality</li>
                <li>Reduces pixelation and blurriness</li>
              </ul>
            </div>
            <div className="bg-white p-8 flex flex-col items-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-200 mb-3">
                <Info className="w-7 h-7 text-slate-500" />
              </span>
              <h3 className="font-bold text-slate-600 mb-2 text-lg">Traditional Scaling</h3>
              <ul className="list-disc ml-5 text-slate-700 text-sm text-left">
                <li>Loss of detail, blurry results</li>
                <li>Can’t add new details</li>
                <li>Limited quality improvement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Safety & Copyright */}
        <section className="p-8 flex flex-col items-center text-center" aria-labelledby="data-safety-heading">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 mb-3">
            <Info className="w-7 h-7 text-slate-500" />
          </span>
          <h2 id="data-safety-heading" className="text-xl font-bold text-slate-800 mb-2">Data Safety & Copyright</h2>
          <ul className="list-disc ml-5 text-slate-700 text-sm text-left max-w-lg mx-auto">
            <li>Your images are private and matched to you with a secure cookie.</li>
            <li>Images are deleted a few hours after processing.</li>
            <li>We never use your images for any purpose except upscaling.</li>
            <li>You retain full copyright over your images.</li>
            <li>Images are stored securely and temporarily on our server.</li>
          </ul>
        </section>
      </section>
    </div>
  )
} 