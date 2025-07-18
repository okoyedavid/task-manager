import React from "react";

import { Expense } from "../types";

interface ExpenseChartProps {
  expenses: Expense[];
  period: "week" | "month" | "year";
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({
  expenses,
  period,
}) => {
  const theme = "dark";

  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";

  // Simple bar chart representation
  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const maxAmount = Math.max(totalIncome, totalExpenses);
  const incomePercentage = (totalIncome / maxAmount) * 100;
  const expensePercentage = (totalExpenses / maxAmount) * 100;

  return (
    <div className="space-y-6">
      {/* Income vs Expenses Bars */}
      <div className="space-y-4">
        {/* Income Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${textPrimary}`}>Income</span>
            <span className={`text-sm font-bold text-green-500`}>
              ${totalIncome.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${incomePercentage}%` }}
            />
          </div>
        </div>

        {/* Expenses Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${textPrimary}`}>
              Expenses
            </span>
            <span className={`text-sm font-bold text-red-500`}>
              ${totalExpenses.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${expensePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${textSecondary}`}>
            Net Income
          </span>
          <span
            className={`text-lg font-bold ${
              totalIncome - totalExpenses >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ${Math.abs(totalIncome - totalExpenses).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Period Info */}
      <div className={`text-center text-xs ${textSecondary}`}>
        Showing data for the current {period}
      </div>
    </div>
  );
};
