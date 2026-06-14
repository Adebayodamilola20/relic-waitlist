import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Workflow, 
  ListChecks, 
  Bot, 
  Terminal, 
  Rocket
} from 'lucide-react';

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: "AI CTO",
    tag: "Technical Advisor",
    desc: "Analyzes business models, evaluates technology stacks (e.g. Postgres vs MongoDB), and translates user-described requirements into standard engineering specifications.",
    visual: (
      <div className="mt-4 p-2 bg-slate-900 rounded-lg font-mono text-[9px] text-slate-300 border border-slate-800">
        <div className="text-teal-400">relic-advisor --analyze "uber for boats"</div>
        <div className="text-slate-500 mt-1">&gt; Selected Stack: Next.js + Supabase + Webhooks</div>
        <div className="text-slate-500">&gt; Scalability assessment: High concurrency potential.</div>
      </div>
    )
  },
  {
    icon: Workflow,
    title: "Product Architect",
    tag: "System Designer",
    desc: "Automatically designs system architectures, schemas, database entity relations, and API gateways that fit your exact business goals.",
    visual: (
      <div className="mt-4 flex items-center justify-around bg-slate-50 rounded-lg p-2.5 border border-slate-100">
        <div className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-mono shadow-sm">Client App</div>
        <span className="text-[10px] text-slate-300">➔</span>
        <div className="px-2 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded text-[9px] font-mono font-semibold shadow-sm">API Gateway</div>
        <span className="text-[10px] text-slate-300">➔</span>
        <div className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-mono shadow-sm">Database</div>
      </div>
    )
  },
  {
    icon: ListChecks,
    title: "Startup Planner",
    tag: "Roadmaps & Milestones",
    desc: "Generates step-by-step roadmaps, identifies critical dependencies, and populates Kanban task lists to keep you focused on shipping.",
    visual: (
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] bg-white border border-slate-100 p-1.5 rounded shadow-sm">
          <span className="text-slate-700 truncate font-semibold">1. Authenticate with OAuth</span>
          <span className="text-teal-600 font-bold">100%</span>
        </div>
        <div className="flex items-center justify-between text-[10px] bg-white border border-slate-100 p-1.5 rounded shadow-sm">
          <span className="text-slate-700 truncate font-semibold">2. Setup Escrow Webhook</span>
          <span className="text-amber-500 font-bold">Pending</span>
        </div>
      </div>
    )
  },
  {
    icon: Bot,
    title: "Agent Builder",
    tag: "Custom AI Workflows",
    desc: "Spins up autonomous virtual engineers, designers, copywriters, and QA assistants that coordinate and double-check code quality in the background.",
    visual: (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-white border border-slate-150 p-2 rounded-lg flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="text-[9px] font-mono text-slate-700">DevOps Agent</span>
        </div>
        <div className="bg-white border border-slate-150 p-2 rounded-lg flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse"></span>
          <span className="text-[9px] font-mono text-slate-700">QA Auditor</span>
        </div>
      </div>
    )
  },
  {
    icon: Terminal,
    title: "Code Generator",
    tag: "Base Foundations",
    desc: "Generates high-performance React client apps, backend routes, schema definitions, and unit test files directly into standard files.",
    visual: (
      <div className="mt-4 bg-slate-900 rounded-lg p-2.5 font-mono text-[9px] text-teal-400 border border-slate-800 leading-normal max-h-[85px] overflow-hidden">
        <span className="text-slate-400">const</span> <span className="text-slate-300">UserSchema</span> = <span className="text-slate-400">new</span> <span className="text-amber-300">Schema</span>({`{`}
        <div className="pl-3">email: {`{ type: String, unique: true },`}</div>
        <div className="pl-3">createdAt: Date</div>
        {`});`}
      </div>
    )
  },
  {
    icon: Rocket,
    title: "Launch Assistant",
    tag: "Cloud Pipelines",
    desc: "Guides your final build process, configures Docker environments, setups CI/CD integrations, and monitors server deployments.",
    visual: (
      <div className="mt-4 bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400">DEPLOYMENT STATUS</span>
          <span className="text-[11px] font-bold text-slate-850">Deployed to AWS Cloud</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
          Active
        </span>
      </div>
    )
  }
];

export default function WhatRelicDoes() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white relative overflow-hidden">
      
      {/* Background blurs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-teal-glow/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-3 py-1 bg-teal-50 border border-teal-100 rounded-full inline-block mb-3">
            Core Modules
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            A CTO Engine in a Single Prompt.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            RELIC replaces fractured toolchains with a single, collaborative context workspace. Describe your vision and see it take shape:
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group rounded-2xl border border-slate-200/75 bg-slate-50/60 p-6 flex flex-col justify-between hover:bg-white hover:border-brand-teal/30 hover:shadow-[0_15px_30px_rgba(20,184,166,0.06)] transition-all duration-300 relative overflow-hidden"
              >
                
                {/* Micro corner hover glow */}
                <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-brand-teal-glow/5 blur-2xl group-hover:bg-brand-teal-glow/15 transition-all duration-500"></div>

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white mb-5 shadow-sm group-hover:bg-brand-teal transition-colors duration-300">
                    <Icon className="w-6 h-6 text-brand-teal group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title & Tag */}
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-1">
                    {cap.tag}
                  </span>
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-3">
                    {cap.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                {/* Embedded Mini Mockup */}
                <div className="mt-6">
                  {cap.visual}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
