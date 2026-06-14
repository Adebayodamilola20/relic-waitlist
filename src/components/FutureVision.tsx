import { 
  Network, 
  Palette, 
  ShieldAlert, 
  FileSpreadsheet, 
  Terminal, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const VISION_CARDS = [
  {
    icon: Network,
    title: "Multi-Agent Teams",
    desc: "Autonomous agents holding design, code, and DevOps standups together to plan pull requests."
  },
  {
    icon: Palette,
    title: "AI Designers",
    desc: "Dynamic UI layout generation, color theory alignment, and exportable component library code."
  },
  {
    icon: ShieldAlert,
    title: "AI QA Engineers",
    desc: "Simulates actual user clicking behaviors and runs automated end-to-end integration testing."
  },
  {
    icon: FileSpreadsheet,
    title: "AI Business Analyst",
    desc: "Competitor positioning analysis, unit economic projections, and pitch deck content drafts."
  },
  {
    icon: Terminal,
    title: "AI DevOps & Scaling",
    desc: "Autoscale configuration, automated server failover planning, and security penetration test loops."
  },
  {
    icon: Layers,
    title: "Startup Operating System",
    desc: "A singular hub tracking domains, emails, incorporation documents, and tasks alongside your code."
  }
];

const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    time: "Q3 2026",
    title: "Core Infrastructure & Alpha",
    features: ["Single prompt project planning", "React/Node code scaffold generator", "Supported local model execution via Ollama", "Staging sandbox preview links"]
  },
  {
    phase: "Phase 2",
    time: "Q4 2026",
    title: "Multi-Agent Orchestration",
    features: ["GitHub integration with automatic PR audits", "Visual database layout schema designer", "Custom safety LLM filter profiles", "Live team agent terminals"]
  },
  {
    phase: "Phase 3",
    time: "Q1 2027",
    title: "Startup OS Integration",
    features: ["Stripe Connect payment structures", "Domain registration & DNS configuration", "Automated deployment to multi-cloud hubs", "Investor pitch mock analyzer"]
  }
];

export default function FutureVision() {
  return (
    <section id="future" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Soft background glow bubbles */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-brand-teal-glow/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            The Future of Startup Creation.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            We are not just building another code helper. RELIC is designed to serve as the unified operating system for launching and managing the modern digital enterprise.
          </p>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28">
          {VISION_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between hover:border-brand-teal/30 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-4 group-hover:ring-1 group-hover:ring-brand-teal/30 transition-all">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-extrabold text-slate-850 text-base mb-2 group-hover:text-slate-900 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                
                {/* Visual anchor link */}
                <div className="mt-4 flex items-center gap-1 text-[10px] font-semibold text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Future spec docs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Roadmap Visualization */}
        <div className="border border-slate-200/80 rounded-3xl bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
            <Calendar className="w-5 h-5 text-brand-teal" />
            <h3 className="font-display font-black text-lg text-slate-900">Platform Milestone Roadmap</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {ROADMAP_PHASES.map((phase, idx) => {
              return (
                <div key={idx} className="relative">
                  {/* Phase header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest font-mono">
                      {phase.phase}
                    </span>
                    <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-semibold">
                      {phase.time}
                    </span>
                  </div>
                  
                  <h4 className="font-display font-extrabold text-slate-900 text-sm mb-3">
                    {phase.title}
                  </h4>

                  {/* Feature lists */}
                  <ul className="space-y-2">
                    {phase.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Vertical lines connecting columns in desktop */}
                  {idx < 2 && (
                    <div className="absolute right-[-16px] top-4 bottom-4 w-[1px] bg-slate-100 hidden lg:block"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
