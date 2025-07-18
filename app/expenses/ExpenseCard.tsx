import React, { useState } from "react";

import {
  TrendingUp,
  TrendingDown,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Repeat,
} from "lucide-react";
import { Expense } from "../types";
import { expenseCategories } from "../data/expensesData";

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  onEdit,
}) => {
  const theme = "dark";
  const [showMenu, setShowMenu] = useState(false);

  const cardBg = theme === "dark" ? "bg-background-dark" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const hoverBg =
    theme === "dark" ? "hover:bg-background" : "hover:bg-gray-100";

  const category = expenseCategories.find(
    (c) => c.name.toLowerCase() === expense.category
  );
  const isIncome = expense.type === "income";

  return (
    <div
      className={`${cardBg} rounded-lg border ${borderColor} p-4 hover:shadow-lg transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Category Color & Icon */}
          <div className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category?.color || "#6B7280" }}
            />
            {isIncome ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </div>

          {/* Transaction Details */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`font-semibold ${textPrimary}`}>
                {expense.title}
              </h3>
              {expense.recurring && (
                <div className="flex items-center space-x-1">
                  <Repeat className={`w-3 h-3 ${textSecondary}`} />
                  <span className={`text-xs ${textSecondary}`}>
                    {expense.recurringPeriod}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span
                className={`text-sm px-2 py-1 rounded-full ${textSecondary} bg-gray-100 dark:bg-background`}
              >
                {category?.name || expense.category}
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className={`w-3 h-3 ${textSecondary}`} />
                <span className={`text-xs ${textSecondary}`}>
                  {expense.date.toLocaleDateString()}
                </span>
              </div>
            </div>

            {expense.description && (
              <p className={`text-sm ${textSecondary} mt-1 line-clamp-1`}>
                {expense.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Amount */}
          <div className="text-right">
            <p
              className={`text-lg font-bold ${
                isIncome ? "text-green-500" : "text-red-500"
              }`}
            >
              {isIncome ? "+" : "-"}${expense.amount.toLocaleString()}
            </p>
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-lg ${hoverBg} ${textSecondary} hover:${textPrimary} transition-colors`}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div
                className={`absolute right-0 top-10 ${cardBg} border ${borderColor} rounded-lg shadow-lg py-1 z-10 min-w-32`}
              >
                <button
                  onClick={() => {
                    onEdit(expense);
                    setShowMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm ${textSecondary} ${hoverBg}`}
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-500 ${hoverBg}`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
