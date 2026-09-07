import { useQuery } from "@tanstack/react-query";

import {
  getProductBySlug,
  getProducts,
} from "../api/products";

import type { ProductFilters } from "../types/product";

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
};

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: Boolean(slug),
  });
};