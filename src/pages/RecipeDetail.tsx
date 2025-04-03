import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Star, Heart, Bookmark, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRecipeById, getRecommendedRecipes } from '@/data/mockRecipes';
import RecipeCard from '@/components/recipes/RecipeCard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const recipe = getRecipeById(id || '');
  const similarRecipes = getRecommendedRecipes().slice(0, 3);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!recipe) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-medium mb-4">Recipe not found</h2>
          <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Back to Recipes</Button>
        </div>
      </Layout>
    );
  }

  const handleFavorite = () => {
    if (!user) return navigate('/auth');
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: `${recipe.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
      duration: 3000,
    });
  };

  const handleSave = () => {
    if (!user) return navigate('/auth');
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? 'Removed from saved recipes' : 'Saved for later',
      description: `${recipe.name} has been ${isSaved ? 'removed from' : 'added to'} your saved recipes.`,
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
            <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.tags.map((tag, i) => (
                  <span key={i} className="badge bg-accent/20 text-accent-foreground">{tag}</span>
                ))}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">{recipe.name}</h1>
              <p className="text-muted-foreground">{recipe.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-cuisine-yellow fill-cuisine-yellow" />
                <span className="ml-1 font-medium">{recipe.rating}</span>
                <span className="ml-1 text-muted-foreground">({recipe.reviews})</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <span className="block text-sm font-medium">{recipe.prepTime + recipe.cookTime} min</span>
                <span className="text-xs text-muted-foreground">Total Time</span>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <ChefHat className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <span className="block text-sm font-medium capitalize">{recipe.difficulty}</span>
                <span className="text-xs text-muted-foreground">Difficulty</span>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <span className="block text-sm font-medium">{recipe.servings}</span>
                <span className="text-xs text-muted-foreground">Servings</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={handleFavorite} variant={isFavorite ? "default" : "outline"} className="flex items-center gap-2">
                <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? 'Favorited' : 'Add to favorites'}
              </Button>
              <Button onClick={handleSave} variant={isSaved ? "default" : "outline"} className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
                {isSaved ? 'Saved' : 'Save for later'}
              </Button>
            </div>

            <div className="bg-accent/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">Nutrition (per serving)</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center"><span className="block text-sm font-medium">{recipe.calories}</span><span className="text-xs text-muted-foreground">Calories</span></div>
                <div className="text-center"><span className="block text-sm font-medium">{recipe.protein}g</span><span className="text-xs text-muted-foreground">Protein</span></div>
                <div className="text-center"><span className="block text-sm font-medium">{recipe.carbs}g</span><span className="text-xs text-muted-foreground">Carbs</span></div>
                <div className="text-center"><span className="block text-sm font-medium">{recipe.fat}g</span><span className="text-xs text-muted-foreground">Fat</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ingredients" className="mb-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 h-12 mb-8">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="notes">Notes & Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl font-semibold mb-6">Ingredients</h2>
              {recipe.ingredients.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Ingredients will be available soon.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="instructions">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl font-semibold mb-6">Instructions</h2>
              {recipe.instructions.length > 0 ? (
                <ol className="space-y-6 list-none pl-0">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                        <span className="text-primary font-medium">{i + 1}</span>
                      </div>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground">Step-by-step instructions will be provided soon.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl font-semibold mb-6">Notes & Tips</h2>
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <div><h3 className="font-medium mb-1">Storage Instructions</h3><p className="text-muted-foreground">Store leftovers in an airtight container in the refrigerator for up to 3 days.</p></div>
                <div><h3 className="font-medium mb-1">Make Ahead</h3><p className="text-muted-foreground">The sauce can be made up to 2 days ahead and stored in the refrigerator.</p></div>
                <div><h3 className="font-medium mb-1">Chef's Tip</h3><p className="text-muted-foreground">For extra flavor, add a splash of white wine to the sauce while it simmers.</p></div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar Recipes */}
        <div className="mb-12">
          <h2 className="section-header mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetail;
