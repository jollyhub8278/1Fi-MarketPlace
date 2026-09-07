import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmiPlanSelector } from "../components/shop/EmiPlanSelector";
import { VariantSelector } from "../components/shop/VariantSelector";
import { useProduct } from "../hooks/useProducts";
import type { ProductVariant } from "../types/product";
import { formatCurrency } from "../utils/currency";

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useProduct(slug);

  const [selectedVariantId, setSelectedVariantId] =
    useState("");

  const [selectedPlanId, setSelectedPlanId] =
    useState("");

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const selectedVariant =
    product?.variants.find(
      (variant) => variant._id === selectedVariantId,
    ) ??
    product?.variants[0] ??
    null;

  const selectedPlan =
    selectedVariant?.emiPlans.find(
      (plan) => plan._id === selectedPlanId,
    ) ??
    selectedVariant?.emiPlans[0] ??
    null;

  const handleVariantSelect = (
    variant: ProductVariant,
  ) => {
    setSelectedVariantId(variant._id);
    setSelectedPlanId("");
    setSelectedImageIndex(0);
  };

  if (isLoading) {
    return (
      <div className="mx-auto min-h-dvh max-w-[430px] bg-gray-100 p-4">
        <div className="h-10 animate-pulse rounded-xl bg-gray-200" />
        <div className="mt-4 h-80 animate-pulse rounded-2xl bg-gray-200" />
        <div className="mt-4 h-32 animate-pulse rounded-2xl bg-gray-200" />
        <div className="mt-4 h-64 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (isError || !product || !selectedVariant) {
    return (
      <main className="mx-auto grid min-h-dvh max-w-[430px] place-items-center bg-gray-100 p-6 text-center">
        <div>
          <h1 className="text-xl font-bold">
            Product unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We couldn’t load this product.
          </p>

          {isError && (
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-full bg-[#712cdc] px-6 py-3 text-sm font-semibold text-white"
            >
              Try again
            </button>
          )}

          <Link
            to="/shop"
            className="mt-4 block text-sm font-semibold text-[#712cdc]"
          >
            Return to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  const selectedImage =
    selectedVariant.images[selectedImageIndex] ??
    selectedVariant.images[0];

  const discount =
    selectedVariant.mrp > 0
      ? Math.round(
          ((selectedVariant.mrp -
            selectedVariant.price) /
            selectedVariant.mrp) *
            100,
        )
      : 0;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-[#f6f6f7] pb-28">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <Link
          to="/shop"
          aria-label="Return to Marketplace"
          className="grid h-10 w-10 place-items-center rounded-full bg-gray-100"
        >
          <ArrowLeft size={21} />
        </Link>

        <div>
          <p className="text-xs text-gray-500">
            1Fi Marketplace
          </p>

          <p className="max-w-[280px] truncate text-sm font-semibold">
            {product.name}
          </p>
        </div>
      </header>

      <section className="bg-white p-4">
        <div className="relative rounded-2xl bg-[#f8f8fa] p-4">
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-[#712cdc] px-3 py-1 text-xs font-bold text-white">
              {discount}% OFF
            </span>
          )}

          <img
            src={selectedImage}
            alt={`${product.name} ${selectedVariant.color}`}
            className="h-72 w-full object-contain"
          />
        </div>

        {selectedVariant.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {selectedVariant.images.map(
              (image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={
                    selectedImageIndex === index
                  }
                  onClick={() =>
                    setSelectedImageIndex(index)
                  }
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border ${
                    selectedImageIndex === index
                      ? "border-[#712cdc]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ),
            )}
          </div>
        )}
      </section>

      <section className="mt-2 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#712cdc]">
          {product.brand}
        </p>

        <h1 className="mt-1 text-2xl font-bold leading-tight text-gray-950">
          {product.name}
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-950">
            {formatCurrency(selectedVariant.price)}
          </span>

          <span className="pb-0.5 text-sm text-gray-400 line-through">
            {formatCurrency(selectedVariant.mrp)}
          </span>
        </div>

        <p className="mt-1 text-xs font-medium text-green-600">
          You save{" "}
          {formatCurrency(
            selectedVariant.mrp -
              selectedVariant.price,
          )}
        </p>
      </section>

      <section className="mt-2 bg-white p-5">
        <h2 className="text-base font-bold">
          Choose a variant
        </h2>

        <p className="mb-4 mt-1 text-xs text-gray-500">
          Select your preferred colour and storage.
        </p>

        <VariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariant._id}
          onSelect={handleVariantSelect}
        />
      </section>

      <section className="mt-2 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-base font-bold">
            Choose EMI tenure
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Select a payment plan backed by your mutual
            funds.
          </p>
        </div>

        {selectedPlan && (
          <div className="mb-4 rounded-2xl bg-[#f5efff] p-4">
            <p className="text-xs text-gray-500">
              Pay now
            </p>

            <p className="mt-1 text-xl font-bold text-[#712cdc]">
              {formatCurrency(
                selectedPlan.downPayment,
              )}
            </p>
          </div>
        )}

        <EmiPlanSelector
          plans={selectedVariant.emiPlans}
          selectedPlanId={selectedPlan?._id ?? ""}
          onSelect={(plan) =>
            setSelectedPlanId(plan._id)
          }
        />
      </section>

      <section className="mt-2 bg-white p-5">
        <h2 className="text-base font-bold">
          Product details
        </h2>

        <dl className="mt-4 divide-y divide-gray-100">
          {Object.entries(product.specifications).map(
            ([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-2 gap-4 py-3 text-sm"
              >
                <dt className="text-gray-500">
                  {label}
                </dt>

                <dd className="text-right font-medium text-gray-900">
                  {value}
                </dd>
              </div>
            ),
          )}
        </dl>
      </section>

      <section className="mt-2 flex items-start gap-3 bg-white p-5">
        <ShieldCheck
          size={24}
          className="shrink-0 text-[#712cdc]"
        />

        <div>
          <p className="text-sm font-semibold">
            Secure EMI with 1Fi
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Your EMI is backed by your mutual fund
            investments.
          </p>
        </div>
      </section>

      <footer className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 border-t border-gray-100 bg-white p-4 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-gray-500">
            Monthly payment
          </p>

          <p className="truncate text-base font-bold">
            {selectedPlan
              ? `${formatCurrency(
                  selectedPlan.monthlyPayment,
                )} × ${selectedPlan.tenureMonths}`
              : "Select a plan"}
          </p>
        </div>

        <button
          type="button"
          disabled={
            !selectedPlan ||
            selectedVariant.stock === 0
          }
          onClick={() =>
            setShowConfirmation(true)
          }
          className="rounded-xl bg-[#712cdc] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Proceed
        </button>
      </footer>

      {showConfirmation && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            className="w-full max-w-[430px] rounded-t-[28px] bg-white p-6"
          >
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close confirmation"
                onClick={() =>
                  setShowConfirmation(false)
                }
                className="grid h-9 w-9 place-items-center rounded-full bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <CheckCircle2
              size={48}
              className="mx-auto text-green-500"
            />

            <h2
              id="confirmation-title"
              className="mt-4 text-center text-xl font-bold"
            >
              Plan selected
            </h2>

            <p className="mt-2 text-center text-sm text-gray-500">
              You selected the{" "}
              {selectedPlan.tenureMonths}-month EMI plan
              for {product.name}.
            </p>

            <div className="mt-5 rounded-2xl bg-[#f5efff] p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Monthly payment
                </span>

                <span className="font-bold">
                  {formatCurrency(
                    selectedPlan.monthlyPayment,
                  )}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">
                  Down payment
                </span>

                <span className="font-bold">
                  {formatCurrency(
                    selectedPlan.downPayment,
                  )}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">
                  Interest
                </span>

                <span className="font-bold">
                  {selectedPlan.interestRate}%
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowConfirmation(false)
              }
              className="mt-5 w-full rounded-xl bg-[#712cdc] py-3.5 text-sm font-bold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}