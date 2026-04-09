export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { FileText, Home, BookOpen, ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Your Landlord Resource member dashboard.",
};

async function getSession() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/dashboard");

  const userEmail = session.user.email ?? "Member";

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy">Welcome back</h1>
          <p className="text-gray-500 mt-1">Signed in as {userEmail}</p>
        </div>

        {/* Membership info */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-green/10 rounded-lg">
              <Shield className="h-6 w-6 text-brand-green" />
            </div>
            <div>
              <p className="text-xl font-bold text-brand-navy">Free Member</p>
              <p className="text-sm text-gray-500 mt-1">
                You have full access to all investment property listings, expert landlord guides,
                legislation updates, and downloadable templates — all completely free.
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            {
              icon: Home,
              title: "Property Listings",
              desc: "Browse below-market investment opportunities sourced by our team",
              href: "/listings",
              cta: "View Listings",
            },
            {
              icon: FileText,
              title: "Templates",
              desc: "Download tenancy agreements, inventory checklists and more",
              href: "/templates",
              cta: "Download Templates",
            },
            {
              icon: BookOpen,
              title: "Guides",
              desc: "Expert guides on tax, finance, HMO, mortgages and more",
              href: "/guides",
              cta: "Browse Guides",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-brand-green/10 rounded-lg">
                    <Icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-brand-green transition-colors" />
                </div>
                <h3 className="font-bold text-brand-navy mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                <span className="text-sm font-semibold text-brand-green group-hover:underline">
                  {item.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
