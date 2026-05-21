import { X } from 'lucide-react';
import React, { useState } from 'react'
import { createCampaign } from '../../api';

export default function NewCampaignModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "", template: "IT Support Request",
    group: "All Staff", date: "", time: "09:00",
  });

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) =>
    setForm((prev) => ({...prev, [field]: e.target.value 
    }));
  
 async function handleSubmit() {
    if (!form.name.trim()) { setError('Campaign name is required'); return}
    setLoading(true)
    setError('')
    const res = await createCampaign(form)
    setLoading(false)
    if(res.error) { setError(res.error); return }
    onCreated()
 }
    return (
    <div
    className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'
    onClick={(e) => e.target === e.currentTarget && onClose()}
    >
        <div className='bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg'>
          {/* header */}
          <div className='flex items-center justify-between p-6 border-b border-zinc-800'>
            <h3 className='font-semibold text-lg'>New Campaign</h3>
            <button onClick={onclose} className='text-zinc-500 hover:text-white transition'>
                <X className='w-5 h-5' />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-sm px-4 py-2.5 rounded-x">
                    {error}
                </div>
            )}
          </div>

            {/* body */}
            <div className='p-6 space-y-4'>
                <div>
                    <label className='text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block'>
                        Campaign Name
                    </label>
                    <input 
                        className='w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50'
                        placeholder="e.g. Q2 Phishing Drill"
                        value={form.name}
                        onChange={set("name")}
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block'>
                            Template
                        </label>
                        <select className='w-full bg-zinc-800 border-zinc-700 rounded-xl px-4 py-2.5 tex0t-sm text-white outline-none focus:border-emerald-500/50'
                        value={form.template}
                        onChange={set("template")}>
                            <option>IT Support Request</option>
                            <option>DocuSign Contract</option>
                            <option>CEO Wire Transfer</option>
                            <option>Password Reset Alert</option>
                        </select>
                    </div>

                    <div>
                        <label className='text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block'>
                            Target Group
                        </label>
                        <select
                            className='w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50'
                            value={form.group}
                            onChange={set("group")}
                        >
                            <option>All Staff</option>
                            <option>Finance Group</option>
                            <option>Engineering</option>
                            <option>HR & People</option>
                            <option>Executive Team</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <label
                        className='text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block'>
                            Send Date

                    </label>
                    <input
                        type="date"
                        className='w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50'
                        value={form.date}
                        onChange={set("date")}
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <label className='test-xs text-zinc-500 uppercase tracking-wider mb-1.5 block'>
                        Send Time
                    </label>
                    <input 
                    type="time" 
                    className='w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50' 
                    value={form.time}
                    onChange={set("time")}
                    />
                </div>
            </div>
          </div>

        {/* footer */}
        <div className='flex justify-end gap-3 p-6 border-t border-zinc-800'>
            <button 
                onClick={onClose}
                className='px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition'>
            Cancel
            </button>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className='px-4 py-2 rounded-xl text-sm bg-emerald-400 text-black font-medium hover:bg-emerald-300 transition disabled:opcaity-50'>
            {loading ? 'Creating...' : 'Create Campaign'}
            </button>
        </div>
    </div>
  )
}
