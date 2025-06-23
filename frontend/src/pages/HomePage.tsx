import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Zap, 
  Download, 
  Sparkles, 
  Heart, 
  Shield, 
  Clock, 
  Users,
  ChevronDown,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import TestimonialsSlider from '../components/TestimonialsSlider'

export default function HomePage() {
  const scrollToUpscaler = () => {
    const element = document.getElementById('upscaler-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6">
                Transform Your
                <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Memories
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl">
                Free AI-powered image and video upscaling and restoration. 
                Bring your old photos and videos back to life with cutting-edge technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={scrollToUpscaler}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Start Now - It's Free</span>
                  <ArrowRight size={20} />
                </button>
                <Link
                  to="/upscaler"
                  className="border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold text-lg hover:border-orange-500 hover:text-orange-400 transition-all duration-200 flex items-center justify-center"
                >
                  Try Upscaler
                </Link>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-green-900/50 text-green-400 px-4 py-2 rounded-full border border-green-700">
                  <CheckCircle size={16} />
                  <span className="font-medium">Completely Free</span>
                </div>
                <div className="flex items-center space-x-2 bg-orange-900/50 text-orange-400 px-4 py-2 rounded-full border border-orange-700">
                  <Sparkles size={16} />
                  <span className="font-medium">Powered by AI</span>
                </div>
                <div className="flex items-center space-x-2 bg-red-900/50 text-red-400 px-4 py-2 rounded-full border border-red-700">
                  <Heart size={16} />
                  <span className="font-medium">We Run on Donations</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - Before/After slider */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BeforeAfterSlider
                beforeImage="/sample-before-1.jpg"
                afterImage="/sample-after-1.jpg"
                title="See the Magic"
                description="Drag to compare before and after"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">
              See the Magic in Action
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Drag the slider to compare original and enhanced images. 
              Our AI models can upscale, restore, and enhance any image or video.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BeforeAfterSlider
              beforeImage="/sample-before-1.jpg"
              afterImage="/sample-after-1.jpg"
              title="Old Family Photo Restoration"
              description="Bringing back lost details and colors"
            />
            <BeforeAfterSlider
              beforeImage="/sample-before-2.jpg"
              afterImage="/sample-after-2.jpg"
              title="Low Resolution Upscaling"
              description="4x upscaling with enhanced clarity"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Three simple steps to transform your media
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
              <div className="w-16 h-16 bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-700">
                <Upload className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4">1. Upload</h3>
              <p className="text-slate-300">
                Upload your image or video file. We support JPG, PNG, MP4, and many other formats.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
              <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-700">
                <Zap className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4">2. Process</h3>
              <p className="text-slate-300">
                Our AI models analyze and enhance your media with advanced upscaling and restoration.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
              <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-700">
                <Download className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4">3. Download</h3>
              <p className="text-slate-300">
                Download your enhanced media in high quality. No watermarks, no restrictions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">
              Why Choose PastPerfect?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Professional-grade AI enhancement, completely free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-orange-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-orange-700">
                <Sparkles className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-2">AI-Powered</h3>
              <p className="text-slate-300 text-sm">
                State-of-the-art machine learning models for the best results
              </p>
            </div>
            
            <div className="text-center p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-700">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-2">Privacy First</h3>
              <p className="text-slate-300 text-sm">
                Your files are processed securely and deleted after processing
              </p>
            </div>
            
            <div className="text-center p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-red-700">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-2">Fast Processing</h3>
              <p className="text-slate-300 text-sm">
                Get your enhanced media in minutes, not hours
              </p>
            </div>
            
            <div className="text-center p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-blue-700">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-2">Community Driven</h3>
              <p className="text-slate-300 text-sm">
                Open source and supported by the community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSlider />

      {/* Donation Section */}
      <section id="donate" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-2xl p-12 border border-orange-700">
            <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Support Our Mission
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              PastPerfect is completely free to use, but we rely on donations to keep the servers running 
              and continue improving our AI models. Every contribution helps us serve more users.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://ko-fi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                Donate on Ko-fi
              </a>
              <a
                href="https://github.com/sponsors"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-colors"
              >
                GitHub Sponsors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upscaler Section */}
      <section id="upscaler-section" className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-100 mb-4">
            Ready to Transform Your Media?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Upload your image or video and see the magic happen
          </p>
          <Link
            to="/upscaler"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-2"
          >
            <span>Start Upscaling Now</span>
            <ChevronDown className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-300">
              Everything you need to know about PastPerfect
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
              <h3 className="font-semibold text-slate-100 mb-2">
                Is PastPerfect really free?
              </h3>
              <p className="text-slate-300">
                Yes! PastPerfect is completely free to use. We believe that AI enhancement should be 
                accessible to everyone. We're supported by donations from our community.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
              <h3 className="font-semibold text-slate-100 mb-2">
                What file formats do you support?
              </h3>
              <p className="text-slate-300">
                We support most common image formats (JPG, PNG, WEBP, BMP) and video formats (MP4, AVI, MOV). 
                Maximum file size is 100MB for images and 500MB for videos.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
              <h3 className="font-semibold text-slate-100 mb-2">
                How long does processing take?
              </h3>
              <p className="text-slate-300">
                Processing time depends on file size and enhancement settings. Most images are processed 
                in 1-3 minutes, while videos may take 5-15 minutes depending on length and quality.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
              <h3 className="font-semibold text-slate-100 mb-2">
                What AI models do you use?
              </h3>
              <p className="text-slate-300">
                We use a combination of state-of-the-art models including Real-ESRGAN for upscaling, 
                GFPGAN for face restoration, and custom models for video enhancement.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
              <h3 className="font-semibold text-slate-100 mb-2">
                Is my data safe?
              </h3>
              <p className="text-slate-300">
                Absolutely. We process your files securely and automatically delete them after processing. 
                We never store or share your personal data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 