
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { ChefHat } from 'lucide-react';

interface OnboardingWelcomeProps {
  onNext: () => void;
}

const OnboardingWelcome = ({ onNext }: OnboardingWelcomeProps) => {
  const { preferences, updatePreferences } = useUserPreferences();
  const [name, setName] = useState(preferences.name);
  const [email, setEmail] = useState(preferences.email);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({ name, email });
    onNext();
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2 text-center justify-center mb-6">
        <ChefHat className="h-6 w-6 text-primary" />
        <h2 className="font-serif text-2xl font-semibold">Welcome to TastyTune</h2>
      </div>
      
      <p className="text-center text-muted-foreground">
        Let's personalize your experience so we can recommend recipes that match your taste.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="input-label">Your Name</label>
          <Input 
            id="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="input-label">Email Address</label>
          <Input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="your@email.com" 
            required 
          />
        </div>
        
        <Button type="submit" className="w-full">
          Let's get started
        </Button>
      </form>
    </div>
  );
};

export default OnboardingWelcome;
