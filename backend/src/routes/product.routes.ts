import { Router } from "express";

import {
  getProductBySlug,
  getProducts,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:slug", getProductBySlug);

export default productRouter;