import { useState } from "react";
import type { FormEvent } from "react";
import { Search } from "lucide-react";

import { BottomNavigation } from "../components/layout/BottomNavigation";
import { ShopTabs, type ShopTab,} from "../components/shop/ShopTabs";
import { ProductCard } from "../components/shop/ProductCard";
import { useProducts } from "../hooks/useProducts";

export function ShopPage() {
  const [activeTab, setActiveTab] =
    useState<ShopTab>("marketplace");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useProducts({
    search: searchQuery || undefined,
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInput.trim());
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
              className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-gray-400"
            />
          </form>

          <div className="mb-4 mt-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-950">
                1Fi Marketplace
              </h1>

              {!isLoading && (
                <p className="mt-1 text-xs text-gray-500">
                  {products?.length ?? 0} products available
                </p>
              )}
            </div>
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-2xl bg-white p-6 text-center">
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

          {!isLoading && !isError && products?.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center">
              <p className="font-semibold">No products found</p>
              <p className="mt-1 text-sm text-gray-500">
                Try searching with another product name.
              </p>
            </div>
          )}

          {!isLoading && !isError && products && (
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
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
          <h1 className="text-xl font-bold">Nearby Stores</h1>
        </section>
      )}

      <BottomNavigation />
    </div>
  );
}