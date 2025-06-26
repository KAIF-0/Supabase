"use client";

// import { supabase } from "@/supabase/config";
import { useEffect, useState } from "react";
import databaseService from "@/supabase/services/database";
import { supabase } from "@/supabase/config";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
// import { randomInt } from "crypto";

interface User {
  id: number;
  created_at: Date;
  name: string;
  email: string;
}

export default function Home() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("testChannel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        (payload: RealtimePostgresChangesPayload<User>) => {
          console.log(payload);
          if (payload.eventType === "INSERT") {
            setData((data) => [...data, payload.new]);
          }
          if (payload.eventType === "DELETE") {
            setData((data) => data.filter((d) => d.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    try {
      databaseService.getUsers().then((data) => {
        setData(data);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }, []);

  async function addUser() {
    try {
      await databaseService.addUser({
        name: "kaif khan",
        email: "kaif@email.com",
      });

      //testing ke liye hard coded
      // setData([
      //   ...data,
      //   {
      //     id: 1,
      //     created_at: new Date(),
      //     name: "kaif khan",
      //     email: "kaif@email.com",
      //   },
      // ]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <h1>USER DATA</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={addUser}>Add User</button>
    </div>
  );
}
