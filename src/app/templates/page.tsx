import type { Metadata } from "next";
import { FileText, Lock, Download } from "lucide-react";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

export const metadata: Metadata = {
  title: "Free Landlord Templates",
  description: "Download free landlord templates including tenancy agreements, section 21 notices, inventory templates and more.",
};

const templates = [
  {
    id: "ast",
    title: "Assured Shorthold Tenancy Agreement",
    description: "A comprehensive AST template compliant with current UK law, covering all standard clauses including deposit protection, repair responsibilities, and notice periods.",
    category: "Tenancy",
    pages: 12,
    format: "PDF & Word",
    updated: "March 2024",
  },
  {
    id: "section21",
    title: "Section 21 Notice (Form 6A)",
    description: "The official Form 6A for serving a Section 21 notice to end a tenancy in England. Includes guidance notes on when and how to serve correctly.",
    category: "Notices",
    pages: 2,
    format: "PDF",
    updated: "April 2024",
    warning: "Important: Section 21 is being abolished. Check current legislation before use.",
  },
  {
    id: "section8",
    title: "Section 8 Notice",
    description: "Template for serving a Section 8 notice when a tenant has breached the tenancy agreement, including the grounds for possession.",
    category: "Notices",
    pages: 3,
    format: "PDF & Word",
    updated: "March 2024",
  },
  {
    id: "inventory",
    title: "Property Inventory & Schedule of Condition",
    description: "A detailed room-by-room inventory template to record the condition of your property at the start and end of a tenancy.",
    category: "Admin",
    pages: 8,
    format: "PDF & Word",
    updated: "January 2024",
  },
  {
    id: "rent-increase",
    title: "Rent Increase Notice",
    description: "A formal rent increase notice template for periodic tenancies, compliant with Section 13 of the Housing Act 1988.",
    category: "Notices",
    pages: 1,
    format: "PDF & Word",
    updated: "February 2024",
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Free Landlord Templates</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Download ready-to-use templates for tenancy agreements, notices, and more. All templates are free for registered members.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates list */}
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
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{template.description}</p>
                      {template.warning && (
                        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 mb-3">
                          ⚠️ {template.warning}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{template.pages} pages</span>
                        <span>{template.format}</span>
                        <span>Updated {template.updated}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`/templates/${template.id}.pdf`}
                    className="flex-shrink-0 flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sign up prompt */}
            <div className="bg-white rounded-xl p-6 border border-brand-green/30 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-brand-green" />
                <h3 className="font-bold text-brand-navy">Free Member Access</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                All templates are free to download. Sign up as a free member and get instant access — no payment required.
              </p>
              <NewsletterSignup label="Enter your email to download" />
            </div>

            {/* What you get */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-4">Free Membership Includes</h3>
              <ul className="space-y-3">
                {[
                  "All template downloads",
                  "Access to all guides",
                  "Legislation update emails",
                  "Twice weekly newsletter",
                  "Magic link login — no password",
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
