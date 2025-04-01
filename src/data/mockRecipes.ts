
import { Recipe } from '@/types/recipe';

// Mock recipe data
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Creamy Tomato Pasta with Fresh Basil',
    description: 'A rich and creamy tomato pasta topped with fresh basil and parmesan cheese. This comforting dish comes together in just 20 minutes for a quick weeknight dinner.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'easy',
    tags: ['Italian', 'Pasta', 'Vegetarian'],
    cuisine: 'Italian',
    mealType: 'Dinner',
    calories: 450,
    protein: 12,
    carbs: 65,
    fat: 18,
    ingredients: [
      {
        id: '1-1',
        name: 'spaghetti',
        amount: '1 pound',
      },
      {
        id: '1-2',
        name: 'olive oil',
        amount: '2 tablespoons',
      },
      {
        id: '1-3',
        name: 'garlic cloves, minced',
        amount: '3',
      },
      {
        id: '1-4',
        name: 'crushed tomatoes',
        amount: '28 oz can',
      },
      {
        id: '1-5',
        name: 'heavy cream',
        amount: '1/2 cup',
        substitutes: ['coconut cream', 'cashew cream', 'half and half']
      },
      {
        id: '1-6',
        name: 'fresh basil leaves',
        amount: '1/4 cup chopped',
        substitutes: ['dried basil', 'fresh parsley']
      },
      {
        id: '1-7',
        name: 'grated parmesan cheese',
        amount: '1/2 cup',
        substitutes: ['pecorino romano', 'nutritional yeast']
      },
      {
        id: '1-8',
        name: 'salt and pepper',
        amount: 'to taste',
      },
    ],
    instructions: [
      'Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente according to package directions. Reserve 1/2 cup pasta water before draining.',
      'Meanwhile, heat olive oil in a large skillet over medium heat. Add garlic and sauté until fragrant, about 30 seconds.',
      'Add crushed tomatoes, salt, and pepper. Simmer for 5 minutes.',
      'Reduce heat to low and stir in heavy cream. Simmer for another 2-3 minutes.',
      'Add the drained pasta to the sauce along with a splash of pasta water. Toss to combine.',
      'Remove from heat and stir in most of the chopped basil.',
      'Serve topped with grated parmesan cheese and remaining basil.'
    ],
    createdAt: '2023-09-15',
    rating: 4.8,
    reviews: 245,
  },
  {
    id: '2',
    name: 'Avocado & Quinoa Buddha Bowl',
    description: 'A nutrient-packed vegetarian buddha bowl with fluffy quinoa, crisp vegetables, creamy avocado, and a zesty lemon tahini dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'easy',
    tags: ['Vegetarian', 'Healthy', 'Lunch'],
    cuisine: 'Mediterranean',
    mealType: 'Lunch',
    calories: 380,
    protein: 15,
    carbs: 42,
    fat: 22,
    ingredients: [
      {
        id: '2-1',
        name: 'quinoa, rinsed',
        amount: '1 cup',
        substitutes: ['brown rice', 'couscous', 'bulgur wheat']
      },
      {
        id: '2-2',
        name: 'water',
        amount: '2 cups',
      },
      {
        id: '2-3',
        name: 'ripe avocado, sliced',
        amount: '1',
      },
      {
        id: '2-4',
        name: 'cherry tomatoes, halved',
        amount: '1 cup',
      },
      {
        id: '2-5',
        name: 'cucumber, diced',
        amount: '1',
      },
      {
        id: '2-6',
        name: 'red bell pepper, sliced',
        amount: '1',
      },
      {
        id: '2-7',
        name: 'chickpeas, drained and rinsed',
        amount: '1 15oz can',
      },
      {
        id: '2-8',
        name: 'tahini',
        amount: '2 tablespoons',
        substitutes: ['greek yogurt', 'hummus']
      },
      {
        id: '2-9',
        name: 'lemon juice',
        amount: '2 tablespoons',
      },
      {
        id: '2-10',
        name: 'olive oil',
        amount: '1 tablespoon',
      },
      {
        id: '2-11',
        name: 'garlic clove, minced',
        amount: '1',
      },
      {
        id: '2-12',
        name: 'salt and pepper',
        amount: 'to taste',
      },
    ],
    instructions: [
      'Combine quinoa and water in a pot. Bring to a boil, then reduce to a simmer, cover, and cook for 15 minutes or until water is absorbed.',
      'Meanwhile, prepare the vegetables.',
      'For the dressing, whisk together tahini, lemon juice, olive oil, minced garlic, salt, and pepper. Add water as needed to thin to desired consistency.',
      'Assemble bowls by dividing quinoa between two bowls. Arrange vegetables and chickpeas on top.',
      'Drizzle with dressing and serve.'
    ],
    createdAt: '2023-10-02',
    rating: 4.5,
    reviews: 112,
  },
  {
    id: '3',
    name: 'Grilled Honey Garlic Salmon',
    description: 'Juicy salmon fillets glazed with a sweet and savory honey garlic sauce, then grilled to perfection. Pair with roasted vegetables for a healthy, protein-rich meal.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'medium',
    tags: ['Seafood', 'Healthy', 'Gluten-Free'],
    cuisine: 'Asian',
    mealType: 'Dinner',
    calories: 320,
    protein: 29,
    carbs: 12,
    fat: 16,
    ingredients: [
      {
        id: '3-1',
        name: 'salmon fillets',
        amount: '4 (6oz each)',
        substitutes: ['trout fillets', 'arctic char']
      },
      {
        id: '3-2',
        name: 'honey',
        amount: '1/4 cup',
        substitutes: ['maple syrup', 'brown sugar']
      },
      {
        id: '3-3',
        name: 'soy sauce',
        amount: '3 tablespoons',
        substitutes: ['tamari', 'coconut aminos']
      },
      {
        id: '3-4',
        name: 'garlic, minced',
        amount: '4 cloves',
      },
      {
        id: '3-5',
        name: 'lemon juice',
        amount: '1 tablespoon',
        substitutes: ['lime juice', 'rice vinegar']
      },
      {
        id: '3-6',
        name: 'olive oil',
        amount: '1 tablespoon',
      },
      {
        id: '3-7',
        name: 'salt and pepper',
        amount: 'to taste',
      },
      {
        id: '3-8',
        name: 'green onions, sliced',
        amount: '2',
      },
      {
        id: '3-9',
        name: 'sesame seeds',
        amount: '1 teaspoon',
      },
    ],
    instructions: [
      'In a small bowl, whisk together honey, soy sauce, minced garlic, lemon juice, olive oil, salt, and pepper.',
      'Place salmon fillets in a shallow dish and pour half of the marinade over them. Reserve the rest for glazing. Let marinate for at least 30 minutes.',
      'Preheat grill to medium-high heat or oven to 400°F (200°C).',
      'For grilling: Place salmon skin-side down and grill for 5-6 minutes. Carefully flip and grill for another 3-4 minutes, brushing with reserved marinade.',
      'For oven baking: Place salmon on a lined baking sheet and bake for 12-15 minutes, brushing with marinade halfway through.',
      'Garnish with sliced green onions and sesame seeds before serving.'
    ],
    createdAt: '2023-08-27',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: '4',
    name: 'Green Smoothie Bowl',
    description: 'Start your day with this nutrient-packed green smoothie bowl topped with fresh fruits, granola, and a drizzle of honey. A perfect breakfast to boost energy levels.',
    image: 'https://images.unsplash.com/photo-1626790290643-579b75475d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    tags: ['Breakfast', 'Healthy', 'Vegan'],
    cuisine: 'American',
    mealType: 'Breakfast',
    calories: 280,
    protein: 9,
    carbs: 52,
    fat: 8,
    ingredients: [
      {
        id: '4-1',
        name: 'frozen banana',
        amount: '1 large',
      },
      {
        id: '4-2',
        name: 'spinach',
        amount: '1 cup',
        substitutes: ['kale', 'mixed greens']
      },
      {
        id: '4-3',
        name: 'almond milk',
        amount: '1/2 cup',
        substitutes: ['oat milk', 'coconut milk', 'any plant-based milk']
      },
      {
        id: '4-4',
        name: 'frozen mango chunks',
        amount: '1/2 cup',
        substitutes: ['pineapple', 'peach']
      },
      {
        id: '4-5',
        name: 'protein powder (optional)',
        amount: '1 scoop',
      },
      {
        id: '4-6',
        name: 'chia seeds',
        amount: '1 tablespoon',
      },
      {
        id: '4-7',
        name: 'blueberries',
        amount: '1/4 cup',
      },
      {
        id: '4-8',
        name: 'sliced strawberries',
        amount: '1/4 cup',
      },
      {
        id: '4-9',
        name: 'granola',
        amount: '2 tablespoons',
      },
      {
        id: '4-10',
        name: 'honey or maple syrup',
        amount: '1 teaspoon',
      },
      {
        id: '4-11',
        name: 'shredded coconut',
        amount: '1 tablespoon',
      },
    ],
    instructions: [
      'Add frozen banana, spinach, almond milk, frozen mango, protein powder (if using), and chia seeds to a blender.',
      'Blend until smooth and creamy. The mixture should be thicker than a regular smoothie.',
      'Pour into a bowl.',
      'Top with blueberries, sliced strawberries, granola, a drizzle of honey, and shredded coconut.',
      'Serve immediately.'
    ],
    createdAt: '2023-09-05',
    rating: 4.3,
    reviews: 78,
  },
  {
    id: '5',
    name: 'Spicy Black Bean Tacos',
    description: 'Quick and flavorful vegetarian tacos filled with spiced black beans, fresh vegetables, and a zesty lime crema. Perfect for a weeknight dinner or casual entertaining.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: 'easy',
    tags: ['Mexican', 'Vegetarian', 'Quick'],
    cuisine: 'Mexican',
    mealType: 'Dinner',
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 10,
    ingredients: [
      {
        id: '5-1',
        name: 'black beans, drained and rinsed',
        amount: '2 15oz cans',
      },
      {
        id: '5-2',
        name: 'olive oil',
        amount: '1 tablespoon',
      },
      {
        id: '5-3',
        name: 'onion, diced',
        amount: '1 medium',
      },
      {
        id: '5-4',
        name: 'garlic, minced',
        amount: '2 cloves',
      },
      {
        id: '5-5',
        name: 'ground cumin',
        amount: '1 teaspoon',
      },
      {
        id: '5-6',
        name: 'chili powder',
        amount: '1 teaspoon',
      },
      {
        id: '5-7',
        name: 'smoked paprika',
        amount: '1/2 teaspoon',
      },
      {
        id: '5-8',
        name: 'lime juice',
        amount: '2 tablespoons',
      },
      {
        id: '5-9',
        name: 'salt',
        amount: 'to taste',
      },
      {
        id: '5-10',
        name: 'corn tortillas',
        amount: '8 small',
        substitutes: ['flour tortillas', 'lettuce leaves']
      },
      {
        id: '5-11',
        name: 'avocado, sliced',
        amount: '1',
      },
      {
        id: '5-12',
        name: 'red cabbage, shredded',
        amount: '1 cup',
      },
      {
        id: '5-13',
        name: 'cilantro, chopped',
        amount: '1/4 cup',
      },
      {
        id: '5-14',
        name: 'sour cream',
        amount: '1/2 cup',
        substitutes: ['Greek yogurt', 'cashew cream']
      },
      {
        id: '5-15',
        name: 'lime zest',
        amount: '1 teaspoon',
      },
    ],
    instructions: [
      'Heat olive oil in a skillet over medium heat. Add onion and sauté until soft, about 4 minutes.',
      'Add garlic, cumin, chili powder, and smoked paprika. Cook for 30 seconds until fragrant.',
      'Add black beans and 1/4 cup water. Simmer for 5-7 minutes, mashing some beans with the back of a spoon.',
      'Stir in lime juice and salt to taste.',
      'While beans cook, prepare lime crema by mixing sour cream with lime zest and a pinch of salt.',
      'Warm tortillas in a dry pan or directly over a gas flame.',
      'Assemble tacos with black bean mixture, avocado slices, shredded cabbage, cilantro, and a dollop of lime crema.'
    ],
    createdAt: '2023-10-10',
    rating: 4.6,
    reviews: 156,
  },
  {
    id: '6',
    name: 'Berry Chia Pudding',
    description: 'A nutritious make-ahead breakfast with chia seeds, almond milk, and fresh berries. This simple pudding is packed with omega-3s, fiber, and antioxidants.',
    image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: 'easy',
    tags: ['Breakfast', 'Vegan', 'Make-Ahead'],
    cuisine: 'American',
    mealType: 'Breakfast',
    calories: 240,
    protein: 7,
    carbs: 32,
    fat: 10,
    ingredients: [
      {
        id: '6-1',
        name: 'chia seeds',
        amount: '1/4 cup',
      },
      {
        id: '6-2',
        name: 'almond milk',
        amount: '1 cup',
        substitutes: ['coconut milk', 'oat milk', 'any plant-based milk']
      },
      {
        id: '6-3',
        name: 'maple syrup',
        amount: '1 tablespoon',
        substitutes: ['honey', 'agave nectar']
      },
      {
        id: '6-4',
        name: 'vanilla extract',
        amount: '1/2 teaspoon',
      },
      {
        id: '6-5',
        name: 'mixed berries (strawberries, blueberries, raspberries)',
        amount: '1 cup',
      },
      {
        id: '6-6',
        name: 'sliced almonds',
        amount: '2 tablespoons',
      },
    ],
    instructions: [
      'In a bowl, combine chia seeds, almond milk, maple syrup, and vanilla extract. Stir well.',
      'Cover and refrigerate for at least 4 hours or overnight until the pudding has thickened.',
      'Stir again before serving.',
      'Top with mixed berries and sliced almonds.',
      'For meal prep, divide into individual jars and store in the refrigerator for up to 3 days.'
    ],
    createdAt: '2023-07-12',
    rating: 4.4,
    reviews: 92,
  },
];

export const getRecipeById = (id: string): Recipe | undefined => {
  return mockRecipes.find(recipe => recipe.id === id);
};

export const getRecommendedRecipes = (): Recipe[] => {
  // In a real app, this would use an algorithm based on user preferences
  return mockRecipes.slice(0, 3);
};

export const getPopularRecipes = (): Recipe[] => {
  return [...mockRecipes].sort((a, b) => b.rating - a.rating);
};

export const getQuickRecipes = (): Recipe[] => {
  return [...mockRecipes].sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
};
