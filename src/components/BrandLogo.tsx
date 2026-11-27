import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  inverted?: boolean;
}

export function BrandLogo({ className, inverted = false }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center select-none",
        inverted ? "rounded-sm bg-white px-2 py-1" : "",
        className
      )}
    >
      <Image
        src="/robi-shop-logo.png"
        alt="ROBI SHOP"
        width={665}
        height={302}
        className="h-12 w-auto object-contain"
      />
    </span>
  );
}
