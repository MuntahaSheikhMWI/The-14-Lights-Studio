import { useEffect, useState } from 'react';
import { HomePage } from './components/HomePage';
import { BlogListingPage } from './components/BlogListingPage';
import { BlogArticlePage } from './components/BlogArticlePage';
import { PageView } from './types';

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
    <>
      {currentView === 'home' && <HomePage onNavigate={navigateTo} />}
      {currentView === 'blog' && <BlogListingPage onNavigate={navigateTo} />}
      {currentView === 'article' && <BlogArticlePage onNavigate={navigateTo} />}
    </>
  );
}
