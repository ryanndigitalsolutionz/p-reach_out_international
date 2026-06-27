import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Sun, LogIn, UserCircle, LogOut, Settings } from 'lucide-react'
import { useTheme, THEMES } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Library', href: '#library' },
  { label: 'Programs', href: '#programs' },
  { label: 'Stories', href: '#stories' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

const THEME_KEYS = Object.keys(THEMES)
const THEME_DOTS = { white: '#e5e7eb', black: '#1A1A2E', blue: '#1D4ED8', pink: '#E11D48', brown: '#92400E' }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showTheme, setShowTheme] = useState(false)
  const themeContext = useTheme();
  const { theme, themeName, setThemeName } = themeContext;
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = NAV_ITEMS.map(i => i.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]); break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSignOut = async () => { await signOut(); navigate('/') }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrolled ? theme.navBg : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.08)' : 'none',
      padding: scrolled ? '0.875rem 0' : '1.25rem 0',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(196,30,58,0.3)', flexShrink: 0 }}>
            <Heart size={22} color="white" fill="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: theme.navText, lineHeight: 1.1, letterSpacing: '-0.01em' }}>P-REACH OUT</div>
            <div style={{ fontSize: '0.6875rem', color: '#C41E3A', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>International</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href} onClick={e => handleNavClick(e, item.href)}
              className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
              style={{ color: theme.navText }}>
              {item.label}
            </a>
          ))}

          {/* Theme switcher */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowTheme(!showTheme)} title="Change Theme"
              style={{ background: 'none', border: `1.5px solid ${theme.border}`, borderRadius: '10px', padding: '0.4rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.navText, fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s', fontFamily: 'inherit' }}>
              <Sun size={15} />
              {theme.name}
            </button>
            {showTheme && (
              <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '0.75rem', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', minWidth: '160px', zIndex: 100 }}>
                {THEME_KEYS.map(k => (
                  <button key={k} onClick={() => { setThemeName(k); setShowTheme(false) }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: 'none', background: k === themeName ? theme.bgSoft : 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: k === themeName ? 700 : 500, color: theme.text, transition: 'background 0.15s' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: THEME_DOTS[k], border: `2px solid ${theme.border}`, flexShrink: 0 }} />
                    {THEMES[k].name}
                    {k === themeName && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: theme.primary }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {profile?.is_admin && (
                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.8125rem', color: theme.primary, textDecoration: 'none' }}>
                  <Settings size={15} /> Admin
                </Link>
              )}
              <Link to="/account" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: theme.navText, textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem' }}>
                <UserCircle size={20} color={theme.navText} />
                {profile?.display_name || 'Account'}
              </Link>
              <button onClick={handleSignOut} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMid, display: 'flex', alignItems: 'center' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.875rem', color: theme.navText, textDecoration: 'none' }}>
              <LogIn size={16} /> Sign In
            </Link>
          )}

          <Link to="/donate" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>
            <Heart size={15} fill="white" /> Donate
          </Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
          style={{ display: 'none', background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', flexDirection: 'column', gap: '5px' }}
          aria-label="Toggle menu">
          <span style={{ display: 'block', width: '24px', height: '2px', background: theme.navText, transition: 'all 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: theme.navText, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: theme.navText, transition: 'all 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: theme.navBg, backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: menuOpen ? '1.5rem 2rem 2rem' : '0 2rem', maxHeight: menuOpen ? '700px' : '0', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', opacity: menuOpen ? 1 : 0 }} className="mobile-menu">
        {NAV_ITEMS.map((item, i) => (
          <a key={item.href} href={item.href} onClick={e => handleNavClick(e, item.href)}
            style={{ display: 'block', padding: '0.875rem 0', fontWeight: 600, fontSize: '1rem', color: activeSection === item.href.replace('#', '') ? '#C41E3A' : theme.navText, textDecoration: 'none', borderBottom: i < NAV_ITEMS.length - 1 ? `1px solid ${theme.border}` : 'none', transition: 'color 0.2s' }}>
            {item.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/donate" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
            <Heart size={15} fill="white" /> Donate
          </Link>
          {!user ? (
            <Link to="/login" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
              <LogIn size={16} /> Sign In
            </Link>
          ) : (
            <button onClick={() => { handleSignOut(); setMenuOpen(false) }} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
              <LogOut size={16} /> Sign Out
            </button>
          )}
        </div>
        {/* Theme row in mobile */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {THEME_KEYS.map(k => (
            <button key={k} onClick={() => setThemeName(k)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: '9999px', border: `1.5px solid ${k === themeName ? theme.primary : theme.border}`, background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.8125rem', fontWeight: k === themeName ? 700 : 500, color: k === themeName ? theme.primary : theme.textMid }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: THEME_DOTS[k] }} />
              {THEMES[k].name}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
      `}</style>
    </nav>
  )
}
