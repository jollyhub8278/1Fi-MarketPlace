export type ShopTab = "brands" | "nearby" | "marketplace";

interface ShopTabsProps {
  activeTab: ShopTab;
  onChange: (tab: ShopTab) => void;
}

const tabs: Array<{ id: ShopTab; label: string }> = [
  { id: "brands", label: "Top Brands" },
  { id: "nearby", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

export function ShopTabs({
  activeTab,
  onChange,
}: ShopTabsProps) {
  return (
    <div className="grid grid-cols-3 rounded-full bg-[#f1ebff] p-1 shadow-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative rounded-full px-2 py-3 text-xs font-semibold transition ${
              isActive
                ? "bg-white text-[#712cdc] shadow-sm"
                : "text-gray-500"
            }`}
          >
            {tab.label}

            {isActive && (
              <span className="absolute bottom-1 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-[#712cdc]" />
            )}
          </button>
        );
      })}
    </div>
  );
}