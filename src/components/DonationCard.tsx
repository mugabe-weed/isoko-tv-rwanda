import React, { useState } from 'react';
import { Copy, Check, PhoneCall, ExternalLink, QrCode, Smartphone } from 'lucide-react';
import { DonationMethod } from '../types';

interface DonationCardProps {
  method: DonationMethod;
  onCopySuccess?: (text: string) => void;
}

export const DonationCard: React.FC<DonationCardProps> = ({
  method,
  onCopySuccess,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    if (onCopySuccess) {
      onCopySuccess(`${label} copied: ${text}`);
    }
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const getDialUrl = (ussd: string) => {
    // Encode # as %23 for tel: links
    return `tel:${ussd.replace(/#/g, '%23')}`;
  };

  const isMoMo = method.provider === 'MTN Mobile Money';
  const isAirtel = method.provider === 'Airtel Money';
  const isPayPal = method.provider === 'PayPal';

  return (
    <div className="flex flex-col bg-[#161616] rounded-xl border border-zinc-800/90 overflow-hidden hover:border-zinc-700 transition-all duration-200">
      {/* Top Banner */}
      <div className="p-4 bg-[#1a1a1a] border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-inner ${
            isMoMo ? 'bg-[#ffcc00] text-black font-black' :
            isAirtel ? 'bg-[#e50914] text-white' :
            isPayPal ? 'bg-[#003087] text-white' : 'bg-purple-600 text-white'
          }`}>
            {isMoMo ? 'MoMo' : isAirtel ? 'Airtel' : isPayPal ? 'PP' : 'SL'}
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-snug">
              {method.name}
            </h3>
            <span className="text-xs text-zinc-400">
              {method.currency} · {method.provider}
            </span>
          </div>
        </div>

        {method.badge && (
          <span className="text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            {method.badge}
          </span>
        )}
      </div>

      {/* Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Account Name */}
          <div className="text-xs">
            <span className="text-zinc-500 uppercase tracking-wider block mb-0.5 font-medium">
              Izina ryiyandika (Account Name)
            </span>
            <span className="text-zinc-200 font-semibold text-sm">
              {method.accountName}
            </span>
          </div>

          {/* MoMo Merchant Code or Account Number */}
          {method.merchantCode && (
            <div className="p-3 bg-[#111111] rounded-lg border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 block font-medium">
                  MoMo Pay Code / Merchant ID
                </span>
                <span className="text-lg font-mono font-bold text-amber-400 tracking-wider">
                  {method.merchantCode}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(method.merchantCode!, 'MoMo Pay Code')}
                className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-white rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Koporora MoMo Code"
              >
                {copiedField === 'MoMo Pay Code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Account / Phone Number */}
          <div className="p-3 bg-[#111111] rounded-lg border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-zinc-400 block font-medium">
                {isPayPal ? 'PayPal Email' : 'Telefone / Account Number'}
              </span>
              <span className="text-sm font-mono font-bold text-white">
                {method.accountNumber}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(method.accountNumber, isPayPal ? 'PayPal Email' : 'Numero')}
              className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-white rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy account details"
            >
              {copiedField?.includes('Numero') || copiedField?.includes('PayPal') ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Instructions */}
          <p className="text-xs text-zinc-400 leading-relaxed bg-[#141414] p-2.5 rounded border border-zinc-800/60">
            {method.instructions}
          </p>
        </div>

        {/* Action Buttons: Direct USSD Call or External Web Link */}
        <div className="pt-2 space-y-2">
          {method.ussdCode ? (
            <div className="flex gap-2">
              <a
                href={getDialUrl(method.ussdCode)}
                className="flex-1 py-2.5 px-3 bg-[#e50914] hover:bg-[#c90711] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <Smartphone className="w-4 h-4" />
                <span>Kanda USSD ({method.ussdCode})</span>
              </a>
              <button
                onClick={() => copyToClipboard(method.ussdCode!, 'USSD Code')}
                className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs"
                title="Copy USSD string"
              >
                {copiedField === 'USSD Code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ) : method.externalLink ? (
            <a
              href={method.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#e50914] hover:bg-[#c90711] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow text-center"
            >
              <span>{isPayPal ? 'Donate via PayPal Website' : 'Tip on Streamlabs'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : null}

          {/* QR toggle */}
          <div className="text-center pt-1">
            <button
              onClick={() => setShowQr(!showQr)}
              className="text-[11px] text-zinc-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <QrCode className="w-3 h-3 text-[#e50914]" />
              <span>{showQr ? 'Hisha QR Code' : 'Erekana QR Code ya MoMo'}</span>
            </button>
          </div>

          {showQr && (
            <div className="p-3 bg-white rounded-lg flex flex-col items-center justify-center text-black transition-all">
              <div className="w-32 h-32 bg-zinc-100 flex items-center justify-center border border-zinc-300 rounded p-2">
                {/* SVG mock QR for quick scan */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M0,0 h30 v30 h-30 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h20 v10 h-20 z M50,30 h20 v20 h-20 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,70 h20 v20 h-20 z M70,70 h30 v30 h-30 z M80,80 h10 v10 h-10 z" fill="#000" />
                </svg>
              </div>
              <span className="text-[11px] font-bold mt-1.5 text-zinc-900">
                Scan with MTN MoMo App / Bank
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
