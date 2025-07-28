import React from "react";
import api from "../_lib/apiclass";
import ExpensesClient from "./ExpensesClient";

const ExpensesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let expenses = [];

  try {
    const res = await api.fetchData("/expenses");
    expenses = res.data;
  } catch (err) {
    console.log(err);
    // Pass the error state to the client
    return <ExpensesClient error />;
  }

  return <ExpensesClient expenses={expenses} searchParams={searchParams} />;
};

export default ExpensesPage;
