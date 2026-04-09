"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, User } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

const navItems = [
  {
    label: "Guides",
    href: "/guides",
    dropdown: [
      { label: "Tax & Finance", href: "/guides?category=tax-finance" },
      { label: "Property Investment", href: "/guides?category=property-investment" },
      { label: "Mortgages", href: "/guides?category=mortgages" },
      { label: "HMO", href: "/guides?category=hmo" },
      { label: "Leasehold & Freehold", href: "/guides?category=leasehold-freehold" },
    ],
  },
  {
    label: "Legislation",
    href: "/legislation",
    dropdown: [
      { label: "Renters Rights Bill", href: "/legislation?category=renters-rights-bill" },
      { label: "Section 21", href: "/legislation?category=section-21" },
      { label: "Leasehold Reform", href: "/legislation?category=leasehold-reform" },
      { label: "Licensing & Compliance", href: "/legislation?category=licensing-compliance" },
      { label: "Eviction & Tenancy", href: "/legislation?category=eviction-tenancy" },
    ],
  },
  {
    label: "Templates",
    href: "/templates",
    dropdown: null,
  },
  {
    label: "Services",
    href: "/services",
    dropdown: null,
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    const supabase = createBrowserClient(url, key);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Landlord Resource"
              width={220}
              height={60}
              className="h-13 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-brand-navy font-medium text-sm transition-colors"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {item.dropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 rounded-lg shadow-lg py-1 mt-0.5">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-brand-navy hover:bg-gray-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-brand-navy font-medium hover:text-brand-green transition-colors"
              >
                <User className="h-4 w-4" />
                My Account
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-brand-navy font-medium"
              >
                Login
              </Link>
            )}
            <Link
              href="/listings"
              className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              View Listings
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block py-2 text-gray-700 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="pl-4 space-y-1">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block py-1.5 text-sm text-gray-500"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className="block py-2 text-gray-600 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {isLoggedIn ? "My Account" : "Login"}
            </Link>
            <Link
              href="/listings"
              className="block bg-brand-green text-white text-center py-2.5 rounded-lg font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              View Listings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
