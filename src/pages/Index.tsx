import React, { useState, useEffect } from 'react';
import { BirthForm } from '@/components/BirthForm';
import { CategorySelection } from '@/components/CategorySelection';
import { ReadingView } from '@/components/ReadingView';
import { Auth } from '@/components/Auth';
import { UserBirthData, Category } from '@/types/astrology';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

type AppState = 'auth' | 'form' | 'categories' | 'reading';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('auth');
  const [userData, setUserData] = useState<UserBirthData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setAppState('form');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session && appState === 'auth') {
        setAppState('form');
      } else if (!session) {
        setAppState('auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAppState('form');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAppState('auth');
    setUserData(null);
    setSelectedCategory(null);
  };

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
      {isAuthenticated && appState !== 'auth' && (
        <div className="fixed top-4 right-4 z-50">
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}

      {appState === 'auth' && <Auth onAuthSuccess={handleAuthSuccess} />}
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
