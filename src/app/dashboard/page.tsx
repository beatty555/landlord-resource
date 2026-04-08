import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Home, BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Your Landlord Resource member dashboard.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy">Welcome back</h1>
          <p className="text-gray-500 mt-1">Your Landlord Resource member dashboard</p>
        </div>

        {/* Membership tier */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Your membership</p>
              <p className="text-xl font-bold text-brand-navy mt-0.5">Free Member</p>
              <p className="text-sm text-gray-500 mt-1">Access to all guides, legislation updates, and templates</p>
            </div>
            <Link
              href="/listings"
              className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Upgrade for Listings
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            { icon: BookOpen, title: "Guides", desc: "Browse all expert landlord guides", href: "/guides" },
            { icon: FileText, title: "Templates", desc: "Download your free templates", href: "/templates" },
            { icon: Home, title: "Listings", desc: "View investment properties", href: "/listings" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-brand-green/10 rounded-lg">
                    <Icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-brand-green transition-colors" />
                </div>
                <h3 className="font-bold text-brand-navy mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </Link>
            );
          })}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-brand-navy mb-4">Recent Downloads</h2>
          <div className="text-center py-8 text-gray-400">
            <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No downloads yet — visit the Templates page to get started.</p>
            <Link href="/templates" className="text-brand-green text-sm font-medium hover:underline mt-2 inline-block">
              Browse Templates →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
