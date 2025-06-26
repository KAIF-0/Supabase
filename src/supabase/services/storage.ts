import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../config";

class StorageService {
  //chupabase client...
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
    // this.createBucket();
  }

  createBucket = async () => {
    await this.supabase.storage
      .getBucket("test")
      .then((res) => {
        console.log(res);
        if (res.error || res.error === "StorageApiError: Bucket not found") {
          console.log("creating bucket");
          this.supabase.storage.createBucket("test", {
            public: false,
            allowedMimeTypes: ["image/png", "application/pdf"],
            fileSizeLimit: 1024,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // if (error) {
    //   console.log(error);
    //   return;
    // }

    // if (data) {
    //   console.log(data);
    //   return;
    // }

    //if dont exist so create one
    // await this.supabase.storage.createBucket("test", {
    //   public: false,
    //   allowedMimeTypes: ["image/png", "application/pdf"],
    //   fileSizeLimit: 1024,
    // });
  };

  addFile = async (file: File) => {
    const { data, error } = await this.supabase.storage
      .from("test")
      .upload(`${file.name}-${new Date().getTime()}`, file, {
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  getFile = async () => {
    const { data, error } = await this.supabase.storage.from("test").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };
}

const storageService = new StorageService(supabase);

export default storageService;
