"use client";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
