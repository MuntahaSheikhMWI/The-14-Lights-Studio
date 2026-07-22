import React, { useEffect } from 'react';
import { PageView } from '../types';
import vrLogo from '../assets/images/vr_logo_1784728392393.png';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageView, articleId?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col selection:bg-gold-500 selection:text-black">
      {/* Header / Navbar */}
      <nav className="sticky top-0 z-40 nav-glass transition-all duration-300 w-full border-b border-slate-800/80" id="navbar" aria-label="Global Navigation">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-left focus:outline-none" aria-label="The 14 Lights Studios - Go to Homepage">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full overflow-hidden transition p-1">
              <img
                src={vrLogo}
                alt="The 14 Lights Studios Logo"
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="font-bold text-white text-base md:text-lg tracking-wider block font-sans">
                THE 14 LIGHTS
              </span>
              <span className="text-[10px] text-gold-400 font-mono tracking-widest block uppercase -mt-1">
                STUDIOS
              </span>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left text-gold-400"></i>
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono tracking-wider uppercase mb-4">
            <i className="fa-solid fa-shield-halved"></i> Privacy Policy
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
            We respect your privacy and are committed to protecting your personal information.
          </p>
          <div className="mt-4 inline-block text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
            Effective Date: 01-05-2026
          </div>
        </div>

        {/* Policy Content Card */}
        <div className="glass-panel rounded-2xl p-6 md:p-10 border border-slate-800/80 space-y-10 shadow-2xl bg-[#0a0a12]/80 backdrop-blur-md">
          {/* Section 1 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">1.</span> Overview
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Welcome to The 14 Lights. This policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed pt-2">
              By using our website, you agree to this Privacy Policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">2.</span> Information We Collect
            </h2>
            
            <div className="space-y-3 pl-2">
              <h3 className="text-base md:text-lg font-semibold text-slate-200">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-sm md:text-base pl-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (if submitted)</li>
              </ul>
            </div>

            <div className="space-y-3 pl-2 pt-2">
              <h3 className="text-base md:text-lg font-semibold text-slate-200">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-sm md:text-base pl-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
              </ul>
            </div>

            <div className="space-y-3 pl-2 pt-2">
              <h3 className="text-base md:text-lg font-semibold text-slate-200">Communication Data</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-sm md:text-base pl-2">
                <li>Messages or inquiries sent through contact forms</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">3.</span> How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm md:text-base pl-2">
              <li>Respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Analyze user behavior</li>
              <li>Maintain website security</li>
              <li>Send updates (only if you opt in)</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">4.</span> Cookies
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We use cookies to improve your experience. Cookies help us understand how visitors use our website and remember your preferences.
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed pt-1">
              You can disable cookies in your browser settings.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">5.</span> Third Party Services
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We may use trusted third-party services such as hosting providers and analytics tools (like Google Analytics). These services may collect limited data to help us operate our website.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">6.</span> Data Sharing
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We do not sell your personal information.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-sm md:text-base pl-2 pt-1">
              <li>Shared only with trusted service providers</li>
              <li>Or if required by law</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">7.</span> Data Security
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We take reasonable steps to protect your data. However, no online system is completely secure.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">8.</span> Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-sm md:text-base pl-2">
              <li>Request access to your data</li>
              <li>Request correction</li>
              <li>Request deletion</li>
            </ul>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed pt-2">
              To exercise these rights, contact us using the details below.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">9.</span> External Links
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Our website may contain links to other websites. We are not responsible for their privacy practices.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 pb-8 border-b border-slate-800/60">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">10.</span> Updates to This Policy
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-gold-400 font-mono text-lg">11.</span> Contact Us
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              If you have any questions:
            </p>
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-sm md:text-base">
              <p className="font-bold text-white text-base">The 14 Lights</p>
              <p className="text-slate-300 flex items-center gap-2">
                <i className="fa-solid fa-envelope text-gold-400"></i>
                Email: <a href="mailto:hello@the14lights.com" className="text-gold-400 hover:underline">hello@the14lights.com</a>
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <i className="fa-solid fa-globe text-gold-400"></i>
                Website: <a href="https://the14lights.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">the14lights.com</a>
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-slate-400">
          <p>© 2026 <span className="text-white font-medium">The 14 Lights.</span> All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition">Home</button>
            <button onClick={() => onNavigate('blog')} className="hover:text-gold-400 transition">Blog</button>
            <button onClick={() => onNavigate('privacy')} className="text-gold-400 font-medium">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
