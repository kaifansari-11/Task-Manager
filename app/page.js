"use client";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import Header from "@/components/Header";
import AddTaskForm from "@/components/AddTaskForm";
import FilterTabs from "@/components/FilterTabs";
import TaskRow from "@/components/TaskRow";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const {
    tasks,
    hydrated,
    total,
    activeCount,
    completedCount,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
  } = useTasks(filter);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-12 px-4 sm:px-6">
      <main className="max-w-2xl mx-auto">
        <Header total={total} activeCount={activeCount} completedCount={completedCount} />
        
        <AddTaskForm onAdd={addTask} />
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <FilterTabs 
            currentFilter={filter} 
            setFilter={setFilter} 
            clearCompleted={clearCompleted}
            hasCompleted={completedCount > 0}
          />
          
          <div className="space-y-3 mt-4">
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm border-2 border-dashed border-slate-100 rounded-xl">
                No tasks found. Time to focus!
              </div>
            ) : (
              tasks.map((task) => (
                <TaskRow 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleComplete} 
                  onUpdate={updateTask} 
                  onDelete={deleteTask} 
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}