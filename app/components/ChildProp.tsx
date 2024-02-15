"use client";
import { useState } from "react";
import useStore from "../store/store";
import TaskDetailsModal from "./Modal";
function Child({ tasks }) {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const deleteTask = useStore((state) => state.deleteTask);
  const toggleTaskCompletion = useStore((state) => state.toggleTaskCompletion);
  // const tasks = useStore((state) => state.tasks);

  return (
    <div>
      {tasks.map((task) => (
        <li
          key={task.id}
          className="drop-shadow-md m-3 flex items-center justify-between p-3 bg-white rounded-lg"
        >
          <span
            className={`text-lg font-medium ${
              task.completed ? "line-through" : ""
            }`}
            onClick={() => setSelectedTaskId(task.id)}
          >
            {task.name}
          </span>
          <div>
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className="mr-2 shadow-lg shadow-green-500/50 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md shadow-md hover:bg-green-700"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="shadow-lg shadow-red-500/50 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
      {selectedTaskId && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}

export default Child;
