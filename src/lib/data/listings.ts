export type ListingStatus = "available" | "under_offer" | "sold";
export type PropertyType = "HMO" | "Buy-to-Let" | "Semi-Detached" | "Terraced" | "Detached" | "Flat";

export interface Listing {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  openMarketValue: number;
  currentRentalIncome: number;
  expectedRentalIncome: number;
  rentalYield: number;
  netYield: number;
  bedrooms: number;
  propertyType: PropertyType;
  tenure: "freehold" | "leasehold";
  leaseYearsRemaining?: number;
  tenanted: boolean;
  mortgageable: boolean;
  suitableForHMOMortgage: boolean;
  status: ListingStatus;
  description: string;
  images: string[];
  whatsappNumber: string;
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "6-Bed Licensed HMO — Manchester City Centre",
    location: "Salford, Manchester",
    city: "Manchester",
    price: 395000,
    openMarketValue: 450000,
    currentRentalIncome: 3550,
    expectedRentalIncome: 3900,
    rentalYield: 10.8,
    netYield: 8.9,
    bedrooms: 6,
    propertyType: "HMO",
    tenure: "freehold",
    tenanted: true,
    mortgageable: true,
    suitableForHMOMortgage: true,
    status: "available",
    description:
      "A fully licensed 6-bedroom HMO in a prime Salford location, minutes from Manchester city centre. All rooms are currently tenanted with individual ASTs. The property benefits from a full HMO licence valid until 2026, with all fire safety compliance in place. Strong rental demand from young professionals and postgraduate students. Managed by a local agent — ideal for hands-off investors. 12.5% below open market value.",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    whatsappNumber: "447700900000",
  },
  {
    id: "2",
    title: "3-Bed Terraced BTL — Sheffield",
    location: "Hillsborough, Sheffield",
    city: "Sheffield",
    price: 120000,
    openMarketValue: 135000,
    currentRentalIncome: 800,
    expectedRentalIncome: 950,
    rentalYield: 8.0,
    netYield: 6.8,
    bedrooms: 3,
    propertyType: "Terraced",
    tenure: "freehold",
    tenanted: true,
    mortgageable: true,
    suitableForHMOMortgage: false,
    status: "available",
    description:
      "A solid 3-bedroom terraced property in a popular Sheffield suburb with good transport links into the city centre. Currently tenanted on a rolling AST at £800 pcm with long-term tenants in place. The property is in good decorative order and has recently had a new boiler installed. Ideal for first-time landlords or portfolio investors looking for a low entry-point with immediate income.",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    whatsappNumber: "447700900000",
  },
  {
    id: "3",
    title: "2-Bed Flat — Birmingham City Centre",
    location: "Digbeth, Birmingham",
    city: "Birmingham",
    price: 250000,
    openMarketValue: 275000,
    currentRentalIncome: 1455,
    expectedRentalIncome: 1600,
    rentalYield: 6.98,
    netYield: 5.9,
    bedrooms: 2,
    propertyType: "Flat",
    tenure: "leasehold",
    leaseYearsRemaining: 112,
    tenanted: true,
    mortgageable: true,
    suitableForHMOMortgage: false,
    status: "available",
    description:
      "A modern 2-bedroom apartment in Birmingham's thriving Digbeth quarter — one of the city's fastest growing areas. Currently tenanted at £1,455 pcm with a professional couple. The development offers concierge services, secure underground parking, and a gym. Ideal for investors seeking a low-maintenance, professionally managed asset in a high-growth area.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    ],
    whatsappNumber: "447700900000",
  },
  {
    id: "4",
    title: "2-Bed Terraced — Leeds LS6",
    location: "Headingley, Leeds",
    city: "Leeds",
    price: 95000,
    openMarketValue: 115000,
    currentRentalIncome: 700,
    expectedRentalIncome: 850,
    rentalYield: 8.84,
    netYield: 7.2,
    bedrooms: 2,
    propertyType: "Terraced",
    tenure: "freehold",
    tenanted: true,
    mortgageable: true,
    suitableForHMOMortgage: false,
    status: "available",
    description:
      "An affordable 2-bedroom terraced house in Headingley, one of Leeds' most popular rental areas due to its proximity to the universities. Currently let at £700 pcm with the option to increase to market rents on renewal. The property has been well maintained and benefits from a recently refitted kitchen. 17.4% below open market value — excellent entry point.",
    images: [
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    whatsappNumber: "447700900000",
  },
  {
    id: "5",
    title: "5-Bed Licensed HMO — Nottingham",
    location: "Lenton, Nottingham",
    city: "Nottingham",
    price: 350000,
    openMarketValue: 380000,
    currentRentalIncome: 2500,
    expectedRentalIncome: 2800,
    rentalYield: 8.57,
    netYield: 7.1,
    bedrooms: 5,
    propertyType: "HMO",
    tenure: "freehold",
    tenanted: true,
    mortgageable: true,
    suitableForHMOMortgage: true,
    status: "available",
    description:
      "A fully licensed 5-bedroom HMO in Lenton, Nottingham — a consistently strong student and professional rental market. All 5 rooms are let on individual room agreements at an average of £500 per room per month. Full fire safety compliance. The property has been recently refurbished throughout including new bathrooms and kitchen. Strong yield with upside potential on renewal.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ],
    whatsappNumber: "447700900000",
  },
  {
    id: "6",
    title: "2-Bed Semi-Detached — Liverpool",
    location: "Walton, Liverpool",
    city: "Liverpool",
    price: 180000,
    openMarketValue: 200000,
    currentRentalIncome: 975,
    expectedRentalIncome: 1100,
    rentalYield: 6.5,
    netYield: 5.5,
    bedrooms: 2,
    propertyType: "Semi-Detached",
    tenure: "freehold",
    tenanted: true,
    mortgageable: true,
    suitableForHMOMortgage: false,
    status: "available",
    description:
      "A well presented 2-bedroom semi-detached in Walton, Liverpool — a popular residential area with strong rental demand. Currently tenanted on a 12-month AST at £975 pcm with reliable tenants. The property has off-road parking and a good sized rear garden. 10% below open market value with strong capital growth potential as Liverpool's property market continues to perform.",
    images: [
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800",
    ],
    whatsappNumber: "447700900000",
  },
];

export const getListingById = (id: string) =>
  listings.find((l) => l.id === id);
