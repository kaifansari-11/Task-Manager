"use client";

export default function FilterTabs({ currentFilter, setFilter, clearCompleted, hasCompleted }) {
  const tabs = [
    { id: "all", label: "All Tasks" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
              currentFilter === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {hasCompleted && (
        <button
          onClick={clearCompleted}
          className="text-xs font-medium text-slate-400 hover:text-red-600 transition"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}