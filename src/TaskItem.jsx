export default function TaskItem({ task, updateTask, deleteTask }) {
  const { id, value, completed } = task;

  return (
    <div className="task flex items-center">
      <input
        className="peer sr-only"
        type="checkbox"
        id={id}
        checked={completed}
        onChange={() => {
          updateTask({ id, completed: !completed });
        }}
      />
      <label
        className="flex h-10 flex-1 cursor-pointer items-center rounded px-2 hover:bg-gray-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-indigo-400"
        htmlFor={id}
      >
        <span className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-gray-500 text-transparent">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="ml-4 text-sm">{value}</span>
      </label>

      <button
        type="button"
        aria-label={`Delete ${value}`}
        className="shrink-0 rounded p-1 text-red-400 hover:bg-gray-900 hover:text-red-500"
        onClick={() => deleteTask(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}