import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Upload, 
  X, 
  Settings, 
  Sparkles, 
  Zap, 
  Star, 
  Users, 
  Award,
  HelpCircle,
  Clock,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Info,
  Image,
  File
} from 'lucide-react'

interface UploadedFile {
  id: string
  file: File
  preview: string
  originalName: string
  size: number
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

export default function RestorePage() {
  const navigate = useNavigate()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [settings, setSettings] = useState<ProcessingSettings>({
    enhanceSharpness: true,
    colorize: false,
    upscaleResolution: false,
    removeScratches: true,
    enhanceContrast: true,
    removeNoise: true,
    fixLighting: false
  })
  const [userRestorationsLeft] = useState(3)
  const [totalRestorations] = useState(5)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff']
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        originalName: file.name,
        size: file.size
      }))
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  })

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const handleProcess = () => {
    // Store data in sessionStorage for the processing page
    sessionStorage.setItem('restoreFiles', JSON.stringify(uploadedFiles))
    sessionStorage.setItem('restoreSettings', JSON.stringify(settings))
    navigate('/restore/processing')
  }

  const getEstimatedTime = () => {
    const baseTime = 30 // seconds per image
    return Math.ceil((uploadedFiles.length * baseTime) / 60)
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

  const hasEnoughCredits = uploadedFiles.length <= userRestorationsLeft

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-white via-slate-50 to-transparent">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >

          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 text-center leading-tight tracking-tight drop-shadow-lg">
            Restore Your Precious Photos
          </h1>
          <p className="text-xl md:text-xl text-slate-700 mb-8 max-w-3xl text-center font-medium mx-auto">
            Upload your photos and watch the magic happen.
          </p>
        </motion.div>

        {/* Restoration Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-7 shadow-lg border border-slate-200 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-900">Restoration Credits</h3>
            <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {userRestorationsLeft} of {totalRestorations} Remaining
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${((totalRestorations-userRestorationsLeft)/totalRestorations) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Free tier</span>
            <button
              onClick={() => navigate('/pricing')}
              className="text-orange-600 font-medium hover:text-orange-700 cursor-pointer transition-colors focus:outline-none focus:underline"
              type="button"
            >
              Upgrade for unlimited
            </button>
          </div>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-7 shadow-lg border border-slate-200 mb-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-orange-500 bg-orange-50 shadow-lg' 
                : 'border-slate-300 hover:border-orange-400 hover:bg-slate-50 hover:shadow-md'
            }`}
          >
            <input {...getInputProps()} />
            <div className="mb-6">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
                isDragActive ? 'bg-orange-100' : 'bg-slate-100'
              }`}>
                <Upload className={`w-8 h-8 ${isDragActive ? 'text-orange-600' : 'text-slate-500'}`} />
              </div>
            </div>
            <p className="text-xl font-medium text-slate-900 mb-3">
              {isDragActive ? 'Drop your photos here' : 'Drag & drop photos here'}
            </p>
            <p className="text-slate-600 mb-6">
              or click to browse files
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <span>JPEG, PNG</span>
              <span>•</span>
              <span>Up to 10MB each</span>
              <span>•</span>
              <span>Max 10 photos</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center mt-6 text-sm text-slate-500">
            <Lock className="w-4 h-4 mr-2" />
            <span>Your photos are encrypted and automatically deleted after 24 hours</span>
          </div>
        </motion.div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-7 shadow-lg border border-slate-200 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Uploaded Photos ({uploadedFiles.length})
              </h3>
              <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                Total: {formatFileSize(getTotalFileSize())}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={file.preview} 
                      alt={file.originalName}
                      className="w-14 h-14 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{file.originalName}</p>
                      <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Restoration Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-7 shadow-lg border border-slate-200 mb-8"
        >
          <div className="flex items-center mb-6">
            <Settings className="w-6 h-6 mr-3 text-orange-500" />
            <h3 className="text-xl font-semibold text-slate-900">Restoration Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <Sparkles className="w-6 h-6 text-orange-500 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Enhance Sharpness</p>
                  <p className="text-sm text-slate-600">Improve image clarity and detail</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, enhanceSharpness: !prev.enhanceSharpness }))}
                className={`relative flex items-center h-7 w-12 rounded-full transition-colors duration-200 p-1 ${
                  settings.enhanceSharpness ? 'bg-orange-500 shadow-md' : 'bg-slate-300'
                }`}
                type="button"
              >
                <span
                  className="absolute top-1/2 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    transform: settings.enhanceSharpness ? 'translateX(20px) translateY(-50%)' : 'translateX(0) translateY(-50%)'
                  }}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <Image className="w-6 h-6 text-orange-500 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Colorize</p>
                  <p className="text-sm text-slate-600">Add color to black & white photos</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, colorize: !prev.colorize }))}
                className={`relative flex items-center h-7 w-12 rounded-full transition-colors duration-200 p-1 ${
                  settings.colorize ? 'bg-orange-500 shadow-md' : 'bg-slate-300'
                }`}
                type="button"
              >
                <span
                  className="absolute top-1/2 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    transform: settings.colorize ? 'translateX(20px) translateY(-50%)' : 'translateX(0) translateY(-50%)'
                  }}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <File className="w-6 h-6 text-orange-500 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Upscale Resolution</p>
                  <p className="text-sm text-slate-600">Increase image resolution by 2x</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, upscaleResolution: !prev.upscaleResolution }))}
                className={`relative flex items-center h-7 w-12 rounded-full transition-colors duration-200 p-1 ${
                  settings.upscaleResolution ? 'bg-orange-500 shadow-md' : 'bg-slate-300'
                }`}
                type="button"
              >
                <span
                  className="absolute top-1/2 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    transform: settings.upscaleResolution ? 'translateX(20px) translateY(-50%)' : 'translateX(0) translateY(-50%)'
                  }}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-orange-500 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Remove Scratches</p>
                  <p className="text-sm text-slate-600">Clean up surface damage</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, removeScratches: !prev.removeScratches }))}
                className={`relative flex items-center h-7 w-12 rounded-full transition-colors duration-200 p-1 ${
                  settings.removeScratches ? 'bg-orange-500 shadow-md' : 'bg-slate-300'
                }`}
                type="button"
              >
                <span
                  className="absolute top-1/2 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    transform: settings.removeScratches ? 'translateX(20px) translateY(-50%)' : 'translateX(0) translateY(-50%)'
                  }}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <Zap className="w-6 h-6 text-orange-500 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Enhance Contrast</p>
                  <p className="text-sm text-slate-600">Improve brightness and contrast</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, enhanceContrast: !prev.enhanceContrast }))}
                className={`relative flex items-center h-7 w-12 rounded-full transition-colors duration-200 p-1 ${
                  settings.enhanceContrast ? 'bg-orange-500 shadow-md' : 'bg-slate-300'
                }`}
                type="button"
              >
                <span
                  className="absolute top-1/2 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    transform: settings.enhanceContrast ? 'translateX(20px) translateY(-50%)' : 'translateX(0) translateY(-50%)'
                  }}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <Sparkles className="w-6 h-6 text-orange-500 mr-4" />
                <div>
                  <p className="font-medium text-slate-900">Remove Noise</p>
                  <p className="text-sm text-slate-600">Reduce grain and digital noise</p>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, removeNoise: !prev.removeNoise }))}
                className={`relative flex items-center h-7 w-12 rounded-full transition-colors duration-200 p-1 ${
                  settings.removeNoise ? 'bg-orange-500 shadow-md' : 'bg-slate-300'
                }`}
                type="button"
              >
                <span
                  className="absolute top-1/2 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    transform: settings.removeNoise ? 'translateX(20px) translateY(-50%)' : 'translateX(0) translateY(-50%)'
                  }}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Process Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-7 shadow-lg border border-slate-200"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Ready to Restore</h3>
            <p className="text-slate-600">
              {uploadedFiles.length} photo{uploadedFiles.length !== 1 ? 's' : ''} selected • 
              Estimated time: {getEstimatedTime()} minute{getEstimatedTime() !== 1 ? 's' : ''}
            </p>
          </div>

          {!hasEnoughCredits && (
            <div className="flex items-center space-x-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">
                You need {uploadedFiles.length - userRestorationsLeft} more credit{uploadedFiles.length - userRestorationsLeft !== 1 ? 's' : ''} to restore all photos
              </span>
            </div>
          )}

          <button
            onClick={handleProcess}
            disabled={uploadedFiles.length === 0 || !hasEnoughCredits}
            className={`w-full flex items-center justify-center space-x-3 py-4 px-8 rounded-xl font-medium transition-colors duration-200 ${
              uploadedFiles.length === 0 || !hasEnoughCredits
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
            }`}
            style={{ transitionProperty: 'background, color, box-shadow' }}
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-lg">Start Restoration Process</span>
          </button>

          <div className="flex items-center justify-center mt-6 text-sm text-slate-500">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Free processing • No watermarks • High quality results</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 