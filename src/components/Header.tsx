import React, { useState } from 'react';
import { Menu, X, Radio, Tv, Sparkles, Heart, DollarSign, Mail, Info, Search, Youtube } from 'lucide-react';
import { CHANNEL_CONFIG } from '../data/mockData';
import { SubscribeButton } from './SubscribeButton';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', labelRw: 'Ahabanza' },
    { name: 'Live TV', path: '/live', labelRw: 'Imbonankubone', isLive: true },
    { name: 'Shows', path: '/shows', labelRw: 'Ibiganiro' },
    { name: 'Advertise', path: '/advertise', labelRw: 'Kwamamaza' },
    { name: 'Support', path: '/support', labelRw: 'Inkunga' },
    { name: 'About', path: '/about', labelRw: 'Abo turibo' },
    { name: 'Contact', path: '/contact', labelRw: 'Twandikire' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      {/* Top breaking news / live alert bar */}
      <div className="bg-[#141414] border-b border-zinc-800/60 px-4 py-1 text-[11px] text-zinc-400 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping shrink-0" />
          <span className="text-zinc-200 font-semibold uppercase tracking-wider text-[10px] shrink-0">
            Rwanda Entertainment Hub:
          </span>
          <span className="truncate text-zinc-400">
            {CHANNEL_CONFIG.tagline} · Kigali, Rwanda
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0 text-zinc-400">
          <a
            href={CHANNEL_CONFIG.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-[#e50914] transition-colors"
          >
            <Youtube className="w-3.5 h-3.5 text-[#e50914]" />
            <span className="font-mono text-[11px] font-semibold">{CHANNEL_CONFIG.handle}</span>
          </a>
          <span aria-hidden="true">·</span>
          <span>WhatsApp: +250 788 345 678</span>
          <span aria-hidden="true">·</span>
          <span>MoMo Code: 839210</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          {/* Logo Icon */}
          <div className="w-9 h-9 rounded-lg bg-[#e50914] flex items-center justify-center text-white shadow-lg shadow-[#e50914]/20 group-hover:scale-105 transition-transform">
            <Tv className="w-5 h-5 fill-current" />
          </div>

          {/* Logo Text */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-display">
                ISOKO TV
              </span>
              <span className="text-[10px] bg-[#e50914] text-white px-1.5 py-0.2 rounded font-bold tracking-wider">
                RWANDA
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 -mt-0.5 tracking-tight hidden sm:block">
              {CHANNEL_CONFIG.handle}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (clean typography with subtle active underline) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-zinc-800/80'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                {link.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse" />
                )}
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#e50914] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              title="Shakisha amavidewo n'ibiganiro"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Quick Subscribe Button */}
          <div className="hidden sm:block">
            <SubscribeButton size="sm" showCount={false} />
          </div>

          {/* Quick Donate Button */}
          <button
            onClick={() => handleNavClick('/support')}
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-zinc-800 hover:bg-zinc-700 text-amber-300 hover:text-white transition-colors cursor-pointer border border-zinc-700/60"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#e50914]" />
            <span>Support</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d0d] border-b border-zinc-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-300 hover:bg-zinc-850 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {link.isLive && (
                      <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                    )}
                    <span>{link.name}</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-normal">
                    {link.labelRw}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Drawer Actions */}
          <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-2">
            <SubscribeButton size="md" className="w-full" />
            <button
              onClick={() => handleNavClick('/support')}
              className="w-full py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-[#e50914]" />
              <span>Donate (MoMo)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
