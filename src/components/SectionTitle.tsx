import React from 'react';

interface SectionTitleProps {
  title: string;
  kinyarwandaTitle?: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  kinyarwandaTitle,
  description,
  actionText,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 ${className}`}>
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1.5 h-5 bg-[#e50914] rounded-xs" aria-hidden="true" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-display">
            {title}
          </h2>
          {kinyarwandaTitle && (
            <span className="text-xs text-zinc-400 font-normal">
              · {kinyarwandaTitle}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="self-start sm:self-end text-xs font-semibold text-[#e50914] hover:text-[#ff2b36] transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:underline"
        >
          <span>{actionText}</span>
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
};
