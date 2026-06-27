import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { supabase } from '../lib/supabase'

export default function AdminAuth() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data, error: signInErr } = await signIn(form.email, form.password)
      if (signInErr) { setError(signInErr.message); return }

      // Verify admin flag
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .maybeSingle()

      if (!profile?.is_admin) {
        await supabase.auth.signOut()
        setError('Access denied. This account does not have admin privileges.')
        return
      }
      navigate('/admin')
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
    <div style={{ minHeight: '100vh', background: '#0F0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', paddingTop: '5rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 8px 24px rgba(196,30,58,0.3)' }}>
            <ShieldCheck size={30} color="white" />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '1.625rem', color: 'white', marginBottom: '0.375rem' }}>Admin Portal</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem' }}>Restricted access — authorized personnel only</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
          {error && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(196,30,58,0.15)', border: '1px solid rgba(196,30,58,0.3)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <AlertCircle size={18} color="#C41E3A" style={{ flexShrink: 0, marginTop: '1px' }} />
              <span style={{ fontSize: '0.875rem', color: '#C41E3A', fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>Admin Email *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="admin@preachout.org"
                  style={{ ...inputStyle, background: 'rgba(255,255,255,0.06)', color: 'white', border: '2px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => e.target.style.borderColor = '#C41E3A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Admin password"
                  style={{ ...inputStyle, paddingRight: '3rem', background: 'rgba(255,255,255,0.06)', color: 'white', border: '2px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => e.target.style.borderColor = '#C41E3A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.75 : 1 }} disabled={loading}>
              <ShieldCheck size={18} />
              {loading ? 'Verifying...' : 'Access Admin Portal'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>← Back to Home</Link>
          {' · '}
          <Link to="/login" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>User Sign In</Link>
        </p>
      </div>
    </div>
  )
}
