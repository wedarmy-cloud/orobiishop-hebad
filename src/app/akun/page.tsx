"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Heart,
  LogOut,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { formatRupiah } from "@/lib/utils";

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [tab, setTab] = useState(initialTab);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("rania@kainku.id");
  const [password, setPassword] = useState("123456");
  const [nameInput, setNameInput] = useState("");
  const [authError, setAuthError] = useState("");

  const {
    isLoggedIn,
    profile,
    addresses,
    orders,
    login,
    logout,
    updateProfile,
    addAddress,
  } = useUserStore();
  const wishlistIds = useWishlistStore((s) => s.productIds);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setAuthError("Email tidak valid atau kata sandi minimal 6 karakter.");
      return;
    }
    setAuthError("");
    login(email, authMode === "register" ? nameInput : undefined);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim()) return;
    addAddress({
      label: "Alamat Baru",
      recipient: profile.name,
      phone: profile.phone,
      street: newStreet,
      city: newCity,
      province: "Indonesia",
      postalCode: "12000",
    });
    setNewStreet("");
    setNewCity("");
  };

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <div className="border border-[#E7E5E0] bg-white p-7 shadow-sm">
          <div className="flex border-b border-[#E7E5E0]">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`flex-1 border-b-2 pb-3 text-xs font-bold uppercase tracking-wider ${
                authMode === "login"
                  ? "border-[#141414] text-[#141414]"
                  : "border-transparent text-[#6B6B6B]"
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`flex-1 border-b-2 pb-3 text-xs font-bold uppercase tracking-wider ${
                authMode === "register"
                  ? "border-[#141414] text-[#141414]"
                  : "border-transparent text-[#6B6B6B]"
              }`}
            >
              Daftar Akun
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
            {authMode === "register" && (
              <div>
                <label className="text-xs font-semibold text-[#141414]">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="mt-1 w-full border border-[#E7E5E0] px-3 py-2.5 text-sm focus:border-[#141414] focus:outline-none"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-[#141414]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-[#E7E5E0] px-3 py-2.5 text-sm focus:border-[#141414] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#141414]">
                Kata Sandi
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-[#E7E5E0] px-3 py-2.5 text-sm focus:border-[#141414] focus:outline-none"
              />
            </div>
            {authError && <p className="text-xs text-[#C85A32]">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-[#141414] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2A2A2A]"
            >
              {authMode === "login" ? "Masuk ke Orobiishop" : "Buat Akun Baru"}
            </button>
            <p className="text-center text-[11px] text-[#6B6B6B]">
              Demo login: gunakan email & kata sandi apa saja (min. 6 karakter).
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col justify-between gap-4 border-b border-[#E7E5E0] pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#141414]">
            Halo, {profile.name}
          </h1>
          <p className="text-xs text-[#6B6B6B]">{profile.email}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex w-fit items-center gap-2 border border-[#E7E5E0] px-4 py-2 text-xs font-bold text-[#141414] hover:border-[#141414]"
        >
          <LogOut className="h-3.5 w-3.5" />
          Keluar
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
            {[
              { id: "profile", label: "Profil Saya", icon: User },
              { id: "addresses", label: "Buku Alamat", icon: MapPin },
              { id: "orders", label: "Status & Riwayat Order", icon: Package },
              { id: "wishlist", label: `Wishlist (${wishlistIds.length})`, icon: Heart },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex shrink-0 items-center gap-2.5 border px-4 py-3 text-left text-xs font-bold transition ${
                  tab === item.id
                    ? "border-[#141414] bg-[#141414] text-white"
                    : "border-[#E7E5E0] bg-white text-[#141414] hover:bg-[#FAF9F6]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-9">
          {tab === "profile" && (
            <div className="border border-[#E7E5E0] p-6">
              <h2 className="text-lg font-bold text-[#141414]">
                Informasi Profil
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      updateProfile({ ...profile, name: e.target.value })
                    }
                    className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Nomor HP</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      updateProfile({ ...profile, phone: e.target.value })
                    }
                    className="mt-1 w-full border border-[#E7E5E0] px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {tab === "addresses" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-[#E7E5E0] bg-[#FAF9F6] p-4"
                  >
                    <p className="text-xs font-bold uppercase text-[#C85A32]">
                      {addr.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#141414]">
                      {addr.recipient}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">{addr.phone}</p>
                    <p className="mt-2 text-xs text-[#141414]">
                      {addr.street}, {addr.city}, {addr.province}{" "}
                      {addr.postalCode}
                    </p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleAddAddress}
                className="border border-[#E7E5E0] p-5 space-y-3"
              >
                <p className="text-sm font-bold text-[#141414]">
                  Tambah Alamat Baru
                </p>
                <input
                  type="text"
                  placeholder="Nama Jalan & Nomor Rumah"
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  className="w-full border border-[#E7E5E0] px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Kota / Kabupaten"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full border border-[#E7E5E0] px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#141414] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Simpan Alamat
                </button>
              </form>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-5">
              {orders.map((ord) => (
                <div
                  key={ord.orderNumber}
                  className="border border-[#E7E5E0] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7E5E0] pb-3">
                    <div>
                      <p className="text-xs text-[#6B6B6B]">{ord.createdAt}</p>
                      <p className="text-sm font-bold text-[#141414]">
                        {ord.orderNumber}
                      </p>
                    </div>
                    <span className="bg-[#EEF3F0] px-3 py-1 text-xs font-bold text-[#3D6352]">
                      {ord.status}
                    </span>
                  </div>

                  {/* Order Status Timeline */}
                  <div className="my-4 grid grid-cols-4 gap-2 text-center text-[11px]">
                    {["Diproses", "Dikemas", "Dikirim", "Selesai"].map(
                      (st, idx) => {
                        const statusOrder = [
                          "Diproses",
                          "Dikemas",
                          "Dikirim",
                          "Selesai",
                        ];
                        const active =
                          statusOrder.indexOf(ord.status) >= idx;
                        return (
                          <div key={st} className="flex flex-col items-center gap-1">
                            {idx === 2 ? (
                              <Truck
                                className={`h-4 w-4 ${
                                  active ? "text-[#3D6352]" : "text-[#D4D1C9]"
                                }`}
                              />
                            ) : (
                              <CheckCircle2
                                className={`h-4 w-4 ${
                                  active ? "text-[#3D6352]" : "text-[#D4D1C9]"
                                }`}
                              />
                            )}
                            <span
                              className={
                                active
                                  ? "font-bold text-[#141414]"
                                  : "text-[#6B6B6B]"
                              }
                            >
                              {st}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-sm">
                    <span className="text-xs text-[#6B6B6B]">
                      {ord.items.length} produk • {ord.paymentMethod}
                    </span>
                    <span className="font-bold text-[#141414]">
                      Total: {formatRupiah(ord.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="border border-[#E7E5E0] bg-[#FAF9F6] p-10 text-center">
                  <p className="text-sm font-semibold text-[#141414]">
                    Wishlist Anda masih kosong.
                  </p>
                  <Link
                    href="/kategori/wanita"
                    className="mt-4 inline-block bg-[#141414] px-6 py-2.5 text-xs font-bold uppercase text-white"
                  >
                    Jelajahi Produk
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-sm text-[#6B6B6B]">
          Memuat akun...
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
