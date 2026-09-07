import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const lowestPricedVariant = product.variants.reduce(
    (lowest, variant) =>
      variant.price < lowest.price ? variant : lowest,
  );

  const lowestEmi = Math.min(
    ...lowestPricedVariant.emiPlans.map(
      (plan) => plan.monthlyPayment,
    ),
  );

  const discount = Math.round(
    ((lowestPricedVariant.mrp - lowestPricedVariant.price) /
      lowestPricedVariant.mrp) *
      100,
  );

  return (
    <Link
      to={`/products/${product.slug}`}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition active:scale-[0.98]"
    >
      <div className="relative bg-[#f8f8fa] p-3">
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-[#712cdc] px-2 py-1 text-[10px] font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="h-36 w-full object-contain"
        />
      </div>

      <div className="p-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">
            ₹{lowestPricedVariant.price.toLocaleString("en-IN")}
          </span>

          <span className="text-xs text-gray-400 line-through">
            ₹{lowestPricedVariant.mrp.toLocaleString("en-IN")}
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          EMI from{" "}
          <span className="font-semibold text-[#712cdc]">
            ₹{lowestEmi.toLocaleString("en-IN")}/month
          </span>
        </p>
      </div>
    </Link>
  );
}