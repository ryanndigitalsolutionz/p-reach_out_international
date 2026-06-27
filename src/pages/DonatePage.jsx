import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowLeft, CreditCard, Smartphone, Building2, Check } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const AMOUNTS = [25, 50, 100, 250, 500]
const CAUSES = [
  { id: 'general', label: 'General Fund', desc: 'Support our most urgent needs' },
  { id: 'crisis', label: 'Crisis Hotline', desc: 'Keep our 24/7 line running' },
  { id: 'schools', label: 'REACH Schools', desc: 'Bring education to youth' },
  { id: 'field', label: 'Field Missions', desc: 'Fund humanitarian deployments' },
]

export default function DonatePage() {
  const { theme } = useTheme()
  const [amount, setAmount] = useState(50)
  const [custom, setCustom] = useState('')
  const [cause, setCause] = useState('general')
  const [frequency, setFrequency] = useState('once')
  const [form, setForm] = useState({ name: '', email: '', cardNum: '', expiry: '', cvc: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const finalAmount = custom ? parseFloat(custom) || 0 : amount

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1800)
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: '12px', border: `2px solid ${theme.border}`,
    fontSize: '0.9375rem', outline: 'none',
    background: theme.bg, color: theme.text,
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', paddingTop: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ width: '88px', height: '88px', background: 'linear-gradient(135deg, #2D7A4F, #4CAF7A)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 8px 32px rgba(45,122,79,0.3)' }}>
            <Check size={44} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '2rem', color: theme.text, marginBottom: '1rem' }}>Thank You!</h1>
          <p style={{ color: theme.textMid, fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Your generous donation of <strong style={{ color: '#C41E3A' }}>${finalAmount}</strong> to the <strong>{CAUSES.find(c => c.id === cause)?.label}</strong> has been received.
          </p>
          <p style={{ color: theme.textMid, fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            A receipt will be sent to <strong>{form.email}</strong>. Your contribution directly funds mental health support for communities in need worldwide.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-primary">Back to Home</Link>
            <button className="btn-secondary" onClick={() => setSubmitted(false)}>Donate Again</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bgSoft, paddingTop: '5rem' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #2D2D44)', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(196,30,58,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(196,30,58,0.2)', border: '2px solid rgba(196,30,58,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Heart size={30} color="#C41E3A" fill="#C41E3A" />
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Your Gift Changes Lives
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '0' }}>
            Every donation funds counseling sessions, crisis intervention, and community outreach for people who need it most.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left: Impact info */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: theme.textMid, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, marginBottom: '2rem' }}>
              <ArrowLeft size={16} /> Back to Home
            </Link>

            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: theme.text, marginBottom: '1.5rem' }}>Your Impact</h2>
            {[
              { amount: '$25', impact: 'Provides 1 online counseling session for someone in need' },
              { amount: '$50', impact: 'Funds a full week of crisis hotline coverage in one region' },
              { amount: '$100', impact: 'Supports a group healing circle for 15 trauma survivors' },
              { amount: '$250', impact: 'Sponsors mental health education in one school for a month' },
              { amount: '$500', impact: 'Deploys a counselor on a humanitarian field mission for a day' },
            ].map(i => (
              <div key={i.amount} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ background: '#FEE2E2', color: '#C41E3A', borderRadius: '10px', padding: '0.375rem 0.75rem', fontWeight: 800, fontSize: '0.9375rem', flexShrink: 0, minWidth: '60px', textAlign: 'center' }}>{i.amount}</div>
                <div style={{ fontSize: '0.9375rem', color: theme.textMid, lineHeight: 1.55, paddingTop: '0.25rem' }}>{i.impact}</div>
              </div>
            ))}

            <div style={{ background: theme.card, borderRadius: '16px', padding: '1.5rem', border: `1px solid ${theme.border}`, marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                <Check size={18} color="#2D7A4F" />
                <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: theme.text }}>Secure & Tax-Deductible</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: theme.textMid, lineHeight: 1.6 }}>
                P-REACH OUT International is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent permitted by law.
              </p>
            </div>
          </div>

          {/* Right: Donation form */}
          <div style={{ background: theme.card, borderRadius: '24px', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: `1px solid ${theme.border}` }}>
            {/* Frequency */}
            <div style={{ display: 'flex', background: theme.bgSoft, borderRadius: '12px', padding: '4px', marginBottom: '1.75rem' }}>
              {['once', 'monthly', 'annually'].map(f => (
                <button key={f} onClick={() => setFrequency(f)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8125rem', transition: 'all 0.2s', background: frequency === f ? theme.card : 'transparent', color: frequency === f ? theme.text : theme.textMid, boxShadow: frequency === f ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', textTransform: 'capitalize' }}>
                  {f === 'once' ? 'One-Time' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Amount buttons */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: theme.text, marginBottom: '0.875rem' }}>Choose Amount</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '0.75rem' }}>
                {AMOUNTS.map(a => (
                  <button key={a} onClick={() => { setAmount(a); setCustom('') }}
                    style={{ padding: '0.75rem', borderRadius: '12px', border: `2px solid ${!custom && amount === a ? '#C41E3A' : theme.border}`, background: !custom && amount === a ? '#FEE2E2' : 'transparent', color: !custom && amount === a ? '#C41E3A' : theme.text, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                    ${a}
                  </button>
                ))}
                <input
                  type="number" min="1" value={custom} onChange={e => setCustom(e.target.value)} placeholder="Custom"
                  style={{ ...inputStyle, border: `2px solid ${custom ? '#C41E3A' : theme.border}`, textAlign: 'center', fontWeight: 700 }}
                  onFocus={e => e.target.style.borderColor = '#C41E3A'}
                  onBlur={e => { if (!custom) e.target.style.borderColor = theme.border }}
                />
              </div>
            </div>

            {/* Cause */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: theme.text, marginBottom: '0.875rem' }}>Designate Your Gift</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {CAUSES.map(c => (
                  <button key={c.id} onClick={() => setCause(c.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '12px', border: `2px solid ${cause === c.id ? '#C41E3A' : theme.border}`, background: cause === c.id ? '#FEE2E2' : 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${cause === c.id ? '#C41E3A' : theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {cause === c.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C41E3A' }} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: cause === c.id ? '#C41E3A' : theme.text }}>{c.label}</div>
                      <div style={{ fontSize: '0.8rem', color: theme.textMid }}>{c.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: theme.text, marginBottom: '0.375rem' }}>Full Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: theme.text, marginBottom: '0.375rem' }}>Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: theme.text, marginBottom: '0.375rem' }}>
                  <CreditCard size={14} style={{ display: 'inline', marginRight: '0.375rem', verticalAlign: 'middle' }} />Card Number *
                </label>
                <input required type="text" value={form.cardNum} onChange={e => setForm({ ...form, cardNum: e.target.value.replace(/\D/g, '').slice(0,16).replace(/(.{4})/g,'$1 ').trim() })} placeholder="1234 5678 9012 3456" maxLength={19} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: theme.text, marginBottom: '0.375rem' }}>Expiry *</label>
                  <input required type="text" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value.replace(/\D/g,'').slice(0,4).replace(/(\d{2})(\d)/,'$1/$2') })} placeholder="MM/YY" maxLength={5} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8125rem', color: theme.text, marginBottom: '0.375rem' }}>CVC *</label>
                  <input required type="text" value={form.cvc} onChange={e => setForm({ ...form, cvc: e.target.value.replace(/\D/g,'').slice(0,4) })} placeholder="123" maxLength={4} style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={loading || finalAmount <= 0}
                style={{ justifyContent: 'center', marginTop: '0.5rem', opacity: (loading || finalAmount <= 0) ? 0.7 : 1, fontSize: '1rem', padding: '1rem 2rem' }}>
                <Heart size={18} fill="white" />
                {loading ? 'Processing...' : `Donate $${finalAmount} ${frequency !== 'once' ? `/ ${frequency}` : ''}`}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginTop: '1.25rem' }}>
              {[CreditCard, Smartphone, Building2].map((Icon, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: theme.textMid, fontSize: '0.75rem' }}>
                  <Icon size={14} /> {['Cards', 'Mobile', 'Bank Transfer'][i]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
