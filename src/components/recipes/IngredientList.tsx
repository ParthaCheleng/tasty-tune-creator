
import { Check, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Ingredient } from '@/types/recipe';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface IngredientListProps {
  ingredients: Ingredient[];
  checkAvailability?: boolean;
  showAddToCart?: boolean;
}

const IngredientList = ({
  ingredients,
  checkAvailability = false,
  showAddToCart = false,
}: IngredientListProps) => {
  const { toast } = useToast();
  const [availableIngredients, setAvailableIngredients] = useState<Set<string>>(new Set());
  
  const toggleAvailability = (ingredientId: string) => {
    setAvailableIngredients(prev => {
      const updated = new Set(prev);
      if (updated.has(ingredientId)) {
        updated.delete(ingredientId);
      } else {
        updated.add(ingredientId);
      }
      return updated;
    });
  };
  
  const addAllToShoppingList = () => {
    toast({
      title: 'Added to shopping list',
      description: 'All ingredients have been added to your shopping list',
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-4">
      {showAddToCart && (
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={addAllToShoppingList}
        >
          <ShoppingCart className="h-4 w-4" />
          Add all to shopping list
        </Button>
      )}
      
      <ul className="space-y-2.5">
        {ingredients.map((ingredient) => (
          <li 
            key={ingredient.id} 
            className={cn(
              "flex items-center justify-between text-sm p-2 rounded-md",
              availableIngredients.has(ingredient.id) ? "bg-green-50" : "bg-muted/50"
            )}
          >
            <div className="flex items-start gap-1.5">
              {checkAvailability && (
                <button
                  onClick={() => toggleAvailability(ingredient.id)}
                  className={cn(
                    "mt-0.5 h-4 w-4 flex-shrink-0 rounded-full",
                    availableIngredients.has(ingredient.id) 
                      ? "bg-green-100 text-green-600" 
                      : "bg-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {availableIngredients.has(ingredient.id) && (
                    <Check className="h-3 w-3" />
                  )}
                </button>
              )}
              <span>
                <span className="font-medium">{ingredient.amount}</span> {ingredient.name}
              </span>
            </div>
            
            {ingredient.substitutes && ingredient.substitutes.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                    <span className="sr-only">View substitutes</span>
                    <span className="text-xs font-medium">Alt</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" align="end" className="max-w-[200px]">
                  <h4 className="font-medium text-xs mb-1">Possible substitutes:</h4>
                  <ul className="text-xs">
                    {ingredient.substitutes.map((sub, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span>•</span> {sub}
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
