
import { useState } from 'react';
import { Save } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useUserPreferences, DietaryRestriction, Cuisine, MealType, CookingSkill } from '@/contexts/UserPreferencesContext';
import { useToast } from '@/hooks/use-toast';

const Preferences = () => {
  const { preferences, updatePreferences } = useUserPreferences();
  const { toast } = useToast();
  const [localPreferences, setLocalPreferences] = useState({ ...preferences });
  
  const dietaryOptions: DietaryRestriction[] = [
    'None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'
  ];
  
  const cuisineOptions: Cuisine[] = [
    'Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'French', 'Other'
  ];
  
  const mealTypeOptions: MealType[] = [
    'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'
  ];
  
  const cookingSkills: CookingSkill[] = ['Beginner', 'Intermediate', 'Advanced'];
  
  const handleDietaryChange = (diet: DietaryRestriction, checked: boolean) => {
    let newDiets: DietaryRestriction[];
    
    if (diet === 'None' && checked) {
      // If selecting "None", remove all other options
      newDiets = ['None'];
    } else if (checked) {
      // If selecting any other option, ensure "None" is removed
      newDiets = [...localPreferences.dietaryRestrictions.filter(d => d !== 'None'), diet];
    } else {
      // If unchecking an option, just remove it
      newDiets = localPreferences.dietaryRestrictions.filter(d => d !== diet);
    }
    
    setLocalPreferences({
      ...localPreferences,
      dietaryRestrictions: newDiets
    });
  };
  
  const handleCuisineChange = (cuisine: Cuisine, checked: boolean) => {
    const newCuisines = checked
      ? [...localPreferences.favoriteCuisines, cuisine]
      : localPreferences.favoriteCuisines.filter(c => c !== cuisine);
    
    setLocalPreferences({
      ...localPreferences,
      favoriteCuisines: newCuisines
    });
  };
  
  const handleMealTypeChange = (mealType: MealType, checked: boolean) => {
    const newMealTypes = checked
      ? [...localPreferences.mealPreferences, mealType]
      : localPreferences.mealPreferences.filter(m => m !== mealType);
    
    setLocalPreferences({
      ...localPreferences,
      mealPreferences: newMealTypes
    });
  };
  
  const handleCookingSkillChange = (value: string) => {
    setLocalPreferences({
      ...localPreferences,
      cookingSkill: value as CookingSkill
    });
  };
  
  const handlePrepTimeChange = (value: number[]) => {
    setLocalPreferences({
      ...localPreferences,
      maxPrepTime: value[0]
    });
  };
  
  const handleAddPantryItem = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).pantryItem as HTMLInputElement;
    const value = input.value.trim();
    
    if (value && !localPreferences.pantryItems.includes(value)) {
      setLocalPreferences({
        ...localPreferences,
        pantryItems: [...localPreferences.pantryItems, value]
      });
    }
    
    input.value = '';
  };
  
  const handleRemovePantryItem = (item: string) => {
    setLocalPreferences({
      ...localPreferences,
      pantryItems: localPreferences.pantryItems.filter(i => i !== item)
    });
  };
  
  const handleAddExcludedIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).excludedIngredient as HTMLInputElement;
    const value = input.value.trim();
    
    if (value && !localPreferences.excludedIngredients.includes(value)) {
      setLocalPreferences({
        ...localPreferences,
        excludedIngredients: [...localPreferences.excludedIngredients, value]
      });
    }
    
    input.value = '';
  };
  
  const handleRemoveExcludedIngredient = (item: string) => {
    setLocalPreferences({
      ...localPreferences,
      excludedIngredients: localPreferences.excludedIngredients.filter(i => i !== item)
    });
  };
  
  const handleSavePreferences = () => {
    updatePreferences(localPreferences);
    toast({
      title: "Preferences updated",
      description: "Your preferences have been saved successfully.",
      duration: 3000,
    });
  };
  
  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-serif font-bold mb-8">Preferences</h1>
        
        <Tabs defaultValue="dietary" className="space-y-8">
          <TabsList className="w-full max-w-2xl grid grid-cols-3 h-12">
            <TabsTrigger value="dietary">Dietary</TabsTrigger>
            <TabsTrigger value="cuisines">Cuisines & Meals</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dietary" className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Dietary Restrictions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dietaryOptions.map((diet) => (
                  <div key={diet} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`diet-${diet}`}
                      checked={localPreferences.dietaryRestrictions.includes(diet)}
                      onCheckedChange={(checked) => handleDietaryChange(diet, checked as boolean)}
                    />
                    <label 
                      htmlFor={`diet-${diet}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {diet}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Cooking Preferences</h2>
              <div>
                <h3 className="input-label">Cooking Skill Level</h3>
                <RadioGroup 
                  value={localPreferences.cookingSkill} 
                  onValueChange={handleCookingSkillChange}
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                >
                  {cookingSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <RadioGroupItem value={skill} id={`skill-${skill}`} />
                      <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="input-label">Maximum Prep Time</h3>
                  <span className="text-sm font-medium">{localPreferences.maxPrepTime} minutes</span>
                </div>
                <Slider
                  value={[localPreferences.maxPrepTime]}
                  min={10}
                  max={120}
                  step={5}
                  onValueChange={handlePrepTimeChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cuisines" className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Favorite Cuisines</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cuisineOptions.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cuisine-${cuisine}`}
                      checked={localPreferences.favoriteCuisines.includes(cuisine)}
                      onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                    />
                    <label 
                      htmlFor={`cuisine-${cuisine}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cuisine}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Meal Type Preferences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mealTypeOptions.map((mealType) => (
                  <div key={mealType} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`meal-${mealType}`}
                      checked={localPreferences.mealPreferences.includes(mealType)}
                      onCheckedChange={(checked) => handleMealTypeChange(mealType, checked as boolean)}
                    />
                    <label 
                      htmlFor={`meal-${mealType}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {mealType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ingredients" className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Pantry Items</h2>
              <p className="text-muted-foreground">Add ingredients you usually have on hand so we can recommend recipes that use them.</p>
              
              <form onSubmit={handleAddPantryItem} className="flex gap-2">
                <Input 
                  name="pantryItem"
                  placeholder="Add pantry item (e.g., olive oil, rice)"
                  className="flex-1"
                />
                <Button type="submit">Add</Button>
              </form>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {localPreferences.pantryItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary/20 rounded-full px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    <span>{item}</span>
                    <button 
                      type="button" 
                      className="rounded-full h-4 w-4 bg-muted flex items-center justify-center hover:bg-muted-foreground/20" 
                      onClick={() => handleRemovePantryItem(item)}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden className="text-xs">&times;</span>
                    </button>
                  </div>
                ))}
                {localPreferences.pantryItems.length === 0 && (
                  <p className="text-muted-foreground text-sm italic">No pantry items added yet</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Excluded Ingredients</h2>
              <p className="text-muted-foreground">Add ingredients you want to avoid in your recipe recommendations.</p>
              
              <form onSubmit={handleAddExcludedIngredient} className="flex gap-2">
                <Input 
                  name="excludedIngredient"
                  placeholder="Add ingredient to exclude (e.g., nuts, shellfish)"
                  className="flex-1"
                />
                <Button type="submit">Add</Button>
              </form>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {localPreferences.excludedIngredients.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-destructive/20 rounded-full px-3 py-1.5 text-sm flex items-center gap-2"
                  >
                    <span>{item}</span>
                    <button 
                      type="button" 
                      className="rounded-full h-4 w-4 bg-muted flex items-center justify-center hover:bg-muted-foreground/20" 
                      onClick={() => handleRemoveExcludedIngredient(item)}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden className="text-xs">&times;</span>
                    </button>
                  </div>
                ))}
                {localPreferences.excludedIngredients.length === 0 && (
                  <p className="text-muted-foreground text-sm italic">No excluded ingredients added yet</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 border-t pt-6">
          <Button onClick={handleSavePreferences} size="lg" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Preferences
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Preferences;
