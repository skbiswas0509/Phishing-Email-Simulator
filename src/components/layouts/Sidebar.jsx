import { BarChart3, LayoutDashboard, Mail, Shield, User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className='w-64 bg-zinc-900 border-r border-zinc-800'>
      <div className='p-6 border-b border-zinc-800'>
        <div className='flex items-center gap-3'>
          <div className='bg-emerald-400 p-2 rounded-lg'>
            <Shield className='text-black w-5 h-5' />
          </div>

          <div>
            <h1 className='font-semibold text-lg'>
              PhishGuard
            </h1>

            <p className='text-xs text-zinc-500'>
              Awareness Platform
            </p>

          </div>
        </div>
      </div>

      <nav className='p-4 space-y-2'>
        <SidebarItem
          icon={LayoutDashboard}
          label='Dashboard'
          active
        />

        <SidebarItem icon={Mail} label="Campaigns" to='/campaigns'/>

        <SidebarItem icon={User} label="Users" />

        <SidebarItem icon={BarChart3} label="Analytics" />
      </nav>
    </aside>
  )
}

function SidebarItem({ icon: Icon, label, to }) { 
  return (
    <NavLink 
      to={to}
      end
      className={({ isActive}) =>
      `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive 
      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      : "hover:bg-zinc-800 text-zinc-400"
    }`}
    >
      <Icon className='w-4 h-4' />
      {label}
    </NavLink>
  )
}

export {Sidebar, SidebarItem};