import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ email: '', password: '', displayName: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (mode === 'signup' && form.password !== form.confirm) {
      setError('Passwords do not match.'); return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return
    }
    setLoading(true)
    try {
      const { error: err } = mode === 'login'
        ? await signIn(form.email, form.password)
        : await signUp(form.email, form.password, form.displayName)
      if (err) { setError(err.message); return }
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
    borderRadius: '12px', border: `2px solid ${theme.border}`,
    fontSize: '0.9375rem', outline: 'none',
    background: theme.bg, color: theme.text,
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  }

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

        {/* Card */}
        <div style={{ background: theme.card, borderRadius: '24px', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: `1px solid ${theme.border}` }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: theme.bgSoft, borderRadius: '12px', padding: '4px', marginBottom: '2rem' }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                style={{ flex: 1, padding: '0.625rem', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s', background: mode === m ? theme.card : 'transparent', color: mode === m ? theme.text : theme.textMid, boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: theme.text, marginBottom: '0.375rem' }}>
            {mode === 'login' ? 'Welcome back' : 'Join P-REACH OUT'}
          </h2>
          <p style={{ color: theme.textMid, fontSize: '0.9375rem', marginBottom: '1.75rem' }}>
            {mode === 'login' ? 'Sign in to your account to continue.' : 'Create your free account today.'}
          </p>

          {error && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <AlertCircle size={18} color="#C41E3A" style={{ flexShrink: 0, marginTop: '1px' }} />
              <span style={{ fontSize: '0.875rem', color: '#C41E3A', fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Display Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type="text" value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} placeholder="Your name" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 characters" style={{ ...inputStyle, paddingRight: '3rem' }} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: theme.textMid, display: 'flex' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: theme.text, marginBottom: '0.5rem' }}>Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color={theme.textMid} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type={showPass ? 'text' : 'password'} required value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} placeholder="Repeat password" style={inputStyle} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = theme.border} />
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.75 : 1 }} disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme.textMid }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C41E3A', fontWeight: 700, fontFamily: 'inherit', fontSize: 'inherit' }}>
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: theme.textMid }}>
          <Link to="/" style={{ color: theme.textMid, textDecoration: 'none' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
