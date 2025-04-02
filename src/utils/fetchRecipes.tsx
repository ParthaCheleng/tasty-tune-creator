export const fetchRecipes = async ({
    ingredients,
    diet,
    cuisine,
    maxReadyTime,
  }: {
    ingredients?: string[];
    diet?: string;
    cuisine?: string;
    maxReadyTime?: number;
  }) => {
    const params = new URLSearchParams({
      apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
      number: '10',
      ...(ingredients && { includeIngredients: ingredients.join(',') }),
      ...(diet && { diet }),
      ...(cuisine && { cuisine }),
      ...(maxReadyTime && { maxReadyTime: maxReadyTime.toString() }),
    });
  
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params}`);
    const data = await res.json();
    return data.results;
  };
  