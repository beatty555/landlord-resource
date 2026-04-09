"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase not configured — NEXT_PUBLIC env vars missing from client bundle");
  }
  return createBrowserClient(url, key);
}

type Tab = "login" | "signup" | "reset";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const reason = searchParams.get("reason");

  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
      } else {
        window.location.href = next;
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Login failed");
      setStatus("error");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setStatus("error");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setStatus("error");
      return;
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback?next=${next}` },
      });

      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
      } else if (data.session) {
        // Email confirmation disabled — user is logged in immediately
        window.location.href = next;
      } else {
        // Email confirmation enabled — show check-your-email message
        setStatus("success");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Signup failed");
      setStatus("error");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback?next=/dashboard`,
      });

      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Reset failed");
      setStatus("error");
    }
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setStatus("idle");
    setErrorMsg("");
    setPassword("");
    setConfirmPassword("");
  };

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green";

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
          <h1 className="text-2xl font-bold text-brand-navy">
            {tab === "login" && "Sign in to your account"}
            {tab === "signup" && "Create your free account"}
            {tab === "reset" && "Reset your password"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {tab === "login" && "Access investment listings, guides and templates."}
            {tab === "signup" && "Get free access to property listings, guides and templates."}
            {tab === "reset" && "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        {reason === "download" && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm text-amber-800">
            Please sign in to download templates. It&apos;s free — no payment required.
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Success states */}
          {status === "success" && tab === "signup" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-brand-navy mb-2">Check your email</h2>
              <p className="text-gray-500 text-sm">
                We&apos;ve sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account.
              </p>
              <button onClick={() => switchTab("login")} className="mt-5 text-sm text-brand-green hover:underline">
                Back to sign in
              </button>
            </div>
          )}

          {status === "success" && tab === "reset" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-brand-navy mb-2">Reset link sent</h2>
              <p className="text-gray-500 text-sm">
                Check <strong>{email}</strong> for a password reset link.
              </p>
              <button onClick={() => switchTab("login")} className="mt-5 text-sm text-brand-green hover:underline">
                Back to sign in
              </button>
            </div>
          )}

          {/* Login form */}
          {tab === "login" && status !== "success" && (
            <form onSubmit={handleLogin} className="space-y-4">
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
                  className={inputCls}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => switchTab("reset")}
                    className="text-xs text-brand-green hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className={inputCls}
                />
              </div>

              {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                {status === "loading" ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-xs text-center text-gray-400">
                By signing in you agree to our{" "}
                <Link href="/terms" className="underline hover:text-brand-green">Terms</Link> and{" "}
                <Link href="/privacy" className="underline hover:text-brand-green">Privacy Policy</Link>.
              </p>
            </form>
          )}

          {/* Signup form */}
          {tab === "signup" && status !== "success" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="signup-confirm" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm password
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  className={inputCls}
                />
              </div>

              {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                {status === "loading" ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-xs text-center text-gray-400">
                By signing up you agree to our{" "}
                <Link href="/terms" className="underline hover:text-brand-green">Terms</Link> and{" "}
                <Link href="/privacy" className="underline hover:text-brand-green">Privacy Policy</Link>.
              </p>
            </form>
          )}

          {/* Reset form */}
          {tab === "reset" && status !== "success" && (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={inputCls}
                />
              </div>

              {status === "error" && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                {status === "loading" ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>

        {/* Bottom toggle */}
        <p className="text-center text-sm text-gray-500 mt-5">
          {tab === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button onClick={() => switchTab("signup")} className="text-brand-green font-medium hover:underline">
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => switchTab("login")} className="text-brand-green font-medium hover:underline">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
