import { apiClient } from "./client";
import type {
  ApiResponse,
  Product,
  ProductFilters,
} from "../types/product";

export const getProducts = async (
  filters: ProductFilters = {},
): Promise<Product[]> => {
  const response = await apiClient.get<ApiResponse<Product[]>>("/products", {
    params: filters,
  });

  return response.data.data;
};

export const getProductBySlug = async (
  slug: string,
): Promise<Product> => {
  const response = await apiClient.get<ApiResponse<Product>>(
    `/products/${slug}`,
  );

  return response.data.data;
};