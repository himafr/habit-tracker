import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
} from "../../src/types/authTypes";
//TODO add prement local storage for token and refresh token
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const getUser = async () => {
    setIsLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw new Error(error.message);
      setUser(session?.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch {
      setUser(undefined);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);

  const signup = async ({ email, password, fullName }: SignupCredentials) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { fullName } },
    });
    setIsLoading(false);
    if (error) throw new Error(error.message);
    return null;
  };

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    if (error) throw new Error(error.message);
    setUser(data.session?.user);
    setIsAuthenticated(true);
    router.replace("/(tabs)");
    return null;
  };

  async function logout() {
    await supabase.auth.signOut();
    setUser(undefined);
    setIsAuthenticated(false);
    router.replace("/authentication/auth");
  }

  return (
    <AuthContext.Provider
      value={{ login, signup, user, isLoading, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("you are out of auth context ");
  }
  return context;
}
