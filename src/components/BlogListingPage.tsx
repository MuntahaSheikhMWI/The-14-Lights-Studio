import React, { useEffect, useState } from 'react';
import { PageView } from '../types';
import { BLOG_ARTICLES, BlogArticleData } from '../data/blogArticles';
import vrLogo from '../assets/images/vr_logo_1784728392393.png';

interface BlogListingPageProps {
  onNavigate: (page: PageView, articleId?: string) => void;
}

export const BlogListingPage: React.FC<BlogListingPageProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'products' | 'services' | 'engineering'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Set blog theme on body
  useEffect(() => {
    document.body.className = 'antialiased selection:bg-gold-500 selection:text-black w-full overflow-x-hidden blog-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberEmail && subscriberEmail.includes('@') && subscriberEmail.includes('.')) {
      setNewsletterStatus('success');
      setSubscriberEmail('');
    } else {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155]">
      {/* Reading Progress Bar */}
      <div id="scroll-progress" aria-hidden="true" style={{ width: '0%' }}></div>

      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top Info Bar */}
      <div className="hidden sm:block bg-slate-50 border-b border-slate-200 backdrop-blur-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between text-xs font-medium tracking-wide text-slate-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-gold-600 transition cursor-pointer" role="button" aria-label="Support Desk">
              <i className="fa-solid fa-headset text-gold-600" aria-hidden="true"></i> Support
            </span>
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <span className="bg-gold-500/20 text-gold-600 px-2 py-0.5 rounded border border-gold-500/30">NEW</span>
              Pakistan's First Virtual AI Teacher is Live!
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-900 transition" aria-label="Discord Server" rel="noopener noreferrer" target="_blank"><i className="fab fa-discord"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="Twitter Profile" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="YouTube Channel" rel="noopener noreferrer" target="_blank"><i className="fab fa-youtube"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="LinkedIn Profile" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 nav-glass transition-all duration-300 w-full" id="navbar" aria-label="Global Navigation">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-left focus:outline-none" aria-label="The 14 Lights Studios - Go to Homepage">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full overflow-hidden transition p-1">
              <img
                src={vrLogo}
                alt="The 14 Lights Studios Logo"
                width={48}
                height={48}
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/vr_logo_1784728392393.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-display font-bold text-slate-900 tracking-wider leading-none group-hover:text-gold-600 transition">
                The<span className="text-gold-600"> 14 Lights</span>
              </span>
              <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition">
                Studios
              </span>
            </div>
          </button>

          {/* Menu Links */}
          <ul className="hidden lg:flex items-center gap-1">
            <li>
              <button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
                Services
              </button>
            </li>
            <li className="relative group" onMouseEnter={() => setProductsDropdownOpen(true)} onMouseLeave={() => setProductsDropdownOpen(false)}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
                Products <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg z-50">
                  <button onClick={() => onNavigate('article')} className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-gold-500/10 hover:text-gold-600 font-medium rounded-lg">
                    Virtual AI Teacher <span className="ml-1 inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  </button>
                </div>
              )}
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="px-4 py-2 rounded-full text-sm font-medium text-gold-600 bg-gold-500/10 border border-gold-500/20 transition">
                Blog
              </button>
            </li>
          </ul>

          {/* CTA & Burger */}
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="hidden md:inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-gold-600 border border-gold-500/30 rounded hover:bg-gold-500 hover:text-slate-900 transition duration-300">
              Partner With Us
            </button>
            <button
              id="hambtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-2xl text-slate-600 hover:text-gold-600 transition focus:outline-none p-2"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobileMenu" className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 absolute w-full left-0 z-50 shadow-lg">
            <div className="px-6 py-6 flex flex-col gap-4">
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">
                Home
              </button>
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">
                Services
              </button>
              <button onClick={() => { onNavigate('article'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100 flex justify-between items-center">
                Products <span className="text-[10px] bg-gold-500 text-slate-900 px-2 py-1 rounded font-bold">AI Teacher</span>
              </button>
              <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className="text-left text-gold-600 font-bold py-2 border-b border-slate-100">
                Blog
              </button>
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-gold-600 font-bold mt-2 flex items-center gap-2">
                Partner With Us <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Wrapper */}
      <main id="main-content" className="relative z-20">
        {/* Blog Hero: Product Spotlight */}
        <section className="relative pt-2 pb-16 md:py-8 overflow-hidden" aria-labelledby="featured-story-title">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-gold-500"></span>
              <span className="text-xs uppercase tracking-[0.3em] font-display font-bold text-gold-600">Product Spotlight</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="group relative rounded-2xl overflow-hidden border border-slate-200/80 aspect-[16/9] lg:aspect-auto lg:h-full bg-slate-100 shadow-xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 to-blue-500 rounded-2xl opacity-10 blur-xl transition group-hover:opacity-20 duration-700"></div>

                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                    alt="AI technology interfacing with education networks"
                    className="absolute inset-0 w-full h-full object-cover transition duration-1000 group-hover:scale-[1.03] group-hover:opacity-95"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-gold-500 text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded">Innovation</span>
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur text-white text-[10px] uppercase tracking-wider rounded border border-white/10">AI Product</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                    <span className="text-xs text-gold-400 font-bold uppercase tracking-wider block mb-2">EdTech Revolution</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">Pakistan's First Virtual AI Teacher: Redefining Digital Education</h2>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="hidden lg:block">
                  <span className="text-xs text-gold-600 font-bold uppercase tracking-widest block mb-3">Department: Products</span>
                  <h2 id="featured-story-title" className="text-3xl xl:text-4xl font-display font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-gold-600 transition">
                    Pakistan's First Virtual AI Teacher is Here
                  </h2>
                </div>
                <div className="lg:hidden">
                  <p className="text-xs text-gold-600 font-bold uppercase tracking-widest block mb-2">Department: Products</p>
                </div>

                <div className="bg-slate-50 border-l-4 border-gold-500 p-4 mb-6 rounded-r">
                  <p className="text-slate-700 text-sm font-medium">
                    <strong>What is the Virtual AI Teacher?</strong> Developed by The 14 Lights Studio, it is Pakistan's first generative AI-powered educational platform. It provides real-time, personalized tutoring, adapts to individual learning paces, and bridges the accessibility gap in modern EdTech infrastructure.
                  </p>
                </div>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  Beyond our core services, we are pioneering the product space. Discover the complex NLP architecture and local cultural datasets we used to engineer a seamlessly interactive AI educator.
                </p>

                <div className="flex items-center gap-4 mb-8 pt-4 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full border-2 border-gold-500/30 flex items-center justify-center bg-slate-100 text-slate-700 font-bold">14L</div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900">The 14 Lights Team</span>
                    <span className="block text-xs text-slate-500">Product Engineering • 6 min read</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide')} className="btn-gold text-center px-6 py-3 rounded font-bold uppercase tracking-wide text-xs shadow-sm hover:shadow">
                    Read Case Study <i className="fa-solid fa-arrow-right-long ml-2"></i>
                  </button>
                  <button onClick={() => onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide')} className="px-6 py-3 border border-slate-200 hover:border-gold-500/40 text-slate-700 rounded font-bold uppercase tracking-wide text-xs transition bg-slate-50 hover:bg-gold-500/5">
                    <i className="fa-solid fa-robot mr-2"></i> Try Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Filtering & Search Section */}
        <section className="sticky top-[64px] md:top-[72px] z-30 py-4 bg-white/95 backdrop-blur-md border-y border-slate-200" aria-label="Search and Categorization">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
              <button
                onClick={() => setActiveCategory('all')}
                className={`category-btn whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === 'all' ? 'bg-gold-500 text-slate-900 border border-gold-500' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'}`}
                role="tab"
                aria-selected={activeCategory === 'all'}
              >
                All Stories
              </button>
              <button
                onClick={() => setActiveCategory('products')}
                className={`category-btn whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === 'products' ? 'bg-gold-500 text-slate-900 border border-gold-500' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'}`}
                role="tab"
                aria-selected={activeCategory === 'products'}
              >
                Products (AI)
              </button>
              <button
                onClick={() => setActiveCategory('services')}
                className={`category-btn whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === 'services' ? 'bg-gold-500 text-slate-900 border border-gold-500' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'}`}
                role="tab"
                aria-selected={activeCategory === 'services'}
              >
                Services
              </button>
              <button
                onClick={() => setActiveCategory('engineering')}
                className={`category-btn whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === 'engineering' ? 'bg-gold-500 text-slate-900 border border-gold-500' : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'}`}
                role="tab"
                aria-selected={activeCategory === 'engineering'}
              >
                Engineering
              </button>
            </div>

            <div className="relative w-full md:w-72 lg:w-96 shrink-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technical articles or products..."
                aria-label="Search blog posts"
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-9 pr-8 text-xs text-slate-900 focus:outline-none focus:border-gold-500 focus:bg-white transition-all placeholder:text-slate-400 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-400 hover:text-slate-900"
                  aria-label="Clear Search Input"
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              {searchQuery && (
                <div className="text-sm text-slate-500 mb-2">
                  Found <span className="text-gold-600 font-bold">{filteredArticles.length}</span> articles matching your query.
                </div>
              )}

              <div id="articles-wrapper" className="grid sm:grid-cols-2 gap-6 transition-all duration-300">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => onNavigate('article', article.id)}
                    className="article-card glass-panel rounded-2xl overflow-hidden card-scale flex flex-col group cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200">
                          {article.categoryLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-gold-600 transition leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 flex-grow">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 relative z-10">
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                            {article.authorInitials}
                          </div>
                          <span className="text-[10px] font-medium text-slate-700">{article.author}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{article.date} • {article.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 flex flex-col gap-8 sticky top-[150px]">
              <div className="glass-panel rounded-2xl p-6 border-t-4 border-t-gold-500">
                <h4 className="font-display font-bold text-slate-900 mb-4 text-lg">Our Departments</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-slate-100 p-2 rounded text-gold-600"><i className="fa-solid fa-code"></i></div>
                    <div>
                      <button onClick={() => onNavigate('home')} className="font-bold text-slate-800 hover:text-gold-600 transition text-sm block text-left">
                        1. Services
                      </button>
                      <p className="text-xs text-slate-500 mt-1">Full-stack game dev, web platforms, and custom digital esports infrastructure.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-slate-100 p-2 rounded text-gold-600"><i className="fa-solid fa-microchip"></i></div>
                    <div>
                      <button onClick={() => onNavigate('article')} className="font-bold text-slate-800 hover:text-gold-600 transition text-sm block text-left">
                        2. Products
                      </button>
                      <p className="text-xs text-slate-500 mt-1">Building proprietary tools, led by Pakistan's First Virtual AI Teacher platform.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold-sheen opacity-10 group-hover:opacity-20 transition duration-500"></div>
                <h4 className="font-display font-bold text-gold-400 mb-2">Build With Us</h4>
                <p className="text-sm text-slate-300 mb-6">Need a custom AI product or high-tier digital service? Get a direct technical consultation.</p>
                <button onClick={() => onNavigate('home')} className="btn-gold block w-full text-center px-4 py-2 rounded text-xs font-bold uppercase tracking-wide">
                  Book Strategy Call
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* Dynamic Newsletter & Subscriber Form */}
        <section className="py-16 bg-slate-50 border-t border-slate-200 relative" aria-labelledby="newsletter-title">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <span className="text-xs text-gold-600 uppercase tracking-widest font-bold block mb-2">Technical Journal Updates</span>
            <h2 id="newsletter-title" className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-3">Subscribe to The Studio Dispatch</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-8">Receive technical breakdowns, engineering diaries, and early playtest openings directly in your inbox.</p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto relative flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                required
                placeholder="Enter developer email address"
                aria-label="Subscriber Email Address"
                className="flex-1 bg-white border border-slate-200 focus:border-gold-500 rounded px-4 py-3 text-sm text-slate-900 focus:outline-none transition shadow-sm"
              />
              <button type="submit" className="btn-gold px-6 py-3 rounded font-bold uppercase tracking-wide text-xs shadow-sm hover:shadow">
                Subscribe <i className="fa-solid fa-paper-plane ml-1"></i>
              </button>
            </form>

            {newsletterStatus === 'success' && (
              <div className="max-w-md mx-auto mt-4 p-3 bg-gold-500/10 border border-gold-500/20 text-gold-600 rounded text-xs font-medium">
                <i className="fa-solid fa-circle-check mr-2"></i> Registration complete. Thank you for subscribing.
              </div>
            )}
            {newsletterStatus === 'error' && (
              <div className="max-w-md mx-auto mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded text-xs font-medium">
                <i className="fa-solid fa-triangle-exclamation mr-2"></i> Please provide a valid email format.
              </div>
            )}
          </div>
        </section>

        {/* Project Pitch Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="p-8 rounded-[2rem] bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="text-center md:text-left">
              <h5 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">Need Interactive Architecture?</h5>
              <p className="text-slate-500 text-sm">We configure and build web platforms, custom mechanics, and esports modules.</p>
            </div>
            <button onClick={() => onNavigate('home')} className="w-full md:w-auto px-10 py-4 bg-gold-500 text-slate-900 text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-[0_10px_25px_rgba(212,175,55,0.25)] hover:scale-105 hover:bg-slate-900 hover:text-white transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative z-20" aria-label="Site Footer">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group text-left">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden p-1">
                  <img
                    src={vrLogo}
                    alt="The 14 Lights Studios Logo"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/vr_logo_1784728392393.png';
                    }}
                  />
                </div>
                <span className="text-xl font-display font-bold text-white tracking-wider">
                  The<span className="text-gold-400"> 14 Lights</span>
                </span>
              </button>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Pioneering digital excellence through premium high-performance services and groundbreaking proprietary products, including Pakistan's First Virtual AI Teacher.
              </p>
              <div className="flex items-center gap-4 text-slate-400 mt-2">
                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition" aria-label="Discord"><i className="fab fa-discord"></i></a>
                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-1">Navigation</h3>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition">Home</button></li>
                <li><button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition">Services</button></li>
                <li><button onClick={() => onNavigate('article')} className="hover:text-gold-400 transition">Products</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-gold-400 transition">Blog & Insights</button></li>
                <li><button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition">Contact Us</button></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-1">Departments</h3>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition flex items-center gap-2"><i className="fa-solid fa-code text-gold-400 text-xs"></i> Services Division</button></li>
                <li><button onClick={() => onNavigate('article')} className="hover:text-gold-400 transition flex items-center gap-2"><i className="fa-solid fa-microchip text-gold-400 text-xs"></i> Products Division</button></li>
                <li><button onClick={() => onNavigate('article')} className="hover:text-gold-400 transition flex items-center gap-2"><i className="fa-solid fa-robot text-gold-400 text-xs"></i> Virtual AI Teacher</button></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-1">Stay Updated</h3>
              <p className="text-xs text-slate-400">Subscribe to our newsletter for product releases and tech deep-dives.</p>
              <form className="flex flex-col gap-2 mt-1" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter"
                  className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                />
                <button type="submit" className="btn-gold text-slate-900 font-bold text-xs py-2 px-3 rounded uppercase tracking-wider">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; 2026 The 14 Lights Studio. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition">Privacy Policy</button>
              <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
              <a href="#" className="hover:text-slate-300 transition">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
