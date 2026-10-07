import React, { useState } from 'react';
import { Youtube, Check } from 'lucide-react';
import { CHANNEL_CONFIG } from '../data/mockData';

interface SubscribeButtonProps {
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
  variant?: 'primary' | 'outline';
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  size = 'md',
  showCount = true,
  className = '',
  variant = 'primary',
}) => {
  const [subscribed, setSubscribed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Open official YouTube subscribe link in new tab or app
    window.open(CHANNEL_CONFIG.subscribeUrl, '_blank', 'noopener,noreferrer');
    setSubscribed(true);
  };

  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3 gap-1.5 min-h-[36px]',
    md: 'text-sm py-2 px-4 gap-2 min-h-[44px]',
    lg: 'text-base py-3 px-6 gap-2.5 min-h-[48px] font-semibold',
  };

  if (variant === 'outline') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center font-medium rounded-md border border-zinc-700 bg-transparent text-white hover:border-[#e50914] hover:text-[#e50914] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] cursor-pointer ${sizeClasses[size]} ${className}`}
        title="Kanda hano wiyandikishe kuri YouTube"
      >
        <Youtube className="w-4 h-4 text-[#e50914]" />
        <span>Subscribe</span>
        {showCount && <span className="text-zinc-400 text-xs">· 185K</span>}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 cursor-pointer shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
        subscribed
          ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
          : 'bg-[#e50914] text-white hover:bg-[#c90711] active:scale-[0.98]'
      } ${sizeClasses[size]} ${className}`}
      title="Subscribe to @ISOKOTVRWANDA on YouTube"
    >
      {subscribed ? (
        <>
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Subscribed</span>
        </>
      ) : (
        <>
          <Youtube className="w-4 h-4 shrink-0 fill-current" />
          <span>Subscribe</span>
          {showCount && (
            <span className="text-white/80 font-normal text-xs tracking-tight">
              185K
            </span>
          )}
        </>
      )}
    </button>
  );
};
