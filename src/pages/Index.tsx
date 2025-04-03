import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters, { FilterOptions } from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { useAuth } from '@/contexts/AuthContext';
import { fetchRecipes } from '@/utils/fetchRecipes';
import { mockRecipes } from '@/data/mockRecipes';

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

  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [quickRecipes, setQuickRecipes] = useState<any[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const loadRecipes = async () => {
    setLoadingRecipes(true);
    try {
      if (user) {
        const recommended = await fetchRecipes({
          ingredients: preferences.pantryItems,
          diet: preferences.dietaryRestrictions.includes('None') ? undefined : preferences.dietaryRestrictions[0],
          cuisine: preferences.favoriteCuisines[0],
          maxReadyTime: preferences.maxPrepTime,
        });

        const quick = await fetchRecipes({
          maxReadyTime: 30,
        });

        setRecommendedRecipes(recommended || []);
        setQuickRecipes(quick || []);
      } else {
        const shuffled = [...mockRecipes].sort(() => 0.5 - Math.random());
        setRecommendedRecipes(shuffled.slice(0, 4));
        setQuickRecipes(shuffled.filter((r) => (r.prepTime + r.cookTime) <= 30).slice(0, 4));
      }
    } catch (error) {
      console.error('❌ Failed to fetch recipes:', error);
    } finally {
      setLoadingRecipes(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [user, preferences]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const renderPrimaryCTA = () => {
    if (!user) {
      return (
        <Button size="lg" asChild>
          <Link to="/auth">Sign In to Start</Link>
        </Button>
      );
    }

    return (
      <Button size="lg" asChild>
        <Link to="/profile">Browse Recipes</Link>
      </Button>
    );
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
                {renderPrimaryCTA()}
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
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

      {/* Filters */}
      {user && (
        <section className="py-10">
          <div className="container">
            <RecipeFilters onFilterChange={handleFilterChange} />
          </div>
        </section>
      )}

      {/* Recommended / Popular Recipes */}
      <section className="py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-header">
              {user ? 'Recommended for You' : 'Explore Popular Dishes'}
            </h2>
            <Button variant="ghost" className="flex items-center gap-1" asChild>
              <Link to="/recipes">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {loadingRecipes ? (
            <p>Loading recipes...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedRecipes.length > 0 ? (
                recommendedRecipes.map((recipe: any) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))
              ) : (
                <p className="text-muted-foreground">No recipes found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Quick Meals */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-header">Ready in 30 Minutes</h2>
            <Button variant="ghost" className="flex items-center gap-1" asChild>
              <Link to="/quick">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {loadingRecipes ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickRecipes.length > 0 ? (
                quickRecipes.map((recipe: any) => (
                  <RecipeCard key={recipe.id} recipe={recipe} size="sm" />
                ))
              ) : (
                <p className="text-muted-foreground">No quick recipes found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-[#F2FCE2] to-[#E5DEFF]">
        <div className="container">
          <h2 className="section-header text-center mb-12">How TastyTune Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Set Your Preferences',
                desc: 'Tell us about your dietary needs, favorite cuisines, and available ingredients.',
              },
              {
                title: 'Get Recommendations',
                desc: 'Our AI analyzes your preferences and suggests recipes that match your needs.',
              },
              {
                title: 'Cook & Rate',
                desc: 'Try the recipes and rate them to get even better recommendations next time.',
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-2xl">{index + 1}</span>
                </div>
                <h3 className="font-medium text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
