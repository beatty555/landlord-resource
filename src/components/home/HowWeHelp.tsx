import Link from "next/link";
import { BookOpen, Scale, FileText } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Helpful Guides",
    description:
      "Access free expert guides for landlords covering all essential topics — from buying your first BTL to managing an HMO.",
    href: "/guides",
  },
  {
    icon: Scale,
    title: "Legal Updates",
    description:
      "Stay informed with the latest landlord legislation and compliance news. We track every change so you don't have to.",
    href: "/legislation",
  },
  {
    icon: FileText,
    title: "Useful Templates",
    description:
      "Download ready-to-use templates for tenancy agreements, notices, and more — all compliant with current UK law.",
    href: "/templates",
  },
];

export default function HowWeHelp() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            How We Help Landlords
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Providing everything landlords need to manage their rental properties efficiently and stay compliant with UK rental laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group border border-gray-100 rounded-xl p-8 hover:border-brand-green hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-green/10 rounded-lg">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="font-bold text-brand-navy text-lg">{feature.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Ad slot — homepage middle banner */}
        <div className="mt-12 h-0 overflow-hidden" id="ad-slot-homepage-middle">
          {/* Future ad banner */}
        </div>
      </div>
    </section>
  );
}
