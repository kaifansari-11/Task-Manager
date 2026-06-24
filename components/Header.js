export default function Header({ total, activeCount, completedCount }) {
  return (
    <header className="mb-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Task Manager
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Stay focused. Ship what matters.
          </p>
        </div>
        <div className="flex items-center gap-4 font-mono text-sm text-slate-500">
          <span>
            <span className="text-slate-800 font-semibold">{total}</span> total
          </span>
          <span className="text-slate-300">|</span>
          <span>
            <span className="text-indigo-600 font-semibold">{activeCount}</span> active
          </span>
          <span className="text-slate-300">|</span>
          <span>
            <span className="text-emerald-600 font-semibold">{completedCount}</span> done
          </span>
        </div>
      </div>
    </header>
  );
}