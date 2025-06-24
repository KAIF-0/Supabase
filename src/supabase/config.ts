"use client";
import { createClient } from "@supabase/supabase-js";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  !process.env.NEXT_PUBLIC_SUPABASE_URL
) {
  throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
