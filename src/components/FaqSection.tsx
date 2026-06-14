import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "What is RELIC?",
    a: "RELIC is an AI-powered technical partner and CTO platform that helps founders, developers, entrepreneurs, and startups go from an idea to a fully launched product. Rather than copying prompts across dozens of isolated AI interfaces, RELIC brings your goals, database designs, tasks, code, and deployment configurations under a single unified project workspace."
  },
  {
    q: "Who is it for?",
    a: "RELIC is designed for three core groups: Non-technical founders looking to build, audit, and launch MVPs without engineering bottlenecks; Developers who want to skip writing boilerplates and focus on custom business logic; and Early-stage startup teams that need to design secure, scalable cloud systems rapidly."
  },
  {
    q: "Will local models be supported?",
    a: "Yes. RELIC supports a 'Bring Your Own Intelligence' framework. You can use local, privacy-respecting models running on your machine (via Ollama or LM Studio, such as Qwen 2.5 Coder, DeepSeek R1, or Llama 3) completely offline and for free. You can also mix-and-match local and cloud models in the same workflow pipeline."
  },
  {
    q: "When will RELIC launch?",
    a: "Our private alpha is currently rolling out to early waitlist users in batches. We plan to launch our open beta program in Q3 2026, which will introduce full collaborative agent standups and direct GitHub workspace syncing."
  },
  {
    q: "Does RELIC integrate with GitHub?",
    a: "Yes. RELIC features a GitHub-Native Workflow. Founders and developers can create repositories, open pull requests, review code, generate commits, track issues, and sync documentation — all directly from the platform. This GitHub integration makes the workflow feel real and production-ready, not theoretical. People trust GitHub, and RELIC builds on that trust."
  },
  {
    q: "How does the waitlist work?",
    a: "By submitting your email, you secure a position in our onboarding queue. We approve builders in batches based on registration timing. You will receive an automated onboarding link with setup documentation as soon as your batch is cleared for sandbox access."
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative overflow-hidden">
      
      {/* Background blurs */}
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-3 py-1 bg-teal-50 border border-teal-100 rounded-full inline-block mb-3">
            Q&A Hub
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
            Everything you need to know about the RELIC platform, architectural capabilities, and waitlist access.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-350 hover:border-slate-350"
              >
                
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4.5 h-4.5 text-brand-teal shrink-0" />
                    <span className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-slate-600" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                </button>

                {/* Accordion Content Collapse */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 pt-0 md:px-6 md:pb-6 text-xs sm:text-sm text-slate-550 leading-relaxed border-t border-slate-100 mt-0 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
