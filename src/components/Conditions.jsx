import { Wind, CloudRain, ShieldAlert, Zap, RefreshCw, RotateCcw, ArrowRight } from 'lucide-react'

const CONDITIONS_FEATURED = [
  { name: 'Anxiety', Icon: Wind, pct: 28, color: '#B45309', bg: '#FEF3C7', desc: 'Affects 1 in 4 people worldwide' },
  { name: 'Depression', Icon: CloudRain, pct: 22, color: '#1A6FBF', bg: '#DBEAFE', desc: 'Most common mental health disorder globally' },
  { name: 'PTSD', Icon: ShieldAlert, pct: 11, color: '#C41E3A', bg: '#FEE2E2', desc: 'Affects veterans, survivors, caregivers' },
  { name: 'ADHD', Icon: Zap, pct: 9, color: '#6B21A8', bg: '#F3E8FF', desc: 'Widely underdiagnosed in adults' },
  { name: 'Bipolar', Icon: RefreshCw, pct: 7, color: '#2D7A4F', bg: '#E8F5EE', desc: '40 million people globally' },
  { name: 'OCD', Icon: RotateCcw, pct: 4, color: '#0891B2', bg: '#CFFAFE', desc: 'Often misunderstood, highly treatable' },
]

export default function Conditions() {
  return (
    <section id="conditions" style={{ background: 'var(--bg-dark, #1A1A2E)', paddingTop: '6rem', paddingBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '0', right: '0', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(196,30,58,0.07) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(45,122,79,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C41E3A', marginBottom: '1rem', display: 'block' }}>Understanding Mental Health</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Conditions We<br />
            <span style={{ color: '#C41E3A' }}>Specialize In</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: '540px', margin: '0 auto' }}>
            Mental health conditions are common, treatable, and nothing to be ashamed of. Here's how widespread they are — and how we can help.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {CONDITIONS_FEATURED.map((cond, i) => (
            <div
              key={cond.name}
              className={`reveal reveal-delay-${(i % 3) + 1} tilt-card`}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem', transition: 'all 0.25s ease', cursor: 'pointer' }}

            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '48px', height: '48px', background: cond.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: cond.color }}>
                    <cond.Icon size={24} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>{cond.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>{cond.desc}</div>
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: cond.color }}>{cond.pct}%</div>
              </div>

              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${cond.pct * 3}%`, background: cond.color, borderRadius: '3px', maxWidth: '100%', transition: 'width 1s ease' }} />
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>Prevalence in the general population</div>

              <button
                style={{ marginTop: '1.25rem', background: 'none', border: 'none', color: cond.color, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', padding: 0, fontFamily: 'inherit' }}
                onClick={() => document.getElementById('library').scrollIntoView({ behavior: 'smooth' })}
              >
                Read Article
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
          <button className="btn-primary" style={{ marginRight: '1rem' }} onClick={() => document.getElementById('library').scrollIntoView({ behavior: 'smooth' })}>
            Browse Full Library
          </button>
          <button className="btn-outline-white" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Talk to a Specialist
          </button>
        </div>
      </div>
    </section>
  )
}
