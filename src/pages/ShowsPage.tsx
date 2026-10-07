import React, { useState } from 'react';
import { Tv, Calendar, User, Play, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { SHOWS_DATA } from '../data/mockData';
import { Show, Video } from '../types';
import { SectionTitle } from '../components/SectionTitle';

interface ShowsPageProps {
  onPlayVideo: (video: Video) => void;
}

export const ShowsPage: React.FC<ShowsPageProps> = ({ onPlayVideo }) => {
  const [selectedShow, setSelectedShow] = useState<Show>(SHOWS_DATA[0]);

  const handlePlayEpisode = (episode: Show['recentEpisodes'][0], show: Show) => {
    const videoObj: Video = {
      id: episode.id,
      title: episode.title,
      description: `${show.title} hosted by ${show.host}.`,
      thumbnail: episode.thumbnail,
      publishedAt: new Date().toISOString(),
      duration: episode.duration,
      views: `${episode.views} views`,
      category: 'Interviews',
      channelTitle: 'ISOKO TV RWANDA',
      youtubeUrl: episode.youtubeUrl,
    };
    onPlayVideo(videoObj);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-16">
      {/* Page Header */}
      <div>
        <SectionTitle
          title="Ibiganiro Byose"
          kinyarwandaTitle="Shows & Programs"
          description="Uruhererekane rw'ibiganiro bishimishije binyura kuri Isoko TV Rwanda: Ibyamamare, urwenya, imideli, umuziki na cinema."
        />
      </div>

      {/* 1. FEATURED SHOW SPOTLIGHT BANNER */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-[#141414]">
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full min-h-[220px]">
          <img
            src={selectedShow.banner}
            alt={selectedShow.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/70 to-transparent" />

          {/* Banner content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <span className="text-[#e50914] font-bold uppercase">{selectedShow.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedShow.episodeCount} Episodes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedShow.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2">
                {selectedShow.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#e50914]" />
                  <span>Host: <strong className="text-white">{selectedShow.host}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#e50914]" />
                  <span>{selectedShow.schedule}</span>
                </div>
              </div>
            </div>

            <a
              href="https://www.youtube.com/@ISOKOTVRWANDA/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#e50914] hover:bg-[#c90711] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shrink-0 self-start sm:self-end transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Reba Playlist kuri YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. PROGRAM GRID (SELECTABLE) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <Tv className="w-4 h-4 text-[#e50914]" />
            <span>Hitamo Ikiganiro Urebe Ibice Byacyo</span>
          </h3>
          <span className="text-xs text-zinc-500">
            {SHOWS_DATA.length} Programs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SHOWS_DATA.map((show) => {
            const isSelected = selectedShow.id === show.id;
            return (
              <div
                key={show.id}
                onClick={() => setSelectedShow(show)}
                className={`group flex flex-col rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#1a1a1a] border-[#e50914] shadow-lg shadow-[#e50914]/10'
                    : 'bg-[#141414] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
                  <img
                    src={show.thumbnail}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-[11px] bg-black/70 px-2 py-0.5 rounded">
                      {show.category}
                    </span>
                    <span className="text-zinc-300 text-[11px]">
                      {show.episodeCount} Episodes
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-white text-base group-hover:text-[#e50914] transition-colors leading-snug">
                      {show.title}
                    </h4>
                    <span className="text-xs text-zinc-400 block mt-0.5">
                      {show.kinyarwandaTitle}
                    </span>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {show.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 text-xs text-zinc-400 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Airing:</span>
                      <span className="text-zinc-300 font-medium">{show.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Host:</span>
                      <span className="text-white font-medium">{show.host}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. RECENT EPISODES OF SELECTED SHOW */}
      <section className="bg-[#121212] rounded-xl border border-zinc-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Ibice Biheruka: {selectedShow.title}
            </h3>
            <span className="text-xs text-zinc-400">
              Kanda ku gice ushaka kureba ako kanya
            </span>
          </div>

          <a
            href="https://www.youtube.com/@ISOKOTVRWANDA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#e50914] hover:underline inline-flex items-center gap-1"
          >
            <span>Reba ibice byose kuri YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedShow.recentEpisodes.map((ep) => (
            <div
              key={ep.id}
              onClick={() => handlePlayEpisode(ep, selectedShow)}
              className="group flex flex-col bg-[#181818] rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
            >
              <div className="relative aspect-video w-full bg-zinc-900">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] rounded font-mono">
                  {ep.duration}
                </span>
              </div>

              <div className="p-3">
                <h5 className="text-xs font-bold text-white group-hover:text-[#e50914] line-clamp-2 leading-snug">
                  {ep.title}
                </h5>
                <div className="mt-2 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>{ep.views} views</span>
                  <span className="text-[#e50914]">Kanda urebe →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
