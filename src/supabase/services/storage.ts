import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../config";

class StorageService {
  //chupabase client...
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  getFiles = async () => {};

  addFile = async () => {};
}

const storageService = new StorageService(supabase);

export default storageService;
