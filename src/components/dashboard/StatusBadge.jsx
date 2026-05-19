import React from 'react'

export default function StatusBadge({ status }) {
    const styles = {
        Running: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        Scheduled: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        Completed: "bg-zinc-800 text-zinc-400 border border-zinc-700",
        Draft: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${styles[status] ?? "bg-zinc-800 text-white"}`}>
        {status}
    </span>
  )
};
