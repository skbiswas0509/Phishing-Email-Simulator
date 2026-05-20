import { ShieldAlert, BookOpen, ArrowRight } from 'lucide-react'

const tips = [
  'Always check the sender email address before clicking any link',
  'Legitimate IT portals are never sent via unsolicited email',
  'When in doubt, call IT support directly to verify',
  'Look for HTTPS and your company domain in the URL bar',
]

export default function Awareness() {
  return (
    <div className='min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6'>
      <div className='max-w-lg w-full'>

        {/* Warning header */}
        <div className='bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 mb-6 text-center'>
          <div className='w-14 h-14 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
            <ShieldAlert className='w-7 h-7 text-rose-400' />
          </div>
          <h1 className='text-2xl font-bold text-rose-400 mb-2'>
            This was a phishing simulation
          </h1>
          <p className='text-zinc-400 text-sm leading-relaxed'>
            You clicked a simulated phishing link and entered your credentials.
            In a real attack, your account would now be compromised.
          </p>
        </div>

        {/* Tips */}
        <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <BookOpen className='w-5 h-5 text-emerald-400' />
            <h2 className='font-semibold'>How to spot phishing emails</h2>
          </div>

          <div className='space-y-3'>
            {tips.map((tip, i) => (
              <div key={i} className='flex items-start gap-3'>
                <div className='w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-emerald-400 text-xs'>{i + 1}</span>
                </div>
                <p className='text-sm text-zinc-400 leading-relaxed'>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center justify-between'>
          <div>
            <p className='font-medium text-emerald-400'>You're now more aware</p>
            <p className='text-sm text-zinc-500 mt-0.5'>This test has been logged for training purposes</p>
          </div>
          <ArrowRight className='w-5 h-5 text-emerald-400' />
        </div>

      </div>
    </div>
  )
}