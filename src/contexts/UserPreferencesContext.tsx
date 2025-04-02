import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

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
  updatePreferences: (prefs: Partial<UserPreferencesState>) => void;
  resetPreferences: () => void;
  isPreferencesLoading: boolean;
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
  const [preferences, setPreferences] = useState<UserPreferencesState>(defaultPreferences);
  const [isPreferencesLoading, setIsPreferencesLoading] = useState(true);
  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (!user) {
        setPreferences(defaultPreferences);
        setIsPreferencesLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('🔴 Error fetching user preferences:', error.message);
      }

      if (data) {
        setPreferences({
          name: data.name || '',
          email: user.email || '',
          favoriteCuisines: data.favorite_cuisines || [],
          dietaryRestrictions: data.dietary_restrictions || ['None'],
          mealPreferences: data.meal_preferences || [],
          cookingSkill: data.cooking_skill || 'Beginner',
          maxPrepTime: data.max_prep_time || 30,
          pantryItems: data.pantry_items || [],
          excludedIngredients: data.excluded_ingredients || [],
          onboardingComplete: data.onboarding_complete || false,
        });
      }

      setIsPreferencesLoading(false);
    };

    // Wait until auth finishes before fetching preferences
    if (!isAuthLoading) {
      fetchUserPreferences();
    }
  }, [user, isAuthLoading]);

  const updatePreferences = async (updatedFields: Partial<UserPreferencesState>) => {
    const updated = { ...preferences, ...updatedFields };
    setPreferences(updated);

    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        name: updated.name,
        favorite_cuisines: updated.favoriteCuisines,
        dietary_restrictions: updated.dietaryRestrictions,
        meal_preferences: updated.mealPreferences,
        cooking_skill: updated.cookingSkill,
        max_prep_time: updated.maxPrepTime,
        pantry_items: updated.pantryItems,
        excluded_ingredients: updated.excludedIngredients,
        onboarding_complete: updated.onboardingComplete,
      });

    if (error) {
      console.error('🔴 Failed to update preferences in Supabase:', error.message);
    }
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <UserPreferencesContext.Provider
      value={{ preferences, updatePreferences, resetPreferences, isPreferencesLoading }}
    >
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
