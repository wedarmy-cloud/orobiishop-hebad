import React from "react";

const FAQS = [
  {
    q: "Bagaimana cara menukar ukuran atau mengembalikan produk (Garansi 30 Hari)?",
    a: "Anda dapat mengajukan penukaran ukuran atau pengembalian dana melalui menu Status Order di halaman Akun dalam 30 hari sejak paket diterima. Pastikan tag harga masih terpasang dan produk belum dicuci.",
  },
  {
    q: "Apakah tersedia pembayaran Bayar di Tempat (COD)?",
    a: "Ya, COD tersedia untuk pengiriman ke seluruh kota besar di Indonesia dengan nilai pesanan maksimal Rp 3.000.000.",
  },
  {
    q: "Berapa lama estimasi pengiriman pesanan saya?",
    a: "Untuk area Jabodetabek dan Bandung, pengiriman reguler memakan waktu 1–2 hari kerja. Untuk luar Jawa, estimasi 3–5 hari kerja.",
  },
  {
    q: "Apakah semua produk di Orobiishop 100% original?",
    a: "Seluruh produk di Orobiishop dipasok langsung oleh brand resmi dan mitra kurasi terverifikasi dengan jaminan keaslian 100%.",
  },
];

export default function HelpFaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-[#141414]">
        Pusat Bantuan & FAQ
      </h1>
      <p className="mt-2 text-sm text-[#6B6B6B]">
        Temukan jawaban cepat seputar pemesanan, pengiriman, dan garansi 30
        hari Orobiishop.
      </p>

      <div id="pengembalian" className="mt-8 space-y-4">
        {FAQS.map((item) => (
          <div
            key={item.q}
            className="border border-[#E7E5E0] bg-[#FAF9F6] p-5"
          >
            <h2 className="text-base font-bold text-[#141414]">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
