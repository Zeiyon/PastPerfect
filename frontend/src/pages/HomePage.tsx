import { Link, useNavigate } from 'react-router-dom'
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
  ArrowRight,
  HelpCircle
} from 'lucide-react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const beforeAfterExamples = [
  {
    before: '/sample-before-1.jpg',
    after: '/sample-after-1.jpg',
    title: 'Old Family Photo Restoration',
    desc: 'Bringing back lost details and colors',
  },
  {
    before: '/sample-before-2.jpg',
    after: '/sample-after-2.jpg',
    title: 'Low Resolution Upscaling',
    desc: '4x upscaling with enhanced clarity',
  },
]

const faqs = [
  {
    q: 'Is PastPerfect really free?',
    a: 'Yes! PastPerfect is completely free to use. We believe that AI enhancement should be accessible to everyone. We are supported by donations from our community.'
  },
  {
    q: 'What file formats do you support?',
    a: 'We support most common image formats (JPG, PNG, WEBP, BMP) and video formats (MP4, AVI, MOV). Maximum file size is 100MB for images and 500MB for videos.'
  },
  {
    q: 'How long does processing take?',
    a: 'Most images are processed in 1-3 minutes, while videos may take 5-15 minutes depending on length and quality.'
  },
  {
    q: 'Is my data safe?',
    a: 'Absolutely. We process your files securely and automatically delete them after processing. We never store or share your personal data.'
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  const scrollToUpscaler = () => {
    const element = document.getElementById('upscaler-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="pt-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">Enhance Your Memories<br /><span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">with Free AI Upscaling</span></h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">Restore and upscale your images and videos with cutting-edge AI. 100% free, no watermarks, no sign-up.</p>
        <button onClick={() => navigate('/upscaler')} className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform">Start Now</button>
      </motion.section>

      {/* Before/After Carousel */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">See the Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beforeAfterExamples.map((ex, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
              <h3 className="font-semibold text-lg text-slate-800 mb-2">{ex.title}</h3>
              <p className="text-slate-500 mb-4">{ex.desc}</p>
              <div className="w-full h-64">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={ex.before} alt="Before" />}
                  itemTwo={<ReactCompareSliderImage src={ex.after} alt="After" />}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Upload className="w-10 h-10 text-orange-500 mb-4" />
            <h4 className="font-semibold text-lg mb-2">1. Upload</h4>
            <p className="text-slate-500">Upload your image or video. We support JPG, PNG, MP4, and more.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Zap className="w-10 h-10 text-orange-500 mb-4" />
            <h4 className="font-semibold text-lg mb-2">2. Enhance</h4>
            <p className="text-slate-500">Our AI models upscale, restore, and enhance your media in minutes.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Download className="w-10 h-10 text-orange-500 mb-4" />
            <h4 className="font-semibold text-lg mb-2">3. Download</h4>
            <p className="text-slate-500">Download your enhanced media. No watermarks, no restrictions.</p>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Choose PastPerfect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Completely Free</h4>
            <p className="text-slate-500 text-center">No cost, no sign-up, no watermarks. 100% free for everyone.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Sparkles className="w-10 h-10 text-blue-500 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Powered by AI</h4>
            <p className="text-slate-500 text-center">State-of-the-art AI models for the best possible results.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Heart className="w-10 h-10 text-orange-500 mb-4" />
            <h4 className="font-semibold text-lg mb-2">We Run on Donations</h4>
            <p className="text-slate-500 text-center">Support us to keep the service free and open for all.</p>
          </div>
        </div>
      </motion.section>

      {/* Donation Model */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Support Our Mission</h3>
          <p className="text-slate-600 mb-4">PastPerfect is free for everyone, forever. We rely on donations to cover server and development costs. If you find our service valuable, please consider supporting us.</p>
          <a href="#donate" className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition-transform">Donate</a>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-lg shadow p-4 group">
              <summary className="flex items-center cursor-pointer text-lg font-semibold text-slate-800 group-open:text-orange-600 transition-colors">
                <HelpCircle className="w-5 h-5 mr-2 text-orange-400" />
                {faq.q}
              </summary>
              <p className="mt-2 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </motion.section>
    </div>
  )
} 