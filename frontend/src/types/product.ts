export interface EmiPlan {
  _id: string;
  tenureMonths: number;
  monthlyPayment: number;
  interestRate: number;
  cashback: number;
  downPayment: number;
}

export interface ProductVariant {
  _id: string;
  sku: string;
  color: string;
  storage?: string;
  finish?: string;
  mrp: number;
  price: number;
  images: string[];
  stock: number;
  emiPlans: EmiPlan[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;
  thumbnail: string;
  specifications: Record<string, string>;
  variants: ProductVariant[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

export interface ProductFilters {
  search?: string;
  category?: string;
}