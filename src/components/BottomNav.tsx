import React from 'react';
import { Home, Radio, Tv, Heart, Menu } from 'lucide-react';

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenMore: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPath,
  onNavigate,
  onOpenMore,
}) => {
  const items = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Live TV', path: '/live', icon: Radio, isLive: true },
    { label: 'Shows', path: '/shows', icon: Tv },
    { label: 'Support', path: '/support', icon: Heart, isHeart: true },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-md border-t border-zinc-800/90 pb-safe">
      <div className="grid grid-cols-5 h-14 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center h-full space-y-1 relative cursor-pointer ${
                isActive ? 'text-[#e50914]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isHeart && isActive ? 'fill-current' : ''}`} />
                {item.isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More Menu */}
        <button
          onClick={onOpenMore}
          className="flex flex-col items-center justify-center h-full space-y-1 text-zinc-400 hover:text-zinc-200 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">More</span>
        </button>
      </div>
    </div>
  );
};
