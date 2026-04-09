import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      `Supabase not configured: URL=${url ? "set" : "MISSING"}, SERVICE_KEY=${key ? "set" : "MISSING"}`
    );
  }

  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*, listing_files(*)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase listings query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ listings: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Listings GET error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = getAdminClient();
  const body = await req.json();
  const { files, ...listingData } = body;

  const { data: listing, error } = await supabase
    .from("listings")
    .insert(listingData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (files && files.length > 0) {
    const fileRecords = files.map(
      (f: { url: string; storagePath: string; name: string; type: string; order: number }) => ({
        listing_id: listing.id,
        file_url: f.url,
        storage_path: f.storagePath,
        file_name: f.name,
        file_type: f.type,
        display_order: f.order,
      })
    );

    const { error: fileError } = await supabase
      .from("listing_files")
      .insert(fileRecords);

    if (fileError) {
      console.error("File insert error:", fileError);
    }
  }

  return NextResponse.json({ listing }, { status: 201 });
}
