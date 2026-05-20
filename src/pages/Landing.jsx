import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Landing() {
  const { token }   = useParams()
  const navigate    = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Send to backend — data is discarded, only the event is logged
    await fetch(`http://localhost:4000/track/creds/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.username }),
    })

    navigate('/awareness')
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm'>
        {/* Fake IT portal header */}
        <div className='text-center mb-6'>
          <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3'>
            <svg className='w-6 h-6 text-white' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <rect x='3' y='11' width='18' height='11' rx='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
          </div>
          <h1 className='text-xl font-semibold text-gray-800'>IT Support Portal</h1>
          <p className='text-sm text-gray-500 mt-1'>Sign in to verify your account</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm text-gray-600 mb-1 block'>Username</label>
            <input
              type='text'
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500'
              placeholder='Enter your username'
              value={form.username}
              onChange={set('username')}
            />
          </div>

          <div>
            <label className='text-sm text-gray-600 mb-1 block'>Password</label>
            <input
              type='password'
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500'
              placeholder='Enter your password'
              value={form.password}
              onChange={set('password')}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className='text-xs text-gray-400 text-center mt-4'>
          © 2025 ACME Corp IT Department
        </p>
      </div>
    </div>
  )
}