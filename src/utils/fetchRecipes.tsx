import { Recipe } from "@/types/recipe";

export const fetchRecipes = async ({
  ingredients,
  diet,
  cuisine,
  maxReadyTime,
  number = 10,
  offset = 0,
  sort = 'popularity',
}: any): Promise<Recipe[]> => {
  const params = new URLSearchParams();

  if (ingredients?.length) params.append("includeIngredients", ingredients.join(","));
  if (diet) params.append("diet", diet);
  if (cuisine) params.append("cuisine", cuisine);
  if (maxReadyTime) params.append("maxReadyTime", String(maxReadyTime));
  if (number) params.append("number", String(number));
  if (offset) params.append("offset", String(offset));
  if (sort) params.append("sort", sort);

  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}&addRecipeInformation=true&apiKey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  return data.results.map((r: any) => ({
    id: r.id,
    name: r.title,
    description: r.summary || '',
    image: r.image,
    prepTime: r.readyInMinutes || 0,
    cookTime: 0, // You may compute separately if available
    servings: r.servings || 2,
    difficulty: 'easy', // Can be estimated later based on time or steps
    tags: r.dishTypes || [],
    cuisine: r.cuisines[0] || '',
    mealType: r.dishTypes?.[0] || '',
    calories: r.nutrition?.nutrients?.find((n: any) => n.name === "Calories")?.amount || 0,
    protein: r.nutrition?.nutrients?.find((n: any) => n.name === "Protein")?.amount || 0,
    carbs: r.nutrition?.nutrients?.find((n: any) => n.name === "Carbohydrates")?.amount || 0,
    fat: r.nutrition?.nutrients?.find((n: any) => n.name === "Fat")?.amount || 0,
    ingredients: [],
    instructions: [],
    createdAt: new Date().toISOString(),
    rating: (r.spoonacularScore || 80) / 20, // Normalize to 0–5 scale
    reviews: r.aggregateLikes || 0,
  }));
};
