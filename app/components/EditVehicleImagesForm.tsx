"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface EditVehicleImagesFormProps {
  vehicleId: string;
  existingImages: string[];
  currentMainImage?: string;
}

export default function EditVehicleImagesForm({
  vehicleId,
  existingImages,
  currentMainImage,
}: EditVehicleImagesFormProps) {
  const [galleryImages, setGalleryImages] = useState(existingImages || []);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mainImage, setMainImage] = useState(currentMainImage || "");

  async function uploadFiles(files: File[]) {
    if (files.length === 0) return;

    setUploading(true);
    setSuccess(false);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const filePath = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("vehicle-images")
        .upload(filePath, file);

      if (error) {
        alert(error.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("vehicle-images")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    const updatedGallery = [...galleryImages, ...uploadedUrls];

    const { error: updateError } = await supabase
      .from("vehicles")
      .update({
        gallery_images: updatedGallery,
      })
      .eq("id", vehicleId);

    if (updateError) {
      alert(updateError.message);
      setUploading(false);
      return;
    }

    setGalleryImages(updatedGallery);
    setUploading(false);
    setSuccess(true);
  }
  async function makePrimaryImage(image: string) {
    const { error } = await supabase
      .from("vehicles")
      .update({
        image_url: image,
      })
      .eq("id", vehicleId);

    if (error) {
      alert(error.message);
      return;
    }

    setMainImage(image);
  }

  return (
    <div className="mt-10 grid gap-6">
      <div
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          uploadFiles(Array.from(event.dataTransfer.files));
        }}
        className="cursor-pointer border border-dashed border-[#b9975b]/40 bg-[#0f0c08] p-10 text-center"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="vehicle-image-upload"
          onChange={(event) => {
            uploadFiles(Array.from(event.target.files || []));
          }}
        />

        <label htmlFor="vehicle-image-upload" className="cursor-pointer">
          <p className="text-sm uppercase tracking-[0.25em] text-[#b9975b]">
            Upload Vehicle Images
          </p>

          <p className="mt-4 text-[#efe3cf]/60">
            Drag and drop images here, or click to browse your computer.
          </p>
        </label>

        {uploading && (
          <p className="mt-4 text-sm text-[#efe3cf]/70">Uploading images...</p>
        )}

        {success && (
          <p className="mt-4 text-sm text-green-300">
            Images uploaded successfully.
          </p>
        )}
      </div>

      {galleryImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image}
              className="relative h-48 overflow-hidden border border-[#b9975b]/20"
            >
              <Image src={image} alt="Vehicle" fill className="object-cover" />
              <button
                type="button"
                onClick={() => makePrimaryImage(image)}
                className="absolute bottom-2 left-2 right-2 bg-black/70 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#f3eadb]"
              >
                {mainImage === image ? "Primary Image" : "Make Primary"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
