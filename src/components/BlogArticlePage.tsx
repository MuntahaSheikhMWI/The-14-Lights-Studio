import React, { useEffect, useState } from 'react';
import { PageView, CommentItem } from '../types';

interface BlogArticlePageProps {
  onNavigate: (page: PageView) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('section-1');

  // Comment state
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      name: 'Alex Morgan',
      date: '1 day ago',
      text: 'This normal mapping batch technique is very effective. We implemented similar shaders in our WebGL experiments and saw a substantial reduction in frame variance.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 'c2',
      name: 'Sophia Lee',
      date: '2 days ago',
      text: 'Are you guys using basis-universal or converting files dynamically at runtime based on the client configuration?',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ]);

  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  // Set blog theme on body
  useEffect(() => {
    document.body.className = 'antialiased selection:bg-gold-500 selection:text-black w-full overflow-x-hidden blog-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  // Scroll handler for reading progress & scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }

      // Scrollspy logic
      const sectionIds = ['section-1', 'section-2', 'section-3', 'section-4'];
      for (const id of sectionIds) {
        const elem = document.getElementById(id);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 0) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: CommentItem = {
      id: Date.now().toString(),
      name: commentName.trim(),
      date: 'Just now',
      text: commentText.trim(),
      initials: commentName.trim().charAt(0).toUpperCase(),
    };

    setComments([newComment, ...comments]);
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155]">
      {/* Reading Progress Indicator */}
      <div id="scroll-progress" aria-hidden="true" style={{ width: `${scrollProgress}%` }}></div>

      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top Info Bar */}
      <div className="hidden sm:block bg-slate-50 border-b border-slate-200 backdrop-blur-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between text-xs font-medium tracking-wide text-slate-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-gold-600 transition cursor-pointer" role="button" aria-label="Support Desk">
              <i className="fa-solid fa-headset text-gold-600" aria-hidden="true"></i> Support
            </span>
            <span className="flex items-center gap-2 hover:text-gold-600 transition cursor-pointer" role="button" aria-label="Language Selector">
              <i className="fa-solid fa-globe text-gold-600" aria-hidden="true"></i> EN/US
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-900 transition" aria-label="Discord Server" rel="noopener noreferrer" target="_blank"><i className="fab fa-discord"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="Twitter Profile" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="YouTube Channel" rel="noopener noreferrer" target="_blank"><i className="fab fa-youtube"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="Twitch Feed" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitch"></i></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 nav-glass transition-all duration-300 w-full" id="navbar" aria-label="Global Navigation">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-left focus:outline-none">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full overflow-hidden bg-slate-900 border border-slate-700 shadow-md group-hover:shadow-gold-500/30 transition duration-300 p-1">
              <img
                src="/logo.png"
                alt="The 14 Lights Studios Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.tried) {
                    target.dataset.tried = 'true';
                    target.src = '/vr_logo_1784728392393.png';
                  }
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
            <li><button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">Home</button></li>
            <li><button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">About</button></li>
            <li><button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">Esports</button></li>
            <li><button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">Portfolio</button></li>
            <li><button onClick={() => onNavigate('blog')} className="px-4 py-2 rounded-full text-sm font-medium text-gold-600 bg-gold-500/10 border border-gold-500/20 transition">Blog</button></li>
          </ul>

          {/* CTA & Burger */}
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="hidden md:inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-gold-600 border border-gold-500/30 rounded hover:bg-gold-500 hover:text-slate-900 transition duration-300">
              Get Started
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
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">Home</button>
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">About</button>
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">Esports</button>
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">Portfolio</button>
              <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className="text-left text-gold-600 font-bold py-2 border-b border-slate-100">Blog</button>
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-gold-600 font-bold mt-2 flex items-center gap-2">
                Get Started <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Wrapper */}
      <main id="main-content" className="relative z-20">
        {/* Article Intro & Title Section */}
        <header className="pt-8 pb-4 md:pt-16 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            {/* Back to Blog Link */}
            <button onClick={() => onNavigate('blog')} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-gold-600 transition mb-6">
              <i className="fa-solid fa-arrow-left"></i> Back to All Articles
            </button>

            {/* Tags / Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-600 text-[10px] font-bold uppercase rounded-full">Cover Story</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-full">Engineering & Design</span>
              <span className="text-xs text-slate-400 font-medium">• November 12, 2024</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 leading-tight mb-6">
              Architecture of Virtual Space: Redefining Game Design Paradigms
            </h1>

            {/* Author Detail Card */}
            <div className="flex items-center gap-4 py-4 border-y border-slate-200/60">
              <img
                src="https://the14lights.com/assets/team/HNS.jpeg"
                alt="Hassan Noor Soomro"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border border-slate-300 object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400';
                }}
              />
              <div className="flex-1">
                <span className="block text-sm font-bold text-slate-900">Hassan Noor Soomro</span>
                <span className="block text-xs text-slate-500">Founder & System Designer • 8 min read • 2.4k Views</span>
              </div>
              {/* Share and Action Suite */}
              <div className="flex items-center gap-2">
                <button
                  id="like-btn"
                  onClick={() => setLiked(!liked)}
                  className={`w-10 h-10 rounded-full text-slate-600 flex items-center justify-center transition border border-slate-200 ${liked ? 'bg-red-50 text-red-500' : 'bg-slate-100 hover:bg-gold-500/10 hover:text-gold-600'}`}
                  aria-label="Like this article"
                >
                  <i className={liked ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'}></i>
                </button>
                <button
                  id="copy-share-btn"
                  onClick={handleCopyShare}
                  className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-gold-500/10 hover:text-gold-600 flex items-center justify-center transition border border-slate-200"
                  aria-label="Copy article link"
                >
                  <i className={copied ? 'fa-solid fa-check text-green-600' : 'fa-regular fa-share-from-square'}></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Article Banner Image */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[21/9] bg-slate-100 relative">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600"
              alt="Render pipeline testing of interactive WebGL mechanics"
              width={1200}
              height={514}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Asymmetric Layout: Body & Sticky Sidebar */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Hand Side: Main Article Body */}
            <article className="lg:col-span-8 bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm">
              {/* Mobile Table of Contents */}
              <div className="lg:hidden p-5 mb-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h2 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider mb-3">Table of Contents</h2>
                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  <li><button onClick={() => scrollToSection('section-1')} className="hover:text-gold-600 transition text-left block">1. The Rendering Paradigm Shift</button></li>
                  <li><button onClick={() => scrollToSection('section-2')} className="hover:text-gold-600 transition text-left block">2. Designing for WebGL Pipelines</button></li>
                  <li><button onClick={() => scrollToSection('section-3')} className="hover:text-gold-600 transition text-left block">3. Performance Bottlenecks & Optimization</button></li>
                  <li><button onClick={() => scrollToSection('section-4')} className="hover:text-gold-600 transition text-left block">4. Synthesis and Takeaways</button></li>
                </ul>
              </div>

              {/* Article Body Content */}
              <div id="article-content" className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
                <p className="text-lg text-slate-800 font-medium leading-relaxed">
                  Creating smooth, high-frame-rate environments inside standard browser contexts requires a rigorous departure from traditional client-side rendering models. This journal outlines how The 14 Lights Studio scales performance and asset compression to build immersive experiences accessible to everyone.
                </p>

                <h2 id="section-1" className="text-2xl font-display font-extrabold text-slate-900 pt-6">1. The Rendering Paradigm Shift</h2>
                <p>
                  Traditionally, interactive 3D media was delivered inside local system packages—demanding local resources and specific hardware setups. In the modern web space, our deployment vectors target mobile browser contexts, requiring an optimal balance of rendering complexity and network resource consumption.
                </p>
                <p>
                  To solve this constraint, we structured our pipelines around custom procedural shader calculations rather than loading massive volumetric static assets. When we built projects like <em>Crazy FIFA 2026</em>, generating environments computationally shaved megabytes off our initial network fetch.
                </p>

                <blockquote className="border-l-4 border-gold-500 pl-6 my-8 italic text-slate-800 font-medium bg-slate-50 py-4 pr-4 rounded-r-xl">
                  "The modern web demands instant access. Shaving off even 100 milliseconds from the render loop can drastically improve long-term player retention."
                </blockquote>

                <h2 id="section-2" className="text-2xl font-display font-extrabold text-slate-900 pt-6">2. Designing for WebGL Pipelines</h2>
                <p>
                  Designing interface objects and modular level geometry demands that artists and program architects speak the same language. We construct models strictly using low-poly structures augmented by normal mapping. This approach guarantees that lighting matrices calculate mathematically without generating excess vertex overhead.
                </p>

                <p>Here is a basic code model demonstrating how we configure standard asset buffers for low-latency WebGL environments:</p>

                {/* Code Block */}
                <div className="relative bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto shadow-inner my-6 font-mono text-xs">
                  <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-slate-500">JavaScript</div>
                  <pre><code>{`// WebGL Buffer Configuration Hook
function initAssetBuffers(gl, meshData) {
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.vertices), gl.STATIC_DRAW);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshData.normals), gl.STATIC_DRAW);

    return { vertexBuffer, normalBuffer };
}`}</code></pre>
                </div>

                <h2 id="section-3" className="text-2xl font-display font-extrabold text-slate-900 pt-6">3. Performance Bottlenecks & Optimization</h2>
                <p>
                  A common issue in modern web game development is draw-call thrashing. If a browser environment executes more than 200 individual draw calls in a single frame, mobile devices will drop frames. By implementing robust geometry batching, we compile thousands of static items into single multi-draw sequences.
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Geometry Batching:</strong> Reduces GPU state changes.</li>
                  <li><strong>Basis Universal Textures:</strong> Drops average visual footprint by up to 70%.</li>
                  <li><strong>LOD Streaming:</strong> Dynamically adjusts mesh resolution based on physical distance parameters.</li>
                </ul>

                <h2 id="section-4" className="text-2xl font-display font-extrabold text-slate-900 pt-6">4. Synthesis and Takeaways</h2>
                <p>
                  By optimizing memory allocations, utilizing normal mapping, and applying texture compression, we can render immersive virtual spaces at stable rates. Step by step, we continue to push browser engines forward to make accessible, fast-paced games.
                </p>
              </div>

              {/* Dynamic Comments Block */}
              <section className="mt-12 pt-8 border-t border-slate-200" aria-label="Reader Comments">
                <h3 className="font-display font-bold text-slate-900 text-lg mb-6">
                  Discussion (<span id="comment-count">{comments.length}</span>)
                </h3>

                {/* Comment Form */}
                <form id="comment-form" onSubmit={handlePostComment} className="space-y-4 mb-8">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      id="comment-name"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="Your Name"
                      aria-label="Your Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-gold-500 transition shadow-inner"
                    />
                    <input
                      type="email"
                      id="comment-email"
                      required
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      placeholder="Your Email"
                      aria-label="Your Email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-gold-500 transition shadow-inner"
                    />
                  </div>
                  <textarea
                    id="comment-text"
                    required
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Join the discussion..."
                    aria-label="Comment Text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 focus:outline-none focus:border-gold-500 transition shadow-inner"
                  ></textarea>
                  <button type="submit" className="btn-gold px-6 py-2.5 rounded font-bold uppercase tracking-wide text-xs shadow-sm hover:shadow">
                    Post Comment <i className="fa-solid fa-paper-plane ml-1"></i>
                  </button>
                </form>

                {/* Comments Thread */}
                <div id="comments-thread" className="space-y-6">
                  {comments.map((comment) => (
                    <article key={comment.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex gap-4">
                      {comment.avatar ? (
                        <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-xs text-slate-700 uppercase">
                          {comment.initials || comment.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-xs text-slate-900">{comment.name}</span>
                          <span className="text-[10px] text-slate-400">{comment.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{comment.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </article>

            {/* Right Hand Side Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-[160px]">
              {/* Desktop Table of Contents */}
              <nav className="hidden lg:block glass-panel p-6 rounded-2xl" aria-labelledby="toc-desktop-title">
                <h3 id="toc-desktop-title" className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">In This Article</h3>
                <ul id="toc-list" className="space-y-3 text-xs font-medium text-slate-500">
                  <li>
                    <button
                      onClick={() => scrollToSection('section-1')}
                      className={`block w-full text-left pl-2 border-l-2 transition ${activeSection === 'section-1' ? 'text-gold-600 border-gold-500 font-bold' : 'border-transparent text-slate-500 hover:text-gold-600'}`}
                    >
                      1. The Rendering Shift
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-2')}
                      className={`block w-full text-left pl-2 border-l-2 transition ${activeSection === 'section-2' ? 'text-gold-600 border-gold-500 font-bold' : 'border-transparent text-slate-500 hover:text-gold-600'}`}
                    >
                      2. WebGL Design
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-3')}
                      className={`block w-full text-left pl-2 border-l-2 transition ${activeSection === 'section-3' ? 'text-gold-600 border-gold-500 font-bold' : 'border-transparent text-slate-500 hover:text-gold-600'}`}
                    >
                      3. Performance Bottlenecks
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-4')}
                      className={`block w-full text-left pl-2 border-l-2 transition ${activeSection === 'section-4' ? 'text-gold-600 border-gold-500 font-bold' : 'border-transparent text-slate-500 hover:text-gold-600'}`}
                    >
                      4. Synthesis
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Author Spotlight Bio */}
              <section className="glass-panel p-6 rounded-2xl" aria-labelledby="author-title">
                <h3 id="author-title" className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">About the Author</h3>
                <div className="flex items-center gap-4 mb-3">
                  <img src="https://the14lights.com/assets/team/HNS.jpeg" alt="Hassan Noor Soomro" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Hassan Noor Soomro</h4>
                    <span className="text-[10px] text-gold-600 uppercase font-medium">Founder & Designer</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Hassan leads system topology design and real-time environment configurations for our software portfolio.
                </p>
                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <a href="#" className="hover:text-gold-600 transition" aria-label="Twitter Profile"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="hover:text-gold-600 transition" aria-label="GitHub Profile"><i className="fab fa-github"></i></a>
                  <a href="#" className="hover:text-gold-600 transition" aria-label="LinkedIn Profile"><i className="fab fa-linkedin"></i></a>
                </div>
              </section>

              {/* Related Articles Section */}
              <section className="glass-panel p-6 rounded-2xl" aria-labelledby="related-title">
                <h3 id="related-title" className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Related Insights</h3>

                <div className="space-y-4">
                  <article onClick={() => onNavigate('blog')} className="group cursor-pointer">
                    <span className="text-[10px] text-gold-600 font-bold uppercase tracking-wider block mb-1">Design</span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-gold-600 transition leading-snug">The UI/UX Formula Behind Minimalist Sports Simulators</h4>
                    <span className="text-[9px] text-slate-400 block mt-1">Sep 28, 2024 • 4 min read</span>
                  </article>

                  <article onClick={() => onNavigate('blog')} className="group cursor-pointer">
                    <span className="text-[10px] text-gold-600 font-bold uppercase tracking-wider block mb-1">Engineering</span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-gold-600 transition leading-snug">Behind the Pitch: Physics Architecture of Crazy FIFA 2026</h4>
                    <span className="text-[9px] text-slate-400 block mt-1">Oct 24, 2024 • 7 min read</span>
                  </article>
                </div>
              </section>
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

            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} className="max-w-md mx-auto relative flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter developer email address"
                aria-label="Subscriber Email Address"
                className="flex-1 bg-white border border-slate-200 focus:border-gold-500 rounded px-4 py-3 text-sm text-slate-900 focus:outline-none transition shadow-sm"
              />
              <button type="submit" className="btn-gold px-6 py-3 rounded font-bold uppercase tracking-wide text-xs shadow-sm hover:shadow">
                Subscribe <i className="fa-solid fa-paper-plane ml-1"></i>
              </button>
            </form>
          </div>
        </section>

        {/* Project Pitch Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="p-8 rounded-[2rem] bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">Need Interactive Architecture?</h3>
              <p className="text-slate-500 text-sm">We configure and build web platforms, custom mechanics, and esports modules.</p>
            </div>
            <button onClick={() => onNavigate('home')} className="w-full md:w-auto px-10 py-4 bg-gold-500 text-slate-900 text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-[0_10px_25px_rgba(212,175,55,0.25)] hover:scale-105 hover:bg-slate-900 hover:text-white transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-12 md:pt-16 pb-8" aria-label="Footer Navigation">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 mb-4 md:mb-6 text-left">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center p-0.5">
                <img
                  src="/logo.png"
                  alt="The 14 Lights Studios Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.dataset.tried) {
                      target.dataset.tried = 'true';
                      target.src = '/vr_logo_1784728392393.png';
                    }
                  }}
                />
              </div>
              <span className="text-lg md:text-xl font-display font-bold text-slate-900 tracking-wider">
                The<span className="text-gold-600"> 14 Lights</span>
              </span>
            </button>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Elevating standard specifications in gaming design and web mechanics. Curated for performance, built with precision.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-4 md:mb-6 text-sm md:text-base">Explore</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-gold-600 transition">Latest Intel</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-gold-600 transition">Portfolio</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-gold-600 transition">Esports Coverage</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-gold-600 transition">Technical Blog</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-4 md:mb-6 text-sm md:text-base">Company</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-gold-600 transition">About Studio</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-gold-600 transition">Meet Team</button></li>
              <li><a href="#" className="hover:text-gold-600 transition">Privacy Policy</a></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-gold-600 transition">Contact</button></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-slate-900 font-bold mb-4 md:mb-6 text-sm md:text-base">Stay Connected</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded bg-slate-200/50 flex items-center justify-center text-slate-600 hover:bg-gold-500 hover:text-slate-900 transition" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded bg-slate-200/50 flex items-center justify-center text-slate-600 hover:bg-gold-500 hover:text-slate-900 transition" aria-label="Discord"><i className="fab fa-discord"></i></a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded bg-slate-200/50 flex items-center justify-center text-slate-600 hover:bg-gold-500 hover:text-slate-900 transition" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
            <div className="relative">
              <input type="email" placeholder="Subscribe to dispatch" className="w-full bg-white border border-slate-200 rounded px-4 py-2 text-xs md:text-sm text-slate-900 focus:outline-none focus:border-gold-500 transition shadow-inner" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900" aria-label="Submit Email Form"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; 2026 The 14 Lights Studio. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Terms of Use</a>
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
