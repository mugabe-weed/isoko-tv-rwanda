import React, { useState } from 'react';
import { X, Youtube, Plus, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail, saveCustomChannelVideo } from '../services/youtube';
import { Video } from '../types';
import { CHANNEL_CONFIG } from '../data/mockData';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoAdded: (video: Video) => void;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onVideoAdded,
}) => {
  const [youtubeInput, setYoutubeInput] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Video['category']>('Comedy');
  const [duration, setDuration] = useState('14:30');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const videoId = extractYouTubeId(youtubeInput);
  const previewThumbnail = videoId ? getYouTubeThumbnail(videoId) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!videoId) {
      setError("Shyiramo link yemewe ya YouTube (e.g. https://www.youtube.com/watch?v=... cyangwa https://youtu.be/...)");
      return;
    }

    const videoTitle = title.trim() || `ISOKO TV: Amashusho Mashya ya @ISOKOTVRWANDA`;

    const newVideo: Video = {
      id: videoId,
      title: videoTitle,
      description: `Amashusho y'umwimerere ya ISOKO TV RWANDA (@ISOKOTVRWANDA).`,
      thumbnail: previewThumbnail || 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80',
      publishedAt: new Date().toISOString(),
      duration: duration || '12:00',
      views: 'New Upload',
      category: category,
      channelTitle: CHANNEL_CONFIG.name,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };

    saveCustomChannelVideo(newVideo);
    onVideoAdded(newVideo);
    setYoutubeInput('');
    setTitle('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#141414] rounded-2xl border border-zinc-700 shadow-2xl overflow-hidden p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#e50914] text-white flex items-center justify-center">
              <Youtube className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Shyiramo Video ya @ISOKOTVRWANDA
              </h3>
              <span className="text-xs text-zinc-400">
                Koporora link yose kuri YouTube channel yawe
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-zinc-300">
                YouTube Video Link cyangwa ID *
              </label>
              <a
                href={CHANNEL_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#e50914] hover:underline flex items-center gap-1"
              >
                <span>Fungura @ISOKOTVRWANDA</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="text"
              required
              value={youtubeInput}
              onChange={(e) => {
                setYoutubeInput(e.target.value);
                setError(null);
              }}
              placeholder="https://www.youtube.com/watch?v=... cyangwa https://youtu.be/..."
              className="w-full bg-[#1b1b1b] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
            />
          </div>

          {/* Thumbnail preview if valid ID detected */}
          {previewThumbnail && (
            <div className="p-3 bg-[#181818] rounded-xl border border-zinc-800 flex items-center gap-3">
              <img
                src={previewThumbnail}
                alt="Preview"
                className="w-24 h-16 object-cover rounded-md bg-zinc-900 border border-zinc-700"
              />
              <div className="text-xs space-y-0.5">
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Video Yabonetse (ID: {videoId})
                </span>
                <span className="text-zinc-400 block text-[11px]">
                  Ifoto y'amashusho yakuwe kuri YouTube ako kanya.
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Umutwe wa Video (Title)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Urugero: ISOKO COMEDY: Papa Mucunyi mu Isoko..."
              className="w-full bg-[#1b1b1b] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Icyiciro (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Video['category'])}
                className="w-full bg-[#1b1b1b] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e50914]"
              >
                <option value="Comedy">Comedy (Urwenya)</option>
                <option value="Interviews">Interviews (Ibiganiro)</option>
                <option value="Muzika">Muzika (Music)</option>
                <option value="Culture">Culture (Umuco)</option>
                <option value="Drama">Drama (Sinema)</option>
                <option value="News">News (Amakuru)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Igihe Imara (Duration)
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="14:30"
                className="w-full bg-[#1b1b1b] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg"
            >
              Reka
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#e50914] hover:bg-[#c90711] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Shyiramo Video</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
