import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import RecipeCard from '@/components/recipes/RecipeCard';
import { fetchRecipes } from '@/utils/fetchRecipes'; // 🔁 Make sure this uses API
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PopularRecipesPage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadPopularRecipes = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes({
        number: 12,
        sort: 'popularity',
        offset: (page - 1) * 12,
      });
      setRecipes(data || []);
    } catch (error) {
      console.error('Failed to fetch popular recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularRecipes();
  }, [page]);

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <h1 className="section-header mb-6">Popular Recipes</h1>

          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipes.map((recipe: any) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="text-sm text-primary flex items-center gap-1 disabled:opacity-50"
            >
              <ArrowLeft size={16} /> Prev
            </button>
            <span className="text-sm text-muted-foreground">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="text-sm text-primary flex items-center gap-1"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PopularRecipesPage;
