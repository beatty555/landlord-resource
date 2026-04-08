import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { authors } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Landlord Resource — who we are and why we built the UK's go-to hub for landlord guides, legislation and property listings.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">About Landlord Resource</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Built by landlords, for landlords. We created Landlord Resource because we couldn&apos;t find a single reliable place for everything a landlord needs.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-10">
          <h2 className="text-2xl font-bold text-brand-navy mb-5">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Landlord Resource exists to make being a landlord in the UK easier, more profitable, and fully compliant. The UK rental landscape is changing fast — the Renters Rights Bill, the abolition of Section 21, new EPC requirements — and keeping up is a full-time job on its own.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            We publish expert guides, track legislation changes, provide downloadable templates, and curate the best investment properties with tenants already in place. Everything you need, in one place.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Membership is free. No paywalls on guides or templates. We believe every landlord deserves access to the information they need to make good decisions.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-brand-navy mb-7">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {(["jack", "saif"] as const).map((key) => {
            const author = authors[key];
            return (
              <div key={key} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex gap-5">
                <Image
                  src={author.photo}
                  alt={author.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover flex-shrink-0 h-20 w-20"
                />
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">{author.name}</h3>
                  <p className="text-brand-green text-sm font-medium mb-2">Co-Founder</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{author.bio}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-brand-navy rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Get in touch</h3>
          <p className="text-gray-300 mb-5">Questions, partnerships, or want to be featured? We&apos;d love to hear from you.</p>
          <Link
            href="/contact"
            className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
