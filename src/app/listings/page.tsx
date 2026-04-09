export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { MapPin, Bed, TrendingUp, ArrowRight, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Investment Property Listings",
  description: "Browse our latest buy-to-let investment property opportunities across the UK.",
};

interface SupabaseListing {
  id: string;
  title: string | null;
  location: string | null;
  city: string | null;
  price: number | null;
  open_market_value: number | null;
  net_yield: number | null;
  bedrooms: number | null;
  property_type: string | null;
  status: string | null;
  listing_files: { file_url: string; file_type: string; display_order: number }[];
}

const FREE_PREVIEW_COUNT = 3;

async function getListings(): Promise<SupabaseListing[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return [];

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase
    .from("listings")
    .select("id, title, location, city, price, open_market_value, net_yield, bedrooms, property_type, status, listing_files(file_url, file_type, display_order)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Listings fetch error:", error);
    return [];
  }

  return (data ?? []) as SupabaseListing[];
}

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

function getCoverImage(listing: SupabaseListing): string | null {
  const images = listing.listing_files
    .filter((f) => f.file_type === "image")
    .sort((a, b) => a.display_order - b.display_order);
  return images[0]?.file_url ?? null;
}

function belowMarket(listing: SupabaseListing): number | null {
  if (!listing.price || !listing.open_market_value || listing.open_market_value <= 0) return null;
  return Math.round(((listing.open_market_value - listing.price) / listing.open_market_value) * 100);
}

function ListingCard({ listing }: { listing: SupabaseListing }) {
  const cover = getCoverImage(listing);
  const discount = belowMarket(listing);
  const statusConfig = {
    available: { label: "Available", cls: "bg-green-100 text-green-700" },
    under_offer: { label: "Under Offer", cls: "bg-amber-100 text-amber-700" },
    sold: { label: "Sold", cls: "bg-gray-100 text-gray-500" },
  };
  const status = statusConfig[listing.status as keyof typeof statusConfig] ?? statusConfig.available;

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="sm:w-64 h-48 sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={listing.title ?? "Property"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 className="font-bold text-brand-navy text-lg leading-snug group-hover:text-brand-green transition-colors">
              {listing.title}
            </h2>
            <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${status.cls}`}>
              {status.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
            <MapPin className="h-3.5 w-3.5" />
            {listing.location ?? listing.city}
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-400">Asking Price</p>
              <p className="text-lg font-bold text-brand-navy">
                £{listing.price ? Number(listing.price).toLocaleString() : "—"}
              </p>
            </div>
            {listing.net_yield && (
              <div>
                <p className="text-xs text-gray-400">Net Yield</p>
                <p className="text-lg font-bold text-brand-green">{listing.net_yield}%</p>
              </div>
            )}
            {discount !== null && discount > 0 && (
              <div>
                <p className="text-xs text-gray-400">Below Market</p>
                <p className="text-lg font-bold text-amber-600">{discount}%</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            {listing.bedrooms && (
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                {listing.bedrooms} bed
              </span>
            )}
            {listing.property_type && (
              <span>{listing.property_type}</span>
            )}
          </div>
          <span className="flex items-center gap-1 text-brand-green text-sm font-medium group-hover:gap-2 transition-all">
            View details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function ListingsPage() {
  const [listings, session] = await Promise.all([getListings(), getSession()]);
  const isLoggedIn = !!session;
  const visibleListings = isLoggedIn ? listings : listings.slice(0, FREE_PREVIEW_COUNT);
  const hiddenCount = isLoggedIn ? 0 : Math.max(0, listings.length - FREE_PREVIEW_COUNT);

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Investment Property Listings</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Below-market buy-to-let opportunities sourced by our team.
            {!isLoggedIn && " Sign up free to see all available deals."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {listings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-400 text-lg mb-2">No listings available right now.</p>
            <p className="text-sm text-gray-400">Check back soon — we add new deals regularly.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {visibleListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* Signup wall for non-logged-in users with more listings */}
            {hiddenCount > 0 && (
              <div className="relative mt-4">
                {/* Blurred preview of next listing */}
                {listings[FREE_PREVIEW_COUNT] && (
                  <div className="rounded-xl overflow-hidden border border-gray-100 opacity-40 blur-[2px] pointer-events-none select-none" aria-hidden="true">
                    <div className="flex flex-col sm:flex-row bg-white">
                      <div className="sm:w-64 h-48 sm:h-32 flex-shrink-0 bg-gray-200" />
                      <div className="flex-1 p-5">
                        <div className="h-5 w-48 bg-gray-200 rounded mb-3" />
                        <div className="h-4 w-32 bg-gray-100 rounded mb-4" />
                        <div className="flex gap-4">
                          <div className="h-8 w-24 bg-gray-100 rounded" />
                          <div className="h-8 w-20 bg-gray-100 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Signup CTA overlay */}
                <div className="bg-white rounded-xl border-2 border-brand-green/20 p-10 text-center mt-4 shadow-sm">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-green/10 rounded-full mb-5">
                    <Lock className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-3">
                    {hiddenCount} more {hiddenCount === 1 ? "listing" : "listings"} available
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Sign up for a free account to view all our below-market investment
                    opportunities. No payment required — just enter your email.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/login?next=/listings"
                      className="inline-flex items-center justify-center bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Sign Up Free
                    </Link>
                    <Link
                      href="/login?next=/listings"
                      className="inline-flex items-center justify-center border border-gray-200 text-gray-600 hover:text-brand-navy hover:border-gray-300 px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Already a member? Log in
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 mt-10">
          <h3 className="text-xl font-bold text-brand-navy mb-2">Looking for something specific?</h3>
          <p className="text-gray-500 mb-5">
            Contact us and we&apos;ll alert you when properties matching your criteria are listed.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
