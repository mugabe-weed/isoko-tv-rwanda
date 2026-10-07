import React, { useState } from 'react';
import { Heart, Smartphone, Globe, Zap, Check, Copy, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { DONATION_METHODS, FAQS } from '../data/mockData';
import { SectionTitle } from '../components/SectionTitle';
import { DonationCard } from '../components/DonationCard';

interface SupportPageProps {
  onNotify?: (msg: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onNotify }) => {
  const [selectedTip, setSelectedTip] = useState<number>(10000);
  const [customTip, setCustomTip] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'momo' | 'diaspora'>('all');

  const tipOptions = [
    { amount: 5000, label: '5,000 RWF (~$4 USD)', desc: 'Icyayi cy abanyamakuru' },
    { amount: 10000, label: '10,000 RWF (~$8 USD)', desc: 'Fuel yo kujya mu kiganiro' },
    { amount: 25000, label: '25,000 RWF (~$20 USD)', desc: 'Gushyigikira Production studio' },
    { amount: 50000, label: '50,000 RWF (~$40 USD)', desc: 'Gufasha impano nshya' },
  ];

  const filteredMethods = DONATION_METHODS.filter((m) => {
    if (activeTab === 'momo') return m.provider.includes('Money');
    if (activeTab === 'diaspora') return m.provider === 'PayPal' || m.provider === 'Streamlabs';
    return true;
  });

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    if (onNotify) {
      onNotify(`Koporowe neza: ${text}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-16">
      {/* 1. TOP HERO SUPPORT HERO */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#1c1414] via-[#121212] to-[#161616] border border-[#e50914]/30 p-6 sm:p-10 overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e50914]/20 border border-[#e50914]/40 rounded-full text-[#e50914] text-xs font-bold tracking-wider uppercase">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Tanga Inkunga · Support ISOKO TV RWANDA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Shyigikira Isoko y'Imyidagaduro Nyarwanda
          </h1>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            Burya buri kiganiro kiza mubona, buri rwenya rubasekeza, na buri ndirimbo ibasusurutsa bitwara imbaraga n'amikoro. Inkunga yawe ni ingenzi kugira ngo Isoko TV ikomeze gukora amashusho meza ku banyarwanda bose.
          </p>
        </div>
      </div>

      {/* 2. INTERACTIVE QUICK TIP SELECTOR */}
      <section className="bg-[#141414] rounded-xl border border-zinc-800 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Hitamo Ingano y'Inkunga Wifuza Gutanga (Quick Tip)</span>
            </h2>
            <span className="text-xs text-zinc-400">
              Kanda ku mubare wifuza hanyuma ukoreshe uburyo bwawe bwo kwishyura
            </span>
          </div>

          <span className="text-xs font-semibold text-emerald-400">
            MTN MoMo & Airtel Money biroroshye cyane
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tipOptions.map((tip) => {
            const isSelected = selectedTip === tip.amount;
            return (
              <button
                key={tip.amount}
                onClick={() => {
                  setSelectedTip(tip.amount);
                  setCustomTip('');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1e1e1e] border-[#e50914] shadow-md shadow-[#e50914]/10'
                    : 'bg-[#181818] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm sm:text-base text-white font-mono">
                    {tip.amount.toLocaleString()} RWF
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#e50914]" />}
                </div>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  {tip.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tip USSD Dial Helper Banner */}
        <div className="p-4 bg-[#1b1b1b] rounded-lg border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
              Uburyo bwihuse bwa MTN Mobile Money mu Rwanda:
            </span>
            <div className="text-sm text-zinc-200">
              Kanda muri telefone yawe: <strong className="font-mono text-white text-base">*182*8*1*839210#</strong>
              <span className="text-zinc-400 text-xs block">
                Ushyiremo amafaranga {selectedTip.toLocaleString()} RWF · Izina: ISOKO MEDIA GROUP LTD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyCode('*182*8*1*839210#')}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy USSD</span>
            </button>
            <a
              href="tel:*182*8*1*839210%23"
              className="px-4 py-2 bg-[#e50914] hover:bg-[#c90711] text-white rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Kanda USSD Ubu</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. ALL DONATION CARDS (MOMO, AIRTEL, PAYPAL, STREAMLABS) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionTitle
            title="Uburyo Bwose bwo Kwohereza Inkunga"
            kinyarwandaTitle="Payment Methods"
            description="Hitamo uburyo bukubereye byaba ukoresha telefone mu Rwanda cyangwa uri mu mahanga."
            className="mb-0"
          />

          {/* Filter segment */}
          <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === 'all' ? 'bg-[#e50914] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Byose (All)
            </button>
            <button
              onClick={() => setActiveTab('momo')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === 'momo' ? 'bg-[#e50914] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Rwanda (MoMo/Airtel)
            </button>
            <button
              onClick={() => setActiveTab('diaspora')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === 'diaspora' ? 'bg-[#e50914] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Diaspora (PayPal/Streamlabs)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMethods.map((method) => (
            <DonationCard
              key={method.id}
              method={method}
              onCopySuccess={(text) => onNotify && onNotify(text)}
            />
          ))}
        </div>
      </section>

      {/* 4. DIASPORA VIEWERS GUIDE */}
      <section className="bg-[#141414] rounded-xl border border-zinc-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
          <Globe className="w-4 h-4" />
          <span>Abanyarwanda Baba Hanze (Diaspora Guide)</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Uko Wafasha Isoko TV Rwanda uri muri USA, Canada, Europe cyangwa ahandi
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          Niba utuye hanze y'u Rwanda kandi ukaba udashobora gukoresha MTN cyangwa Airtel Money, ushobora gukoresha <strong>PayPal (donate@isokotv.rw)</strong>, gukoresha ikarita yawe ya Banki (Visa/Mastercard), cyangwa ukaba <strong>Channel Member</strong> kuri YouTube kugira ngo ubone badges zihariye mu biganiro by'imbonankubone.
        </p>
        <div className="pt-2">
          <a
            href="https://www.paypal.com/paypalme/isokotvrwanda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#003087] hover:bg-[#002266] text-white rounded-lg text-xs font-bold transition-colors"
          >
            <span>Tanga Inkunga Kuri PayPal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 5. DONATION FAQS */}
      <section className="bg-[#121212] rounded-xl border border-zinc-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#e50914]" />
          <span>Ibibazo Bikunze Kubazwa (FAQs)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="p-4 bg-[#181818] rounded-lg border border-zinc-800 space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                {faq.q}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
