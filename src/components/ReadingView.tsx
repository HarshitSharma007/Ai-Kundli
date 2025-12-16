import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { StarField } from './StarField';
import { AnimatedGuru } from './AnimatedGuru';
import { QuestionList } from './QuestionList';
import { CustomQuestionInput } from './CustomQuestionInput';
import { Category, Question, UserBirthData, CATEGORY_QUESTIONS } from '@/types/astrology';
import { useAstrologyAI } from '@/hooks/useAstrologyAI';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ReadingViewProps {
  category: Category;
  userData: UserBirthData;
  onBack: () => void;
  onBackToCategories: () => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({
  category,
  userData,
  onBack,
  onBackToCategories,
}) => {
  const { generateReading, isLoading } = useAstrologyAI();
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>(CATEGORY_QUESTIONS[category.id] || []);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasInitialReading, setHasInitialReading] = useState(false);

  useEffect(() => {
    // Generate initial reading when category is selected
    const loadInitialReading = async () => {
      setIsSpeaking(true);
      const result = await generateReading(userData, category.id);
      setCurrentAnswer(result.answer);
      setHasInitialReading(true);
      // Keep speaking animation for the duration of text typing
      setTimeout(() => setIsSpeaking(false), result.answer.length * 30 + 1000);
    };
    loadInitialReading();
  }, [category.id, userData, generateReading]);

  const handleSelectQuestion = async (question: Question) => {
    setIsSpeaking(true);
    const result = await generateReading(userData, category.id, question.text);
    setCurrentAnswer(result.answer);
    setQuestions(result.followUpQuestions);
    setTimeout(() => setIsSpeaking(false), result.answer.length * 30 + 1000);
  };

  const handleCustomQuestion = async (questionText: string) => {
    setIsSpeaking(true);
    const result = await generateReading(userData, category.id, questionText);
    setCurrentAnswer(result.answer);
    setQuestions(result.followUpQuestions);
    setTimeout(() => setIsSpeaking(false), result.answer.length * 30 + 1000);
  };

  return (
    <div className="min-h-screen cosmic-bg relative py-8 px-4">
      <StarField />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBackToCategories}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Categories
          </Button>

          <div className="flex items-center gap-2 text-primary">
            <span className="text-2xl">{category.icon}</span>
            <h2 className="font-mystical text-lg gold-text">{category.name}</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-fade-in-up">
          {/* Loading State */}
          {!hasInitialReading && isLoading && (
            <div className="text-center py-20">
              <div className="inline-block">
                <Sparkles className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
                <p className="font-mystical text-primary">
                  The stars are aligning...
                </p>
              </div>
            </div>
          )}

          {/* Guru and Answer */}
          {hasInitialReading && (
            <>
              <AnimatedGuru 
                isSpeaking={isSpeaking || isLoading} 
                message={currentAnswer} 
              />

              {/* Questions Section */}
              {!isLoading && (
                <div className="mt-8">
                  <QuestionList
                    questions={questions}
                    onSelectQuestion={handleSelectQuestion}
                    isLoading={isLoading}
                  />

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-primary/20" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-background text-muted-foreground text-sm font-mystical">
                        or ask your own
                      </span>
                    </div>
                  </div>

                  <CustomQuestionInput
                    onSubmit={handleCustomQuestion}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
