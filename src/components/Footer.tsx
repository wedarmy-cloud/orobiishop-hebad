"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="mt-16 border-t border-[#E7E5E0] bg-[#141414] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Newsletter */}
          <div className="md:col-span-4">
            <BrandLogo inverted />
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Brand merchandise kreatif untuk stiker, pin, keychain, dan
              pernak-pernik ilustrasi. Produksi rapi, tahan lama, dan siap
              kirim ke seluruh Indonesia.
            </p>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                Daftar Newsletter & Dapatkan Info Drop Terbaru + Voucher Diskon
              </p>
              {subscribed ? (
                <p className="mt-2 text-xs font-medium text-[#8CD1B0]">
                  Terima kasih! Kode voucher BARU10 telah dikirim ke email Anda.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-2.5 flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda..."
                    className="w-full bg-white/10 px-3 py-2.5 text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-[#C85A32] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B44D27]"
                  >
                    Daftar
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Layanan Pelanggan */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Layanan Pelanggan
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/bantuan" className="hover:text-white">
                  Bantuan & FAQ
                </Link>
              </li>
              <li>
                <Link href="/bantuan#pengembalian" className="hover:text-white">
                  Cara Pengembalian
                </Link>
              </li>
              <li>
                <Link href="/akun?tab=orders" className="hover:text-white">
                  Status Order
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Tentang Orobiishop */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Tentang Orobiishop
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/tentang-kami" className="hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/cari" className="hover:text-white">
                  Katalog Merch
                </Link>
              </li>
              <li>
                <Link href="/thread" className="hover:text-white">
                  Thread Editorial
                </Link>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Pembayaran & Pengiriman */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Metode Pembayaran
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["BCA", "Mandiri", "QRIS", "GoPay", "OVO", "Visa/MC", "COD"].map(
                (pay) => (
                  <span
                    key={pay}
                    className="rounded border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white/85"
                  >
                    {pay}
                  </span>
                )
              )}
            </div>
            <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-white">
              Mitra Pengiriman
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["JNE", "J&T Express", "SiCepat", "Anteraja", "Instant"].map(
                (courier) => (
                  <span
                    key={courier}
                    className="rounded border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white/85"
                  >
                    {courier}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© 2026 Orobiishop Indonesia. Seluruh hak cipta dilindungi.</p>
          <p>Dibuat untuk penggemar stiker, pin, & merch kreatif di Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
