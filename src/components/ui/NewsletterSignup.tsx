"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  dark?: boolean;
  label?: string;
}

export default function NewsletterSignup({ dark = false, label }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className={`text-sm font-medium ${dark ? "text-brand-green-light" : "text-brand-green"}`}>
        ✓ You&apos;re signed up! Check your email for a login link.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {label && (
        <label className={`block text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>
          {label}
        </label>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className={`w-full px-3 py-2.5 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-brand-green ${
          dark
            ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
            : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe — It's Free"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
      )}
      <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
        No spam, unsubscribe any time.
      </p>
    </form>
  );
}
