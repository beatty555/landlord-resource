"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Props {
  images: { url: string; name: string }[];
}

export default function ImageGallery({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (index: number) => setLightboxIndex(index);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
        <div className="col-span-2 relative group cursor-pointer" onClick={() => open(0)}>
          <img
            src={images[0].url}
            alt={images[0].name}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-3">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <ZoomIn className="h-3 w-3" /> View all {images.length} photos
            </span>
          </div>
        </div>
        {images.slice(1, 3).map((img, i) => (
          <div
            key={i}
            className="relative group cursor-pointer"
            onClick={() => open(i + 1)}
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-40 object-cover"
            />
            {i === 1 && images.length > 3 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{images.length - 3}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={close}
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <img
            src={images[lightboxIndex].url}
            alt={images[lightboxIndex].name}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
