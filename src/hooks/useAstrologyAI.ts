import { useState, useCallback } from 'react';
import { UserBirthData, Question } from '@/types/astrology';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useAstrologyAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  const generateReading = useCallback(async (
    userData: UserBirthData,
    category: string,
    question?: string,
    conversationHistory: Message[] = []
  ): Promise<{ answer: string; followUpQuestions: Question[] }> => {
    setIsLoading(true);
    setCurrentAnswer('');

    // Simulate AI response for now (will be replaced with actual AI integration)
    const zodiacSign = getZodiacSign(userData.dateOfBirth);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const readings: Record<string, string> = {
      career: `Dear ${userData.name}, as a ${zodiacSign}, the celestial bodies reveal great potential in your professional journey. The stars indicate that your natural leadership abilities and creative talents will lead you to significant achievements. The current planetary alignment suggests this is an auspicious time for career growth. Trust in your abilities and remain open to new opportunities that align with your cosmic path.`,
      health: `Beloved ${userData.name}, your ${zodiacSign} energy influences your vitality in unique ways. The cosmic forces suggest focusing on balance and mindfulness. Your celestial chart indicates strength, but also reminds you to honor your body's need for rest. Embrace practices that nurture both your physical and spiritual well-being.`,
      relationships: `Dear soul ${userData.name}, your ${zodiacSign} heart carries deep capacity for love. The stars reveal that meaningful connections await you. Venus's current position suggests openness to vulnerability will bring profound bonds. Your cosmic energy attracts kindred spirits who resonate with your authentic self.`,
      wealth: `Noble ${userData.name}, as a ${zodiacSign}, Jupiter's influence on your financial sector is powerful. The celestial patterns indicate opportunities for abundance are approaching. Your natural intuition for prosperity will guide wise decisions. Trust the universe's timing in matters of material wealth.`,
      lifeline: `Enlightened ${userData.name}, your ${zodiacSign} soul carries ancient wisdom. Your life path is illuminated by the stars, revealing a journey of growth and transformation. The cosmos has blessed you with unique gifts meant to be shared with the world. Your spiritual evolution continues to unfold beautifully.`,
      lucky: `Fortunate ${userData.name}, the stars reveal your lucky elements as a ${zodiacSign}. Your auspicious colors are gold and deep purple, resonating with your cosmic energy. Wednesdays and Fridays hold special fortune. The hours between 3-5 PM are most favorable for important decisions. Embrace these celestial gifts.`,
    };

    const answer = question 
      ? `Regarding your question about "${question}": The cosmic wisdom reveals that ${readings[category].toLowerCase()}`
      : readings[category] || readings.lifeline;

    const followUpQuestions: Question[] = [
      { id: `f1-${Date.now()}`, text: `How can I enhance my ${category} energy?`, categoryId: category },
      { id: `f2-${Date.now()}`, text: `What obstacles should I be aware of?`, categoryId: category },
      { id: `f3-${Date.now()}`, text: `What is the best timing for action?`, categoryId: category },
      { id: `f4-${Date.now()}`, text: `How do my past lives influence this?`, categoryId: category },
      { id: `f5-${Date.now()}`, text: `What hidden blessings await me?`, categoryId: category },
    ];

    setIsLoading(false);
    setCurrentAnswer(answer);

    return { answer, followUpQuestions };
  }, []);

  return { generateReading, isLoading, currentAnswer };
};

function getZodiacSign(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}
