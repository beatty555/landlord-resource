"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Landlord Resource"
            width={180}
            height={48}
            className="h-12 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-brand-navy">Sign in to your account</h1>
          <p className="text-gray-500 mt-2 text-sm">
            No password needed — we&apos;ll send you a magic link to sign in instantly.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {status === "sent" ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-brand-navy mb-2">Check your email</h2>
              <p className="text-gray-500 text-sm">
                We&apos;ve sent a magic link to <strong>{email}</strong>. Click the link in your email to sign in — it expires in 10 minutes.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-5 text-sm text-brand-green hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                {status === "loading" ? "Sending link..." : "Send Magic Link"}
              </button>

              <p className="text-xs text-center text-gray-400">
                By signing in you agree to our{" "}
                <Link href="/terms" className="underline hover:text-brand-green">Terms</Link> and{" "}
                <Link href="/privacy" className="underline hover:text-brand-green">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/login" className="text-brand-green font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
