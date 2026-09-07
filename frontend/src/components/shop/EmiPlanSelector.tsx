import type { EmiPlan } from "../../types/product";
import { formatCurrency } from "../../utils/currency";

interface EmiPlanSelectorProps {
  plans: EmiPlan[];
  selectedPlanId: string;
  onSelect: (plan: EmiPlan) => void;
}

export function EmiPlanSelector({
  plans,
  selectedPlanId,
  onSelect,
}: EmiPlanSelectorProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {plans.map((plan, index) => {
        const isSelected = plan._id === selectedPlanId;

        return (
          <button
            key={plan._id}
            type="button"
            onClick={() => onSelect(plan)}
            className={`flex w-full items-center gap-3 p-4 text-left ${
              index !== plans.length - 1
                ? "border-b border-gray-100"
                : ""
            } ${isSelected ? "bg-[#faf7ff]" : "bg-white"}`}
          >
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                isSelected
                  ? "border-[#712cdc]"
                  : "border-gray-300"
              }`}
            >
              {isSelected && (
                <span className="h-2.5 w-2.5 rounded-full bg-[#712cdc]" />
              )}
            </span>

            <span className="flex-1">
              <span className="block text-sm font-bold text-gray-900">
                {formatCurrency(plan.monthlyPayment)}
                <span className="font-normal">
                  {" "}
                  × {plan.tenureMonths} months
                </span>
              </span>

              {plan.cashback > 0 && (
                <span className="mt-1 block text-xs font-medium text-green-600">
                  Earn {formatCurrency(plan.cashback)} cashback
                </span>
              )}
            </span>

            <span
              className={`rounded px-2 py-1 text-[10px] font-bold ${
                plan.interestRate === 0
                  ? "bg-green-50 text-green-700"
                  : "bg-orange-50 text-orange-700"
              }`}
            >
              {plan.interestRate === 0
                ? "0% EMI"
                : `${plan.interestRate}%`}
            </span>
          </button>
        );
      })}
    </div>
  );
}