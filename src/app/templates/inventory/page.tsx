"use client";


type Row = { item: string; number: string };
type Section = { category: string; rows: Row[] };
type Room = { name: string; sections: Section[] };

const bedroomSections = (num: string): Section[] => [
  {
    category: "Furniture",
    rows: [
      { item: "Double beds", number: "" },
      { item: "Single beds", number: "" },
      { item: "Tables", number: "" },
      { item: "Chairs", number: "" },
      { item: "Wardrobes", number: "" },
      { item: "Chest of drawers", number: "" },
      { item: "Other", number: "" },
    ],
  },
  {
    category: "Soft Furnishings",
    rows: [
      { item: "Curtains", number: "" },
      { item: "Carpets", number: "" },
      { item: "Other", number: "" },
    ],
  },
  {
    category: "Appliances",
    rows: [
      { item: "Electric fires", number: "" },
      { item: "Storage heaters", number: "" },
      { item: "Gas fires", number: "" },
      { item: "Other", number: "" },
    ],
  },
];

const rooms: Room[] = [
  {
    name: "Living Room",
    sections: [
      {
        category: "Furniture",
        rows: [
          { item: "Suites", number: "" },
          { item: "Chairs", number: "" },
          { item: "Sofas", number: "" },
          { item: "Tables", number: "" },
          { item: "Cabinets / Shelves", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Soft Furnishings",
        rows: [
          { item: "Curtains", number: "" },
          { item: "Carpets", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Appliances",
        rows: [
          { item: "TV", number: "" },
          { item: "Electric fires", number: "" },
          { item: "Gas fires", number: "" },
          { item: "Other", number: "" },
        ],
      },
    ],
  },
  {
    name: "Dining Room",
    sections: [
      {
        category: "Furniture",
        rows: [
          { item: "Chairs", number: "" },
          { item: "Tables", number: "" },
          { item: "Sideboards", number: "" },
          { item: "Cabinets / Shelves", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Soft Furnishings",
        rows: [
          { item: "Curtains", number: "" },
          { item: "Carpets", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Appliances",
        rows: [
          { item: "Electric fires", number: "" },
          { item: "Gas fires", number: "" },
          { item: "Other", number: "" },
        ],
      },
    ],
  },
  {
    name: "Family Room",
    sections: [
      {
        category: "Furniture",
        rows: [
          { item: "Chairs", number: "" },
          { item: "Sofas", number: "" },
          { item: "Tables", number: "" },
          { item: "Cabinets / Shelves", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Soft Furnishings",
        rows: [
          { item: "Curtains", number: "" },
          { item: "Carpets", number: "" },
        ],
      },
      {
        category: "Appliances",
        rows: [
          { item: "Electric fires", number: "" },
          { item: "Gas fires", number: "" },
          { item: "Other", number: "" },
        ],
      },
    ],
  },
  {
    name: "Kitchen",
    sections: [
      {
        category: "Furniture",
        rows: [
          { item: "Chairs", number: "" },
          { item: "Tables", number: "" },
          { item: "Cabinets / Shelves", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Soft Furnishings",
        rows: [
          { item: "Curtains", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Appliances",
        rows: [
          { item: "Cooker", number: "" },
          { item: "Oven", number: "" },
          { item: "Hob", number: "" },
          { item: "Dishwasher", number: "" },
          { item: "Washing machine", number: "" },
          { item: "Fridge", number: "" },
          { item: "Freezer", number: "" },
          { item: "Toaster", number: "" },
          { item: "Extractor fan", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Utensils",
        rows: [
          { item: "Saucepans", number: "" },
          { item: "Frying pans", number: "" },
          { item: "Colanders", number: "" },
          { item: "Baking trays", number: "" },
          { item: "Mixing bowls", number: "" },
          { item: "Knives", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Cutlery",
        rows: [
          { item: "Knives", number: "" },
          { item: "Forks", number: "" },
          { item: "Spoons", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Crockery",
        rows: [
          { item: "Large plates", number: "" },
          { item: "Small plates", number: "" },
          { item: "Bowls", number: "" },
          { item: "Cups & saucers", number: "" },
          { item: "Mugs", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Glasses",
        rows: [
          { item: "Tumblers", number: "" },
          { item: "Wine glasses", number: "" },
          { item: "Beer glasses", number: "" },
          { item: "Other", number: "" },
        ],
      },
    ],
  },
  {
    name: "Utility Room",
    sections: [
      { category: "Soft Furnishings", rows: [{ item: "Curtains", number: "" }] },
      {
        category: "Appliances",
        rows: [
          { item: "Washing machine", number: "" },
          { item: "Tumble drier", number: "" },
          { item: "Spin drier", number: "" },
          { item: "Other", number: "" },
        ],
      },
    ],
  },
  {
    name: "Cloakroom",
    sections: [
      { category: "Soft Furnishings", rows: [{ item: "Curtains", number: "" }] },
      { category: "Appliances", rows: [{ item: "Other", number: "" }] },
    ],
  },
  { name: "Bedroom One", sections: bedroomSections("One") },
  { name: "Bedroom Two", sections: bedroomSections("Two") },
  { name: "Bedroom Three", sections: bedroomSections("Three") },
  { name: "Bedroom Four", sections: bedroomSections("Four") },
  { name: "Bedroom Five", sections: bedroomSections("Five") },
  { name: "Bedroom Six", sections: bedroomSections("Six") },
  {
    name: "Bathroom One",
    sections: [
      { category: "Furniture", rows: [{ item: "Chairs", number: "" }, { item: "Wash baskets", number: "" }] },
      { category: "Soft Furnishings", rows: [{ item: "Curtains", number: "" }] },
      { category: "Appliances", rows: [{ item: "Other", number: "" }] },
    ],
  },
  {
    name: "Bathroom Two",
    sections: [
      { category: "Furniture", rows: [{ item: "Chairs", number: "" }, { item: "Wash baskets", number: "" }] },
      { category: "Soft Furnishings", rows: [{ item: "Curtains", number: "" }] },
      { category: "Appliances", rows: [{ item: "Other", number: "" }] },
    ],
  },
  {
    name: "Hall & Landing",
    sections: [
      {
        category: "Furniture",
        rows: [
          { item: "Cupboards", number: "" },
          { item: "Shelves", number: "" },
          { item: "Tables", number: "" },
          { item: "Chairs", number: "" },
          { item: "Telephone", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Soft Furnishings",
        rows: [
          { item: "Curtains", number: "" },
          { item: "Carpets", number: "" },
          { item: "Other", number: "" },
        ],
      },
    ],
  },
  {
    name: "Garden & Exterior",
    sections: [
      {
        category: "Garden Implements",
        rows: [
          { item: "Forks", number: "" },
          { item: "Spades", number: "" },
          { item: "Rakes", number: "" },
          { item: "Shears", number: "" },
          { item: "Lawn mower", number: "" },
          { item: "Other", number: "" },
        ],
      },
      {
        category: "Garden Furniture",
        rows: [
          { item: "Chairs", number: "" },
          { item: "Loungers", number: "" },
          { item: "Tables", number: "" },
          { item: "Parasols", number: "" },
          { item: "Other", number: "" },
        ],
      },
      { category: "Garage", rows: [{ item: "Contents", number: "" }] },
      { category: "Other", rows: [{ item: "Other", number: "" }] },
    ],
  },
];

function RoomTable({ room }: { room: Room }) {
  return (
    <div className="mb-8 break-inside-avoid-page">
      <h2 className="text-lg font-bold text-brand-navy bg-gray-100 px-4 py-2 border border-gray-300 border-b-0">
        {room.name}
      </h2>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-3 py-2 text-left w-[140px] font-semibold text-gray-700">Category</th>
            <th className="border border-gray-300 px-3 py-2 text-left w-[160px] font-semibold text-gray-700">Item</th>
            <th className="border border-gray-300 px-3 py-2 text-center w-[60px] font-semibold text-gray-700">No.</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Description & Condition</th>
          </tr>
        </thead>
        <tbody>
          {room.sections.map((section) =>
            section.rows.map((row, ri) => (
              <tr key={`${section.category}-${row.item}-${ri}`}>
                {ri === 0 && (
                  <td
                    className="border border-gray-300 px-3 py-2 text-gray-600 font-medium align-top"
                    rowSpan={section.rows.length}
                  >
                    {section.category}
                  </td>
                )}
                <td className="border border-gray-300 px-3 py-2 text-gray-700">{row.item}</td>
                <td className="border border-gray-300 px-3 py-2 text-center text-gray-400"></td>
                <td className="border border-gray-300 px-3 py-2 min-h-[2rem]"></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function InventoryTemplatePage() {
  return (
    <div className="min-h-screen bg-white print:bg-white">
      {/* Print styles */}
      <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          body { margin: 0; padding: 0; }
          .print-page { padding: 2cm 1.5cm 3cm 1.5cm !important; max-width: 100% !important; }
          .print-footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 10px; color: #999; padding: 8px; border-top: 1px solid #eee; }
          @page { margin: 0; size: A4; }
          h2 { break-after: avoid; }
          table { break-inside: auto; }
          tr { break-inside: avoid; }
        }
      `}</style>

      {/* Print button */}
      <div className="no-print bg-brand-navy py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg">Property Inventory Template</h1>
            <p className="text-gray-300 text-sm">Print or save as PDF using your browser</p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-brand-green hover:bg-brand-green-dark text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="print-page max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-navy mb-1">Property Inventory</h1>
          <p className="text-gray-500 text-sm">Schedule of Condition</p>
        </div>

        {/* Property details */}
        <div className="border border-gray-300 rounded-lg p-5 mb-8 text-sm">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex gap-2">
              <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Address:</span>
              <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Landlord:</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Tenant(s):</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Date:</span>
              <span className="w-48 border-b border-gray-300 min-h-[1.5rem]"></span>
            </div>
          </div>
        </div>

        {/* Room tables */}
        {rooms.map((room) => (
          <RoomTable key={room.name} room={room} />
        ))}

        {/* Signature section */}
        <div className="mt-10 border border-gray-300 rounded-lg p-6 text-sm break-inside-avoid-page">
          <p className="text-gray-700 mb-6">
            Having inspected the contents of the above property, I agree that the above pages represent a fair
            and accurate summary of the contents and their condition as at the date of this inventory.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-16">Signed:</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-16">Name:</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-16">Date:</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
              <p className="text-xs text-gray-400 italic">(Tenant)</p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-16">Signed:</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-16">Name:</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-16">Date:</span>
                <span className="flex-1 border-b border-gray-300 min-h-[1.5rem]"></span>
              </div>
              <p className="text-xs text-gray-400 italic">(Landlord)</p>
            </div>
          </div>
        </div>

        {/* Footer for print */}
        <div className="print-footer">landlordresource.co.uk</div>
        <p className="text-center text-xs text-gray-400 mt-8 no-print">landlordresource.co.uk</p>
      </div>
    </div>
  );
}
