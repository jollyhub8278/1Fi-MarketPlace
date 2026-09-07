import mongoose from "mongoose";

import { connectDatabase } from "../config/database";
import { Product } from "../models/product.model";

const calculateMonthlyPayment = (
  price: number,
  tenureMonths: number,
  annualInterestRate: number,
  downPayment: number
): number => {
  const principal = price - downPayment;

  if (annualInterestRate === 0) {
    return Math.ceil(principal / tenureMonths);
  }

  const monthlyRate = annualInterestRate / 12 / 100;

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.ceil(emi);
};

const createEmiPlans = (price: number) => {
  const downPayment = Math.round(price * 0.15);

  return [
    {
      tenureMonths: 6,
           monthlyPayment: calculateMonthlyPayment(
        price,
        6,
        0,
        downPayment
      ),
      interestRate: 0,
      cashback: Math.round(price * 0.01),
      downPayment,
    },
    {
      tenureMonths: 9,
      monthlyPayment: calculateMonthlyPayment(
        price,
        9,
        0,
        downPayment
      ),
      interestRate: 0,
      cashback: Math.round(price * 0.01),
      downPayment,
    },
    {
      tenureMonths: 12,
      monthlyPayment: calculateMonthlyPayment(
        price,
        12,
        10.5,
        downPayment
      ),
      interestRate: 10.5,
      cashback: 0,
      downPayment,
    },
  ];
};

const products = [
  {
    name: "Apple iPhone 17 Pro",
    slug: "apple-iphone-17-pro",
    brand: "Apple",
    category: "Smartphones",
    description:
      "A premium smartphone featuring a powerful processor, advanced cameras and a high-resolution display.",
    thumbnail:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=85",
    specifications: {
      Display: "6.3-inch Super Retina XDR",
      Processor: "Apple A-series Pro chip",
      Warranty: "1 year manufacturer warranty",
    },
    variants: [
      {
        sku: "IPH17PRO-SIL-256",
        color: "Silver",
        storage: "256 GB",
        mrp: 139900,
        price: 134900,
        images: [
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=90",
        ],
        stock: 15,
        emiPlans: createEmiPlans(134900),
      },
      {
        sku: "IPH17PRO-BLU-512",
        color: "Deep Blue",
        storage: "512 GB",
        mrp: 159900,
        price: 154900,
        images: [
          "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=90",
        ],
        stock: 9,
        emiPlans: createEmiPlans(154900),
      },
    ],
    isActive: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    category: "Smartphones",
    description:
      "A flagship Android smartphone with an immersive display, advanced camera system and S Pen support.",
    thumbnail:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=85",
    specifications: {
      Display: "6.8-inch Dynamic AMOLED",
      Processor: "Snapdragon flagship processor",
      Warranty: "1 year manufacturer warranty",
    },
    variants: [
      {
        sku: "S24U-GRY-256",
        color: "Titanium Gray",
        storage: "256 GB",
        mrp: 129999,
        price: 119999,
        images: [
          "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=90",
        ],
        stock: 18,
        emiPlans: createEmiPlans(119999),
      },
      {
        sku: "S24U-BLK-512",
        color: "Titanium Black",
        storage: "512 GB",
        mrp: 139999,
        price: 129999,
        images: [
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=90",
        ],
        stock: 11,
        emiPlans: createEmiPlans(129999),
      },
    ],
    isActive: true,
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    category: "Smartphones",
    description:
      "A Google flagship smartphone offering intelligent camera features, a clean Android experience and premium design.",
    thumbnail:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85",
    specifications: {
      Display: "6.3-inch OLED display",
      Processor: "Google Tensor processor",
      Warranty: "1 year manufacturer warranty",
    },
    variants: [
      {
        sku: "PIX9PRO-POR-256",
        color: "Porcelain",
        storage: "256 GB",
        mrp: 114999,
        price: 109999,
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=90",
        ],
        stock: 14,
        emiPlans: createEmiPlans(109999),
      },
      {
        sku: "PIX9PRO-OBS-512",
        color: "Obsidian",
        storage: "512 GB",
        mrp: 124999,
        price: 119999,
        images: [
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=90",
        ],
        stock: 8,
        emiPlans: createEmiPlans(119999),
      },
    ],
    isActive: true,
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDatabase();

    for (const product of products) {
      await Product.findOneAndUpdate(
        { slug: product.slug },
        { $set: product },
        {
          upsert: true,
          runValidators: true,
        }
      );
    }

    console.log(`${products.length} products seeded successfully`);
  } catch (error) {
    console.error("Failed to seed products:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

void seedDatabase();