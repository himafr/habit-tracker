import { supabase } from "@/lib/supabase";
import { LoginCredentials, SignupCredentials } from "../types/authTypes";

 async function login({email,password}:LoginCredentials){
   const {data,error}=await supabase.auth.signInWithPassword({email,password});
    if(error) throw new Error(error.message);
    return data.user;
}
 async function signup({fullName,email,password}:SignupCredentials){
   const {data,error}=await supabase.auth.signUp({email,password,options:{data:{fullName}}});
    if(error) throw new Error(error.message);
    return data.user;
}
