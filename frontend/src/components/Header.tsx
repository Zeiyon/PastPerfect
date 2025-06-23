import { Link, useLocation } from 'react-router-dom'
import { Github, Mail } from 'lucide-react'

export default function Header() {
  const location = useLocation()

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              PastPerfect
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-orange-400' 
                  : 'text-slate-300 hover:text-orange-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/upscaler" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/upscaler' 
                  ? 'text-orange-400' 
                  : 'text-slate-300 hover:text-orange-400'
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
              className="text-slate-300 hover:text-orange-400 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="mailto:contact@pastperfect.ai" 
              className="text-slate-300 hover:text-orange-400 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
} 