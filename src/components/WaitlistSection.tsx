import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function WaitlistSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [counter, setCounter] = useState(1247);

  // Dynamic incrementing waitlist counter (simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance to increment the builder count by 1 or 2 every few seconds
      if (Math.random() > 0.6) {
        setCounter(prev => prev + Math.floor(Math.random() * 2) + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API registration request
    setTimeout(() => {
      setStatus('success');
      setCounter(prev => prev + 1);
    }, 1500);
  };

  return (
    <section id="waitlist" className="py-24 bg-white relative overflow-hidden flex items-center justify-center">
      {/* Background visual glowing bubbles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -right-10 top-0 w-80 h-80 bg-brand-teal-glow/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        
        {/* Main card */}
        <div className="glass-panel rounded-3xl border border-slate-200/80 p-8 md:p-14 shadow-[0_20px_50px_rgba(20,184,166,0.05)] text-center relative overflow-hidden">
          
          {/* Subtle top decoration badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-teal to-teal-500 h-1.5 w-40 rounded-b-full"></div>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Live Counter Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-full mb-6 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">
                    {counter.toLocaleString()} Builders Waiting
                  </span>
                </div>

                {/* Headlines */}
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
                  Be Among the First Builders.
                </h2>
                <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                  Join founders, developers, creators, and innovators shaping the future with RELIC. Reserve your spot for private beta access today.
                </p>

                {/* Submit Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    
                    {/* Full Name Input */}
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={status === 'loading'}
                      className="w-full text-xs bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-teal focus:bg-white transition-all shadow-inner"
                    />

                    {/* Email Input */}
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      className="w-full text-xs bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-teal focus:bg-white transition-all shadow-inner"
                    />

                  </div>

                  {/* Errors */}
                  {errorMessage && (
                    <p className="text-xs text-rose-500 text-left pl-1">{errorMessage}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-slate-850 hover:shadow-[0_10px_20px_rgba(15,23,42,0.15)] transition-all cursor-pointer disabled:opacity-70 active:scale-98"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-brand-teal" />
                        <span>Reserving Your Spot...</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve My Spot</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 mt-4">
                    By submitting, you agree to receive waitlist notifications and development updates. Unsubscribe anytime.
                  </p>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-8 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-2">
                  Welcome to RELIC.
                </h3>
                
                <p className="text-slate-500 text-sm max-w-sm mb-6 leading-relaxed">
                  Thank you, <span className="font-bold text-slate-800">{fullName}</span>! Your spot has been secured. We have sent a confirmation details note to <span className="font-bold text-slate-800">{email}</span>.
                </p>

                <div className="bg-teal-50/50 border border-teal-100/60 rounded-xl px-5 py-3 text-[11px] text-teal-800 font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-teal animate-pulse" />
                  <span>Your Queue Position: #{(counter + 248).toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setFullName('');
                    setEmail('');
                  }}
                  className="mt-8 text-xs font-semibold text-slate-550 hover:text-slate-800 underline"
                >
                  Register another email
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
