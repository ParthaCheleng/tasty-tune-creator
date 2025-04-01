
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import OnboardingWelcome from './OnboardingWelcome';
import OnboardingDietaryPreferences from './OnboardingDietaryPreferences';
import OnboardingCuisines from './OnboardingCuisines';
import OnboardingComplete from './OnboardingComplete';

const OnboardingModal = () => {
  const { preferences, updatePreferences } = useUserPreferences();
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(!preferences.onboardingComplete);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      updatePreferences({ onboardingComplete: true });
      setOpen(false);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0">
        {step === 1 && <OnboardingWelcome onNext={handleNextStep} />}
        {step === 2 && <OnboardingDietaryPreferences onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 3 && <OnboardingCuisines onNext={handleNextStep} onBack={handlePreviousStep} />}
        {step === 4 && <OnboardingComplete onDone={handleNextStep} />}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
