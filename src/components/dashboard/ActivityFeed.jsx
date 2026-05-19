import React from 'react'
import { activites } from '../../assets/data/activites'

export default function ActivityFeed() {
  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-5'>
      <h3 className='font-semibold mb-5'>
        Live Activity
      </h3>

      <div className='space-y-4'>
        {activites.map((activity, index) => (
          <div key={index} className='border border-zinc-800 rounded-xl px-4 py-3'>
            {activity}
          </div>
        ))}
      </div>
    </div>
  )
}
