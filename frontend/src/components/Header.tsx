import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface HeaderProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

export default function Header({ onLoginClick, onSignUpClick }: HeaderProps) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50 transition-all ${scrolled ? 'shadow-md' : ''}`}>
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
            <button
              type="button"
              onClick={onLoginClick}
              className="cursor-pointer px-4 py-1 rounded-full font-semibold text-orange-600 border-1 border-orange-400 bg-white hover:border-orange-600 hover:shadow-md transition-all shadow-sm"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={onSignUpClick}
              className="cursor-pointer px-4 py-1 rounded-full font-semibold text-white bg-gradient-to-r border-1 border-orange-400 from-orange-400 to-orange-600 shadow hover:border-orange-600 hover:shadow-md transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 