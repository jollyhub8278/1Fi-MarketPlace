import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { ProductCard } from "../components/shop/ProductCard";
import type { Product } from "../types/product";

const product: Product = {
  _id: "product-1",
  name: "Test Phone",
  slug: "test-phone",
  brand: "Test Brand",
  category: "Smartphones",
  description: "A phone used for component testing.",
  thumbnail: "/products/test-phone.jpg",
  specifications: {},
  isActive: true,
  createdAt: "2026-09-07T00:00:00.000Z",
  updatedAt: "2026-09-07T00:00:00.000Z",
  __v: 0,
  variants: [
    {
      _id: "variant-1",
      sku: "TEST-256",
      color: "Black",
      storage: "256 GB",
      mrp: 12000,
      price: 10000,
      images: ["/products/test-phone.jpg"],
      stock: 5,
      emiPlans: [
        {
          _id: "plan-1",
          tenureMonths: 6,
          monthlyPayment: 1500,
          interestRate: 0,
          cashback: 100,
          downPayment: 1000,
        },
      ],
    },
  ],
};

describe("ProductCard", () => {
  it("displays product and pricing information", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Test Phone",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByText("₹10,000")).toBeInTheDocument();
    expect(
      screen.getByText("₹1,500/month"),
    ).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/products/test-phone",
    );
  });
});