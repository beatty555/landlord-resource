import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden" style={{ minHeight: "480px" }}>

      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "right center" }}
        />
      </div>

      {/* Desktop: white left, fades but stays quite white on right too */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 45%, rgba(255,255,255,0.92) 65%, rgba(255,255,255,0.75) 85%, rgba(255,255,255,0.6) 100%)",
        }}
      />
      {/* Mobile: solid white overlay */}
      <div className="absolute inset-0 bg-white/85 sm:hidden" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-lg">
          <p className="text-brand-green font-semibold text-sm uppercase tracking-wide mb-4">
            UK&apos;s landlord knowledge hub
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight mb-5">
            Essential Resources<br />for Landlords
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Your one-stop hub for landlord guides, legal updates, templates, and property services.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/guides"
              className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-7 py-3.5 rounded-lg font-semibold text-base transition-colors text-center shadow-sm"
            >
              Get Started
            </Link>
            <Link
              href="/listings"
              className="inline-block border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-7 py-3.5 rounded-lg font-semibold text-base transition-colors text-center"
            >
              View Listings
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xl font-bold text-brand-navy">20+</p>
              <p className="text-xs text-gray-500">Years Property Experience</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-xl font-bold text-brand-navy">Free</p>
              <p className="text-xs text-gray-500">Always Free to Join</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-xl font-bold text-brand-navy">Weekly</p>
              <p className="text-xs text-gray-500">Legislation Updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
