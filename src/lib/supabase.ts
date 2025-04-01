
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

// Create a mock client if the real one can't be created
let supabase;

try {
  // Only create a real client if both URL and key are available
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    // Create a mock client that won't break the app but won't actually connect to Supabase
    supabase = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ 
          error: new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.') 
        }),
        signUp: () => Promise.resolve({ 
          error: new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.') 
        }),
        signOut: () => Promise.resolve({ error: null }),
      },
    };
    console.warn('Using mock Supabase client. Authentication and database features will not work.');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Fallback to mock client
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ 
        error: new Error('Supabase client initialization failed. Please check your configuration.') 
      }),
      signUp: () => Promise.resolve({ 
        error: new Error('Supabase client initialization failed. Please check your configuration.') 
      }),
      signOut: () => Promise.resolve({ error: null }),
    },
  };
}

export { supabase };
