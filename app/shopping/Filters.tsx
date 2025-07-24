"use client";

import { CheckCircle, Heart, Plus, Search, ShoppingCart } from "lucide-react";
import { shoppingCategories } from "../data/shoppingData";
import { useSetUrl } from "../hooks/useSeturl";
import { ShoppingItem } from "../types";
import Button from "../ui/Button";

export default function Filters({
  onAdd,
  items,
}: {
  onAdd: (open: boolean) => void;
  items: ShoppingItem[];
}) {
  const { setParams, searchParams } = useSetUrl();
  const searchQuery = searchParams.get("search") || "";
  const selectedStatus = searchParams.get("status") || "all";
  const selectedCategory = searchParams.get("category") || "all";

  const statusCounts = {
    all: items.length,
    wishlist: items.filter((i) => i.status === "wishlist").length,
    planned: items.filter((i) => i.status === "planned").length,
    purchased: items.filter((i) => i.status === "purchased").length,
  };

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
    <div className="rounded-lg p-4 group mb-8  has-[input:focus-within]:outline-3 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-600 has-[input:focus-within]:shadow-[0_0_10px_4px_rgba(0,255,0,0.9)] bg-black/40 border-green-800  border-2 transition-all duration-300 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="relative flex-1">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-50`}
        />
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setParams({ search: e.target.value })}
          className={`w-full pl-10 pr-4 py-2 rounded-lg text-white focus:outline-none`}
        />
      </div>

      {/* Status Filter */}
      <select
        value={selectedStatus}
        onChange={(e) =>
          setParams({
            status: e.target.value as
              | "all"
              | "wishlist"
              | "planned"
              | "purchased",
          })
        }
        className=" pr-4 w-auto py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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
        onChange={(e) => setParams({ category: e.target.value })}
        className=" pr-4 w-auto py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
      >
        <option value="all">All Categories</option>
        {shoppingCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <Button
        className="flex gap-2 items-center justify-center"
        onClick={() => onAdd(true)}
      >
        <Plus className="w-5 h-5" />
        <span>Add Item</span>
      </Button>
    </div>
  );
}
