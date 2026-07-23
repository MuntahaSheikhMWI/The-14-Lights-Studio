import React, { useState } from 'react';
import { PageView } from '../types';

interface NotFoundPageProps {
  onNavigate: (view: PageView, articleId?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('blog');
    }
  };

  const navToHomeSection = (sectionId: string) => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 font-sans selection:bg-gold-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-[#050507]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left"
            aria-label="The 14 Lights Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 p-[1px] shadow-lg shadow-gold-500/20 group-hover:scale-105 transition duration-300">
              <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/VR_LOGO.webp"
                  alt="The 14 Lights Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://the14lights.com/assets/VR_LOGO.webp';
                  }}
                />
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white block leading-none">
                THE 14 LIGHTS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase block mt-1 font-mono">
                STUDIO & EDTECH
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" aria-label="Main Navigation">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-gold-400 transition"
            >
              Home
            </button>
            <button
              onClick={() => navToHomeSection('top-games')}
              className="hover:text-gold-400 transition"
            >
              Portfolio
            </button>
            <button
              onClick={() => navToHomeSection('team')}
              className="hover:text-gold-400 transition"
            >
              Creators
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-gold-400 transition"
            >
              Blog
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-gold-400 transition"
            >
              Privacy
            </button>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navToHomeSection('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition shadow-lg shadow-gold-500/20"
            >
              <span>Contact Us</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-gold-400 transition"
              aria-label="Toggle Navigation Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#08090e] px-4 py-6 space-y-4 animate-fadeIn">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="block w-full text-left py-2 text-slate-200 hover:text-gold-400 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navToHomeSection('top-games');
              }}
              className="block w-full text-left py-2 text-slate-200 hover:text-gold-400 font-medium"
            >
              Portfolio
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navToHomeSection('team');
              }}
              className="block w-full text-left py-2 text-slate-200 hover:text-gold-400 font-medium"
            >
              Creators
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('blog');
              }}
              className="block w-full text-left py-2 text-slate-200 hover:text-gold-400 font-medium"
            >
              Blog
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('privacy');
              }}
              className="block w-full text-left py-2 text-slate-200 hover:text-gold-400 font-medium"
            >
              Privacy Policy
            </button>
          </div>
        )}
      </header>

      {/* Main 404 Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center my-auto">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono tracking-widest uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
          Error Code: 404
        </div>

        {/* Massive 404 Text */}
        <h1 className="text-7xl sm:text-9xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-2xl mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-wide font-display">
          Page Not Found
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          The requested path or URL could not be located in our studio archives. It may have been moved, updated, or typed incorrectly.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12 relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, AI teacher, or blog..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-full pl-5 pr-12 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-gold-500 transition shadow-inner"
              aria-label="Search Studio Content"
            />
            <button
              type="submit"
              className="absolute right-2.5 w-9 h-9 rounded-full bg-gold-500 text-black flex items-center justify-center hover:bg-gold-400 transition"
              aria-label="Submit Search"
            >
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
            </button>
          </div>
        </form>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-black font-semibold text-sm tracking-wider uppercase hover:brightness-110 transition shadow-lg shadow-gold-500/25 flex items-center gap-2"
          >
            <i className="fa-solid fa-house text-xs"></i>
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => onNavigate('blog')}
            className="px-8 py-3.5 rounded-full bg-white/5 border border-white/15 text-white font-semibold text-sm tracking-wider uppercase hover:bg-white/10 hover:border-gold-500/50 transition flex items-center gap-2"
          >
            <i className="fa-solid fa-newspaper text-xs text-gold-400"></i>
            <span>Explore Dispatches</span>
          </button>
        </div>

        {/* Quick Links Navigation Grid */}
        <div className="border-t border-white/10 pt-12 text-left">
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-mono mb-6 text-center">
            Popular Studio Destinations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-gold-500/40 hover:bg-slate-900 transition group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition">
                <i className="fa-solid fa-graduation-cap text-sm"></i>
              </div>
              <h4 className="text-white font-bold text-sm mb-1 group-hover:text-gold-400 transition">
                Pakistan Virtual AI Teacher
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Discover Pakistan's groundbreaking EdTech platform and virtual classroom avatar.
              </p>
            </button>

            <button
              onClick={() => navToHomeSection('top-games')}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-gold-500/40 hover:bg-slate-900 transition group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition">
                <i className="fa-solid fa-gamepad text-sm"></i>
              </div>
              <h4 className="text-white font-bold text-sm mb-1 group-hover:text-gold-400 transition">
                Game & VR Portfolio
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Explore Crazy FIFA 2026, Soccer Disc League, and Unreal Engine 5 projects.
              </p>
            </button>

            <button
              onClick={() => navToHomeSection('team')}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-gold-500/40 hover:bg-slate-900 transition group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition">
                <i className="fa-solid fa-users text-sm"></i>
              </div>
              <h4 className="text-white font-bold text-sm mb-1 group-hover:text-gold-400 transition">
                Creators & Leadership
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Meet Hassan Noor Soomro and the studio system designers behind 14 Lights.
              </p>
            </button>

            <button
              onClick={() => onNavigate('blog')}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-gold-500/40 hover:bg-slate-900 transition group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition">
                <i className="fa-solid fa-newspaper text-sm"></i>
              </div>
              <h4 className="text-white font-bold text-sm mb-1 group-hover:text-gold-400 transition">
                Engineering Dispatches
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Read deep dives on AI, game engine architecture, and spatial computing.
              </p>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#030304] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 <span className="text-white font-medium">The 14 Lights Studio.</span> All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition">
              Home
            </button>
            <button onClick={() => navToHomeSection('top-games')} className="hover:text-gold-400 transition">
              Portfolio
            </button>
            <button onClick={() => onNavigate('blog')} className="hover:text-gold-400 transition">
              Blog
            </button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-gold-400 transition">
              Privacy Policy
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const u = 'hello';
                const d = 'the14lights.com';
                window.location.href = `mailto:${u}@${d}`;
              }}
              className="hover:text-gold-400 transition cursor-pointer"
              aria-label="Email Studio"
            >
              Email Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
