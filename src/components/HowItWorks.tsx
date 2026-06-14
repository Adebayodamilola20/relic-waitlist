import { motion } from 'framer-motion';
import { MessageSquareText, BarChart3, Settings2, Rocket } from 'lucide-react';

const STEPS = [
  {
    icon: MessageSquareText,
    step: "01",
    title: "Describe Your Vision",
    desc: "Describe what you want to build in plain English. For example, 'An AI tutor for kids with a progress tracker for parents'."
  },
  {
    icon: BarChart3,
    step: "02",
    title: "CTO Analysis & Specifications",
    desc: "RELIC immediately drafts data schemas, evaluates scaling parameters, chooses optimal database integrations, and constructs logical modules."
  },
  {
    icon: Settings2,
    step: "03",
    title: "Collaborative Agent Engineering",
    desc: "Autonomous agent workers (developers, security checkers, architects) collaborate to build codebases, mock data, and write setup configurations."
  },
  {
    icon: Rocket,
    step: "04",
    title: "Deploy & Launch Smarter",
    desc: "Validate, preview, test, and deploy straight to server environments. Receive documentation guides, API tokens, and live status charts immediately."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Background decoration elements */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-3 py-1 bg-teal-50 border border-teal-100 rounded-full inline-block mb-3">
            Workflow Execution
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            How RELIC Works.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            A simplified, unified developer experience that brings your concepts into operational codebases in four structured steps.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Connecting Line (Desktop) */}
          <div className="absolute left-[50%] top-8 bottom-8 w-[2px] bg-dashed bg-slate-200 hidden md:block" style={{ borderLeft: '2px dashed #CBD5E1' }}></div>

          <div className="space-y-12 md:space-y-20 relative">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isEven = idx % 2 === 0;
              
              return (
                <div key={idx} className="flex flex-col md:flex-row items-center relative">
                  
                  {/* Left Side Content (Desktop) */}
                  <div className={`w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-12 text-center md:text-right order-2 md:order-1 ${
                    isEven ? 'md:opacity-100' : 'md:pointer-events-none'
                  }`}>
                    {isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl p-6 border border-slate-250/70 shadow-sm max-w-md"
                      >
                        <span className="font-display font-black text-4xl text-brand-teal/20 block mb-2">{step.step}</span>
                        <h3 className="font-display font-extrabold text-slate-900 text-lg mb-2">{step.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Middle Dot / Circle */}
                  <div className="absolute left-[50%] translate-x-[-50%] w-10 h-10 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-brand-teal shadow-md z-10 hidden md:flex order-1">
                    <StepIcon className="w-4 h-4" />
                  </div>

                  {/* Right Side Content (Desktop) */}
                  <div className={`w-full md:w-1/2 flex justify-center md:justify-start pl-0 md:pl-12 text-center md:text-left order-3 ${
                    !isEven ? 'md:opacity-100' : 'md:pointer-events-none'
                  }`}>
                    {!isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl p-6 border border-slate-250/70 shadow-sm max-w-md"
                      >
                        <span className="font-display font-black text-4xl text-brand-teal/20 block mb-2">{step.step}</span>
                        <h3 className="font-display font-extrabold text-slate-900 text-lg mb-2">{step.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}

                    {/* Mobile fallback rendering for all steps in grid */}
                    <div className="block md:hidden bg-white rounded-2xl p-6 border border-slate-250/70 shadow-sm w-full max-w-md my-4">
                      <div className="flex items-center gap-3 mb-2 justify-center">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-brand-teal">
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span className="font-display font-black text-2xl text-brand-teal/20">{step.step}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-slate-900 text-lg mb-2 text-center">{step.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed text-center">{step.desc}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
