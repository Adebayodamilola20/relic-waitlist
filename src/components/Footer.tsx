import { Sparkles, MessageSquare } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid Split */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo('hero')}>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-teal" />
              </div>
              <span className="font-display font-black text-lg text-white tracking-tight">
                RELIC
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Building the future of startup creation. RELIC serves as the autonomous AI CTO transforming business concepts into operational ecosystems.
            </p>
          </div>

          {/* Site Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => handleScrollTo('problems')}
                  className="hover:text-white transition-colors"
                >
                  The Friction
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('features')}
                  className="hover:text-white transition-colors"
                >
                  Capabilities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How it Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('models')}
                  className="hover:text-white transition-colors"
                >
                  Model Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Secondary Links & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company Specs</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => handleScrollTo('future')}
                  className="hover:text-white transition-colors"
                >
                  Long Term Vision
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('waitlist')}
                  className="hover:text-white transition-colors"
                >
                  Join Waitlist
                </button>
              </li>
              <li>
                <a href="mailto:hello@relic.cto" className="hover:text-white transition-colors">
                  Contact: hello@relic.cto
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} RELIC Inc. All rights reserved. Deployed at the edge.</span>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="mailto:hello@relic.cto" className="hover:text-white transition-colors" aria-label="Email">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
