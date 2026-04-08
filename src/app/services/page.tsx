import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Landlord Services",
  description: "Vetted services for UK landlords — specialist accountants, solicitors, mortgage brokers and more.",
};

const serviceCategories = [
  {
    title: "Specialist Accountants",
    description: "Accountants who specialise in landlord tax and property investment.",
    services: [
      { name: "Property Tax Specialists", description: "Expert tax advice for landlords — corporation tax, income tax, CGT and more.", badge: "Recommended" },
      { name: "BTL Accountancy", description: "Dedicated buy-to-let accounting services for portfolio landlords." },
    ],
  },
  {
    title: "Solicitors",
    description: "Legal specialists for landlord-tenant law and property conveyancing.",
    services: [
      { name: "Landlord Legal", description: "Specialist landlord solicitors handling evictions, disputes and lease drafting.", badge: "Recommended" },
      { name: "Property Conveyancing Experts", description: "Fast, reliable conveyancing for investment property purchases." },
    ],
  },
  {
    title: "Mortgage Brokers",
    description: "Brokers who specialise in buy-to-let and HMO mortgages.",
    services: [
      { name: "BTL Mortgage Hub", description: "Whole-of-market buy-to-let mortgage brokers with access to specialist HMO products.", badge: "Recommended" },
      { name: "HMO Finance Specialists", description: "Dedicated HMO mortgage advice for portfolio landlords and first-time HMO buyers." },
    ],
  },
  {
    title: "Letting Agents",
    description: "Trusted letting agents and property management services.",
    services: [
      { name: "National Lettings Network", description: "Vetted letting agents across the UK with transparent fee structures." },
      { name: "HMO Management Co.", description: "Specialist HMO management — from licensing to tenant sourcing and maintenance." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Landlord Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Vetted third-party services recommended for UK landlords. We only list services we&apos;d use ourselves.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-sm text-gray-500 mb-8 bg-white border border-gray-100 rounded-lg p-4">
          <strong>Disclosure:</strong> Some links on this page may be affiliate links. We may receive a commission if you use a service — at no extra cost to you. We only list services we believe provide genuine value to landlords.
        </p>

        <div className="space-y-10">
          {serviceCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-2xl font-bold text-brand-navy mb-2">{category.title}</h2>
              <p className="text-gray-500 mb-5">{category.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.services.map((service) => (
                  <div key={service.name} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-brand-navy">{service.name}</h3>
                      {service.badge && (
                        <span className="text-xs bg-brand-green/10 text-brand-green font-semibold px-2.5 py-1 rounded-full">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-dark text-sm font-semibold transition-colors"
                    >
                      Visit Website <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partner CTA */}
        <div className="mt-14 bg-white rounded-xl p-8 border border-gray-100 text-center">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Want to be listed?</h3>
          <p className="text-gray-500 mb-5 max-w-xl mx-auto">
            If you provide a service for landlords and would like to be considered for listing, get in touch. We review all applications carefully.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
