import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RecipeCardProps {
  recipe: Recipe;
  size?: 'sm' | 'md' | 'lg';
  featured?: boolean;
}

const RecipeCard = ({ recipe, size = 'md', featured = false }: RecipeCardProps) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: `${recipe.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
      duration: 3000,
    });
  };

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className={cn(
        'recipe-card group block',
        {
          'aspect-[4/3]': size === 'sm',
          'aspect-square': size === 'md',
          'aspect-[4/5]': size === 'lg',
          'md:col-span-2 md:aspect-[16/9]': featured,
        }
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="gradient-overlay"></div>

        {/* Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="mb-1 flex flex-wrap gap-1">
            {(recipe.tags ?? []).map((tag, index) => (
              <span key={index} className="badge bg-black/60 text-white">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-white font-medium text-lg md:text-xl font-serif mb-1">
            {recipe.name}
          </h3>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <span className="text-xs">{recipe.prepTime} mins</span>
              <span className="text-xs">•</span>
              <span className="text-xs capitalize">{recipe.difficulty}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'rounded-full bg-black/60 hover:bg-black/80 transition-colors',
                isFavorite && 'text-red-500'
              )}
              onClick={handleFavoriteClick}
            >
              <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
