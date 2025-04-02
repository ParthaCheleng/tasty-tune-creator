import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { ChefHat } from 'lucide-react';

interface OnboardingWelcomeProps {
  onNext: () => void;
}

const OnboardingWelcome = ({ onNext }: OnboardingWelcomeProps) => {
  const { preferences, updatePreferences, isPreferencesLoading } = useUserPreferences();
  const [name, setName] = useState(preferences.name);
  const [email, setEmail] = useState(preferences.email);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preferences.onboardingComplete) {
      setSubmitted(true);
    }
  }, [preferences]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePreferences({ name, email });
    onNext();
    setSubmitted(true);
  };

  if (isPreferencesLoading || submitted || preferences.onboardingComplete) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2 text-center justify-center mb-6">
        <ChefHat className="h-6 w-6 text-primary" />
        <h2 className="font-serif text-2xl font-semibold">Welcome to TastyTune</h2>
      </div>

      <p className="text-center text-muted-foreground">
        Let’s personalize your experience with your name and email.
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
          <label htmlFor="email" className="input-label">Your Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
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
