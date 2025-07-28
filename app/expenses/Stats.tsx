import { Expense } from "../types";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export default function Stats({ expenses }: { expenses: Expense[] }) {
  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  const stats = [
    {
      title: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      title: "Net Income",
      value: netIncome,
      icon: DollarSign,
      color: netIncome >= 0 ? "text-green-500" : "text-red-500",
      bg:
        netIncome >= 0
          ? "bg-green-100 dark:bg-green-900/30"
          : "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`${
              stat.title === "Net Income" && "col-span-2 md:col-span-1"
            } border bg-green-950/90 px-2 py-2 md:p-6 md:my-4 border-green-400/20 backdrop-blur-xl rounded-lg cursor-pointer overflow-hidden  transition-all duration-200 group shadow-[0_0_1px_1px_rgba(0,255,0,0.8)] hover:shadow-[0_0_5px_2px_rgba(0,255,0,0.9)]`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-green-50 mb-1`}>
                  {stat.title}
                </p>
                <p className={`text-xl md:text-3xl font-bold text-white`}>
                  ₦{Math.abs(stat.value).toLocaleString()}
                </p>
              </div>
              <div className={`p-3  rounded-full ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
