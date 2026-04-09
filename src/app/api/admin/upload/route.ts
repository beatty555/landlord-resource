import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const ALLOWED_BUCKETS = ["listing-images", "listing-floorplans", "listing-documents"];

export async function POST(req: NextRequest) {
  const { filename, contentType, bucket } = await req.json();

  if (!filename || !contentType || !bucket) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  if (!ALLOWED_BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
  }

  const ext = filename.split(".").pop() ?? "bin";
  const storagePath = `${crypto.randomUUID()}.${ext}`;

  const supabase = getAdminClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(storagePath);

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to create upload URL" },
      { status: 500 }
    );
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(storagePath);

  return NextResponse.json({
    signedUrl: data.signedUrl,
    storagePath,
    publicUrl,
  });
}
