import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode?: 'signin' | 'signup';
}

const OAUTH_PROVIDERS = [
  { name: 'Google', color: 'bg-white', text: 'text-slate-900', icon: '/google.svg' },
  { name: 'GitHub', color: 'bg-slate-900', text: 'text-white', icon: '/github.svg' },
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
                    className={`w-full flex items-center justify-center gap-3 py-2 rounded-lg font-semibold border border-slate-200 shadow-sm hover:shadow transition-all ${provider.color} ${provider.text}`}
                  >
                    <img src={provider.icon} alt={provider.name} className="w-5 h-5" />
                    Continue with {provider.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center w-full my-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="mx-3 text-slate-400 text-xs font-semibold">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Email/Password Form */}
              <form className="w-full space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-slate-200 p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                  autoComplete="email"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-lg border border-slate-200 p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-bold shadow hover:opacity-90 transition"
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      className="text-orange-500 font-semibold hover:underline"
                      onClick={() => setIsSignUp(false)}
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      className="text-orange-500 font-semibold hover:underline"
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