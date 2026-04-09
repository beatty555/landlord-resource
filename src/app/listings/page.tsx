import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { MapPin, Bed, TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Investment Property Listings",
  description: "Browse our latest buy-to-let investment property opportunities across the UK. Members only.",
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

export default async function ListingsPage() {
  // Auth gate — redirect unauthenticated users to login
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseAnonKey) {
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
    if (!session) redirect("/login?next=/listings");
  }

  const listings = await getListings();

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Investment Property Listings</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Below-market buy-to-let opportunities sourced by our team. Exclusive to portal members.
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
          <div className="space-y-4">
            {listings.map((listing) => {
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
                  key={listing.id}
                  href={`/listings/${listing.id}`}
                  className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  {/* Image */}
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

                  {/* Content */}
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
            })}
          </div>
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
