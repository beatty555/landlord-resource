import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = getAdminClient();
  const body = await req.json();
  const { files, removedFileIds, orderUpdates, ...listingData } = body;

  const { error } = await supabase
    .from("listings")
    .update({ ...listingData, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete removed files from DB (storage deletion happens separately or on-demand)
  if (removedFileIds && removedFileIds.length > 0) {
    // Get storage paths before deleting
    const { data: filesToDelete } = await supabase
      .from("listing_files")
      .select("storage_path, file_type")
      .in("id", removedFileIds);

    if (filesToDelete && filesToDelete.length > 0) {
      const byBucket: Record<string, string[]> = {};
      for (const f of filesToDelete) {
        const bucket =
          f.file_type === "image"
            ? "listing-images"
            : f.file_type === "floorplan"
            ? "listing-floorplans"
            : "listing-documents";
        if (!byBucket[bucket]) byBucket[bucket] = [];
        byBucket[bucket].push(f.storage_path);
      }
      for (const [bucket, paths] of Object.entries(byBucket)) {
        await supabase.storage.from(bucket).remove(paths);
      }
    }

    await supabase.from("listing_files").delete().in("id", removedFileIds);
  }

  // Insert new files
  if (files && files.length > 0) {
    const fileRecords = files.map(
      (f: { url: string; storagePath: string; name: string; type: string; order: number }) => ({
        listing_id: id,
        file_url: f.url,
        storage_path: f.storagePath,
        file_name: f.name,
        file_type: f.type,
        display_order: f.order,
      })
    );
    await supabase.from("listing_files").insert(fileRecords);
  }

  // Update display orders for existing files
  if (orderUpdates && orderUpdates.length > 0) {
    for (const { fileId, order } of orderUpdates) {
      await supabase
        .from("listing_files")
        .update({ display_order: order })
        .eq("id", fileId);
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = getAdminClient();

  // Get all files to delete from storage
  const { data: files } = await supabase
    .from("listing_files")
    .select("storage_path, file_type")
    .eq("listing_id", id);

  if (files && files.length > 0) {
    const byBucket: Record<string, string[]> = {};
    for (const f of files) {
      const bucket =
        f.file_type === "image"
          ? "listing-images"
          : f.file_type === "floorplan"
          ? "listing-floorplans"
          : "listing-documents";
      if (!byBucket[bucket]) byBucket[bucket] = [];
      byBucket[bucket].push(f.storage_path);
    }
    for (const [bucket, paths] of Object.entries(byBucket)) {
      await supabase.storage.from(bucket).remove(paths);
    }
  }

  // Delete listing (files cascade via FK)
  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
