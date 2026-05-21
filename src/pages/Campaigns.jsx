import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import StatusBadge from "../components/dashboard/StatusBadge";
import NewCampaignModal from "../components/campaigns/NewCampaignModal";
import { campaigns } from "../assets/data/campaign";
import { Sidebar } from "../components/layouts/Sidebar";
import { deleteCampaign, getCampaigns } from "../api";

const FILTERS = [
  "All",
  "Running",
  "Scheduled",
  "Completed",
  "Draft",
];


export default function Campaigns() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setModal] = useState(false);
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadCampaigns() {
    setLoading(true)
    const data = await getCampaigns()
    setCampaigns(data)
    setLoading(false)
  }

  useEffect(() =>{
    loadCampaigns()
  }, [])

  async function handleDelete(id){
    if (!confirm('Delete this campaign?')) return
    await deleteCampaign(id)
    loadCampaigns()
  }

  function handleCreated(){
    setModal(false)
    loadCampaigns()
  }

  const visible = campaigns.filter((c) => {
    const matchFilter =
      filter === "All" || c.status === filter;

    const matchSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Campaigns
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Manage all phishing simulations
            </p>
          </div>

          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 bg-emerald-400 text-black px-4 py-2 rounded-xl font-medium hover:bg-emerald-300 transition"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>

        {/* Filters + Search */}
        <div className="flex items-center gap-3 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm border transition ${
                filter === f
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {f}
            </button>
          ))}

          {/* Search */}
          <div className="ml-auto flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-zinc-500" />

            <input
              className="bg-transparent text-sm outline-none placeholder-zinc-500 text-white w-44"
              placeholder="Search campaigns..."
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
                  Campaign
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Group
                </th>

                <th className="text-left p-4">
                  Sent
                </th>

                <th className="text-left p-4">
                  Click Rate
                </th>

                <th className="text-left p-4">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-zinc-500 text-sm"
                  >
                    No campaigns match your filter
                  </td>
                </tr>
              ) : (
                visible.map((c) => (
                  <tr
                    key={c.name}
                    className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                  >
                    <td className="p-4 font-medium">
                      {c.name}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        status={c.status}
                      />
                    </td>

                    <td className="p-4 text-zinc-400 text-sm">
                      {c.group}
                    </td>

                    <td className="p-4 text-zinc-400 text-sm">
                      {c.sent}
                    </td>

                    <td className="p-4">
                      {c.clickRate > 0 ? (
                        <span
                          className={`text-sm font-medium ${
                            c.clickRate >= 25
                              ? "text-rose-400"
                              : c.clickRate >= 15
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {c.clickRate}%
                        </span>
                      ) : (
                        <span className="text-zinc-600 text-sm">
                          --
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-zinc-500 text-sm">
                      {c.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <NewCampaignModal
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}