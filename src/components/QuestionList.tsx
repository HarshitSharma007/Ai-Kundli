import React from 'react';
import { Question } from '@/types/astrology';

interface QuestionListProps {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
  isLoading: boolean;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onSelectQuestion,
  isLoading,
}) => {
  return (
    <div className="space-y-3 mt-8">
      <h4 className="font-mystical text-primary text-sm uppercase tracking-wider text-center mb-4">
        ✧ Ask the Oracle ✧
      </h4>
      {questions.map((question, index) => (
        <button
          key={question.id}
          onClick={() => onSelectQuestion(question)}
          disabled={isLoading}
          className="w-full text-left p-4 mystical-card hover:border-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up opacity-0 group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-primary group-hover:scale-110 transition-transform">
              ☽
            </span>
            <span className="text-foreground/80 group-hover:text-foreground font-body">
              {question.text}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
