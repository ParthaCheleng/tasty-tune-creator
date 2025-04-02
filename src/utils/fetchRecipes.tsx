export const fetchRecipes = async ({
  ingredients,
  diet,
  cuisine,
  maxReadyTime,
  number = 10,
  offset = 0,
  sort = 'popularity',
}: any): Promise<any[]> => {
  const params = new URLSearchParams();

  if (ingredients?.length) params.append("includeIngredients", ingredients.join(","));
  if (diet) params.append("diet", diet);
  if (cuisine) params.append("cuisine", cuisine);
  if (maxReadyTime) params.append("maxReadyTime", String(maxReadyTime));
  if (number) params.append("number", String(number));
  if (offset) params.append("offset", String(offset));
  if (sort) params.append("sort", sort);
  
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  
  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}&apiKey=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.results || [];
}  
