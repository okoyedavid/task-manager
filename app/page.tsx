"use client";
import { useEffect } from "react";
import { TaskBoard } from "./components/TaskBoard/TaskBoard";
import { useAuth } from "./contexts/AuthContext";
import { useSetUrl } from "./hooks/useSeturl";
import { Sidebar } from "./components/Layout/Sidebar";
import { Header } from "./components/Layout/Header";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  const { navigate } = useSetUrl();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        {/* Dashboard Content */}
        <main className={`flex-1 overflow-y-auto bg-black`}>
          <TaskBoard />
        </main>
      </div>
    </div>
  );
}
