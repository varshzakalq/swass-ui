import React from 'react';
import { Volume2 } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface ActionCardsProps {
  currentLang: LanguageCode;
  onOpenUpload: () => void;
  onOpenRecords: () => void;
  onOpenSaathi: () => void;
  onSpeak: (text: string) => void;
}

export const ActionCards: React.FC<ActionCardsProps> = ({
  currentLang,
  onOpenUpload,
  onOpenRecords,
  onOpenSaathi,
  onSpeak,
}) => {
  const t = translations[currentLang];

  const actions = [
    {
      id: 'upload',
      title: t.actionUpload,
      subtitle: t.actionUploadSub,
      icon: '📷',
      badge: 'आसान',
      badgeColor: 'bg-[#D7EFE1] text-[#135634] border border-[#99D8B6]',
      cardBg: 'bg-gradient-to-b from-[#F2FBF6] via-white to-[#E6F6ED] border-[#A2DEC0] hover:border-[#5EBD89]',
      iconBg: 'bg-[#E2F5EA] border-[#A2DEC0] text-[#145634]',
      onClick: onOpenUpload,
      speakText: `${t.actionUpload}। ${t.actionUploadSub}`,
    },
    {
      id: 'records',
      title: t.actionRecords,
      subtitle: t.actionRecordsSub,
      icon: '🗂️',
      badge: 'सुरक्षित',
      badgeColor: 'bg-[#D5EFE0] text-[#125433] border border-[#97D7B5]',
      cardBg: 'bg-gradient-to-b from-[#F1FAF5] via-white to-[#E5F5EC] border-[#A0DDC0] hover:border-[#5EBD89]',
      iconBg: 'bg-[#E1F4E9] border-[#A0DDC0] text-[#135433]',
      onClick: onOpenRecords,
      speakText: `${t.actionRecords}। ${t.actionRecordsSub}`,
    },
    {
      id: 'saathi',
      title: t.actionSaathi,
      subtitle: t.actionSaathiSub,
      icon: '🎙️',
      badge: 'बोलकर',
      badgeColor: 'bg-[#D9F1E3] text-[#145936] border border-[#9BDAB9]',
      cardBg: 'bg-gradient-to-b from-[#F3FBF7] via-white to-[#E8F7EF] border-[#A5DFC2] hover:border-[#5EBD89]',
      iconBg: 'bg-[#E3F6EB] border-[#A5DFC2] text-[#145936]',
      onClick: onOpenSaathi,
      speakText: `${t.actionSaathi}। ${t.actionSaathiSub}`,
    },
  ];

  return (
    <section className="px-4 pt-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-baloo text-base md:text-lg font-bold text-[#143E29]">
          मुख्य सेवाएं
        </h3>

        <button
          onClick={() => onSpeak("यहाँ तीन मुख्य सुविधाएं हैं: पहला, अपने पर्चे या जांच की फोटो खींचें। दूसरा, अपनी पुरानी जांचें देखें। तीसरा, साथी से बोलकर कोई भी सवाल पूछें।")}
          className="flex items-center gap-1.5 text-xs bg-[#E1F4EA] hover:bg-[#D0EFDD] text-[#145634] px-3 py-1.5 rounded-full border border-[#A4DDBD] font-semibold transition-colors shadow-2xs"
          title="Listen instructions"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#1B603D]" />
          <span>सुने</span>
        </button>
      </div>

      {/* Clean, Attractive Light-Green Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map((act) => (
          <div
            key={act.id}
            className={`relative rounded-2xl p-4 border shadow-2xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between ${act.cardBg}`}
            onClick={act.onClick}
          >
            {/* Top row: badge + listen speaker button */}
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${act.badgeColor}`}>
                {act.badge}
              </span>

              {/* Dedicated Speak Button on each card */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(act.speakText);
                }}
                className="w-7 h-7 rounded-full bg-white hover:bg-[#E3F4EA] shadow-2xs flex items-center justify-center text-[#185A37] border border-[#B6E1CB] transition-transform active:scale-90"
                title="Hear this card"
                aria-label={`Read ${act.title}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Big Icon & Bold Title */}
            <div className="flex items-center gap-3 py-1">
              <div className={`w-12 h-12 rounded-xl shadow-2xs border flex items-center justify-center text-2xl flex-shrink-0 ${act.iconBg}`}>
                {act.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-baloo text-sm font-bold text-[#143E29] leading-snug">
                  {act.title}
                </h4>
                <p className="text-[11px] text-[#3F755A] font-medium line-clamp-1 mt-0.5">
                  {act.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom cue */}
            <div className="mt-2 pt-2 border-t border-[#CCE8D8] flex items-center justify-between text-[10.5px] font-semibold text-[#185D39]">
              <span>खोलें</span>
              <span className="font-bold bg-[#E2F5EA] px-2 py-0.5 rounded-md border border-[#A4DDBD]">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
