"use client";
import { Edit, Repeat, Trash2 } from "lucide-react";
import { Expense } from "../types";
import { ExpenseCategory } from "../types";

export default function ExpensesTable({
  filteredExpenses,
}: {
  filteredExpenses: Expense[];
}) {
  return (
    <div className="w-full overflow-x-auto border-2 border-green-500/10 rounded-lg shadow-inner bg-black/20 backdrop-blur-2xl">
      <table className="min-w-full text-sm text-left text-green-100">
        <thead className="bg-green-950/10 border-b border-green-500/20">
          <tr>
            <th className="px-4 py-3 vindey text-green-50 font-semibold">
              Title
            </th>
            <th className="px-4 py-3 vindey text-green-50 font-semibold">
              Category
            </th>
            <th className="px-4 py-3 vindey text-green-50 font-semibold">
              Date
            </th>
            <th className="px-4 py-3 vindey text-green-50 font-semibold">
              Amount
            </th>
            <th className="px-4 py-3 vindey text-green-50 font-semibold">
              Type
            </th>
            <th className="px-4 py-3 vindey text-green-50 font-semibold">
              Recurring
            </th>
            <th className="px-4 py-3 vindey text-green-50 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => {
            const isIncome = expense.type === "income";
            const category = expenseCategories.find(
              (c) => c.name.toLowerCase() === expense.category
            );

            return (
              <tr
                key={expense.id}
                className="border-b  border-green-900 hover:bg-green-900/30 transition-colors"
              >
                <td className="px-4 py-3 poppins font-medium">
                  {expense.title}
                </td>
                <td className="px-4 py-3 poppins">
                  {category?.name || expense.category}
                </td>
                <td className="px-4 py-3 poppins">
                  {/* {expense.date.toLocaleDateString()} */}
                </td>
                <td
                  className={`px-4 py-3 poppins font-semibold ${
                    isIncome ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {/* {isIncome ? "+" : "-"}${expense.amount.toLocaleString()} */}
                </td>
                <td className="px-4 py-3 poppins capitalize">{expense.type}</td>
                <td className="px-4 py-3 poppins text-xs">
                  {expense.recurring ? (
                    <span className="flex items-center gap-1 text-green-300">
                      <Repeat className="w-4 h-4" />
                      {expense.recurringPeriod}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => console.log(expense)}
                      className="text-blue-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-white"
                      onClick={() => {
                        // delete logic
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const expenseCategories: ExpenseCategory[] = [
  { id: "1", name: "Salary", color: "#10B981", type: "income" },
  { id: "2", name: "Freelance", color: "#3B82F6", type: "income" },
  { id: "3", name: "Investment", color: "#8B5CF6", type: "income" },
  { id: "4", name: "Housing", color: "#EF4444", type: "expense" },
  { id: "5", name: "Food", color: "#F59E0B", type: "expense" },
  { id: "6", name: "Transportation", color: "#06B6D4", type: "expense" },
  { id: "7", name: "Utilities", color: "#84CC16", type: "expense" },
  { id: "8", name: "Entertainment", color: "#EC4899", type: "expense" },
  { id: "9", name: "Healthcare", color: "#F97316", type: "expense" },
  { id: "10", name: "Shopping", color: "#6366F1", type: "expense" },
];
