import React from 'react';
import { CategoryCard } from './CategoryCard';
import { StarField } from './StarField';
import { CATEGORIES, Category } from '@/types/astrology';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface CategorySelectionProps {
  userName: string;
  onSelectCategory: (category: Category) => void;
  onBack: () => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  userName,
  onSelectCategory,
  onBack,
}) => {
  return (
    <div className="min-h-screen cosmic-bg relative py-8 px-4">
      <StarField />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-mystical gold-text mb-3">
              Welcome, {userName}
            </h1>
            <p className="text-foreground/70 text-lg font-body max-w-xl mx-auto">
              The cosmos has aligned for you. Choose a realm to explore your destiny.
            </p>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onSelectCategory(category)}
              index={index}
            />
          ))}
        </div>

        {/* Footer mystical decoration */}
        <div className="text-center mt-12 animate-fade-in-up opacity-0 stagger-6">
          <div className="inline-flex items-center gap-4 text-muted-foreground">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-2xl">☽ ✦ ☾</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="text-sm text-muted-foreground mt-3 font-body">
            Each card reveals a different aspect of your cosmic journey
          </p>
        </div>
      </div>
    </div>
  );
};
