"use client";
import authservice from "@/supabase/services/authentication";
import React from "react";

const Page = () => {
  const handleSignIn = async () => {
    const data = await authservice.signInWithOAuth("google");
    // const data = await authservice.signInWithOTP();
    console.log(data);
  };
  const handleSignOut = async () => {
    await authservice.signOut();
  };
  const handleRefreshSession = async () => {
    const data = await authservice.refreshSession();
    console.log(data);
  };
  return (
    <div className="flex flex-col">
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={handleRefreshSession}>Refresh Session</button>
    </div>
  );
};

export default Page;
