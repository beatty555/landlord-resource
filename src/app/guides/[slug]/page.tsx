import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug, getLatestArticles, articles, authors } from "@/lib/data/articles";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles
    .filter((a) => a.category === "guides")
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [article.featuredImage] },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.category !== "guides") notFound();

  const author = authors[article.author];
  const related = getLatestArticles(3).filter((a) => a.slug !== slug);
  const wasUpdated = article.dateUpdated !== article.datePublished;
  const displayDate = wasUpdated ? article.dateUpdated : article.datePublished;
  const dateLabel = wasUpdated ? "Updated" : "Published";

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/guides" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Guides
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span className="bg-brand-green/10 text-brand-green font-semibold px-2.5 py-1 rounded-full capitalize">
                    Guides
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {dateLabel} {new Date(displayDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime} min read
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-brand-navy mb-5 leading-tight">
                  {article.title}
                </h1>

                {/* Author — compact */}
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-100">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.shortBio}</p>
                  </div>
                </div>

                {/* Article body */}
                <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-brand-green">
                  <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6">
                    {article.excerpt}
                  </p>

                  {/* Expert quote block */}
                  <blockquote className="not-prose border-l-4 border-brand-green bg-brand-green/5 px-6 py-4 my-8 rounded-r-lg">
                    <p className="text-brand-navy font-medium italic text-lg leading-relaxed">
                      &ldquo;Staying on top of landlord legislation is not optional — it&apos;s essential for protecting your investment and your tenants.&rdquo;
                    </p>
                    <footer className="mt-3 text-sm text-gray-500">— {author.name}</footer>
                  </blockquote>

                  <p className="text-gray-600 leading-relaxed">
                    Full article content coming soon. We&apos;re currently preparing comprehensive, expert-written content for all our guides. Sign up to our newsletter to be notified when new articles are published.
                  </p>
                </div>

                {/* Author bio card */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <div className="flex gap-5 bg-gray-50 rounded-xl p-6">
                    <Image
                      src={author.photo}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover flex-shrink-0 h-20 w-20"
                    />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">About the author</p>
                      <p className="font-bold text-brand-navy text-lg">{author.name}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mt-2">{author.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-2">Stay Informed</h3>
              <p className="text-sm text-gray-500 mb-4">
                Get the latest guides and legislation updates delivered to your inbox.
              </p>
              <NewsletterSignup />
            </div>

            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-400 text-sm" id="ad-slot-article-sidebar">
              Ad Space
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-4">Related Articles</h3>
              <div className="space-y-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/${rel.category}/${rel.slug}`}
                    className="flex gap-3 group"
                  >
                    <img
                      src={rel.featuredImage}
                      alt={rel.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-brand-navy group-hover:text-brand-green transition-colors leading-snug">
                        {rel.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(rel.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </p>
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
