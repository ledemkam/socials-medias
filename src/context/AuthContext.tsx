import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../service/superbase-client';

interface AuthContextType {
  user: User | null;
  signInGitHub: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
     setUser(session?.user ?? null);
    });

    const {data: listener} = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user ?? null)
    })

    return () => {
      listener?.subscription.unsubscribe();
    }
  },[])

  const signInGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <AuthContext.Provider value={{ user, signInGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };