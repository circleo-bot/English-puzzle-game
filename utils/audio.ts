export const playPronunciation = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // Slower for learning
    utterance.volume = 1;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
};