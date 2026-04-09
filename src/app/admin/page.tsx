"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Lock, Loader2 } from "lucide-react";

const AdminPanel = dynamic(() => import("./AdminPanel"), {
  ssr: false,
});

const STORAGE_KEY = "lr_admin_auth";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem(STORAGE_KEY, "true");
        setAuthed(true);
      } else {
        const data = await res.json();
        setError(data.error || "Wrong password");
      }
    } catch {
      setError("Connection error — try again");
    } finally {
      setLoading(false);
    }
  };

  // Still checking localStorage
  if (authed === null) return null;

  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-navy/10 rounded-full mb-4">
              <Lock className="h-6 w-6 text-brand-navy" />
            </div>
            <h1 className="text-xl font-bold text-brand-navy">Admin Access</h1>
            <p className="text-sm text-gray-500 mt-1">Enter the admin password to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green mb-3"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy hover:bg-brand-navy/90 disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                "Enter Admin Panel"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminPanel />;
}
