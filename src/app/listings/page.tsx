"use client";

import { useState, useMemo } from "react";
import { listings } from "@/lib/data/listings";
import ListingCard from "@/components/listings/ListingCard";
import ListingsFilters from "@/components/listings/ListingsFilters";
import { ArrowUpDown } from "lucide-react";

type SortOption = "price-high" | "price-low" | "yield-high" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-high", label: "Highest Price" },
  { value: "price-low", label: "Lowest Price" },
  { value: "yield-high", label: "Highest Yield" },
  { value: "newest", label: "Newest Listed" },
];

export default function ListingsPage() {
  const [sort, setSort] = useState<SortOption>("newest");
  const [filters, setFilters] = useState({ location: "", propertyType: "", priceRange: "", bedrooms: "" });

  const filtered = useMemo(() => {
    let result = [...listings];

    if (filters.location) result = result.filter((l) => l.city.toLowerCase() === filters.location);
    if (filters.propertyType) {
      result = result.filter((l) => {
        if (filters.propertyType === "hmo") return l.propertyType === "HMO";
        if (filters.propertyType === "flat") return l.propertyType === "Flat";
        if (filters.propertyType === "terraced") return l.propertyType === "Terraced";
        if (filters.propertyType === "semi") return l.propertyType === "Semi-Detached";
        return true;
      });
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((l) => l.price >= min && (!max || l.price <= max));
    }
    if (filters.bedrooms) {
      result = result.filter((l) => l.bedrooms >= Number(filters.bedrooms));
    }

    switch (sort) {
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "yield-high": result.sort((a, b) => b.netYield - a.netYield); break;
      case "newest": result.sort((a, b) => Number(a.id) - Number(b.id)); break;
    }

    return result;
  }, [sort, filters]);

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
            Buy-to-Let Properties For Sale
          </h1>
          <p className="text-gray-500">
            Browse our latest investment property opportunities across the UK.
          </p>
        </div>

        {/* Filters */}
        <ListingsFilters filters={filters} onChange={setFilters} />

        {/* Results bar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filtered.length}</span> of{" "}
            <span className="font-semibold">{listings.length}</span> listings
          </p>

          <div className="flex items-center gap-3">
            {/* Sort by */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500 hidden sm:inline">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Email alerts */}
            <button className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-brand-navy border border-gray-200 px-3 py-1.5 rounded-lg transition-colors bg-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Alerts
            </button>
          </div>
        </div>

        {/* Listings — single column, full-width horizontal cards */}
        {filtered.length > 0 ? (
          <div className="space-y-4 mb-12">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100 mb-12">
            <p className="text-gray-500 text-lg mb-2">No listings match your filters.</p>
            <button
              onClick={() => setFilters({ location: "", propertyType: "", priceRange: "", bedrooms: "" })}
              className="text-brand-green text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
          <h3 className="text-xl font-bold text-brand-navy mb-2">
            Looking for something specific?
          </h3>
          <p className="text-gray-500 mb-5">
            Set up email alerts and we&apos;ll notify you when new properties matching your criteria are listed.
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
