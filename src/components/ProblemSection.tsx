import { motion } from 'framer-motion';
import { CheckCircle, Layers, Hourglass, Users, DollarSign, BrainCircuit } from 'lucide-react';

const PROBLEMS = [
  {
    icon: Layers,
    title: "Too Many Disconnected Tools",
    desc: "Switching between 10+ different AI helpers, chats, and task trackers, leading to lost context."
  },
  {
    icon: Users,
    title: "No Technical Co-Founder",
    desc: "Struggling to make architectural decisions, evaluate trade-offs, or lead development alone."
  },
  {
    icon: DollarSign,
    title: "Expensive Developers",
    desc: "Paying tens of thousands of dollars to agencies or contractors before validating product market fit."
  },
  {
    icon: Hourglass,
    title: "Slow & Chaotic Execution",
    desc: "Weeks wasted writing boilerplates, setting up pipelines, and doing configuration instead of building features."
  },
  {
    icon: BrainCircuit,
    title: "Scattered AI Workflows",
    desc: "Copy-pasting prompts back and forth without unified version tracking or source code integration."
  }
];

const SOLUTIONS = [
  {
    title: "All-in-One Engine",
    desc: "Planning, database schemas, code, and deployment scripts are generated under a single context."
  },
  {
    title: "Autonomous AI CTO",
    desc: "An on-demand technical advisor assessing scalability, proposing APIs, and designing roadmaps 24/7."
  },
  {
    title: "Zero Setup Cost",
    desc: "Instantly create high-fidelity frontends and backends configured with standard engineering patterns."
  },
  {
    title: "Instant Execution",
    desc: "Go from description to repository and cloud deploy in minutes, not months."
  },
  {
    title: "Integrated AI Teams",
    desc: "A group of collaborative agents (DevOps, QA, Architect) working together on your codebase."
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
            Building a Startup Is Still <span className="text-brand-teal">Too Hard.</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Traditional product development is bogged down by high friction, fragmented workflows, and technical bottlenecks. Here is why the old way is failing:
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
