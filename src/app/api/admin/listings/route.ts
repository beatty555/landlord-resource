import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*, listing_files(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ listings: data });
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
