import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-white/70 backdrop-blur-md border-b border-slate-100 shadow-sm' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div
            onClick={() => handleScrollTo('hero')}
            className="cursor-pointer group"
          >
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-slate-950 leading-none">
              RELIC
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleScrollTo('problems')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              The Friction
            </button>
            <button 
              onClick={() => handleScrollTo('features')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Capabilities
            </button>
            <button 
              onClick={() => handleScrollTo('how-it-works')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              How it Works
            </button>
            <button 
              onClick={() => handleScrollTo('models')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Model Matrix
            </button>
            <button 
              onClick={() => handleScrollTo('future')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Vision
            </button>
            <button 
              onClick={() => handleScrollTo('faq')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleScrollTo('waitlist')}
              className="flex items-center gap-1 bg-black hover:bg-black/90 text-white font-semibold text-xs px-4 py-2 rounded-lg hover:shadow-md transition-all group active:scale-95"
            >
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 shadow-lg absolute top-full left-0 w-full animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
            <button 
              onClick={() => handleScrollTo('problems')}
              className="text-left py-2 font-medium text-slate-600 hover:text-slate-900 border-b border-slate-50"
            >
              The Friction
            </button>
            <button 
              onClick={() => handleScrollTo('features')}
              className="text-left py-2 font-medium text-slate-600 hover:text-slate-900 border-b border-slate-50"
            >
              Capabilities
            </button>
            <button 
              onClick={() => handleScrollTo('how-it-works')}
              className="text-left py-2 font-medium text-slate-600 hover:text-slate-900 border-b border-slate-50"
            >
              How it Works
            </button>
            <button 
              onClick={() => handleScrollTo('models')}
              className="text-left py-2 font-medium text-slate-600 hover:text-slate-900 border-b border-slate-50"
            >
              Model Matrix
            </button>
            <button 
              onClick={() => handleScrollTo('future')}
              className="text-left py-2 font-medium text-slate-600 hover:text-slate-900 border-b border-slate-50"
            >
              Vision
            </button>
            <button 
              onClick={() => handleScrollTo('faq')}
              className="text-left py-2 font-medium text-slate-600 hover:text-slate-900 border-b border-slate-50"
            >
              FAQ
            </button>
            <button
              onClick={() => handleScrollTo('waitlist')}
              className="flex items-center justify-center gap-1.5 w-full bg-black hover:bg-black/90 text-white font-semibold py-2.5 rounded-lg shadow mt-2"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
