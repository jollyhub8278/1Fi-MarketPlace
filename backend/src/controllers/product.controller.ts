import { NextFunction, Request, Response } from "express";

import { findProductBySlug, findProducts } from "../services/product.service";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    const category =
      typeof req.query.category === "string"
        ? req.query.category.trim()
        : undefined;

    const products = await findProducts({
      search,
      category,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const slug = req.params.slug;

    if (typeof slug !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid product slug",
      });

      return;
    }

    const product = await findProductBySlug(slug);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
