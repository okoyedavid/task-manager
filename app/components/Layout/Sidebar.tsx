"use client";
import React, { useState } from "react";

import {
  Archive,
  Calendar,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Film,
  FolderOpen,
  Plus,
  Settings,
  ShoppingCart,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { mockCategories, mockProjects } from "../../data/mockData";
import { useSetUrl } from "@/app/hooks/useSeturl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreateProjectModal } from "../Modals/CreateProjectModal";

export const Sidebar: React.FC = () => {
  const { setParams, searchParams } = useSetUrl();
  const activeProject = searchParams.get("project") || "1";
  const setActiveProject = (project: string) => setParams({ project });
  const activeSection = usePathname() || "/";

  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const mainSections = [
    { id: "/", name: "Projects", icon: FolderOpen },
    { id: "/movies", name: "Movies", icon: Film },
    { id: "/shopping", name: "Shopping", icon: ShoppingCart },
    { id: "/expenses", name: "Expenses", icon: DollarSign },
  ];

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div
      className={`w-64 h-full hidden bg-black border-r border-green-700 md:flex flex-col`}
    >
      {/* Logo */}
      <div className="px-6 py-2 border-b border-gray-700">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-green-50 text-4xl">Z</h1>
          <span className={`text-xl font-bold text-green-200`}>Zentry</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Sections */}
        <div className="p-4">
          <h3
            className={`text-sm font-medium text-gray-50 uppercase tracking-wide mb-3`}
          >
            Main
          </h3>
          <div className="space-y-1">
            {mainSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  href={section.id}
                  key={section.id}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-green-900"
                      : "hover:bg-green-950"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      activeSection === section.id
                        ? "text-green-200"
                        : "text-gray-50"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      activeSection === section.id
                        ? "text-green-200"
                        : "text-gray-50"
                    }`}
                  >
                    {section.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Projects Section */}
        {activeSection === "/" && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3
                className={`text-sm font-medium text-gray-50 uppercase tracking-wide`}
              >
                Your Projects
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className={`p-1 rounded "hover:bg-green-950" text-gray-50 hover:text-green-200 transition-colors`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {mockProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeProject === project.id
                      ? "bg-green-900"
                      : "hover:bg-green-950"
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span
                    className={`text-sm ${
                      activeProject === project.id
                        ? "text-green-200"
                        : "text-gray-50"
                    } truncate`}
                  >
                    {project.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories Section */}
        {activeSection === "/" && (
          <div className="p-4">
            <button
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className={`flex items-center space-x-2 mb-3 text-gray-50 hover:text-green-200 transition-colors`}
            >
              {categoriesExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <h3 className="text-sm font-medium uppercase tracking-wide">
                Categories
              </h3>
            </button>

            {categoriesExpanded && (
              <div className="space-y-1">
                {mockCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg "hover:bg-green-950"`}
                  >
                    <Tag className={`w-4 h-4 text-gray-50`} />
                    <span className={`text-sm text-gray-50 flex-1`}>
                      {category.name}
                    </span>
                    <span
                      className={`text-xs text-gray-50 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full`}
                    >
                      {category.projectCount}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Archive & Delete */}
        {activeSection === "/" && (
          <div className="p-4 space-y-1">
            <button
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg "hover:bg-green-950" text-gray-50 hover:text-green-200 transition-colors`}
            >
              <Archive className="w-4 h-4" />
              <span className="text-sm">Archive Projects</span>
            </button>
            <button
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg "hover:bg-green-950" text-gray-50 hover:text-green-200 transition-colors`}
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Delete Projects</span>
            </button>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-auto p-4 space-y-1 border-t border-gray-700">
          <button
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg "hover:bg-green-950" text-gray-50 hover:text-green-200 transition-colors`}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">Team</span>
          </button>
          <button
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg "hover:bg-green-950" text-gray-50 hover:text-green-200 transition-colors`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Calendar</span>
          </button>
          <button
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg "hover:bg-green-950" text-gray-50 hover:text-green-200 transition-colors`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>

      {isCreateModalOpen && activeSection === "/" && (
        <CreateProjectModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={(projectData) => {
            console.log("Creating project:", projectData);
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
