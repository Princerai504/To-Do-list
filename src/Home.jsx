import { useState } from "react";
import TaskItem from "./TaskItem";
import { Link } from "react-router-dom";
import { useAddTaskMutation, useDeletetaskMutation, useGetTasksQuery, useUpdatetaskMutation } from "./apiSlice";

export default function Home() {
  // RTK Query hook MUST be inside component
  const {
    data: taskList = [],
    isError,
    isLoading,
    isFetching,
    error
  } = useGetTasksQuery(undefined, {refetchOnFocus: true,});

  const [newTask, setNewTask] = useState("");

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdatetaskMutation();
  const [deleteTask] = useDeletetaskMutation();

  // Handle Add Task
  const handleAddTask = (e) => {
    e.preventDefault();

    const value = newTask.trim();

    if (!value) {
      return;
    }

    setNewTask("");
    addTask({ value, completed: false });
  };

  return (
    <div className="relative flex h-screen flex-grow items-start justify-center bg-gray-900 p-4">
      <div
        className={`task-app w-full max-w-md rounded-lg bg-gray-800 px-6 pb-2 pt-6 text-gray-200 shadow-lg ${
          isFetching ? "opacity-70" : ""
        }`}
      >

        {/* Header */}
        <div className="mb-6 flex items-center">
          <svg
            className="h-8 w-8 stroke-current text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>

          <h4 className="ml-3 text-lg font-semibold">
            My Tasks
          </h4>
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={handleAddTask}
          className="my-2 flex h-8 w-full items-center rounded border-2 border-solid border-gray-700 px-2 text-sm font-medium"
        >
          <svg
            className="h-5 w-5 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>

          <input
            className="ml-4 h-8 w-full flex-grow bg-transparent font-medium focus:outline-none"
            type="text"
            placeholder="Add a new task"
            onChange={(e) => setNewTask(e.target.value)}

            value={newTask}
            required
          />

          <button
            type="submit"
            className="text-indigo-400"
          >
             
            Add
          </button>
        </form>

        {/* Error */}
        {isError && (
          <p
            role="alert"
            className="mb-2 rounded border border-red-700 bg-red-900/30 px-3 py-2 text-sm text-red-400"
          >
            {error?.error || error?.message || "Something went wrong"}
          </p>
        )}

        {/* Tasks */}
        <div className="tasks-container overflow-auto">

          {isLoading ? (
            <p className="text-center">
              Loading...
            </p>
          ) : taskList.length === 0 ? (
            <p className="py-4 text-center text-gray-500">
              No tasks yet
            </p>
          ) : (
            taskList.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))
          )}

        </div>
      </div>

      {/* Contact */}
      <Link
        to="/contact"
        className="absolute text-gray-500 hover:text-gray-300"
      >
        Contact
      </Link>
    </div>
  );
}
