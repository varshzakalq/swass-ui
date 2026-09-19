import React from 'react';
import { Volume2, VolumeX, Stethoscope, User, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  activeRole: 'patient' | 'doctor';
  onToggleRole: (role: 'patient' | 'doctor') => void;
  isSpeaking: boolean;
  onStopSpeech: () => void;
}

const languages: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'hi', label: 'हिं', native: 'हिन्दी' },
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'ta', label: 'தமி', native: 'தமிழ்' },
  { code: 'te', label: 'తెలు', native: 'తెలుగు' },
  { code: 'bn', label: 'বাং', native: 'বাংলা' },
  { code: 'mr', label: 'मरा', native: 'मराठी' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  activeRole,
  onToggleRole,
  isSpeaking,
  onStopSpeech,
}) => {
  const t = translations[currentLang];

  return (
    <header className="relative w-full z-20">
      {/* Tricolor Ribbon Motif */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" />

      {/* Main Bar - Light Green & Pale White Gradient */}
      <div className="bg-gradient-to-r from-[#EBF5EF] via-[#F4F9F6] to-[#FFFFFF] text-[#163828] px-4 py-3 border-b border-[#CFE5DA] shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Government of India & Ayush Brand */}
          <div className="flex items-center gap-3">
            {/* Traditional Kamal/Lotus Emblem in Soft Emerald */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E2F3E9] to-[#CEEAD9] p-0.5 shadow-xs flex items-center justify-center flex-shrink-0 border border-[#85C9A4]">
              <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                <span className="text-2xl" role="img" aria-label="Lotus Ayush">🪷</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold tracking-wide text-[#2B6F4D] uppercase font-cinzel">
                  {t.ministryBadge}
                </span>
                <span className="text-[9px] font-bold bg-[#DCF0E5] text-[#195738] px-1.5 py-0.5 rounded-full border border-[#B3DEC6]">
                  ABDM
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold font-baloo text-[#163E2B] tracking-wide leading-tight">
                {t.appTitle}
              </h1>
              <p className="text-[10px] text-[#477C62] font-medium hidden sm:block">
                {t.subMinistry}
              </p>
            </div>
          </div>

          {/* Controls: Page Navigation & Multilingual Selector */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 flex-wrap">
            
            {/* Global Audio Controller */}
            {isSpeaking && (
              <button
                onClick={onStopSpeech}
                className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-full shadow-xs transition-all animate-pulse"
                title="Stop Audio"
              >
                <VolumeX className="w-4 h-4 text-red-600" />
                <span className="font-semibold">आवाज़ रोकें</span>
              </button>
            )}

            {/* Dedicated Page Switcher Tabs */}
            <div className="bg-[#E2F2E9] p-1 rounded-xl border border-[#BDE0CE] flex items-center text-xs shadow-inner">
              <button
                onClick={() => onToggleRole('patient')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  activeRole === 'patient'
                    ? 'bg-white text-[#134D31] font-bold shadow-xs border border-[#A5D7BD]'
                    : 'text-[#2D6047] hover:text-[#134D31] hover:bg-white/50'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#2B6F4D]" />
                <span>{t.patientView}</span>
              </button>

              <button
                onClick={() => onToggleRole('doctor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  activeRole === 'doctor'
                    ? 'bg-white text-[#134D31] font-bold shadow-xs border border-[#A5D7BD]'
                    : 'text-[#2D6047] hover:text-[#134D31] hover:bg-white/50'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#2B6F4D]" />
                <span>{t.doctorConsole}</span>
              </button>
            </div>

            {/* Language Selector Chips (Active across both Patient & Doctor pages) */}
            <div className="flex items-center gap-1 bg-[#E8F4EE] p-1 rounded-xl border border-[#BEE1D0] overflow-x-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLang(lang.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                    currentLang === lang.code
                      ? 'bg-[#1D6341] text-white shadow-xs font-bold'
                      : 'text-[#2D6047] font-medium hover:bg-white/60 hover:text-[#14472E]'
                  }`}
                  title={lang.native}
                >
                  {lang.label}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
