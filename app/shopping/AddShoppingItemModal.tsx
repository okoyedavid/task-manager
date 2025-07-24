import React, { useState } from "react";

import { DollarSign, X } from "lucide-react";
import { shoppingCategories } from "../data/shoppingData";
import { ShoppingItem } from "../types";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface AddShoppingItemModalProps {
  onClose: () => void;
  onSave: (itemData: Partial<ShoppingItem>) => void;
}

export const AddShoppingItemModal: React.FC<AddShoppingItemModalProps> = ({
  onClose,
  onSave,
}) => {
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
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div
        className={`shadow-[0_0_7px_4px_rgba(0,255,0,0.9)] bg-black/40  rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b border-green-700`}
        >
          <h2 className={`text-xl font-semibold text-white`}>
            Add Shopping Item
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:black/40 text-green-50 hover:text-white transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Item Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter item name..."
              autoFocus
            />
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
              className=" pr-4 py-3 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent w-full pl-4"
              placeholder="Enter item description..."
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium text-white mb-2`}>
                Price
              </label>
              <div className="relative">
                <DollarSign
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-50`}
                />
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium text-white mb-2`}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className=" pr-4 w-auto py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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
              <label className={`block text-sm font-medium text-white mb-2`}>
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
                className=" pr-4 w-auto py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium text-white mb-2`}>
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
                className=" pr-4 w-auto py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              >
                <option value="wishlist">Wishlist</option>
                <option value="planned">Planned</option>
                <option value="purchased">Purchased</option>
              </select>
            </div>
          </div>

          {/* URL */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Product URL (Optional)
            </label>
            <Input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              placeholder="https://..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
              className=" pr-4 py-3 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent w-full pl-4"
              placeholder="Add any additional notes..."
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end space-x-3 p-6 border-t border-green-700`}
        >
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.name.trim()}>
            Add Item
          </Button>
        </div>
      </div>
    </div>
  );
};
