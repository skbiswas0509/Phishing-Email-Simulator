import React, { useState } from 'react'
import { sendCampaign } from '../../api'  
import { Plus, Send, Trash2, X } from 'lucide-react'

export default function SendCampaignModal({ campaign, onClose, onSent }) {
  const [recipients, setRecipients] = useState([{ name: '', email: '' }])  // Fixed: changed setReceipients to setRecipients
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function addRow() {
    setRecipients((prev) => [...prev, { name: '', email: '' }])
  }

  function removeRow(i) {  // Fixed: added i parameter
    setRecipients((prev) => prev.filter((_, idx) => idx !== i))
  }

  function updateRow(i, field, value) {
    setRecipients((prev) => 
      prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r))
    )
  }

  async function handleSend() {
    const valid = recipients.filter((r) => r.name.trim() && r.email.trim())
    if (valid.length === 0) {
      setError('Add at least one recipient with name and email');  
      return
    }
    setLoading(true)
    setError('')
    const res = await sendCampaign(campaign.id, valid)  
    setLoading(false)
    setResult(res)
    if (res.sent?.length > 0) onSent()
  }

  return (
    <div
      className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg'>
        <div className='flex items-center justify-between p-6 border-b border-zinc-800'>
          <div>
            <h3 className="font-semibold text-lg">Launch Campaign</h3>
            <p className="text-sm text-zinc-500 mt-0.5">{campaign.name} - {campaign.template}</p>  {/* Fixed: changed . to - */}
          </div>
          <button onClick={onClose} className='text-zinc-500 hover:text-white transition'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='p-6 space-y-4'>
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          {result ? (
            <div className='space-y-2'>
              {result.sent?.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl">
                  Sent to {result.sent.length} recipient{result.sent.length > 1 ? 's' : ''}
                </div>
              )}
              {result.failed?.length > 0 && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl">
                  Failed: {result.failed.map((f) => f.email).join(', ')}
                </div>
              )}
            </div>
          ) : (
            <>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block">
                Recipients
              </label>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">  {/* Fixed: changed mx-h to max-h */}
                {recipients.map((r, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    <input
                      className='flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50'  // Fixed: changed px-2 to px-3, fixed text-whie to text-white
                      placeholder='Full name'
                      value={r.name}
                      onChange={(e) => updateRow(i, 'name', e.target.value)}  // Fixed: syntax errors
                    />
                    <input
                      className='flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50'  // Fixed: text-whie to text-white
                      placeholder='Email address'
                      type='email'
                      value={r.email}
                      onChange={(e) => updateRow(i, 'email', e.target.value)}  // Fixed: syntax errors
                    />
                    <button
                      onClick={() => removeRow(i)}
                      className='text-zinc-600 hover:text-rose-400 transition p-1'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addRow}
                className='flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'  // Fixed: item-center to items-center
              >
                <Plus className='h-4 w-4' />
                Add recipient
              </button>
            </>
          )}
        </div>

        <div className='flex justify-end gap-3 p-6 border-t border-zinc-800'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition'  // Fixed: hover;text-white to hover:text-white
          >
            {result ? 'Close' : 'Cancel'}
          </button>
          {!result && (  // Fixed: changed &7 to &&
            <button
              onClick={handleSend}
              disabled={loading}
              className='flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-emerald-400 text-black font-medium hover:bg-emerald-300 transition disabled:opacity-50'
            >
              <Send className='w-4 h-4' />
              {loading ? 'Sending...' : 'Send Campaign'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}2