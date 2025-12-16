import React, { useState } from 'react';
import { BirthForm } from '@/components/BirthForm';
import { CategorySelection } from '@/components/CategorySelection';
import { ReadingView } from '@/components/ReadingView';
import { UserBirthData, Category } from '@/types/astrology';

type AppState = 'form' | 'categories' | 'reading';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('form');
  const [userData, setUserData] = useState<UserBirthData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleFormSubmit = (data: UserBirthData) => {
    setUserData(data);
    setAppState('categories');
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setAppState('reading');
  };

  const handleBackToForm = () => {
    setAppState('form');
    setUserData(null);
    setSelectedCategory(null);
  };

  const handleBackToCategories = () => {
    setAppState('categories');
    setSelectedCategory(null);
  };

  return (
    <>
      {appState === 'form' && <BirthForm onSubmit={handleFormSubmit} />}

      {appState === 'categories' && userData && (
        <CategorySelection
          userName={userData.name}
          onSelectCategory={handleCategorySelect}
          onBack={handleBackToForm}
        />
      )}

      {appState === 'reading' && userData && selectedCategory && (
        <ReadingView
          category={selectedCategory}
          userData={userData}
          onBack={handleBackToForm}
          onBackToCategories={handleBackToCategories}
        />
      )}
    </>
  );
};

export default Index;
