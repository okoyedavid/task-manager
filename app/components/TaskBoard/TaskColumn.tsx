import React from "react";

import { Plus } from "lucide-react";
import { Task } from "../../types";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onAddTask: () => void;
  onTaskClick: (task: Task) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  onAddTask,
  onTaskClick,
}) => {
  return (
    <div
      className={`rounded-lg p-4 bg-green-950/20  shadow-[0_0_3px_#00ff88aa] backdrop-blur-xl min-h-auto pb-8`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className={`font-semibold text-white`}>{title}</h3>
          <span
            className={`text-green-200 text-sm border border-green-50 py-2 px-4 rounded-full`}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className={`p-1 rounded flex gap-2 border-2 border-dashed border-green-700  text-green-200 hover:text-white hover:bg-green-200 dark:hover:bg-green-700 transition-colors`}
        >
          <Plus className="w-5 h-5" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3  ">
        <div className="grid gap-4 grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
