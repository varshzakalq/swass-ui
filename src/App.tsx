import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, PhoneCall, Sparkles, Heart, Shield, HelpCircle } from 'lucide-react';
import { initialPatient, sampleHealthRecords } from './data/mockData';
import { HealthRecord, LanguageCode } from './types';
import { translations } from './i18n/translations';
import { Header } from './components/Header';
import { AbhaCard } from './components/AbhaCard';
import { ActionCards } from './components/ActionCards';
import { RecordsList } from './components/RecordsList';
import { AyushRemedies } from './components/AyushRemedies';
import { ReportUploadModal } from './components/ReportUploadModal';
import { SaathiVoiceModal } from './components/SaathiVoiceModal';
import { DoctorConsole } from './components/DoctorConsole';
import { speakText, stopSpeaking } from './utils/speech';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('hi');
  const [activeRole, setActiveRole] = useState<'patient' | 'doctor'>('patient');
  const [records, setRecords] = useState<HealthRecord[]>(sampleHealthRecords);
  
  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSaathiOpen, setIsSaathiOpen] = useState(false);
  
  // Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = translations[currentLang];

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    speakText(
      text,
      currentLang,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleStopSpeech = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleAddRecord = (newRec: HealthRecord) => {
    setRecords(prev => [newRec, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5FAF7] via-[#FCFDFD] to-[#EFF7F2] text-[#143E29] flex flex-col antialiased selection:bg-[#DCF1E6]">
      
      {/* Top Ayush & National Header with Language Switcher & Console Navigation */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activeRole={activeRole}
        onToggleRole={setActiveRole}
        isSpeaking={isSpeaking}
        onStopSpeech={handleStopSpeech}
      />

      {/* Main Container */}
      <main className="flex-1 pb-24">
        {activeRole === 'doctor' ? (
          /* DOCTOR CONSOLE VIEW (DEDICATED PAGE) */
          <DoctorConsole
            currentLang={currentLang}
            onSwitchToPatient={() => setActiveRole('patient')}
          />
        ) : (
          /* PATIENT CONSOLE VIEW (SIMPLIFIED & ESSENTIAL FOR LOWER-LITERACY PATIENTS) */
          <div className="max-w-md mx-auto w-full">
            
            {/* Top Welcome Section with Soft Pale Mint & White Gradient */}
            <div className="bg-gradient-to-b from-[#E3F4EA] via-[#F1FAF5] to-white text-[#143E29] px-5 pt-5 pb-6 rounded-b-[32px] shadow-2xs relative overflow-hidden border-b border-[#C2E4D2]">
              
              {/* Subtle Traditional Mandala Graphic */}
              <div className="absolute right-0 top-0 w-36 h-36 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8">
                <svg viewBox="0 0 100 100" fill="none" stroke="#1F6441" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="45" />
                  <circle cx="50" cy="50" r="30" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="15" />
                  <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" />
                </svg>
              </div>

              {/* Sanskrit Ayush Motto in Light Green Pill */}
              <div className="text-center pb-2">
                <span className="inline-block bg-[#D7EFE1] text-[#135934] border border-[#A2D9B9] text-[10.5px] font-semibold font-cinzel tracking-wider px-3 py-0.5 rounded-full shadow-2xs">
                  सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
                </span>
              </div>

              {/* Greeting & Voice Narrator Button */}
              <div className="flex items-center justify-between gap-3 mt-1.5 relative z-10">
                <div className="min-w-0">
                  <h2 className="font-baloo text-2xl sm:text-3xl font-bold text-[#143E29] tracking-wide leading-tight">
                    {t.greetingMorning}
                  </h2>
                  <p className="text-xs text-[#3E7659] mt-0.5 font-medium">
                    {t.greetingSub}
                  </p>
                </div>

                {/* Big Audio Read Aloud button for greeting */}
                <button
                  onClick={() => handleSpeak(t.voiceGreeting)}
                  className="w-11 h-11 rounded-full bg-[#E0F3E8] hover:bg-[#CFEEDC] text-[#155936] border border-[#A8DEC0] flex items-center justify-center shadow-xs active:scale-95 transition-transform flex-shrink-0"
                  title="Listen to welcome message"
                  aria-label="Read welcome greeting"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* ABHA Health ID Card with Light Green/Pale White Theme */}
            <AbhaCard
              patient={initialPatient}
              currentLang={currentLang}
              onSpeak={handleSpeak}
              isSpeaking={isSpeaking}
            />

            {/* Low-Literacy Audio Guidance Banner */}
            <div className="mx-4 mt-4 bg-gradient-to-r from-[#EAF6F0] via-[#F4FAF6] to-[#E2F4EB] border border-[#A8DFC2] rounded-2xl p-3 flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#D6F0E1] text-[#135634] flex items-center justify-center flex-shrink-0 text-base border border-[#9BDAB7]">
                🔊
              </div>
              <p className="text-[11.5px] text-[#14442D] font-medium leading-snug flex-1">
                {t.voiceHelpBanner}
              </p>
              <button
                onClick={() => handleSpeak(t.voiceHelpBanner)}
                className="text-[11px] font-bold text-[#145935] underline flex-shrink-0 hover:text-[#0E3E24]"
              >
                सुनें
              </button>
            </div>

            {/* Essential Action Cards (Non-Repetitive Core Services) */}
            <ActionCards
              currentLang={currentLang}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenRecords={() => {
                const el = document.getElementById('records-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSaathi={() => setIsSaathiOpen(true)}
              onSpeak={handleSpeak}
            />

            {/* Patient Records List (Essential Verified History) */}
            <div id="records-section">
              <RecordsList
                records={records}
                currentLang={currentLang}
                onSpeak={handleSpeak}
                onOpenUpload={() => setIsUploadOpen(true)}
              />
            </div>

            {/* National Ayush & ABDM Security Footer */}
            <footer className="mt-6 px-4 py-4 text-center border-t border-[#CCE5D6] bg-gradient-to-t from-[#E8F5EE] to-transparent rounded-t-2xl">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#165A36]">
                <Shield className="w-3.5 h-3.5 text-[#1B633F]" />
                <span>ABDM सुरक्षित • आयुष 14443 • आपातकालीन 108</span>
              </div>
            </footer>

          </div>
        )}
      </main>

      {/* Floating Bottom AI Saathi Voice Button (Essential for Voice-First Patients) */}
      {activeRole === 'patient' && (
        <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 pointer-events-none z-30">
          <button
            onClick={() => setIsSaathiOpen(true)}
            className="pointer-events-auto w-full bg-gradient-to-r from-[#1B633D] via-[#247348] to-[#175736] text-white rounded-2xl py-3.5 px-5 shadow-md flex items-center justify-between font-baloo font-bold text-base border-2 border-[#7EC69D] hover:brightness-105 active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 text-emerald-100 flex items-center justify-center text-lg">
                🎙️
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">{t.actionSaathi}</div>
                <div className="text-[11px] text-emerald-100/90 font-normal">माइक से पूछें</div>
              </div>
            </div>

            <div className="bg-[#134D2F] text-emerald-100 border border-[#52A779] text-xs px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1 font-mono font-semibold">
              <span>बोलें</span>
              <span>→</span>
            </div>
          </button>
        </div>
      )}

      {/* Upload Modal (ABDM Intake Pipeline) */}
      <ReportUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        currentLang={currentLang}
        onUploadSuccess={handleAddRecord}
        onSpeak={handleSpeak}
      />

      {/* Saathi Voice AI Modal */}
      <SaathiVoiceModal
        isOpen={isSaathiOpen}
        onClose={() => setIsSaathiOpen(false)}
        currentLang={currentLang}
        onSpeak={handleSpeak}
        isSpeaking={isSpeaking}
      />

    </div>
  );
}
