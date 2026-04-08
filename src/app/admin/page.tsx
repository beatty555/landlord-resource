"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { listings as initialListings } from "@/lib/data/listings";
import { articles } from "@/lib/data/articles";

type AdminTab = "listings" | "add-listing" | "articles" | "add-article" | "newsletter";

const emptyListing = {
  title: "",
  location: "",
  city: "",
  price: "",
  openMarketValue: "",
  currentRentalIncome: "",
  expectedRentalIncome: "",
  netYield: "",
  rentalYield: "",
  bedrooms: "",
  propertyType: "Buy-to-Let",
  tenure: "freehold",
  leaseYearsRemaining: "",
  tenanted: true,
  mortgageable: true,
  suitableForHMOMortgage: false,
  status: "available",
  description: "",
  images: "",
  whatsappNumber: "447700900000",
};

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

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("listings");
  const [listing, setListing] = useState({ ...emptyListing });
  const [article, setArticle] = useState({ ...emptyArticle });
  const [listingSubmitted, setListingSubmitted] = useState(false);
  const [articleSubmitted, setArticleSubmitted] = useState(false);
  const [generatedListing, setGeneratedListing] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [copied, setCopied] = useState(false);

  const handleListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = String(Date.now());
    const belowMarket = listing.openMarketValue
      ? Math.round(((Number(listing.openMarketValue) - Number(listing.price)) / Number(listing.openMarketValue)) * 100)
      : 0;

    const images = listing.images
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const obj = `  {
    id: "${id}",
    title: "${listing.title}",
    location: "${listing.location}",
    city: "${listing.city}",
    price: ${listing.price},
    openMarketValue: ${listing.openMarketValue || listing.price},
    currentRentalIncome: ${listing.currentRentalIncome},
    expectedRentalIncome: ${listing.expectedRentalIncome},
    rentalYield: ${listing.rentalYield},
    netYield: ${listing.netYield},
    bedrooms: ${listing.bedrooms},
    propertyType: "${listing.propertyType}",
    tenure: "${listing.tenure}",${listing.tenure === "leasehold" && listing.leaseYearsRemaining ? `\n    leaseYearsRemaining: ${listing.leaseYearsRemaining},` : ""}
    tenanted: ${listing.tenanted},
    mortgageable: ${listing.mortgageable},
    suitableForHMOMortgage: ${listing.suitableForHMOMortgage},
    status: "${listing.status}",
    description: "${listing.description.replace(/"/g, '\\"')}",
    images: [${images.map((u) => `"${u}"`).join(", ")}],
    whatsappNumber: "${listing.whatsappNumber}",
  },`;

    setGeneratedListing(obj);
    setListingSubmitted(true);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Admin Panel — Landlord Resource</h1>
        <span className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full">Internal use only</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 bg-white border border-gray-200 rounded-lg p-1 w-fit mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setListingSubmitted(false); setArticleSubmitted(false); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t.key ? "bg-brand-green text-white" : "text-gray-600 hover:text-brand-navy"
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
              <h2 className="text-xl font-bold text-brand-navy">Property Listings ({initialListings.length})</h2>
              <button onClick={() => setTab("add-listing")} className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                <Plus className="h-4 w-4" /> Add Listing
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
                    <th className="text-left px-5 py-3">Property</th>
                    <th className="text-left px-5 py-3">Price</th>
                    <th className="text-left px-5 py-3">Net Yield</th>
                    <th className="text-left px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {initialListings.map((l) => (
                    <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-medium text-brand-navy text-sm">{l.title}</p>
                        <p className="text-xs text-gray-400">{l.location}</p>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium">£{l.price.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sm text-brand-green font-medium">{l.netYield}%</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          l.status === "available" ? "bg-green-100 text-green-700" :
                          l.status === "under_offer" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {l.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Add Listing ── */}
        {tab === "add-listing" && (
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Add New Property Listing</h2>

            {listingSubmitted ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-green-800">Listing generated!</p>
                    <p className="text-sm text-green-700 mt-0.5">Copy the code below and paste it into <code className="bg-green-100 px-1 rounded">src/lib/data/listings.ts</code> inside the <code className="bg-green-100 px-1 rounded">listings</code> array.</p>
                  </div>
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 text-xs p-5 rounded-xl overflow-auto max-h-96 leading-relaxed">{generatedListing}</pre>
                  <button
                    onClick={() => copyToClipboard(generatedListing)}
                    className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <button onClick={() => { setListing({ ...emptyListing }); setListingSubmitted(false); }} className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Add Another Listing
                </button>
              </div>
            ) : (
              <form onSubmit={handleListingSubmit} className="space-y-5">
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Property Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Listing Title *</label>
                    <input required value={listing.title} onChange={(e) => setListing({ ...listing, title: e.target.value })} placeholder="e.g. 4-Bed Licensed HMO — Manchester" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Location *</label>
                      <input required value={listing.location} onChange={(e) => setListing({ ...listing, location: e.target.value })} placeholder="e.g. Salford, Manchester" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input required value={listing.city} onChange={(e) => setListing({ ...listing, city: e.target.value })} placeholder="e.g. Manchester" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                      <select value={listing.propertyType} onChange={(e) => setListing({ ...listing, propertyType: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
                        {["HMO", "Buy-to-Let", "Terraced", "Semi-Detached", "Detached", "Flat"].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
                      <input required type="number" value={listing.bedrooms} onChange={(e) => setListing({ ...listing, bedrooms: e.target.value })} placeholder="4" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tenure</label>
                      <select value={listing.tenure} onChange={(e) => setListing({ ...listing, tenure: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
                        <option value="freehold">Freehold</option>
                        <option value="leasehold">Leasehold</option>
                      </select>
                    </div>
                    {listing.tenure === "leasehold" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lease Years Remaining</label>
                        <input type="number" value={listing.leaseYearsRemaining} onChange={(e) => setListing({ ...listing, leaseYearsRemaining: e.target.value })} placeholder="125" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Financials</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Asking Price (£) *</label>
                      <input required type="number" value={listing.price} onChange={(e) => setListing({ ...listing, price: e.target.value })} placeholder="250000" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Open Market Value (£)</label>
                      <input type="number" value={listing.openMarketValue} onChange={(e) => setListing({ ...listing, openMarketValue: e.target.value })} placeholder="280000" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Rent (pcm £) *</label>
                      <input required type="number" value={listing.currentRentalIncome} onChange={(e) => setListing({ ...listing, currentRentalIncome: e.target.value })} placeholder="1500" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Rent (pcm £)</label>
                      <input type="number" value={listing.expectedRentalIncome} onChange={(e) => setListing({ ...listing, expectedRentalIncome: e.target.value })} placeholder="1700" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gross Yield (%)</label>
                      <input type="number" step="0.01" value={listing.rentalYield} onChange={(e) => setListing({ ...listing, rentalYield: e.target.value })} placeholder="7.2" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Net Yield (%) *</label>
                      <input required type="number" step="0.01" value={listing.netYield} onChange={(e) => setListing({ ...listing, netYield: e.target.value })} placeholder="6.0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Status & Options</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Listing Status</label>
                      <select value={listing.status} onChange={(e) => setListing({ ...listing, status: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
                        <option value="available">Available</option>
                        <option value="under_offer">Under Offer</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                      <input value={listing.whatsappNumber} onChange={(e) => setListing({ ...listing, whatsappNumber: e.target.value })} placeholder="447700900000" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    {[
                      { key: "tenanted", label: "Tenanted" },
                      { key: "mortgageable", label: "Mortgageable" },
                      { key: "suitableForHMOMortgage", label: "Suitable for HMO Mortgage" },
                    ].map((opt) => (
                      <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={listing[opt.key as keyof typeof listing] as boolean}
                          onChange={(e) => setListing({ ...listing, [opt.key]: e.target.checked })}
                          className="w-4 h-4 accent-brand-green"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Description & Photos</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Description *</label>
                    <textarea required rows={5} value={listing.description} onChange={(e) => setListing({ ...listing, description: e.target.value })} placeholder="Describe the property, investment highlights, location..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo URLs (one per line)</label>
                    <textarea rows={4} value={listing.images} onChange={(e) => setListing({ ...listing, images: e.target.value })} placeholder={"https://yourdomain.com/photo1.jpg\nhttps://yourdomain.com/photo2.jpg"} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none font-mono" />
                    <p className="text-xs text-gray-400 mt-1">Upload photos to your hosting first, then paste the URLs here.</p>
                  </div>
                </div>

                <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3.5 rounded-lg font-semibold transition-colors">
                  Generate Listing Code
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── All Articles ── */}
        {tab === "articles" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-brand-navy">Articles ({articles.length})</h2>
              <button onClick={() => setTab("add-article")} className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
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
                        <p className="text-xs text-gray-400">/{a.category}/{a.slug}</p>
                      </td>
                      <td className="px-5 py-3"><span className="text-xs capitalize bg-gray-100 text-gray-600 px-2 py-1 rounded">{a.subcategory}</span></td>
                      <td className="px-5 py-3 text-sm text-gray-600 capitalize">{a.author}</td>
                      <td className="px-5 py-3 text-sm text-gray-500">{new Date(a.datePublished).toLocaleDateString("en-GB")}</td>
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
                    <p className="text-sm text-green-700 mt-0.5">Copy the code below and paste it into <code className="bg-green-100 px-1 rounded">src/lib/data/articles.ts</code> inside the <code className="bg-green-100 px-1 rounded">articles</code> array.</p>
                  </div>
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-green-400 text-xs p-5 rounded-xl overflow-auto max-h-96 leading-relaxed whitespace-pre-wrap">{generatedArticle}</pre>
                  <button onClick={() => copyToClipboard(generatedArticle)} className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <button onClick={() => { setArticle({ ...emptyArticle }); setArticleSubmitted(false); }} className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Add Another Article
                </button>
              </div>
            ) : (
              <form onSubmit={handleArticleSubmit} className="space-y-5">
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Article Title *</label>
                    <input required value={article.title} onChange={(e) => setArticle({ ...article, title: e.target.value, slug: slugify(e.target.value) })} placeholder="e.g. How to Set Up a Limited Company for Buy-to-Let" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                    <input value={article.slug} onChange={(e) => setArticle({ ...article, slug: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green font-mono text-gray-500" />
                    <p className="text-xs text-gray-400 mt-1">Auto-generated from title. URL will be: /guides/{article.slug || "your-slug-here"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt / Meta Description *</label>
                    <textarea required rows={3} value={article.excerpt} onChange={(e) => setArticle({ ...article, excerpt: e.target.value })} placeholder="A 1-2 sentence summary of the article. This appears in listings and Google." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                      <select value={article.author} onChange={(e) => setArticle({ ...article, author: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
                        <option value="jack">Jack Malnick</option>
                        <option value="saif">Saif Derzi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (mins)</label>
                      <input type="number" value={article.readTime} onChange={(e) => setArticle({ ...article, readTime: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select value={article.category} onChange={(e) => setArticle({ ...article, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
                        <option value="guides">Guides</option>
                        <option value="legislation">Legislation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                      <select value={article.subcategory} onChange={(e) => setArticle({ ...article, subcategory: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green bg-white">
                        <option value="tax-finance">Tax & Finance</option>
                        <option value="property-investment">Property Investment</option>
                        <option value="mortgages">Mortgages</option>
                        <option value="hmo">HMO</option>
                        <option value="insurance">Insurance</option>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                    <input value={article.featuredImage} onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Article Content</label>
                    <textarea rows={12} value={article.content} onChange={(e) => setArticle({ ...article, content: e.target.value })} placeholder="Write the full article here. You can use basic HTML tags like <h2>, <p>, <ul>, <li>, <strong>." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-y font-mono" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3.5 rounded-lg font-semibold transition-colors">
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject line</label>
                <input type="text" placeholder="e.g. This week: Renters Rights Bill update + 3 new guides" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Body</label>
                <textarea rows={10} placeholder="Newsletter content..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green resize-none" />
              </div>
              <div className="flex gap-3">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">Send Test Email</button>
                <button className="bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">Send to All Subscribers</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
