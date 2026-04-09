"use client";

import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, GripVertical, FileText, Image as ImageIcon, File } from "lucide-react";

export interface SupabaseListing {
  id: string;
  title: string | null;
  slug: string | null;
  location: string | null;
  city: string | null;
  price: number | null;
  open_market_value: number | null;
  current_rental_income: number | null;
  expected_rental_income: number | null;
  rental_yield: number | null;
  net_yield: number | null;
  bedrooms: number | null;
  property_type: string | null;
  tenure: string | null;
  lease_years_remaining: number | null;
  tenanted: boolean | null;
  mortgageable: boolean | null;
  suitable_for_hmo_mortgage: boolean | null;
  status: string | null;
  description: string | null;
  whatsapp_number: string | null;
  listing_files?: SupabaseFile[];
}

export interface SupabaseFile {
  id: string;
  listing_id: string;
  file_url: string;
  storage_path: string;
  file_name: string;
  file_type: "image" | "floorplan" | "document";
  display_order: number;
}

interface FileItem {
  // isExisting=true → loaded from Supabase (has real DB id)
  // isExisting=false → newly uploaded this session (has temp id)
  id: string;
  name: string;
  url: string;
  storagePath: string;
  type: "image" | "floorplan" | "document";
  order: number;
  isExisting: boolean;
  uploading: boolean;
  preview?: string; // local blob URL for image preview
}

interface Props {
  listing?: SupabaseListing;
  onSuccess: () => void;
  onCancel: () => void;
}

const emptyForm = {
  title: "",
  location: "",
  city: "",
  price: "",
  open_market_value: "",
  current_rental_income: "",
  expected_rental_income: "",
  rental_yield: "",
  net_yield: "",
  bedrooms: "",
  property_type: "Buy-to-Let",
  tenure: "freehold",
  lease_years_remaining: "",
  tenanted: true,
  mortgageable: true,
  suitable_for_hmo_mortgage: false,
  status: "available",
  description: "",
  whatsapp_number: "447700900000",
};

function toFormValues(listing: SupabaseListing) {
  return {
    title: listing.title ?? "",
    location: listing.location ?? "",
    city: listing.city ?? "",
    price: listing.price?.toString() ?? "",
    open_market_value: listing.open_market_value?.toString() ?? "",
    current_rental_income: listing.current_rental_income?.toString() ?? "",
    expected_rental_income: listing.expected_rental_income?.toString() ?? "",
    rental_yield: listing.rental_yield?.toString() ?? "",
    net_yield: listing.net_yield?.toString() ?? "",
    bedrooms: listing.bedrooms?.toString() ?? "",
    property_type: listing.property_type ?? "Buy-to-Let",
    tenure: listing.tenure ?? "freehold",
    lease_years_remaining: listing.lease_years_remaining?.toString() ?? "",
    tenanted: listing.tenanted ?? true,
    mortgageable: listing.mortgageable ?? true,
    suitable_for_hmo_mortgage: listing.suitable_for_hmo_mortgage ?? false,
    status: listing.status ?? "available",
    description: listing.description ?? "",
    whatsapp_number: listing.whatsapp_number ?? "447700900000",
  };
}

function existingToFileItem(f: SupabaseFile): FileItem {
  return {
    id: f.id,
    name: f.file_name,
    url: f.file_url,
    storagePath: f.storage_path,
    type: f.file_type,
    order: f.display_order,
    isExisting: true,
    uploading: false,
  };
}

