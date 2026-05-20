import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { users } from '../assets/data/users'
import { Sidebar } from '../components/layouts/Sidebar'


function riskColor(score) {
  if (score >= 75) return "text-rose-400";
  if (score >= 50) return "text-amber-400";
  return "text-emerald-400";
}

function clickColor(rate) {
  if (rate >= 60) return "text-rose-400";
  if (rate >= 40) return "text-amber-400";
  return "text-emerald-400";
}

export default function Users() {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Users
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Individual risk profiles
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-zinc-500" />

            <input
              className="bg-transparent text-sm outline-none placeholder-zinc-500 text-white w-40"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-950 text-zinc-500 text-sm">
              <tr>
                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Click Rate
                </th>

                <th className="text-left p-4">
                  Risk Score
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.email}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  <td className="p-4 font-medium">
                    {u.name}
                  </td>

                  <td className="p-4 text-zinc-400 text-sm">
                    {u.email}
                  </td>

                  <td
                    className={`p-4 text-sm font-medium ${clickColor(
                      u.clickRate
                    )}`}
                  >
                    {u.clickRate}%
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-sm font-bold ${riskColor(
                        u.risk
                      )}`}
                    >
                      {u.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}