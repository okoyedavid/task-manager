"use client";
import React, { useState } from "react";

import { CheckCircle, Heart, Plus, Search, ShoppingCart } from "lucide-react";
import { mockShoppingItems, shoppingCategories } from "../data/shoppingData";
import { ShoppingItem } from "../types";
import { AddShoppingItemModal } from "./AddShoppingItemModal";
import { ShoppingItemCard } from "./ShoppingItemCard";

const ShoppingPage: React.FC = () => {
  const theme = "dark";
  const [items] = useState<ShoppingItem[]>(mockShoppingItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "wishlist" | "planned" | "purchased"
  >("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const pageBg = theme === "dark" ? "bg-background" : "bg-gray-100";
  const cardBg = theme === "dark" ? "bg-background-dark" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const inputBg = theme === "dark" ? "bg-background" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const statusCounts = {
    all: items.length,
    wishlist: items.filter((i) => i.status === "wishlist").length,
    planned: items.filter((i) => i.status === "planned").length,
    purchased: items.filter((i) => i.status === "purchased").length,
  };

  const totalValue = items
    .filter((item) => item.price && item.status !== "purchased")
    .reduce((sum, item) => sum + (item.price || 0), 0);

  const statusConfig = [
    {
      key: "all",
      label: "All Items",
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    { key: "wishlist", label: "Wishlist", icon: Heart, color: "text-pink-500" },
    {
      key: "planned",
      label: "Planned",
      icon: ShoppingCart,
      color: "text-yellow-500",
    },
    {
      key: "purchased",
      label: "Purchased",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ];

  return (
    <div className={`min-h-full ${pageBg} p-6`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>
              Shopping List
            </h1>
            <p className={`${textSecondary}`}>
              Track items you want to buy and manage your purchases
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          {statusConfig.map((status) => {
            const Icon = status.icon;
            return (
              <div
                key={status.key}
                className={`${cardBg} rounded-lg p-4 border ${borderColor}`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`w-5 h-5 ${status.color}`} />
                  <span className={`text-sm font-medium ${textSecondary}`}>
                    {status.label}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${textPrimary}`}>
                  {statusCounts[status.key as keyof typeof statusCounts]}
                </p>
              </div>
            );
          })}

          {/* Total Value */}
          <div className={`${cardBg} rounded-lg p-4 border ${borderColor}`}>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-sm font-medium ${textSecondary}`}>
                Total Value
              </span>
            </div>
            <p className={`text-2xl font-bold ${textPrimary}`}>
              ${totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className={`${cardBg} rounded-lg p-4 border ${borderColor}`}>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`}
              />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {statusConfig.map((status) => (
                <option key={status.key} value={status.key}>
                  {status.label} (
                  {statusCounts[status.key as keyof typeof statusCounts]})
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Categories</option>
              {shoppingCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <ShoppingItemCard
            key={item.id}
            item={item}
            onStatusChange={(itemId, status) => {
              console.log("Status changed:", itemId, status);
            }}
            onEdit={(item) => {
              console.log("Edit item:", item);
            }}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className={`text-lg ${textSecondary} mb-4`}>No items found</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Add your first item
          </button>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <AddShoppingItemModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={(itemData) => {
            console.log("Adding item:", itemData);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ShoppingPage;
