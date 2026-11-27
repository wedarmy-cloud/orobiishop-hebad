"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, MapPin, Truck } from "lucide-react";
import { getVoucherDiscountAmount, useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { formatRupiah } from "@/lib/utils";
import { OrderRecord } from "@/types";

const SHIPPING_OPTIONS = [
  {
    id: "reguler",
    name: "Reguler (JNE / SiCepat)",
    eta: "Estimasi 2–4 hari kerja",
    cost: 18000,
    freeAbove299: true,
  },
  {
    id: "express",
    name: "Next Day Express",
    eta: "Tiba besok sebelum pukul 21.00",
    cost: 32000,
    freeAbove299: false,
  },
  {
    id: "instant",
    name: "Instant Kurir (Jabodetabek)",
    eta: "Tiba dalam 3 jam",
    cost: 45000,
    freeAbove299: false,
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "va",
    name: "Transfer Bank (Virtual Account BCA / Mandiri / BNI)",
    desc: "Verifikasi otomatis tanpa perlu unggah bukti transfer.",
  },
  {
    id: "ewallet",
    name: "E-Wallet (QRIS / GoPay / OVO / ShopeePay)",
    desc: "Scan QRIS atau hubungkan dompet digital Anda.",
  },
  {
    id: "card",
    name: "Kartu Kredit / Debit (Visa / Mastercard)",
    desc: "Mendukung cicilan 0% hingga 6 bulan.",
  },
  {
    id: "cod",
    name: "Bayar di Tempat (COD)",
    desc: "Bayar tunai langsung ke kurir saat paket tiba.",
  },
];

export default function CheckoutPage() {
  const { items, voucherCode, clearCart } = useCartStore();
  const { addresses, addOrder } = useUserStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [recipient, setRecipient] = useState(
    addresses[0]?.recipient ?? "Rania Kusuma"
  );
  const [phone, setPhone] = useState(addresses[0]?.phone ?? "0812-3456-7890");
  const [street, setStreet] = useState(
    addresses[0]?.street ?? "Jl. Kemang Selatan VIII No. 24"
  );
  const [city, setCity] = useState(addresses[0]?.city ?? "Jakarta Selatan");
  const [province, setProvince] = useState(
    addresses[0]?.province ?? "DKI Jakarta"
  );
  const [postalCode, setPostalCode] = useState(
    addresses[0]?.postalCode ?? "12730"
  );

  const [shippingId, setShippingId] = useState("reguler");
  const [paymentId, setPaymentId] = useState("va");
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(
    null
  );

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = getVoucherDiscountAmount(subtotal, voucherCode);
  const selectedShipping =
    SHIPPING_OPTIONS.find((s) => s.id === shippingId) ?? SHIPPING_OPTIONS[0];
  const shippingCost =
    selectedShipping.freeAbove299 && subtotal >= 299000
      ? 0
      : selectedShipping.cost;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleConfirmOrder = () => {
    const orderNumber = `KNK-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedPayment =
      PAYMENT_OPTIONS.find((p) => p.id === paymentId) ?? PAYMENT_OPTIONS[0];

    const record: OrderRecord = {
      orderNumber,
      createdAt: "Baru saja",
      items: [...items],
      subtotal,
      discount,
      shippingCost,
      total,
      shippingMethod: selectedShipping.name,
      paymentMethod: selectedPayment.name,
      address: {
        id: `addr-${Date.now()}`,
        label: "Alamat Pengiriman",
        recipient,
        phone,
        street,
        city,
        province,
        postalCode,
      },
      status: "Diproses",
    };

    addOrder(record);
    clearCart();
    setCompletedOrder(record);
  };

  if (completedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <div className="border border-[#E7E5E0] bg-[#FAF9F6] p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-[#3D6352]" />
          <span className="mt-4 inline-block bg-[#3D6352] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            Pesanan Berhasil Dibuat
          </span>
          <h1 className="mt-3 text-2xl font-bold text-[#141414]">
            Terima Kasih Telah Berbelanja di Orobiishop!
          </h1>
          <p className="mt-2 text-sm text-[#6B6B6B]">
            Nomor Pesanan Anda:
          </p>
          <p className="mt-1 text-xl font-bold tracking-wider text-[#C85A32]">
            {completedOrder.orderNumber}
          </p>

          <div className="mt-6 space-y-2 border-y border-[#E7E5E0] py-4 text-left text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Penerima</span>
              <span className="font-semibold text-[#141414]">
                {completedOrder.address.recipient} ({completedOrder.address.city})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Pengiriman</span>
              <span className="font-semibold text-[#141414]">
                {completedOrder.shippingMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Pembayaran</span>
              <span className="font-semibold text-[#141414]">
                {completedOrder.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold text-[#141414]">
              <span>Total Pembayaran</span>
              <span>{formatRupiah(completedOrder.total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/akun?tab=orders"
              className="bg-[#141414] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
            >
              Lacak Status Order
            </Link>
            <Link
              href="/"
              className="border border-[#141414] bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141414]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#141414]">
          Tidak Ada Item untuk Checkout
        </h1>
        <Link
          href="/"
          className="mt-5 inline-block bg-[#141414] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
        >
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-[#141414]">Checkout Aman</h1>

      {/* Stepper */}
      <div className="mt-6 grid grid-cols-4 gap-2 border-b border-[#E7E5E0] pb-4 text-xs font-bold">
        {[
          { num: 1, label: "1. Alamat" },
          { num: 2, label: "2. Pengiriman" },
          { num: 3, label: "3. Pembayaran" },
          { num: 4, label: "4. Konfirmasi" },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => s.num < step && setStep(s.num as 1 | 2 | 3 | 4)}
            className={`py-2 text-center border-b-2 transition ${
              step === s.num
                ? "border-[#141414] text-[#141414]"
                : step > s.num
                ? "border-[#3D6352] text-[#3D6352]"
                : "border-transparent text-[#6B6B6B]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="border border-[#E7E5E0] p-6">
              <div className="flex items-center gap-2 text-base font-bold text-[#141414]">
                <MapPin className="h-5 w-5" />
                <h2>Alamat Pengiriman</h2>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#141414]">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#141414]">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#141414]">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#141414]">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#141414]">
                      Provinsi
                    </label>
                    <input
                      type="text"
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#141414]">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm focus:border-[#141414] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-6 bg-[#141414] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white"
              >
                Lanjut ke Pengiriman
              </button>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="border border-[#E7E5E0] p-6">
              <div className="flex items-center gap-2 text-base font-bold text-[#141414]">
                <Truck className="h-5 w-5" />
                <h2>Pilih Metode Pengiriman</h2>
              </div>
              <div className="mt-5 space-y-3">
                {SHIPPING_OPTIONS.map((opt) => {
                  const effCost =
                    opt.freeAbove299 && subtotal >= 299000 ? 0 : opt.cost;
                  return (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center justify-between border p-4 ${
                        shippingId === opt.id
                          ? "border-[#141414] bg-[#FAF9F6]"
                          : "border-[#E7E5E0]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingId === opt.id}
                          onChange={() => setShippingId(opt.id)}
                          className="accent-[#141414]"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#141414]">
                            {opt.name}
                          </p>
                          <p className="text-xs text-[#6B6B6B]">{opt.eta}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#141414]">
                        {effCost === 0 ? "Gratis" : formatRupiah(effCost)}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-[#E7E5E0] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141414]"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#141414] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="border border-[#E7E5E0] p-6">
              <div className="flex items-center gap-2 text-base font-bold text-[#141414]">
                <CreditCard className="h-5 w-5" />
                <h2>Pilih Metode Pembayaran</h2>
              </div>
              <div className="mt-5 space-y-3">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-start gap-3 border p-4 ${
                      paymentId === opt.id
                        ? "border-[#141414] bg-[#FAF9F6]"
                        : "border-[#E7E5E0]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentId === opt.id}
                      onChange={() => setPaymentId(opt.id)}
                      className="mt-1 accent-[#141414]"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#141414]">
                        {opt.name}
                      </p>
                      <p className="text-xs text-[#6B6B6B]">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="border border-[#E7E5E0] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141414]"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="bg-[#141414] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Review Pesanan
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="border border-[#E7E5E0] p-6">
              <h2 className="text-base font-bold text-[#141414]">
                Konfirmasi Akhir Pesanan
              </h2>
              <div className="mt-4 space-y-3 bg-[#FAF9F6] p-4 text-sm">
                <p>
                  <span className="font-bold">Alamat:</span> {recipient} (
                  {phone}) — {street}, {city}, {province} {postalCode}
                </p>
                <p>
                  <span className="font-bold">Kurir:</span>{" "}
                  {selectedShipping.name}
                </p>
                <p>
                  <span className="font-bold">Pembayaran:</span>{" "}
                  {PAYMENT_OPTIONS.find((p) => p.id === paymentId)?.name}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="border border-[#E7E5E0] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141414]"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="bg-[#C85A32] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B44D27]"
                >
                  Buat Pesanan Sekarang
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="border border-[#E7E5E0] bg-[#FAF9F6] p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#141414]">
              Ringkasan ({items.reduce((a, b) => a + b.quantity, 0)} Item)
            </h3>
            <ul className="mt-4 divide-y divide-[#E7E5E0] max-h-64 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex justify-between gap-3 py-2.5 text-xs"
                >
                  <div>
                    <p className="font-semibold text-[#141414]">{item.name}</p>
                    <p className="text-[#6B6B6B]">
                      {item.size} • x{item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-[#141414]">
                    {formatRupiah(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-[#E7E5E0] pt-4 text-sm">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#3D6352]">
                  <span>Voucher ({voucherCode})</span>
                  <span>-{formatRupiah(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Ongkos Kirim</span>
                <span>
                  {shippingCost === 0 ? "Gratis" : formatRupiah(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E7E5E0] pt-2 text-base font-bold text-[#141414]">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
