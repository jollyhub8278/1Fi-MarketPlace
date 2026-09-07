import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

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
      variant.emiPlans.map(
        (plan) => plan.monthlyPayment,
      ),
    ),
  );
};

export function ShopPage() {
  const [activeTab, setActiveTab] =
    useState<ShopTab>("marketplace");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [selectedBrand, setSelectedBrand] =
    useState("all");

  const [sortOption, setSortOption] =
    useState<SortOption>("featured");

  const [isFilterOpen, setIsFilterOpen] =
    useState(false);

  const [draftCategory, setDraftCategory] =
    useState("all");

  const [draftBrand, setDraftBrand] =
    useState("all");

  const [draftSortOption, setDraftSortOption] =
    useState<SortOption>("featured");

  const filterButtonRef =
    useRef<HTMLButtonElement>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useProducts({
    search: searchQuery || undefined,
  });

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products?.map((product) => product.category) ??
          [],
      ),
    ).sort();
  }, [products]);

  const draftBrands = useMemo(() => {
    const categoryProducts =
      draftCategory === "all"
        ? products ?? []
        : (products ?? []).filter(
            (product) =>
              product.category === draftCategory,
          );

    return Array.from(
      new Set(
        categoryProducts.map(
          (product) => product.brand,
        ),
      ),
    ).sort();
  }, [products, draftCategory]);

  const visibleProducts = useMemo(() => {
    const filtered = (products ?? []).filter(
      (product) => {
        const matchesCategory =
          selectedCategory === "all" ||
          product.category === selectedCategory;

        const matchesBrand =
          selectedBrand === "all" ||
          product.brand === selectedBrand;

        return matchesCategory && matchesBrand;
      },
    );

    if (sortOption === "price-low") {
      filtered.sort(
        (first, second) =>
          getLowestPrice(first) -
          getLowestPrice(second),
      );
    }

    if (sortOption === "price-high") {
      filtered.sort(
        (first, second) =>
          getLowestPrice(second) -
          getLowestPrice(first),
      );
    }

    if (sortOption === "emi-low") {
      filtered.sort(
        (first, second) =>
          getLowestEmi(first) -
          getLowestEmi(second),
      );
    }

    return filtered;
  }, [
    products,
    selectedCategory,
    selectedBrand,
    sortOption,
  ]);

  const draftProductCount = useMemo(() => {
    return (products ?? []).filter((product) => {
      const matchesCategory =
        draftCategory === "all" ||
        product.category === draftCategory;

      const matchesBrand =
        draftBrand === "all" ||
        product.brand === draftBrand;

      return matchesCategory && matchesBrand;
    }).length;
  }, [products, draftCategory, draftBrand]);

  const activeFilterCount =
    Number(selectedCategory !== "all") +
    Number(selectedBrand !== "all") +
    Number(sortOption !== "featured");

  const handleSearch = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const openFilterSheet = () => {
    setDraftCategory(selectedCategory);
    setDraftBrand(selectedBrand);
    setDraftSortOption(sortOption);
    setIsFilterOpen(true);
  };

  const closeFilterSheet = () => {
    setIsFilterOpen(false);
  };

  const handleDraftCategoryChange = (
    category: string,
  ) => {
    setDraftCategory(category);
    setDraftBrand("all");
  };

  const resetDraftFilters = () => {
    setDraftCategory("all");
    setDraftBrand("all");
    setDraftSortOption("featured");
  };

  const applyFilters = () => {
    setSelectedCategory(draftCategory);
    setSelectedBrand(draftBrand);
    setSortOption(draftSortOption);
    setIsFilterOpen(false);
  };

  const resetAllFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSortOption("featured");
  };

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener(
      "keydown",
      handleEscape,
    );

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape,
      );

      filterButtonRef.current?.focus();
    };
  }, [isFilterOpen]);

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

          {!isLoading && !isError && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1
                  ? "product"
                  : "products"}
              </p>

              <button
                ref={filterButtonRef}
                type="button"
                onClick={openFilterSheet}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm"
              >
                <SlidersHorizontal size={16} />

                Filters

                {activeFilterCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#712cdc] px-1 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
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
                  onClick={resetAllFilters}
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
          <h1 className="text-xl font-bold">
            Top Brands
          </h1>
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

      {isFilterOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeFilterSheet();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="filters-title"
            className="max-h-[85dvh] w-full max-w-[430px] overflow-y-auto rounded-t-[28px] bg-[#f6f6f7]"
          >
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
              <div>
                <h2
                  id="filters-title"
                  className="text-lg font-bold"
                >
                  Filters
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  Refine your marketplace results
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close filters"
                onClick={closeFilterSheet}
                className="grid h-9 w-9 place-items-center rounded-full bg-gray-100"
              >
                <X size={18} />
              </button>
            </header>

            <div className="p-5">
              <MarketplaceFilters
                categories={categories}
                brands={draftBrands}
                selectedCategory={draftCategory}
                selectedBrand={draftBrand}
                sortOption={draftSortOption}
                onCategoryChange={
                  handleDraftCategoryChange
                }
                onBrandChange={setDraftBrand}
                onSortChange={setDraftSortOption}
              />
            </div>

            <footer className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-white p-4">
              <button
                type="button"
                onClick={resetDraftFilters}
                className="flex-1 rounded-xl border border-[#712cdc] py-3 text-sm font-bold text-[#712cdc]"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={applyFilters}
                className="flex-[1.5] rounded-xl bg-[#712cdc] py-3 text-sm font-bold text-white"
              >
                Show {draftProductCount}{" "}
                {draftProductCount === 1
                  ? "product"
                  : "products"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}