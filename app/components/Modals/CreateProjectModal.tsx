import React, { useState } from "react";

import { FolderPlus, X } from "lucide-react";

type projectprops = {
  name: string;
  color: string;
  description: string;
};

interface CreateProjectModalProps {
  onClose: () => void;
  onSave: (projectData: projectprops) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
  ];

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`border border-green-400/20 bg-black/40 backdrop-blur-xl shadow-[0_0_10px_#00ff88aa] p-6
          rounded-lg w-full max-w-lg max-h-[95vh]`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b border-green-700`}
        >
          <div className="flex items-center space-x-2">
            <FolderPlus className={`w-6 h-6 text-white`} />
            <h2 className={`text-xl font-semibold text-white`}>
              Create New Project
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg  text-red-400 hover:text-white transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Project Name */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Project Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`w-full px-3 py-2 rounded-lg bg-black/60 text-white border border-green-50 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
              placeholder="Enter project name..."
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              className={`w-full px-3 py-2 rounded-lg bg-black/60 text-white border border-green-500/30 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent `}
              placeholder="Enter project description..."
            />
          </div>

          {/* Color */}
          <div>
            <label className={`block text-sm font-medium text-white mb-2`}>
              Project Color
            </label>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData((prev) => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color
                      ? "border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end space-x-3 p-6 border-t border-green-700`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-red-400 hover:text-white transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!formData.name.trim()}
            className="px-4 py-2 text-white rounded-lg hover:text-green-50 font-medium bg-green-800 disabled:bg-green-700 disabled:cursor-not-allowed transition-colors"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};
