import React, { useEffect } from 'react';
import { X, ExternalLink, Youtube, Share2 } from 'lucide-react';
import { Video } from '../types';
import { SubscribeButton } from './SubscribeButton';
import { extractYouTubeId } from '../services/youtube';

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
  onDonateClick?: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onDonateClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  // Extract YouTube ID from video url or id
  const getEmbedUrl = () => {
    const extractedId = extractYouTubeId(video.youtubeUrl) || extractYouTubeId(video.id);
    if (extractedId) {
      return `https://www.youtube.com/embed/${extractedId}?autoplay=1&rel=0&modestbranding=1`;
    }
    // Search playlist embed for ISOKO TV RWANDA
    const query = encodeURIComponent(`ISOKO TV RWANDA ${video.title}`);
    return `https://www.youtube.com/embed?listType=search&list=${query}&autoplay=1`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(video.youtubeUrl);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#141414] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-3 bg-[#0c0c0c] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="text-[#e50914] font-bold">ISOKO TV RWANDA</span>
            <span aria-hidden="true">·</span>
            <span>{video.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={getEmbedUrl()}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {video.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>{video.views || '120K views'}</span>
                <span aria-hidden="true">·</span>
                <span>{video.channelTitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SubscribeButton size="sm" />
              <button
                onClick={handleShare}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
                title="Copy video link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-800 hover:bg-[#e50914] text-white rounded-md transition-colors"
                title="Watch on YouTube app"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="p-3.5 bg-[#1b1b1b] rounded-lg text-xs sm:text-sm text-zinc-300 leading-relaxed border border-zinc-800">
            {video.description}
          </div>

          {/* Prompt to support or sponsor */}
          <div className="p-3 bg-gradient-to-r from-[#e50914]/10 to-transparent border border-[#e50914]/20 rounded-lg flex items-center justify-between text-xs">
            <span className="text-zinc-200">
              Ukunda ibiganiro bya Isoko TV? Shyigikira umurimo wacu cyangwa kwamamaza.
            </span>
            {onDonateClick && (
              <button
                onClick={() => {
                  onClose();
                  onDonateClick();
                }}
                className="px-3 py-1.5 bg-[#e50914] hover:bg-[#c90711] text-white font-semibold rounded shrink-0 cursor-pointer"
              >
                Tanga Inkunga →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
