import React, { useState } from "react";

import { X, DollarSign, Calendar, Repeat } from "lucide-react";
import { Expense } from "../types";
import { expenseCategories } from "../data/expensesData";

interface AddExpenseModalProps {
  onClose: () => void;
  onSave: (expenseData: Partial<Expense>) => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  onClose,
  onSave,
}) => {
  const theme = "dark";
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense" as Expense["type"],
    category: "food",
    date: new Date().toISOString().split("T")[0],
    description: "",
    recurring: false,
    recurringPeriod: "monthly" as Expense["recurringPeriod"],
  });

  const modalBg = theme === "dark" ? "bg-background-dark" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const inputBg = theme === "dark" ? "bg-background" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

  const availableCategories = expenseCategories.filter(
    (cat) => cat.type === formData.type || cat.type === "both"
  );

  const handleSave = () => {
    if (!formData.title.trim() || !formData.amount) return;

    const expenseData: Partial<Expense> = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: new Date(formData.date),
      description: formData.description || undefined,
      recurring: formData.recurring,
      recurringPeriod: formData.recurring
        ? formData.recurringPeriod
        : undefined,
    };

    onSave(expenseData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${modalBg} rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${borderColor}`}
        >
          <h2 className={`text-xl font-semibold ${textPrimary}`}>
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:${inputBg} ${textSecondary} hover:${textPrimary} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Transaction Type */}
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "income",
                    category: "salary",
                  }))
                }
                className={`p-3 rounded-lg border-2 transition-colors ${
                  formData.type === "income"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : `border-gray-300 dark:border-gray-600 ${textSecondary} hover:${textPrimary}`
                }`}
              >
                Income
              </button>
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "expense",
                    category: "food",
                  }))
                }
                className={`p-3 rounded-lg border-2 transition-colors ${
                  formData.type === "expense"
                    ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    : `border-gray-300 dark:border-gray-600 ${textSecondary} hover:${textPrimary}`
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter transaction title..."
              autoFocus
            />
          </div>

          {/* Amount and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium ${textPrimary} mb-2`}
              >
                Amount *
              </label>
              <div className="relative">
                <DollarSign
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`}
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${textPrimary} mb-2`}
              >
                Date
              </label>
              <div className="relative">
                <Calendar
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`}
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {availableCategories.map((category) => (
                <option key={category.id} value={category.name.toLowerCase()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter transaction description..."
            />
          </div>

          {/* Recurring */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    recurring: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="recurring"
                className={`text-sm font-medium ${textPrimary} flex items-center space-x-1`}
              >
                <Repeat className="w-4 h-4" />
                <span>Recurring Transaction</span>
              </label>
            </div>

            {formData.recurring && (
              <select
                value={formData.recurringPeriod}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    recurringPeriod: e.target.value as any,
                  }))
                }
                className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end space-x-3 p-6 border-t ${borderColor}`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${inputBg} ${textSecondary} hover:${textPrimary} transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.title.trim() || !formData.amount}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};
