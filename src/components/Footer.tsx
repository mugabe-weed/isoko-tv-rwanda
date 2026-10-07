import React, { useState, useEffect } from 'react';
import { Youtube, Instagram, MessageCircle, Mail, Phone, MapPin, Heart, Shield, Tv, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { CHANNEL_CONFIG } from '../data/mockData';
import { SubscribeButton } from './SubscribeButton';
import { NewsletterModal } from './NewsletterModal';
import { subscribeNewsletter, getNewsletterSubscribers } from '../services/newsletter';

interface FooterProps {
  onNavigate: (path: string) => void;
  onNotify?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNotify }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState<number>(0);

  useEffect(() => {
    setSubscribersCount(getNewsletterSubscribers().length);
  }, []);

  const handleInlineSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNewsletterStatus(null);

    setTimeout(() => {
      const res = subscribeNewsletter(newsletterEmail);
      setIsSubmitting(false);

      if (res.success) {
        setNewsletterStatus({ type: 'success', text: res.message });
        setNewsletterEmail('');
        setSubscribersCount(getNewsletterSubscribers().length);
        if (onNotify) onNotify(res.message);
      } else {
        setNewsletterStatus({ type: 'error', text: res.message });
      }
    }, 300);
  };

  return (
    <footer className="bg-[#0c0c0c] border-t border-zinc-800 text-zinc-400 text-xs pb-16 lg:pb-0">
      {/* 1. Top CTA banner */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-r from-[#141414] via-[#111111] to-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-display">
              ISOKO TV RWANDA · Umuyoboro w'imyidagaduro
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
              Gana umuryango w'abarenga ibihumbi 185 bakurikira ibyamamare, urwenya, n'umuziki nyarwanda buri munsi kuri YouTube.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <SubscribeButton size="md" />
            <button
              onClick={() => onNavigate('/support')}
              className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-[#e50914]" />
              <span>Tanga Inkunga (MoMo)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. ISOKO TV NEWSLETTER SUBSCRIPTION SECTION */}
      <div className="border-b border-zinc-800/80 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Newsletter text */}
            <div className="lg:col-span-5 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e50914]" />
                <span className="font-bold text-white uppercase text-xs tracking-wider">
                  ISOKO TV NEWSLETTER
                </span>
                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                  {subscribersCount} Subscribed
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Akira amavidewo mashya n'ubutumwa bwa Papa Mucunyi muri Email
              </h4>
              <p className="text-xs text-zinc-400 max-w-md">
                Iyandikishe ujye ubona mbere y'abandi ibiganiro bya Live TV, urwenya rushya, n'amakuru y'ibyamamare i Kigali.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleInlineSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        setNewsletterStatus(null);
                      }}
                      placeholder="Andika email yawe hano (e.g. keza@gmail.com)..."
                      className="w-full bg-[#161616] border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-[#e50914] hover:bg-[#c90711] disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Kohereza...' : 'Iyandikishe'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium rounded-lg border border-zinc-700 transition-colors cursor-pointer shrink-0"
                    title="Fungura ifishi yose cyangwa urebe mock state entries"
                  >
                    <span>Manage / Options</span>
                  </button>
                </div>

                {/* Inline Status Message */}
                {newsletterStatus && (
                  <div
                    className={`p-2 rounded text-xs flex items-center gap-2 ${
                      newsletterStatus.type === 'success'
                        ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-300'
                        : 'bg-red-950/70 border border-red-700/60 text-red-300'
                    }`}
                  >
                    {newsletterStatus.type === 'success' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    )}
                    <span>{newsletterStatus.text}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#e50914] flex items-center justify-center text-white">
                <Tv className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-white text-base font-display">
                ISOKO TV RWANDA
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
              Umuyoboro w'imbere mu gususurutsa Abanyarwanda n'inshuti zabo mu Rwanda no mu mahanga. Amakuru y'ibyamamare, ibitaramo, amakinamico, n'urwenya rugezweho.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={CHANNEL_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-850 hover:bg-[#e50914] text-white flex items-center justify-center transition-colors"
                title="YouTube @ISOKOTVRWANDA"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/isokotvrwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-850 hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
                title="Instagram @isokotvrwanda"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CHANNEL_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-850 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                title="WhatsApp Direct Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Urubuga (Navigation)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ahabanza (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/live')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-[#e50914]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-ping" />
                  Live TV Stream
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shows')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ibiganiro (Shows & Series)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-zinc-300"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e50914]" />
                  <span>Newsletter (Iyandikishe)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Abo turibo (About Us)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Business & Ads */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Ubucuruzi & Inkunga
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/advertise')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kwamamaza (Media Kit & Ads)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/support')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tanga Inkunga (MTN MoMo & PayPal)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Twandikire (Contact Studio)
                </button>
              </li>
              <li>
                <span className="text-zinc-500">MoMo Pay Code: 839210</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio Address */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Studio i Kigali
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e50914] shrink-0 mt-0.5" />
                <span>Nyarugenge, Kigali - Rwanda</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e50914] shrink-0" />
                <a href="tel:+250788345678" className="hover:text-white">
                  +250 788 345 678
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e50914] shrink-0" />
                <a href="mailto:info@isokotv.rw" className="hover:text-white">
                  info@isokotv.rw
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} ISOKO TV RWANDA. Uburenganzira bwose burabitswe.</p>
          <p className="flex items-center gap-2">
            <span>Kigali, Rwanda</span>
            <span>·</span>
            <span>YouTube: @ISOKOTVRWANDA</span>
          </p>
        </div>
      </div>

      {/* Newsletter Subscription & Management Modal */}
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSubscribersCount(getNewsletterSubscribers().length);
        }}
        onSuccess={onNotify}
      />
    </footer>
  );
};
