import React from 'react';
import { Category } from '@/types/astrology';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, index }) => {
  return (
    <button
      onClick={onClick}
      className={`mystical-card group cursor-pointer p-6 text-left animate-card-reveal opacity-0 stagger-${index + 1}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative">
        {/* Card glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl`} />
        
        {/* Icon */}
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </div>
        
        {/* Title */}
        <h3 className="font-mystical text-xl gold-text mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
          {category.description}
        </p>
        
        {/* Decorative corner */}
        <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-60 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"
              fill="currentColor"
              className="text-primary"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};
