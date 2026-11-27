import React from "react";
import { EDITORIAL_ARTICLES } from "@/data/catalog";

export default function ThreadBlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="border-b border-[#E7E5E0] pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">
          THREAD BY OROBIISHOP
        </span>
        <h1 className="mt-1.5 text-3xl font-bold text-[#141414]">
          Jurnal Gaya, Tren & Keberlanjutan
        </h1>
        <p className="mt-2 text-sm text-[#6B6B6B]">
          Kurasi artikel panduan padupadan, kisah di balik wastra Nusantara,
          hingga tips merawat pakaian agar tahan lama.
        </p>
      </div>

      <div className="mt-8 space-y-12">
        {EDITORIAL_ARTICLES.map((article) => (
          <article
            key={article.slug}
            id={article.slug}
            className="grid gap-6 border-b border-[#E7E5E0] pb-10 md:grid-cols-12"
          >
            <div className="md:col-span-5">
              <img
                src={article.image}
                alt={article.title}
                className="aspect-[16/10] w-full object-cover bg-[#F3F2EE]"
              />
            </div>
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                <span className="text-[#C85A32]">{article.category}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-[#141414]">
                {article.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#4A4A4A]">
                {article.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
