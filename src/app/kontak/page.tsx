"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-[#141414]">Hubungi Kami</h1>
      <p className="mt-2 text-sm text-[#6B6B6B]">
        Tim Layanan Pelanggan Orobiishop siap membantu Anda setiap hari pukul
        08.00–21.00 WIB.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border border-[#E7E5E0] bg-[#FAF9F6] p-4">
          <p className="text-xs font-bold uppercase text-[#6B6B6B]">Email</p>
          <p className="mt-1 text-sm font-bold text-[#141414]">
            support@orobiishop.com
          </p>
        </div>
        <div className="border border-[#E7E5E0] bg-[#FAF9F6] p-4">
          <p className="text-xs font-bold uppercase text-[#6B6B6B]">
            WhatsApp Resmi
          </p>
          <p className="mt-1 text-sm font-bold text-[#141414]">
            +62 811-9000-2026
          </p>
        </div>
      </div>

      {sent ? (
        <div className="mt-8 border border-[#3D6352] bg-[#EEF3F0] p-6 text-sm font-medium text-[#3D6352]">
          Pesan Anda telah kami terima. Tim kami akan membalas dalam 1x24 jam.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-8 space-y-4 border border-[#E7E5E0] p-6"
        >
          <div>
            <label className="text-xs font-semibold">Nama Lengkap</label>
            <input
              type="text"
              required
              className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold">Pesan</label>
            <textarea
              rows={4}
              required
              className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-[#141414] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Kirim Pesan
          </button>
        </form>
      )}
    </div>
  );
}
