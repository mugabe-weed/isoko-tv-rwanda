import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle2, Clock, Globe } from 'lucide-react';
import { CHANNEL_CONFIG } from '../data/mockData';
import { SectionTitle } from '../components/SectionTitle';

interface ContactPageProps {
  onNotify?: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'interview',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      if (onNotify) {
        onNotify('Ubutumwa bwawe bwoherejwe neza kuri Isoko TV Rwanda! Turagusubiza vuba.');
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-16">
      {/* Header */}
      <div>
        <SectionTitle
          title="Twandikire / Vugana Natwe"
          kinyarwandaTitle="Contact Studio"
          description="Ukeneye ikiganiro, kumenyekanisha indirimbo nshya, gutanga amakuru cyangwa kwamamaza? Twandikire cyangwa udusure muri studio i Kigali."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Contact Info & WhatsApp */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Banner Button */}
          <a
            href={CHANNEL_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-gradient-to-r from-emerald-950 to-emerald-900 border border-emerald-700/60 rounded-xl flex items-center justify-between text-white hover:border-emerald-500 transition-all shadow-lg group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">
                  Igisubizo Ako Kanya (Instant)
                </span>
                <span className="font-bold text-white text-base">
                  Twandikire kuri WhatsApp
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">
              Fungura →
            </span>
          </a>

          {/* Contact Cards */}
          <div className="bg-[#141414] rounded-xl border border-zinc-800 p-5 space-y-5">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-zinc-800 pb-2">
              Uburyo Bwose bwo Kudusanga
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-zinc-850 flex items-center justify-center text-[#e50914] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-400 block font-medium">Telefone ya Studio:</span>
                  <a href={`tel:${CHANNEL_CONFIG.phone}`} className="text-white font-mono font-bold hover:text-[#e50914] text-sm block">
                    {CHANNEL_CONFIG.phone}
                  </a>
                  <a href={`tel:${CHANNEL_CONFIG.phoneSecondary}`} className="text-zinc-400 font-mono hover:text-white">
                    {CHANNEL_CONFIG.phoneSecondary} (WhatsApp)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-zinc-850 flex items-center justify-center text-[#e50914] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-400 block font-medium">Email y'Ubuyobozi n'Amakuru:</span>
                  <a href={`mailto:${CHANNEL_CONFIG.email}`} className="text-white hover:text-[#e50914] font-medium block">
                    {CHANNEL_CONFIG.email}
                  </a>
                  <a href={`mailto:${CHANNEL_CONFIG.emailAds}`} className="text-zinc-400 hover:text-white">
                    {CHANNEL_CONFIG.emailAds} (Kwamamaza)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-zinc-850 flex items-center justify-center text-[#e50914] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-400 block font-medium">Icyicaro Gikuru (Studio Address):</span>
                  <p className="text-zinc-200 leading-snug">
                    {CHANNEL_CONFIG.address}
                  </p>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    Hafi ya Banki Nkuru y'u Rwanda (BNR) & Roundabout
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-zinc-850 flex items-center justify-center text-[#e50914] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-400 block font-medium">Amasaha yo Gukora:</span>
                  <p className="text-zinc-200">
                    Kuwa Mbere - Kuwa Gatandatu: 08:00 - 21:00 Kigali (CAT)
                  </p>
                  <span className="text-[11px] text-emerald-400">
                    Live Broadcasts zikora kugeza mu gicuku
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7 bg-[#141414] rounded-xl border border-zinc-800 p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Murakoze Cyane!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                Ubutumwa bwawe bwakiriwe n'itsinda rya Isoko TV Rwanda. Turakuvugisha kuri email cyangwa telefone watanze.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Ohereza ubundi butumwa
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Ohereza Ubutumwa Bwawe
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Amazina Yombi (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Amazina yawe"
                    className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+250 788 000 000"
                    className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email.yawe@gmail.com"
                  className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Impamvu y'Ubutumwa (Category)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e50914]"
                  >
                    <option value="interview">Gusaba Ikiganiro (Interview Request)</option>
                    <option value="music_promo">Kumenyekanisha Indirimbo (Music Promo)</option>
                    <option value="ad">Kwamamaza (Advertising / Sponsor)</option>
                    <option value="news_tip">Gutanga Amakuru (News Tip / Exclusive)</option>
                    <option value="general">Ubutumwa Rusange (General Feedback)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Umutwe w'Ubutumwa (Subject) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Umutwe w'ubutumwa bwawe"
                    className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Ubutumwa Bwawe (Message) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Andika ubutumwa bwawe hano..."
                  className="w-full bg-[#181818] border border-zinc-700 rounded-lg p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-[#e50914] hover:bg-[#c90711] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Kohereza...' : 'Ohereza Ubutumwa'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
