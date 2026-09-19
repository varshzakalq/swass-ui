import React, { useState } from 'react';
import { Volume2, QrCode, CheckCircle2, Maximize2, X, ShieldCheck, Copy, Check, MapPin, AtSign } from 'lucide-react';
import { PatientProfile, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface AbhaCardProps {
  patient: PatientProfile;
  currentLang: LanguageCode;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}

export const AbhaCard: React.FC<AbhaCardProps> = ({
  patient,
  currentLang,
  onSpeak,
  isSpeaking,
}) => {
  const t = translations[currentLang];
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(patient.abhaId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="relative mx-4 -mt-2 z-10">
        {/* Card Container with Ayush Soft Mint & Pale White Gradient */}
        <div className="bg-gradient-to-br from-[#E9F6EE] via-[#F8FCFA] to-[#DCF2E5] text-[#143E29] rounded-3xl p-5 border-2 border-[#82CA9E] shadow-sm relative overflow-hidden">
          
          {/* Subtle Traditional Indian Mandala Flourish */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-15 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#256B46]">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <polygon points="50,10 62,38 90,50 62,62 50,90 38,62 10,50 38,38" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Card Top Row: National Logo & Verification Badge */}
          <div className="flex items-center justify-between pb-3 border-b border-[#C0E5D0]">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪷</span>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#1B603D] font-bold font-cinzel">
                  {t.abhaTitle}
                </span>
                <p className="text-[10px] text-[#427A5F]">आयुष्मान भारत डिजिटल मिशन (ABDM)</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-[#D5F0E1] text-[#135934] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#9ADAB6] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#18663C]" />
              <span>{t.abhaVerified}</span>
            </div>
          </div>

          {/* Card Middle: QR Code & Patient Data */}
          <div className="flex items-center gap-4 py-4">
            {/* Visual QR Box */}
            <div
              onClick={() => setIsExpanded(true)}
              className="w-20 h-20 bg-white rounded-2xl p-1.5 flex-shrink-0 shadow-2xs border-2 border-[#8ACCA7] cursor-pointer group hover:scale-105 transition-transform"
              title="Click to enlarge QR"
            >
              <div className="w-full h-full bg-[#184F35] rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="#F0FDF4">
                  <rect width="100" height="100" fill="#184F35" />
                  <g fill="#F0FDF4">
                    <rect x="8" y="8" width="24" height="24" />
                    <rect x="68" y="8" width="24" height="24" />
                    <rect x="8" y="68" width="24" height="24" />
                    <rect x="14" y="14" width="12" height="12" fill="#184F35" />
                    <rect x="74" y="14" width="12" height="12" fill="#184F35" />
                    <rect x="14" y="74" width="12" height="12" fill="#184F35" />
                    <rect x="40" y="12" width="8" height="8" />
                    <rect x="52" y="24" width="8" height="8" />
                    <rect x="12" y="44" width="8" height="8" />
                    <rect x="24" y="48" width="8" height="8" />
                    <rect x="40" y="40" width="8" height="8" />
                    <rect x="52" y="48" width="8" height="8" />
                    <rect x="48" y="68" width="8" height="8" />
                    <rect x="68" y="48" width="8" height="8" />
                    <rect x="80" y="68" width="8" height="8" />
                  </g>
                </svg>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Patient Name & 14-Digit Number */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold font-baloo text-[#123E28] tracking-wide truncate">
                {patient.name}
              </h2>
              <p className="text-xs text-[#396F54] font-medium">
                {patient.gender}, {patient.age} वर्ष
              </p>

              {/* High-Contrast Light Green ABHA Number */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-base md:text-lg font-bold font-mono tracking-wider text-[#0C4729] bg-[#E3F5EA] px-2.5 py-1 rounded-lg border border-[#99D8B6] shadow-2xs">
                  {patient.abhaId}
                </span>

                <button
                  onClick={handleCopy}
                  className="p-1.5 bg-[#DCF2E5] hover:bg-[#CCECDA] text-[#175A35] rounded-lg transition-colors border border-[#A6DCBF]"
                  title="Copy ABHA ID"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Color-Differentiated Address Bar */}
              <div className="mt-2.5 flex items-center flex-wrap gap-1.5 pt-1.5 border-t border-[#C0E5D0]">
                {/* Digital ABHA Address - Sky Blue palette */}
                <div 
                  className="inline-flex items-center gap-1 bg-[#E0F2FE] text-[#0369A1] border border-[#7DD3FC] px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold shadow-2xs"
                  title="ABHA Digital Address"
                >
                  <span className="text-[9.5px] uppercase font-bold text-[#0284C7] bg-white/90 px-1 rounded border border-[#BAE6FD] flex items-center gap-0.5">
                    <AtSign className="w-2.5 h-2.5" />
                    <span>पता</span>
                  </span>
                  <span>{patient.abhaAddress}</span>
                </div>

                {/* Residence Geographic Address - Warm Amber palette */}
                <div 
                  className="inline-flex items-center gap-1 bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] px-2 py-0.5 rounded-md text-[11px] font-medium shadow-2xs"
                  title="Residential Location Address"
                >
                  <MapPin className="w-3 h-3 text-[#D97706] flex-shrink-0" />
                  <span>{patient.district}, {patient.state}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Bottom Bar: Listen Aloud & Full Screen Trigger */}
          <div className="pt-3 border-t border-[#C0E5D0] flex items-center justify-between gap-2">
            {/* Audio Button */}
            <button
              onClick={() => onSpeak(t.voiceAbhaRead)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#1F6441] to-[#165033] hover:from-[#185335] hover:to-[#12422A] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.listenBtn}</span>
            </button>

            {/* Counter Scan Button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-1.5 text-xs text-[#165333] hover:text-[#0F3C24] bg-[#E3F4EA] hover:bg-[#D4EFE0] px-3 py-2 rounded-xl transition-all font-semibold border border-[#A2DCBD] shadow-2xs"
            >
              <QrCode className="w-4 h-4 text-[#1C633F]" />
              <span>{t.showCard}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Full-Screen ABHA Card Modal (For showing at hospital reception counter) */}
      {isExpanded && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#F3FAF6] to-white border-2 border-[#91CEAC] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-[#163E2B]">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center text-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2">
              <span className="text-3xl">🪷</span>
              <h3 className="font-baloo text-xl font-bold text-[#143F29] mt-1">
                {patient.name}
              </h3>
              <p className="text-xs text-[#2A714E] font-medium">आयुष्मान भारत स्वास्थ्य खाता (ABHA)</p>
            </div>

            {/* Giant QR Code */}
            <div className="my-6 mx-auto w-48 h-48 bg-white p-3 rounded-2xl shadow-md flex items-center justify-center border-2 border-[#94CEAF]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="#184F35" />
                <g fill="#FFF">
                  <rect x="6" y="6" width="28" height="28" />
                  <rect x="66" y="6" width="28" height="28" />
                  <rect x="6" y="66" width="28" height="28" />
                  <rect x="12" y="12" width="16" height="16" fill="#184F35" />
                  <rect x="72" y="12" width="16" height="16" fill="#184F35" />
                  <rect x="12" y="72" width="16" height="16" fill="#184F35" />
                  <rect x="42" y="12" width="8" height="8" />
                  <rect x="42" y="24" width="8" height="8" />
                  <rect x="12" y="44" width="8" height="8" />
                  <rect x="24" y="44" width="8" height="8" />
                  <rect x="44" y="44" width="12" height="12" />
                  <rect x="64" y="44" width="8" height="8" />
                  <rect x="44" y="64" width="8" height="8" />
                  <rect x="44" y="76" width="8" height="8" />
                  <rect x="64" y="64" width="12" height="12" />
                  <rect x="80" y="76" width="8" height="8" />
                </g>
              </svg>
            </div>

            <div className="text-center">
              <div className="text-xs text-[#3E7057] mb-1 font-medium">{t.abhaNumber}</div>
              <div className="text-xl font-bold font-mono tracking-wider text-[#0E472B] bg-[#E8F5EF] py-2 px-3 rounded-xl border border-[#A4DBBC]">
                {patient.abhaId}
              </div>

              {/* Color-Differentiated Address Bar in Modal */}
              <div className="mt-3 flex items-center justify-center flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 bg-[#E0F2FE] text-[#0369A1] border border-[#7DD3FC] px-2.5 py-1 rounded-lg text-xs font-mono font-semibold shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#0284C7] bg-white px-1 py-0.5 rounded border border-[#BAE6FD] flex items-center gap-0.5">
                    <AtSign className="w-2.5 h-2.5" />
                    <span>पता</span>
                  </span>
                  <span>{patient.abhaAddress}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] px-2.5 py-1 rounded-lg text-xs font-medium shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{patient.district}, {patient.state}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#477C62] mt-3">
                काउंटर पर QR कोड स्कैन कराएं।
              </p>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="w-full mt-5 bg-[#1F6341] text-white font-bold py-3 rounded-xl hover:bg-[#185336] transition-colors shadow-xs"
            >
              {t.closeCard}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
