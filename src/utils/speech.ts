import { LanguageCode } from '../types';

// Language codes mapped to BCP-47 tags
export const bcp47Map: Record<LanguageCode, string> = {
  hi: 'hi-IN',
  en: 'en-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
};

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function speakText(
  text: string,
  lang: LanguageCode = 'hi',
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this device');
    return false;
  }

  try {
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = bcp47Map[lang] || 'hi-IN';
    utterance.lang = targetLang;
    utterance.rate = 0.88; // Slightly slower for low-literate / elderly clarity
    utterance.pitch = 1.0;

    // Look for matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(lang) || v.lang === targetLang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis event:', e);
      currentUtterance = null;
      onEnd?.();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Speech error:', err);
    onEnd?.();
    return false;
  }
}

export interface SpeechRecognitionResultHolder {
  transcript: string;
}

export function createSpeechRecognizer(
  lang: LanguageCode,
  onResult: (transcript: string) => void,
  onEnd: () => void,
  onError?: (error: any) => void
) {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported in this browser environment');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = bcp47Map[lang] || 'hi-IN';

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      if (transcript) {
        onResult(transcript);
      }
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.onerror = (e: any) => {
      console.warn('Speech recognition warning:', e);
      onError?.(e);
      onEnd();
    };

    return recognition;
  } catch (e) {
    console.warn('Could not initialize SpeechRecognition:', e);
    return null;
  }
}
