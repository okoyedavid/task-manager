import React from "react";

import { Calendar, MoreVertical } from "lucide-react";
import { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // const formatDate = (date: Date) => {
  //   return date.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //   });
  // };

  return (
    <div
      onClick={onClick}
      className={`border border-green-400/20 bg-green-950/10 backdrop-blur-xl p-6 rounded-lg cursor-pointer`}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${getPriorityColor(
              task.priority
            )}`}
          />
          <span className={`text-xs px-2 py-1 rounded bg-green-50 text-black`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
        <button
          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-background text-green-50`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Task Title */}
      <h4 className={`font-medium text-green-50 mb-2 line-clamp-2`}>
        {task.title}
      </h4>

      {/* Task Description */}
      <p className={`text-sm text-green-50 mb-4 line-clamp-3`}>
        {task.description}
      </p>

      {/* Progress Bar (if applicable) */}
      {task.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs text-green-50`}>Progress</span>
            <span className={`text-xs text-green-50`}>{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Task Footer */}
      <div className="flex items-center justify-between">
        {/* Task Stats */}
        <div className="flex items-center space-x-3">
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className={`w-4 h-4 text-green-50`} />
              <span className={`text-xs text-green-50`}>{task.dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
