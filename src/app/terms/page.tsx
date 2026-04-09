import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Landlord Resource terms of use.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Terms of Use</h1>
          <p className="text-gray-300">Last updated: April 2024</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 prose prose-headings:text-brand-navy prose-a:text-brand-green max-w-none">
          <p>By using landlordresource.co.uk you agree to these terms. Please read them carefully.</p>
          <h2>Use of content</h2>
          <p>All content on this website — including guides, articles, and templates — is for informational purposes only and does not constitute legal, financial, or professional advice. Always consult a qualified professional before making decisions based on content found on this site.</p>
          <h2>Templates</h2>
          <p>Templates provided on this site are offered as a starting point only. We do not guarantee they are suitable for your specific circumstances. Always have legal documents reviewed by a qualified solicitor before use.</p>
          <h2>Property listings</h2>
          <p>Property listings are provided for informational purposes. We do not act as estate agents. All property transactions should be conducted through qualified professionals. We make no warranties about the accuracy of listing information.</p>
          <h2>Accounts</h2>
          <p>You are responsible for maintaining the security of your account, including your password. We reserve the right to suspend accounts that violate these terms.</p>
          <h2>Intellectual property</h2>
          <p>All content on this site is owned by Landlord Resource unless otherwise stated. You may not reproduce, distribute, or republish any content without our written permission.</p>
          <h2>Limitation of liability</h2>
          <p>Landlord Resource is not liable for any loss or damage arising from use of this website or reliance on any content published here.</p>
          <h2>Changes to these terms</h2>
          <p>We may update these terms at any time. Continued use of the site following changes constitutes acceptance of the new terms.</p>
          <h2>Contact</h2>
          <p>Questions about these terms? Email us at <a href="mailto:hello@landlordresource.co.uk">hello@landlordresource.co.uk</a>.</p>
        </div>
      </div>
    </div>
  );
}
