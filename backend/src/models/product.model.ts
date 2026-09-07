import { model, Schema } from "mongoose";

export interface IEmiPlan {
  tenureMonths: number;
  monthlyPayment: number;
  interestRate: number;
  cashback: number;
  downPayment: number;
}

export interface IProductVariant {
  sku: string;
  color: string;
  storage?: string;
  finish?: string;
  mrp: number;
  price: number;
  images: string[];
  stock: number;
  emiPlans: IEmiPlan[];
}

export interface IProduct {
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;
  thumbnail: string;
  specifications: Map<string, string>;
  variants: IProductVariant[];
  isActive: boolean;
}

const emiPlanSchema = new Schema<IEmiPlan>(
  {
    tenureMonths: {
      type: Number,
      required: true,
      min: 1,
    },
    monthlyPayment: {
      type: Number,
      required: true,
      min: 0,
    },
    interestRate: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    cashback: {
      type: Number,
      min: 0,
      default: 0,
    },
    downPayment: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    _id: true,
  }
);

const productVariantSchema = new Schema<IProductVariant>(
  {
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    storage: {
      type: String,
      trim: true,
    },
    finish: {
      type: String,
      trim: true,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (images: string[]) => images.length > 0,
        message: "A variant must contain at least one image",
      },
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    emiPlans: {
      type: [emiPlanSchema],
      required: true,
      validate: {
        validator: (plans: IEmiPlan[]) => plans.length > 0,
        message: "A variant must contain at least one EMI plan",
      },
    },
  },
  {
    _id: true,
  }
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    variants: {
      type: [productVariantSchema],
      required: true,
      validate: {
        validator: (variants: IProductVariant[]) => variants.length >= 2,
        message: "A product must contain at least two variants",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  name: "text",
  brand: "text",
  category: "text",
});

export const Product = model<IProduct>("Product", productSchema);