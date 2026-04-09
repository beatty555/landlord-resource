"use client";

import { LogOut } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function SignOutButton() {
  const handleSignOut = async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    const supabase = createBrowserClient(url, key);
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
