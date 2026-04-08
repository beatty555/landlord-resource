import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getListingById, listings } from "@/lib/data/listings";
import { Bed, MapPin, PoundSterling, MessageCircle, TrendingUp, Home, CheckCircle, XCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return {};
  return {
    title: listing.title,
    description: `${listing.propertyType} in ${listing.location}. Asking £${listing.price.toLocaleString()} — ${listing.netYield}% net yield.`,
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const belowMarket = Math.round(
    ((listing.openMarketValue - listing.price) / listing.openMarketValue) * 100
  );

  const statusConfig = {
    available: { label: "AVAILABLE", className: "bg-brand-green text-white" },
    under_offer: { label: "UNDER OFFER", className: "bg-amber-500 text-white" },
    sold: { label: "SOLD", className: "bg-gray-500 text-white" },
  };
  const status = statusConfig[listing.status];

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo gallery */}
            <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
              <div className="col-span-2">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-72 object-cover"
                />
              </div>
              {listing.images.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${listing.title} ${i + 2}`}
                  className="w-full h-40 object-cover"
                />
              ))}
            </div>

            {/* Title & status */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold text-brand-navy">{listing.title}</h1>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${status.className}`}>
                  {status.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-5">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Asking Price", value: `£${listing.price.toLocaleString()}` },
                  { label: "Open Market Value", value: `£${listing.openMarketValue.toLocaleString()}` },
                  { label: "Below Market Value", value: `${belowMarket}%`, highlight: true },
                  { label: "Current Rental (pcm)", value: `£${listing.currentRentalIncome.toLocaleString()}` },
                  { label: "Expected Rental (pcm)", value: `£${listing.expectedRentalIncome.toLocaleString()}` },
                  { label: "Net Yield", value: `${listing.netYield}%`, highlight: true },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className={`text-lg font-bold ${item.highlight ? "text-brand-green" : "text-brand-navy"}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <h2 className="font-bold text-brand-navy mb-3">Property Details</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Property Type", value: listing.propertyType },
                  { label: "Bedrooms", value: `${listing.bedrooms} bedrooms` },
                  { label: "Tenure", value: listing.tenure === "leasehold" ? `Leasehold (${listing.leaseYearsRemaining} yrs)` : "Freehold" },
                  { label: "Status", value: listing.tenanted ? "Tenanted" : "Vacant" },
                  { label: "Mortgageable", value: listing.mortgageable ? "Yes" : "No" },
                  { label: "HMO Mortgage", value: listing.suitableForHMOMortgage ? "Yes" : "No" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between border-b border-gray-100 py-2">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-medium text-brand-navy">{item.value}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-bold text-brand-navy mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Price card */}
            <div className="bg-brand-navy text-white rounded-xl p-6">
              <p className="text-gray-300 text-sm mb-1">Asking Price</p>
              <p className="text-3xl font-bold mb-1">£{listing.price.toLocaleString()}</p>
              <p className="text-brand-green-light font-semibold text-sm mb-4">
                {listing.netYield}% Net Yield
              </p>
              {belowMarket > 0 && (
                <p className="text-xs text-gray-300 bg-white/10 rounded px-2 py-1 inline-block mb-4">
                  {belowMarket}% below market value
                </p>
              )}
            </div>

            {/* Enquire form */}
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
              <a
                href={`https://wa.me/${listing.whatsappNumber}?text=Hi, I'm interested in: ${encodeURIComponent(listing.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white py-3 rounded-lg font-semibold transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
