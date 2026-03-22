import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  referral_code: string;
  referred_by: string | null;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, referralCode?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo mode profile for when Supabase is not configured
const DEMO_PROFILE: Profile = {
  id: 'demo-user-id',
  full_name: 'Demo Hotelier',
  email: 'demo@abedfor.me',
  referral_code: 'DEMO1234',
  referred_by: null,
  created_at: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data);
  }

  async function signUp(email: string, password: string, fullName: string, referralCode?: string) {
    if (!isSupabaseConfigured()) {
      // Demo mode: simulate signup
      const demoUser = { id: 'demo-user-id', email } as User;
      setUser(demoUser);
      setProfile({ ...DEMO_PROFILE, email, full_name: fullName });
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, referred_by: referralCode },
      },
    });

    if (error) return { error: error.message };

    // Handle referral
    if (referralCode) {
      // Store for later processing when profile is created via trigger
      localStorage.setItem('pending_referral', referralCode);
    }

    return { error: null };
  }

  async function signIn(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      // Demo mode: simulate login
      const demoUser = { id: 'demo-user-id', email } as User;
      setUser(demoUser);
      setProfile({ ...DEMO_PROFILE, email });
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }

  async function signOut() {
    if (!isSupabaseConfigured()) {
      setUser(null);
      setProfile(null);
      setSession(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
