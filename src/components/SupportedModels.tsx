import { Cpu, Cloud, ToggleRight } from 'lucide-react';

const LOCAL_MODELS = [
  { name: "Ollama", desc: "Local LLM orchestrator runner", speed: "110 tok/s", type: "Utility" },
  { name: "LM Studio", desc: "Model interface server API", speed: "95 tok/s", type: "Interface" },
  { name: "Qwen 2.5", desc: "State of the art multilingual", speed: "80 tok/s", type: "Reasoning" },
  { name: "Llama 3", desc: "Meta open weights architecture", speed: "88 tok/s", type: "General" },
  { name: "DeepSeek R1", desc: "Advanced code and reasoning", speed: "72 tok/s", type: "Coding" },
  { name: "Mistral", desc: "Fast, dense model processing", speed: "105 tok/s", type: "Speed" }
];

const CLOUD_MODELS = [
  { name: "Claude 3.5", desc: "Anthropic highest intelligence", latency: "250ms", type: "Creative" },
  { name: "Gemini 1.5 Pro", desc: "Google massive context multi-modal", latency: "190ms", type: "Context" },
  { name: "OpenAI GPT-4o", desc: "Speed and analytical reasoning", latency: "220ms", type: "Standard" },
  { name: "OpenRouter", desc: "Unified API model router gateway", latency: "310ms", type: "Gateway" },
  { name: "NVIDIA NIM", desc: "Accelerated computing containers", latency: "140ms", type: "Compute" },
  { name: "Grok 2", desc: "Real-time context and synthesis", latency: "290ms", type: "Search" }
];

export default function SupportedModels() {
  return (
    <section id="models" className="py-20 md:py-28 bg-white relative overflow-hidden">
      
      {/* Background blurs */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-brand-teal/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-3 py-1 bg-teal-50 border border-teal-100 rounded-full inline-block mb-3">
            Developer Flex
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Bring Your Own Intelligence.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Use your preferred models locally, run cloud models via API, or dynamically route tasks to separate models in a single multi-agent pipeline.
          </p>
        </div>

        {/* Matrix Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Local Models Box */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Cpu className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-slate-800 text-base">Local AI Models</h3>
                  <p className="text-[11px] text-slate-400">Run completely free offline on your hardware</p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full uppercase">
                Privacy First
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LOCAL_MODELS.map((model, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-4 border border-slate-200/60 hover:border-brand-teal/40 transition-colors shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-850 font-display">{model.name}</span>
                      <span className="text-[9px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded-full font-mono">{model.type}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal mb-3">{model.desc}</p>
                  </div>
                  <div className="flex items-center justify-between text-[9px] border-t border-slate-50 pt-2 font-mono">
                    <span className="text-slate-400">Tokens</span>
                    <span className="text-slate-600 font-semibold">{model.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Models Box */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Cloud className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-slate-800 text-base">Cloud AI Providers</h3>
                  <p className="text-[11px] text-slate-400">Connect to high-performance inference APIs</p>
                </div>
              </div>
              <span className="text-[10px] bg-teal-50 border border-teal-100 text-brand-teal font-bold px-2 py-0.5 rounded-full uppercase">
                API Linked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CLOUD_MODELS.map((model, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-4 border border-slate-200/60 hover:border-brand-teal/40 transition-colors shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-850 font-display">{model.name}</span>
                      <span className="text-[9px] bg-slate-100 text-slate-650 px-1.5 py-0.5 rounded-full font-mono">{model.type}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal mb-3">{model.desc}</p>
                  </div>
                  <div className="flex items-center justify-between text-[9px] border-t border-slate-50 pt-2 font-mono">
                    <span className="text-slate-400">Avg Latency</span>
                    <span className="text-slate-600 font-semibold">{model.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic routing helper text */}
        <div className="mt-12 text-center text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 max-w-2xl mx-auto flex items-center justify-center gap-2">
          <ToggleRight className="w-4 h-4 text-brand-teal shrink-0" />
          <span>Use local models for secure codebase indexing, and trigger cloud models only for complex reasoning and deployment compile stages.</span>
        </div>

      </div>
    </section>
  );
}
