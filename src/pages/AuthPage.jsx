import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Mail, Lock, User, Eye, EyeOff, AlertCircle, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { supabase } from '../lib/supabase'

// Returns true if BOTH first and last name start with #
function isAdminSignup(firstName, lastName) {
  return firstName.trim().startsWith('#') && lastName.trim().startsWith('#')
}

// Strip leading # for display/storage
function stripHash(name) {
  return name.trim().replace(/^#+/, '').trim()
}

export default function AuthPage() {
  const { theme } = useTheme()
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  // 'login' | 'signup' | 'pin'
  const [step, setStep] = useState('login')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // PIN step state
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [pendingUserId, setPendingUserId] = useState(null)
  const [pinLoading, setPinLoading] = useState(false)

  const inp = {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.75rem',
    borderRadius: '12px',
    border: `2px solid ${theme.border}`,
    fontSize: '0.9375rem',
    outline: 'none',
    background: theme.bg,
    color: theme.text,
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  // ── LOGIN ──────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      const { error: err } = await signIn(form.email, form.password)
      if (err) { setError(err.message); return }
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  // ── SIGNUP ─────────────────────────────────────────────────
  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    const { firstName, lastName, email, password } = form
    if (!firstName.trim() || !lastName.trim()) { setError('Please enter both your first and last name.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      const displayName = isAdminSignup(firstName, lastName)
        ? `${stripHash(firstName)} ${stripHash(lastName)}`
        : `${firstName.trim()} ${lastName.trim()}`

      const { data, error: err } = await signUp(email, password, displayName)
      if (err) { setError(err.message); return }

      if (isAdminSignup(firstName, lastName)) {
        // Save the user id and move to PIN step
        setPendingUserId(data?.user?.id ?? null)
        setStep('pin')
      } else {
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── PIN VERIFY ─────────────────────────────────────────────
  const handlePin = async (e) => {
    e.preventDefault()
    setPinError('')
    if (pin.length !== 4) { setPinError('PIN must be exactly 4 digits.'); return }
    setPinLoading(true)
    try {
      // Fetch the current PIN from DB
      const { data, error: fetchErr } = await supabase
        .from('admin_pin')
        .select('pin')
        .eq('id', 1)
        .maybeSingle()

      if (fetchErr || !data) { setPinError('Could not verify PIN. Try again.'); return }

      if (pin === data.pin) {
        // Promote to admin — update profiles row
        // pendingUserId may be null if Supabase requires email confirm; use current session
        const { data: sessionData } = await supabase.auth.getSession()
        const userId = pendingUserId || sessionData?.session?.user?.id
        if (userId) {
          await supabase.from('profiles').update({ is_admin: true }).eq('id', userId)
        }
        navigate('/admin')
      } else {
        setPinError('Incorrect PIN. You have been signed in as a regular user.')
        // Still signed in — just go home as a regular user
        setTimeout(() => navigate('/'), 2000)
      }
    } finally {
      setPinLoading(false)
    }
  }

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: theme.bgSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', paddingTop: '5rem' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(196,30,58,0.3)' }}>
              <Heart size={24} color="white" fill="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: theme.text }}>P-REACH OUT</div>
              <div style={{ fontSize: '0.6875rem', color: '#C41E3A', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>International</div>
            </div>
          </Link>
        </div>

        <div style={{ background: theme.card, borderRadius: '24px', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: `1px solid ${theme.border}` }}>

          {/* ── PIN STEP ── */}
          {step === 'pin' && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 6px 20px rgba(196,30,58,0.3)' }}>
                  <ShieldCheck size={30} color="white" />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: theme.text, marginBottom: '0.5rem' }}>Admin Verification</h2>
                <p style={{ color: theme.textMid, fontSize: '0.9375rem', lineHeight: 1.55 }}>
                  You signed up with admin name format. Enter the 4-digit admin PIN to activate admin access.
                </p>
              </div>

              {pinError && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
                  <AlertCircle size={18} color="#C41E3A" style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span style={{ fontSize: '0.875rem', color: '#C41E3A', fontWeight: 500 }}>{pinError}</span>
                </div>
              )}

              <form onSubmit={handlePin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Admin PIN (4 digits)</label>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={pin}
                      onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="••••"
                      autoFocus
                      style={{ ...inp, letterSpacing: '0.4em', fontSize: '1.5rem', textAlign: 'center', paddingLeft: '1rem' }}
                      onFocus={e => e.target.style.borderColor = '#C41E3A'}
                      onBlur={e => e.target.style.borderColor = theme.border}
                    />
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: theme.textMid, marginTop: '0.5rem' }}>
                    Wrong PIN? You'll still be signed in as a regular user.
                  </p>
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', opacity: pinLoading ? 0.75 : 1 }} disabled={pinLoading || pin.length !== 4}>
                  <ShieldCheck size={18} />
                  {pinLoading ? 'Verifying...' : 'Confirm PIN'}
                </button>

                <button type="button" onClick={() => navigate('/')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMid, fontSize: '0.875rem', fontFamily: 'inherit', textDecoration: 'underline' }}>
                  Skip — continue as regular user
                </button>
              </form>
            </>
          )}

          {/* ── LOGIN / SIGNUP TABS ── */}
          {step !== 'pin' && (
            <>
              {/* Tabs */}
              <div style={{ display: 'flex', background: theme.bgSoft, borderRadius: '12px', padding: '4px', marginBottom: '2rem' }}>
                {['login', 'signup'].map(m => (
                  <button key={m} onClick={() => { setStep(m); setError('') }}
                    style={{ flex: 1, padding: '0.625rem', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s', background: step === m ? theme.card : 'transparent', color: step === m ? theme.text : theme.textMid, boxShadow: step === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>
                    {m === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                ))}
              </div>

              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: theme.text, marginBottom: '0.375rem' }}>
                {step === 'login' ? 'Welcome back' : 'Join P-REACH OUT'}
              </h2>
              <p style={{ color: theme.textMid, fontSize: '0.9375rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                {step === 'login'
                  ? 'Sign in to your account to continue.'
                  : 'Enter your first and last name, email, and a password.'}
              </p>

              {/* Admin hint for signup */}
              {step === 'signup' && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: '#F3E8FF', border: '1px solid #DDD6FE', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
                  <ShieldCheck size={16} color="#6B21A8" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.8125rem', color: '#6B21A8', lineHeight: 1.5 }}>
                    <strong>Admin tip:</strong> Start both names with <code style={{ background: '#EDE9FE', padding: '0 3px', borderRadius: '3px' }}>#</code> (e.g. <em>#Steve #Jones</em>) to trigger admin verification after signup.
                  </span>
                </div>
              )}

              {error && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
                  <AlertCircle size={18} color="#C41E3A" style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span style={{ fontSize: '0.875rem', color: '#C41E3A', fontWeight: 500 }}>{error}</span>
                </div>
              )}

              {/* ── LOGIN FORM ── */}
              {step === 'login' && (
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Email Address *</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inp} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Password *</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Your password" style={{ ...inp, paddingRight: '3rem' }} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                      <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: theme.textMid, display: 'flex' }}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.75 : 1 }} disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>
              )}

              {/* ── SIGNUP FORM ── */}
              {step === 'signup' && (
                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>First Name *</label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        <input type="text" required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="Steve" style={inp} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Last Name *</label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        <input type="text" required value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Jones" style={inp} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Email Address *</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inp} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Password * <span style={{ fontWeight: 400, color: theme.textMid }}>(min. 6 characters)</span></label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 characters" style={{ ...inp, paddingRight: '3rem' }} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                      <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: theme.textMid, display: 'flex' }}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.75 : 1 }} disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>
              )}

              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme.textMid }}>
                {step === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => { setStep(step === 'login' ? 'signup' : 'login'); setError('') }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C41E3A', fontWeight: 700, fontFamily: 'inherit', fontSize: 'inherit' }}>
                  {step === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: theme.textMid }}>
          <Link to="/" style={{ color: theme.textMid, textDecoration: 'none' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
