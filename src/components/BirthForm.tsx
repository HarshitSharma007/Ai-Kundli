import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserBirthData } from '@/types/astrology';
import { StarField } from './StarField';

interface BirthFormProps {
  onSubmit: (data: UserBirthData) => void;
}

export const BirthForm: React.FC<BirthFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserBirthData>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof UserBirthData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isValid = formData.name && formData.dateOfBirth && formData.placeOfBirth;

  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center p-4 relative">
      <StarField />
      
      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-4xl md:text-5xl font-mystical gold-text mb-3">
            Cosmic Gateway
          </h1>
          <p className="text-foreground/70 text-lg font-body">
            Enter your birth details to unlock the secrets of the stars
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mystical-card p-8 animate-fade-in-up stagger-1 opacity-0">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-mystical text-primary mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-mystical text-primary mb-2">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange('dateOfBirth')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-mystical text-primary mb-2">
                  Time of Birth
                </label>
                <Input
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={handleChange('timeOfBirth')}
                  placeholder="Optional but recommended"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional - for more accurate readings
                </p>
              </div>

              <div>
                <label className="block text-sm font-mystical text-primary mb-2">
                  Place of Birth
                </label>
                <Input
                  type="text"
                  placeholder="City, Country"
                  value={formData.placeOfBirth}
                  onChange={handleChange('placeOfBirth')}
                  required
                />
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up stagger-2 opacity-0">
            <Button
              type="submit"
              variant="mystical"
              size="xl"
              className="w-full"
              disabled={!isValid}
            >
              ✨ Reveal My Destiny ✨
            </Button>
          </div>
        </form>

        <p className="text-center text-muted-foreground text-sm mt-6 animate-fade-in-up stagger-3 opacity-0">
          Your cosmic journey awaits beyond the veil
        </p>
      </div>
    </div>
  );
};
