import React, { useEffect, useState } from 'react';

interface AnimatedGuruProps {
  isSpeaking: boolean;
  message: string;
}

export const AnimatedGuru: React.FC<AnimatedGuruProps> = ({ isSpeaking, message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (message && isSpeaking) {
      setDisplayedText('');
      setCurrentIndex(0);
    }
  }, [message, isSpeaking]);

  useEffect(() => {
    if (currentIndex < message.length && isSpeaking) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, message, isSpeaking]);

  return (
    <div className="flex flex-col items-center">
      {/* Guru Avatar */}
      <div className={`relative mb-6 ${isSpeaking ? 'guru-speaking' : ''}`}>
        {/* Outer glow */}
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl scale-150 glow-pulse" />
        
        {/* Avatar container */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg shadow-primary/30">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
            <span className="text-6xl md:text-7xl float">🧙‍♂️</span>
          </div>
        </div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                style={{
                  animation: 'pulse 1s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Guru Title */}
      <h3 className="font-mystical text-xl gold-text mb-4">The Astro Guru</h3>

      {/* Message Bubble */}
      <div className="mystical-card p-6 max-w-2xl mx-auto relative">
        {/* Decorative stars */}
        <div className="absolute top-3 left-3 text-primary/50">✦</div>
        <div className="absolute top-3 right-3 text-primary/50">✦</div>
        <div className="absolute bottom-3 left-3 text-primary/50">✦</div>
        <div className="absolute bottom-3 right-3 text-primary/50">✦</div>

        <p className="text-foreground/90 font-body leading-relaxed text-center min-h-[100px]">
          {isSpeaking ? displayedText : message}
          {isSpeaking && currentIndex < message.length && (
            <span className="animate-pulse ml-1">|</span>
          )}
        </p>
      </div>
    </div>
  );
};
