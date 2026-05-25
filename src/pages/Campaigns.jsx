import React, { useEffect, useState } from "react";
import { Plus, Search, Send, Trash2 } from "lucide-react";
import StatusBadge from "../components/dashboard/StatusBadge";
import NewCampaignModal from "../components/campaigns/NewCampaignModal";
import { Sidebar } from "../components/layouts/Sidebar";
import { deleteCampaign, getCampaigns } from "../api";
import SendCampaignModal from "../components/campaigns/SendCampaignModal";

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
  const [campaignsList, setCampaignsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);

  async function loadCampaigns() {
    setLoading(true);
    const data = await getCampaigns();
    setCampaignsList(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this campaign?')) return;
    await deleteCampaign(id);
    loadCampaigns();
  }

  function handleCreated() {
    setModal(false);
    loadCampaigns(); 
  }

  const visible = campaignsList.filter((c) => {
    const matchFilter = filter === "All" || c.status === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Campaigns</h2>
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-950 text-zinc-500 text-sm">
              <tr>
                <th className="text-left p-4">Campaign</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Group</th>
                <th className="text-left p-4">Sent</th>
                <th className="text-left p-4">Click Rate</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500 text-sm">
                    Loading campaigns...
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500 text-sm">
                    No campaigns match your filter
                  </td>
                </tr>
              ) : (
                visible.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                  >
                    <td className="p-4 font-medium">{c.name}</td>
                    <td className="p-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="p-4 text-zinc-400 text-sm">{c.target_group || c.group}</td>
                    <td className="p-4 text-zinc-400 text-sm">{c.sent || 0}</td>
                    <td className="p-4 text-zinc-500 text-sm">{c.send_date ?? "--"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSending(c)}
                          className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-500 hover:text-emerald-400 transition"
                          title="Send Campaign"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-500 hover:text-rose-400 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
          isOpen={showModal}
          onClose={() => setModal(false)}
          onCreated={() => { setModal(false); loadCampaigns(); }}
        />
      )}

      {sending && (
        <SendCampaignModal
        campaign={sending}
        onClose={() => setSending(null)}
        onSent={() => { setSending(null); loadCampaigns();}}
        />
      )}
    </div>
  );
}