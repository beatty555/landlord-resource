import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { authors } from "@/lib/data/articles";
import { BookOpen, RefreshCw, Target, Shield, Star, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Landlord Resource",
  description: "The UK's most trusted landlord resource. Expert guides, legislation updates, and exclusive property investment opportunities.",
};

const testimonials = [
  {
    name: "Chris Hand",
    preview: "Saif and the team have been great to deal with from start to finish. We found ourselves in a tough position with an inherited property and no clue what to do — from that point on, everything was straightforward.",
    full: "Communication was clear throughout the whole process, everyone we spoke to was incredibly helpful and understanding in making things as fast as possible whilst also accommodating our difficult circumstances. Would 100% recommend these guys, we cannot say enough how grateful we are to them for helping us and giving our family the opportunity to start building our future.",
  },
  {
    name: "Chris Graham",
    preview: "I had the pleasure of working with Saif on a recent property transaction. From start to finish, he did exactly what he said he would do and was always upfront and honest throughout the process.",
    full: "Saif communicated exceptionally well, proactively keeping me informed at every step and making sure I was up to date with the progress of the deal. His professionalism and dedication made the entire experience seamless and stress-free. I really look forward to doing more business with Saif.",
  },
  {
    name: "Gurj Natt",
    preview: "Saif and the team have been nothing but excellent. Many companies promise to complete fast but always fail to deliver — this is not the case with Property Buyers Today.",
    full: "From raising the initial enquiry about the speed required for the transaction to the point of receiving the offer and completing has been astonishing. I cannot thank them enough for promising and delivering on their word.",
  },
  {
    name: "Keith Howell",
    preview: "Jack at Sell House Fast was absolutely amazing. Brilliant communication, very patient and understanding on a transaction that was not straightforward. I could not recommend Sell House Fast highly enough.",
    full: "A fair price was agreed. I had been in contact with another property buying company before Sell House Fast and the difference between the two was night and day. If you want to use a property buying company I would suggest using Sell House Fast.",
  },
  {
    name: "Rebekah Collett",
    preview: "After doing some research I contacted Sell House Fast. The process was fast, smooth and communication was excellent — a relief to be part of a straightforward process that resulted in a completed sale.",
    full: "David explained how the process worked and was entirely transparent in how the offer would be calculated. Once we decided to go ahead we were looked after by Jack who owns the company. Having had a number of failed sales including one at auction, it was a relief to finally complete.",
  },
  {
    name: "Richard Smith",
    preview: "From the very first conversation, David took the time to explain exactly how their model works. Jack stayed calm, kept things moving, and ultimately saw it through to completion with more integrity than I expected.",
    full: "There were moments where many buyers would have walked away. Jack didn\u2019t. He stayed calm, kept things moving, and ultimately saw it through to completion. Communication was brilliant throughout and, most importantly, the sale completed exactly as promised.",
  },
];

const publications = [
  "The Sun", "The Times", "The Mirror", "The Express",
  "The Scotsman", "IFA Magazine", "Yorkshire Evening Post", "Digital Journal",
];

const values = [
  {
    icon: BookOpen,
    title: "Written By Industry Insiders",
    desc: "Every guide is written or reviewed by property professionals with real hands-on experience. We don\u2019t publish anything we wouldn\u2019t stand behind ourselves.",
  },
  {
    icon: RefreshCw,
    title: "Always Up To Date",
    desc: "UK landlord legislation changes fast. We track every update so you don\u2019t have to \u2014 from the Renters Rights Bill to the latest HMRC guidance.",
  },
  {
    icon: Target,
    title: "Practical Over Theoretical",
    desc: "We focus on what landlords actually need to know and do, not lengthy legal disclaimers. Clear, actionable, and jargon-free.",
  },
  {
    icon: Shield,
    title: "Independent and Unbiased",
    desc: "We\u2019re not tied to any mortgage broker, letting agent or insurance company. Our recommendations are based on what\u2019s best for landlords.",
  },
];

const team = [
  {
    key: "saif" as const,
    role: "Property Expert and Investor Since 2015",
    tags: ["Property Investment", "HMO", "Deal Sourcing"],
  },
  {
    key: "jack" as const,
    role: "Proptech Leader With 20 Years Experience",
    tags: ["Sales", "Operations", "PropTech"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-brand-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The UK&apos;s Most Trusted Landlord Resource
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Expert guides, legislation updates, and exclusive property investment opportunities — everything landlords need in one place.
          </p>
        </div>
      </div>

      {/* Featured In */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-400 uppercase tracking-wider font-semibold mb-6">
            Our experts have been featured in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {publications.map((pub) => (
              <span key={pub} className="text-gray-400 font-semibold text-sm tracking-wide">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <div className="py-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy mb-6 text-center">Our Mission</h2>
          <div className="text-gray-600 leading-relaxed space-y-4 text-center">
            <p>
              Landlord Resource was built because navigating the UK property market as a landlord has never been harder. Legislation changes constantly, tax rules are complex, and finding reliable information is time-consuming.
            </p>
            <p>
              We created a single trusted hub where landlords can find clear, expert-led guides on everything from HMO licensing to Section 24 tax — written by people who actually work in the industry.
            </p>
            <p className="font-medium text-brand-navy">
              Our mission is simple: make being a landlord in the UK less complicated.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="pb-16">
          <h2 className="text-3xl font-bold text-brand-navy mb-10 text-center">How We Do Things</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm">
                  <div className="p-2.5 bg-brand-green/10 rounded-lg w-fit mb-4">
                    <Icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <h3 className="font-bold text-brand-navy text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="pb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-navy mb-3">Trusted by Property Owners Across the UK</h2>
            <p className="text-gray-500">Real experiences from landlords and homeowners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <details key={t.name} className="bg-white rounded-xl border border-gray-100 shadow-sm group">
                <summary className="p-6 cursor-pointer list-none">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">&ldquo;{t.preview}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-brand-navy text-sm">{t.name}</p>
                    <span className="text-xs text-brand-green font-medium group-open:hidden">Read more</span>
                  </div>
                </summary>
                <div className="px-6 pb-6 -mt-2">
                  <p className="text-gray-500 text-sm leading-relaxed">{t.full}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="pb-16">
          <h2 className="text-3xl font-bold text-brand-navy mb-10 text-center">
            Meet the Experts Behind Landlord Resource
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((t) => {
              const author = authors[t.key];
              return (
                <div key={t.key} className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-5 mb-5">
                    <Image
                      src={author.photo}
                      alt={author.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover object-top flex-shrink-0 h-24 w-24"
                    />
                    <div>
                      <h3 className="font-bold text-brand-navy text-xl">{author.name}</h3>
                      <p className="text-brand-green text-sm font-medium mt-1">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{author.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="pb-16">
          <div className="bg-brand-navy rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Get in touch</h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Questions, partnerships, or want to be featured? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
