"use client";

// import { supabase } from "@/supabase/config";
import { useEffect, useState } from "react";
import authservice from "@/supabase/services/authentication";
import { Session, User } from "@supabase/supabase-js";
// import { randomInt } from "crypto";

// interface User {
//   id: number;
//   created_at: Date;
//   name: string;
//   email: string;
// }

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    try {
      fetchCurrentData();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, []);

  const fetchCurrentData = async () => {
    const data = await authservice.getUser();
    console.log(data);
    setUser(data.user);
    setSession(data.session);
  };

  return (
    <div>
      <h1>PRESENT USER INFO</h1>
      <pre>USER : {JSON.stringify(user, null, 2)}</pre>
      <pre>SESSION : {JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
