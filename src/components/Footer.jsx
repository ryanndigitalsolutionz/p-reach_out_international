import { Heart, Share2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  'Services': ['Individual Counseling', 'Group Therapy', 'Online Sessions', 'Crisis Support', 'Community Outreach', 'Education Programs'],
  'Conditions': ['Anxiety Disorders', 'Depression', 'PTSD', 'Bipolar Disorder', 'ADHD', 'OCD', 'View All 25+'],
  'About Us': ['Our Story', 'Our Team', 'Programs', 'Partners', 'Research', 'Press & Media'],
  'Get Involved': ['Volunteer', 'Donate', 'Become a Partner', 'Refer a Client', 'Careers', 'Newsletter'],
}

const SOCIAL = [
  { label: 'Facebook', hoverColor: '#1877F2', hoverBorder: 'rgba(24,119,242,0.5)' },
  { label: 'Twitter', hoverColor: '#1DA1F2', hoverBorder: 'rgba(29,161,242,0.5)' },
  { label: 'Instagram', hoverColor: '#E1306C', hoverBorder: 'rgba(225,48,108,0.5)' },
  { label: 'LinkedIn', hoverColor: '#0A66C2', hoverBorder: 'rgba(10,102,194,0.5)' },
  { label: 'YouTube', hoverColor: '#FF0000', hoverBorder: 'rgba(255,0,0,0.5)' },
]

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#0F0F1A', color: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={22} color="white" fill="white" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em' }}>P-REACH OUT</div>
                <div style={{ fontSize: '0.6875rem', color: '#C41E3A', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>International</div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '280px' }}>
              A global mental health and humanitarian organization dedicated to awareness, support, counseling, education, and community empowerment.
            </p>

            <div style={{ background: 'rgba(196,30,58,0.15)', border: '1px solid rgba(196,30,58,0.3)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>24/7 Crisis Line</div>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', color: '#C41E3A' }}>+1-800-REACH-OUT</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {SOCIAL.map(s => (
                <button
                  key={s.label}
                  title={s.label}
                  style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.02em' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${s.hoverColor}22`; e.currentTarget.style.color = s.hoverColor; e.currentTarget.style.borderColor = s.hoverBorder; e.currentTarget.style.boxShadow = `0 0 12px ${s.hoverColor}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <Share2 size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'white', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>{heading}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(link => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const map = {
                          'Individual Counseling': 'services', 'Group Therapy': 'services', 'Online Sessions': 'services',
                          'Crisis Support': 'contact', 'Community Outreach': 'programs', 'Education Programs': 'programs',
                          'Our Story': 'about', 'Our Team': 'team', 'Programs': 'programs',
                          'Volunteer': 'contact', 'Donate': 'contact', 'Become a Partner': 'contact',
                          'Refer a Client': 'contact', 'Careers': 'contact',
                        }
                        const target = map[link] || (link.startsWith('View All') ? 'library' : 'contact')
                        scrollTo(target)
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', textAlign: 'left', padding: 0, fontFamily: 'inherit' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.375rem' }}>Stay Informed. Stay Empowered.</div>
            <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Monthly mental health resources, program updates, and community stories.</div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flex: 1, maxWidth: '420px' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: '0.9rem', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#C41E3A'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <button className="btn-primary" style={{ flexShrink: 0, padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
            © 2024 P-REACH OUT International. All rights reserved. A 501(c)(3) Nonprofit Organization.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/donate" style={{ fontSize: '0.875rem', color: '#C41E3A', fontWeight: 700, textDecoration: 'none' }}>Donate</Link>
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Cookie Policy'].map(l => (
              <button key={l} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'inherit', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { footer > div > div:first-of-type { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { footer > div > div:first-of-type { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
