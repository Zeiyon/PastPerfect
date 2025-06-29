import { Link, useLocation } from 'react-router-dom'
import { Github, Mail } from 'lucide-react'

export default function Header() {
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-lg tracking-tight">PP</span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">PastPerfect</span>
          </Link>
          <nav className="hidden md:flex space-x-10">
            <Link 
              to="/" 
              className={`text-base font-semibold transition-colors px-2 py-1 rounded-md ${
                location.pathname === '/' 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/upscaler" 
              className={`text-base font-semibold transition-colors px-2 py-1 rounded-md ${
                location.pathname === '/upscaler' 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              Upscaler
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-orange-600 transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a 
              href="mailto:contact@pastperfect.ai" 
              className="text-slate-400 hover:text-orange-600 transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
} 