export default function ListingForm({ listing, onSuccess, onCancel }: Props) {
  const isEdit = !!listing;
  const [form, setForm] = useState(listing ? toFormValues(listing) : { ...emptyForm });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const existingFiles = listing?.listing_files ?? [];

  const [images, setImages] = useState<FileItem[]>(
    existingFiles
      .filter((f) => f.file_type === "image")
      .sort((a, b) => a.display_order - b.display_order)
      .map(existingToFileItem)
  );
  const [floorplans, setFloorplans] = useState<FileItem[]>(
    existingFiles
      .filter((f) => f.file_type === "floorplan")
      .sort((a, b) => a.display_order - b.display_order)
      .map(existingToFileItem)
  );
  const [documents, setDocuments] = useState<FileItem[]>(
    existingFiles
      .filter((f) => f.file_type === "document")
      .sort((a, b) => a.display_order - b.display_order)
      .map(existingToFileItem)
  );

  const [removedFileIds, setRemovedFileIds] = useState<string[]>([]);

  // ── File upload ─────────────────────────────────────────────
  const uploadFile = async (
    file: File,
    fileType: "image" | "floorplan" | "document"
  ): Promise<{ url: string; storagePath: string }> => {
    const bucket =
      fileType === "image"
        ? "listing-images"
        : fileType === "floorplan"
        ? "listing-floorplans"
        : "listing-documents";

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type, bucket }),
    });

    if (!res.ok) throw new Error("Failed to get upload URL");
    const { signedUrl, storagePath, publicUrl } = await res.json();

    const uploadRes = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadRes.ok) throw new Error("Upload failed");
    return { url: publicUrl, storagePath };
  };

  const handleDrop = useCallback(
    (fileType: "image" | "floorplan" | "document") =>
      async (acceptedFiles: File[]) => {
        const setter =
          fileType === "image" ? setImages : fileType === "floorplan" ? setFloorplans : setDocuments;

        for (const file of acceptedFiles) {
          const tempId = crypto.randomUUID();
          const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;

          setter((prev) => [
            ...prev,
            {
              id: tempId,
              name: file.name,
              url: "",
              storagePath: "",
              type: fileType,
              order: prev.length,
              isExisting: false,
              uploading: true,
              preview,
            },
          ]);

          try {
            const { url, storagePath } = await uploadFile(file, fileType);
            setter((prev) =>
              prev.map((f) =>
                f.id === tempId ? { ...f, url, storagePath, uploading: false } : f
              )
            );
          } catch {
            setter((prev) => prev.filter((f) => f.id !== tempId));
          }
        }
      },
    []
  );

  const removeFile = (fileType: "image" | "floorplan" | "document", id: string) => {
    const setter =
      fileType === "image" ? setImages : fileType === "floorplan" ? setFloorplans : setDocuments;

    setter((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item?.isExisting) {
        setRemovedFileIds((r) => [...r, id]);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  // ── Drag-to-reorder (images only) ───────────────────────────
  const dragIndexRef = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === index) return;

    setImages((prev) => {
      const next = [...prev];
      const [removed] = next.splice(from, 1);
      next.splice(index, 0, removed);
      return next.map((f, i) => ({ ...f, order: i }));
    });
    dragIndexRef.current = index;
  };

  // ── Dropzone hooks ──────────────────────────────────────────
  const imageDz = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleDrop("image"),
  });
  const floorplanDz = useDropzone({
    accept: { "image/*": [], "application/pdf": [] },
    onDrop: handleDrop("floorplan"),
  });
  const documentDz = useDropzone({
    accept: { "application/pdf": [], "application/msword": [], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [] },
    onDrop: handleDrop("document"),
  });

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const listingPayload = {
        title: form.title,
        location: form.location,
        city: form.city,
        price: form.price ? Number(form.price) : null,
        open_market_value: form.open_market_value ? Number(form.open_market_value) : null,
        current_rental_income: form.current_rental_income ? Number(form.current_rental_income) : null,
        expected_rental_income: form.expected_rental_income ? Number(form.expected_rental_income) : null,
        rental_yield: form.rental_yield ? Number(form.rental_yield) : null,
        net_yield: form.net_yield ? Number(form.net_yield) : null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        property_type: form.property_type,
        tenure: form.tenure,
        lease_years_remaining: form.lease_years_remaining ? Number(form.lease_years_remaining) : null,
        tenanted: form.tenanted,
        mortgageable: form.mortgageable,
        suitable_for_hmo_mortgage: form.suitable_for_hmo_mortgage,
        status: form.status,
        description: form.description,
        whatsapp_number: form.whatsapp_number,
      };

      const allFiles = [...images, ...floorplans, ...documents];

      if (isEdit && listing) {
        const newFiles = allFiles.filter((f) => !f.isExisting && !f.uploading && f.url);
        const existingWithOrders = allFiles
          .filter((f) => f.isExisting)
          .map((f) => ({ fileId: f.id, order: f.order }));

        const res = await fetch(`/api/admin/listings/${listing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...listingPayload,
            files: newFiles.map((f) => ({
              url: f.url,
              storagePath: f.storagePath,
              name: f.name,
              type: f.type,
              order: f.order,
            })),
            removedFileIds,
            orderUpdates: existingWithOrders,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Update failed");
        }
      } else {
        const readyFiles = allFiles.filter((f) => !f.uploading && f.url);
        const res = await fetch("/api/admin/listings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...listingPayload,
            files: readyFiles.map((f) => ({
              url: f.url,
              storagePath: f.storagePath,
              name: f.name,
              type: f.type,
              order: f.order,
            })),
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Create failed");
        }
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* ── Property Details ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Property Details</h3>

        <div>
          <label className={labelCls}>Listing Title *</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. 4-Bed Licensed HMO — Manchester"
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Full Location *</label>
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Salford, Manchester"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>City *</label>
            <input
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="e.g. Manchester"
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Property Type</label>
            <select
              value={form.property_type}
              onChange={(e) => setForm({ ...form, property_type: e.target.value })}
              className={`${inputCls} bg-white`}
            >
              {["HMO", "Buy-to-Let", "Terraced", "Semi-Detached", "Detached", "Flat"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Bedrooms</label>
            <input
              type="number"
              value={form.bedrooms}
              onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              placeholder="4"
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Tenure</label>
            <select
              value={form.tenure}
              onChange={(e) => setForm({ ...form, tenure: e.target.value })}
              className={`${inputCls} bg-white`}
            >
              <option value="freehold">Freehold</option>
              <option value="leasehold">Leasehold</option>
            </select>
          </div>
          {form.tenure === "leasehold" && (
            <div>
              <label className={labelCls}>Lease Years Remaining</label>
              <input
                type="number"
                value={form.lease_years_remaining}
                onChange={(e) => setForm({ ...form, lease_years_remaining: e.target.value })}
                placeholder="125"
                className={inputCls}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Financials ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Financials</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "price", label: "Asking Price (£) *", placeholder: "250000", required: true },
            { key: "open_market_value", label: "Open Market Value (£)", placeholder: "280000" },
            { key: "current_rental_income", label: "Current Rent (pcm £)", placeholder: "1500" },
            { key: "expected_rental_income", label: "Expected Rent (pcm £)", placeholder: "1700" },
            { key: "rental_yield", label: "Gross Yield (%)", placeholder: "7.2", step: "0.01" },
            { key: "net_yield", label: "Net Yield (%)", placeholder: "6.0", step: "0.01" },
          ].map((field) => (
            <div key={field.key}>
              <label className={labelCls}>{field.label}</label>
              <input
                required={field.required}
                type="number"
                step={field.step}
                value={form[field.key as keyof typeof form] as string}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Status & Options ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Status & Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Listing Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={`${inputCls} bg-white`}
            >
              <option value="available">Available</option>
              <option value="under_offer">Under Offer</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>WhatsApp Number</label>
            <input
              value={form.whatsapp_number}
              onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
              placeholder="447700900000"
              className={inputCls}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {[
            { key: "tenanted", label: "Tenanted" },
            { key: "mortgageable", label: "Mortgageable" },
            { key: "suitable_for_hmo_mortgage", label: "Suitable for HMO Mortgage" },
          ].map((opt) => (
            <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form[opt.key as keyof typeof form] as boolean}
                onChange={(e) => setForm({ ...form, [opt.key]: e.target.checked })}
                className="w-4 h-4 accent-brand-green"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Description ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide mb-4">Description</h3>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the property, investment highlights, location..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* ── Images ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-brand-green" />
          <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Property Images</h3>
        </div>
        <p className="text-xs text-gray-400">Drag images below to reorder. First image is the cover photo.</p>

        {/* Dropzone */}
        <div
          {...imageDz.getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            imageDz.isDragActive
              ? "border-brand-green bg-brand-green/5"
              : "border-gray-200 hover:border-brand-green hover:bg-gray-50"
          }`}
        >
          <input {...imageDz.getInputProps()} />
          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Drop images here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
        </div>

        {/* Image grid with drag-to-reorder */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, index) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                className="relative group rounded-lg overflow-hidden border border-gray-100 aspect-video bg-gray-50 cursor-grab"
              >
                {img.uploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                  </div>
                ) : (
                  <img
                    src={img.preview ?? img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                )}
                {index === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-brand-green text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    Cover
                  </span>
                )}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <div className="bg-white/80 p-1 rounded cursor-grab">
                    <GripVertical className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile("image", img.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Floorplans ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-brand-green" />
          <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Floorplans</h3>
        </div>

        <div
          {...floorplanDz.getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            floorplanDz.isDragActive
              ? "border-brand-green bg-brand-green/5"
              : "border-gray-200 hover:border-brand-green hover:bg-gray-50"
          }`}
        >
          <input {...floorplanDz.getInputProps()} />
          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Drop floorplans here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">Images or PDF</p>
        </div>

        {floorplans.length > 0 && (
          <div className="space-y-2">
            {floorplans.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
              >
                <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1 truncate">{f.name}</span>
                {f.uploading && <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />}
                {!f.uploading && (
                  <button
                    type="button"
                    onClick={() => removeFile("floorplan", f.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Documents ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <File className="h-4 w-4 text-brand-green" />
          <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Documents (PDFs)</h3>
        </div>

        <div
          {...documentDz.getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            documentDz.isDragActive
              ? "border-brand-green bg-brand-green/5"
              : "border-gray-200 hover:border-brand-green hover:bg-gray-50"
          }`}
        >
          <input {...documentDz.getInputProps()} />
          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Drop documents here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX</p>
        </div>

        {documents.length > 0 && (
          <div className="space-y-2">
            {documents.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
              >
                <File className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1 truncate">{f.name}</span>
                {f.uploading && <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />}
                {!f.uploading && (
                  <button
                    type="button"
                    onClick={() => removeFile("document", f.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white py-3.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Listing"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
