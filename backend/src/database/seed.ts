import mongoose from "mongoose";

import { connectDatabase } from "../config/database";
import { Product } from "../models/product.model";

const calculateMonthlyPayment = (
  price: number,
  tenureMonths: number,
  annualInterestRate: number,
  downPayment: number,
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
        downPayment,
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
        downPayment,
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
        downPayment,
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
    thumbnail: "/products/iphone-17-pro.jpg",
    specifications: {
      Display: "6.3-inch Super Retina XDR",
      Processor: "Apple A-series Pro chip",
      Camera: "Advanced Pro camera system",
      Storage: "256 GB or 512 GB",
      Connectivity: "5G, Wi-Fi and Bluetooth",
      Warranty: "1 year manufacturer warranty",
    },
    variants: [
      {
        sku: "IPH17PRO-SIL-256",
        color: "Silver",
        storage: "256 GB",
        mrp: 139900,
        price: 134900,
        images: ["/products/iphone-17-pro.jpg"],
        stock: 15,
        emiPlans: createEmiPlans(134900),
      },
      {
        sku: "IPH17PRO-BLU-512",
        color: "Deep Blue",
        storage: "512 GB",
        mrp: 159900,
        price: 154900,
        images: ["/products/iphone-17-pro.jpg"],
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
    thumbnail: "/products/galaxy-s24-ultra.jpg",
    specifications: {
      Display: "6.8-inch Dynamic AMOLED",
      Processor: "Snapdragon flagship processor",
      Camera: "Advanced multi-camera system",
      Storage: "256 GB or 512 GB",
      Features: "Built-in S Pen support",
      Warranty: "1 year manufacturer warranty",
    },
    variants: [
      {
        sku: "S24U-GRY-256",
        color: "Titanium Gray",
        storage: "256 GB",
        mrp: 129999,
        price: 119999,
        images: ["/products/galaxy-s24-ultra.jpg"],
        stock: 18,
        emiPlans: createEmiPlans(119999),
      },
      {
        sku: "S24U-BLK-512",
        color: "Titanium Black",
        storage: "512 GB",
        mrp: 139999,
        price: 129999,
        images: ["/products/galaxy-s24-ultra.jpg"],
        stock: 11,
        emiPlans: createEmiPlans(129999),
      },
    ],
    isActive: true,
  },
  {
  name: "Apple MacBook Air M3",
  slug: "apple-macbook-air-m3",
  brand: "Apple",
  category: "Laptops",
  description:
    "A lightweight laptop with Apple silicon, excellent battery life and a high-resolution Liquid Retina display.",
  thumbnail: "/products/macbook-air-midnight.jpg",
  specifications: {
    Display: "13.6-inch Liquid Retina display",
    Processor: "Apple M3 chip",
    Memory: "16 GB unified memory",
    Storage: "256 GB or 512 GB SSD",
    Battery: "Up to 18 hours",
    Warranty: "1 year manufacturer warranty",
  },
  variants: [
    {
      sku: "MBA-M3-MID-256",
      color: "Midnight",
      storage: "256 GB",
      mrp: 114900,
      price: 104900,
      images: [
        "/products/macbook-air-midnight.jpg",
      ],
      stock: 12,
      emiPlans: createEmiPlans(104900),
    },
    {
      sku: "MBA-M3-STAR-512",
      color: "Starlight",
      storage: "512 GB",
      mrp: 134900,
      price: 124900,
      images: [
        "/products/macbook-air-starlight.jpg",
      ],
      stock: 8,
      emiPlans: createEmiPlans(124900),
    },
  ],
  isActive: true,
},
{
  name: "Samsung Crystal 4K Smart TV",
  slug: "samsung-crystal-4k-smart-tv",
  brand: "Samsung",
  category: "Televisions",
  description:
    "A 4K smart television with vibrant picture quality, streaming applications and a slim modern design.",
  thumbnail: "/products/samsung-tv-43.jpg",
  specifications: {
    Display: "Crystal UHD 4K display",
    Resolution: "3840 × 2160 pixels",
    OperatingSystem: "Tizen OS",
    Connectivity: "Wi-Fi, Bluetooth, HDMI and USB",
    Audio: "Dolby Audio",
    Warranty: "1 year manufacturer warranty",
  },
  variants: [
    {
      sku: "SAM-TV-43-4K",
      color: "Black",
      finish: "43-inch",
      mrp: 44990,
      price: 38990,
      images: ["/products/samsung-tv-43.jpg"],
      stock: 10,
      emiPlans: createEmiPlans(38990),
    },
    {
      sku: "SAM-TV-55-4K",
      color: "Black",
      finish: "55-inch",
      mrp: 64990,
      price: 54990,
      images: ["/products/samsung-tv-55.jpg"],
      stock: 7,
      emiPlans: createEmiPlans(54990),
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
    thumbnail: "/products/pixel-9-pro.jpg",
    specifications: {
      Display: "6.3-inch OLED display",
      Processor: "Google Tensor processor",
      Camera: "AI-powered camera system",
      Storage: "256 GB or 512 GB",
      Software: "Android with Google AI features",
      Warranty: "1 year manufacturer warranty",
    },
    variants: [
      {
        sku: "PIX9PRO-POR-256",
        color: "Porcelain",
        storage: "256 GB",
        mrp: 114999,
        price: 109999,
        images: ["/products/pixel-9-pro.jpg"],
        stock: 14,
        emiPlans: createEmiPlans(109999),
      },
      {
        sku: "PIX9PRO-OBS-512",
        color: "Obsidian",
        storage: "512 GB",
        mrp: 124999,
        price: 119999,
        images: ["/products/pixel-9-pro.jpg"],
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
          new: true,
        },
      );
    }

    console.log(
      `${products.length} products seeded successfully`,
    );
  } catch (error) {
    console.error("Failed to seed products:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

void seedDatabase();