import type { ProductVariant } from "../../types/product";
import { formatCurrency } from "../../utils/currency";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {variants.map((variant) => {
        const isSelected = variant._id === selectedVariantId;

        return (
          <button
            key={variant._id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(variant)}
            className={`rounded-xl border p-3 text-left transition ${
              isSelected
                ? "border-[#712cdc] bg-[#f5efff] ring-1 ring-[#712cdc]"
                : "border-gray-200 bg-white"
            }`}
          >
            <p className="text-sm font-semibold text-gray-900">
              {variant.color}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {variant.storage ?? variant.finish}
            </p>

            <p className="mt-2 text-sm font-bold">
              {formatCurrency(variant.price)}
            </p>

            {variant.stock > 0 ? (
              <p className="mt-1 text-[11px] text-green-600">
                In stock
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-red-500">
                Out of stock
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}