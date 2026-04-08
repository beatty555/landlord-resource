"use client";

interface Filters {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

interface ListingsFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function ListingsFilters({ filters, onChange }: ListingsFiltersProps) {
  const update = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5">
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
        >
          <option value="">Location</option>
          <option value="manchester">Manchester</option>
          <option value="sheffield">Sheffield</option>
          <option value="birmingham">Birmingham</option>
          <option value="leeds">Leeds</option>
          <option value="nottingham">Nottingham</option>
          <option value="liverpool">Liverpool</option>
        </select>

        <select
          value={filters.propertyType}
          onChange={(e) => update("propertyType", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
        >
          <option value="">Property Type</option>
          <option value="hmo">HMO</option>
          <option value="terraced">Terraced</option>
          <option value="semi">Semi-Detached</option>
          <option value="flat">Flat</option>
        </select>

        <select
          value={filters.priceRange}
          onChange={(e) => update("priceRange", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
        >
          <option value="">Price Range</option>
          <option value="0-150000">Up to £150k</option>
          <option value="150000-300000">£150k – £300k</option>
          <option value="300000-500000">£300k – £500k</option>
          <option value="500000-9999999">£500k+</option>
        </select>

        <select
          value={filters.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
        >
          <option value="">Min Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>

        <button
          onClick={() => onChange({ location: "", propertyType: "", priceRange: "", bedrooms: "" })}
          className={`text-sm px-3 py-2.5 transition-colors ${hasFilters ? "text-brand-green hover:text-brand-green-dark font-medium" : "text-gray-300 cursor-default"}`}
          disabled={!hasFilters}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
