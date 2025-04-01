import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';

const Auth = () => {
  // 🔐 Separate states for Sign In and Sign Up
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const { user, signIn, signUp, isLoading } = useAuth();
  const { preferences } = useUserPreferences();
  const [missingEnvVars, setMissingEnvVars] = useState(false);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      setMissingEnvVars(true);
    }
  }, []);

  // ✅ Redirect user if already signed in
  if (user && !isLoading) {
    const destination = preferences?.onboardingComplete ? '/' : '/preferences';
    return <Navigate to={destination} replace />;
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(signInEmail, signInPassword);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(signUpEmail, signUpPassword);
  };

  return (
    <Layout>
      <div className="container flex items-center justify-center py-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Welcome to TastyTune</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>

          {missingEnvVars && (
            <div className="px-6 pb-2">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Configuration Missing</AlertTitle>
                <AlertDescription>
                  Supabase environment variables are missing. Authentication will not work until you add them to your .env file.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <Tabs defaultValue="signIn">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signIn">Sign In</TabsTrigger>
              <TabsTrigger value="signUp">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signIn">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signInEmail">Email</Label>
                    <Input
                      id="signInEmail"
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signInPassword">Password</Label>
                    <Input
                      id="signInPassword"
                      type="password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading || missingEnvVars}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signUp">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signUpEmail">Email</Label>
                    <Input
                      id="signUpEmail"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signUpPassword">Password</Label>
                    <Input
                      id="signUpPassword"
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      minLength={6}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading || missingEnvVars}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
