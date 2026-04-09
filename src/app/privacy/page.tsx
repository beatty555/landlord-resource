import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Landlord Resource privacy policy — how we collect, use and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: April 2024</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 prose prose-headings:text-brand-navy prose-a:text-brand-green max-w-none">
          <p>Landlord Resource (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains what data we collect, why, and how we use it.</p>
          <h2>What data we collect</h2>
          <ul>
            <li>Email address (when you sign up for our newsletter or create an account)</li>
            <li>Name (when you submit a contact or enquiry form)</li>
            <li>Usage data (pages visited, time on site — anonymised)</li>
          </ul>
          <h2>How we use your data</h2>
          <ul>
            <li>To send you our newsletter and landlord updates (with your consent)</li>
            <li>To provide authentication and account access</li>
            <li>To respond to enquiries you submit</li>
            <li>To improve our website and content</li>
          </ul>
          <h2>Third party services</h2>
          <p>We use the following third-party services which may process your data:</p>
          <ul>
            <li><strong>Supabase</strong> — authentication and database (EU data storage)</li>
            <li><strong>Resend</strong> — email delivery</li>
            <li><strong>Cloudflare</strong> — website hosting and CDN</li>
          </ul>
          <h2>Your rights</h2>
          <p>Under UK GDPR you have the right to access, correct, or delete your personal data at any time. To exercise these rights, email us at <a href="mailto:hello@landlordresource.co.uk">hello@landlordresource.co.uk</a>.</p>
          <h2 id="cookies">Cookies</h2>
          <p>We use essential cookies only — required for authentication and basic site functionality. We do not use advertising or tracking cookies.</p>
          <h2>Contact</h2>
          <p>For any privacy queries, contact us at <a href="mailto:hello@landlordresource.co.uk">hello@landlordresource.co.uk</a>.</p>
        </div>
      </div>
    </div>
  );
}
