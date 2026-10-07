import React from 'react';
import { Play, ExternalLink, Share2 } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onPlay?: (video: Video) => void;
  onShare?: (video: Video) => void;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  onShare,
  priority = false,
}) => {
  // Format relative date if possible
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    } catch {
      return 'Recent';
    }
  };

  const handleOpenYouTube = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(video);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(video.youtubeUrl);
    }
  };

  return (
    <div
      onClick={() => onPlay && onPlay(video)}
      className="group flex flex-col bg-[#141414] hover:bg-[#1c1c1c] rounded-lg overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Dark gradient on bottom of image for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Video Duration (bottom right standard badge) */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/85 text-white text-[11px] font-medium tracking-tight rounded">
            {video.duration}
          </div>
        )}

        {/* Live Indicator if live */}
        {video.isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-[#e50914] text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wider uppercase animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            LIVE
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata: Category and Channel as clean unboxed text */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5 font-medium">
            <span className="text-[#e50914]">{video.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{video.channelTitle}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white line-clamp-2 leading-snug tracking-tight">
            {video.title}
          </h3>
        </div>

        {/* Footer Metrics & Actions */}
        <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>{video.views || '120K views'}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{formatDate(video.publishedAt)}</span>
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
            <button
              onClick={handleShare}
              className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors"
              title="Copy link"
              aria-label="Share video"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleOpenYouTube}
              className="p-1 hover:text-[#e50914] hover:bg-zinc-800 rounded transition-colors"
              title="Watch directly on YouTube"
              aria-label="Open in YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
