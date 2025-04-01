import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { preferences } = useUserPreferences();
  const location = useLocation();

  return (
    <header className="w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold font-sans text-white tracking-wide">
          tasty<span className="text-orange-400">Tune</span>
        </Link>

        {/* Right: Nav */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {/* Dropdown Menu Placeholder */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-1">
              <span className="hover:text-orange-300">Explore</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="absolute top-7 left-0 w-40 bg-white text-black shadow-md rounded-md p-2 opacity-0 group-hover:opacity-100 transition duration-200 z-50">
              <Link to="/" className="block px-2 py-1 hover:bg-gray-100 rounded">Home</Link>
              <Link to="/profile" className="block px-2 py-1 hover:bg-gray-100 rounded">Profile</Link>
              <Link to="/preferences" className="block px-2 py-1 hover:bg-gray-100 rounded">Preferences</Link>
            </div>
          </div>

          {/* Auth Links */}
          {!user ? (
            <Link
              to="/auth"
              className={`hover:text-orange-300 ${location.pathname === '/auth' ? 'text-orange-400' : ''}`}
            >
              Log In
            </Link>
          ) : (
            <>
              <button
                onClick={signOut}
                className="hover:text-orange-300 flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
              <Link to="/profile">
                <div className="bg-orange-500 text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold">
                  {preferences.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                </div>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
