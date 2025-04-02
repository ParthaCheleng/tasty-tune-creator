import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isPreferencesLoading } = useUserPreferences();
  const { isLoading: isAuthLoading } = useAuth();

  const isLoading = isAuthLoading || isPreferencesLoading;

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
