export type CategorySlug =
  | "wanita"
  | "pria"
  | "sports"
  | "anak"
  | "luxury"
  | "beauty";

export type SubcategoryName =
  | "Pakaian"
  | "Sepatu"
  | "Tas"
  | "Aksesoris"
  | "Baju Muslim"
  | "Batik"
  | "Skincare & Makeup"
  | "Activewear";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  subcategories: SubcategoryName[];
}

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logoText: string;
  image: string;
  featured: boolean;
  origin: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  sizePurchased: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandSlug: string;
  brandName: string;
  category: CategorySlug;
  subcategory: SubcategoryName;
  price: number;
  originalPrice?: number;
  images: [string, string, ...string[]];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isEco?: boolean;
  isLimitedEdition?: boolean;
  description: string;
  careDetails: string[];
  material: string;
  reviews: ProductReview[];
  tags: string[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  brandName: string;
  image: string;
  price: number;
  originalPrice?: number;
  color: string;
  size: string;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  shippingMethod: string;
  paymentMethod: string;
  address: Address;
  status: "Diproses" | "Dikemas" | "Dikirim" | "Selesai";
}

export interface EditorialArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
}
