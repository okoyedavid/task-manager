import React, { useEffect, useState } from "react";
import { Task } from "../../types";
import { TaskModal } from "../Modals/TaskModal";
import { TaskColumn } from "./TaskColumn";
import api from "@/app/_lib/apiclass";

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const handleFetchTask = async () => {
      const data = await api.fetchData("/tasks");

      setTasks(data.tasks);
    };

    handleFetchTask();
  }, []);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const inReviewTasks = tasks.filter((task) => task.status === "in-review");

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="grid grid-cols-1  gap-6 p-6">
        <TaskColumn
          title="To Do"
          tasks={todoTasks}
          onAddTask={handleAddTask}
          onTaskClick={handleTaskClick}
        />
        <TaskColumn
          title="In Progress"
          tasks={inProgressTasks}
          onAddTask={handleAddTask}
          onTaskClick={handleTaskClick}
        />
        <TaskColumn
          title="In Review"
          tasks={inReviewTasks}
          onAddTask={handleAddTask}
          onTaskClick={handleTaskClick}
        />
      </div>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={(taskData) => {
            console.log("Saving task:", taskData);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
};
