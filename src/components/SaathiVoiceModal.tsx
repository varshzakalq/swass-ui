import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, X, Sparkles, MessageSquare, PhoneCall, StopCircle } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { createSpeechRecognizer, stopSpeaking } from '../utils/speech';

interface SaathiVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'saathi';
  text: string;
  audioText?: string;
  time: string;
}

export const SaathiVoiceModal: React.FC<SaathiVoiceModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSpeak,
  isSpeaking,
}) => {
  const t = translations[currentLang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-init',
        sender: 'saathi',
        text: currentLang === 'hi'
          ? 'नमस्ते रमेश जी! मैं आपका आयुष साथी हूँ। आप मुझसे अपनी भाषा में कोई भी सवाल पूछ सकते हैं या नीचे दिए गए माइक बटन को दबाकर बोल सकते हैं।'
          : currentLang === 'ta'
          ? 'வணக்கம் ரமேஷ் அவர்களே! நான் உங்கள் ஆயுஷ் சாதி. உங்கள் ஆரோக்கியம் குறித்த எந்த கேள்வியையும் நீங்கள் என்னிடம் கேட்கலாம்.'
          : currentLang === 'te'
          ? 'నమస్కారం రమేష్ గారు! నేను మీ ఆయుష్ సాథీని. మీ ఆరోగ్య సమస్యలు లేదా మందుల గురించి నాతో మాట్లాడవచ్చు.'
          : currentLang === 'bn'
          ? 'নমস্কার রমেশ বাবু! আমি আপনার আয়ুষ সাথী। আপনি নিজের ভাষায় স্বাস্থ্য বা আয়ুর্বেদিক চিকিৎসা সম্পর্কে যে কোনো প্রশ্ন করতে পারেন।'
          : currentLang === 'mr'
          ? 'नमस्कार रमेश जी! मी तुमचा आयुष साथी आहे. आरोग्याविषयी कोणताही प्रश्न तुम्ही मला विचारू शकता.'
          : 'Namaste Ramesh ji! I am your Ayush Saathi. You can ask me anything about your health, lab reports, or herbal remedies by voice or text.',
        time: 'Just now',
      };
      setMessages([initialGreeting]);
      onSpeak(initialGreeting.text);
    }
  }, [isOpen, currentLang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isListening]);

  if (!isOpen) return null;

  // Handle Speech Recognition
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setRecognitionError(null);
    setIsListening(true);

    const recognizer = createSpeechRecognizer(
      currentLang,
      (transcript) => {
        setIsListening(false);
        if (transcript.trim()) {
          handleSendMessage(transcript);
        }
      },
      () => {
        setIsListening(false);
      },
      (err) => {
        console.warn('Recognition error:', err);
        setIsListening(false);
        setRecognitionError('आवाज पहचानी नहीं जा सकी। कृपया दोबारा बोलें या नीचे दिए गए विकल्प चुनें।');
      }
    );

    if (!recognizer) {
      setIsListening(false);
      // Fallback: simulate voice input for low-literacy testing
      const sampleQuestion = t.quickQuestions[0];
      handleSendMessage(sampleQuestion);
      return;
    }

    try {
      recognizer.start();
    } catch (e) {
      console.warn('Speech start error:', e);
      setIsListening(false);
    }
  };

  // Generate Vernacular Ayush AI Response
  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('sugar') || q.includes('शुगर') || q.includes('चीनी') || q.includes('சர்க்கரை') || q.includes('రక్తం')) {
      return currentLang === 'hi'
        ? 'आपकी पिछली शुगर रिपोर्ट 168 mg/dL आई थी, जो सामान्य से थोड़ी अधिक है। जामुन की गुठली का चूर्ण या करेले का रस सुबह खाली पेट लें। मीठी चाय, मिठाई और तले भोजन से बचें तथा प्रतिदिन 20 मिनट तेज चलें।'
        : currentLang === 'ta'
        ? 'உங்கள் இரத்த சர்க்கரை அளவு 168 ஆக உள்ளது. பாகற்காய் சாறு மற்றும் நாவல் பழ கொட்டை பொடி எடுத்துக்கொள்ளவும். இனிப்புகளை தவிர்க்கவும்.'
        : currentLang === 'te'
        ? 'మీ షుగర్ 168 ఉంది. ఉదయం కాకరకాయ రసం లేదా నేరేడు గింజల పొడి తీసుకుంటే మంచిది. తీపి పదార్థాలు తగ్గించండి.'
        : currentLang === 'bn'
        ? 'আপনার সুগার ১৬৮ রয়েছে। প্রতিদিন সকালে করল্লার রস অথবা জামের দানার গুঁড়ো খেতে পারেন। মিষ্টি জাতীয় খাবার এড়িয়ে চলুন।'
        : currentLang === 'mr'
        ? 'तुमची साखर १६८ आहे. रोज सकाळी कारल्याचा रस किंवा जांभळाच्या बियांची पूड घ्या. गोड खाणे टाळा आणि चालायला जा.'
        : 'Your last fasting blood sugar was 168 mg/dL, which is elevated. Consider taking Jamun seed powder or bitter gourd juice in the morning, avoid refined sugars, and walk briskly for 20 minutes daily.';
    }

    if (q.includes('knee') || q.includes('दर्द') || q.includes('घुटने') || q.includes('வலி') || q.includes('నొప్పి') || q.includes('ব্যথা')) {
      return currentLang === 'hi'
        ? 'घुटनों के दर्द और जोड़ों की अकड़न के लिए महानारायण तेल या तिल के तेल में लहसुन पकाकर गुनगुनी मालिश करें। रात में एक गिलास हल्दी वाला गर्म दूध पिएं और ठंडी हवा से जोड़ों को बचाएं।'
        : 'For knee pain, gently massage with warm Mahanarayan or sesame oil boiled with garlic. Drink warm turmeric milk before sleeping and practice light joint movements.';
    }

    if (q.includes('काढ़ा') || q.includes('kadha') || q.includes('कफ') || q.includes('सर्दी') || q.includes('கபசுர')) {
      return currentLang === 'hi'
        ? 'आयुष काढ़ा बनाने के लिए: 4 तुलसी के पत्ते, 2 काली मिर्च, आधा चम्मच दालचीनी और थोड़ा अदरक 1 गिलास पानी में उबालें जब तक आधा न रह जाए। इसमें थोड़ा गुड़ मिलाकर गुनगुना पिएं।'
        : 'To prepare Ayush Kadha: Boil 4 holy basil leaves, 2 black peppers, 1/2 tsp cinnamon, and crushed ginger in 2 cups of water until reduced by half. Sip warm.';
    }

    if (q.includes('दवा') || q.includes('medicine') || q.includes('tablet') || q.includes('மருந்து')) {
      return currentLang === 'hi'
        ? 'आपकी मौजूदा पर्ची में: चंद्रप्रभा वटी (सुबह 1 गोली भोजन के बाद) और त्रिफला चूर्ण (रात को गुनगुने पानी के साथ 1 चम्मच) दर्ज है। कृपया समय पर खुराक लें।'
        : 'Your current prescription records: Chandraprabha Vati (1 tablet morning after breakfast) and Triphala powder (1 spoon with warm water at bedtime).';
    }

    return currentLang === 'hi'
      ? 'मैंने आपकी बात समझ ली है। प्राकृतिक स्वास्थ्य के लिए ताजा भोजन, भरपूर पानी और नियमित दिनचर्या अपनाएं। यदि समस्या बनी रहे तो नजदीकी आयुष केंद्र के डॉक्टर से संपर्क करें।'
      : 'I have noted your query. For optimal wellness, maintain a balanced diet and hydration. Please consult your Ayush physician for any persistent concerns.';
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent Ayush reply
    setTimeout(() => {
      const replyText = generateResponse(textToSend);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'saathi',
        text: replyText,
        time: 'Just now',
      };
      setMessages(prev => [...prev, botMsg]);
      onSpeak(replyText);
    }, 700);
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border-2 border-[#94D0B0] rounded-3xl max-w-md w-full h-[85vh] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header with Ayush Mascot */}
        <div className="bg-gradient-to-r from-[#EAF5EF] via-[#F6FAF8] to-white text-[#143E29] p-3.5 flex items-center justify-between border-b border-[#C5E4D3]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#DDF2E6] text-[#165635] flex items-center justify-center text-xl font-bold border border-[#BDE0CE]">
              🌿
            </div>
            <div>
              <h3 className="font-baloo text-base font-bold text-[#143E29] leading-tight">
                {t.saathiTitle}
              </h3>
              <p className="text-[11px] text-[#4F8068]">
                {t.saathiSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 animate-pulse"
                title="Stop Audio"
              >
                <StopCircle className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#E1F4EA] hover:bg-[#D0EFDD] text-[#135934] flex items-center justify-center transition-colors border border-[#A4DDBD]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-[#F7FCF9] to-white">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-[#185D38] text-white font-medium rounded-br-none'
                    : 'bg-[#EEF7F2] text-[#143E29] border border-[#BDE1CD] rounded-bl-none'
                }`}
              >
                {m.text}

                {/* Speaker button on assistant message for low-literacy users */}
                {m.sender === 'saathi' && (
                  <div className="mt-2 pt-2 border-t border-[#CCE7D7] flex items-center justify-between text-[11px] text-[#145935]">
                    <button
                      onClick={() => onSpeak(m.text)}
                      className="flex items-center gap-1 font-semibold text-[#145935] hover:text-[#0F3F25]"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#18663C]" />
                      <span>दोबारा सुनें</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Listening soundwave indicator */}
          {isListening && (
            <div className="bg-[#E4F5EB] border border-[#A6DEC0] rounded-2xl p-3 flex items-center gap-3 text-xs text-[#135633] animate-pulse">
              <Mic className="w-5 h-5 text-[#165E39] animate-bounce" />
              <div className="flex-1">
                <span className="font-semibold">{t.speakNow}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="soundwave-bar h-2" />
                  <span className="soundwave-bar h-4" />
                  <span className="soundwave-bar h-3" />
                  <span className="soundwave-bar h-5" />
                </div>
              </div>
            </div>
          )}

          {recognitionError && (
            <div className="text-xs text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-200">
              {recognitionError}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips for Low-Literacy Patients */}
        <div className="px-3 pt-2 pb-1.5 bg-[#EEF7F2] border-t border-[#CCE5D6]">
          <div className="text-[10px] font-semibold text-[#3B7053] uppercase tracking-wide mb-1.5">
            सुझाए गए सवाल (Tap to ask):
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {t.quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="bg-white hover:bg-[#E3F4EA] text-[#135432] text-xs font-semibold px-2.5 py-1.5 rounded-full border border-[#B2DEC5] whitespace-nowrap shadow-2xs transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Giant Voice Microphone */}
        <div className="p-3 bg-white border-t border-[#CCE5D6] flex items-center gap-2">
          {/* Big Voice Button */}
          <button
            onClick={handleToggleVoice}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs transition-all active:scale-95 flex-shrink-0 ${
              isListening
                ? 'bg-rose-600 ring-4 ring-rose-200 animate-pulse'
                : 'bg-gradient-to-r from-[#1B633D] to-[#165434] hover:brightness-105 border border-[#7BC49B]'
            }`}
            title="Speak into microphone"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6 text-white" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder={t.saathiPlaceholder}
            className="flex-1 bg-[#F4FAF6] border border-[#BFDFCD] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#143E29] focus:outline-none focus:ring-2 focus:ring-[#1E6441]"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-[#1B633D] disabled:bg-stone-200 text-white flex items-center justify-center flex-shrink-0 transition-colors shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Ayush Emergency Call Bar */}
        <div className="bg-[#E7F4ED] text-[#165032] py-1.5 px-4 text-center text-[11px] font-semibold flex items-center justify-center gap-3 border-t border-[#CCE5D6]">
          <span className="flex items-center gap-1.5 text-[#185A37]">
            <PhoneCall className="w-3 h-3" />
            <span>राष्ट्रीय आयुष हेल्पलाइन: 14443</span>
          </span>
        </div>

      </div>
    </div>
  );
};
