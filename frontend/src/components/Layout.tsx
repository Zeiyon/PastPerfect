import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  )
} 