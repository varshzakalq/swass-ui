import React, { useState } from 'react';
import { Stethoscope, ShieldCheck, Send, CheckCircle2, AlertCircle, FileText, Search, Activity, UserCheck, ArrowRight } from 'lucide-react';
import { sampleConsentRequests, samplePatientsForDoctor } from '../data/mockData';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface DoctorConsoleProps {
  currentLang: LanguageCode;
  onSwitchToPatient: () => void;
}

export const DoctorConsole: React.FC<DoctorConsoleProps> = ({
  currentLang,
  onSwitchToPatient,
}) => {
  const t = translations[currentLang];
  const [consentList, setConsentList] = useState(sampleConsentRequests);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('P-1');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSendBundle = (reqId: string) => {
    setConsentList(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'sent' as const } : r))
    );
    setNotification(t.sentSuccess);
    setTimeout(() => setNotification(null), 4000);
  };

  const selectedPatient = samplePatientsForDoctor.find(p => p.id === selectedPatientId) || samplePatientsForDoctor[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
      
      {/* Top Welcome Bar */}
      <div className="bg-gradient-to-r from-[#E3F4EA] via-[#F2FAF5] to-white rounded-3xl p-5 border border-[#B9E1CB] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🩺</span>
            <h2 className="font-baloo text-xl font-bold text-[#143E29]">
              {t.docGreeting}
            </h2>
          </div>
          {/* Color-Differentiated Facility Address Bar */}
          <div className="mt-1.5 inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] px-2.5 py-0.5 rounded-lg text-xs font-medium shadow-2xs">
            <span className="text-xs">📍</span>
            <span>{t.hospitalName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#D5F0E1] text-[#135934] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#9BDAB6] shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#17663C]" />
            <span>HFR प्रमाणित</span>
          </div>

          <button
            onClick={onSwitchToPatient}
            className="text-xs font-semibold text-[#145634] bg-[#E1F4EA] hover:bg-[#D0EFDD] px-3.5 py-1.5 rounded-full border border-[#A4DDBD] transition-colors shadow-2xs"
          >
            ← {t.patientView}
          </button>
        </div>
      </div>

      {/* Global Toast Notification */}
      {notification && (
        <div className="bg-[#175C37] text-white p-3.5 rounded-2xl text-xs font-medium shadow-sm flex items-center gap-2 animate-bounce border border-[#7BC49B]">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Stat Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-gradient-to-br from-[#F2FAF5] via-white to-[#E5F5EC] rounded-2xl p-4 border border-[#AFDDC3] shadow-2xs">
          <div className="text-xs font-semibold text-[#40765A]">{t.patientsToday}</div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-[#143F29] mt-1">14</div>
          <div className="text-[11px] text-[#4A7F66] mt-1">11 नए, 3 फॉलो-अप</div>
        </div>

        <div className="bg-gradient-to-br from-[#FAF8F2] via-white to-[#F6EFE0] rounded-2xl p-4 border border-[#E7DBC5] shadow-2xs">
          <div className="text-xs font-semibold text-[#84500C]">{t.pendingConsent}</div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-[#8C5208] mt-1">3</div>
          <div className="text-[11px] text-[#8A5C1E] mt-1">मरीज सहमति लंबित</div>
        </div>

        <div className="bg-gradient-to-br from-[#EEF8F3] via-white to-[#E0F3E8] rounded-2xl p-4 border border-[#A7DBBD] shadow-2xs">
          <div className="text-xs font-semibold text-[#165A36]">{t.syncedRecords}</div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-[#104D2D] mt-1">27</div>
          <div className="text-[11px] text-[#1D6941] mt-1 font-semibold">NRCeS FHIR मान्य</div>
        </div>
      </div>

      {/* Two Column Layout: Consent Requests & Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        
        {/* PANEL 1: ABDM Consent Requests (HIP ↔ HIU) */}
        <div className="bg-gradient-to-b from-[#F7FCF9] via-white to-[#F2FAF6] rounded-3xl p-5 border border-[#BDE1CD] shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D5EADB]">
            <div>
              <h3 className="font-baloo text-base font-bold text-[#143E29]">
                ABDM सहमति अनुरोध
              </h3>
              <p className="text-[11px] text-[#4A7E65]">HIP ↔ HIU गेटवे</p>
            </div>
            <span className="text-[10px] font-semibold bg-[#D7EFE1] text-[#135934] px-2.5 py-1 rounded-full border border-[#9CDAB7]">
              गेटवे लाइव
            </span>
          </div>

          <div className="space-y-3">
            {consentList.map((req) => (
              <div
                key={req.id}
                className="p-3.5 bg-gradient-to-r from-white via-[#F9FCFA] to-[#EDF6F1] rounded-2xl border border-[#C5E3D2] space-y-2 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-[#143E29]">
                      {req.requesterName}
                    </h4>
                    <p className="text-[11px] text-[#4A7E65]">
                      प्रयोजन: {req.purpose} • {req.dateRange}
                    </p>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    req.status === 'approved'
                      ? 'bg-[#D8F0E2] text-[#135935] border-[#9AD8B6]'
                      : req.status === 'sent'
                      ? 'bg-[#E4F2FD] text-[#0D5594] border-[#BBDDF8]'
                      : 'bg-[#FDF4E5] text-[#8C520A] border-[#F2DEBF]'
                  }`}>
                    {req.status === 'approved'
                      ? 'स्वीकृत (Approved)'
                      : req.status === 'sent'
                      ? 'डेटा प्रेषित (Sent)'
                      : 'प्रतीक्षारत (Pending)'}
                  </span>
                </div>

                <div className="text-[10px] text-[#4A7E65] font-mono">
                  अनुरोध: {req.recordsRequested}
                </div>

                {req.status === 'approved' && (
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleSendBundle(req.id)}
                      className="flex items-center gap-1.5 text-xs bg-[#1E6440] hover:bg-[#175234] text-white font-semibold py-1.5 px-3 rounded-xl transition-all shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.sendFhirBundle}</span>
                    </button>

                    <button className="text-xs text-[#40765A] hover:text-[#143E29] px-2 py-1 font-medium">
                      {t.viewScope}
                    </button>
                  </div>
                )}

                {req.status === 'sent' && (
                  <div className="text-[11px] font-semibold text-[#165A36] flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1B663F]" />
                    <span>सीधे HIU को एनक्रिप्टेड FHIR बंडल भेजा गया।</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: Assigned Patients & Severity-Ranked Observations */}
        <div className="bg-gradient-to-b from-[#F7FCF9] via-white to-[#F2FAF6] rounded-3xl p-5 border border-[#BDE1CD] shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D5EADB]">
            <div>
              <h3 className="font-baloo text-base font-bold text-[#143E29]">
                आवंटित मरीज
              </h3>
              <p className="text-[11px] text-[#4A7E65]">ABDM क्लिनिकल रिकॉर्ड्स</p>
            </div>
            <span className="text-[10px] font-semibold bg-[#D8F0E2] text-[#135935] px-2.5 py-1 rounded-full border border-[#9CDAB8]">
              4 मरीज
            </span>
          </div>

          {/* Patients List */}
          <div className="space-y-2">
            {samplePatientsForDoctor.map((pt) => {
              const isSelected = selectedPatientId === pt.id;
              return (
                <div
                  key={pt.id}
                  onClick={() => setSelectedPatientId(pt.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#E3F5EB] border-2 border-[#6BC090] shadow-2xs'
                      : 'bg-white border-[#CCE6D7] hover:bg-[#F2FAF5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#D8F0E2] text-[#145634] font-bold flex items-center justify-center text-xs border border-[#A4DCBD]">
                      {pt.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#143E29] flex items-center gap-1.5">
                        <span>{pt.name}</span>
                        <span className="text-[10px] font-normal text-[#4C7F66]">({pt.age}y, {pt.gender})</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#4C7F66]">
                        ABHA: {pt.abhaId}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      pt.flagLevel === 'high'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-[#D8F0E2] text-[#145635] border-[#9EDCB9]'
                    }`}>
                      {pt.flag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Observations Panel (Sorted by Severity then Recency) */}
          <div className="mt-4 pt-4 border-t border-[#D5EADB]">
            <h4 className="font-baloo text-sm font-bold text-[#143E29] mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#1C6942]" />
              <span>{selectedPatient.name} — FHIR Observations</span>
            </h4>

            <div className="space-y-2">
              {selectedPatient.observations.map((obs, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#EDF6F1] rounded-xl border border-[#CDE6D8] flex items-center justify-between text-xs shadow-2xs"
                >
                  <div>
                    <div className="font-semibold text-[#143E29]">{obs.name}</div>
                    <div className="text-[10px] text-[#4E8067] font-mono">{obs.code} • {obs.date}</div>
                  </div>

                  <div className="text-right">
                    <span className={`font-mono font-bold ${
                      obs.interpretation === 'HH' || obs.interpretation === 'H'
                        ? 'text-rose-700'
                        : 'text-[#145634]'
                    }`}>
                      {obs.value}
                    </span>
                    <span className="text-[10px] ml-1 opacity-75 font-semibold text-[#4E8067]">
                      [{obs.interpretation}]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
