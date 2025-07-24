"use client";
import React from "react";

import { mockProjects } from "@/app/data/mockData";
import { useSetUrl } from "@/app/hooks/useSeturl";
import { Bell, Calendar, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const activeSection = usePathname();
  const { searchParams } = useSetUrl();
  const index = searchParams.get("project") || "1";

  const currentProject =
    activeSection === "/"
      ? mockProjects.find((item) => item.id === index)
      : null;

  const getHeaderTitle = () => {
    if (currentProject) {
      return currentProject.name;
    }
    const result =
      activeSection === "/movies"
        ? "Movies"
        : activeSection === "/shopping"
        ? "Shopping List"
        : "Zentry";
    return result;
  };
  return (
    <header className={` border-b border-green-400 bg-black px-6 py-4`}>
      <div className="flex items-center justify-between">
        {/* Project Info */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className={`text-2xl font-bold  flex items-center space-x-2`}>
              {currentProject && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentProject.color }}
                />
              )}
              <span className="text-white vindey">{getHeaderTitle()}</span>
            </h1>
            <h5 className={`text-sm hidden md:block text-green-100`}>
              {currentProject
                ? "Last update on Jan 19, 2024 - 09:16 AM"
                : activeSection === "/movies"
                ? "Track and organize your movie watchlist"
                : activeSection === "/shopping"
                ? "Manage your shopping items and purchases"
                : "Manage your tasks, movies, shopping, and expenses"}
            </h5>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Action Buttons */}
          <div className="flex text-white items-center space-x-2">
            <div className="hidden md:block">
              <button className={`p-2 rounded-lg hover: transition-colors`}>
                <Calendar className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-lg hover: transition-colors`}>
                <Bell className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-lg hover: transition-colors`}>
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3 ml-4">
              <div className="relative w-10 h-10">
                <Image
                  src={(user?.avatar as string) || "/default-avatar.jpeg"}
                  alt={(user?.name as string) || "User Avatar"}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <button
                onClick={logout}
                className={`p-2 rounded-lg hover: transition-colors`}
              >
                <LogOut className="w-5 text-red-100 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
