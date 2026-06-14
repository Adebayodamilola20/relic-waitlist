import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import WhatRelicDoes from './components/WhatRelicDoes';
import HowItWorks from './components/HowItWorks';
import SupportedModels from './components/SupportedModels';
import FutureVision from './components/FutureVision';
import WaitlistSection from './components/WaitlistSection';
import SocialProof from './components/SocialProof';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-brand-teal/20 selection:text-teal-900">
      {/* Floating Navbar */}
      <Navbar />

      {/* Landing Page Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Problem Section */}
        <ProblemSection />

        {/* 3. What RELIC Does (Capabilities Grid) */}
        <WhatRelicDoes />

        {/* 4. How RELIC Works (Timeline Flow) */}
        <HowItWorks />

        {/* 5. Supported AI Models (Model Matrix) */}
        <SupportedModels />

        {/* 6. Future Vision (Roadmap Milestone Tracker) */}
        <FutureVision />

        {/* 7. Testimonials (Social Proof Quotes) */}
        <SocialProof />

        {/* 8. Waitlist Form (Spot Reservation Card) */}
        <WaitlistSection />

        {/* 9. FAQ Section (Collapse Accordions) */}
        <FaqSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
