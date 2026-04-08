import NewsletterSignup from "@/components/ui/NewsletterSignup";

export default function HomepageNewsletter() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3">
          Stay Up to Date
        </h2>
        <p className="text-gray-500 mb-8">
          Join thousands of UK landlords getting free guides, legislation updates and investment opportunities twice a week.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterSignup />
        </div>
      </div>
    </section>
  );
}
