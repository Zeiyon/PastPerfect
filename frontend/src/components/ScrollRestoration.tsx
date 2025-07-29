import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollRestoration() {
  const location = useLocation()

  useEffect(() => {
    // Prevent scroll restoration by immediately setting position to top
    // This happens before any rendering, so there's no visible scroll
    const preventScrollRestoration = () => {
      // Set scroll position to top immediately
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Execute immediately
    preventScrollRestoration()
    
    // Also execute after a brief delay to ensure it takes effect
    const timeoutId = setTimeout(preventScrollRestoration, 0)
    
    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return null
} 