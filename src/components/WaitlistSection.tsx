import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Loader2, ArrowRight, Users } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const waitlistBaselineCount = 1207;

type RegisterWaitlistResponse = {
  ok: boolean;
  message?: string;
  email?: string;
  fullName?: string;
  queuePosition?: number;
};

export default function WaitlistSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [currentWaitlistCount, setCurrentWaitlistCount] = useState(waitlistBaselineCount);

  useEffect(() => {
    const supabaseClient = supabase;

    if (!isSupabaseConfigured || !supabaseClient) {
      return;
    }

    let isMounted = true;

    const fetchCurrentCount = async () => {
      const { data, error } = await supabaseClient
        .from('waitlist_public_stats')
        .select('current_count')
        .eq('id', true)
        .maybeSingle();

      if (!error && isMounted && typeof data?.current_count === 'number') {
        setCurrentWaitlistCount(data.current_count);
      }
    };

    fetchCurrentCount();

    const channel = supabaseClient
      .channel('waitlist-public-stats')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'waitlist_public_stats' },
        (payload) => {
          const updatedCount = payload.new && 'current_count' in payload.new
            ? Number(payload.new.current_count)
            : NaN;

          if (Number.isInteger(updatedCount) && updatedCount >= waitlistBaselineCount) {
            setCurrentWaitlistCount(updatedCount);
          }
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabaseClient.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setEmailSent(false);
    
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      let registration: RegisterWaitlistResponse = {
        ok: true,
        email: trimmedEmail,
        fullName: trimmedName,
        queuePosition: currentWaitlistCount + 1,
      };

      const supabaseClient = supabase;

      if (isSupabaseConfigured && supabaseClient) {
        const { data, error: registrationError } = await supabaseClient.rpc('register_waitlist_entry', {
          input_full_name: trimmedName,
          input_email: trimmedEmail,
          input_source: 'website',
        });

        if (registrationError) {
          throw registrationError;
        }

        registration = data as RegisterWaitlistResponse;

        if (!registration.ok) {
          setErrorMessage(registration.message || 'We could not reserve your spot with this email address.');
          setStatus('idle');
          return;
        }

        const { error: emailError } = await supabaseClient.functions.invoke('send-waitlist-email', {
          body: {
            fullName: registration.fullName || trimmedName,
            email: registration.email || trimmedEmail,
            queuePosition: registration.queuePosition,
          },
        });

        setEmailSent(!emailError);
        if (emailError) {
          console.error('Waitlist confirmation email failed:', emailError);
        }
      }

      const resolvedQueuePosition = registration.queuePosition || currentWaitlistCount + 1;
      setSubmittedEmail(registration.email || trimmedEmail);
      setQueuePosition(resolvedQueuePosition);
      setCurrentWaitlistCount((count) => Math.max(count, resolvedQueuePosition));
      setStatus('success');
    } catch (error) {
      console.error('Waitlist signup failed:', error);
      setErrorMessage('We could not reserve your spot right now. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <section id="waitlist" className="py-24 bg-white relative overflow-hidden flex items-center justify-center">
      {/* Background visual glowing bubbles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -right-10 top-0 w-80 h-80 bg-brand-teal-glow/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        
        {/* Main card */}
        <div className="glass-panel rounded-3xl border border-slate-200/80 p-8 md:p-14 shadow-[0_20px_50px_rgba(50,187,120,0.10)] text-center relative overflow-hidden">
          
          {/* Subtle top decoration badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-teal h-1.5 w-40 rounded-b-full"></div>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Headlines */}
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
                  Be Among the First Builders.
                </h2>
                <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                  Join founders, developers, creators, and innovators shaping the future with RELIC. Reserve your spot for private beta access today.
                </p>

                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
                  <Users className="w-4 h-4 text-brand-teal" />
                  <span>{currentWaitlistCount.toLocaleString()} builders already waiting</span>
                </div>

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
                    className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-black/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all cursor-pointer disabled:opacity-70 active:scale-98"
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
                <div className="w-16 h-16 rounded-2xl bg-black border border-slate-200 flex items-center justify-center text-white mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-2">
                  Welcome to RELIC.
                </h3>
                
                <p className="text-slate-500 text-sm max-w-sm mb-6 leading-relaxed">
                  Thank you, <span className="font-bold text-slate-800">{fullName}</span>! Your spot has been secured for <span className="font-bold text-slate-800">{submittedEmail}</span>.
                </p>

                <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                  {emailSent
                    ? 'A confirmation email has been sent to your inbox.'
                    : 'A confirmation email is drafted for this address and will send as soon as email delivery is configured.'}
                </p>

                <div className="bg-teal-50/50 border border-brand-teal/40 rounded-xl px-5 py-3 text-[11px] text-slate-800 font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-teal animate-pulse" />
                  <span>Your Queue Position: #{(queuePosition || waitlistBaselineCount).toLocaleString()}</span>
                </div>

                <div className="mt-3 border border-slate-200 rounded-xl px-5 py-3 text-[11px] text-slate-700 font-mono flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-teal" />
                  <span>Current Waitlist Count: {currentWaitlistCount.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setFullName('');
                    setEmail('');
                    setSubmittedEmail('');
                    setEmailSent(false);
                    setQueuePosition(null);
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
