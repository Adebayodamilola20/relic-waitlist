import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "RELIC feels like having a technical co-founder available 24/7. It designed our entire API spec and database schema in under two minutes.",
    author: "Elena Rostova",
    role: "Founder, Bloom Health",
    avatar: "ER"
  },
  {
    quote: "This is what startup building should look like. No configuration hell, no endless boilerplates. Just describe your vision and get production-ready code.",
    author: "Marcus Vance",
    role: "Solo Creator & Indie Hacker",
    avatar: "MV"
  },
  {
    quote: "The first AI platform that actually understands the entire journey. From database normalization diagrams to Docker configs and DNS settings, RELIC handles the CTO heavy lifting.",
    author: "Siddharth Nair",
    role: "VP of Engineering, Velo Systems",
    avatar: "SN"
  },
  {
    quote: "We generated our complete MVP frontend, backend, and Stripe setup. We were able to pitch investors and validate market fit weeks ahead of schedule.",
    author: "Chloe Dubois",
    role: "Co-Founder, ReloExpress",
    avatar: "CD"
  },
  {
    quote: "Using Ollama locally with DeepSeek on my own machine, I have a fully private AI CTO running without paying API fees. The developer experience is unreal.",
    author: "Dave Kester",
    role: "Staff Engineer",
    avatar: "DK"
  },
  {
    quote: "As a non-technical founder, RELIC bridged the gap. I could design schemas, communicate tasks clearly, and verify build outputs without a hiring bottleneck.",
    author: "Sarah Jenkins",
    role: "Founder, FitFlow CRM",
    avatar: "SJ"
  }
];

export default function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Subtle blurs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-3 py-1 bg-teal-50 border border-teal-100 rounded-full inline-block mb-3">
            Social Proof
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Shaping the Next Generation.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            See what developers, founders, and creators are saying about their experience working with RELIC as their technical partner.
          </p>
        </div>

        {/* Testimonials Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 relative group"
            >
              
              {/* Quote Mark */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 group-hover:text-teal-50 transition-colors" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-teal text-brand-teal" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-6">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-brand-teal flex items-center justify-center font-bold text-xs">
                  {test.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-display">{test.author}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{test.role}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
