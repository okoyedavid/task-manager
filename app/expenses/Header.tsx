"use client";
import { useState } from "react";
import Button from "../ui/Button";
import { Plus } from "lucide-react";
import { AddExpenseModal } from "./AddExpenseModal";

export default function Header() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold text-white mb-2`}>
          Expenses
        </h1>
        <p className="text-green-50 text-sm md:text-md">
          Track your income and expenses
        </p>
      </div>
      <Button onClick={() => setIsAddModalOpen(true)} className="flex">
        <Plus className="w-5 h-5" />
        <span>NEW</span>
      </Button>

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
