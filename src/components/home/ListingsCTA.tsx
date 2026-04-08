import Link from "next/link";

export default function ListingsCTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Browse Our Latest Investment Properties
        </h2>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Access tenanted buy-to-let properties with immediate rental income potential. All listings are carefully selected for yield and capital growth.
        </p>
        <Link
          href="/listings"
          className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors shadow-sm"
        >
          View Listings
        </Link>
      </div>
    </section>
  );
}
