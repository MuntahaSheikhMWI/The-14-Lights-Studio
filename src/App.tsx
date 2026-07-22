import { useEffect, useState, lazy, Suspense } from 'react';
import { HomePage } from './components/HomePage';
import { PageView } from './types';

const BlogListingPage = lazy(() =>
  import('./components/BlogListingPage').then((m) => ({ default: m.BlogListingPage }))
);
const ArticleDetailView = lazy(() =>
  import('./components/ArticleDetailView').then((m) => ({ default: m.ArticleDetailView }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('ai-virtual-teacher-edtech-pakistan-guide');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/blog' || hash === '#blog') {
        setCurrentView('blog');
      } else if (hash === '#/privacy' || hash === '#privacy') {
        setCurrentView('privacy');
      } else if (hash.startsWith('#/article') || hash.startsWith('#article')) {
        setCurrentView('article');
        const parts = hash.split('/');
        if (parts.length > 2 && parts[2]) {
          setSelectedArticleId(parts[2]);
        }
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: PageView, articleId?: string) => {
    setCurrentView(view);
    if (articleId) {
      setSelectedArticleId(articleId);
    }
    if (view === 'blog') {
      window.location.hash = '#/blog';
    } else if (view === 'privacy') {
      window.location.hash = '#/privacy';
    } else if (view === 'article') {
      const targetId = articleId || selectedArticleId || 'ai-virtual-teacher-edtech-pakistan-guide';
      window.location.hash = `#/article/${targetId}`;
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050507] text-white flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      {currentView === 'home' && <HomePage onNavigate={navigateTo} />}
      {currentView === 'blog' && <BlogListingPage onNavigate={navigateTo} />}
      {currentView === 'article' && <ArticleDetailView articleId={selectedArticleId} onNavigate={navigateTo} />}
      {currentView === 'privacy' && <PrivacyPolicyPage onNavigate={navigateTo} />}
    </Suspense>
  );
}
