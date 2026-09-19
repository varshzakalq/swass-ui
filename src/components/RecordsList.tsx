import React, { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, FileText, CheckCircle2, AlertTriangle, Pill } from 'lucide-react';
import { HealthRecord, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface RecordsListProps {
  records: HealthRecord[];
  currentLang: LanguageCode;
  onSpeak: (text: string) => void;
  onOpenUpload: () => void;
}

export const RecordsList: React.FC<RecordsListProps> = ({
  records,
  currentLang,
  onSpeak,
  onOpenUpload,
}) => {
  const t = translations[currentLang];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="px-4 pt-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-baloo text-base md:text-lg font-bold text-[#143E29]">
            {t.recordsTitle}
          </h3>
          <p className="text-xs text-[#52826A]">{t.recordsSub}</p>
        </div>

        <button
          onClick={onOpenUpload}
          className="text-xs font-semibold text-[#145634] bg-[#E1F4EA] hover:bg-[#D0EFDD] px-3.5 py-1.5 rounded-full border border-[#A4DDBD] transition-colors shadow-2xs"
        >
          + रिपोर्ट जोड़ें
        </button>
      </div>

      <div className="space-y-3">
        {records.map((rec) => {
          const isExpanded = expandedId === rec.id;
          const statusBg =
            rec.status === 'normal'
              ? 'bg-gradient-to-r from-[#F4FAF6] via-white to-[#EAF6EF] border-[#B7DFC7]'
              : rec.status === 'high'
              ? 'bg-gradient-to-r from-[#FCFDFD] via-white to-[#FAF6EE] border-[#E5DAC4]'
              : 'bg-gradient-to-r from-[#F2FAF6] via-white to-[#E8F6EF] border-[#B8DFC8]';

          const chipColor =
            rec.status === 'normal'
              ? 'bg-[#D7EFE1] text-[#135934] border border-[#9ADAB6]'
              : rec.status === 'high'
              ? 'bg-[#FDF3E3] text-[#8A520B] border border-[#F2DFC0] font-semibold'
              : 'bg-[#D6F0E4] text-[#13563B] border border-[#97D8B9]';

          return (
            <div
              key={rec.id}
              className={`rounded-2xl border transition-all shadow-2xs hover:shadow-xs ${statusBg}`}
            >
              {/* Main row */}
              <div
                className="p-3.5 flex items-center justify-between gap-3 cursor-pointer"
                onClick={() => toggleExpand(rec.id)}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-[#E3F5EB] shadow-2xs flex items-center justify-center text-2xl flex-shrink-0 border border-[#A4DCBD]">
                    {rec.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-baloo font-bold text-sm text-[#143E29] truncate">
                        {rec.title}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${chipColor}`}>
                        {rec.statusText}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A7E65] mt-0.5">
                      {rec.date} • {rec.facility}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Dedicated Read Aloud Speaker Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSpeak(`${rec.title} की रिपोर्ट। दिनांक ${rec.date}। नतीजा: ${rec.statusText}। सलाह: ${rec.simpleExplanation}`);
                    }}
                    className="w-8 h-8 rounded-full bg-[#E5F5EC] hover:bg-[#D4EFE0] text-[#175A35] border border-[#A9DEC0] flex items-center justify-center transition-colors shadow-2xs"
                    title="Read report aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button className="text-[#3F755A] hover:text-[#143E29] p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Simplified Vernacular Explanation for Lower-Literate Patients */}
              <div className="px-3.5 pb-3">
                <div className="bg-[#E9F5EE] rounded-xl p-2.5 text-xs text-[#13442C] border border-[#BDE2CD] flex items-start gap-2 shadow-2xs">
                  <span className="text-sm flex-shrink-0 mt-0.5">💡</span>
                  <p className="leading-relaxed font-medium">
                    {rec.simpleExplanation}
                  </p>
                </div>
              </div>

              {/* Expandable Technical / FHIR Detail */}
              {isExpanded && (
                <div className="px-3.5 pb-3 pt-2 border-t border-[#CCE7D7] text-[11px] text-[#3E7057] space-y-1 bg-white/70 rounded-b-2xl">
                  <div className="flex justify-between py-0.5">
                    <span>डॉक्टर:</span>
                    <span className="font-semibold text-[#143E29]">{rec.doctor}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>FHIR:</span>
                    <span className="font-mono font-semibold text-[#165837]">{rec.fhirType}</span>
                  </div>
                  {rec.loincCode && (
                    <div className="flex justify-between py-0.5">
                      <span>कोड:</span>
                      <span className="font-mono font-semibold text-[#143E29]">{rec.loincCode}</span>
                    </div>
                  )}
                  {rec.value && (
                    <div className="flex justify-between py-0.5">
                      <span>माप:</span>
                      <span className="font-bold text-[#8A520B]">{rec.value} {rec.unit}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
};
