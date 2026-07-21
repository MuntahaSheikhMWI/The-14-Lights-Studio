import { useEffect, useState, lazy, Suspense } from 'react';
import { HomePage } from './components/HomePage';
import { PageView } from './types';

const BlogListingPage = lazy(() =>
  import('./components/BlogListingPage').then((m) => ({ default: m.BlogListingPage }))
);
const BlogArticlePage = lazy(() =>
  import('./components/BlogArticlePage').then((m) => ({ default: m.BlogArticlePage }))
);

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/blog' || hash === '#blog') {
        setCurrentView('blog');
      } else if (hash === '#/article' || hash === '#article' || hash.includes('architecture-of-virtual-space')) {
        setCurrentView('article');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    if (view === 'blog') {
      window.location.hash = '#/blog';
    } else if (view === 'article') {
      window.location.hash = '#/article';
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050507] text-white flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      {currentView === 'home' && <HomePage onNavigate={navigateTo} />}
      {currentView === 'blog' && <BlogListingPage onNavigate={navigateTo} />}
      {currentView === 'article' && <BlogArticlePage onNavigate={navigateTo} />}
    </Suspense>
  );
}
