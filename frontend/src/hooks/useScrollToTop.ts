import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Immediately set scroll position to top without animation
    // This prevents any visible scrolling
    if (typeof window !== 'undefined') {
      // Set scroll position immediately
      window.scrollTo(0, 0)
      
      // Also ensure the document element is at the top
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [pathname])
} 