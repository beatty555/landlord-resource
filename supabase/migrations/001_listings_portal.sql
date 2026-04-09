-- ============================================================
-- Landlord Resource — Listings Portal Migration
-- Run this in your Supabase SQL editor
-- ============================================================

-- ── Listings table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS listings (
  id                        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title                     text NOT NULL,
  slug                      text UNIQUE,
  location                  text,
  city                      text,
  price                     numeric,
  open_market_value         numeric,
  current_rental_income     numeric,
  expected_rental_income    numeric,
  rental_yield              numeric,
  net_yield                 numeric,
  bedrooms                  integer,
  property_type             text,
  tenure                    text DEFAULT 'freehold',
  lease_years_remaining     integer,
  tenanted                  boolean DEFAULT false,
  mortgageable              boolean DEFAULT true,
  suitable_for_hmo_mortgage boolean DEFAULT false,
  status                    text DEFAULT 'available'
                              CHECK (status IN ('available', 'under_offer', 'sold')),
  description               text,
  whatsapp_number           text DEFAULT '447700900000',
  created_at                timestamptz DEFAULT now(),
  updated_at                timestamptz DEFAULT now()
);

-- ── Listing files table ─────────────────────────────────────
-- Stores images, floorplans, and documents attached to a listing.
-- storage_path is the path within the bucket (used for deletion).
CREATE TABLE IF NOT EXISTS listing_files (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id    uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  file_url      text NOT NULL,
  storage_path  text NOT NULL,
  file_name     text NOT NULL,
  file_type     text NOT NULL CHECK (file_type IN ('image', 'floorplan', 'document')),
  display_order integer DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

-- Index for fast per-listing file lookups
CREATE INDEX IF NOT EXISTS listing_files_listing_id_idx
  ON listing_files (listing_id, file_type, display_order);

-- ── Row Level Security ──────────────────────────────────────
ALTER TABLE listings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_files ENABLE ROW LEVEL SECURITY;

-- Authenticated members can read all listings
CREATE POLICY "Members can read listings"
  ON listings FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated members can read all listing files
CREATE POLICY "Members can read listing files"
  ON listing_files FOR SELECT
  TO authenticated
  USING (true);

-- Service role bypasses RLS automatically — no extra policies needed
-- for admin write operations (the admin API routes use the service role key).

-- ── Storage buckets ─────────────────────────────────────────
-- Run these in the Supabase dashboard Storage section, or via the CLI:
--
--   supabase storage create listing-images    --public
--   supabase storage create listing-floorplans --public
--   supabase storage create listing-documents  --public
--
-- Then add the following storage policies in the dashboard:
--
-- Bucket: listing-images
--   SELECT (public read): true
--   INSERT (authenticated): true
--   DELETE (service_role): true
--
-- Bucket: listing-floorplans
--   SELECT (authenticated): true
--   INSERT (authenticated): true
--   DELETE (service_role): true
--
-- Bucket: listing-documents
--   SELECT (authenticated): true
--   INSERT (authenticated): true
--   DELETE (service_role): true
--
-- Note: listing-images is public so images load without auth tokens.
-- floorplans and documents require auth (member login).
