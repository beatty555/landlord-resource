export const runtime = "edge";

import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Bed, MapPin, MessageCircle, Download, FileText } from "lucide-react";
import ImageGallery from "@/components/listings/ImageGallery";

interface Props {
  params: Promise<{ id: string }>;
}

interface SupabaseListing {
  id: string;
  title: string | null;
  location: string | null;
  city: string | null;
  price: number | null;
  open_market_value: number | null;
  current_rental_income: number | null;
  expected_rental_income: number | null;
  rental_yield: number | null;
  net_yield: number | null;
  bedrooms: number | null;
  property_type: string | null;
  tenure: string | null;
  lease_years_remaining: number | null;
  tenanted: boolean | null;
  mortgageable: boolean | null;
  suitable_for_hmo_mortgage: boolean | null;
  status: string | null;
  description: string | null;
  whatsapp_number: string | null;
  listing_files: {
    id: string;
    file_url: string;
    file_name: string;
    file_type: string;
    display_order: number;
  }[];
}

async function getListing(id: string): Promise<SupabaseListing | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return null;

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
    .select("*, listing_files(id, file_url, file_name, file_type, display_order)")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as SupabaseListing;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return {};
  return {
    title: listing.title ?? "Property Listing",
    description: `${listing.property_type ?? "Property"} in ${listing.location}. Asking £${Number(listing.price).toLocaleString()} — ${listing.net_yield}% net yield.`,
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;

  // Auth gate
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
    if (!session) redirect(`/login?next=/listings/${id}`);
  }

  const listing = await getListing(id);
  if (!listing) notFound();

  const files = listing.listing_files ?? [];
  const images = files
    .filter((f) => f.file_type === "image")
    .sort((a, b) => a.display_order - b.display_order)
    .map((f) => ({ url: f.file_url, name: f.file_name }));

  const floorplans = files
    .filter((f) => f.file_type === "floorplan")
    .sort((a, b) => a.display_order - b.display_order);

  const documents = files
    .filter((f) => f.file_type === "document")
    .sort((a, b) => a.display_order - b.display_order);

  const belowMarket =
    listing.price && listing.open_market_value && listing.open_market_value > 0
      ? Math.round(
          ((listing.open_market_value - listing.price) / listing.open_market_value) * 100
        )
      : 0;

  const statusConfig = {
    available: { label: "AVAILABLE", className: "bg-brand-green text-white" },
    under_offer: { label: "UNDER OFFER", className: "bg-amber-500 text-white" },
    sold: { label: "SOLD", className: "bg-gray-500 text-white" },
  };
  const statusStyle =
    statusConfig[listing.status as keyof typeof statusConfig] ?? statusConfig.available;

  const isImageFloorplan = (f: { file_name: string; file_url: string }) =>
    !f.file_url.toLowerCase().endsWith(".pdf");

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery with lightbox */}
            <ImageGallery images={images} />

            {/* Title & key stats */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold text-brand-navy">{listing.title}</h1>
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${statusStyle.className}`}
                >
                  {statusStyle.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-5">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </div>

              {/* Financial grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Asking Price", value: listing.price ? `£${Number(listing.price).toLocaleString()}` : "—" },
                  { label: "Open Market Value", value: listing.open_market_value ? `£${Number(listing.open_market_value).toLocaleString()}` : "—" },
                  { label: "Below Market Value", value: belowMarket > 0 ? `${belowMarket}%` : "—", highlight: true },
                  { label: "Current Rental (pcm)", value: listing.current_rental_income ? `£${Number(listing.current_rental_income).toLocaleString()}` : "—" },
                  { label: "Expected Rental (pcm)", value: listing.expected_rental_income ? `£${Number(listing.expected_rental_income).toLocaleString()}` : "—" },
                  { label: "Net Yield", value: listing.net_yield ? `${listing.net_yield}%` : "—", highlight: true },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p
                      className={`text-lg font-bold ${
                        item.highlight ? "text-brand-green" : "text-brand-navy"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Property details */}
              <h2 className="font-bold text-brand-navy mb-3">Property Details</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Property Type", value: listing.property_type },
                  { label: "Bedrooms", value: listing.bedrooms ? `${listing.bedrooms} bedrooms` : null },
                  {
                    label: "Tenure",
                    value:
                      listing.tenure === "leasehold"
                        ? `Leasehold (${listing.lease_years_remaining} yrs)`
                        : "Freehold",
                  },
                  { label: "Status", value: listing.tenanted ? "Tenanted" : "Vacant" },
                  { label: "Mortgageable", value: listing.mortgageable ? "Yes" : "No" },
                  { label: "HMO Mortgage", value: listing.suitable_for_hmo_mortgage ? "Yes" : "No" },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between border-b border-gray-100 py-2"
                    >
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-brand-navy">{item.value}</span>
                    </div>
                  ))}
              </div>

              {/* Description */}
              <h2 className="font-bold text-brand-navy mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* ── Floorplans ── */}
            {floorplans.length > 0 && (
              <div className="bg-white rounded-xl p-6">
                <h2 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-green" />
                  Floorplans
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {floorplans.map((f) =>
                    isImageFloorplan(f) ? (
                      <img
                        key={f.id}
                        src={f.file_url}
                        alt={f.file_name}
                        className="w-full rounded-lg border border-gray-100"
                      />
                    ) : (
                      <a
                        key={f.id}
                        href={f.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg px-4 py-3 transition-colors"
                      >
                        <FileText className="h-5 w-5 text-brand-green flex-shrink-0" />
                        <span className="text-sm text-brand-navy font-medium flex-1 truncate">
                          {f.file_name}
                        </span>
                        <Download className="h-4 w-4 text-gray-400" />
                      </a>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ── Documents ── */}
            {documents.length > 0 && (
              <div className="bg-white rounded-xl p-6">
                <h2 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <Download className="h-5 w-5 text-brand-green" />
                  Documents
                </h2>
                <div className="space-y-2">
                  {documents.map((f) => (
                    <a
                      key={f.id}
                      href={f.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg px-4 py-3 transition-colors group"
                    >
                      <FileText className="h-5 w-5 text-brand-green flex-shrink-0" />
                      <span className="text-sm text-brand-navy font-medium flex-1 truncate">
                        {f.file_name}
                      </span>
                      <Download className="h-4 w-4 text-gray-400 group-hover:text-brand-green transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Price card */}
            <div className="bg-brand-navy text-white rounded-xl p-6">
              <p className="text-gray-300 text-sm mb-1">Asking Price</p>
              <p className="text-3xl font-bold mb-1">
                £{listing.price ? Number(listing.price).toLocaleString() : "—"}
              </p>
              {listing.net_yield && (
                <p className="text-brand-green-light font-semibold text-sm mb-4">
                  {listing.net_yield}% Net Yield
                </p>
              )}
              {belowMarket > 0 && (
                <p className="text-xs text-gray-300 bg-white/10 rounded px-2 py-1 inline-block mb-4">
                  {belowMarket}% below market value
                </p>
              )}
            </div>

            {/* Enquiry form */}
            <div className="bg-white rounded-xl p-6 border border-gray-100" id="enquire">
              <h3 className="font-bold text-brand-navy mb-4">Enquire About This Property</h3>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <textarea
                  placeholder="Your message"
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                  defaultValue={`Hi, I'm interested in: ${listing.title}`}
                />
                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Enquiry
                </button>
              </form>
              {listing.whatsapp_number && (
                <a
                  href={`https://wa.me/${listing.whatsapp_number}?text=Hi, I'm interested in: ${encodeURIComponent(listing.title ?? "this property")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
