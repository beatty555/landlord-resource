import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Landlord Resource team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-gray-300 text-lg">Get in touch — we usually respond within one business day.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <form className="space-y-5" action="#" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input type="email" required className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
                <option>General enquiry</option>
                <option>Property listing enquiry</option>
                <option>Partnership / advertising</option>
                <option>Press enquiry</option>
                <option>Technical issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea rows={6} required className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none" />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
            <a href="mailto:hello@landlordresource.co.uk" className="text-brand-green text-sm hover:underline">
              hello@landlordresource.co.uk
            </a>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <p className="text-sm font-medium text-gray-700 mb-1">Response Time</p>
            <p className="text-gray-500 text-sm">Within 1 business day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
