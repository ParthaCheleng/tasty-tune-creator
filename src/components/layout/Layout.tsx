
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import OnboardingModal from '../onboarding/OnboardingModal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { preferences } = useUserPreferences();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {!preferences.onboardingComplete && <OnboardingModal />}
    </div>
  );
};

export default Layout;
