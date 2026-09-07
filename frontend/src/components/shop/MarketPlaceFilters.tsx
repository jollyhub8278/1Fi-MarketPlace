import { SlidersHorizontal } from "lucide-react";

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "emi-low";

interface MarketplaceFiltersProps {
  brands: string[];
  selectedBrand: string;
  sortOption: SortOption;
  onBrandChange: (brand: string) => void;
  onSortChange: (option: SortOption) => void;
}

export function MarketplaceFilters({
  brands,
  selectedBrand,
  sortOption,
  onBrandChange,
  onSortChange,
}: MarketplaceFiltersProps) {
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => onBrandChange("all")}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${
            selectedBrand === "all"
              ? "border-[#712cdc] bg-[#712cdc] text-white"
              : "border-gray-200 bg-white text-gray-600"
          }`}
        >
          All
        </button>

        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => onBrandChange(brand)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${
              selectedBrand === brand
                ? "border-[#712cdc] bg-[#712cdc] text-white"
                : "border-gray-200 bg-white text-gray-600"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      <label className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3">
        <SlidersHorizontal
          size={17}
          className="text-gray-500"
        />

        <span className="text-xs font-medium text-gray-500">
          Sort:
        </span>

        <select
          value={sortOption}
          onChange={(event) =>
            onSortChange(event.target.value as SortOption)
          }
          className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-low">
            Price: Low to high
          </option>
          <option value="price-high">
            Price: High to low
          </option>
          <option value="emi-low">
            Lowest monthly EMI
          </option>
        </select>
      </label>
    </div>
  );
}