import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                PastPerfect
              </span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Free AI-powered image and video upscaling and restoration. 
              Enhance your memories with cutting-edge technology.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>and powered by AI</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-100 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upscaler" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Upscaler
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-orange-400 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-100 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@pastperfect.ai" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#donate" className="text-slate-300 hover:text-orange-400 transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-300 hover:text-orange-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8">
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