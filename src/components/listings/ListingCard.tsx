"use client";

import { useState } from "react";
import Link from "next/link";
import { Bed, MapPin, ChevronLeft, ChevronRight, MessageCircle, Heart, TrendingDown } from "lucide-react";
import type { Listing } from "@/lib/data/listings";

const statusConfig = {
  available: { label: "AVAILABLE", className: "bg-brand-green text-white" },
  under_offer: { label: "UNDER OFFER", className: "bg-amber-500 text-white" },
  sold: { label: "SOLD", className: "bg-gray-500 text-white" },
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const status = statusConfig[listing.status];
  const belowMarket = Math.round(((listing.openMarketValue - listing.price) / listing.openMarketValue) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col md:flex-row">
      {/* Image panel */}
      <div className="relative md:w-72 lg:w-80 flex-shrink-0 h-56 md:h-auto min-h-48 bg-gray-200 overflow-hidden">
        <img
          src={listing.images[imgIndex]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />

        {/* Status badge */}
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded ${status.className}`}>
          {status.label}
        </span>

        {/* Photo count */}
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
          {imgIndex + 1}/{listing.images.length}
        </span>

        {/* Nav arrows */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={() => setImgIndex((i) => (i - 1 + listing.images.length) % listing.images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setImgIndex((i) => (i + 1) % listing.images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Details panel */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Price row */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <span className="text-2xl font-bold text-brand-navy">
                £{listing.price.toLocaleString()}
              </span>
              {belowMarket > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                  <TrendingDown className="h-3 w-3" />
                  {belowMarket}% BMV
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-xs text-gray-400 block">NET YIELD</span>
                <span className="text-lg font-bold text-brand-green">{listing.netYield}%</span>
              </div>
              <button
                onClick={() => setSaved(!saved)}
                className={`p-2 rounded-full transition-colors ${saved ? "text-red-500" : "text-gray-300 hover:text-gray-500"}`}
              >
                <Heart className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Title & location */}
          <h3 className="font-bold text-brand-navy text-base leading-snug mb-1">{listing.title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            {listing.location}
          </div>

          {/* Key stats strip */}
          <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mb-3">
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-gray-400" />
              {listing.bedrooms} beds
            </span>
            <span className="text-gray-300">|</span>
            <span>{listing.propertyType}</span>
            <span className="text-gray-300">|</span>
            <span className="capitalize">{listing.tenure}</span>
            {listing.tenanted && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-brand-green font-medium">Tenanted</span>
              </>
            )}
          </div>

          {/* Income details */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
            <span>Current income: <strong className="text-brand-navy">£{listing.currentRentalIncome.toLocaleString()}/pcm</strong></span>
            <span>Gross yield: <strong className="text-brand-navy">{listing.rentalYield}%</strong></span>
            {listing.suitableForHMOMortgage && (
              <span className="text-brand-green font-medium">✓ HMO mortgage suitable</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/listings/${listing.id}`}
            className="flex-1 bg-brand-navy hover:bg-brand-navy/90 text-white text-center py-2.5 rounded-lg text-sm font-bold transition-colors"
          >
            Full Details
          </Link>
          <Link
            href={`/listings/${listing.id}#enquire`}
            className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white text-center py-2.5 rounded-lg text-sm font-bold transition-colors"
          >
            Enquire Now
          </Link>
          <a
            href={`https://wa.me/${listing.whatsappNumber}?text=Hi, I'm interested in: ${encodeURIComponent(listing.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1ebe5c] text-white p-2.5 rounded-lg transition-colors"
            title="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
