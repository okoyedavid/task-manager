import React, { useEffect, useState } from "react";

import { X } from "lucide-react";
import { Task } from "../../types";

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as const,
    priority: "medium" as const,
    dueDate: "",
    tags: [] as string[],
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        tags: task.tags,
      });
    }
  }, [task]);

  const handleSave = () => {
    onSave({
      ...formData,
      dueDate: formData.dueDate ? formData.dueDate : undefined,
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`border border-green-400/20 bg-black/60 backdrop-blur-xl shadow-[0_0_10px_#00ff88aa] p-6
          rounded-lg w-full max-w-lg max-h-[95vh] overflow-y-auto`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between p-6 border-b border-green-400`}
        >
          <h2 className={`text-xl font-semibold text-white`}>
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-green-800 text-red-800 hover:text-red-900 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium text-green-400 mb-2`}>
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={`w-full px-3 py-2 rounded-lg bg-black/60 text-white border border-green-50 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
              placeholder="Enter task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium text-green-400 mb-2`}>
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
              rows={4}
              className={`w-full px-3 py-2 rounded-lg bg-black/60 text-white border border-green-50 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
              placeholder="Enter task description..."
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium text-green-400 mb-2`}
              >
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as any,
                  }))
                }
                className={`w-full px-3 py-2 rounded-lg bg-black/60 text-white border border-green-50 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="in-review">In Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label
                className={`block text-sm font-medium text-green-400 mb-2`}
              >
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: e.target.value as any,
                  }))
                }
                className={`w-full px-3 py-2 rounded-lg bg-black/60 text-white border border-green-50 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className={`block text-sm font-medium text-green-400 mb-2`}>
              Due Date
            </label>
            <input
              type="date"
              className={`w-full px-3 py-2 rounded-lg bg-black/60 text-white border border-green-50 placeholder-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent`}
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`flex items-center justify-end space-x-3 p-6 border-t border-green-400`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg  text-red-600  transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};
