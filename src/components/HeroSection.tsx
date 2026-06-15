import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DashboardMockup from './DashboardMockup';

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Background blurs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none animate-glow"></div>
      <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-brand-teal-glow/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-none mb-6"
            >
              Build Your Startup <br className="hidden sm:inline" />
              With an <span className="text-brand-teal">AI Startup Operating System.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 max-w-xl mb-10 font-sans leading-relaxed"
            >
              RELIC gives every founder an AI-powered organization — planning, building, operating, and scaling your business from a single platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleScrollTo('waitlist')}
                className="flex items-center justify-center gap-2 bg-black text-white font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-black/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all group cursor-pointer active:scale-98"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollTo('future')}
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all cursor-pointer"
              >
                See Vision
              </button>
            </motion.div>

            {/* Micro stats banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex items-center gap-6 border-t border-slate-100 pt-8 w-full justify-center lg:justify-start"
            >
              <div>
                <span className="block font-display font-extrabold text-xl text-slate-800 leading-none">∞</span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">AI Workforce</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-200"></div>
              <div>
                <span className="block font-display font-extrabold text-xl text-slate-800 leading-none">1 Platform</span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Plan · Build · Operate</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-200"></div>
              <div>
                <span className="block font-display font-extrabold text-xl text-slate-800 leading-none">Permanent</span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Organizational Memory</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 w-full"
          >
            <DashboardMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
