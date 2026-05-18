import { Plus } from 'lucide-react'
import React from 'react'

export default function Topbar() {
  return (
    <header className='h-16 border-b border-zinc-800 bg-zinc-900 px-8 flex items-center justify-between'>
      <div>
        <h2 className='text-lg font-semibold'>
          Dashboard
        </h2>

        <p className='text-sm text-zinc-500'>
          Monitor Phishing awareness campaigns
        </p>
      </div>

      <button className='flex items-center gap-2 bg-emerald-400 text-black px-4 py-2 rounded-xl font-medium'>
        <Plus className='w-4 h-4' />
        New Campaign
      </button>
    </header>
  )
}
