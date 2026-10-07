import React from 'react';
import { Radio, Calendar, Clock, Bell, Share2, Heart, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { CHANNEL_CONFIG } from '../data/mockData';
import { LivePlayer } from '../components/LivePlayer';
import { SectionTitle } from '../components/SectionTitle';

interface LivePageProps {
  onNavigate: (path: string) => void;
}

export const LivePage: React.FC<LivePageProps> = ({ onNavigate }) => {
  const schedule = [
    {
      time: '14:00 - 15:30',
      title: 'Isoko Daily News & Trending Updates',
      host: 'Prince Mugabe',
      status: 'Completed',
    },
    {
      time: '18:00 - 19:30',
      title: 'Umusangiro n Ibyamamare (Celebrity Exclusive Live)',
      host: 'Keza Diane & Bruce Melodie (Special Guest)',
      status: 'Broadcasting Now',
      isCurrent: true,
    },
    {
      time: '20:30 - 22:00',
      title: 'Umurabyo Comedy Night Live Stream',
      host: 'Rusine & Clapton Kibonke',
      status: 'Coming Up Tonight',
    },
    {
      time: '22:30 - 00:00',
      title: 'Kigali Night Life Live Cam & Club DJ Sets',
      host: 'DJ Brian & Sonia Uwase',
      status: 'Late Night',
    },
  ];

  const handleShareStream = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CHANNEL_CONFIG.youtubeUrl);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 pb-16">
      {/* Top Banner Alert */}
      <div className="p-3 bg-[#e50914]/10 border border-[#e50914]/30 rounded-lg flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-ping" />
          <span className="font-bold text-white uppercase tracking-wider">
            IMBONANKUBONE (LIVE STREAM):
          </span>
          <span className="text-zinc-300 hidden sm:inline">
            Isoko TV iri guca kuri YouTube mu mashusho ya 1080p Full HD.
          </span>
        </div>
        <button
          onClick={handleShareStream}
          className="text-[#e50914] hover:text-white font-semibold flex items-center gap-1 cursor-pointer shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Sangiza Abandi (Share)</span>
        </button>
      </div>

      {/* 1. FULL-WIDTH PERMANENT YOUTUBE LIVE EMBED PLAYER */}
      <section className="space-y-4">
        <LivePlayer
          isFullWidth={true}
          onDonateClick={() => onNavigate('/support')}
          title="ISOKO TV RWANDA LIVE — Imbonankubone kuri YouTube"
          viewersCount="4,250 Abareba Live Ubu"
          showChatToggle={true}
        />
      </section>

      {/* 2. LIVE BROADCAST SCHEDULE & PROGRAMMING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Schedule */}
        <div className="lg:col-span-8 space-y-4">
          <SectionTitle
            title="Gahunda y'Uyu Munsi"
            kinyarwandaTitle="Today's Live Schedule"
            description="Ibiganiro by'imbonankubone bica kuri Isoko TV Rwanda kuri uyu munsi wose (Kigali Time - CAT GMT+2)."
          />

          <div className="space-y-3">
            {schedule.map((item, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all ${
                  item.isCurrent
                    ? 'bg-[#181818] border-[#e50914] shadow-lg shadow-[#e50914]/5'
                    : 'bg-[#141414] border-zinc-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {item.isCurrent ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#e50914] px-2 py-0.5 rounded uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        IRI GUCA UBU
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="font-mono">{item.time}</span>
                    </div>
                  </div>

                  <span className="text-xs text-zinc-400">
                    Host: <strong className="text-zinc-200">{item.host}</strong>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Interactive stream perks & Donation Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stream Donation / Super Chat Promo */}
          <div className="bg-[#161616] rounded-xl border border-zinc-800 p-5 space-y-4">
            <div className="flex items-center gap-2 text-[#e50914] font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Stream Tip & Super Chat</span>
            </div>

            <h3 className="text-base font-bold text-white">
              Shyigikira Ikiganiro uri Kureba
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Koresha MTN Mobile Money cyangwa PayPal wohereze inkunga. Ubutumwa bwawe burahita busomerwa kuri Live Stream!
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-black/60 rounded border border-zinc-800 flex justify-between items-center">
                <span className="text-amber-400 font-bold">MTN MoMo Pay:</span>
                <span className="text-white font-bold text-sm">839210</span>
              </div>
              <div className="p-2.5 bg-black/60 rounded border border-zinc-800 flex justify-between items-center">
                <span className="text-[#e50914] font-bold">USSD Dial:</span>
                <span className="text-white font-bold">*182*8*1*839210#</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/support')}
              className="w-full py-2.5 px-4 bg-[#e50914] hover:bg-[#c90711] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Tanga Inkunga Ubu</span>
            </button>
          </div>

          {/* YouTube Member Perks Card */}
          <div className="bg-[#141414] rounded-xl border border-zinc-800 p-5 space-y-3">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Uburyo bwo Kudacikanwa
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Kanda Subscribe kuri YouTube wemere Notifications kugira ngo uhite ubona ubutumwa igihe cyose dutangiye ikiganiro gishya.
            </p>
            <a
              href={CHANNEL_CONFIG.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 px-3 bg-zinc-850 hover:bg-zinc-800 text-white rounded text-xs font-semibold border border-zinc-700 transition-colors"
            >
              Kanda Kuri YouTube Kandi Wiyandikishe →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
