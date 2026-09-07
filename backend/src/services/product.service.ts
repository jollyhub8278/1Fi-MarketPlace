import { Product } from "../models/product.model";

interface ProductFilters {
  search?: string;
  category?: string;
}

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const findProducts = async ({
  search,
  category,
}: ProductFilters) => {
  let query = Product.find({
    isActive: true,
  });

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), "i");

    query = query.or([
      { name: searchRegex },
      { brand: searchRegex },
      { category: searchRegex },
    ]);
  }

  if (category) {
    const categoryRegex = new RegExp(
      `^${escapeRegex(category)}$`,
      "i"
    );

    query = query.where("category").regex(categoryRegex);
  }

  return query
    .sort({ createdAt: -1 })
    .lean();
};

export const findProductBySlug = async (slug: string) => {
  return Product.findOne({
    slug,
    isActive: true,
  }).lean();
};