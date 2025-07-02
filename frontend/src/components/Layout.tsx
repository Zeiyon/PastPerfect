import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import AuthModal from './AuthModal'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        onLoginClick={() => { setAuthMode('signin'); setAuthOpen(true); }}
        onSignUpClick={() => { setAuthMode('signup'); setAuthOpen(true); }}
      />
      <main className="w-full flex-1">
        {children}
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} />
    </div>
  )
} 