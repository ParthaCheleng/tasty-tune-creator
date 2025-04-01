import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters, { FilterOptions } from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import { mockRecipes, getRecommendedRecipes, getPopularRecipes, getQuickRecipes } from '@/data/mockRecipes';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { preferences } = useUserPreferences();
  const { user } = useAuth();
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    dietaryRestrictions: [],
    cuisines: [],
    maxTime: 60,
    mealType: null,
  });
  
  const recommendedRecipes = getRecommendedRecipes();
  const popularRecipes = getPopularRecipes().slice(0, 4);
  const quickRecipes = getQuickRecipes().slice(0, 4);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF9ED] to-[#FEE7CB] py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Discover recipes tailored to <span className="text-primary">your taste</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Find recipes that match your dietary preferences, available ingredients, and cooking style.
              </p>
              <div className="flex flex-wrap gap-3">
                {user ? (
                  <Button size="lg" asChild>
                    <Link to="/profile">
                      {preferences.onboardingComplete ? 'Browse Recipes' : 'Get Started'}
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <Link to="/auth">Sign In to Start</Link>
                  </Button>
                )}
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Delicious meal" 
                className="rounded-xl shadow-lg object-cover w-full aspect-[4/3]"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-lg p-3 shadow-lg hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">AI</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Personalized Recommendations</p>
                    <p className="text-xs text-muted-foreground">Based on your preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-10">
        <div className="container">
          <RecipeFilters onFilterChange={handleFilterChange} />
        </div>
      </section>
      
      {/* Recommended Recipes */}
      <section className="py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-header">Recommended for You</h2>
            <Button variant="ghost" className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Recipes */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-header">Most Popular</h2>
            <Button variant="ghost" className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} size="sm" />
            ))}
          </div>
        </div>
      </section>
      
      {/* Quick Meals */}
      <section className="py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-header">Ready in 30 Minutes</h2>
            <Button variant="ghost" className="flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickRecipes.slice(0, 2).map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-[#F2FCE2] to-[#E5DEFF]">
        <div className="container">
          <h2 className="section-header text-center mb-12">How TastyTune Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-2xl">1</span>
              </div>
              <h3 className="font-medium text-xl mb-2">Set Your Preferences</h3>
              <p className="text-muted-foreground">Tell us about your dietary needs, favorite cuisines, and available ingredients.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-2xl">2</span>
              </div>
              <h3 className="font-medium text-xl mb-2">Get Recommendations</h3>
              <p className="text-muted-foreground">Our AI analyzes your preferences and suggests recipes that match your needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-2xl">3</span>
              </div>
              <h3 className="font-medium text-xl mb-2">Cook & Rate</h3>
              <p className="text-muted-foreground">Try the recipes and rate them to get even better recommendations next time.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
