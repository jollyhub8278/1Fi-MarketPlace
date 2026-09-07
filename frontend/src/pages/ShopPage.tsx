import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Search, X } from "lucide-react";

import { BottomNavigation } from "../components/layout/BottomNavigation";
import {
  MarketplaceFilters,
  type SortOption,
} from "../components/shop/MarketPlaceFilters";
import { ProductCard } from "../components/shop/ProductCard";
import {
  ShopTabs,
  type ShopTab,
} from "../components/shop/ShopTabs";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

const getLowestPrice = (product: Product): number => {
  return Math.min(
    ...product.variants.map((variant) => variant.price),
  );
};

const getLowestEmi = (product: Product): number => {
  return Math.min(
    ...product.variants.flatMap((variant) =>
      variant.emiPlans.map((plan) => plan.monthlyPayment),
    ),
  );
};

export function ShopPage() {
  const [activeTab, setActiveTab] =
    useState<ShopTab>("marketplace");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("featured");

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useProducts({
    search: searchQuery || undefined,
  });

  const brands = useMemo(() => {
    return Array.from(
      new Set(products?.map((product) => product.brand) ?? []),
    ).sort();
  }, [products]);

  const visibleProducts = useMemo(() => {
    const filtered =
      selectedBrand === "all"
        ? [...(products ?? [])]
        : (products ?? []).filter(
            (product) => product.brand === selectedBrand,
          );

    if (sortOption === "price-low") {
      filtered.sort(
        (first, second) =>
          getLowestPrice(first) - getLowestPrice(second),
      );
    }

    if (sortOption === "price-high") {
      filtered.sort(
        (first, second) =>
          getLowestPrice(second) - getLowestPrice(first),
      );
    }

    if (sortOption === "emi-low") {
      filtered.sort(
        (first, second) =>
          getLowestEmi(first) - getLowestEmi(second),
      );
    }

    return filtered;
  }, [products, selectedBrand, sortOption]);

  const handleSearch = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSelectedBrand("all");
    setSearchQuery(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setSelectedBrand("all");
  };

  const resetFilters = () => {
    setSelectedBrand("all");
    setSortOption("featured");
    clearSearch();
  };

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-[#f6f6f7] pb-28 shadow-sm">
      <header>
        <img
          src="/shop-banner.webp"
          alt="Shop today and pay later using mutual funds"
          className="aspect-[3/2] w-full object-cover"
        />
      </header>

      <section className="relative -mt-6 px-4">
        <ShopTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </section>

      {activeTab === "marketplace" && (
        <section className="px-4 pt-5">
          <form
            onSubmit={handleSearch}
            className="flex items-center rounded-full border border-gray-200 bg-white px-4"
          >
            <Search
              size={21}
              className="shrink-0 text-gray-400"
            />

            <input
              type="search"
              value={searchInput}
              onChange={(event) =>
                setSearchInput(event.target.value)
              }
              placeholder="Search products..."
              aria-label="Search Marketplace products"
              className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-gray-400"
            />

            {searchInput && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={clearSearch}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-100"
              >
                <X size={16} />
              </button>
            )}
          </form>

          <div className="mb-4 mt-6">
            <h1 className="text-xl font-bold text-gray-950">
              1Fi Marketplace
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Shop products with flexible EMI plans
            </p>
          </div>

          {!isLoading && !isError && products && (
            <MarketplaceFilters
              brands={brands}
              selectedBrand={selectedBrand}
              sortOption={sortOption}
              onBrandChange={setSelectedBrand}
              onSortChange={setSortOption}
            />
          )}

          {!isLoading && !isError && (
            <div className="mb-3 mt-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1
                  ? "product"
                  : "products"}
              </p>

              {(searchQuery ||
                selectedBrand !== "all" ||
                sortOption !== "featured") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#712cdc]"
                >
                  Reset filters
                </button>
              )}
            </div>
          )}

          {isLoading && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="mt-5 rounded-2xl bg-white p-6 text-center">
              <p className="font-semibold">
                Unable to load products
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-3 rounded-full bg-[#712cdc] px-5 py-2 text-sm font-semibold text-white"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading &&
            !isError &&
            visibleProducts.length === 0 && (
              <div className="mt-5 rounded-2xl bg-white p-8 text-center">
                <p className="font-semibold">
                  No products found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 text-sm font-semibold text-[#712cdc]"
                >
                  Clear all filters
                </button>
              </div>
            )}

          {!isLoading &&
            !isError &&
            visibleProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            )}
        </section>
      )}

      {activeTab === "brands" && (
        <section className="px-5 pt-7">
          <h1 className="text-xl font-bold">Top Brands</h1>
        </section>
      )}

      {activeTab === "nearby" && (
        <section className="px-5 pt-7">
          <h1 className="text-xl font-bold">
            Nearby Stores
          </h1>
        </section>
      )}

      <BottomNavigation />
    </div>
  );
}