
import { useState } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DietaryRestriction, Cuisine } from '@/contexts/UserPreferencesContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface RecipeFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  searchQuery: string;
  dietaryRestrictions: DietaryRestriction[];
  cuisines: Cuisine[];
  maxTime: number;
  mealType: string | null;
}

const RecipeFilters = ({ onFilterChange }: RecipeFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    dietaryRestrictions: [],
    cuisines: [],
    maxTime: 60,
    mealType: null,
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const dietaryOptions: DietaryRestriction[] = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'
  ];
  
  const cuisineOptions: Cuisine[] = [
    'Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'French'
  ];
  
  const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, searchQuery: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const toggleDietaryRestriction = (diet: DietaryRestriction) => {
    const newDiets = filters.dietaryRestrictions.includes(diet)
      ? filters.dietaryRestrictions.filter(d => d !== diet)
      : [...filters.dietaryRestrictions, diet];
    
    const newFilters = { ...filters, dietaryRestrictions: newDiets };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const toggleCuisine = (cuisine: Cuisine) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter(c => c !== cuisine)
      : [...filters.cuisines, cuisine];
    
    const newFilters = { ...filters, cuisines: newCuisines };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const setMealType = (mealType: string | null) => {
    const newFilters = { ...filters, mealType };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleTimeChange = (value: number[]) => {
    const newFilters = { ...filters, maxTime: value[0] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const newFilters = {
      searchQuery: '',
      dietaryRestrictions: [],
      cuisines: [],
      maxTime: 60,
      mealType: null,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const hasActiveFilters = () => {
    return (
      filters.dietaryRestrictions.length > 0 ||
      filters.cuisines.length > 0 ||
      filters.maxTime !== 60 ||
      filters.mealType !== null
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search recipes..."
            className="w-full pl-9"
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-1.5"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          <ChevronDown className="h-4 w-4" />
          {hasActiveFilters() && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {filters.dietaryRestrictions.length + filters.cuisines.length + (filters.mealType ? 1 : 0)}
            </Badge>
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {filters.mealType || 'Meal Type'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Select Meal Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setMealType(null)}>
              Any
            </DropdownMenuItem>
            {mealTypeOptions.map(meal => (
              <DropdownMenuItem key={meal} onClick={() => setMealType(meal)}>
                {meal}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {showFilters && (
        <div className="bg-muted/40 rounded-lg p-4 space-y-4 border animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
              Clear all
            </Button>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Dietary Restrictions</h4>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map(diet => (
                <Badge 
                  key={diet} 
                  variant={filters.dietaryRestrictions.includes(diet) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleDietaryRestriction(diet)}
                >
                  {diet}
                  {filters.dietaryRestrictions.includes(diet) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Cuisines</h4>
            <div className="flex flex-wrap gap-2">
              {cuisineOptions.map(cuisine => (
                <Badge 
                  key={cuisine} 
                  variant={filters.cuisines.includes(cuisine) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                  {filters.cuisines.includes(cuisine) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Maximum Prep Time</h4>
              <span className="text-sm">{filters.maxTime} minutes</span>
            </div>
            <Slider
              value={[filters.maxTime]}
              min={10}
              max={120}
              step={5}
              onValueChange={handleTimeChange}
            />
          </div>
        </div>
      )}
      
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.dietaryRestrictions.map(diet => (
            <Badge key={diet} variant="secondary" className="flex items-center gap-1">
              {diet}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleDietaryRestriction(diet)}
              />
            </Badge>
          ))}
          
          {filters.cuisines.map(cuisine => (
            <Badge key={cuisine} variant="secondary" className="flex items-center gap-1">
              {cuisine}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleCuisine(cuisine)}
              />
            </Badge>
          ))}
          
          {filters.mealType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.mealType}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setMealType(null)}
              />
            </Badge>
          )}
          
          {filters.maxTime !== 60 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ≤ {filters.maxTime} mins
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleTimeChange([60])}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;
