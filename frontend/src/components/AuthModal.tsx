import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode?: 'signin' | 'signup';
}

const OAUTH_PROVIDERS = [
  { 
    name: 'Google', 
    color: 'bg-white', 
    text: 'text-slate-700', 
    border: 'border-slate-200',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.91 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    )
  },
  { 
    name: 'Facebook', 
    color: 'bg-blue-600', 
    text: 'text-white', 
    border: 'border-blue-600',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
];

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, mode = 'signin' }) => {
  const [isSignUp, setIsSignUp] = useState(mode === 'signup');

  useEffect(() => {
    setIsSignUp(mode === 'signup');
  }, [mode]);

  return (
    <>
      {/* Blurred overlay always mounted, animates in/out */}
      <motion.div
        className={`fixed inset-0 z-50 pointer-events-auto ${open ? '' : 'pointer-events-none'}`}
        initial={false}
        animate={open ? { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.3)' } : { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.1 }}
        onClick={open ? onClose : undefined}
        style={{ WebkitBackdropFilter: 'blur(8px)' }}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal Card */}
            <motion.div
              className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-orange-500 transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                {isSignUp ? 'Create your account' : 'Sign in to PastPerfect'}
              </h2>
              <p className="text-slate-500 mb-6 text-center">
                {isSignUp ? 'Start enhancing your memories!' : 'Welcome back! Please sign in.'}
              </p>

              {/* OAuth Buttons */}
              <div className="w-full space-y-3 mb-6">
                {OAUTH_PROVIDERS.map((provider) => (
                  <button
                    key={provider.name}
                    className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg font-medium border shadow-sm hover:shadow-md transition-all cursor-pointer ${provider.color} ${provider.text} ${provider.border}`}
                  >
                    {provider.icon}
                    Continue with {provider.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center w-full my-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="mx-3 text-slate-400 text-xs font-medium">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Email/Password Form */}
              <form className="w-full space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-slate-200 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  autoComplete="email"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-lg border border-slate-200 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium shadow-sm hover:bg-orange-600 hover:shadow-md transition-all cursor-pointer"
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      className="text-orange-500 font-medium hover:text-orange-600 cursor-pointer transition-colors"
                      onClick={() => setIsSignUp(false)}
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      className="text-orange-500 font-medium hover:text-orange-600 cursor-pointer transition-colors"
                      onClick={() => setIsSignUp(true)}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthModal; 