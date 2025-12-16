import { useState, useCallback } from 'react';
import { UserBirthData, Question } from '@/types/astrology';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

    try {
      // Get intro reading
      const introResponse = await supabase.functions.invoke('astrology-reading', {
        body: {
          userData,
          category,
          question,
          type: question ? 'question' : 'intro'
        }
      });

      if (introResponse.error) {
        throw new Error(introResponse.error.message);
      }

      const answer = introResponse.data.content;

      // Generate follow-up questions
      const followUpResponse = await supabase.functions.invoke('astrology-reading', {
        body: {
          userData,
          category,
          type: 'followup'
        }
      });

      let followUpQuestions: Question[] = [];
      
      if (followUpResponse.data?.content) {
        try {
          // Parse the JSON array from the AI response
          const parsed = JSON.parse(followUpResponse.data.content);
          followUpQuestions = parsed.map((text: string, index: number) => ({
            id: `f${index + 1}-${Date.now()}`,
            text,
            categoryId: category
          }));
        } catch {
          // Fallback questions if parsing fails
          followUpQuestions = getDefaultFollowUpQuestions(category);
        }
      } else {
        followUpQuestions = getDefaultFollowUpQuestions(category);
      }

      setCurrentAnswer(answer);
      return { answer, followUpQuestions };
    } catch (error) {
      console.error('Error generating reading:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          toast.error('Too many requests. Please wait a moment and try again.');
        } else if (error.message.includes('402')) {
          toast.error('AI usage limit reached. Please add credits to continue.');
        } else {
          toast.error('Failed to generate reading. Please try again.');
        }
      }
      
      // Return fallback response
      const fallbackAnswer = getFallbackReading(userData, category, question);
      setCurrentAnswer(fallbackAnswer);
      return { answer: fallbackAnswer, followUpQuestions: getDefaultFollowUpQuestions(category) };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generateReading, isLoading, currentAnswer };
};

function getDefaultFollowUpQuestions(category: string): Question[] {
  return [
    { id: `f1-${Date.now()}`, text: `How can I enhance my ${category} energy?`, categoryId: category },
    { id: `f2-${Date.now()}`, text: `What obstacles should I be aware of?`, categoryId: category },
    { id: `f3-${Date.now()}`, text: `What is the best timing for action?`, categoryId: category },
    { id: `f4-${Date.now()}`, text: `How do my past lives influence this?`, categoryId: category },
    { id: `f5-${Date.now()}`, text: `What hidden blessings await me?`, categoryId: category },
  ];
}

function getFallbackReading(userData: UserBirthData, category: string, question?: string): string {
  const zodiacSign = getZodiacSign(userData.dateOfBirth);
  
  const readings: Record<string, string> = {
    career: `Dear ${userData.name}, as a ${zodiacSign}, the celestial bodies reveal great potential in your professional journey. Trust in your abilities and remain open to new opportunities that align with your cosmic path.`,
    health: `Beloved ${userData.name}, your ${zodiacSign} energy influences your vitality in unique ways. Embrace practices that nurture both your physical and spiritual well-being.`,
    relationships: `Dear soul ${userData.name}, your ${zodiacSign} heart carries deep capacity for love. Your cosmic energy attracts kindred spirits who resonate with your authentic self.`,
    wealth: `Noble ${userData.name}, as a ${zodiacSign}, Jupiter's influence on your financial sector is powerful. Trust the universe's timing in matters of material wealth.`,
    lifeline: `Enlightened ${userData.name}, your ${zodiacSign} soul carries ancient wisdom. Your spiritual evolution continues to unfold beautifully.`,
    lucky: `Fortunate ${userData.name}, the stars reveal your lucky elements as a ${zodiacSign}. Embrace these celestial gifts.`,
  };

  return question 
    ? `Regarding your question: The cosmic wisdom reveals guidance for your ${category} path.`
    : readings[category] || readings.lifeline;
}

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
