import React, { useState } from "react";

import { X, DollarSign, Calendar, Repeat } from "lucide-react";
import { Expense } from "../types";
import { expenseCategories } from "../data/expensesData";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface AddExpenseModalProps {
  onClose: () => void;
  onSave: (expenseData: Partial<Expense>) => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  onClose,
  onSave,
}) => {
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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`border border-green-400/20 bg-black/60 backdrop-blur-xl shadow-[0_0_10px_#00ff88aa] p-6
          rounded-lg w-full max-w-lg max-h-[95vh] overflow-y-auto`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b border-green-700`}
        >
          <h2 className={`text-xl font-semibold text-white`}>
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-green-900 text-green-50 hover:text-white transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6  space-y-6">
          {/* Transaction Type */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "income",
                    category: "salary",
                  }))
                }
                className={`p-3 rounded-lg border-2 transition-colors ${
                  formData.type === "income" &&
                  "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                }`}
              >
                Income
              </Button>
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
                    : `border-gray-300 dark:border-gray-600 text-green-50 hover:text-white`
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Title *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter transaction title..."
              autoFocus
            />
          </div>

          {/* Amount and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium text-white mb-2`}>
                Amount *
              </label>
              <Input
                Icon={DollarSign}
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
                placeholder="0.00"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium text-white mb-2`}>
                Date
              </label>

              <Input
                Icon={Calendar}
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className=" px-4 w-full py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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
            <label className={`block text-sm font-medium text-white mb-2`}>
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
              className=" px-4 w-full py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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
              />
              <label
                htmlFor="recurring"
                className={`text-sm font-medium text-white flex items-center space-x-1`}
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
                    recurringPeriod: e.target.value as
                      | "weekly"
                      | "monthly"
                      | "yearly",
                  }))
                }
                className=" px-4 w-full py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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
          className={`flex items-center justify-end space-x-3 p-6 border-t border-green-700`}
        >
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.title.trim() || !formData.amount}
          >
            Add Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};
