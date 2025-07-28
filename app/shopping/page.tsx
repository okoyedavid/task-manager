"use client";
import React, { useEffect, useState } from "react";

import { ShoppingItem } from "../types";
import { AddShoppingItemModal } from "./AddShoppingItemModal";
import Filters from "./Filters";
import { ShoppingItemCard } from "./ShoppingItemCard";
import { useSetUrl } from "../hooks/useSeturl";
import api from "../_lib/apiclass";

const ShoppingPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const res = await api.fetchData("/shopping");
      setItems(res.items);
    }

    fetchItems();
  }, []);

  const { searchParams } = useSetUrl();
  const searchQuery = searchParams.get("search") || "";
  const selectedStatus = searchParams.get("status") || "all";
  const selectedCategory = searchParams.get("category") || "all";

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

  return (
    <div className={`min-h-full p-6`}>
      {/* Header */}

      <Filters onAdd={setIsAddModalOpen} items={items} />

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <ShoppingItemCard
            key={item._id}
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
          <p className={`text-lg text-green-50 mb-4`}>No items found</p>
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
