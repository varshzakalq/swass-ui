import React, { useState } from 'react';
import { Volume2, Sparkles, Heart, Clock, Check } from 'lucide-react';
import { sampleAyushRemedies } from '../data/mockData';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface AyushRemediesProps {
  currentLang: LanguageCode;
  onSpeak: (text: string) => void;
}

export const AyushRemedies: React.FC<AyushRemediesProps> = ({
  currentLang,
  onSpeak,
}) => {
  const t = translations[currentLang];
  const [activeSystem, setActiveSystem] = useState<string>('All');

  const systems = [
    { key: 'All', label: 'सभी (All)' },
    { key: 'Ayurveda', label: '🌿 आयुर्वेद' },
    { key: 'Yoga', label: '🧘 योग' },
    { key: 'Siddha', label: '🪷 सिद्ध' },
  ];

  const filtered =
    activeSystem === 'All'
      ? sampleAyushRemedies
      : sampleAyushRemedies.filter(r => r.system === activeSystem);

  return (
    <section className="px-4 pt-6">
      {/* Title & Ayush Badge */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-600 text-sm">🪷</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 font-cinzel">
              आयुष मंत्रालय प्रमाणित (Ayush Certified)
            </span>
          </div>
          <h3 className="font-baloo text-lg font-bold text-[#0B3D2E]">
            {t.ayushRemediesTitle}
          </h3>
        </div>

        <button
          onClick={() => onSpeak("यह आयुष मंत्रालय द्वारा सुझाए गए प्राकृतिक घरेलू नुस्खे हैं। तुलसी काढ़ा, हल्दी दूध, आंवला और प्राणायाम आपके स्वास्थ्य और रोग प्रतिरोधक क्षमता को बढ़ाते हैं।")}
          className="text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1 border border-amber-300 transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>सुनें</span>
        </button>
      </div>

      <p className="text-xs text-stone-600 mb-3">{t.ayushRemediesSub}</p>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
        {systems.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSystem(s.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeSystem === s.key
                ? 'bg-[#0B3D2E] text-amber-300 shadow'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Cards Scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((rem) => (
          <div
            key={rem.id}
            className="bg-white rounded-2xl p-4 border-2 border-[#E8A33D]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{rem.icon}</span>
                <div>
                  <h4 className="font-baloo font-bold text-sm text-[#0B3D2E]">
                    {rem.title}
                  </h4>
                  <span className="text-[10px] text-amber-800 font-medium italic">
                    {rem.herbName}
                  </span>
                </div>
              </div>

              {/* Speaker button */}
              <button
                onClick={() => onSpeak(`${rem.title}। लाभ: ${rem.benefits} बनाने की विधि: ${rem.howToUse} खुराक: ${rem.simpleDosage}`)}
                className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center flex-shrink-0"
                title="Hear remedy"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Benefits */}
            <div className="bg-[#FAF8F5] rounded-xl p-2.5 text-xs text-stone-700 border border-amber-100 mb-2.5">
              <span className="font-bold text-[#0B3D2E] block mb-0.5">लाभ (Benefits):</span>
              <p className="leading-relaxed">{rem.benefits}</p>
            </div>

            {/* Preparation & Dosage */}
            <div className="text-[11px] text-stone-600 space-y-1">
              <div>
                <span className="font-bold text-stone-800">विधि: </span>
                {rem.howToUse}
              </div>
              <div className="flex items-center gap-1 text-emerald-800 font-semibold pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{rem.simpleDosage}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
