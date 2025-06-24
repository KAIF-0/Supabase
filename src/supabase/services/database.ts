import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../config";

class DatabaseService {
  //chupabase client...
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  getUsers = async () => {
    const { data, error } = await this.supabase
      .schema("public")
      .from("users")
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  addUser = async ({ name, email }: { name: string; email: string }) => {
    const { error } = await this.supabase.from("users").insert({ name, email });

    if (error) {
      throw new Error(error.message);
    }

    // console.log(data)
  };
}

const databaseService = new DatabaseService(supabase);

export default databaseService;
