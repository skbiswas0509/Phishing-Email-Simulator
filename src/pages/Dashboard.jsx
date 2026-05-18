
import React from 'react'
import Sidebar from '../components/layouts/Sidebar'
import Topbar from '../components/layouts/Topbar'
import MetricCard from '../components/dashboard/MetricCard'
import CampaignTable from '../components/dashboard/CampaignTable'
import RiskUsers from '../components/dashboard/RiskUsers'
import ActivityFeed from '../components/dashboard/ActivityFeed'

function Dashboard() {
  return (
    <div className='flex min-h-screen bg-zinc-950 text-white'>
        <Sidebar />

        <main className='flex-1'>
            <Topbar />

            <div className='p-8 space-y-8'>
                {/* metrics */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                    {metrics.map((metric) => (
                        <MetricCard key={metric.label} metric={metric} />
                    ))}
                </div>

                <CampaignTable />

                <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
                    <RiskUsers />
                    <div className='xl:col-span-2'>
                        <ActivityFeed />
                    </div>
                </div>
            </div>
            
        </main>


    </div>
  )
}

export default Dashboard