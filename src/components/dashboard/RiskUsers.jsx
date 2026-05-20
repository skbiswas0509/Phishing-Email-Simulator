import React from 'react'
import { users } from '../../assets/data/users'

export default function RiskUsers() {
  return (
    <div className='bg-zinc-900 border-zinc-800 rounded-2xl p-5'>
      <h3 className='font-semibold mb-5'>
        Highest Risk Users
      </h3>

      <div className='space-y-4'>2
        {users.map((user)=>(
          <div
            key={user.name}
            className='flex items-center justify-between'
          >
            <span>{user.name}</span>

            <span className='text-rose-400 font-bold'>
              {user.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
