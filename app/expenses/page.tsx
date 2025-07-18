"use client";
import React, { useState } from "react";

import { DollarSign, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { mockExpenses } from "../data/expensesData";
import { Expense } from "../types";
import { ExpenseChart } from "./ExpenseChart";
import { ExpenseCard } from "./ExpenseCard";
import { AddExpenseModal } from "./AddExpenseModal";

const ExpensesPage: React.FC = () => {
  const theme = "dark";
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");
  const [selectedType, setSelectedType] = useState<
    "all" | "income" | "expense"
  >("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const pageBg = theme === "dark" ? "bg-background" : "bg-gray-100";
  const cardBg = theme === "dark" ? "bg-background-dark" : "bg-white";
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

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
    <div className={`min-h-full ${pageBg} p-6`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>
              Expenses
            </h1>
            <p className={`${textSecondary}`}>Track your income and expenses</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className={`${cardBg} rounded-lg p-6 border ${borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${textSecondary} mb-1`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${textPrimary}`}>
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
        <div className={`${cardBg} rounded-lg p-6 border ${borderColor} mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${textPrimary}`}>
              Financial Overview
            </h2>
            <div className="flex space-x-2">
              {["week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period as any)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedPeriod === period
                      ? "bg-blue-500 text-white"
                      : `${textSecondary} hover:${textPrimary} hover:bg-gray-100 dark:hover:bg-background`
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ExpenseChart expenses={expenses} period={selectedPeriod} />
        </div>

        {/* Filters */}
        <div className={`${cardBg} rounded-lg p-4 border ${borderColor} mb-6`}>
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${textPrimary}`}>
              Filter by:
            </span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className={`px-3 py-2 rounded-lg bg-gray-100 dark:bg-background ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
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
          <p className={`text-lg ${textSecondary} mb-4`}>
            No transactions found
          </p>
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
