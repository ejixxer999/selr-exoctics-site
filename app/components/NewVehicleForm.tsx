'use client';

import { useState } from 'react';
import { createVehicle } from '@/app/admin/vehicles/new/actions';
import VehicleImageUploader from '@/app/components/VehicleImageUploader';

export default function NewVehicleForm({
  submittedPassword,
}: {
  submittedPassword: string;
}) {
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  return (
    <form
      action={createVehicle}
      className="mt-10 grid gap-5 border border-[#b9975b]/30 bg-[#15120e] p-5 md:p-8"
    >
      <input type="hidden" name="admin_password" value={submittedPassword} />
      <input type="hidden" name="image_url" value={mainImageUrl} />
      <input type="hidden" name="gallery_images" value={galleryImages.join(',')} />

      <VehicleImageUploader
        onUploaded={(urls) => {
          setMainImageUrl((current) => current || urls[0]);
          setGalleryImages((current) => [...current, ...urls]);
        }}
      />

      {galleryImages.length > 0 && (
        <div className="text-sm text-[#efe3cf]/60">
          {galleryImages.length} image(s) uploaded.
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <input name="year" type="number" placeholder="Year" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />
        <input name="make" required placeholder="Make" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />
        <input name="model" required placeholder="Model" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />
      </div>

      <input name="name" required placeholder="Display Name, ex: 1972 Jaguar XJ6" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />

      <input name="subtitle" placeholder="Subtitle" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />

      <textarea name="description" placeholder="Vehicle description" className="min-h-36 border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />

      <input name="features" placeholder="Features separated by commas, ex: Weddings, Photoshoots, Chauffeur available" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />

      <div className="mt-6 border-t border-[#b9975b]/20 pt-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[#b9975b]">
          Owner Info
        </p>
        <p className="mt-2 text-sm text-[#efe3cf]/50">
          Private. Not shown publicly.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <input name="owner_name" placeholder="Owner Name" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />
        <input name="owner_email" type="email" placeholder="Owner Email" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />
        <input name="owner_phone" placeholder="Owner Phone" className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />
      </div>

      <textarea name="owner_notes" placeholder="Private owner notes, commission, availability notes, restrictions, etc." className="min-h-28 border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]" />

      <button
        type="submit"
        className="border border-[#b9975b] bg-[#b9975b] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b]"
      >
        Add Vehicle
      </button>
    </form>
  );
}