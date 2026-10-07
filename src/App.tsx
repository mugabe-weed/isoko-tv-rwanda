/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { VideoModal } from './components/VideoModal';
import { SearchModal } from './components/SearchModal';
import { NewsletterModal } from './components/NewsletterModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { LivePage } from './pages/LivePage';
import { ShowsPage } from './pages/ShowsPage';
import { AdvertisePage } from './pages/AdvertisePage';
import { SupportPage } from './pages/SupportPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Video, Show } from './types';
import { X, Tv, DollarSign, Mail, Info, Radio, Heart } from 'lucide-react';

export default function App() {
  // Sync pathname with browser history
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname;
    if (path && path !== '') return path;
    return '/';
  });

  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMoreMenuOpen(false);
  };

  const handleNotify = (msg: string) => {
    setToastMessage(msg);
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/live':
        return <LivePage onNavigate={navigateTo} />;
      case '/shows':
        return <ShowsPage onPlayVideo={(video) => setActiveVideo(video)} />;
      case '/advertise':
        return <AdvertisePage onNotify={handleNotify} />;
      case '/support':
        return <SupportPage onNotify={handleNotify} />;
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/contact':
        return <ContactPage onNotify={handleNotify} />;
      case '/':
      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onPlayVideo={(video) => setActiveVideo(video)}
            onNotify={handleNotify}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white selection:bg-[#e50914] selection:text-white">
      {/* 1. Header with mobile menu and sticky nav */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={navigateTo} onNotify={handleNotify} />

      {/* 4. Mobile Bottom Navigation (essential for mobile 3G browsing) */}
      <BottomNav
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenMore={() => setIsMoreMenuOpen(true)}
      />

      {/* 5. In-App Video Player Overlay Modal */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        onDonateClick={() => {
          setActiveVideo(null);
          navigateTo('/support');
        }}
      />

      {/* 6. Instant Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectVideo={(video) => {
          setIsSearchOpen(false);
          setActiveVideo(video);
        }}
        onSelectShow={(show) => {
          setIsSearchOpen(false);
          navigateTo('/shows');
        }}
      />

      {/* 7. Newsletter Subscription & Management Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        onSuccess={handleNotify}
      />

      {/* 8. Action Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* 9. Mobile "More" Drawer Modal */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0 lg:hidden"
          onClick={() => setIsMoreMenuOpen(false)}
        >
          <div
            className="w-full bg-[#141414] rounded-t-2xl border-t border-zinc-800 p-6 space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-bold text-white text-base">
                ISOKO TV RWANDA · Menu
              </span>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => navigateTo('/advertise')}
                className="p-3 bg-[#1c1c1c] rounded-xl border border-zinc-800 text-left space-y-1 hover:border-[#e50914]"
              >
                <DollarSign className="w-5 h-5 text-[#e50914]" />
                <span className="font-bold text-white block">Advertise (Media Kit)</span>
                <span className="text-zinc-400 text-[11px] block">Kwamamaza ibicuruzwa</span>
              </button>

              <button
                onClick={() => navigateTo('/support')}
                className="p-3 bg-[#1c1c1c] rounded-xl border border-zinc-800 text-left space-y-1 hover:border-[#e50914]"
              >
                <Heart className="w-5 h-5 text-amber-400 fill-current" />
                <span className="font-bold text-white block">Support (MoMo Pay)</span>
                <span className="text-zinc-400 text-[11px] block">Tanga inkunga ya MoMo</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  setIsNewsletterOpen(true);
                }}
                className="p-3 bg-[#1c1c1c] rounded-xl border border-zinc-800 text-left space-y-1 hover:border-[#e50914]"
              >
                <Mail className="w-5 h-5 text-[#e50914]" />
                <span className="font-bold text-white block">Newsletter (Email)</span>
                <span className="text-zinc-400 text-[11px] block">Iyandikishe muri email</span>
              </button>

              <button
                onClick={() => navigateTo('/about')}
                className="p-3 bg-[#1c1c1c] rounded-xl border border-zinc-800 text-left space-y-1 hover:border-[#e50914]"
              >
                <Info className="w-5 h-5 text-sky-400" />
                <span className="font-bold text-white block">About Isoko TV</span>
                <span className="text-zinc-400 text-[11px] block">Abo turibo n'ikipe yacu</span>
              </button>

              <button
                onClick={() => navigateTo('/contact')}
                className="p-3 bg-[#1c1c1c] rounded-xl border border-zinc-800 text-left space-y-1 hover:border-[#e50914]"
              >
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white block">Contact & WhatsApp</span>
                <span className="text-zinc-400 text-[11px] block">Studio i Kigali</span>
              </button>
            </div>

            <div className="pt-2">
              <a
                href="https://www.youtube.com/@ISOKOTVRWANDA?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#e50914] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2"
              >
                <span>Subscribe on YouTube (@ISOKOTVRWANDA)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
