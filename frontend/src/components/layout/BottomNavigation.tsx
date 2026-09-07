import {
  ChartNoAxesColumnIncreasing,
  House,
  ReceiptIndianRupee,
  Store,
  UserRound,
} from "lucide-react";

const navigationItems = [
  { label: "Home", icon: House },
  { label: "Shop", icon: Store },
  { label: "EMI Dues", icon: ReceiptIndianRupee },
  { label: "Limit", icon: ChartNoAxesColumnIncreasing },
  { label: "Profile", icon: UserRound },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 grid w-[calc(100%-24px)] max-w-[406px] -translate-x-1/2 grid-cols-5 rounded-[28px] bg-white px-2 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      {navigationItems.map(({ label, icon: Icon }) => {
        const isActive = label === "Shop";

        return (
          <button
            key={label}
            type="button"
            className={`flex flex-col items-center gap-1 text-[11px] ${
              isActive
                ? "font-semibold text-[#712cdc]"
                : "text-gray-400"
            }`}
          >
            <span className="relative">
              {isActive && (
                <span className="absolute -top-2 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#712cdc]" />
              )}

              <Icon size={23} strokeWidth={isActive ? 2.4 : 1.8} />
            </span>

            {label}
          </button>
        );
      })}
    </nav>
  );
}