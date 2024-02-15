import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { nanoid } from "nanoid";

const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        addTask: (taskDetails) =>
          set(
            (state) => ({
              tasks: [
                ...state.tasks,
                {
                  id: nanoid(),
                  name: taskDetails.name,
                  completed: taskDetails.completed || false,
                  description: taskDetails.description || "",
                },
              ],
            }),
            false,
            "ADD_TASK"
          ),
        deleteTask: (taskId) =>
          set(
            (state) => ({
              tasks: state.tasks.filter((task) => task.id !== taskId),
            }),
            false,
            "DELETE_TASK"
          ),
        toggleTaskCompletion: (taskId) =>
          set(
            (state) => ({
              tasks: state.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }),
            false,
            "TOGGLE_TASK_COMPLETE"
          ),
        updateTask: (taskId, updates) =>
          set(
            (state) => ({
              tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
              ),
            }),
            false,
            "UPDATE_TASK"
          ),
        updateTaskProperty: (id, property, value) =>
          set(
            (state) => ({
              tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, [property]: value } : task
              ),
            }),
            false,
            "UPDATE_TASK_PROPERTY"
          ),
      }),
      {
        name: "task-cache",
        getStorage: () => sessionStorage,
      }
    )
  )
);

export default useStore;
