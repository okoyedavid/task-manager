"use client";
import { useState } from "react";
import { AddExpenseModal } from "./AddExpenseModal";

export default function NotFound() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <div className="text-center py-12">
      <p className={`text-lg text-green-50 mb-4`}>No transactions found</p>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="text-blue-500 hover:text-blue-600 font-medium"
      >
        Add your first transaction
      </button>

      {isAddModalOpen && (
        <AddExpenseModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={(expenseData) => {
            console.log("Adding expense:", expenseData);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
