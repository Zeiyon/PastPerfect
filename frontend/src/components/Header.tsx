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
    <header className={`fixed top-0 left-0 right-0 container max-w-7xl mx-auto z-50 transition-all duration-800 ${
      scrolled 
        ? 'bg-white/50 backdrop-blur-md shadow-lg mt-4 rounded-2xl' 
        : 'bg-transparent backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-0">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="PastPerfect Logo" className="w-10 h-10 z-10" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">PastPerfect</span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`text-base font-semibold transition-colors ${
                location.pathname === '/' 
                  ? 'text-orange-600' 
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/restore" 
              className={`text-base font-semibold transition-colors ${
                location.pathname === '/restore' 
                  ? 'text-orange-600' 
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              Restore
            </Link>
            <Link 
              to="/upscale" 
              className={`text-base font-semibold transition-colors ${
                location.pathname === '/upscale' 
                  ? 'text-orange-600' 
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              <span className="flex items-center">
                Upscale
                <span className="px-1 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-600 align-middle transform translate-y-3 -translate-x-1 rotate-5">Free</span>
              </span>
            </Link>
            <Link 
              to="/pricing" 
              className={`text-base font-semibold transition-colors ${
                location.pathname === '/pricing' 
                  ? 'text-orange-600' 
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* Auth Buttons (Right Side) */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onLoginClick}
              className="cursor-pointer px-4 py-1 rounded-xl font-semibold text-orange-600 border border-orange-400 bg-white hover:border-orange-600 hover:shadow-md transition-all shadow-sm"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={onSignUpClick}
              className="cursor-pointer px-4 py-1 rounded-xl font-semibold text-white bg-gradient-to-r border border-orange-400 from-orange-400 to-orange-600 shadow hover:border-orange-600 hover:shadow-md transition-all"
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </header>
  )
} 