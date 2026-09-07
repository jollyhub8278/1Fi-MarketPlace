import { SlidersHorizontal } from "lucide-react";

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "emi-low";

interface FilterChipGroupProps {
  label: string;
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
}

function FilterChipGroup({
  label,
  options,
  selectedOption,
  onChange,
}: FilterChipGroupProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-gray-600">
        {label}
      </p>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["all", ...options].map((option) => {
          const isSelected = selectedOption === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${
                isSelected
                  ? "border-[#712cdc] bg-[#712cdc] text-white"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              {option === "all" ? "All" : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface MarketplaceFiltersProps {
  categories: string[];
  brands: string[];
  selectedCategory: string;
  selectedBrand: string;
  sortOption: SortOption;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onSortChange: (option: SortOption) => void;
}

export function MarketplaceFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  sortOption,
  onCategoryChange,
  onBrandChange,
  onSortChange,
}: MarketplaceFiltersProps) {
  return (
    <div>
      <FilterChipGroup
        label="Category"
        options={categories}
        selectedOption={selectedCategory}
        onChange={onCategoryChange}
      />

      <div className="mt-3">
        <FilterChipGroup
          label="Brand"
          options={brands}
          selectedOption={selectedBrand}
          onChange={onBrandChange}
        />
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