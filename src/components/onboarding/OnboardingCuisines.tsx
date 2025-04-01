
import { Button } from '@/components/ui/button';
import { useUserPreferences, Cuisine, MealType } from '@/contexts/UserPreferencesContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Tag } from 'lucide-react';

interface OnboardingCuisinesProps {
  onNext: () => void;
  onBack: () => void;
}

const OnboardingCuisines = ({ onNext, onBack }: OnboardingCuisinesProps) => {
  const { preferences, updatePreferences } = useUserPreferences();
  
  const cuisineOptions: Cuisine[] = [
    'Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'French', 'Other'
  ];
  
  const mealTypeOptions: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  
  const handleCuisineChange = (cuisine: Cuisine, checked: boolean) => {
    const newCuisines = checked
      ? [...preferences.favoriteCuisines, cuisine]
      : preferences.favoriteCuisines.filter(c => c !== cuisine);
    
    updatePreferences({ favoriteCuisines: newCuisines });
  };
  
  const handleMealTypeChange = (mealType: MealType, checked: boolean) => {
    const newMealTypes = checked
      ? [...preferences.mealPreferences, mealType]
      : preferences.mealPreferences.filter(m => m !== mealType);
    
    updatePreferences({ mealPreferences: newMealTypes });
  };
  
  return (
    <div className="p-6 space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-center mb-6">Food Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="input-label flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            Favorite Cuisines
          </h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {cuisineOptions.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cuisine-${cuisine}`}
                  checked={preferences.favoriteCuisines.includes(cuisine)}
                  onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                />
                <label 
                  htmlFor={`cuisine-${cuisine}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {cuisine}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="input-label flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            Meal Types
          </h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {mealTypeOptions.map((mealType) => (
              <div key={mealType} className="flex items-center space-x-2">
                <Checkbox 
                  id={`meal-${mealType}`}
                  checked={preferences.mealPreferences.includes(mealType)}
                  onCheckedChange={(checked) => handleMealTypeChange(mealType, checked as boolean)}
                />
                <label 
                  htmlFor={`meal-${mealType}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {mealType}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCuisines;
