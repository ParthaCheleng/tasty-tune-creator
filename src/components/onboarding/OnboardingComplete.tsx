
import { Button } from '@/components/ui/button';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { CheckCircle2 } from 'lucide-react';

interface OnboardingCompleteProps {
  onDone: () => void;
}

const OnboardingComplete = ({ onDone }: OnboardingCompleteProps) => {
  const { preferences } = useUserPreferences();
  
  return (
    <div className="p-6 space-y-6 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="h-16 w-16 text-secondary" />
      </div>
      
      <h2 className="font-serif text-2xl font-semibold">You're all set, {preferences.name}!</h2>
      
      <p className="text-muted-foreground">
        We've used your preferences to personalize your recipe recommendations.
        Get ready to discover delicious meals tailored just for you.
      </p>
      
      <div className="pt-6">
        <Button onClick={onDone} className="w-full">
          Start exploring recipes
        </Button>
      </div>
    </div>
  );
};

export default OnboardingComplete;
