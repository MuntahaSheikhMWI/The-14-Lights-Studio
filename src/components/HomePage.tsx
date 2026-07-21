import React, { useEffect, useRef, useState } from 'react';
import { PageView } from '../types';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'action' | 'sports' | 'rpg'>('all');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const brandsSliderRef = useRef<HTMLDivElement | null>(null);
  const testimonialsSliderRef = useRef<HTMLDivElement | null>(null);
  const gamesGridRef = useRef<HTMLDivElement | null>(null);

  // Set theme class on body
  useEffect(() => {
    document.body.className = 'antialiased selection:bg-gold-500 selection:text-black w-full overflow-x-hidden home-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  // Canvas Starfield Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const starCount = 800;
    const speed = 2;
    const colors = ['#D4AF37', '#3B82F6', '#ffffff', '#8e6f1f'];

    interface Star {
      x: number;
      y: number;
      z: number;
      o: number;
      c: string;
    }

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
          o: Math.random(),
          c: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);
    initStars();

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 7, 0.4)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const size = (1 - star.z / width) * 3;
        const opacity = 1 - star.z / width;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.fillStyle = star.c;
          ctx.globalAlpha = opacity;
          ctx.arc(px, py, Math.max(0, size), 0, Math.PI * 2);
          ctx.fill();

          if (size > 1.5) {
            ctx.beginPath();
            ctx.strokeStyle = star.c;
            ctx.lineWidth = size * 0.5;
            ctx.moveTo(px, py);
            ctx.lineTo(px + (px - cx) * 0.05, py + (py - cy) * 0.05);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Brands Slider Auto Scroll for mobile
  useEffect(() => {
    const slider = brandsSliderRef.current;
    if (!slider) return;

    let autoScroll = true;
    let animationId: number;
    let resumeTimeout: NodeJS.Timeout;
    const scrollSpeed = 0.8;

    const animate = () => {
      if (window.innerWidth < 1024 && autoScroll && slider) {
        slider.scrollLeft += scrollSpeed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const pauseAutoScroll = () => {
      autoScroll = false;
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        autoScroll = true;
      }, 2000);
    };

    slider.addEventListener('touchstart', pauseAutoScroll, { passive: true });
    slider.addEventListener('touchmove', pauseAutoScroll, { passive: true });
    slider.addEventListener('wheel', pauseAutoScroll, { passive: true });
    slider.addEventListener('mousedown', pauseAutoScroll);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resumeTimeout);
      if (slider) {
        slider.removeEventListener('touchstart', pauseAutoScroll);
        slider.removeEventListener('touchmove', pauseAutoScroll);
        slider.removeEventListener('wheel', pauseAutoScroll);
        slider.removeEventListener('mousedown', pauseAutoScroll);
      }
    };
  }, []);

  // Testimonials Slider Auto Scroll
  useEffect(() => {
    const slider = testimonialsSliderRef.current;
    if (!slider) return;

    let autoScroll = true;
    let animationId: number;
    let resumeTimeout: NodeJS.Timeout;
    const scrollSpeed = 0.6;

    const animate = () => {
      if (window.innerWidth < 1024 && autoScroll && slider) {
        slider.scrollLeft += scrollSpeed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const pauseAutoScroll = () => {
      autoScroll = false;
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        autoScroll = true;
      }, 3000);
    };

    slider.addEventListener('touchstart', pauseAutoScroll, { passive: true });
    slider.addEventListener('touchmove', pauseAutoScroll, { passive: true });
    slider.addEventListener('wheel', pauseAutoScroll, { passive: true });
    slider.addEventListener('mousedown', pauseAutoScroll);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resumeTimeout);
      if (slider) {
        slider.removeEventListener('touchstart', pauseAutoScroll);
        slider.removeEventListener('touchmove', pauseAutoScroll);
        slider.removeEventListener('wheel', pauseAutoScroll);
        slider.removeEventListener('mousedown', pauseAutoScroll);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === 'blog') {
      e.preventDefault();
      onNavigate('blog');
      setMobileMenuOpen(false);
    } else if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const elem = document.querySelector(href);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#e6eef8]">
      {/* A11y Skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top Bar */}
      <div className="hidden sm:block bg-black/40 border-b border-white/5 backdrop-blur-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between text-xs font-medium tracking-wide text-gray-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-gold-400 transition cursor-pointer" role="button" aria-label="Customer Support">
              <i className="fa-solid fa-headset text-gold-500" aria-hidden="true"></i> Support
            </span>
            <span className="flex items-center gap-2 hover:text-gold-400 transition cursor-pointer" role="button" aria-label="Select Language">
              <i className="fa-solid fa-globe text-gold-500" aria-hidden="true"></i> EN/US
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition" aria-label="Join our Discord" rel="noopener noreferrer" target="_blank"><i className="fab fa-discord"></i></a>
            <a href="#" className="hover:text-white transition" aria-label="Follow us on Twitter" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white transition" aria-label="Subscribe on YouTube" rel="noopener noreferrer" target="_blank"><i className="fab fa-youtube"></i></a>
            <a href="#" className="hover:text-white transition" aria-label="Watch on Twitch" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitch"></i></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 nav-glass transition-all duration-300 w-full" id="navbar" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-left focus:outline-none" aria-label="The 14 Lights Studios - Go to Homepage">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded overflow-hidden bg-white/5 border border-white/10 group-hover:border-gold-500/40 transition">
              <i className="fa-solid fa-cube text-gold-500 text-xl" aria-hidden="true"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-display font-bold text-white tracking-wider leading-none group-hover:text-gold-400 transition">
                The<span className="text-gold-500"> 14 Lights</span>
              </span>
              <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-200 transition">
                Studios
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-1">
            <li>
              <button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                Home
              </button>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                About
              </a>
            </li>
            <li>
              <a href="#top-games" onClick={(e) => handleNavClick(e, '#top-games')} className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#team" onClick={(e) => handleNavClick(e, '#team')} className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                Creators
              </a>
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                Blog
              </button>
            </li>
          </ul>

          {/* CTA / Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hidden md:inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-gold-400 border border-gold-500/30 rounded hover:bg-gold-500 hover:text-black transition duration-300">
              Get Started
            </a>
            <button
              id="hambtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-2xl text-gray-300 hover:text-gold-500 transition focus:outline-none p-2"
              aria-label="Open Mobile Menu"
              aria-expanded={mobileMenuOpen}
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-dark-950/95 backdrop-blur-xl border-t border-white/10 absolute w-full left-0 z-50">
            <div className="px-6 py-6 flex flex-col gap-4">
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-gold-400 font-medium py-2 border-b border-white/5">
                Home
              </button>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-gray-300 hover:text-gold-400 font-medium py-2 border-b border-white/5">
                About
              </a>
              <a href="#top-games" onClick={(e) => handleNavClick(e, '#top-games')} className="text-gray-300 hover:text-gold-400 font-medium py-2 border-b border-white/5">
                Portfolio
              </a>
              <a href="#team" onClick={(e) => handleNavClick(e, '#team')} className="text-gray-300 hover:text-gold-400 font-medium py-2 border-b border-white/5">
                Creators
              </a>
              <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-gold-400 font-medium py-2 border-b border-white/5">
                Blog
              </button>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-gold-500 font-bold mt-2 flex items-center gap-2">
                Get Started <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <header className="relative min-h-[80dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-black pt-0 md:pt-0">
        <canvas ref={canvasRef} id="innovation-canvas" className="absolute inset-0 w-full h-full z-0 opacity-80" aria-hidden="true"></canvas>

        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-transparent to-dark-950/90 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#050507_90%)] z-10 pointer-events-none"></div>

        <div className="relative z-20 w-full max-w-8xl mx-auto px-2 md:px-2 text-center flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-md mb-6 md:mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-bold text-gold-400 uppercase tracking-widest">Pioneering The Future</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-tight mb-4 md:mb-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-white glitch-text" data-text="PAKISTAN FIRST">PAKISTAN FIRST</span><br />
            <span className="text-gradient-gold drop-shadow-lg">VIRTUAL AI TEACHER</span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-xl md:max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed font-light fade-in-up px-2" style={{ animationDelay: '0.3s' }}>
            The 14 Lights Studio presents Pakistan's First Virtual AI Teacher—an advanced conversational AI classroom assistant and adaptive EdTech avatar engineered for multilingual learning in Urdu and English. Empowering educational institutions with personalized AI tutoring, spatial VR simulations, and next-generation interactive learning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full sm:w-auto fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="#top-games" onClick={(e) => handleNavClick(e, '#top-games')} className="w-full sm:w-auto btn-gold px-8 py-4 rounded font-bold uppercase tracking-wide shadow-lg shadow-gold-500/20 text-sm transform hover:scale-105 transition duration-300 text-center">
              <i className="fa-solid fa-building ml-1 mx-1" aria-hidden="true"></i> View Portfolio <i className="fa-solid fa-arrow-right ml-2" aria-hidden="true"></i>
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="w-full sm:w-auto group px-8 py-4 rounded font-bold uppercase tracking-wide border border-white/20 hover:border-gold-500/50 text-white bg-white/5 hover:bg-gold-500/10 backdrop-blur-sm transition duration-300 text-sm flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-black transition">
                <i className="fa-solid fa-phone ml-1" aria-hidden="true"></i>
              </div>
              <span>Contact Us</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-pulse-slow z-20">
          <span className="text-[10px] uppercase tracking-[0.3em] block mb-2 text-center opacity-70">Scroll</span>
          <i className="fa-solid fa-chevron-down text-xl" aria-hidden="true"></i>
        </div>
      </header>

      {/* Brands / Social Proof */}
      <section className="relative z-20 mt-10 md:mt-14 border-y border-white/10 bg-dark-900/60 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
          <div className="flex items-center justify-center lg:justify-between mb-8">
            <p className="text-center w-full text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Trusted Platform Integrations & Tech Partners
            </p>
          </div>

          <div className="relative w-full [mask-image:_linear-gradient(to_right,_transparent_0,_black_40px,_black_calc(100%-40px),_transparent_100%)] lg:[mask-image:none]">
            <div
              ref={brandsSliderRef}
              id="brandsSlider"
              className="flex lg:grid lg:grid-cols-7 lg:gap-6 gap-6 items-center lg:justify-items-center w-full overflow-x-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4 lg:py-0 cursor-grab active:cursor-grabbing lg:cursor-auto"
            >
              {[
                { name: 'Steam', icon: 'fa-brands fa-steam', src: '/platforms/steam.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
                { name: 'Xbox', icon: 'fa-brands fa-xbox', src: '/platforms/xbox.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg' },
                { name: 'PlayStation', icon: 'fa-brands fa-playstation', src: '/platforms/playstation.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
                { name: 'Unity', icon: 'fa-brands fa-unity', src: '/platforms/unitygame.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg' },
                { name: 'Unreal Engine', icon: 'fa-solid fa-cubes-stacked', src: '/platforms/unrealengine.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Unreal_Engine_logo.svg' },
                { name: 'Meta Quest', icon: 'fa-brands fa-meta', src: '/platforms/meta.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
                { name: 'NVIDIA', icon: 'fa-solid fa-microchip', src: '/platforms/nvidia.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
              ].map((brand, idx) => (
                <div
                  key={idx}
                  className="brand-item flex-shrink-0 flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/40 hover:bg-white/10 min-w-[140px] lg:min-w-0 opacity-85 hover:opacity-100 transition-all duration-300 select-none group"
                >
                  <i className={`${brand.icon} text-2xl text-gold-400 group-hover:scale-110 transition duration-300`} aria-hidden="true"></i>
                  <span className="text-xs font-bold text-gray-200 group-hover:text-white transition whitespace-nowrap tracking-wide">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content">
        {/* About Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28" id="about">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold tracking-widest uppercase">
                About
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl xl:text-6xl font-black leading-tight text-white">
                Building the Future with{' '}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  AI, Games & XR
                </span>
              </h2>

              <p className="mt-8 text-lg leading-8 text-slate-300">
                <strong className="text-white">The 14 Lights Studio</strong> is an immersive technology powerhouse specializing in proprietary EdTech AI platforms, custom Game Development, and Extended Reality (XR). We bridge cutting-edge artificial intelligence with interactive 3D spatial computing to redefine digital education, enterprise training, and global gaming entertainment.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Our flagship product, the <strong>Pakistan Virtual AI Teacher</strong>, integrates real-time natural language processing, multilingual Urdu and English voice synthesis, and adaptive curriculum algorithms to deliver 1-on-1 personalized tutoring for schools and self-directed learners across Pakistan.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 transition text-black font-bold">
                  Get Started
                </a>
                <a href="#top-games" onClick={(e) => handleNavClick(e, '#top-games')} className="px-7 py-3 rounded-xl border border-white/15 hover:border-amber-500 text-white transition">
                  Explore Services
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group rounded-3xl p-7 bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-amber-400/50 hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                    <i className="fa-solid fa-gamepad text-amber-400 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">🎮 Game Development</h3>
                  <p className="text-slate-400 leading-7 text-sm">
                    Full-cycle PC, Mobile, Console, and VR game engineering using <a href="https://www.unrealengine.com/" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300">Unreal Engine 5</a> &amp; <a href="https://unity.com/" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300">Unity</a>.
                  </p>
                </div>

                <div className="group rounded-3xl p-7 bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-blue-400/50 hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <i className="fa-solid fa-robot text-blue-400 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">🤖 AI &amp; Virtual Reality</h3>
                  <p className="text-slate-400 leading-7 text-sm">
                    Interactive classroom avatars and localized <a href="https://ai.google/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Generative AI</a> models powering the Pakistan Virtual AI Teacher.
                  </p>
                </div>

                <div className="group rounded-3xl p-7 bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/50 hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                    <i className="fa-solid fa-vr-cardboard text-purple-400 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">🥽 XR Solutions</h3>
                  <p className="text-slate-400 leading-7 text-sm">
                    Immersive AR, VR, and Spatial Computing simulations designed for modern education, healthcare, and industrial workforce training.
                  </p>
                </div>

                <div className="group rounded-3xl p-7 bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-green-400/50 hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                    <i className="fa-solid fa-laptop-code text-green-400 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">🚀 Cross Platform</h3>
                  <p className="text-slate-400 leading-7 text-sm">
                    Multi-platform deployment spanning <a href="https://www.meta.com/quest/" target="_blank" rel="noopener noreferrer" className="text-green-400 underline hover:text-green-300">Meta Quest</a>, Windows, Android, iOS, PlayStation, and Xbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio / Games Section */}
        <section id="top-games" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6 relative overflow-hidden" aria-label="Studio Portfolio">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 relative z-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Our Studio Portfolio</h2>
              <p className="text-gray-400 mt-2 text-sm md:text-base">Award-winning titles developed and published by our team.</p>
            </div>

            <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm self-start md:self-auto" role="tablist">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all duration-300 ${activeTab === 'all' ? 'text-black bg-gold-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                role="tab"
                aria-selected={activeTab === 'all'}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('action')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all duration-300 ${activeTab === 'action' ? 'text-black bg-gold-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                role="tab"
                aria-selected={activeTab === 'action'}
              >
                Action
              </button>
              <button
                onClick={() => setActiveTab('sports')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all duration-300 ${activeTab === 'sports' ? 'text-black bg-gold-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                role="tab"
                aria-selected={activeTab === 'sports'}
              >
                Sports
              </button>
              <button
                onClick={() => setActiveTab('rpg')}
                className={`px-4 py-2 rounded text-xs font-bold transition-all duration-300 ${activeTab === 'rpg' ? 'text-black bg-gold-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                role="tab"
                aria-selected={activeTab === 'rpg'}
              >
                RPG
              </button>
            </div>
          </div>

          <div className="relative w-full [mask-image:_linear-gradient(to_right,_transparent_0,_black_40px,_black_calc(100%-40px),_transparent_100%)] lg:[mask-image:none]">
            <div
              ref={gamesGridRef}
              id="gamesGrid"
              className="flex lg:grid lg:grid-cols-4 gap-6 w-full overflow-x-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4 lg:py-0 cursor-grab active:cursor-grabbing lg:cursor-auto items-stretch"
            >
              {/* Card 1: Rogue Strike */}
              {(activeTab === 'all' || activeTab === 'action') && (
                <article className="game-card original-card group relative bg-dark-800 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition duration-300 flex-shrink-0 w-[85vw] sm:w-[340px] lg:w-auto" data-category="action">
                  <div className="aspect-[3/4] relative overflow-hidden bg-black pointer-events-none">
                    <img src="https://i.ytimg.com/vi/-kyhy0ZcY6g/hq720.jpg" alt="Rogue Strike Game Cover" width={720} height={405} loading="lazy" draggable="false" className="w-full h-full object-cover scale-105 blur-[4px] brightness-50 transition-all duration-500" />
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="px-6 py-3 rounded-full border border-gold-500/30 bg-black/70 backdrop-blur-md shadow-lg">
                        <span className="text-gold-400 text-sm font-bold uppercase tracking-[0.2em]">Coming Soon</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gold-400 border border-gold-500/20 z-30">TBA</div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-5 z-30 flex flex-col justify-end pointer-events-none">
                    <span className="text-xs text-gold-500 font-bold uppercase tracking-wider mb-1 block">Action</span>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">Rogue Strike</h3>
                    <p className="text-sm text-gray-400 mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 h-auto lg:h-0 lg:group-hover:h-auto overflow-hidden transition-all duration-300">
                      An intense tactical action shooter currently in development.
                    </p>
                    <button disabled className="w-full py-2.5 rounded uppercase text-xs font-bold bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed pointer-events-auto">
                      Coming Soon
                    </button>
                  </div>
                </article>
              )}

              {/* Card 2: Crazy FIFA 2026 */}
              {(activeTab === 'all' || activeTab === 'sports') && (
                <article className="game-card original-card group relative bg-dark-800 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition duration-300 flex-shrink-0 w-[85vw] sm:w-[340px] lg:w-auto" data-category="sports">
                  <div className="aspect-[3/4] relative overflow-hidden bg-black pointer-events-none">
                    <img src="https://the14lights.com/assets/games/CrazyFIFA2026.png" alt="Crazy FIFA 2026 Game Cover" width={676} height={900} loading="lazy" draggable="false" className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-40 z-20 relative" onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800';
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90 z-30"></div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gold-400 border border-gold-500/20 z-30">8.8</div>
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition duration-300">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow-md">Live Preview</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-5 z-30 lg:translate-y-4 lg:group-hover:translate-y-0 transition duration-300 pointer-events-none">
                    <span className="text-xs text-gold-500 font-bold uppercase tracking-wider mb-1 block">Sports</span>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">Crazy FIFA 2026</h3>
                    <p className="text-sm text-gray-400 mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 h-auto lg:h-0 lg:group-hover:h-auto overflow-hidden transition-all duration-300">
                      Crazy FIFA 2026 is a fast-paced football game where every match is played at extreme speed. Test your reflexes and score amazing goals.
                    </p>
                    <a
                      href="https://the14lights.com/games/CrazyFIFA2026/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-2.5 bg-white/10 hover:bg-gold-500 hover:text-black text-white text-xs font-bold rounded uppercase transition pointer-events-auto active:scale-95"
                    >
                      Play Now
                    </a>
                  </div>
                </article>
              )}

              {/* Card 3: Soccer Disc League */}
              {(activeTab === 'all' || activeTab === 'sports') && (
                <article className="game-card original-card group relative bg-black rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition duration-300 flex-shrink-0 w-[85vw] sm:w-[340px] lg:w-auto" data-category="sports">
                  <div className="aspect-[4/4] relative overflow-hidden bg-black pointer-events-none flex items-center justify-center">
                    <img src="https://the14lights.com/soccerdisc-league.png" alt="Soccer Disc League" width={677} height={369} loading="lazy" draggable="false" className="w-full h-auto object-contain transition duration-500 group-hover:scale-105 group-hover:opacity-40 z-20 relative" onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800';
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90 z-30"></div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gold-400 border border-gold-500/20 z-30">9.5</div>
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition duration-300">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow-md">Play Now</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-5 z-30 lg:translate-y-4 lg:group-hover:translate-y-0 transition duration-300 pointer-events-none">
                    <span className="text-xs text-gold-500 font-bold uppercase tracking-wider mb-1 block">Sports</span>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">Soccer Disc League</h3>
                    <p className="text-sm text-gray-400 mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 h-auto lg:h-0 lg:group-hover:h-auto overflow-hidden transition-all duration-300">
                      Flick, aim, and score spectacular goals in this fast-paced football challenge. Become the ultimate champion.
                    </p>
                    <a
                      href="https://the14lights.com/TS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 text-center bg-white/10 hover:bg-gold-500 hover:text-black text-white text-xs font-bold rounded uppercase transition pointer-events-auto active:scale-95"
                    >
                      Play Game
                    </a>
                  </div>
                </article>
              )}

              {/* Card 4: Veil of Mirrors */}
              {(activeTab === 'all' || activeTab === 'action') && (
                <article className="game-card original-card group relative bg-dark-800 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition duration-300 opacity-95 flex-shrink-0 w-[85vw] sm:w-[340px] lg:w-auto" data-category="action">
                  <div className="aspect-[3/4] relative overflow-hidden bg-black pointer-events-none">
                    <img src="https://i.ytimg.com/vi/BpnAFSeir5U/hq720.jpg" alt="Veil of Mirrors Game Cover" width={720} height={405} loading="lazy" draggable="false" className="w-full h-full object-cover scale-105 blur-[4px] brightness-50 transition-all duration-500" />
                    <div className="absolute inset-0 bg-black/40 z-10"></div>

                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <div className="px-6 py-3 rounded-full border border-gold-500/30 bg-black/70 backdrop-blur-md">
                        <span className="text-gold-400 font-bold uppercase tracking-[0.2em] text-sm">Coming Soon</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gold-400 border border-gold-500/20 z-30">TBA</div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-5 z-30 pointer-events-none">
                    <span className="text-xs text-gold-500 font-bold uppercase tracking-wider mb-1 block">Action</span>
                    <h3 className="text-xl font-bold text-white mb-2">Veil of Mirrors</h3>
                    <p className="text-sm text-gray-400 mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 h-auto lg:h-0 lg:group-hover:h-auto overflow-hidden transition-all duration-300">
                      A new cinematic action adventure is currently in development.
                    </p>
                    <button disabled className="w-full py-2.5 rounded uppercase text-xs font-bold bg-white/5 text-gray-500 cursor-not-allowed border border-white/10 pointer-events-auto">
                      Coming Soon
                    </button>
                  </div>
                </article>
              )}
            </div>
          </div>

          <div className="mt-12 text-center relative z-20">
            <a href="#" className="inline-block border-b border-gray-600 text-gray-400 hover:text-white hover:border-white pb-1 transition uppercase text-xs font-bold tracking-widest">Load More Games</a>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section id="team" className="relative min-h-screen flex items-center justify-center py-20 md:py-32 bg-black overflow-hidden" aria-label="Meet the Team Members">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black pointer-events-none"></div>

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-18 flex flex-col items-center">
              <span className="inline-block py-1.5 px-4 rounded-full bg-gold-500/5 border border-gold-500/20 text-xs font-bold text-gold-500 uppercase tracking-[0.2em] mb-5 shadow-[0_0_20px_rgba(212,175,55,0.05)] backdrop-blur-sm">
                The Creators
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 tracking-tight">
                Meet the Team
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 xl:gap-y-14">
              {[
                { name: 'Hassan Noor Soomro', role: 'Founder & System Designer', bio: 'Architect behind Pakistan Virtual AI Teacher and studio system design.', img: 'https://the14lights.com/assets/team/HNS.jpeg', animSpeed: '12s' },
                { name: 'Anum Shakeel', role: 'Chief Marketing Officer', bio: 'Directing global brand strategy, growth, and EdTech partnerships.', img: 'https://the14lights.com/assets/team/anum.jpeg', animSpeed: '10s' },
                { name: 'Dr Danish Nazir', role: '3D Artist & Developer', bio: 'Specializing in high-fidelity 3D modeling, spatial rendering, and VR assets.', img: 'https://the14lights.com/assets/team/Danish.jpeg', animSpeed: '11s' },
                { name: 'Ali', role: 'Animator & Rigger', bio: 'Expert in character rigging, facial capture, and smooth avatar locomotion.', img: 'https://the14lights.com/assets/team/Ali%20Animator%20and%20Rigger.jpeg', animSpeed: '13s' },
                { name: 'Ahmed Shahab', role: 'UI/UX Game Designer', bio: 'Designing intuitive player interfaces and fluid mobile touch controls.', img: 'https://the14lights.com/assets/team/ahmed.jpeg', animSpeed: '14s' },
                { name: 'Muhammad Sheroz', role: 'Security Expert', bio: 'Ensuring enterprise-grade data privacy, cloud protection, and server resilience.', img: 'https://the14lights.com/assets/team/sheroz.jpeg', animSpeed: '15s' },
              ].map((member, idx) => (
                <div key={idx} className="group flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-36 h-36 md:w-40 md:h-40 mb-6">
                    <div className="absolute inset-0 rounded-full border border-gold-500/20 group-hover:border-gold-500/80 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-700 animate-[spin_12s_linear_infinite] z-10"></div>
                    <div className="absolute inset-1 rounded-full overflow-hidden bg-neutral-900">
                      <img
                        src={member.img}
                        alt={`${member.name} - ${member.role}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${1534528741775 + idx}?q=80&w=400`;
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 transition-colors duration-300 group-hover:text-gold-500">
                    {member.name}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 font-medium uppercase tracking-[0.15em] mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pitch Banner */}
        <div id="contact" className="mt-24 mx-4 sm:mx-16 p-8 rounded-[2rem] bg-gradient-to-r from-neutral-950 to-neutral-900 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Ready to start a project?</h3>
            <p className="text-neutral-400 text-sm">Our specialists are currently accepting high-profile collaborations.</p>
          </div>
          <button className="w-full md:w-auto px-10 py-4 bg-gold-500 text-black text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:scale-105 hover:bg-white transition-all duration-300">
            Get In Touch
          </button>
        </div>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-dark-900/30 relative overflow-hidden" aria-label="Community Feedback">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/3 w-80 h-80 bg-gold-500/5 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold-500/5 blur-3xl rounded-full"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-gold-500 uppercase tracking-[0.35em] text-xs font-semibold">Community Feedback</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-white">Trusted Around the World</h2>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Players, developers, founders, and creators from different countries have shared their experience working and playing with The 14 Lights.
              </p>
            </div>

            <div className="relative w-full [mask-image:_linear-gradient(to_right,_transparent_0,_black_40px,_black_calc(100%-40px),_transparent_100%)] lg:[mask-image:none]">
              <div
                ref={testimonialsSliderRef}
                id="testimonialsSlider"
                className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 w-full overflow-x-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4 lg:py-0 cursor-grab active:cursor-grabbing lg:cursor-auto items-stretch"
              >
                {[
                  {
                    name: 'Ahmed Raza',
                    stars: 4,
                    quote: 'The 14 Lights combines creativity with solid engineering. Their attention to detail and gameplay polish makes every project feel premium.',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8hsQ4mcX0jPVTM1XU7udvYod5ioGQyT7RI4nyEcn4_3KFQaKSgSNxPqk&s=10',
                  },
                  {
                    name: 'Ayesha Khan',
                    stars: 5,
                    quote: 'Working with the team was effortless. Their VR expertise, communication, and creativity exceeded every expectation.',
                    img: 'https://hospitals.aku.edu/pakistan/patientservices/Lists/Faculty/Attachments/105/Slide17.JPG',
                  },
                  {
                    name: 'Oliver Bennett',
                    stars: 5,
                    quote: 'Their professionalism and development workflow are outstanding. Every milestone arrived on time with exceptional quality.',
                    img: 'https://randomuser.me/api/portraits/men/41.jpg',
                  },
                  {
                    name: 'Sophie Müller',
                    stars: 5,
                    quote: 'Beautiful design, polished user experience, and a team that genuinely cares about delivering quality products.',
                    img: 'https://randomuser.me/api/portraits/women/33.jpg',
                  },
                  {
                    name: 'Takumi Sato',
                    stars: 4,
                    quote: "I appreciate the team's technical excellence and careful attention to optimization. Their work consistently meets high industry standards.",
                    img: 'https://randomuser.me/api/portraits/men/22.jpg',
                  },
                  {
                    name: 'Yuki Nakamura',
                    stars: 5,
                    quote: 'Creative direction, smooth collaboration, and polished execution. Every interaction reflected professionalism and passion for games.',
                    img: 'https://randomuser.me/api/portraits/women/21.jpg',
                  },
                ].map((item, idx) => (
                  <article
                    key={idx}
                    className="glass-panel relative rounded-2xl p-6 md:p-8 border border-white/5 bg-white/5 backdrop-blur-sm hover:border-gold-500/20 transition-all duration-300 lg:hover:-translate-y-2 flex-shrink-0 w-[85vw] sm:w-[340px] lg:w-auto select-none"
                  >
                    <i className="fa-solid fa-quote-right absolute top-6 right-6 text-4xl text-white/5 pointer-events-none"></i>
                    <div className="flex items-center gap-4 mb-6 pointer-events-none">
                      <img
                        src={item.img}
                        alt={item.name}
                        width={48}
                        height={48}
                        loading="lazy"
                        draggable="false"
                        className="w-12 h-12 rounded-full border border-white/10 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://randomuser.me/api/portraits/lego/${idx}.jpg`;
                        }}
                      />
                      <div>
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <div className="flex gap-1 mt-1 text-gold-500 text-xs">
                          {Array.from({ length: 5 }).map((_, starIdx) => (
                            <i
                              key={starIdx}
                              className={`fa-solid fa-star ${starIdx < item.stars ? 'text-gold-500' : 'text-white/10'}`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-7">"{item.quote}"</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-14 md:pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-4 group text-left">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-gold-500/40 transition">
                  <i className="fa-solid fa-cube text-gold-500 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                    The <span className="text-gold-500">14 Lights</span>
                  </h3>
                  <p className="text-sm text-gray-400">AI • Games • XR • Digital Innovation</p>
                </div>
              </button>

              <p className="mt-7 max-w-2xl text-gray-400 leading-8 text-sm">
                <span className="text-white font-medium">The 14 Lights</span> is an immersive technology studio specializing in game development, AI, Virtual Reality, and XR solutions. We build innovative experiences for gaming, education, training, and enterprise.
              </p>

              <nav className="mt-8">
                <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                  <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="text-gray-400 hover:text-gold-500 transition">About Us</a></li>
                  <li><a href="#team" onClick={(e) => handleNavClick(e, '#team')} className="text-gray-400 hover:text-gold-500 transition">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-gold-500 transition" aria-label="Privacy Policy">Privacy Policy</a></li>
                  <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="text-gray-400 hover:text-gold-500 transition">Contact</a></li>
                </ul>
              </nav>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Contact Information</h3>
              <div className="space-y-5">
                <a href="mailto:hello@the14lights.com" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Email</p>
                    <p className="text-white text-sm group-hover:text-gold-500 transition">hello@the14lights.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-500">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Location</p>
                    <p className="text-white text-sm">Karachi, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-white font-medium mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition" aria-label="Facebook Profile"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition" aria-label="LinkedIn Profile"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition" aria-label="YouTube Channel"><i className="fab fa-youtube"></i></a>
                  <a href="#" className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:bg-gold-500 hover:border-gold-500 hover:text-black transition" aria-label="Instagram Profile"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <p className="text-sm text-gray-400 text-center md:text-left">
                © 2026 <span className="text-white font-medium">The 14 Lights.</span> Building the Future with AI, Games & XR.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-gold-500 transition" aria-label="Terms of Service">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-gold-500 transition" aria-label="Privacy Policy">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
