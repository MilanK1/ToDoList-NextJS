"use client";
import { useState } from "react";
import Child from "./components/ChildProp";
import useStore from "./store/store";
export default function Home() {
  const [task, setTask] = useState("");
  const addTask = useStore((state) => state.addTask);
  // const toggleAnimation = useStore((state) => state.toggleAnimation);
  const tasks = useStore((state) => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ name: task });
    setTask("");
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900">Tasks</h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <input
            className="w-full p-2 text-lg border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 text-lg font-semibold text-white bg-indigo-600 rounded-md shadow-lg shadow-cyan-500/50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Add Task
          </button>
        </form>
        <ul className="mt-6 space-y-4">
          <Child tasks={tasks} />
        </ul>
      </div>
      {/* JS Animation */}
      {/* <div>
        <button onClick={toggleAnimation}>Toggle Animation</button>
      </div> */}
    </div>
  );
}
