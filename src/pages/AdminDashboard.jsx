import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Users, Settings, FileText, Activity, ArrowLeft, UserCog, Globe } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useEffect } from 'react'

const ADMIN_SECTIONS = [
  { Icon: Users, title: 'User Management', desc: 'View, promote, or deactivate user accounts and manage roles.', color: '#1A6FBF', bg: '#DBEAFE', action: 'Manage Users' },
  { Icon: FileText, title: 'Content Editor', desc: 'Update program descriptions, library articles, and team bios.', color: '#2D7A4F', bg: '#E8F5EE', action: 'Edit Content' },
  { Icon: Activity, title: 'Analytics', desc: 'View site traffic, session counts, and engagement metrics.', color: '#6B21A8', bg: '#F3E8FF', action: 'View Analytics' },
  { Icon: Settings, title: 'Site Settings', desc: 'Configure global settings, contact info, and organization details.', color: '#B45309', bg: '#FEF3C7', action: 'Open Settings' },
  { Icon: Globe, title: 'Program Updates', desc: 'Add, edit or archive humanitarian programs and initiatives.', color: '#0891B2', bg: '#CFFAFE', action: 'Edit Programs' },
  { Icon: UserCog, title: 'Admin Accounts', desc: 'Grant or revoke admin privileges for staff members.', color: '#C41E3A', bg: '#FEE2E2', action: 'Manage Admins' },
]

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!user || !profile?.is_admin)) {
      navigate('/admin-login')
    }
  }, [user, profile, loading, navigate])

  if (loading || !profile?.is_admin) return null

  return (
    <div style={{ minHeight: '100vh', background: theme.bgSoft, paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={26} color="white" />
            </div>
            <div>
              <h1 style={{ fontWeight: 800, fontSize: '1.75rem', color: theme.text, lineHeight: 1.1 }}>Admin Dashboard</h1>
              <p style={{ color: theme.textMid, fontSize: '0.9375rem' }}>Welcome, {profile?.display_name || user?.email}</p>
            </div>
          </div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: theme.textMid, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { label: 'Total Users', value: '—', sub: 'Registered accounts' },
            { label: 'Active Sessions', value: '—', sub: 'Currently online' },
            { label: 'Monthly Visitors', value: '—', sub: 'Unique this month' },
            { label: 'Contact Forms', value: '—', sub: 'Received this week' },
          ].map(s => (
            <div key={s.label} style={{ background: theme.card, borderRadius: '16px', padding: '1.5rem', border: `1px solid ${theme.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ fontWeight: 800, fontSize: '2rem', color: '#C41E3A', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: theme.text, marginTop: '0.375rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.8125rem', color: theme.textMid, marginTop: '0.125rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Admin panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {ADMIN_SECTIONS.map(s => (
            <div key={s.title} style={{ background: theme.card, borderRadius: '20px', padding: '2rem', border: `1px solid ${theme.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '52px', height: '52px', background: s.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: s.color }}>
                <s.Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: theme.text, marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: theme.textMid, lineHeight: 1.6, marginBottom: '1.25rem' }}>{s.desc}</p>
              <button
                style={{ background: s.bg, color: s.color, border: 'none', borderRadius: '9999px', padding: '0.5rem 1.25rem', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {s.action}
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', background: 'rgba(196,30,58,0.06)', border: '1px solid rgba(196,30,58,0.15)', borderRadius: '16px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShieldCheck size={22} color="#C41E3A" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.9rem', color: theme.textMid, lineHeight: 1.6 }}>
            You are signed in as an <strong style={{ color: '#C41E3A' }}>Administrator</strong>. To grant admin access to another user, update their <code style={{ background: theme.bgSoft, padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>is_admin</code> flag in the Supabase database. Full CMS integration is available in the production build.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { 
          .admin-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .admin-panels { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) { 
          .admin-panels { grid-template-columns: 1fr !important; }
          .admin-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
