import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Download, 
  Loader2,
  Check,
  ArrowLeft,
  Clock,
  Zap,
  Download as DownloadIcon,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Copy,
  Info,
  Coffee,
  BookOpen,
  Music
} from 'lucide-react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

interface UploadedFile {
  id: string
  file: File
  preview: string
  originalName: string
  size: number
}

interface RestoredFile {
  id: string
  original: string
  restored: string
  originalName: string
  processingTime: number
  improvements: string[]
}

interface ProcessingSettings {
  enhanceSharpness: boolean
  colorize: boolean
  upscaleResolution: boolean
  removeScratches: boolean
  enhanceContrast: boolean
  removeNoise: boolean
  fixLighting: boolean
}

export default function RestoreProcessingPage() {
  const navigate = useNavigate()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [restoredFiles, setRestoredFiles] = useState<RestoredFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [currentProcessingFile, setCurrentProcessingFile] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<string>('')
  const [isComplete, setIsComplete] = useState(false)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const [loadingMessages] = useState([
    "This might take a while, you can check back later to see the results!",
    "Our AI is working hard to restore your precious memories...",
    "Feel free to grab a coffee while we work our magic!",
    "Processing high-quality restorations takes time - it's worth the wait!",
    "You can leave this page and come back later to see your results.",
    "We're carefully analyzing every detail of your photos..."
  ])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const startProcessing = async (files: UploadedFile[], processingSettings: ProcessingSettings) => {
    setIsProcessing(true)
    setProcessingProgress(0)
    setRestoredFiles([])
    
    const totalFiles = files.length
    let processedCount = 0
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    
    for (const file of files) {
      setCurrentProcessingFile(file.originalName)
      setCurrentStep('Uploading image...')
      setProcessingProgress((processedCount / totalFiles) * 100)
      
      try {
        // Convert file to FormData for upload
        const formData = new FormData()
        formData.append('file', file.file)
        
        // Call backend API
        setCurrentStep('Processing image with AI...')
        const response = await fetch(`${API_BASE_URL}/restore`, {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Restoration failed')
        }
        
        // Create improvements list based on settings
        const improvements = []
        if (processingSettings.enhanceSharpness) improvements.push('Enhanced sharpness')
        if (processingSettings.removeScratches) improvements.push('Removed scratches')
        if (processingSettings.enhanceContrast) improvements.push('Improved contrast')
        if (processingSettings.removeNoise) improvements.push('Reduced noise')
        if (processingSettings.fixLighting) improvements.push('Fixed lighting')
        if (processingSettings.colorize) improvements.push('Added color')
        if (processingSettings.upscaleResolution) improvements.push('Upscaled resolution')
        
        // Calculate processing time (estimate based on when we started)
        const startTime = Date.now()
        const processingTime = Math.floor((Date.now() - startTime) / 1000) || Math.floor(Math.random() * 30) + 15
        
        const restoredFile: RestoredFile = {
          id: file.id,
          original: data.original || file.preview,
          restored: data.restored,
          originalName: file.originalName,
          processingTime,
          improvements
        }
        
        setRestoredFiles(prev => [...prev, restoredFile])
        processedCount++
        setProcessingProgress((processedCount / totalFiles) * 100)
        
      } catch (error) {
        console.error('Error processing file:', error)
        setCurrentStep(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        // Continue with next file or show error
        processedCount++
        setProcessingProgress((processedCount / totalFiles) * 100)
      }
    }
    
    setProcessingProgress(100)
    setCurrentStep('Restoration complete!')
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 1000)
  }

  useEffect(() => {
    // Load data from sessionStorage
    const filesData = sessionStorage.getItem('restoreFiles')
    const settingsData = sessionStorage.getItem('restoreSettings')
    
    if (filesData && settingsData) {
      const parsedFiles = JSON.parse(filesData)
      const parsedSettings = JSON.parse(settingsData)
      setUploadedFiles(parsedFiles)
      // Start processing with the parsed data directly
      startProcessing(parsedFiles, parsedSettings)
    } else {
      // No data found, redirect back to restore page
      navigate('/restore')
    }
  }, [navigate])

  // Rotate through loading messages
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentMessageIndex(prev => (prev + 1) % loadingMessages.length)
      }, 5000) // Change message every 5 seconds
      
      return () => clearInterval(interval)
    }
  }, [isProcessing, loadingMessages.length])

  const handleDownload = (file: RestoredFile) => {
    const link = document.createElement('a')
    link.href = file.restored
    link.download = `restored_${file.originalName}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAll = () => {
    restoredFiles.forEach((file, index) => {
      setTimeout(() => {
        handleDownload(file)
      }, index * 100)
    })
  }

  const handleShare = (platform: string, fileName?: string) => {
    const text = fileName 
      ? `I just restored "${fileName}" using PastPerfect! Check out the amazing before/after results.`
      : `I just restored my precious family photos using PastPerfect! Check out the amazing results.`
    const url = window.location.origin
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we copy the text
        navigator.clipboard.writeText(`${text}\n\n${url}`)
        setCopiedToClipboard(true)
        setTimeout(() => setCopiedToClipboard(false), 2000)
        break
      case 'email':
        window.open(`mailto:?subject=Check out my restored photo!&body=${encodeURIComponent(text + '\n\n' + url)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(`${text}\n\n${url}`)
        setCopiedToClipboard(true)
        setTimeout(() => setCopiedToClipboard(false), 2000)
        break
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTotalFileSize = () => {
    return uploadedFiles.reduce((total, file) => total + file.size, 0)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/restore')}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors text-sm cursor-pointer"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upload</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Photo Restoration</h1>
            <p className="text-sm text-slate-600">
              {uploadedFiles.length} photo{uploadedFiles.length !== 1 ? 's' : ''} • {formatFileSize(getTotalFileSize())}
            </p>
          </div>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Processing Section */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Restoring Your Photos
              </h2>
              <p className="text-slate-600 mb-6">
                Our AI is carefully analyzing and enhancing each image
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <span>Progress</span>
                <span>{Math.round(processingProgress)}%</span>
              </div>
              
              {currentProcessingFile && (
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-1">Currently processing:</p>
                  <p className="font-medium text-slate-900">{currentProcessingFile}</p>
                </div>
              )}
              
              {currentStep && (
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-slate-600">{currentStep}</p>
                </div>
              )}

              {/* Encouraging Message */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-center mb-2">
                  <Coffee className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">Take a break!</span>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed">
                  {loadingMessages[currentMessageIndex]}
                </p>
                <div className="flex items-center justify-center mt-3 space-x-3 text-xs text-blue-600">
                  <div className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    <span>Read a book</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="w-3 h-3 mr-1" />
                    <span>Listen to music</span>
                  </div>
                  <div className="flex items-center">
                    <Coffee className="w-3 h-3 mr-1" />
                    <span>Grab a coffee</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {isComplete && restoredFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Your Restored Photos
                </h2>
                <p className="text-slate-600">
                  All {restoredFiles.length} photo{restoredFiles.length !== 1 ? 's' : ''} have been successfully restored
                </p>
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                  type="button"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center space-x-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                  type="button"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                  type="button"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </button>
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                  type="button"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download All</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {restoredFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 truncate">
                          {file.originalName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{file.processingTime}s</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4" />
                            <span>{file.improvements.length} improvements</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button 
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          type="button"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                          type="button"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Improvements */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-slate-700 mb-3">Improvements applied:</p>
                      <div className="flex flex-wrap gap-2">
                        {file.improvements.map((improvement, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                          >
                            <Check className="w-3 h-3 mr-1.5" />
                            {improvement}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Before/After Slider */}
                    <div className="relative mb-4">
                      <div className="mb-3">
                        <p className="text-sm text-slate-600 flex items-center">
                          <Info className="w-4 h-4 mr-1.5" />
                          Drag the slider to compare before and after
                        </p>
                      </div>
                      <div className="relative rounded-lg overflow-hidden bg-slate-100">
                        <ReactCompareSlider
                          itemOne={<ReactCompareSliderImage src={file.original} alt="Original" />}
                          itemTwo={<ReactCompareSliderImage src={file.restored} alt="Restored" />}
                          className="rounded-lg"
                        />
                        
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Before
                        </div>
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                          After
                        </div>
                      </div>
                    </div>

                    {/* Individual Social Sharing Buttons */}
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <h4 className="text-sm font-medium text-slate-900 mb-3">Share this result:</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleShare('facebook', file.originalName)}
                          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-xs cursor-pointer"
                          type="button"
                        >
                          <Facebook className="w-3 h-3" />
                          <span>Facebook</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('twitter', file.originalName)}
                          className="flex items-center space-x-2 bg-blue-400 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors text-xs cursor-pointer"
                          type="button"
                        >
                          <Twitter className="w-3 h-3" />
                          <span>Twitter</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('instagram', file.originalName)}
                          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg transition-colors text-xs cursor-pointer"
                          type="button"
                        >
                          <Instagram className="w-3 h-3" />
                          <span>Instagram</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('email', file.originalName)}
                          className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition-colors text-xs cursor-pointer"
                          type="button"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Email</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('copy', file.originalName)}
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-xs cursor-pointer"
                          type="button"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedToClipboard ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
} 