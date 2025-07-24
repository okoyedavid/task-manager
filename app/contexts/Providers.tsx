"use client";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import ToastElement from "../components/Layout/ToastElement";

function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastElement />
      {children}
    </AuthProvider>
  );
}

export default Providers;
