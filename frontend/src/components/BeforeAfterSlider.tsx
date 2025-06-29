import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  title: string
  description: string
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  title, 
  description 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="bg-background-card rounded-2xl shadow-card overflow-hidden border border-slate-200"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-700 mb-4">{description}</p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-64 md:h-80 cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Before Image (Background) */}
        <div className="absolute inset-0">
          <img 
            src={beforeImage} 
            alt="Before" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a placeholder if image doesn't exist
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjM0Y0RjU2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTUwTDE1MCAxMDBMMjAwIDE1MEwyNTAgMTAwTDMwMCAxNTAiIHN0cm9rZT0iI0Y5N0EzRiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjE1MCIgcj0iOCIgZmlsbD0iI0Y5N0EzRiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjgiIGZpbGw9IiNGOTdBM0YiLz4KPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTUwIiByPSI4IiBmaWxsPSIjRjk3QTNCIi8+Cjwvc3ZnPgo='
            }}
          />
        </div>
        
        {/* After Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={afterImage} 
            alt="After" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a placeholder if image doesn't exist
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjM0Y0RjU2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTUwTDE1MCAxMDBMMjAwIDE1MEwyNTAgMTAwTDMwMCAxNTAiIHN0cm9rZT0iI0Y5N0EzQiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjE1MCIgcj0iOCIgZmlsbD0iI0Y5N0EzQiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjgiIGZpbGw9IiNGOTdBM0MiLz4KPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTUwIiByPSI4IiBmaWxsPSIjRjk3QTNCIi8+Cjwvc3ZnPgo='
            }}
          />
        </div>
        
        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-orange-500 shadow-lg cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
          Before
        </div>
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
          After
        </div>
      </div>
      
      <div className="p-4 bg-background-subtle text-center">
        <p className="text-sm text-slate-700">
          Drag the slider to compare • {Math.round(sliderPosition)}% enhanced
        </p>
      </div>
    </motion.div>
  )
} 