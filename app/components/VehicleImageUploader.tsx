'use client';

import { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface VehicleImageUploaderProps {
  onUploaded: (urls: string[]) => void;
}

export default function VehicleImageUploader({
  onUploaded,
}: VehicleImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  async function uploadFiles(files: File[]) {
    if (files.length === 0) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const filePath = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from('vehicle-images')
        .upload(filePath, file);

      if (error) {
        alert(error.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    onUploaded(uploadedUrls);
    setUploading(false);
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        uploadFiles(Array.from(event.dataTransfer.files));
      }}
      className={`cursor-pointer border border-dashed p-8 text-center transition ${
        dragging
          ? 'border-[#b9975b] bg-[#b9975b]/10'
          : 'border-[#b9975b]/40 bg-[#0f0c08]'
      }`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          uploadFiles(Array.from(event.target.files || []));
        }}
      />

      <p className="text-sm uppercase tracking-[0.25em] text-[#b9975b]">
        Upload Vehicle Images
      </p>

      <p className="mt-4 text-[#efe3cf]/60">
        Drag and drop images here, or click to browse your computer.
      </p>

      {uploading && (
        <p className="mt-4 text-sm text-[#efe3cf]/70">
          Uploading images...
        </p>
      )}
    </div>
  );
}