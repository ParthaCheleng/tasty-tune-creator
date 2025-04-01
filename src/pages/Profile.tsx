
import { useState } from 'react';
import { Save, Heart, Clock, BookOpen, Settings } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import RecipeCard from '@/components/recipes/RecipeCard';
import { mockRecipes } from '@/data/mockRecipes';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { preferences, updatePreferences, resetPreferences } = useUserPreferences();
  const { toast } = useToast();
  
  const [name, setName] = useState(preferences.name);
  const [email, setEmail] = useState(preferences.email);
  
  // In a real app, these would come from user data
  const savedRecipes = mockRecipes.slice(0, 2);
  const favoriteRecipes = mockRecipes.slice(2, 4);
  const recentlyViewed = mockRecipes.slice(4, 6);
  
  const handleSaveProfile = () => {
    updatePreferences({ name, email });
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
      duration: 3000,
    });
  };
  
  const handleResetPreferences = () => {
    if (window.confirm('Are you sure you want to reset all your preferences? This cannot be undone.')) {
      resetPreferences();
      toast({
        title: "Preferences reset",
        description: "All your preferences have been reset to default.",
        duration: 3000,
      });
    }
  };
  
  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-12">
            <Avatar className="h-24 w-24 border-2 border-muted">
              <AvatarFallback className="text-4xl">
                {preferences.name ? preferences.name.charAt(0).toUpperCase() : '?'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-serif font-bold mb-1">
                {preferences.name || 'Welcome!'}
              </h1>
              <p className="text-muted-foreground mb-4">
                {preferences.email || 'Set up your profile to get personalized recommendations'}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <a href="/preferences">
                    <Settings className="h-4 w-4" />
                    Preferences
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-12">
            <Tabs defaultValue="recipes">
              <TabsList className="w-full grid grid-cols-3 h-12 max-w-md">
                <TabsTrigger value="recipes">My Recipes</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recipes" className="space-y-8 mt-6">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium flex items-center gap-2">
                      <Heart className="h-5 w-5 text-destructive" />
                      Favorites
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteRecipes.length > 0 ? (
                      favoriteRecipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))
                    ) : (
                      <p className="text-muted-foreground col-span-2">You haven't added any favorite recipes yet.</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Saved Recipes
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedRecipes.length > 0 ? (
                      savedRecipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))
                    ) : (
                      <p className="text-muted-foreground col-span-2">You haven't saved any recipes yet.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-8 mt-6">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      Recently Viewed
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentlyViewed.length > 0 ? (
                      recentlyViewed.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))
                    ) : (
                      <p className="text-muted-foreground col-span-2">You haven't viewed any recipes yet.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="account" className="space-y-8 mt-6">
                <div className="space-y-6 max-w-md">
                  <h2 className="text-xl font-medium">Profile Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="input-label">Full Name</label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
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
                      />
                    </div>
                    
                    <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Profile
                    </Button>
                  </div>
                  
                  <div className="pt-8 border-t">
                    <h3 className="font-medium mb-4">Danger Zone</h3>
                    <Button 
                      variant="destructive" 
                      onClick={handleResetPreferences}
                    >
                      Reset All Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
