import React, { useState, useEffect } from 'react';
import { Play, Radio, Heart, Youtube, Flame, Search, ArrowRight, CheckCircle2, Sparkles, Filter, Plus, ExternalLink } from 'lucide-react';
import { Video } from '../types';
import { CHANNEL_CONFIG, MEDIA_KIT_DATA } from '../data/mockData';
import { fetchLatestVideos } from '../services/youtube';
import { VideoCard } from '../components/VideoCard';
import { SectionTitle } from '../components/SectionTitle';
import { SubscribeButton } from '../components/SubscribeButton';
import { LivePlayer } from '../components/LivePlayer';
import { AddVideoModal } from '../components/AddVideoModal';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onPlayVideo: (video: Video) => void;
  onNotify?: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onPlayVideo, onNotify }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'api' | 'fallback'>('fallback');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = ['All', 'Comedy', 'Interviews', 'Muzika', 'Culture', 'Drama', 'News'];

  const loadVideos = async () => {
    setLoading(true);
    const res = await fetchLatestVideos(16);
    setVideos(res.videos);
    setSource(res.source);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleVideoAdded = (newVideo: Video) => {
    setVideos((prev) => [newVideo, ...prev]);
    if (onNotify) {
      onNotify(`Video "${newVideo.title.slice(0, 30)}..." yashyizwe ku rubuga neza!`);
    }
  };

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. HERO SECTION WITH LIVE EMBED & QUICK CHANNEL OVERVIEW */}
      <section className="relative pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text column */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                <span className="font-semibold text-white">#1 mu Myidagaduro</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-zinc-400">Kigali, Rwanda</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none font-display">
                ISOKO TV <span className="text-[#e50914]">RWANDA</span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                Umuyoboro w'imyidagaduro — Amakuru y'ibyamamare, ibitaramo, urwenya, n'indirimbo nshya zigezweho mu Rwanda no hanze yarwo.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <SubscribeButton size="lg" />
                <button
                  onClick={() => onNavigate('/live')}
                  className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-sm font-semibold border border-zinc-700/80 hover:border-zinc-500 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Radio className="w-4 h-4 text-[#e50914] animate-pulse" />
                  <span>Reba Live TV</span>
                </button>
                <button
                  onClick={() => onNavigate('/support')}
                  className="px-4 py-3 bg-[#e50914]/15 hover:bg-[#e50914]/25 text-white border border-[#e50914]/40 rounded-md text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#e50914] fill-current" />
                  <span>Tanga Inkunga (MoMo)</span>
                </button>
              </div>

              {/* Mini Social Metrics Bar */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-zinc-400 border-t border-zinc-850">
                <div>
                  <span className="font-bold text-white text-base block font-mono">185K+</span>
                  <span className="text-[11px] text-zinc-500">Subscribers</span>
                </div>
                <div className="w-px h-6 bg-zinc-800" />
                <div>
                  <span className="font-bold text-white text-base block font-mono">3.4M+</span>
                  <span className="text-[11px] text-zinc-500">Monthly Views</span>
                </div>
                <div className="w-px h-6 bg-zinc-800" />
                <div>
                  <span className="font-bold text-white text-base block font-mono">850+</span>
                  <span className="text-[11px] text-zinc-500">Videos</span>
                </div>
              </div>
            </div>

            {/* Right column: Live player embed preview */}
            <div className="lg:col-span-7">
              <LivePlayer
                onDonateClick={() => onNavigate('/support')}
                title="ISOKO PRIME: Ikiganiro kirimo guca kuri YouTube Live"
                viewersCount="3.8K bakurikiye Live"
                showChatToggle={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. LATEST VIDEOS SECTION (12 VIDEOS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Amavidewo Mashya"
          kinyarwandaTitle="Latest Uploads"
          description="Kurikirana ibiganiro biheruka gusohoka ku muyoboro wa Isoko TV Rwanda kuri YouTube."
          actionText="Ibiganiro Byose"
          onActionClick={() => onNavigate('/shows')}
        />

        {/* Filter, Search, and Add Video Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#e50914] text-white shadow'
                    : 'bg-[#181818] text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                {cat === 'All' ? 'Byose (All)' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Shakisha video..."
                className="w-full bg-[#141414] border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914] transition-colors"
              />
            </div>

            {/* Add Custom Video from @ISOKOTVRWANDA Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 bg-[#e50914]/15 hover:bg-[#e50914]/25 text-[#e50914] hover:text-white border border-[#e50914]/40 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Shyiramo link ya video wifuza kugaragaza hano"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Ongeraho Video</span>
            </button>
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-video bg-zinc-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="p-12 text-center bg-[#141414] rounded-xl border border-zinc-800 text-zinc-400 text-sm">
            Nta videwo ibonetse kuri ubu bwoko cyangwa ijambo washakishije.
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="block mx-auto mt-2 text-[#e50914] hover:underline"
            >
              Kanda hano urebe byose
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredVideos.map((video, idx) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={onPlayVideo}
                priority={idx < 4}
              />
            ))}
          </div>
        )}

        {/* Load more / YouTube channel trigger */}
        <div className="mt-8 text-center">
          <a
            href={CHANNEL_CONFIG.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#181818] hover:bg-zinc-800 text-white rounded-lg text-xs sm:text-sm font-semibold border border-zinc-700/80 transition-colors shadow"
          >
            <Youtube className="w-4 h-4 text-[#e50914]" />
            <span>Reba amavidewo yose 850+ kuri YouTube Channel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 3. PROMINENT DONATION / SUPPORT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#1a1a1a] border border-zinc-800 p-6 sm:p-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e50914]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#e50914] uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Shyigikira Isoko TV Rwanda</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                Fasha Umuyoboro Wacu Gukomeza Gutera Imbere
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Inkunga yawe idufasha kugura ibikoresho by'amashusho bigezweho (4K Cameras, Audio, Drones), guhemba abanyamakuru, no kugera mu ntara zose z'u Rwanda dushakisha impano nshya.
              </p>

              {/* Quick MoMo highlights */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-zinc-300">
                <div className="bg-black/60 px-3 py-1.5 rounded border border-zinc-800">
                  <span className="text-amber-400 font-bold">MTN MoMo Pay:</span> 839210
                </div>
                <div className="bg-black/60 px-3 py-1.5 rounded border border-zinc-800">
                  <span className="text-[#e50914] font-bold">USSD:</span> *182*8*1*839210#
                </div>
                <div className="bg-black/60 px-3 py-1.5 rounded border border-zinc-800">
                  <span className="text-sky-400 font-bold">PayPal:</span> donate@isokotv.rw
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onNavigate('/support')}
                className="w-full py-3.5 px-6 bg-[#e50914] hover:bg-[#c90711] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Tanga Inkunga Ubu (Donate)</span>
              </button>

              <button
                onClick={() => onNavigate('/advertise')}
                className="w-full py-3 px-6 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm rounded-lg border border-zinc-700 transition-colors cursor-pointer text-center"
              >
                Kwamamaza na Isoko TV (Media Kit)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHORT "ABOUT ISOKO TV" TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] rounded-xl border border-zinc-800/90 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#e50914] tracking-wider uppercase">
                <span>Abo Turibo</span>
                <span aria-hidden="true">·</span>
                <span>About Isoko TV Rwanda</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Isoko yizewe y'imyidagaduro n'umuco nyarwanda
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Yashinzwe ifite intego yo guha urubuga abahanzi nyarwanda, kumenyekanisha imyidagaduro yo mu Rwanda ku rwego mpuzamahanga, no guhuza Abanyarwanda baba mu gihugu n'abari mu mahanga (Diaspora).
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e50914] shrink-0" />
                  <span>Ibiganiro by'amashusho ya 4K Ultra HD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e50914] shrink-0" />
                  <span>Icyicaro gikuru i Nyarugenge, Kigali</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e50914] shrink-0" />
                  <span>Abarenga 185,000 badukurikira</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e50914] shrink-0" />
                  <span>Ibitaramo by'imbonankubone (Live)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-xs font-semibold text-[#e50914] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Soma inkuru yacu yose n'itsinda rikorana natwe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right preview badge card */}
            <div className="md:col-span-5 bg-[#181818] rounded-xl p-5 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs text-zinc-400 font-medium">Official Channel</span>
                <span className="text-xs font-mono font-bold text-[#e50914]">@ISOKOTVRWANDA</span>
              </div>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Icyicaro:</span>
                  <span className="font-medium text-white">Kigali, Rwanda</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Ururimi rw'ibanze:</span>
                  <span className="font-medium text-white">Ikinyarwanda & English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Ubwoko bw'ibirimo:</span>
                  <span className="font-medium text-white">Music, Comedy, Red Carpet, Series</span>
                </div>
              </div>
              <div className="pt-2">
                <SubscribeButton size="md" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Custom Video from @ISOKOTVRWANDA Modal */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onVideoAdded={handleVideoAdded}
      />
    </div>
  );
};
