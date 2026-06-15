import { motion } from 'framer-motion';
import { CheckCircle, Hourglass, Users, BrainCircuit, Factory, Database } from 'lucide-react';

const PROBLEMS = [
  {
    icon: Factory,
    title: "Building a Company Is Fragmented",
    desc: "Founders juggle strategy, product, engineering, marketing, support, and ops across disconnected tools and teams."
  },
  {
    icon: Users,
    title: "No Complete Team",
    desc: "Early-stage founders lack a CTO, marketer, ops lead, support agent, and analyst — hiring each costs months and capital."
  },
  {
    icon: BrainCircuit,
    title: "AI Tools Don't Remember",
    desc: "Every chat session starts from zero. No context, no history, no organizational memory across projects or decisions."
  },
  {
    icon: Hourglass,
    title: "Execution Takes Too Long",
    desc: "Months spent on setup, scaffolding, hiring, and coordination before a single customer sees value."
  },
  {
    icon: Database,
    title: "No Unified Intelligence",
    desc: "Business knowledge lives in scattered docs, tickets, and heads — not in a system that reasons and acts on it."
  }
];

const SOLUTIONS = [
  {
    title: "AI Startup Operating System",
    desc: "One platform that plans, builds, operates, and scales your business — replacing fragmented toolchains."
  },
  {
    title: "Permanent AI Workforce",
    desc: "Every organization gets a Lead Agent, CTO, Marketing, Analytics, Support, and Ops agents that stay forever."
  },
  {
    title: "Persistent Organizational Memory",
    desc: "Conversations, roadmaps, decisions, architecture, and agent activity remembered indefinitely — pick up months later."
  },
  {
    title: "Smart Agent Assembly",
    desc: "Describe your idea. RELIC analyzes industry, complexity, and requirements — then auto-assembles the right AI team."
  },
  {
    title: "Manage From WhatsApp",
    desc: "Ask your Lead Agent for sales numbers, support tickets, or strategic focus — get organized summaries instantly."
  }
];

export default function ProblemSection() {
  return (
    <section id="problems" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Background soft lighting */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Building a Company Is Still <span className="text-brand-teal">Too Fragmented.</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Founders waste months stitching together tools, hiring specialists, and losing context. The old way requires a village — RELIC gives you an AI organization.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Problem Cards Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
              <h3 className="text-lg font-bold text-slate-800">The Problem: Scattered Development</h3>
            </div>
            
            {PROBLEMS.map((prob, idx) => {
              const IconComp = prob.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm flex items-start gap-4 hover:border-rose-200/80 transition-all hover:shadow-[0_4px_20px_rgba(239,68,68,0.02)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">
                      {prob.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{prob.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Solution Cards Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">The Solution: RELIC Ecosystem</h3>
            </div>

            {SOLUTIONS.map((sol, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-teal-100/80 shadow-[0_4px_20px_rgba(50,187,120,0.08)] flex items-start gap-4 hover:border-brand-teal/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{sol.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
