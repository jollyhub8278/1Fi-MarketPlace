import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware";
import productRouter from "./routes/product.routes";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "1Fi Marketplace API is running",
  });
});

app.use("/api/products", productRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;