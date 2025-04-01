
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Cuisine = 'Italian' | 'Mexican' | 'Asian' | 'American' | 'Mediterranean' | 'Indian' | 'French' | 'Other';
export type DietaryRestriction = 'None' | 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Keto' | 'Paleo';
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
export type CookingSkill = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserPreferencesState {
  name: string;
  email: string;
  favoriteCuisines: Cuisine[];
  dietaryRestrictions: DietaryRestriction[];
  mealPreferences: MealType[];
  cookingSkill: CookingSkill;
  maxPrepTime: number;
  pantryItems: string[];
  excludedIngredients: string[];
  onboardingComplete: boolean;
}

interface UserPreferencesContextType {
  preferences: UserPreferencesState;
  updatePreferences: (newPrefs: Partial<UserPreferencesState>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferencesState = {
  name: '',
  email: '',
  favoriteCuisines: [],
  dietaryRestrictions: ['None'],
  mealPreferences: [],
  cookingSkill: 'Beginner',
  maxPrepTime: 30,
  pantryItems: [],
  excludedIngredients: [],
  onboardingComplete: false,
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferencesState>(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    return savedPrefs ? JSON.parse(savedPrefs) : defaultPreferences;
  });

  const updatePreferences = (newPrefs: Partial<UserPreferencesState>) => {
    const updatedPrefs = { ...preferences, ...newPrefs };
    setPreferences(updatedPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('userPreferences');
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
