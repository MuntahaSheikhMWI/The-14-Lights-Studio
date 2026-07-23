import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { BLOG_ARTICLES, BlogArticleData } from '../data/blogArticles';
import vrLogo from '../assets/VR_LOGO.png';

interface ArticleDetailViewProps {
  articleId?: string;
  onNavigate: (page: PageView, articleId?: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ articleId, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('section-1');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Comment state
  const [comments, setComments] = useState([
    {
      id: 'c1',
      name: 'Dr. Tariq Mahmood',
      date: '2 days ago',
      text: 'The localized Urdu-English bilingual NLP scaffolding described here is exactly what Pakistani educational institutions need. Outstanding work by The 14 Lights Studio team!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    },
    {
      id: 'c2',
      name: 'Ayesha Khan',
      date: '3 days ago',
      text: 'Integrating sub-100ms audio synthesis with Unreal Engine 5 MetaHumans is a game changer for spatial VR learning. Looking forward to testing the demo!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    },
  ]);

  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  // Find target article or fallback to the new Pakistan AI Teacher guide
  const article: BlogArticleData =
    BLOG_ARTICLES.find((a) => a.id === articleId || a.slug === articleId) ||
    BLOG_ARTICLES[0];

  useEffect(() => {
    document.body.className = 'antialiased selection:bg-gold-500 selection:text-black w-full overflow-x-hidden blog-page';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.body.className = '';
    };
  }, [article.id]);

  // Scroll handler for reading progress & scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }

      if (article.sections) {
        for (const sec of article.sections) {
          const elem = document.getElementById(sec.id);
          if (elem) {
            const rect = elem.getBoundingClientRect();
            if (rect.top <= 220 && rect.bottom >= 0) {
              setActiveSection(sec.id);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.sections]);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      name: commentName.trim(),
      date: 'Just now',
      text: commentText.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400',
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

  // Build JSON-LD Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://the14lights.com/#/article/${article.slug}`
    },
    "headline": article.title,
    "image": [article.image],
    "datePublished": "2026-11-18T08:00:00+05:00",
    "dateModified": "2026-11-18T10:00:00+05:00",
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "The 14 Lights Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://the14lights.com/VR_LOGO.png"
      }
    },
    "description": article.metaDescription,
    "keywords": article.primaryKeywords.concat(article.secondaryKeywords, article.tags).join(", ")
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155]">
      {/* Inject JSON-LD Schema for BlogPosting SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Reading Progress Indicator */}
      <div id="scroll-progress" aria-hidden="true" style={{ width: `${scrollProgress}%` }}></div>

      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top Info Bar */}
      <div className="hidden sm:block bg-slate-50 border-b border-slate-200 backdrop-blur-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between text-xs font-medium tracking-wide text-slate-600">
          <div className="flex items-center gap-6">
            <span onClick={() => onNavigate('home')} className="flex items-center gap-2 hover:text-gold-600 transition cursor-pointer" role="button" aria-label="Support Desk">
              <i className="fa-solid fa-headset text-gold-600" aria-hidden="true"></i> Support
            </span>
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <span className="bg-gold-500/20 text-gold-600 px-2 py-0.5 rounded border border-gold-500/30">NEW</span>
              Pakistan's First Virtual AI Teacher is Live!
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-900 transition" aria-label="Discord Server"><i className="fab fa-discord"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="Twitter Profile"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="YouTube Channel"><i className="fab fa-youtube"></i></a>
            <a href="#" className="hover:text-slate-900 transition" aria-label="LinkedIn Profile"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Global Navbar */}
      <nav className="sticky top-0 z-40 nav-glass transition-all duration-300 w-full" id="navbar" aria-label="Global Navigation">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-left focus:outline-none">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full overflow-hidden transition duration-300 p-1 bg-white ring-2 ring-gold-400/50 shadow-md">
              <img
                src={vrLogo}
                alt="The 14 Lights Studios Logo"
                width={40}
                height={40}
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallbacks = ['/assets/VR_LOGO.png', '/VR_LOGO.png', '/logo.png', '/favicon.png'];
                  const step = parseInt(target.dataset.fallbackStep || '0', 10);
                  if (step < fallbacks.length) {
                    target.dataset.fallbackStep = String(step + 1);
                    target.src = fallbacks[step];
                  } else {
                    target.onerror = null;
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

          {/* Nav Links */}
          <ul className="hidden lg:flex items-center gap-1">
            <li><button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">Home</button></li>
            <li><button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">Services</button></li>
            <li><button onClick={() => onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5">Products <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span></button></li>
            <li><button onClick={() => onNavigate('blog')} className="px-4 py-2 rounded-full text-sm font-medium text-gold-600 bg-gold-500/10 border border-gold-500/20 transition">Blog & Insights</button></li>
          </ul>

          {/* CTA & Mobile Burger */}
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="hidden md:inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-gold-600 border border-gold-500/30 rounded hover:bg-gold-500 hover:text-slate-900 transition duration-300">
              Partner With Us
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-2xl text-slate-600 hover:text-gold-600 transition focus:outline-none p-2"
              aria-label="Open Navigation Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 absolute w-full left-0 z-50 shadow-lg">
            <div className="px-6 py-6 flex flex-col gap-4">
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">Home</button>
              <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">Services</button>
              <button onClick={() => { onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide'); setMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-gold-600 font-medium py-2 border-b border-slate-100">Products (AI Teacher)</button>
              <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className="text-left text-gold-600 font-bold py-2 border-b border-slate-100">Blog</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Container */}
      <main id="main-content" className="relative z-20">
        {/* Breadcrumb Bar */}
        <div className="bg-slate-100/80 border-b border-slate-200/80 py-3">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumbs">
              {article.breadcrumbs.map((bc, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>}
                  <button
                    onClick={() => {
                      if (bc.url.includes('blog')) onNavigate('blog');
                      else if (bc.url.includes('article')) onNavigate('article', article.id);
                      else onNavigate('home');
                    }}
                    className={`hover:text-gold-600 transition ${idx === article.breadcrumbs.length - 1 ? 'font-bold text-slate-800 pointer-events-none' : ''}`}
                  >
                    {bc.name}
                  </button>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-8 pb-4 md:pt-12 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <button onClick={() => onNavigate('blog')} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-gold-600 transition mb-6">
              <i className="fa-solid fa-arrow-left"></i> Back to Blog Articles
            </button>

            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-600 text-[10px] font-bold uppercase rounded-full">
                {article.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 font-medium">• {article.date}</span>
              <span className="text-xs text-slate-400 font-medium">• {article.readTime}</span>
              <span className="text-xs text-slate-400 font-medium">• {article.views}</span>
            </div>

            {/* Title (H1) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Description Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
              {article.description}
            </p>

            {/* Author Card */}
            <div className="flex items-center gap-4 py-4 border-y border-slate-200/80">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-12 h-12 rounded-full border border-slate-300 object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <span className="block text-sm font-bold text-slate-900">{article.author}</span>
                <span className="block text-xs text-slate-500">{article.authorRole} • The 14 Lights Studio</span>
              </div>

              {/* Social Share & Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition border border-slate-200 ${liked ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-600 hover:bg-gold-500/10 hover:text-gold-600'}`}
                  aria-label="Like article"
                >
                  <i className={liked ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'}></i>
                </button>
                <button
                  onClick={handleCopyShare}
                  className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-gold-500/10 hover:text-gold-600 flex items-center justify-center transition border border-slate-200"
                  aria-label="Copy link"
                >
                  <i className={copied ? 'fa-solid fa-check text-green-600' : 'fa-regular fa-share-from-square'}></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Banner Image */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[21/9] bg-slate-100 relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Main Content & Sidebar Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Body Article */}
            <article className="lg:col-span-8 bg-white border border-slate-200/80 p-6 md:p-10 rounded-3xl shadow-sm">
              {/* Mobile Table of Contents */}
              {article.sections && article.sections.length > 0 && (
                <div className="lg:hidden p-5 mb-8 bg-slate-50 rounded-2xl border border-slate-200">
                  <h2 className="font-display font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Table of Contents</h2>
                  <ul className="space-y-2 text-xs font-medium text-slate-600">
                    {article.sections.map((sec) => (
                      <li key={sec.id}>
                        <button onClick={() => scrollToSection(sec.id)} className="hover:text-gold-600 transition text-left block">
                          {sec.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dynamic Body Content according to Article ID */}
              {article.id === 'ai-virtual-teacher-edtech-pakistan-guide' ? (
                <div id="article-content" className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
                  <p className="text-lg text-slate-800 font-medium leading-relaxed">
                    Education in Pakistan is standing at a historic inflection point. With over 22 million out-of-school children and acute student-to-teacher ratio imbalances across both urban and rural districts, traditional brick-and-mortar paradigms face immense structural friction. <strong>The 14 Lights Studio</strong> has engineered Pakistan's first <strong>Virtual AI Teacher</strong>—a groundbreaking generative AI EdTech platform designed to deliver personalized, interactive, and bilingual tutoring in Urdu and English.
                  </p>

                  <h2 id="section-1" className="text-2xl font-display font-extrabold text-slate-900 pt-6 border-t border-slate-100">
                    1. The EdTech Crisis & The Imperative for AI Tutoring in Pakistan
                  </h2>
                  <p>
                    For decades, Pakistani classrooms have struggled with rigid rote-learning formats and stark regional disparities in educational quality. Conventional digital learning applications often fall short because they deliver static video lectures that fail to engage students interactively or adapt to varying paces of comprehension.
                  </p>
                  <p>
                    By deploying localized generative AI avatars and real-time adaptive tutoring algorithms, our platform provides every student with a dedicated virtual mentor that listens, clarifies complex stem concepts, and responds in natural conversational dialogue.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 pt-3">Overcoming Equity and Access Gaps Through Scalable Infrastructure</h3>
                  <p>
                    Accessibility lies at the core of our technical architecture. Rather than requiring expensive high-end desktop computers, the <strong>Pakistan Virtual AI Teacher</strong> is accessible on basic smartphones, tablets, and low-spec web browsers, democratizing quality STEM and language education across Karachi, Lahore, Islamabad, Quetta, Peshawar, and rural districts alike.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 pt-3">The Power of Bilingual Dialogue: Urdu-English Code-Switching</h3>
                  <p>
                    A critical shortcoming of standard Western AI models is their inability to navigate the nuanced code-switching (Urdish) prevalent in Pakistani educational settings. Our proprietary Large Language Model (LLM) fine-tuning pipeline accurately interprets hybrid queries combining Urdu grammar with English scientific terminology.
                  </p>

                  <h4 className="text-lg font-bold text-slate-800 pt-2">Why Standard Western LLMs Fail Local Pedagogical Paradigms</h4>
                  <p className="text-sm bg-slate-50 p-4 border-l-4 border-gold-500 rounded-r">
                    Generic global AI systems lack contextual awareness regarding Pakistan's national curriculum boards (Federal Board, Sindh Board, Punjab Board, Cambridge O/A Levels). Our specialized dataset calibration ensures that answers align perfectly with prescribed textbooks and local examination standards.
                  </p>

                  <h2 id="section-2" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    2. Localized NLP Architecture & Bilingual Dialogue Engines
                  </h2>
                  <p>
                    To achieve human-like responsiveness, our engineering division built a multi-stage Natural Language Processing pipeline that processes text, audio, and visual inputs in under 150 milliseconds.
                  </p>

                  <div className="relative bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto font-mono text-xs shadow-inner my-6">
                    <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-gold-400">Pipeline Topology</div>
                    <pre><code>{`// Pakistan Virtual AI Teacher Pipeline Flow
[Student Query (Urdu/English Voice/Text)]
    --> [Localized Speech-to-Text Transcriber]
    --> [Bilingual NLP Intent & Sentiment Parser]
    --> [Curriculum Knowledge Retrieval (RAG Vector Store)]
    --> [Adaptive Pedagogical Scaffolding Engine]
    --> [Real-Time Audio Synthesizer & Dynamic Visual Avatar]`}</code></pre>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 pt-3">Adaptive Scaffolding & Dynamic Assessment</h3>
                  <p>
                    When a student expresses confusion over a Physics or Mathematics problem, the Virtual AI Teacher does not simply output the final numerical answer. Instead, it employs the Socratic method—guiding the learner step-by-step with intuitive analogies, diagnostic sub-questions, and interactive visual aids.
                  </p>

                  <h2 id="section-3" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    3. Technical Architecture & Low-Bandwidth Optimizations
                  </h2>
                  <p>
                    A primary technical challenge in developing countries is network instability. To ensure uninterrupted learning sessions, our engineering team developed a lightweight token compression protocol and local edge-caching layer.
                  </p>

                  <ul className="list-disc list-inside space-y-2 pl-4 text-slate-700">
                    <li><strong>Token Streaming Protocol:</strong> Reduces payload bandwidth usage by 65% compared to standard REST calls.</li>
                    <li><strong>Edge Model Caching:</strong> Stores frequent lesson modules locally to eliminate cloud roundtrip delays.</li>
                    <li><strong>Adaptive Audio Synthesizer:</strong> Generates crisp speech at compressed audio bitrates under 24kbps.</li>
                  </ul>

                  <h2 id="section-4" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    4. Real-World Classroom Impact & Measurable Metrics
                  </h2>
                  <p>
                    During pilot testing across early adopter institutions in Karachi, students using the <strong>Pakistan Virtual AI Teacher</strong> demonstrated a 38% improvement in math problem-solving speed and a 42% increase in course completion rates.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 my-6">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                      <span className="text-2xl font-extrabold text-gold-600 block">38%</span>
                      <span className="text-xs text-slate-600 font-medium">Faster Concept Retention</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                      <span className="text-2xl font-extrabold text-gold-600 block">&lt;150ms</span>
                      <span className="text-xs text-slate-600 font-medium">Bilingual Speech Latency</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                      <span className="text-2xl font-extrabold text-gold-600 block">100%</span>
                      <span className="text-xs text-slate-600 font-medium">Curriculum Alignment</span>
                    </div>
                  </div>

                  <h2 id="section-5" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    5. Future Roadmap: Spatial VR Classrooms & Interactive AI Avatars
                  </h2>
                  <p>
                    The next evolution of our product suite connects our AI Teacher model directly with 3D spatial computing and Unreal Engine 5 virtual environments. Students wearing lightweight VR headsets will soon step inside historical historical recreations, interactive chemistry labs, and simulated space explorations guided by their AI Teacher avatar.
                  </p>
                  <p>
                    Explore our research on <button onClick={() => onNavigate('article', 'generative-ai-unreal-engine-5-vr-game-development')} className="text-gold-600 font-bold hover:underline">Integrating Generative AI with Unreal Engine 5 & VR</button> or discover our <button onClick={() => onNavigate('blog')} className="text-gold-600 font-bold hover:underline">Full Technical Blog Series</button>.
                  </p>
                </div>
              ) : article.id === 'generative-ai-unreal-engine-5-vr-game-development' ? (
                <div id="article-content" className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
                  <p className="text-lg text-slate-800 font-medium leading-relaxed">
                    The intersection of <strong>Generative AI</strong>, <strong>Unreal Engine 5 (UE5)</strong>, and <strong>Virtual Reality (VR)</strong> is transforming the video game development and spatial simulation industry. At <strong>The 14 Lights Studio</strong>, our game engineering division is pioneering pipelines that connect real-time Large Language Models directly to C++ Unreal Engine sub-systems—powering fully unscripted, emotionally intelligent AI NPCs and dynamic VR environments.
                  </p>

                  <h2 id="section-1" className="text-2xl font-display font-extrabold text-slate-900 pt-6 border-t border-slate-100">
                    1. The Paradigm Shift in Real-Time VR & AI Integration
                  </h2>
                  <p>
                    For decades, non-player characters (NPCs) in video games relied on static decision trees, hardcoded branching dialogue, and predictable state machines. In immersive Virtual Reality, where players interact with full spatial agency, rigid dialogue trees shatter user immersion.
                  </p>
                  <p>
                    By coupling generative AI dialogue models with MetaHuman facial animation and real-time spatial audio, players can speak naturally using voice input into VR headsets and receive instant context-aware verbal and physical reactions from AI characters.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 pt-3">Moving Beyond Scripted Decision Trees to Autonomous NPC Intelligence</h3>
                  <p>
                    Our dynamic character engine uses long-term retrieval-augmented generation (RAG) vector stores. When a player talks to an in-game character, the NPC retrieves past relationship history, environmental context, and personal background, making every conversation unique and unrepeatable.
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 pt-3">The Role of Real-Time Generative Speech in Virtual Reality</h3>
                  <p>
                    Generating text responses is only half the equation in VR. Sound must originate accurately from 3D spatial coordinates with realistic lip-synchronization and micro-expressions.
                  </p>

                  <h4 className="text-lg font-bold text-slate-800 pt-2">Solving the Uncanny Valley in VR Character Interaction</h4>
                  <p className="text-sm bg-slate-50 p-4 border-l-4 border-gold-500 rounded-r">
                    To eliminate the 'uncanny valley' effect, our team syncs generated phonemes directly with Unreal Engine 5's Live Link Face animation curves, rendering realistic lip movements and eye blinks in real time.
                  </p>

                  <h2 id="section-2" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    2. Technical Architecture: Connecting LLM Backends to UE5 C++
                  </h2>
                  <p>
                    Connecting high-throughput generative AI models to Unreal Engine 5 requires an asynchronous C++ network bridge that prevents main-thread rendering hitches.
                  </p>

                  <div className="relative bg-slate-900 text-slate-100 rounded-xl p-5 overflow-x-auto font-mono text-xs shadow-inner my-6">
                    <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-gold-400">C++ Unreal Engine Hook</div>
                    <pre><code>{`// Unreal Engine 5 Asynchronous WebSocket AI Audio Hook
#include "WebSocketsModule.h"
#include "Components/AudioComponent.h"

void UAICharacterComponent::ConnectToAIServer() {
    TSharedRef<IWebSocket> Socket = FWebSocketsModule::Get().CreateWebSocket("wss://api.the14lights.com/v1/ai-npc");
    
    Socket->OnMessage().AddLambda([this](const FString& AudioChunk) {
        // Stream PCM audio directly into UE5 Procedural Audio Component
        this->PlaySynthesizedAudioChunk(AudioChunk);
    });
    
    Socket->Connect();
}`}</code></pre>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 pt-3">Asynchronous Bi-Directional WebSockets for Sub-100ms Responses</h3>
                  <p>
                    Rather than waiting for a full audio file to generate before playing, audio frames are streamed over WebSockets in 20-millisecond chunks, giving the illusion of instant, real-time verbal conversation.
                  </p>

                  <h2 id="section-3" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    3. Maintaining 90+ FPS in AI-Driven Virtual Reality Environments
                  </h2>
                  <p>
                    Virtual Reality requires a rock-solid 90 frames per second per eye to prevent motion discomfort. Running heavy AI models locally on consumer VR hardware would exhaust GPU memory.
                  </p>

                  <ul className="list-disc list-inside space-y-2 pl-4 text-slate-700">
                    <li><strong>Distributed Edge Workers:</strong> Offloads neural inference to dedicated GPU microservices.</li>
                    <li><strong>Nanite Geometry Streaming:</strong> Utilizes UE5 Nanite to render millions of polygons seamlessly.</li>
                    <li><strong>Lumen Dynamic Global Illumination:</strong> Real-time bounce lighting that reacts to AI-triggered world state changes.</li>
                  </ul>

                  <h2 id="section-4" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    4. Accelerating 3D Game Design Pipelines with Procedural Workflows
                  </h2>
                  <p>
                    Generative AI isn't only transforming gameplay—it is revolutionizing pre-production asset creation. From procedural texture generation to automated level layouts, our development cycles are up to 60% faster, allowing rapid prototyping of rich virtual worlds.
                  </p>

                  <h2 id="section-5" className="text-2xl font-display font-extrabold text-slate-900 pt-8 border-t border-slate-100">
                    5. Production Workflows & Future Possibilities
                  </h2>
                  <p>
                    As spatial headsets evolve, combining generative AI with Unreal Engine 5 will redefine narrative entertainment, educational VR simulations, and enterprise training.
                  </p>
                  <p>
                    Learn more about our flagship product, <button onClick={() => onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide')} className="text-gold-600 font-bold hover:underline">Pakistan's First Virtual AI Teacher</button>, or view our <button onClick={() => onNavigate('blog')} className="text-gold-600 font-bold hover:underline">Game Development Services</button>.
                  </p>
                </div>
              ) : (
                <div id="article-content" className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
                  <p className="text-lg text-slate-800 font-medium leading-relaxed">
                    {article.description}
                  </p>
                  <p>
                    At <strong>The 14 Lights Studio</strong>, our engineering and services teams continue to refine high-performance digital tools, low-latency architectures, and interactive gaming experiences.
                  </p>
                  {article.sections && article.sections.map((sec, idx) => (
                    <div key={sec.id} className="pt-6 border-t border-slate-100">
                      <h2 id={sec.id} className="text-2xl font-display font-extrabold text-slate-900 mb-3">
                        {sec.title}
                      </h2>
                      <p className="text-slate-700 leading-relaxed">
                        Detailed analysis and production breakdowns for {sec.title.toLowerCase()}. Our architecture ensures strict compliance with high concurrency standards, optimized memory allocations, and minimal frame latency across desktop and mobile devices.
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* FAQ Section */}
              {article.faqs && article.faqs.length > 0 && (
                <section id="section-faq" className="mt-12 pt-8 border-t-2 border-slate-100">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="p-2 bg-gold-500/10 text-gold-600 rounded-lg"><i className="fa-solid fa-circle-question text-lg"></i></span>
                    <h2 className="text-2xl font-display font-bold text-slate-900">Frequently Asked Questions</h2>
                  </div>

                  <div className="space-y-4">
                    {article.faqs.map((faq, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                          className="w-full text-left p-5 flex items-center justify-between font-bold text-slate-900 text-sm md:text-base hover:text-gold-600 transition"
                        >
                          <span>{faq.question}</span>
                          <i className={`fa-solid ${openFaqIndex === idx ? 'fa-chevron-up text-gold-600' : 'fa-chevron-down text-slate-400'} text-xs ml-4 shrink-0`}></i>
                        </button>
                        {openFaqIndex === idx && (
                          <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 bg-white">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Call-to-Action (CTA) Banner */}
              <div className="mt-12 p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden group shadow-xl">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <span className="text-xs text-gold-400 uppercase font-bold tracking-widest block mb-2">The 14 Lights Studio Partnership</span>
                <h3 className="text-2xl font-display font-bold mb-3 text-white">Ready to Build Next-Gen AI or Game Solutions?</h3>
                <p className="text-slate-300 text-sm mb-6 max-w-xl leading-relaxed">
                  Partner with our engineering team to integrate Pakistan's Virtual AI Teacher platform or build custom Unreal Engine 5 & VR applications tailored to your organization.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => onNavigate('home')} className="btn-gold px-6 py-3 rounded text-xs font-bold uppercase tracking-wider shadow">
                    Book Strategy Call <i className="fa-solid fa-arrow-right ml-1"></i>
                  </button>
                  <button onClick={() => onNavigate('blog')} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-bold uppercase tracking-wider transition">
                    Explore All Insights
                  </button>
                </div>
              </div>

              {/* Well-Researched SEO Tag Cloud */}
              <div className="mt-10 pt-6 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-tags text-gold-600"></i> Topic Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 hover:bg-gold-500/10 hover:text-gold-600 border border-slate-200/80 text-slate-600 text-xs rounded-full cursor-pointer transition font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reader Comments */}
              <section className="mt-12 pt-8 border-t border-slate-200" aria-label="Reader Comments">
                <h3 className="font-display font-bold text-slate-900 text-lg mb-6">
                  Discussion ({comments.length})
                </h3>

                <form onSubmit={handlePostComment} className="space-y-4 mb-8">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="Your Name"
                      aria-label="Your Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-gold-500 transition shadow-inner"
                    />
                    <input
                      type="email"
                      required
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      placeholder="Your Email"
                      aria-label="Your Email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-gold-500 transition shadow-inner"
                    />
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts on this article..."
                    aria-label="Comment Text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 focus:outline-none focus:border-gold-500 transition shadow-inner"
                  ></textarea>
                  <button type="submit" className="btn-gold px-6 py-2.5 rounded font-bold uppercase tracking-wide text-xs shadow-sm hover:shadow">
                    Post Comment <i className="fa-solid fa-paper-plane ml-1"></i>
                  </button>
                </form>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <article key={comment.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex gap-4">
                      <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
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

            {/* Right Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-[120px]">
              {/* Desktop Table of Contents */}
              {article.sections && article.sections.length > 0 && (
                <nav className="hidden lg:block glass-panel p-6 rounded-2xl border border-slate-200/80" aria-labelledby="toc-desktop-title">
                  <h3 id="toc-desktop-title" className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <i className="fa-solid fa-list-ul text-gold-600"></i> In This Article
                  </h3>
                  <ul className="space-y-2.5 text-xs font-medium text-slate-500">
                    {article.sections.map((sec) => (
                      <li key={sec.id}>
                        <button
                          onClick={() => scrollToSection(sec.id)}
                          className={`block w-full text-left pl-2 border-l-2 transition text-xs ${activeSection === sec.id ? 'text-gold-600 border-gold-500 font-bold' : 'border-transparent text-slate-500 hover:text-gold-600'}`}
                        >
                          {sec.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Author Bio Box */}
              <section className="glass-panel p-6 rounded-2xl border border-slate-200/80" aria-labelledby="author-title">
                <h3 id="author-title" className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <i className="fa-solid fa-user-gear text-gold-600"></i> Author Profile
                </h3>
                <div className="flex items-center gap-4 mb-3">
                  <img src={article.authorAvatar} alt={article.author} className="w-12 h-12 rounded-full object-cover border border-slate-300" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{article.author}</h4>
                    <span className="text-[10px] text-gold-600 uppercase font-semibold">{article.authorRole}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Leading system design and product engineering at The 14 Lights Studio, focusing on Pakistan's Virtual AI Teacher and spatial gaming engines.
                </p>
                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <a href="#" className="hover:text-gold-600 transition"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="hover:text-gold-600 transition"><i className="fab fa-github"></i></a>
                  <a href="#" className="hover:text-gold-600 transition"><i className="fab fa-linkedin"></i></a>
                </div>
              </section>

              {/* Related Articles Box */}
              <section className="glass-panel p-6 rounded-2xl border border-slate-200/80" aria-labelledby="related-title">
                <h3 id="related-title" className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <i className="fa-solid fa-newspaper text-gold-600"></i> Related Articles
                </h3>

                <div className="space-y-4">
                  {BLOG_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3).map((rel) => (
                    <article
                      key={rel.id}
                      onClick={() => onNavigate('article', rel.id)}
                      className="group cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                    >
                      <span className="text-[10px] text-gold-600 font-bold uppercase tracking-wider block mb-1">
                        {rel.categoryLabel}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-gold-600 transition leading-snug line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 block mt-1">{rel.date} • {rel.readTime}</span>
                    </article>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-slate-50 border-t border-slate-200 relative" aria-labelledby="newsletter-title">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <span className="text-xs text-gold-600 uppercase tracking-widest font-bold block mb-2">Technical Journal Updates</span>
            <h2 id="newsletter-title" className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-3">Subscribe to The Studio Dispatch</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-8">Receive technical breakdowns, engineering diaries, and early product release updates directly in your inbox.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="max-w-md mx-auto relative flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 bg-white border border-slate-200 focus:border-gold-500 rounded px-4 py-3 text-sm text-slate-900 focus:outline-none transition shadow-sm"
              />
              <button type="submit" className="btn-gold px-6 py-3 rounded font-bold uppercase tracking-wide text-xs shadow-sm hover:shadow">
                Subscribe <i className="fa-solid fa-paper-plane ml-1"></i>
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative z-20" aria-label="Site Footer">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group text-left">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden p-1 bg-white ring-2 ring-gold-400/40 shadow-md">
                  <img
                    src={vrLogo}
                    alt="The 14 Lights Studios Logo"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallbacks = ['/assets/VR_LOGO.png', '/VR_LOGO.png', '/logo.png', '/favicon.png'];
                      const step = parseInt(target.dataset.fallbackStep || '0', 10);
                      if (step < fallbacks.length) {
                        target.dataset.fallbackStep = String(step + 1);
                        target.src = fallbacks[step];
                      } else {
                        target.onerror = null;
                      }
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
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-1">Navigation</h3>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition">Home</button></li>
                <li><button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition">Services</button></li>
                <li><button onClick={() => onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide')} className="hover:text-gold-400 transition">Products</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-gold-400 transition">Blog & Insights</button></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-1">Departments</h3>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition flex items-center gap-2"><i className="fa-solid fa-code text-gold-400 text-xs"></i> Services Division</button></li>
                <li><button onClick={() => onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide')} className="hover:text-gold-400 transition flex items-center gap-2"><i className="fa-solid fa-microchip text-gold-400 text-xs"></i> Products Division</button></li>
                <li><button onClick={() => onNavigate('article', 'ai-virtual-teacher-edtech-pakistan-guide')} className="hover:text-gold-400 transition flex items-center gap-2"><i className="fa-solid fa-robot text-gold-400 text-xs"></i> Virtual AI Teacher</button></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-1">Connect</h3>
              <div className="flex items-center gap-4 text-slate-400 mt-2">
                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition" aria-label="Discord"><i className="fab fa-discord"></i></a>
                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; 2026 The 14 Lights Studio. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition">Privacy Policy</button>
              <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
