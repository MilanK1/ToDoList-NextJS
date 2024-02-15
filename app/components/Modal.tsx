"use client";
import { useState } from "react";
import useStore from "../store/store";

function TaskDetailsModal({ taskId, onClose }) {
  const task = useStore((state) => state.tasks.find((t) => t.id === taskId));
  const updateTaskProperty = useStore((state) => state.updateTaskProperty);

  if (!task) {
    return null;
  }

  const handlePropertyChange = (property) => (event) => {
    updateTaskProperty(taskId, property, event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg space-y-4">
        <input
          type="text"
          className="text-xl font-bold w-full border p-2"
          value={task.name}
          onChange={handlePropertyChange("name")}
        />
        <textarea
          className="w-full border p-2"
          value={task.description || ""}
          onChange={handlePropertyChange("description")}
          placeholder="Task description..."
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
