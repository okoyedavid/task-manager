"use client";
import React, { useState } from "react";

import { DollarSign, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { mockExpenses } from "../data/expensesData";
import { Expense } from "../types";
import { ExpenseChart } from "./ExpenseChart";
import { ExpenseCard } from "./ExpenseCard";
import { AddExpenseModal } from "./AddExpenseModal";
import Button from "../ui/Button";

const ExpensesPage: React.FC = () => {
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");
  const [selectedType, setSelectedType] = useState<
    "all" | "income" | "expense"
  >("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedType === "all") return true;
    return expense.type === selectedType;
  });

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  const stats = [
    {
      title: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      title: "Net Income",
      value: netIncome,
      icon: DollarSign,
      color: netIncome >= 0 ? "text-green-500" : "text-red-500",
      bg:
        netIncome >= 0
          ? "bg-green-100 dark:bg-green-900/30"
          : "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <div className={`min-h-full p-6`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold text-white mb-2`}>Expenses</h1>
            <p className="text-green-50">Track your income and expenses</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="flex">
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className={`border bg-green-950/90 p-6 my-4 border-green-400/20 backdrop-blur-xl rounded-lg cursor-pointer overflow-hidden  transition-all duration-200 group shadow-[0_0_1px_1px_rgba(0,255,0,0.8)] hover:shadow-[0_0_5px_2px_rgba(0,255,0,0.9)]`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-green-50 mb-1`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold text-white`}>
                      ${Math.abs(stat.value).toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div
          className={`border p-6 my-4 border-green-400/20 bg-green-950/10 backdrop-blur-xl rounded-lg cursor-pointer overflow-hidden  transition-all duration-200 group shadow-[0_0_1px_1px_rgba(0,255,0,0.8)] hover:shadow-[0_0_5px_2px_rgba(0,255,0,0.9)]`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold text-white`}>
              Financial Overview
            </h2>
            <div className="flex gap-4">
              <div className="flex border overflow-hidden border-green-900 rounded-lg">
                {["week", "month", "year"].map((period) => (
                  <button
                    key={period}
                    onClick={() =>
                      setSelectedPeriod(period as "week" | "month" | "year")
                    }
                    className={`px-3 py-1 text-sm transition-colors ${
                      selectedPeriod === period
                        ? "bg-green-500 text-white"
                        : `text-green-50 hover:text-white hover:bg-green-950 dark:hover:bg-background`
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(
                    e.target.value as "all" | "income" | "expense"
                  )
                }
                className=" px-4 w-fit py-3 rounded-lg bg-black text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              >
                <option value="all">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>
          </div>
          <ExpenseChart expenses={expenses} period={selectedPeriod} />
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        <h2 className={`text-xl font-semibold text-white mb-4`}>
          Recent Transactions
        </h2>
        {filteredExpenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onEdit={(expense) => {
              console.log("Edit expense:", expense);
            }}
          />
        ))}
      </div>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-12">
          <p className={`text-lg text-green-50 mb-4`}>No transactions found</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Add your first transaction
          </button>
        </div>
      )}

      {/* Add Expense Modal */}
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
};
export default ExpensesPage;
