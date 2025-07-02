import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-lg tracking-tight">PP</span>
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">PastPerfect</span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md text-base">
              Free AI-powered image and video upscaling and restoration. Enhance your memories with cutting-edge technology.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart size={16} className="text-orange-500" />
              <span>and powered by AI</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-base">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Home</Link>
              </li>
              <li>
                <Link to="/upscaler" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Upscaler</Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">GitHub</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-base">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@pastperfect.ai" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Contact</a>
              </li>
              <li>
                <a href="#donate" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">Donate</a>
              </li>
              <li>
                <a href="#faq" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400">
              © 2024 PastPerfect. All rights reserved.
            </p>
            <div className="text-sm text-slate-400">
              Powered by Real-ESRGAN, GFPGAN, and other open-source models
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 