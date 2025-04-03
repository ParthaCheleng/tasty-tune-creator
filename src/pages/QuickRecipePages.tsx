import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import RecipeCard from '@/components/recipes/RecipeCard';
import { fetchRecipes } from '@/utils/fetchRecipes';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const QuickRecipesPage = () => {
  const [quickRecipes, setQuickRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const recipesPerPage = 8;

  const loadQuickRecipes = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes({
        maxReadyTime: 30,
        number: recipesPerPage,
        offset: (page - 1) * recipesPerPage,
        sort: 'popularity',
      });

      setQuickRecipes(data || []);
    } catch (error) {
      console.error('❌ Failed to fetch quick recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuickRecipes();
  }, [page]);

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <h1 className="section-header mb-6">Quick Recipes (≤ 30 Minutes)</h1>

          {loading ? (
            <p>Loading recipes...</p>
          ) : quickRecipes.length === 0 ? (
            <p>No quick recipes found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {quickRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {/* Pagination */}
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

export default QuickRecipesPage;
