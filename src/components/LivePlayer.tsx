import React, { useState } from 'react';
import { Radio, ExternalLink, MessageSquare, Maximize2, Minimize2, Heart, Volume2, RefreshCw } from 'lucide-react';
import { CHANNEL_CONFIG } from '../data/mockData';
import { getLiveEmbedUrl } from '../services/youtube';

interface LivePlayerProps {
  channelId?: string;
  isFullWidth?: boolean;
  onDonateClick?: () => void;
  title?: string;
  viewersCount?: string;
  showChatToggle?: boolean;
}

export const LivePlayer: React.FC<LivePlayerProps> = ({
  channelId,
  isFullWidth = false,
  onDonateClick,
  title = "ISOKO LIVE: Kigali Prime Entertainment & Celebrity Breaking News",
  viewersCount = "4.2K watching now",
  showChatToggle = true,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeSource, setActiveSource] = useState<'stream' | 'featured'>('stream');
  const [refreshKey, setRefreshKey] = useState(0);

  // If active source is featured video, we use high quality embed
  const embedUrl = activeSource === 'stream'
    ? getLiveEmbedUrl(channelId)
    : `https://www.youtube.com/embed/${CHANNEL_CONFIG.featuredVideoId}?autoplay=1&mute=0&rel=0`;

  return (
    <div className={`flex flex-col bg-[#141414] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-300 ${
      isTheater ? 'w-full' : ''
    }`}>
      {/* Stream Top Header Bar */}
      <div className="px-4 py-2.5 bg-[#0f0f0f] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          {/* Live pulsing indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#e50914] text-white font-bold rounded text-[11px] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE NOW</span>
          </div>

          <span className="text-zinc-300 font-medium hidden sm:inline">
            ISOKO TV RWANDA Stream 1
          </span>
          <span className="text-zinc-500 hidden sm:inline">·</span>
          <span className="text-emerald-400 font-medium">
            {viewersCount}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Switch stream mode */}
          <button
            onClick={() => setActiveSource(s => s === 'stream' ? 'featured' : 'stream')}
            className="px-2 py-1 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded text-[11px] font-medium transition-colors flex items-center gap-1"
            title="Simbuka kuri video ifunguye cyangwa live stream"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{activeSource === 'stream' ? 'Live Channel' : 'Featured Show'}</span>
          </button>

          {showChatToggle && (
            <button
              onClick={() => setShowChat(!showChat)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                showChat ? 'bg-[#e50914] text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Chat</span>
            </button>
          )}

          <button
            onClick={() => setIsTheater(!isTheater)}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-700 rounded transition-colors hidden md:block"
            title={isTheater ? "Normal mode" : "Theater mode"}
          >
            {isTheater ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <a
            href={CHANNEL_CONFIG.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-[#e50914] bg-zinc-800/60 hover:bg-zinc-700 rounded transition-colors"
            title="Reba kuri YouTube application"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Player + Chat Grid */}
      <div className={`grid ${showChat ? 'lg:grid-cols-4' : 'grid-cols-1'} bg-black`}>
        {/* Video Embed Frame */}
        <div className={`relative ${showChat ? 'lg:col-span-3' : 'col-span-1'} w-full bg-black aspect-video min-h-[240px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[500px]`}>
          <iframe
            key={`${embedUrl}-${refreshKey}`}
            src={embedUrl}
            title="ISOKO TV RWANDA Live Stream"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
          />
        </div>

        {/* Live Chat Panel (collapsible) */}
        {showChat && (
          <div className="lg:col-span-1 bg-[#121212] border-t lg:border-t-0 lg:border-l border-zinc-800 flex flex-col h-[300px] lg:h-auto max-h-[500px]">
            <div className="p-2.5 bg-[#181818] border-b border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-200">Kigali Live Chat</span>
              <span className="text-[11px] text-zinc-400">Ikiganiro cyo mu kiganiro</span>
            </div>

            {/* Simulated interactive live messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-400 shrink-0">Keza_KGL:</span>
                <span className="text-zinc-300">Muraho Isoko TV! Iki kiganiro cyari gitegerejwe cyane 🔥🇷🇼</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-sky-400 shrink-0">Patrick_Canada:</span>
                <span className="text-zinc-300">Tubakurikira turi i Montreal! Murakoze gushyigikira impano nyarwanda.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-[#e50914] shrink-0">ISOKO_MOD:</span>
                <span className="text-zinc-200 bg-zinc-800/80 px-2 py-0.5 rounded">
                  📌 Ikaze kuri Isoko TV Rwanda! Mwandike ibibazo mugeneye umutumirwa wacu.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-emerald-400 shrink-0">Eric_Musanze:</span>
                <span className="text-zinc-300">Bruce Melodie na Shaggy ni ubuhangange bukomeye! Amashusho akeye cyane.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-purple-400 shrink-0">Sandrine_Kicukiro:</span>
                <span className="text-zinc-300">Isoni zirahari se? Rusine arasekeje cyane 😂😂😂</span>
              </div>
            </div>

            {/* Chat footer with direct YouTube prompt */}
            <div className="p-2.5 bg-[#181818] border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Nyandika kuri YouTube Live</span>
              <a
                href={CHANNEL_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e50914] font-medium hover:underline"
              >
                Kora Sign In →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Stream Info & Quick Tip Bar */}
      <div className="p-4 bg-[#141414] border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="text-[#e50914] font-medium">ISOKO TV EXCLUSIVE</span>
            <span aria-hidden="true">·</span>
            <span>Broadcasting 1080p Full HD</span>
            <span aria-hidden="true">·</span>
            <span>Kigali Studio Live</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>

        {onDonateClick && (
          <button
            onClick={onDonateClick}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#e50914] hover:bg-[#c90711] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <Heart className="w-4 h-4 fill-current text-white animate-pulse" />
            <span>Tanga Inkunga (Tip Stream)</span>
          </button>
        )}
      </div>
    </div>
  );
};
