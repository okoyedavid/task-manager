"use client";
import { useSetUrl } from "../hooks/useSeturl";

export default function Filters() {
  const { searchParams, setParams } = useSetUrl();

  const selectedPeriod = searchParams.get("period") || "month";
  const selectedType = searchParams.get("type") || "all";

  return (
    <div className="flex mb-6 flex-col md:flex-row gap-4">
      <div className="flex border overflow-hidden border-green-900 rounded-lg">
        {["week", "month", "year"].map((period) => (
          <button
            key={period}
            onClick={() => setParams({ period })}
            className={`px-3 py-1 text-sm transition-colors ${
              selectedPeriod === period
                ? "bg-green-500 text-white"
                : `text-green-50 hover:text-white hover:bg-green-950 dark:hover:bg-background`
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>
      <select
        value={selectedType}
        onChange={(e) => setParams({ type: e.target.value })}
        className=" px-4 w-fit py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
      >
        <option value="all">All Transactions</option>
        <option value="income">Income Only</option>
        <option value="expense">Expenses Only</option>
      </select>
    </div>
  );
}
