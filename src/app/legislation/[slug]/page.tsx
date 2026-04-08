import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug, getLatestArticles, articles, authors } from "@/lib/data/articles";
import { Calendar, Clock, ArrowLeft, AlertTriangle } from "lucide-react";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles
    .filter((a) => a.category === "legislation")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function LegislationArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.category !== "legislation") notFound();

  const author = authors[article.author];
  const related = getLatestArticles(3).filter((a) => a.slug !== slug);

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/legislation" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Legislation
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <img src={article.featuredImage} alt={article.title} className="w-full h-72 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span className="bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">Legislation</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(article.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime} min read</span>
                </div>

                <h1 className="text-3xl font-bold text-brand-navy mb-5 leading-tight">{article.title}</h1>

                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-100">
                  <Image src={author.photo} alt={author.name} width={48} height={48} className="rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.bio}</p>
                  </div>
                </div>

                {/* Important notice */}
                <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    This article is for informational purposes only and does not constitute legal advice. Always consult a qualified solicitor for legal guidance.
                  </p>
                </div>

                <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-brand-green">
                  <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6">{article.excerpt}</p>

                  <blockquote className="not-prose border-l-4 border-amber-400 bg-amber-50 px-6 py-4 my-8 rounded-r-lg">
                    <p className="text-brand-navy font-medium italic text-lg leading-relaxed">
                      "Understanding your legal obligations as a landlord is the foundation of a sustainable property portfolio."
                    </p>
                    <footer className="mt-3 text-sm text-gray-500">— {author.name}</footer>
                  </blockquote>

                  <p className="text-gray-600 leading-relaxed">
                    Full article content coming soon. Sign up to our newsletter below to be notified when this article is published in full.
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-8 pt-6 border-t border-gray-100">
                  Last updated: {new Date(article.dateUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-2">Stay Informed</h3>
              <p className="text-sm text-gray-500 mb-4">Get legislation updates directly to your inbox.</p>
              <NewsletterSignup />
            </div>

            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-400 text-sm" id="ad-slot-legislation-sidebar">
              Ad Space
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-4">Related Articles</h3>
              <div className="space-y-4">
                {related.map((rel) => (
                  <Link key={rel.id} href={`/${rel.category}/${rel.slug}`} className="flex gap-3 group">
                    <img src={rel.featuredImage} alt={rel.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-brand-navy group-hover:text-brand-green transition-colors leading-snug">{rel.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(rel.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
