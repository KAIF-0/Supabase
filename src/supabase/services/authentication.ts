import { Provider, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../config";

interface AuthCred {
  email: string;
  token: string;
}
class AuthService {
  //chupabase client...
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  signInWithOAuth = async (provider: Provider) => {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: "http://localhost:3000",
      },
    });

    if (error) {
      console.log(error);
    }

    return data;
  };

  signInWithOTP = async () => {
    const { data, error } = await this.supabase.auth.signInWithOtp({
      email: "kaif8700979251@gmail.com",
    });

    if (error) {
      console.log(error);
    }

    return data;
  };

  verifyOTP = async ({ email, token }: AuthCred) => {
    const { data, error } = await this.supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      throw new Error("Failed to verify OTP:" + error.message);
    }
    return data;
  };

  refreshSession = async () => {
    const { data, error } = await this.supabase.auth.refreshSession();
    const { session, user } = data;

    if (error) {
      throw new Error(error.message);
    }
    return { session, user };
  };

  getUser = async () => {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    // console.log(user, session);

    return { session, user };
  };

  signOut = async () => {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    console.log("Signout Successfull!");
  };
}

const authservice = new AuthService(supabase);

export default authservice;
