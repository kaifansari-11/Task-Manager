"use client";
import { useState } from "react";
import PriorityBadge from "./PriorityBadge";
import { relativeTime } from "@/lib/taskUtils";

export default function TaskRow({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  function handleSave() {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  }

  return (
    <div className={`group flex items-start gap-3 rounded-xl border p-4 transition-all ${
      task.completed ? "bg-slate-50 border-slate-100" : "bg-white border-slate-200 hover:border-indigo-200"
    }`}>
      {/* Checkbox */}
      <div className="pt-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="flex-1 text-sm font-medium bg-white border border-indigo-300 rounded px-2 py-1 outline-none"
            />
          ) : (
            <h3 className={`text-sm font-semibold truncate ${
              task.completed ? "text-slate-400 line-through" : "text-slate-800"
            }`}>
              {task.title}
            </h3>
          )}
          <PriorityBadge priority={task.priority} />
        </div>
        
        {task.description && !isEditing && (
          <p className={`text-sm mt-1 mb-2 ${task.completed ? "text-slate-400" : "text-slate-600"}`}>
            {task.description}
          </p>
        )}
        
        <div className="text-[11px] font-mono text-slate-400 mt-2">
          Updated {relativeTime(task.updatedAt)}
        </div>
      </div>

      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-2 pt-1">
        {!task.completed && (
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-medium text-slate-400 hover:text-indigo-600"
          >
            Edit
          </button>
        )}
        <button 
          onClick={() => onDelete(task.id)}
          className="text-xs font-medium text-slate-400 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}