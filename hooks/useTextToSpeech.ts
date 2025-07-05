import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState<string | null>(null);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
        console.warn("Text-to-speech not supported in this browser.");
        return;
    }
    // Cancel any ongoing speech before starting a new one
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    setSpokenText(text);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpokenText(null);
    };
    
    utterance.onerror = (event) => {
      console.error("SpeechSynthesis Error", event);
      setIsSpeaking(false);
      setSpokenText(null);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpokenText(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };
  }, []);

  return { speak, cancel, isSpeaking, spokenText };
};
