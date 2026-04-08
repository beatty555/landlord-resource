import Link from "next/link";
import Image from "next/image";
import { getLatestArticles, authors } from "@/lib/data/articles";
import { Calendar } from "lucide-react";

export default function LatestGuides() {
  const latest = getLatestArticles(3);

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Latest Guides & Updates
          </h2>
          <p className="text-gray-500 text-lg">
            From all the latest categories — we&apos;re here to keep you informed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-brand-green text-white text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                  {article.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-navy text-base leading-snug mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(article.datePublished).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={authors[article.author].photo}
                      alt={authors[article.author].name}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-500">{authors[article.author].name}</span>
                  </div>
                  <Link
                    href={`/${article.category}/${article.slug}`}
                    className="text-brand-green hover:text-brand-green-dark text-sm font-semibold transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/guides"
            className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3.5 rounded-lg font-semibold transition-colors"
          >
            View All Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
