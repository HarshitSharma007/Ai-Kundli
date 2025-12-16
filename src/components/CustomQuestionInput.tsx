import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send } from 'lucide-react';

interface CustomQuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export const CustomQuestionInput: React.FC<CustomQuestionInputProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Ask your own question to the cosmos..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          variant="mystical"
          size="lg"
          disabled={!question.trim() || isLoading}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
