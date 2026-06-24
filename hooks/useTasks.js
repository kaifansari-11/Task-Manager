"use client";
import { useState, useEffect, useCallback } from "react";
import { loadTasks, saveTasks } from "@/lib/storage";
import { generateId, sortTasks, filterTasks } from "@/lib/taskUtils";

export function useTasks(filter = "all") {
  const [tasks, setTasks] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveTasks(tasks);
    }
  }, [tasks, hydrated]);

  const addTask = useCallback(({ title, description = "", priority = "medium" }) => {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    const newTask = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, []);

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = total - completedCount;
  const visibleTasks = sortTasks(filterTasks(tasks, filter));

  return {
    tasks: visibleTasks,
    hydrated,
    total,
    completedCount,
    activeCount,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
  };
}