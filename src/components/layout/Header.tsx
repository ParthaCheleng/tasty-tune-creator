
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, Home, Book, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { preferences } = useUserPreferences();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link to="/preferences" className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Preferences</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-primary font-serif font-bold text-xl md:text-2xl">TastyTune</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex relative w-1/3">
          <Input
            type="search"
            placeholder="Search recipes, ingredients..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden md:flex gap-6 mr-2">
            <Link 
              to="/" 
              className={`text-sm font-medium ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/profile" 
              className={`text-sm font-medium ${location.pathname === '/profile' ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              Profile
            </Link>
            <Link 
              to="/preferences" 
              className={`text-sm font-medium ${location.pathname === '/preferences' ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
            >
              Preferences
            </Link>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              {preferences.name ? (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {preferences.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User className="h-5 w-5" />
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
