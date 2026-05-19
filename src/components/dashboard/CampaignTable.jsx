import React from 'react'
import { campaigns } from '../../assets/data/campaign'

export default function CampaignTable() {
  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden'>
      <div className='p-5 border-b border-zinc-800'>
        <h3 className='font-semibold'>
          Active Campaigns
        </h3>
      </div>

      <table className='w-full'>
        <thead className='bg-zinc-950 text-zinc-500 text-sm'>
          <tr>
            <th className='text-left p-4'>Campaign</th>
            <th className='text-left p-4'>Status</th>
            <th className='text-left p-4'>Sent</th>
            <th className='text-left p-4'>Click Store</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map((campaign)=>(
            <tr key={campaign.id} className='border-t border-zinc-800'>
            <td className='p-4 font-medium'>{campaign.name}</td>
            <td className='p-4'>{campaign.status}</td>
            <td className='p-4'>{campaign.sent}</td>
            <td className='p-4'>{campaign.clickRate}%</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}
