import { User } from "@supabase/supabase-js"
export interface LoginCredentials{
    email: string;
    password: string;
}
export interface SignupCredentials{
email: string;
password: string;
fullName: string;
}

export type AuthContextType ={
    user: User |undefined;
    isAuthenticated:boolean;
    isLoading:boolean;
    login: (credentials:LoginCredentials)=>Promise<string|null>;
    signup: (credentials:SignupCredentials)=>Promise<string|null>;
    logout?: ()=>Promise<void>;
}