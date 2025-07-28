"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { Expense } from "../types";
import { ExpenseChart } from "./ExpenseChart";
import ExpensesTable from "./ExpensesTable";
import Filters from "./Filters";
import Header from "./Header";
import NotFound from "./NotFound";
import Stats from "./Stats";

interface Props {
  expenses?: Expense[];
  searchParams?: { [key: string]: string | string[] | undefined };
  error?: boolean;
}

const ExpensesClient = ({ expenses = [], searchParams, error }: Props) => {
  const selectedType = searchParams?.type || "all";

  useEffect(() => {
    if (error) toast.error("Error fetching expenses. Please try again.");
  }, [error]);

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedType === "all") return true;
    return expense.type === selectedType;
  });

  return (
    <div className="min-h-full px-2 py-4 md:p-6">
      <div className="mb-8">
        <Header />
        <Stats expenses={expenses} />

        <h2 className="text-xl md:text-3xl font-semibold text-white">
          Financial Overview
        </h2>
        <div className="border p-6 my-4 border-green-400/20 bg-green-950/10 backdrop-blur-xl rounded-lg cursor-pointer overflow-hidden transition-all duration-200 group shadow-[0_0_1px_1px_rgba(0,255,0,0.8)] hover:shadow-[0_0_5px_2px_rgba(0,255,0,0.9)]">
          <Filters />
          <ExpenseChart expenses={expenses} />
        </div>
      </div>

      <ExpensesTable filteredExpenses={filteredExpenses} />
      {filteredExpenses.length === 0 && <NotFound />}
    </div>
  );
};

export default ExpensesClient;
