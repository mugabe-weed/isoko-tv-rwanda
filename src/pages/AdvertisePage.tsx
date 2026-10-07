import React, { useState } from 'react';
import { BarChart3, Users, Globe, Eye, Clock, CheckCircle2, Send, Download, Sparkles, MessageSquare, Phone, Mail } from 'lucide-react';
import { MEDIA_KIT_DATA, SPONSOR_TIERS, CHANNEL_CONFIG } from '../data/mockData';
import { SectionTitle } from '../components/SectionTitle';

interface AdvertisePageProps {
  onNotify?: (message: string) => void;
}

export const AdvertisePage: React.FC<AdvertisePageProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    packageId: SPONSOR_TIERS[1].id, // Default to popular Host endorsement
    timeline: 'Immediate (This week)',
    budgetRange: '300,000 - 600,000 RWF',
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
        onNotify('Murakoze! Ubusabe bwawe bwo kwamamaza bwakiriwe. Ikipe yacu irakuvugisha mu masaha 2.');
      }
    }, 600);
  };

  const downloadMediaKitPdf = () => {
    // Generate text/media kit summary print
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-16">
      {/* Top Media Kit Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#e50914]/15 text-[#e50914] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Media Kit 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Kwamamaza Kuri ISOKO TV RWANDA
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl mt-1">
            Gera ku bakunzi b'imyidagaduro barenga miliyoni 3 buri kwezi mu Rwanda no muri Diaspora ukoresheje amashusho meza n'abanyamakuru bakunzwe.
          </p>
        </div>

        <button
          onClick={downloadMediaKitPdf}
          className="self-start sm:self-auto px-4 py-2.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-lg text-xs font-semibold border border-zinc-700 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#e50914]" />
          <span>Gukuramo Media Kit (Print / PDF)</span>
        </button>
      </div>

      {/* 1. KEY AUDIENCE METRICS (OVERVIEW NUMBERS) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-[#141414] rounded-xl border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Subscribers</span>
            <Users className="w-4 h-4 text-[#e50914]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {MEDIA_KIT_DATA.subscribers}
            </span>
            <span className="block text-[11px] text-zinc-400 mt-0.5">
              Organic Rwandan & Diaspora audience
            </span>
          </div>
        </div>

        <div className="p-5 bg-[#141414] rounded-xl border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Monthly Views</span>
            <Eye className="w-4 h-4 text-[#e50914]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {MEDIA_KIT_DATA.monthlyViews}
            </span>
            <span className="block text-[11px] text-zinc-400 mt-0.5">
              Averaging 110K+ views daily
            </span>
          </div>
        </div>

        <div className="p-5 bg-[#141414] rounded-xl border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Watch Time</span>
            <Clock className="w-4 h-4 text-[#e50914]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {MEDIA_KIT_DATA.monthlyWatchHours}
            </span>
            <span className="block text-[11px] text-zinc-400 mt-0.5">
              High audience retention rate
            </span>
          </div>
        </div>

        <div className="p-5 bg-[#141414] rounded-xl border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Engagement Rate</span>
            <BarChart3 className="w-4 h-4 text-[#e50914]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {MEDIA_KIT_DATA.engagementRate}
            </span>
            <span className="block text-[11px] text-zinc-400 mt-0.5">
              Active comments & live chats
            </span>
          </div>
        </div>
      </section>

      {/* 2. DEMOGRAPHICS AND GEOGRAPHIC BREAKDOWN TABLE */}
      <section className="bg-[#121212] rounded-xl border border-zinc-800 p-6 space-y-6">
        <SectionTitle
          title="Imiterere y'Abadukurikira"
          kinyarwandaTitle="Audience Demographics & Geo"
          description="Imibare igaragaza imyaka, igitsina n'ibihugu by'abareba Isoko TV Rwanda buri munsi."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Countries Table */}
          <div className="p-4 bg-[#181818] rounded-lg border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              <span>Igihugu (Top Countries)</span>
              <span>Uruhare (%)</span>
            </div>
            <div className="space-y-2.5">
              {MEDIA_KIT_DATA.topCountries.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 flex items-center gap-2">
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#e50914] h-full rounded-full" style={{ width: `${c.percentage}%` }} />
                    </div>
                    <span className="font-mono font-bold text-white text-[11px] w-8 text-right">
                      {c.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution Table */}
          <div className="p-4 bg-[#181818] rounded-lg border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              <span>Imyaka (Age Groups)</span>
              <span>Ijanisha</span>
            </div>
            <div className="space-y-2.5">
              {MEDIA_KIT_DATA.ageDistribution.map((a, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-mono">{a.ageRange} years</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${a.percentage}%` }} />
                    </div>
                    <span className="font-mono font-bold text-white text-[11px] w-8 text-right">
                      {a.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/80">
              * 76% by'abadukurikira bafite hagati y'imyaka 18 na 34 (Urubyiruko n'abafite ubushobozi bwo kugura).
            </p>
          </div>

          {/* Gender & Device Split */}
          <div className="p-4 bg-[#181818] rounded-lg border border-zinc-800 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2 mb-3">
                <span>Igitsina (Gender)</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Abagabo (Male):</span>
                  <span className="font-mono font-bold text-white">54%</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Abagore (Female):</span>
                  <span className="font-mono font-bold text-white">46%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-[#e50914] h-full" style={{ width: '54%' }} />
                  <div className="bg-sky-400 h-full" style={{ width: '46%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Ibikoresho (Devices)
              </span>
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Telefone (Smartphones):</span>
                  <span className="text-white font-mono">82%</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart TV:</span>
                  <span className="text-white font-mono">11%</span>
                </div>
                <div className="flex justify-between">
                  <span>Desktop / Laptop:</span>
                  <span className="text-white font-mono">7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADVERTISING PACKAGES / RATE CARDS */}
      <section className="space-y-6">
        <SectionTitle
          title="Pakeje zo Kwamamaza"
          kinyarwandaTitle="Ad Packages & Rates"
          description="Hitamo uburyo buhuye n'ingengo y'imari yawe yo kumenyekanisha ibicuruzwa na serivisi."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPONSOR_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-xl p-5 border transition-all ${
                tier.popular
                  ? 'bg-[#181818] border-[#e50914] shadow-lg shadow-[#e50914]/10 relative'
                  : 'bg-[#141414] border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-2.5 right-4 bg-[#e50914] text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Ikunzwe Cyane
                </div>
              )}

              <div>
                <h4 className="font-bold text-white text-base leading-snug">
                  {tier.name}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  {tier.tagline}
                </p>

                <div className="mt-4 pt-3 border-t border-zinc-800">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {tier.priceRwf}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">
                    {tier.priceUsd} · {tier.duration}
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-xs text-zinc-300">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e50914] shrink-0 mt-0.5" />
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-800">
                <button
                  onClick={() => {
                    setFormData({ ...formData, packageId: tier.id });
                    const formElement = document.getElementById('sponsor-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    tier.popular
                      ? 'bg-[#e50914] hover:bg-[#c90711] text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white'
                  }`}
                >
                  Hitamo Iyi Pakeje
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SPONSOR CONTACT & BOOKING FORM */}
      <section id="sponsor-form" className="bg-[#141414] rounded-2xl border border-zinc-800 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left instructions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e50914] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Sponsor Inquiry</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Tegura Ubukangurambaga Bwawe Natwe
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Wuzuze iyi fishi maze itsinda rishinzwe kwamamaza (Marketing & Ad Operations) riguhe igisubizo kirambuye n'ubufatanye mu masaha atarenze abiri.
            </p>

            <div className="space-y-3 pt-2 text-xs text-zinc-300">
              <div className="flex items-center gap-3 p-3 bg-[#1c1c1c] rounded-lg border border-zinc-800">
                <Phone className="w-4 h-4 text-[#e50914]" />
                <div>
                  <span className="text-[11px] text-zinc-500 block">Direct Ad Hotline:</span>
                  <strong className="text-white font-mono">+250 788 345 678</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1c1c1c] rounded-lg border border-zinc-800">
                <Mail className="w-4 h-4 text-[#e50914]" />
                <div>
                  <span className="text-[11px] text-zinc-500 block">Email y'Ubucuruzi:</span>
                  <strong className="text-white">ads@isokotv.rw</strong>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs">
              ✓ Buri muryango cyangwa sosiyete yinjira muri Isoko TV ihabwa raporo y'uburyo amashusho yakiriwe (YouTube Analytics Verified).
            </div>
          </div>

          {/* Right actual form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 bg-[#181818] rounded-xl border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  Murakoze Cyane! Ubusabe bwawe Bwakiriwe.
                </h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Twakiriye ubutumwa bwawe bwo kwamamaza. Ikipe yacu ya Isoko TV igiye kugusubiza binyuze kuri numero yawe ya WhatsApp cyangwa Email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-semibold"
                >
                  Ohereza ubundi busabe
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Izina ry'Ikigo / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Urugero: Kigali Fashion House"
                      className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Uwitabira (Contact Person) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Amazina yawe"
                      className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.rw"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Pakeje Wishimira
                    </label>
                    <select
                      value={formData.packageId}
                      onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                      className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e50914]"
                    >
                      {SPONSOR_TIERS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.priceRwf})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Ingengo y'Imari (Estimated Budget)
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#181818] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e50914]"
                    >
                      <option value="150,000 - 300,000 RWF">150,000 - 300,000 RWF</option>
                      <option value="300,000 - 600,000 RWF">300,000 - 600,000 RWF</option>
                      <option value="600,000 - 1,500,000 RWF">600,000 - 1,500,000 RWF</option>
                      <option value="1,500,000+ RWF (Monthly Retainer)">1,500,000+ RWF (Monthly)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Ubusobanuro ku gicuruzwa cyangwa ubutumwa ushaka kwamamaza
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Sobanura muri make igicuruzwa, itariki wifuza ko gitangira guca kuri Isoko TV..."
                    className="w-full bg-[#181818] border border-zinc-700 rounded-lg p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-[#e50914] hover:bg-[#c90711] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Kohereza...' : 'Ohereza Ubusabe bwo Kwamamaza'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
