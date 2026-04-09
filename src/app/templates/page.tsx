"use client";

import { useEffect, useState } from "react";
import { FileText, Lock, Download } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

const templates = [
  {
    id: "ast",
    title: "Assured Shorthold Tenancy Agreement",
    description: "The official Government Model Tenancy Agreement for assured shorthold tenancies. Comprehensive, regularly updated, and free to download from GOV.UK.",
    category: "Tenancy",
    format: "PDF & Word",
    externalUrl: "https://www.gov.uk/government/publications/model-agreement-for-a-shorthold-assured-tenancy",
    badge: "GOV.UK",
  },
  {
    id: "section21",
    title: "Section 21 Notice (Form 6A)",
    description: "The official prescribed Form 6A for serving a valid Section 21 notice to end an assured shorthold tenancy in England. Download from GOV.UK.",
    category: "Notices",
    format: "PDF",
    externalUrl: "https://www.gov.uk/government/publications/form-6a-suitability-for-assured-shorthold-tenancy",
    badge: "GOV.UK",
    warning: "Important: Section 21 is being abolished under the Renters Rights Bill. Check current legislation before use.",
  },
  {
    id: "section8",
    title: "Section 8 Notice",
    description: "The official notice seeking possession of a property let on an assured tenancy or an assured agricultural occupancy. Download from GOV.UK.",
    category: "Notices",
    format: "PDF",
    externalUrl: "https://www.gov.uk/government/publications/form-3-notice-seeking-possession-of-a-property-let-on-an-assured-tenancy-or-an-assured-agricultural-occupancy",
    badge: "GOV.UK",
  },
  {
    id: "inventory",
    title: "Property Inventory & Schedule of Condition",
    description: "Our own detailed room-by-room inventory template covering living areas, kitchen (with utensils, crockery, cutlery), up to 6 bedrooms, bathrooms, garden and exterior. Print or save as PDF.",
    category: "Admin",
    format: "Print / PDF",
    internalUrl: "/templates/inventory",
    badge: "Landlord Resource",
  },
  {
    id: "rent-increase",
    title: "Rent Increase Notice (Form 4)",
    description: "The official Section 13 notice for proposing a new rent under an assured periodic tenancy. Download from GOV.UK.",
    category: "Notices",
    format: "PDF",
    externalUrl: "https://www.gov.uk/government/publications/form-4-landlords-notice-proposing-a-new-rent",
    badge: "GOV.UK",
  },
];

export default function TemplatesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      setIsLoggedIn(false);
      return;
    }
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, []);

  const handleDownload = (template: typeof templates[number]) => {
    if (!isLoggedIn) {
      window.location.href = "/login?next=/templates&reason=download";
      return;
    }
    if (template.externalUrl) {
      window.open(template.externalUrl, "_blank");
    } else if (template.internalUrl) {
      window.open(template.internalUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Free Landlord Templates</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Download ready-to-use templates for tenancy agreements, notices, and more. Sign in to download — it&apos;s free.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-green/10 rounded-lg flex-shrink-0">
                      <FileText className="h-6 w-6 text-brand-green" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-brand-navy text-base">{template.title}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {template.category}
                        </span>
                        {template.badge && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            template.badge === "GOV.UK" ? "bg-blue-50 text-blue-700" : "bg-brand-green/10 text-brand-green"
                          }`}>
                            {template.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{template.description}</p>
                      {template.warning && (
                        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 mb-3">
                          {template.warning}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{template.format}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(template)}
                    className="flex-shrink-0 flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {isLoggedIn === false && (
              <div className="bg-white rounded-xl p-6 border border-brand-green/30 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="h-5 w-5 text-brand-green" />
                  <h3 className="font-bold text-brand-navy">Free Member Access</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Sign in or create a free account to download all templates — no payment required.
                </p>
                <a
                  href="/login?next=/templates"
                  className="block w-full text-center bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-lg font-semibold text-sm transition-colors"
                >
                  Sign In to Download
                </a>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-4">Free Membership Includes</h3>
              <ul className="space-y-3">
                {[
                  "All template downloads",
                  "Access to all investment listings",
                  "Access to all guides",
                  "Legislation update emails",
                  "Twice weekly newsletter",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-brand-green font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
