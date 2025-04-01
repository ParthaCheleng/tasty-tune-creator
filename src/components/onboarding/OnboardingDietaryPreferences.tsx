
import { Button } from '@/components/ui/button';
import { useUserPreferences, DietaryRestriction, CookingSkill } from '@/contexts/UserPreferencesContext';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface OnboardingDietaryPreferencesProps {
  onNext: () => void;
  onBack: () => void;
}

const OnboardingDietaryPreferences = ({ onNext, onBack }: OnboardingDietaryPreferencesProps) => {
  const { preferences, updatePreferences } = useUserPreferences();
  
  const dietaryOptions: DietaryRestriction[] = [
    'None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'
  ];
  
  const cookingSkills: CookingSkill[] = ['Beginner', 'Intermediate', 'Advanced'];
  
  const handleCookingSkillChange = (value: string) => {
    updatePreferences({ cookingSkill: value as CookingSkill });
  };
  
  const handleDietaryChange = (diet: DietaryRestriction, checked: boolean) => {
    let newDiets: DietaryRestriction[];
    
    if (diet === 'None' && checked) {
      // If selecting "None", remove all other options
      newDiets = ['None'];
    } else if (checked) {
      // If selecting any other option, ensure "None" is removed
      newDiets = [...preferences.dietaryRestrictions.filter(d => d !== 'None'), diet];
    } else {
      // If unchecking an option, just remove it
      newDiets = preferences.dietaryRestrictions.filter(d => d !== diet);
    }
    
    updatePreferences({ dietaryRestrictions: newDiets });
  };
  
  const handlePrepTimeChange = (value: number[]) => {
    updatePreferences({ maxPrepTime: value[0] });
  };
  
  return (
    <div className="p-6 space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-center mb-6">Dietary Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="input-label">Dietary Restrictions</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {dietaryOptions.map((diet) => (
              <div key={diet} className="flex items-center space-x-2">
                <Checkbox 
                  id={`diet-${diet}`}
                  checked={preferences.dietaryRestrictions.includes(diet)}
                  onCheckedChange={(checked) => handleDietaryChange(diet, checked as boolean)}
                />
                <label 
                  htmlFor={`diet-${diet}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {diet}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="input-label">Cooking Skill Level</h3>
          <RadioGroup 
            value={preferences.cookingSkill} 
            onValueChange={handleCookingSkillChange}
            className="flex justify-between pt-2"
          >
            {cookingSkills.map(skill => (
              <div key={skill} className="flex items-center space-x-2">
                <RadioGroupItem value={skill} id={`skill-${skill}`} />
                <Label htmlFor={`skill-${skill}`}>{skill}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="input-label">Maximum Prep Time</h3>
            <span className="text-sm font-medium">{preferences.maxPrepTime} minutes</span>
          </div>
          <Slider
            value={[preferences.maxPrepTime]}
            min={10}
            max={120}
            step={5}
            onValueChange={handlePrepTimeChange}
          />
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

export default OnboardingDietaryPreferences;
