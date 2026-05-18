import React from 'react'

export default function MetricCard({ metric}) {
  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-5'>
      <p className='text-sm text-zinc-500 mb-3'>
        {metric.label}
      </p>

      <h3 className={`text-3xl font-bold mb-2 ${metric.color}`}>
        {metric.value}
      </h3>

      <p className='text-sm text-zinc-500'>
        {metric.change}
      </p>
    </div>
  )
}
