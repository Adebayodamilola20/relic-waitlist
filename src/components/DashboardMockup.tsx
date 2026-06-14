import { useState, useEffect } from 'react';
import { 
  Terminal, 
  Workflow, 
  Cpu, 
  Code2, 
  CloudLightning, 
  Play, 
  CheckCircle2, 
  Server, 
  GitBranch, 
  Sparkles,
  ArrowRight,
  Database,
  LayoutGrid
} from 'lucide-react';

interface PresetIdea {
  title: string;
  tagline: string;
  plan: string[];
  nodes: string[];
  agents: { name: string; status: string }[];
  code: string;
}

const PRESETS: Record<string, PresetIdea> = {
  yachts: {
    title: "Airbnb for Yachts",
    tagline: "Peer-to-peer yacht booking with captain services",
    plan: [
      "Define user roles: Charterers, Yacht Owners, Captains",
      "Setup Stripe Connect for multi-party escrow payments",
      "Configure geolocation search and availability calendar",
      "Create automated booking approval pipeline"
    ],
    nodes: ["Client Portal", "Search Service", "Stripe API", "Yacht Database", "Notify Broker"],
    agents: [
      { name: "Market Analyst", status: "Idle" },
      { name: "Database Designer", status: "Idle" },
      { name: "Backend Coder", status: "Active" },
      { name: "QA Auditor", status: "Idle" }
    ],
    code: `// RELIC Generated: Yacht Booking Escrow Controller
import { Stripe } from '@stripe/stripe-js';

export async function createBookingEscrow(booking: Booking) {
  const charge = await stripe.paymentIntents.create({
    amount: booking.totalAmount * 100,
    currency: 'usd',
    application_fee_amount: booking.relicFee * 100,
    transfer_data: {
      destination: booking.ownerAccountId,
    },
  });
  return { success: true, stripeIntent: charge.id };
}`
  },
  gyms: {
    title: "SaaS CRM for Gyms",
    tagline: "Member management and automated email automation",
    plan: [
      "Design database Schema for Members, Plans, and Check-ins",
      "Integrate RFID/QR code scanner webhook for entry gates",
      "Setup automated email triggers for inactive members",
      "Build admin dashboard for subscription analytics"
    ],
    nodes: ["Admin UI", "Member API", "QR Code Parser", "CRM DB", "SendGrid Link"],
    agents: [
      { name: "CRM Architect", status: "Idle" },
      { name: "Schema Builder", status: "Active" },
      { name: "Webhook Handler", status: "Idle" },
      { name: "Security Officer", status: "Active" }
    ],
    code: `// RELIC Generated: Gym Member Check-In Webhook
export async function handleCheckInGate(qrToken: string) {
  const member = await db.members.findFirst({ where: { qrToken } });
  if (!member || member.status !== 'active') {
    return { authorized: false, reason: 'Invalid membership' };
  }
  
  await db.checkins.create({ data: { memberId: member.id } });
  await triggerWelcomeScreen(member.name);
  return { authorized: true };
}`
  },
  tutor: {
    title: "AI Tutor for Kids",
    tagline: "Gamified educational assistant using LLM models",
    plan: [
      "Design subject paths: Math, Science, Creative Writing",
      "Setup LLM safety filters to restrict responses to age-appropriate content",
      "Implement voice-to-text response features",
      "Create parent progress reporting dashboard"
    ],
    nodes: ["Web App UI", "LLM Gateway", "Safety Filter", "Child Profile DB", "Parent Emailer"],
    agents: [
      { name: "Pedagogy Expert", status: "Active" },
      { name: "LLM Filter Engine", status: "Active" },
      { name: "Frontend Engineer", status: "Idle" },
      { name: "Content Validator", status: "Idle" }
    ],
    code: `// RELIC Generated: LLM Age-Appropriate Safety Filter
export async function validatePrompt(prompt: string, childAge: number) {
  const systemContext = \`You are tutoring a \${childAge} year old child. Keep explanations simple, engaging, and strictly safe.\`;
  
  const response = await aiGateway.chat.completions({
    system: systemContext,
    userPrompt: prompt,
    temperature: 0.3
  });
  return response;
}`
  }
};

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<'idea' | 'plan' | 'arch' | 'agents' | 'code' | 'deploy'>('idea');
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof PRESETS>('yachts');
  const [ideaInput, setIdeaInput] = useState(PRESETS.yachts.title);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<string>('idle');
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [checkedPlanSteps, setCheckedPlanSteps] = useState<boolean[]>([false, false, false, false]);

  const presetData = PRESETS[selectedPreset];

  const handleSelectPreset = (key: keyof typeof PRESETS) => {
    if (isSimulating) return;
    setSelectedPreset(key);
    setIdeaInput(PRESETS[key].title);
    setCheckedPlanSteps([false, false, false, false]);
    setActiveTab('idea');
    setSimStep('idle');
    setDeployLogs([]);
  };

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setDeployLogs([]);
    setCheckedPlanSteps([false, false, false, false]);
    setSimStep('planning');
    setActiveTab('plan');
  };

  // Simulation runner effect
  useEffect(() => {
    if (!isSimulating) return;

    if (simStep === 'planning') {
      let currentStep = 0;
      const interval = setInterval(() => {
        setCheckedPlanSteps(prev => {
          const next = [...prev];
          next[currentStep] = true;
          return next;
        });
        currentStep++;
        if (currentStep >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            setSimStep('architecture');
            setActiveTab('arch');
          }, 1000);
        }
      }, 700);
      return () => clearInterval(interval);
    }

    if (simStep === 'architecture') {
      const timer = setTimeout(() => {
        setSimStep('agents');
        setActiveTab('agents');
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (simStep === 'agents') {
      const timer = setTimeout(() => {
        setSimStep('coding');
        setActiveTab('code');
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (simStep === 'coding') {
      const timer = setTimeout(() => {
        setSimStep('deploying');
        setActiveTab('deploy');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (simStep === 'deploying') {
      const logs = [
        "Initializing deployment runner...",
        "Building production bundle (Vite + TS)...",
        "Optimizing tailwind stylesheets...",
        "Executing automated security checks...",
        "Compiling database schemas...",
        "Spinning up Docker containers...",
        "Route validation succeeded.",
        "Edge routing deployed to 42 global regions.",
        "SUCCESS: Project live at production link!"
      ];
      
      let currentLogIdx = 0;
      const interval = setInterval(() => {
        setDeployLogs(prev => [...prev, logs[currentLogIdx]]);
        currentLogIdx++;
        if (currentLogIdx >= logs.length) {
          clearInterval(interval);
          setSimStep('done');
          setIsSimulating(false);
        }
      }, 500);
      return () => clearInterval(interval);
    }

  }, [isSimulating, simStep]);

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_20px_50px_rgba(20,184,166,0.08)] relative overflow-hidden group">
      
      {/* Light soft teal glow backing */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-teal-glow/10 blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-brand-teal/5 blur-[80px] pointer-events-none"></div>

      {/* Browser bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[11px] text-slate-500 font-mono w-2/3 max-w-[320px] justify-center">
          <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
          <span>relic.cto/dashboard/{selectedPreset}</span>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Main split viewport */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[420px] relative">
        
        {/* Left Sidebar Menu */}
        <div className="md:col-span-1 flex flex-col gap-1 pr-2 border-r border-slate-100 h-full">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1.5">
            Startup CTO
          </div>
          
          <button
            onClick={() => !isSimulating && setActiveTab('idea')}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'idea' 
                ? 'bg-brand-teal/10 text-brand-teal' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>1. Startup Idea</span>
          </button>

          <button
            onClick={() => !isSimulating && setActiveTab('plan')}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'plan' 
                ? 'bg-brand-teal/10 text-brand-teal' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>2. Project Plan</span>
          </button>

          <button
            onClick={() => !isSimulating && setActiveTab('arch')}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'arch' 
                ? 'bg-brand-teal/10 text-brand-teal' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>3. System Arch</span>
          </button>

          <button
            onClick={() => !isSimulating && setActiveTab('agents')}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'agents' 
                ? 'bg-brand-teal/10 text-brand-teal' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>4. Agent Builder</span>
          </button>

          <button
            onClick={() => !isSimulating && setActiveTab('code')}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'code' 
                ? 'bg-brand-teal/10 text-brand-teal' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>5. Code Gen</span>
          </button>

          <button
            onClick={() => !isSimulating && setActiveTab('deploy')}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'deploy' 
                ? 'bg-brand-teal/10 text-brand-teal' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <CloudLightning className="w-4 h-4" />
            <span>6. Deployment</span>
          </button>

          {/* Quick preset selector */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Select Preset Idea
            </div>
            <div className="flex flex-col gap-1">
              {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => (
                <button
                  key={key}
                  disabled={isSimulating}
                  onClick={() => handleSelectPreset(key)}
                  className={`text-left px-2 py-1.5 rounded text-[11px] transition-all truncate ${
                    selectedPreset === key 
                      ? 'bg-slate-100 text-slate-800 font-semibold' 
                      : 'text-slate-500 hover:text-slate-800 disabled:opacity-50'
                  }`}
                >
                  {PRESETS[key].title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="md:col-span-3 bg-slate-50 rounded-xl p-4 border border-slate-100 overflow-y-auto no-scrollbar relative flex flex-col h-full">
          
          {/* TAB 1: Startup Idea */}
          {activeTab === 'idea' && (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-brand-teal" /> Describe Your Vision
                </h3>
                <p className="text-[11px] text-slate-500 mb-4">
                  Type any business idea, and RELIC will build the core platform design, milestones, database structure, agent setups, and deploy templates.
                </p>

                <div className="relative">
                  <textarea
                    value={ideaInput}
                    onChange={(e) => setIdeaInput(e.target.value)}
                    disabled={isSimulating}
                    rows={3}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2.5 pr-8 text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-teal resize-none"
                    placeholder="Describe your startup here..."
                  />
                  <div className="absolute right-2.5 bottom-2.5 flex gap-1">
                    <span className="text-[9px] text-slate-400 font-mono px-1 py-0.5 bg-slate-50 border border-slate-100 rounded">
                      ⌘ Enter
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-teal-50/50 border border-teal-100 rounded-lg">
                  <div className="text-[10px] text-teal-800 font-semibold mb-0.5">
                    {presetData.title}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    "{presetData.tagline}"
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-end">
                <button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-1.5 bg-brand-teal text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-teal-600 shadow-sm transition-all hover:translate-x-0.5"
                >
                  {isSimulating ? 'Generating...' : 'Analyze Idea'} 
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Project Plan */}
          {activeTab === 'plan' && (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <LayoutGrid className="w-4 h-4 text-brand-teal" /> AI Startup Roadmap
                </h3>
                <p className="text-[11px] text-slate-500 mb-3">
                  RELIC analyzes scope and breaks down milestones into actionable cards.
                </p>

                <div className="flex flex-col gap-2.5">
                  {presetData.plan.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs transition-all ${
                        checkedPlanSteps[idx] 
                          ? 'bg-teal-50/40 border-teal-200/80 text-slate-700' 
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${
                        checkedPlanSteps[idx] ? 'text-brand-teal' : 'text-slate-200'
                      }`} />
                      <div className="flex-1">
                        <span className="font-semibold block mb-0.5 text-slate-800">
                          Milestone {idx + 1}
                        </span>
                        <span className="text-[11px]">
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {isSimulating && simStep === 'planning' && (
                <div className="flex items-center gap-2 mt-4 p-2 bg-brand-teal/5 border border-brand-teal/10 rounded-lg text-[10px] text-slate-600 font-mono">
                  <span className="w-2 h-2 bg-brand-teal rounded-full animate-ping"></span>
                  <span>Planning tasks & database constraints...</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: System Arch */}
          {activeTab === 'arch' && (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Workflow className="w-4 h-4 text-brand-teal" /> Auto-Generated System Architecture
                </h3>
                <p className="text-[11px] text-slate-500 mb-4">
                  Interactive flow of components engineered by the RELIC AI architect.
                </p>

                {/* Flow Visualizer */}
                <div className="flex flex-col items-center gap-3 relative py-2">
                  <div className="flex items-center gap-2 w-full justify-center">
                    <div className="px-3 py-1.5 bg-white border border-slate-200 shadow-sm rounded-lg text-[11px] font-mono text-slate-700 flex items-center gap-1">
                      <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
                      {presetData.nodes[0]}
                    </div>
                    <div className="w-6 h-[1px] bg-slate-300"></div>
                    <div className="px-3 py-1.5 bg-white border border-brand-teal/20 shadow-sm rounded-lg text-[11px] font-mono text-slate-800 flex items-center gap-1 relative">
                      <Cpu className="w-3.5 h-3.5 text-brand-teal" />
                      {presetData.nodes[1]}
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                    </div>
                  </div>

                  <div className="h-6 w-[1px] bg-slate-300"></div>

                  <div className="flex items-center gap-4 w-full justify-center">
                    <div className="px-2.5 py-1.5 bg-white border border-slate-200 shadow-sm rounded-lg text-[10px] font-mono text-slate-600 flex items-center gap-1">
                      <Database className="w-3 h-3 text-slate-400" />
                      {presetData.nodes[3]}
                    </div>
                    <div className="px-2.5 py-1.5 bg-white border border-slate-200 shadow-sm rounded-lg text-[10px] font-mono text-slate-600 flex items-center gap-1">
                      <Server className="w-3 h-3 text-slate-400" />
                      {presetData.nodes[2]}
                    </div>
                    <div className="px-2.5 py-1.5 bg-white border border-slate-200 shadow-sm rounded-lg text-[10px] font-mono text-slate-600 flex items-center gap-1">
                      <GitBranch className="w-3 h-3 text-slate-400" />
                      {presetData.nodes[4]}
                    </div>
                  </div>
                </div>
              </div>

              {isSimulating && simStep === 'architecture' && (
                <div className="flex items-center gap-2 mt-4 p-2 bg-brand-teal/5 border border-brand-teal/10 rounded-lg text-[10px] text-slate-600 font-mono">
                  <span className="w-2 h-2 bg-brand-teal rounded-full animate-ping"></span>
                  <span>Verifying connectivity & database schema normalization...</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Agent Builder */}
          {activeTab === 'agents' && (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Cpu className="w-4 h-4 text-brand-teal" /> Multi-Agent Development Team
                </h3>
                <p className="text-[11px] text-slate-500 mb-3">
                  Autonomous agents collaborate to build your code, APIs, and tests.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {presetData.agents.map((agent, idx) => {
                    const isActive = isSimulating && simStep === 'agents' && agent.status === 'Active';
                    return (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-lg border bg-white flex flex-col justify-between transition-all ${
                          isActive 
                            ? 'border-brand-teal ring-1 ring-brand-teal/20 shadow-sm' 
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-semibold text-slate-800">
                            {agent.name}
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-brand-teal animate-ping' : 'bg-slate-300'
                          }`}></span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">Activity</span>
                          <span className={isActive ? 'text-brand-teal font-medium' : 'text-slate-500'}>
                            {isActive ? 'Processing...' : 'Idle'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isSimulating && simStep === 'agents' && (
                <div className="flex items-center gap-2 mt-4 p-2 bg-brand-teal/5 border border-brand-teal/10 rounded-lg text-[10px] text-slate-600 font-mono">
                  <span className="w-2 h-2 bg-brand-teal rounded-full animate-ping"></span>
                  <span>Agents allocating container space and configuring prompts...</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Code Gen */}
          {activeTab === 'code' && (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Code2 className="w-4 h-4 text-brand-teal" /> Generated Code Output
                </h3>
                <p className="text-[11px] text-slate-500 mb-3">
                  Production-grade boilerplate code engineered with security best practices.
                </p>

                <div className="bg-slate-900 rounded-lg p-3 font-mono text-[9px] text-teal-400 overflow-x-auto max-h-[220px] shadow-inner border border-slate-800 leading-normal">
                  <pre className="text-left select-all">{presetData.code}</pre>
                </div>
              </div>

              {isSimulating && simStep === 'coding' && (
                <div className="flex items-center gap-2 mt-4 p-2 bg-brand-teal/5 border border-brand-teal/10 rounded-lg text-[10px] text-slate-600 font-mono">
                  <span className="w-2 h-2 bg-brand-teal rounded-full animate-ping"></span>
                  <span>Writing backend route handlers and schemas...</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: Deployment */}
          {activeTab === 'deploy' && (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <CloudLightning className="w-4 h-4 text-brand-teal" /> Cloud Delivery & Deploy Pipelines
                </h3>
                <p className="text-[11px] text-slate-500 mb-3">
                  Continuous delivery pipeline monitoring build compilation status.
                </p>

                <div className="bg-slate-950 rounded-lg p-3 font-mono text-[9px] text-slate-300 min-h-[160px] max-h-[180px] overflow-y-auto flex flex-col gap-1 border border-slate-900 shadow-inner">
                  {deployLogs.length === 0 ? (
                    <div className="text-slate-500 italic">Waiting to build pipeline...</div>
                  ) : (
                    deployLogs.map((log, idx) => (
                      <div 
                        key={idx} 
                        className={log.startsWith("SUCCESS") ? "text-emerald-400 font-semibold" : "text-slate-300"}
                      >
                        {log.startsWith("SUCCESS") ? "✔ " : "$ "} {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    simStep === 'done' ? 'bg-emerald-500' : isSimulating ? 'bg-amber-400 animate-pulse' : 'bg-slate-300'
                  }`}></span>
                  <span className="text-[10px] text-slate-600 font-semibold font-mono">
                    {simStep === 'done' ? 'STATUS: ACTIVE' : isSimulating ? 'STATUS: BUILDING' : 'STATUS: READY'}
                  </span>
                </div>
                {simStep === 'done' && (
                  <div className="text-[10px] text-brand-teal font-semibold font-mono bg-teal-50 border border-teal-100 px-2 py-0.5 rounded animate-bounce">
                    Live Demo Deployed!
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Floating Sparkle Action Bar */}
      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between border-t border-slate-100 pt-3">
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive simulator: click "Analyze Idea" to watch RELIC deploy a preset startup.</span>
        </div>
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className="flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all"
        >
          <Play className="w-3 h-3 text-brand-teal" />
          Run RELIC Demo
        </button>
      </div>

    </div>
  );
}
