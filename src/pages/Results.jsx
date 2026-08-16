import React from 'react'


function StatCard({ icon:Icon, label, value, color}) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${color}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <p className="text-sm text-zinc-500">{label}</p>
            </div>
            <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
    )
}

function EventBadge({ type }) {
    const style = {
        open: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        click: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        cred: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
        report: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    }
    return (
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium captalize ${styles[type] ?? ''}`}>
        {type}
        </span>
    )
}

export default function Results(){
    const [campaigns, setcampaigns] = useState([])
    const [selected, setSelected] = useState(null)
    const [results, setResults] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCampaigns().then(setCampaigns)
    }, [])

    async function handleSelect(campaing) {
        setSelected(campaign)
        setLoading(true)
        const [res, evs] = await Promise.all([
            getCampaignResults(campaign.id),
            getCampaingEvents(campaign.id),
        ])
        setResults(res)
        setEvents(evs)
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">
            <Sidebar />

            <div className="flex-1 p-8 space-y-6">
                <div>
                    <h2 className="text-xl font-semibold">Results</h2>
                    <p className="text-sm text-zinc-500 mt-1">Per Campaing Tracking Data</p>
                </div>

                {/* Campaign Picker */}
                <div className="relative w-72">
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none appearance-none cursor-pointer focus:border-emerald-500/50 "
                    onChange={(e) => {
                        const c = campaigns.find((c) => c.id === e.target.value)
                        if (c) handleSelect(c)
                    }}
                    defaultValue=""
                    >
                        <option value="" disabled>Select a campaign...</option>
                        {campaigns.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <ChevronDown className='absolute right-3 top-3 w-4 h-4 text-zinc-500 pointer-events-none' />
                </div>

                {/* No selection */}
                {!selected && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-16 text-center">
                        <BarChart3 className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500 text-sm">Select a camgaing to view</p>
                    </div>
                )}

                [loading && (
                    <div className="text-center">
                        <p className="text-zinc-500 text-sm">Loading..</p>
                    </div>
                )]

                {result && !loadign && (
                    <>
                        {/* Stat card */}
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                            <StatCard 
                                icon={Mail}
                                lable='Emails Sent'
                                value={result.stats?.send ?? 0}
                                color='bg-blue-500/10 text-blue-400'
                            />
                            <StatCard
                             icon={Mail}
                             label='Emails sent'
                             value={result.stats?.sent ?? 0}
                             color='bg-blue-500/10 text-blue-400'
                            />
                            <StatCard
                            icon={BarChart3} 
                            label="Opened"
                            value={result.stats?.opened ?? 0}
                            color='bg-purple-500/10 text-purple-400'
                            />
                            <StatCard
                            icon={MousePointerClick} 
                            label="Clicked"
                            value={result.stats?.clicked ?? 0}
                            color='bg-amber-500/10 text-amber-400'
                            />
                            <StatCard
                            icon={ShieldAlert} 
                            label="Credentials Entered"
                            value={result.stats?.creds ?? 0}
                            color='bg-rose-500/10 text-rose-400'
                            />                            
                        </div>

                        {/* events table */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                            <div className="p-5 border-b border-zinc-800">
                                <h3 className="font-semibold">Event Timeline</h3>
                                <p className="text-sm text-zinc-500 mt-0.5">All tracked activity for this campaign</p>
                            </div>

                            {events.length === 0 ? (
                                <div className="p-12 text-center text-zinc-500 text-sm">
                                    No events yet. Sedn the campgain and waut for users to interact
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-zinc-950 text-zinc-500 text-sm">
                                        <tr>
                                            <th className="text-left p-4">Receipnts</th>
                                            <th className="text-left p-4">Email</th>
                                            <th className="text-left p-4">Events</th>
                                            <th className="text-left p-4">IP address</th>
                                            <th className="text-left p-4">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((e) => (
                                            <tr key={e.id} className='border-t border-zinc-800 hover:bg-zinc-800/50 transition'>
                                                <td className="p-4 font-medium">{e.name}</td>
                                                <td className="p-4 text-zinc-400 text-sm">{e.email}</td>
                                                <td className="p-4"><EventBadge type={e.type} /></td>
                                                <td className="p-4 text-zinc-400 text-sm font-mono">{e.ip ?? '-'}</td>                                      
                                                <td className='p-4 text-zinc-500 text-sm'>
                                                    {new Date(e.created_at).toLocaleString()}
                                                </td>
                                            </tr>
                                            ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* receiptnst table */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                            <div className="p-5 border-b border-zinc-800">
                                <h3 className="font-semibold">Recipients</h3>
                                <p className="text-sm text-zinc-500 mt-0.5">Everyone this campaigns was sent to</p>
                            </div>
                            <table className="w-full">
                                <thead className="bg-zinc-950 text-zinc-500 text-sm">
                                    <tr>
                                        <th className="text-left p-4">Name</th>
                                        <th className="text-left p-4">Email</th>
                                        <th className="text-left p-4">Sent At</th>
                                        <th className="text-left p-4">Opened</th>
                                        <th className="text-left p-4">Clicked</th>
                                        <th className="text-left p-4">Credentials</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(result.recipients ?? []).map((r) => {
                                        const recipientsEvents = events.filter((e) => e.recipient_id === r.id)
                                        const opened = recipientsEvents.some((e) => e.type === 'open')
                                        const clicked = recipientsEvents.some((e) => e.type === 'click')
                                        const creds = recipientsEvents.some((e) => e.type === 'cred')
                                        return (
                                            <tr key={r.id} className='border-t border-zinc-800 hover:bg-zinc-800/50 transition'>
                                                <td className="p-4 font-medium">{r.name}</td>
                                                <td className="p-4 text-zinc-400 text-sm">{r.email}</td>
                                                <td className="p-4 text-zinc-400 text-sm">{new Date(r.sent_at).toLocaleString()}</td>
                                                <td className="p-4"><EventBadge type={opened ? 'open' : 'none'} /></td>
                                                <td className="p-4"><EventBadge type={clicked ? 'click' : 'none'} /></td>
                                                <td className="p-4"><EventBadge type={creds ? 'cred' : 'none'} /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}