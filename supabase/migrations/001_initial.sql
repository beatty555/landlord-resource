-- Subscribers table (newsletter + free members)
create table if not exists public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  tier text not null default 'free' check (tier in ('free', 'portal')),
  subscribed boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Listings table (for when you move from static data to Supabase)
create table if not exists public.listings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  location text not null,
  city text not null,
  price integer not null,
  open_market_value integer not null,
  current_rental_income integer not null,
  expected_rental_income integer not null,
  rental_yield numeric(5,2) not null,
  net_yield numeric(5,2) not null,
  bedrooms integer not null,
  property_type text not null,
  tenure text not null default 'freehold' check (tenure in ('freehold', 'leasehold')),
  lease_years_remaining integer,
  tenanted boolean not null default true,
  mortgageable boolean not null default true,
  suitable_for_hmo_mortgage boolean not null default false,
  status text not null default 'available' check (status in ('available', 'under_offer', 'sold')),
  description text not null default '',
  images text[] not null default '{}',
  whatsapp_number text not null default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Articles table (for when you move from static data to Supabase)
create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  author text not null check (author in ('jack', 'saif')),
  date_published date not null default current_date,
  date_updated date not null default current_date,
  category text not null check (category in ('guides', 'legislation')),
  subcategory text not null,
  featured_image text not null default '',
  read_time integer not null default 5,
  content text not null default '',
  published boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS policies
alter table public.subscribers enable row level security;
alter table public.listings enable row level security;
alter table public.articles enable row level security;

-- Listings: anyone can read available listings (portal members check via app logic)
create policy "Public can read listings" on public.listings
  for select using (true);

-- Articles: anyone can read published articles
create policy "Public can read published articles" on public.articles
  for select using (published = true);

-- Subscribers: only service role can read/write
create policy "Service role only for subscribers" on public.subscribers
  using (auth.role() = 'service_role');
