"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { articles } from "@/lib/data/articles";
import ListingForm, { type SupabaseListing } from "@/components/admin/ListingForm";

type AdminTab = "listings" | "add-listing" | "articles" | "add-article" | "newsletter";

// ── Article form ─────────────────────────────────────────────
const emptyArticle = {
  slug: "",
  title: "",
  excerpt: "",
  author: "jack",
  category: "guides",
  subcategory: "tax-finance",
  featuredImage: "",
  readTime: "8",
  content: "",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ── Admin panel ─────────────────────────────────────────────
export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>("listings");

  // ── Listings state ────────────────────────────────────────
  const [listings, setListings] = useState<SupabaseListing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [listingsError, setListingsError] = useState<string | null>(null);
  const [editingListing, setEditingListing] = useState<SupabaseListing | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // ── Article state ─────────────────────────────────────────
  const [article, setArticle] = useState({ ...emptyArticle });
  const [articleSubmitted, setArticleSubmitted] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchListings = async () => {
    setListingsLoading(true);
    setListingsError(null);
    try {
      const res = await fetch("/api/admin/listings");
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTTP ${res.status}: ${body}`);
      }
      const data = await res.json();
      setListings(data.listings ?? []);
    } catch (err) {
      setListingsError(err instanceof Error ? err.message : "Error loading listings");
    } finally {
      setListingsLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "listings") fetchListings();
  }, [tab]);

  const handleDeleteListing = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/listings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleListingFormSuccess = () => {
    setEditingListing(null);
    setTab("listings");
  };

  // ── Article form ──────────────────────────────────────────
  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = String(Date.now());
    const slug = article.slug || slugify(article.title);
    const today = new Date().toISOString().split("T")[0];

    const obj = `  {
    id: "${id}",
    slug: "${slug}",
    title: "${article.title}",
    excerpt: "${article.excerpt.replace(/"/g, '\\"')}",
    author: "${article.author}",
    datePublished: "${today}",
    dateUpdated: "${today}",
    category: "${article.category}",
    subcategory: "${article.subcategory}",
    featuredImage: "${article.featuredImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"}",
    readTime: ${article.readTime},
    content: \`${article.content || "Full article content coming soon."}\`,
  },`;

    setGeneratedArticle(obj);
    setArticleSubmitted(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { key: AdminTab; label: string }[] = [
    { key: "listings", label: "All Listings" },
    { key: "add-listing", label: "+ Add Listing" },
    { key: "articles", label: "All Articles" },
    { key: "add-article", label: "+ Add Article" },
    { key: "newsletter", label: "Newsletter" },
  ];

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Admin Panel — Landlord Resource</h1>
        <span className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full">
          Internal use only
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-white border border-gray-200 rounded-lg p-1 w-fit mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setArticleSubmitted(false);
                setEditingListing(null);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-brand-green text-white"
                  : "text-gray-600 hover:text-brand-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── All Listings ── */}
        {tab === "listings" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-brand-navy">
                Property Listings
                {!listingsLoading && (
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    ({listings.length})
                  </span>
                )}
              </h2>
              <button
                onClick={() => setTab("add-listing")}
                className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" /> Add Listing
              </button>
            </div>

            {listingsLoading ? (
              <div className="flex items-center gap-3 text-gray-400 py-12">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading listings from database...</span>
              </div>
            ) : listingsError ? (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-5 text-red-700">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Could not load listings</p>
                  <p className="text-xs mt-0.5">{listingsError}</p>
                  <p className="text-xs mt-1 text-red-500">
                    Make sure Supabase env vars are configured and the migration has been run.
                  </p>
                  <button
                    onClick={fetchListings}
                    className="mt-2 text-xs font-medium underline"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-400 mb-3">No listings yet.</p>
                <button
                  onClick={() => setTab("add-listing")}
                  className="bg-brand-green text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
                >
                  Add First Listing
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                      <th className="text-left px-5 py-3">Property</th>
                      <th className="text-left px-5 py-3">Price</th>
                      <th className="text-left px-5 py-3">Net Yield</th>
                      <th className="text-left px-5 py-3">Status</th>
                      <th className="text-left px-5 py-3">Files</th>
                      <th className="px-5 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((l) => (
                      <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <p className="font-medium text-brand-navy text-sm">{l.title}</p>
                          <p className="text-xs text-gray-400">{l.location}</p>
                        </td>
                        <td className="px-5 py-4 text-sm font-medium">
                          {l.price ? `£${Number(l.price).toLocaleString()}` : "—"}
                        </td>
                        <td className="px-5 py-4 text-sm text-brand-green font-medium">
                          {l.net_yield ? `${l.net_yield}%` : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              l.status === "available"
                                ? "bg-green-100 text-green-700"
                                : l.status === "under_offer"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {(l.status ?? "unknown").replace("_", " ").toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-400">
                          {l.listing_files?.length ?? 0} file
                          {(l.listing_files?.length ?? 0) !== 1 ? "s" : ""}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => {
                                setEditingListing(l);
                                setTab("add-listing");
                              }}
                              className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-navy border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </button>
                            {confirmDeleteId === l.id ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-red-600 font-medium">Sure?</span>
                                <button
                                  onClick={() => handleDeleteListing(l.id)}
                                  disabled={deletingId === l.id}
                                  className="text-xs bg-red-500 text-white px-2.5 py-1.5 rounded-lg disabled:opacity-60"
                                >
                                  {deletingId === l.id ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    "Delete"
                                  )}
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="text-xs text-gray-400 hover:text-gray-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteId(l.id)}
                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Add / Edit Listing ── */}
        {tab === "add-listing" && (
          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-6">
              {editingListing ? `Edit: ${editingListing.title}` : "Add New Property Listing"}
            </h2>
            <ListingForm
              listing={editingListing ?? undefined}
              onSuccess={handleListingFormSuccess}
              onCancel={() => {
                setEditingListing(null);
                setTab("listings");
              }}
            />
          </div>
        )}

        {/* ── All Articles ── */}
        {tab === "articles" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-brand-navy">Articles ({articles.length})</h2>
              <button
                onClick={() => setTab("add-article")}
                className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" /> New Article
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                    <th className="text-left px-5 py-3">Title</th>
                    <th className="text-left px-5 py-3">Category</th>
                    <th className="text-left px-5 py-3">Author</th>
                    <th className="text-left px-5 py-3">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a) => (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <p className="font-medium text-brand-navy text-sm">{a.title}</p>
                        <p className="text-xs text-gray-400">
                          /{a.category}/{a.slug}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs capitalize bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {a.subcategory}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600 capitalize">{a.author}</td>
                      <td className="px-5 py-3 text-sm text-gray-500">
                        {new Date(a.datePublished).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Add Article ── */}
        {tab === "add-article" && (
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Add New Article</h2>

            {articleSubmitted ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-green-800">Article generated!</p>
                    <p className="text-sm text-green-700 mt-0.5">
                      Copy the code below and paste it into{" "}
                      <code className="bg-green-100 px-1 rounded">src/lib/data/articles.ts</code>{" "}
                      inside the <code className="bg-green-100 px-1 rounded">articles</code> array.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 text-xs p-5 rounded-xl overflow-auto max-h-96 leading-relaxed whitespace-pre-wrap">
                    {generatedArticle}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(generatedArticle)}
                    className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setArticle({ ...emptyArticle });
                    setArticleSubmitted(false);
                  }}
                  className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Add Another Article
                </button>
              </div>
            ) : (
              <form onSubmit={handleArticleSubmit} className="space-y-5">
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Article Title *
                    </label>
                    <input
                      required
                      value={article.title}
                      onChange={(e) =>
                        setArticle({
                          ...article,
                          title: e.target.value,
                          slug: slugify(e.target.value),
                        })
                      }
                      placeholder="e.g. How to Set Up a Limited Company for Buy-to-Let"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                    <input
                      value={article.slug}
                      onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                      className={`${inputCls} font-mono text-gray-500`}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Auto-generated from title. URL will be: /guides/
                      {article.slug || "your-slug-here"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Excerpt / Meta Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={article.excerpt}
                      onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                      placeholder="A 1-2 sentence summary of the article."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                      <select
                        value={article.author}
                        onChange={(e) => setArticle({ ...article, author: e.target.value })}
                        className={`${inputCls} bg-white`}
                      >
                        <option value="jack">Jack Malnick</option>
                        <option value="saif">Saif Derzi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Read Time (mins)
                      </label>
                      <input
                        type="number"
                        value={article.readTime}
                        onChange={(e) => setArticle({ ...article, readTime: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={article.category}
                        onChange={(e) => setArticle({ ...article, category: e.target.value })}
                        className={`${inputCls} bg-white`}
                      >
                        <option value="guides">Guides</option>
                        <option value="legislation">Legislation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subcategory
                      </label>
                      <select
                        value={article.subcategory}
                        onChange={(e) => setArticle({ ...article, subcategory: e.target.value })}
                        className={`${inputCls} bg-white`}
                      >
                        <option value="tax-finance">Tax & Finance</option>
                        <option value="property-investment">Property Investment</option>
                        <option value="mortgages">Mortgages</option>
                        <option value="hmo">HMO</option>
                        <option value="leasehold-freehold">Leasehold & Freehold</option>
                        <option value="eviction-tenancy">Eviction & Tenancy</option>
                        <option value="licensing-compliance">Licensing & Compliance</option>
                        <option value="renters-rights-bill">Renters Rights Bill</option>
                        <option value="section-21">Section 21</option>
                        <option value="leasehold-reform">Leasehold Reform</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Featured Image URL
                    </label>
                    <input
                      value={article.featuredImage}
                      onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Article Content
                    </label>
                    <textarea
                      rows={12}
                      value={article.content}
                      onChange={(e) => setArticle({ ...article, content: e.target.value })}
                      placeholder="Write the full article here. You can use basic HTML tags like <h2>, <p>, <ul>, <li>, <strong>."
                      className={`${inputCls} resize-y font-mono`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3.5 rounded-lg font-semibold transition-colors"
                >
                  Generate Article Code
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── Newsletter ── */}
        {tab === "newsletter" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-brand-navy mb-5">Send Newsletter</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject line
                </label>
                <input
                  type="text"
                  placeholder="e.g. This week: Renters Rights Bill update + 3 new guides"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Body</label>
                <textarea
                  rows={10}
                  placeholder="Newsletter content..."
                  className={`${inputCls} resize-none`}
                />
              </div>
              <div className="flex gap-3">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Send Test Email
                </button>
                <button className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Send to All Subscribers
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
