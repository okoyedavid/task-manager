import React, { useState } from "react";

import { X, DollarSign, Tag, Flag } from "lucide-react";
import { ShoppingItem } from "../types";
import { shoppingCategories } from "../data/shoppingData";

interface AddShoppingItemModalProps {
  onClose: () => void;
  onSave: (itemData: Partial<ShoppingItem>) => void;
}

export const AddShoppingItemModal: React.FC<AddShoppingItemModalProps> = ({
  onClose,
  onSave,
}) => {
  const theme = "dark";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    priority: "medium" as ShoppingItem["priority"],
    status: "wishlist" as ShoppingItem["status"],
    url: "",
    notes: "",
  });

  const modalBg = theme === "dark" ? "bg-background-dark" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const inputBg = theme === "dark" ? "bg-background" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

  const handleSave = () => {
    if (!formData.name.trim()) return;

    const itemData: Partial<ShoppingItem> = {
      name: formData.name,
      description: formData.description || undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      category: formData.category,
      priority: formData.priority,
      status: formData.status,
      url: formData.url || undefined,
      notes: formData.notes || undefined,
      dateAdded: new Date(),
      datePurchased: formData.status === "purchased" ? new Date() : undefined,
    };

    onSave(itemData);
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
            Add Shopping Item
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:${inputBg} ${textSecondary} hover:${textPrimary} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Item Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter item name..."
              autoFocus
            />
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
              placeholder="Enter item description..."
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium ${textPrimary} mb-2`}
              >
                Price
              </label>
              <div className="relative">
                <DollarSign
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`}
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
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
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {shoppingCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium ${textPrimary} mb-2`}
              >
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: e.target.value as ShoppingItem["priority"],
                  }))
                }
                className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${textPrimary} mb-2`}
              >
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as ShoppingItem["status"],
                  }))
                }
                className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="wishlist">Wishlist</option>
                <option value="planned">Planned</option>
                <option value="purchased">Purchased</option>
              </select>
            </div>
          </div>

          {/* URL */}
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Product URL (Optional)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
              className={`w-full px-3 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Add any additional notes..."
            />
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
            disabled={!formData.name.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};
