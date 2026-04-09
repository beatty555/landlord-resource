import Link from "next/link";
import Image from "next/image";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo, description & social */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-white.png"
              alt="Landlord Resource"
              width={200}
              height={54}
              className="h-12 w-auto mb-5"
            />
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Your one-stop hub for landlord guides, legal updates, templates, and property services.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/property-buyers-today/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="https://www.facebook.com/p/Property-Buyers-Today-100069799429586/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">Facebook</a>
              <a href="https://www.instagram.com/pbtlincs/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">Instagram</a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Guides", href: "/guides" },
                { label: "Legislation", href: "/legislation" },
                { label: "Templates", href: "/templates" },
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Cookie Policy", href: "/privacy#cookies" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest landlord news, guides and legislation updates twice a week.
            </p>
            <NewsletterSignup dark />
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Landlord Resource. All rights reserved. landlordresource.co.uk
          <span className="block mt-2 text-gray-600 text-xs">Built by <a href="https://mediaseeds.co.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">Media Seeds Ltd</a></span>
        </div>
      </div>
    </footer>
  );
}
