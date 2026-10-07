import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, Bell, Users, Trash2, Sparkles, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import {
  getNewsletterSubscribers,
  subscribeNewsletter,
  unsubscribeNewsletter,
  NewsletterSubscriber,
} from '../services/newsletter';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'ISOKO COMEDY',
    'Live TV Alerts',
  ]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [showSubscribersList, setShowSubscribersList] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubscribers(getNewsletterSubscribers());
      setFeedback(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const availableInterests = [
    'ISOKO COMEDY (Papa Mucunyi & Kampire)',
    'Celebrity Interviews & Red Carpet',
    'Live TV Alerts',
    'Rwanda Music Charts & Amakuru',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    setTimeout(() => {
      const res = subscribeNewsletter(email, selectedInterests);
      setIsSubmitting(false);

      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
        setSubscribers(getNewsletterSubscribers());
        setEmail('');
        if (onSuccess) onSuccess(res.message);
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    }, 350);
  };

  const handleDeleteSubscriber = (subEmail: string) => {
    unsubscribeNewsletter(subEmail);
    const updated = getNewsletterSubscribers();
    setSubscribers(updated);
    if (onSuccess) {
      onSuccess(`Email ${subEmail} yavanywe mu bakira newsletter.`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#141414] rounded-2xl border border-zinc-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-[#181818] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e50914] text-white flex items-center justify-center shadow-lg shadow-[#e50914]/20">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base font-display">
                  ISOKO TV NEWSLETTER
                </h3>
                <span className="text-[10px] bg-[#e50914]/20 text-[#e50914] px-1.5 py-0.5 rounded font-mono font-bold">
                  {subscribers.length} Abiyandikishije
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Akira amakuru mashya n'amavidewo ya Papa Mucunyi muri email
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close newsletter modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Form */}
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Email Address yawe *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="urugero: keza.diane@gmail.com"
                  className="w-full bg-[#1b1b1b] border border-zinc-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914] transition-colors"
                />
              </div>
            </div>

            {/* Interests Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">
                Hitamo ibyo wifuza ko bikugeraho (Interests):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableInterests.map((interest) => {
                  const isChecked = selectedInterests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-[#1f1616] border-[#e50914] text-white'
                          : 'bg-[#181818] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span className="truncate pr-2">{interest}</span>
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-[#e50914] border-[#e50914] text-white'
                            : 'border-zinc-700 bg-zinc-900'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback alert */}
            {feedback && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2.5 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-700/60 text-emerald-300'
                    : 'bg-red-950/60 border border-red-700/60 text-red-300'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{feedback.text}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#e50914] hover:bg-[#c90711] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Kwiyandikisha...' : 'Iyandikishe muri Newsletter'}</span>
            </button>
          </form>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/80">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Ntitubangamira ubutumwa bwawe (No spam). Urabihagarika igihe cyose ubishakiye.</span>
          </div>

          {/* Local Mock State Viewer for testing/reviewing */}
          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowSubscribersList(!showSubscribersList)}
                className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-[#e50914]" />
                <span>
                  {showSubscribersList
                    ? 'Hisha urutonde rwa mock state'
                    : `Reba urutonde rwa mock state (${subscribers.length} entries)`}
                </span>
              </button>

              <span className="text-[10px] text-zinc-500 font-mono">
                localStorage: isoko_newsletter_subscribers
              </span>
            </div>

            {showSubscribersList && (
              <div className="bg-[#101010] rounded-xl border border-zinc-800 p-3 space-y-2 max-h-48 overflow-y-auto text-xs">
                {subscribers.length === 0 ? (
                  <p className="text-zinc-500 text-center py-2 text-xs">
                    Nta muntu uriyandikisha muri mock state.
                  </p>
                ) : (
                  subscribers.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-2 bg-[#161616] rounded-lg border border-zinc-800/80 flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <span className="font-semibold text-zinc-200 block truncate font-mono">
                          {sub.email}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                          <span>{new Date(sub.subscribedAt).toLocaleDateString()}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-zinc-400 truncate">
                            {sub.interests.join(', ')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteSubscriber(sub.email)}
                        className="p-1 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-800 transition-colors"
                        title="Siba iyi email muri mock state"
                        aria-label="Delete subscriber"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
