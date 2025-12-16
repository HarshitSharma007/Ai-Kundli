export interface UserBirthData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Question {
  id: string;
  text: string;
  categoryId: string;
}

export interface Answer {
  text: string;
  followUpQuestions: Question[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'career',
    name: 'Career',
    icon: '💼',
    description: 'Discover your professional destiny',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🌿',
    description: 'Insights into your wellness journey',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'relationships',
    name: 'Relationships',
    icon: '💕',
    description: 'Love and connection revelations',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'wealth',
    name: 'Wealth',
    icon: '💎',
    description: 'Financial fortune awaits',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'lifeline',
    name: 'Life Path',
    icon: '🌟',
    description: 'Your spiritual journey unfolds',
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 'lucky',
    name: 'Lucky Elements',
    icon: '🍀',
    description: 'Colors, days & auspicious times',
    color: 'from-cyan-500 to-blue-600',
  },
];

export const CATEGORY_QUESTIONS: Record<string, Question[]> = {
  career: [
    { id: 'c1', text: 'What career path aligns with my stars?', categoryId: 'career' },
    { id: 'c2', text: 'When is the best time for a career change?', categoryId: 'career' },
    { id: 'c3', text: 'What obstacles might I face in my career?', categoryId: 'career' },
    { id: 'c4', text: 'How can I achieve professional success?', categoryId: 'career' },
    { id: 'c5', text: 'What is my hidden talent for work?', categoryId: 'career' },
  ],
  health: [
    { id: 'h1', text: 'What areas of health should I focus on?', categoryId: 'health' },
    { id: 'h2', text: 'What wellness practices suit my sign?', categoryId: 'health' },
    { id: 'h3', text: 'How can I improve my mental wellbeing?', categoryId: 'health' },
    { id: 'h4', text: 'What diet aligns with my cosmic energy?', categoryId: 'health' },
    { id: 'h5', text: 'When should I be cautious about health?', categoryId: 'health' },
  ],
  relationships: [
    { id: 'r1', text: 'What is my love destiny?', categoryId: 'relationships' },
    { id: 'r2', text: 'Which signs am I most compatible with?', categoryId: 'relationships' },
    { id: 'r3', text: 'How can I strengthen my relationships?', categoryId: 'relationships' },
    { id: 'r4', text: 'What challenges await in my love life?', categoryId: 'relationships' },
    { id: 'r5', text: 'When will I find true love?', categoryId: 'relationships' },
  ],
  wealth: [
    { id: 'w1', text: 'What is my financial destiny?', categoryId: 'wealth' },
    { id: 'w2', text: 'When are auspicious times for investments?', categoryId: 'wealth' },
    { id: 'w3', text: 'How can I attract more abundance?', categoryId: 'wealth' },
    { id: 'w4', text: 'What financial risks should I avoid?', categoryId: 'wealth' },
    { id: 'w5', text: 'Will I achieve financial freedom?', categoryId: 'wealth' },
  ],
  lifeline: [
    { id: 'l1', text: 'What is my life purpose?', categoryId: 'lifeline' },
    { id: 'l2', text: 'What karmic lessons must I learn?', categoryId: 'lifeline' },
    { id: 'l3', text: 'How can I achieve spiritual growth?', categoryId: 'lifeline' },
    { id: 'l4', text: 'What past lives influence me?', categoryId: 'lifeline' },
    { id: 'l5', text: 'What is my soul mission?', categoryId: 'lifeline' },
  ],
  lucky: [
    { id: 'lu1', text: 'What are my lucky colors?', categoryId: 'lucky' },
    { id: 'lu2', text: 'Which days are most fortunate for me?', categoryId: 'lucky' },
    { id: 'lu3', text: 'What times are auspicious for decisions?', categoryId: 'lucky' },
    { id: 'lu4', text: 'What lucky numbers guide my path?', categoryId: 'lucky' },
    { id: 'lu5', text: 'What gemstones enhance my energy?', categoryId: 'lucky' },
  ],
};
