"use client";
import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setExpanded(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm mb-6"
    >
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Add a new task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          autoComplete="off"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2.5 text-xs font-semibold text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
        >
          <option value="high">High</option>
          <option value="medium"> Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
      {expanded && (
        <div className="mt-3 flex gap-3">
          <input
            type="text"
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <button
            type="button"
            onClick={() => { setExpanded(false); setDescription(""); }}
            className="text-xs text-slate-400 hover:text-slate-600 transition px-1"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}