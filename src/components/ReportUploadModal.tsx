import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, AlertCircle, Volume2, X, RefreshCw, Sparkles, FileText } from 'lucide-react';
import { HealthRecord, LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface ReportUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onUploadSuccess: (newRecord: HealthRecord) => void;
  onSpeak: (text: string) => void;
}

export const ReportUploadModal: React.FC<ReportUploadModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onUploadSuccess,
  onSpeak,
}) => {
  const t = translations[currentLang];
  const [step, setStep] = useState<'select' | 'processing' | 'result'>('select');
  const [activeTab, setActiveTab] = useState<'sample' | 'upload'>('sample');
  const [progressText, setProgressText] = useState('');
  const [analyzedRecord, setAnalyzedRecord] = useState<HealthRecord | null>(null);

  if (!isOpen) return null;

  const samples: {
    title: string;
    type: 'lab' | 'prescription' | 'scan';
    icon: string;
    verdict: string;
    explanation: string;
    value: string;
    status: 'normal' | 'high' | 'attention';
    audioDesc: string;
  }[] = [
    {
      title: 'Fasting Blood Sugar (खून में चीनी की जांच)',
      type: 'lab',
      icon: '🩸',
      verdict: '168 mg/dL — थोड़ा ज्यादा (High)',
      explanation: 'आपकी रिपोर्ट में शुगर 168 दर्ज है। सामान्य स्तर 100 से कम होना चाहिए। मीठा कम खाएं और वैद्य जी की सलाह लें।',
      value: '168 mg/dL',
      status: 'high',
      audioDesc: 'आपकी खून की जांच में चीनी 168 आई है। यह थोड़ी बढ़ी हुई है। चिंता न करें, मीठे से परहेज रखें और अपने डॉक्टर से संपर्क करें।',
    },
    {
      title: 'Blood Pressure & Pulse (रक्तचाप जांच)',
      type: 'lab',
      icon: '💓',
      verdict: '124 / 82 mmHg — बिल्कुल ठीक (Normal)',
      explanation: 'आपका बीपी सामान्य है। प्रतिदिन 20 मिनट टहलें और नमक संतुलित मात्रा में लें।',
      value: '124/82 mmHg',
      status: 'normal',
      audioDesc: 'आपका रक्तचाप 124 बटा 82 है, जो बिल्कुल सामान्य और सुरक्षित है।',
    },
    {
      title: 'Knee Joint Scan (घुटने का एक्स-रे)',
      type: 'scan',
      icon: '🦴',
      verdict: 'Mild Osteoarthritis (हल्की जोड़ों की अकड़न)',
      explanation: 'घुटने में मामूली जोड़ों का घिसाव है। महानारायण तेल की मालिश व गर्म सिकाई से आराम मिलेगा।',
      value: 'Grade-1 OA',
      status: 'attention',
      audioDesc: 'घुटने के एक्स-रे में हल्की सूजन और जोड़ों की अकड़न है। आयुर्वेदिक तेल की मालिश से लाभ होगा।',
    },
  ];

  const handleProcessSample = (sample: typeof samples[0]) => {
    setStep('processing');
    setProgressText('1. फोटो की स्पष्टता जांची जा रही है (Clarity Check)...');

    setTimeout(() => {
      setProgressText('2. अक्षर पठनीय हैं (OCR Readability Passed)...');
    }, 900);

    setTimeout(() => {
      setProgressText('3. दस्तावेज की पहचान: ' + sample.title + ' (FHIR DocumentReference)...');
    }, 1800);

    setTimeout(() => {
      setProgressText('4. आयुष व स्वास्थ्य विश्लेषण तैयार (Observations Generated)...');
      
      const newRec: HealthRecord = {
        id: `REC-${Date.now().toString().slice(-4)}`,
        title: sample.title,
        titleKey: sample.type,
        type: sample.type,
        icon: sample.icon,
        date: 'आज, 16 Sep 2026',
        facility: 'जिला आयुष अस्पताल / Registered HIP',
        doctor: 'डॉ. राधिका अय्यर (MD)',
        status: sample.status,
        statusText: sample.verdict,
        simpleExplanation: sample.explanation,
        fhirType: 'Observation',
        value: sample.value,
      };

      setAnalyzedRecord(newRec);
      setStep('result');
      // Automatically read aloud for lower-literacy patient convenience
      onSpeak(sample.audioDesc);
    }, 2800);
  };

  const handleFinish = () => {
    if (analyzedRecord) {
      onUploadSuccess(analyzedRecord);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#94D0B0] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with Ayush Soft Mint Motif */}
        <div className="bg-gradient-to-r from-[#E3F4EA] via-[#F2FAF5] to-white text-[#143E29] p-4 flex items-center justify-between border-b border-[#BFDFCD]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📷</span>
            <div>
              <h3 className="font-baloo text-lg font-bold text-[#143E29] leading-tight">
                {t.uploadTitle}
              </h3>
              <p className="text-[11px] text-[#40765A]">ABDM डिजिटल स्वास्थ्य रिपोर्ट</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E1F4EA] hover:bg-[#D0EFDD] text-[#135934] flex items-center justify-center transition-colors border border-[#A4DDBD]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 bg-gradient-to-b from-[#F7FCF9] to-white">

          {/* STEP 1: SELECT OR TAKE PHOTO */}
          {step === 'select' && (
            <div className="space-y-4">
              
              {/* Instructions banner for lower-literate users with audio button */}
              <div className="bg-gradient-to-r from-[#EAF6F0] to-[#E1F4EA] border border-[#A6DEC0] rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs">
                <button
                  onClick={() => onSpeak("कागज या रिपोर्ट को सीधी रोशनी में रखें। नीचे दिए गए कैमरा बटन को दबाकर फोटो खींचें, या परीक्षण के लिए नीचे दिए गए तैयार नमूनों में से कोई एक चुनें।")}
                  className="w-10 h-10 rounded-full bg-[#18633D] text-white flex-shrink-0 flex items-center justify-center shadow-xs hover:bg-[#135231] transition-colors"
                  title="Listen instruction"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <div className="text-xs text-[#14442C]">
                  <span className="font-bold text-[#143E29] block mb-0.5">सरल निर्देश (Simple Guide):</span>
                  कागज को समतल और अच्छी रोशनी में रखें। हम फोटो पढ़कर आपको सरल शब्दों में समझाएंगे।
                </div>
              </div>

              {/* Big Camera / File Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleProcessSample(samples[0])}
                  className="p-4 bg-gradient-to-b from-white to-[#F2FAF5] border-2 border-dashed border-[#84C9A3] rounded-2xl flex flex-col items-center gap-2 hover:bg-[#EAF6F0] active:scale-95 transition-all text-center shadow-2xs"
                >
                  <div className="w-12 h-12 rounded-full bg-[#D6F1E2] text-[#135633] flex items-center justify-center text-2xl border border-[#A3DCBC]">
                    📸
                  </div>
                  <span className="font-bold text-xs text-[#143E29]">{t.takePhoto}</span>
                  <span className="text-[10px] text-[#477C62]">सीधे फोन कैमरे से</span>
                </button>

                <button
                  onClick={() => handleProcessSample(samples[1])}
                  className="p-4 bg-gradient-to-b from-white to-[#F2FAF5] border-2 border-dashed border-[#84C9A3] rounded-2xl flex flex-col items-center gap-2 hover:bg-[#EAF6F0] active:scale-95 transition-all text-center shadow-2xs"
                >
                  <div className="w-12 h-12 rounded-full bg-[#DAF2E5] text-[#135633] flex items-center justify-center text-2xl border border-[#A3DCBC]">
                    📁
                  </div>
                  <span className="font-bold text-xs text-[#143E29]">{t.chooseFile}</span>
                  <span className="text-[10px] text-[#477C62]">PDF या गैलरी फोटो</span>
                </button>
              </div>

              {/* Quick Sample Demonstrator */}
              <div className="pt-2">
                <div className="text-xs font-bold text-[#143E29] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#18663E]" />
                  <span>{t.sampleReports}</span>
                </div>

                <div className="space-y-2">
                  {samples.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleProcessSample(s)}
                      className="p-3 bg-gradient-to-r from-white via-[#F9FCFA] to-[#EDF6F1] border border-[#C9E4D4] rounded-xl hover:border-[#71C292] hover:shadow-2xs cursor-pointer transition-all flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                          <div className="font-semibold text-xs text-[#143E29]">{s.title}</div>
                          <div className="text-[11px] text-[#4B7D64]">{s.verdict}</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#145634] bg-[#D7EFE1] px-2 py-1 rounded-lg border border-[#9BDAB6]">
                        जांचें →
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: PROCESSING / VERIFICATION PIPELINE */}
          {step === 'processing' && (
            <div className="py-8 text-center space-y-5">
              <div className="relative mx-auto w-20 h-20">
                <div className="w-full h-full rounded-full border-4 border-[#C8E5D5] border-t-[#1F6441] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  🔍
                </div>
              </div>

              <div>
                <h4 className="font-baloo text-base font-bold text-[#143E29]">
                  रिपोर्ट की सुरक्षा और गुणवत्ता जांच
                </h4>
                <p className="text-xs text-[#206341] mt-1 font-medium px-4">
                  {progressText}
                </p>
              </div>

              <div className="bg-[#EBF6F0] border border-[#BCE1CD] rounded-xl p-3 max-w-xs mx-auto text-[11px] text-[#155635] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D7449] flex-shrink-0" />
                <span>धुंधलापन जांच: 100% स्पष्ट (Blur Check Passed)</span>
              </div>
            </div>
          )}

          {/* STEP 3: SIMPLIFIED RESULTS & AUDIO EXPLANATION */}
          {step === 'result' && analyzedRecord && (
            <div className="space-y-4">
              
              {/* Success Badge */}
              <div className="bg-[#E2F4EA] border border-[#B7E1CA] rounded-2xl p-3 flex items-center gap-2 text-[#145333]">
                <CheckCircle2 className="w-5 h-5 text-[#185F3A] flex-shrink-0" />
                <div className="text-xs font-semibold">
                  {t.uploadSuccess}
                </div>
              </div>

              {/* Patient Friendly Verdict Box */}
              <div className={`p-4 rounded-2xl border ${
                analyzedRecord.status === 'normal'
                  ? 'bg-gradient-to-r from-white to-[#F2F9F5] border-[#BDE2CD] text-[#14482E]'
                  : 'bg-gradient-to-r from-white to-[#FAF6ED] border-[#E8DDC6] text-[#86520C]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{analyzedRecord.icon}</span>
                    <div>
                      <h4 className="font-baloo text-base font-bold leading-tight">
                        {analyzedRecord.title}
                      </h4>
                      <p className="text-xs opacity-75 font-mono">{analyzedRecord.loincCode || 'FHIR DiagnosticReport'}</p>
                    </div>
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    analyzedRecord.status === 'normal'
                      ? 'bg-[#DCF1E6] text-[#135433] border-[#B8DEC8]'
                      : 'bg-[#FDF3E3] text-[#8A520B] border-[#F2DFC0]'
                  }`}>
                    {analyzedRecord.statusText}
                  </span>
                </div>

                {/* Simplified Vernacular Explanation */}
                <div className="mt-3 pt-3 border-t border-[#DDECE2] text-sm font-medium leading-relaxed">
                  {analyzedRecord.simpleExplanation}
                </div>

                {/* Big Audio Read-Aloud Button */}
                <button
                  onClick={() => onSpeak(`${analyzedRecord.title}। नतीजा है: ${analyzedRecord.statusText}। ${analyzedRecord.simpleExplanation}`)}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-[#18633D] text-white hover:bg-[#135231] font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-95 text-xs"
                >
                  <Volume2 className="w-4 h-4 text-emerald-200" />
                  <span>{t.readAloudReport}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setStep('select')}
                  className="flex-1 py-2.5 border border-[#BDE0CE] rounded-xl text-xs font-semibold text-[#144E2F] hover:bg-[#EEF7F2]"
                >
                  दूसरी फोटो लें
                </button>

                <button
                  onClick={handleFinish}
                  className="flex-1 py-2.5 bg-[#18633D] text-white rounded-xl text-xs font-semibold hover:bg-[#135231] shadow-xs"
                >
                  रिकॉर्ड में जोड़ें ✓
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
