"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
}

export default function BookingRequestForm({ vehicles }: { vehicles: Vehicle[] }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const vehicleId = String(formData.get("vehicle_id"));
    const customerName = String(formData.get("customer_name"));
    const customerEmail = String(formData.get("customer_email"));
    const customerPhone = String(formData.get("customer_phone"));
    const eventType = String(formData.get("event_type"));
    const eventLocation = String(formData.get("event_location"));
    const startDate = String(formData.get("start_date"));
    const endDate = String(formData.get("end_date"));
    const notes = String(formData.get("notes"));

    if (!vehicleId || !customerName || !customerEmail || !startDate || !endDate) {
      setErrorMessage("Please fill out the required fields.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      vehicle_id: vehicleId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      event_type: eventType,
      event_location: eventLocation,
      start_date: startDate,
      end_date: endDate,
      notes,
      status: "pending",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    event.currentTarget.reset();
    setSuccess(true);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#b9975b]/30 bg-[#15120e] p-5 md:p-8">
      <div className="grid gap-5">
        <select
          name="vehicle_id"
          required
          className="border border-[#b9975b]/30 bg-[#0f0c08] px-4 py-4 text-[#f3eadb] outline-none focus:border-[#b9975b]"
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.name}
            </option>
          ))}
        </select>

        <input
          name="customer_name"
          required
          placeholder="Full Name"
          className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
        />

        <input
          name="customer_email"
          required
          type="email"
          placeholder="Email"
          className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
        />

        <input
          name="customer_phone"
          placeholder="Phone"
          className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
        />

        <select
          name="event_type"
          className="border border-[#b9975b]/30 bg-[#0f0c08] px-4 py-4 text-[#f3eadb] outline-none focus:border-[#b9975b]"
        >
          <option value="">Event Type</option>
          <option value="Wedding">Wedding</option>
          <option value="Photoshoot">Photoshoot</option>
          <option value="Video / Film">Video / Film</option>
          <option value="Private Event">Private Event</option>
          <option value="Chauffeured Experience">Chauffeured Experience</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="event_location"
          placeholder="Event Location"
          className="border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#b9975b]">
              Start Date
            </label>
            <input
              name="start_date"
              required
              type="date"
              className="w-full border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none focus:border-[#b9975b]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#b9975b]">
              End Date
            </label>
            <input
              name="end_date"
              required
              type="date"
              className="w-full border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none focus:border-[#b9975b]"
            />
          </div>
        </div>

        <textarea
          name="notes"
          placeholder="Tell us about the event, timing, delivery needs, or special requests"
          className="min-h-36 border border-[#b9975b]/30 bg-transparent px-4 py-4 text-[#f3eadb] outline-none placeholder:text-[#efe3cf]/35 focus:border-[#b9975b]"
        />

        {errorMessage && (
          <p className="border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200">
            {errorMessage}
          </p>
        )}

        {success && (
          <p className="border border-[#b9975b]/40 bg-[#0f0c08] p-4 text-sm text-[#efe3cf]">
            Your booking request was submitted. We will review the details and contact you shortly.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="border border-[#b9975b] bg-[#b9975b] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0f0c08] transition hover:bg-transparent hover:text-[#b9975b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Request Booking"}
        </button>
      </div>
    </form>
  );
}