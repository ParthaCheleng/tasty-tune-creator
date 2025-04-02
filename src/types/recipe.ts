export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  cuisine: string;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: Ingredient[];
  instructions: string[];
  createdAt: string;
  rating: number;
  reviews: number;

  // ✅ Added for compatibility with Spoonacular & quick meal filtering
  readyInMinutes?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  substitutes?: string[];
}
