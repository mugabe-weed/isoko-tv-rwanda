import React, { useState, useEffect } from 'react';
import { Search, X, Play, Tv } from 'lucide-react';
import { INITIAL_VIDEOS, SHOWS_DATA } from '../data/mockData';
import { Video, Show } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVideo: (video: Video) => void;
  onSelectShow: (show: Show) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectVideo,
  onSelectShow,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedVideos = INITIAL_VIDEOS.filter(
    (v) =>
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.description.toLowerCase().includes(query.toLowerCase()) ||
      v.category.toLowerCase().includes(query.toLowerCase())
  );

  const matchedShows = SHOWS_DATA.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.host.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#141414] rounded-xl border border-zinc-700 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-[#181818]">
          <Search className="w-5 h-5 text-[#e50914] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Shakisha amavidewo, abahanzi, ibiganiro (e.g. Bruce Melodie, Rusine)..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white bg-zinc-800 px-2 py-1 rounded ml-1"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="p-4 overflow-y-auto space-y-5">
          {/* Shows matches */}
          {matchedShows.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Ibiganiro (Shows)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedShows.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectShow(s);
                      onClose();
                    }}
                    className="p-2.5 bg-[#1a1a1a] hover:bg-[#222222] rounded-lg border border-zinc-800 flex items-center gap-3 cursor-pointer"
                  >
                    <Tv className="w-4 h-4 text-[#e50914] shrink-0" />
                    <div className="truncate">
                      <span className="text-xs font-semibold text-white block truncate">{s.title}</span>
                      <span className="text-[11px] text-zinc-400">Host: {s.host}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos matches */}
          <div>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Amavidewo ({matchedVideos.length})
            </span>
            {matchedVideos.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">
                Nta videwo ihuye n'ijambo washakishije.
              </p>
            ) : (
              <div className="space-y-2">
                {matchedVideos.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => {
                      onSelectVideo(v);
                      onClose();
                    }}
                    className="p-2.5 bg-[#181818] hover:bg-[#222] rounded-lg border border-zinc-800 flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-16 h-10 object-cover rounded shrink-0 bg-zinc-900"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-white truncate block">
                        {v.title}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {v.category} · {v.views}
                      </span>
                    </div>
                    <Play className="w-4 h-4 text-zinc-400 group-hover:text-[#e50914] shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
