// import { supabase } from "@/supabase/config";
import { NextRequest, NextResponse } from "next/server";
import createClient from "./supabase/serverConfig";

import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  // //initializing server client
  const supabase = await createClient(cookieStore);

  const pathname = request.nextUrl.pathname;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // // const authProtectedRoutes = ["/db", "/upload"];

  //auth middleware
  if (!pathname.includes("/auth")) {
    //   if (!user) {
    //     console.log("No session token found. Redirecting to Sign-In page");
    //     return NextResponse.redirect(new URL("/auth", request.url));
    //   }
  }

  console.log("Session present: ", user);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
