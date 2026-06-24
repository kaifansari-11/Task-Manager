const CONFIG = {
  high:   { label: "HIGH",   className: "bg-red-50 text-red-600 ring-red-200" },
  medium: { label: "MED",    className: "bg-amber-50 text-amber-600 ring-amber-200" },
  low:    { label: "LOW",    className: "bg-emerald-50 text-emerald-600 ring-emerald-200" },
};

export default function PriorityBadge({ priority }) {
  const { label, className } = CONFIG[priority] ?? CONFIG.medium;
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider ring-1 ring-inset font-mono ${className}`}
    >
      {label}
    </span>
  );
}