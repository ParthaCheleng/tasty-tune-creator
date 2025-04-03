import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import PopularRecipesPage from "./pages/PopularRecipesPage"; // ✅ Popular Recipes Page
import QuickRecipesPage from "./pages/QuickRecipePages";     // ✅ Quick Recipes Page

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const [missingEnvVars, setMissingEnvVars] = useState(false);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setMissingEnvVars(true);
      console.error(
        "Missing required Supabase environment variables. " +
          "Please create a .env file in the project root with the following variables:\n\n" +
          "VITE_SUPABASE_URL=your_supabase_url\n" +
          "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key\n\n"
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          {missingEnvVars && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 fixed top-0 w-full z-50">
              <p className="font-bold">Environment Variable Warning</p>
              <p>
                Missing Supabase environment variables. Authentication and
                database features will not work. Please add
                VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env
                file.
              </p>
            </div>
          )}
          <AuthProvider>
            <UserPreferencesProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/recipes" element={<PopularRecipesPage />} />  {/* ✅ Popular Recipes Page */}
                <Route path="/quick" element={<QuickRecipesPage />} />       {/* ✅ Quick Recipes Page */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/preferences"
                  element={
                    <ProtectedRoute>
                      <Preferences />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </UserPreferencesProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
