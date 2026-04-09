import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { articles, authors } from "@/lib/data/articles";
import { Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Landlord Legislation",
  description: "Stay up to date with the latest UK landlord legislation — Renters Rights Bill, Section 21, leasehold reform and more.",
};

const subcategories = [
  { key: "renters-rights-bill", label: "Renters Rights Bill" },
  { key: "section-21", label: "Section 21" },
  { key: "leasehold-reform", label: "Leasehold Reform" },
  { key: "licensing-compliance", label: "Licensing & Compliance" },
  { key: "eviction-tenancy", label: "Eviction & Tenancy" },
];

export default async function LegislationPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category || null;

  const legislationArticles = articles.filter((a) => {
    if (a.category !== "legislation") return false;
    if (activeCategory) return a.subcategory === activeCategory;
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Landlord Legislation</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Stay informed with the latest UK rental law changes. We track every update so you stay compliant.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/legislation"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-brand-green text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green"
            }`}
          >
            All Legislation
          </Link>
          {subcategories.map((cat) => (
            <Link
              key={cat.key}
              href={`/legislation?category=${cat.key}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-brand-green text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-6">
          {legislationArticles.length} article{legislationArticles.length !== 1 ? "s" : ""}
          {activeCategory ? ` in ${subcategories.find((s) => s.key === activeCategory)?.label}` : ""}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legislationArticles.map((article) => (
            <Link
              key={article.id}
              href={`/legislation/${article.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {subcategories.find((s) => s.key === article.subcategory)?.label ?? "Legislation"}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-bold text-brand-navy text-base leading-snug mb-2 group-hover:text-brand-green transition-colors">
                  {article.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(article.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime} min read
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2">
                  <Image
                    src={authors[article.author].photo}
                    alt={authors[article.author].name}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-500">{authors[article.author].name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {legislationArticles.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No articles in this category yet.</p>
            <p className="text-sm mt-2">Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
