import { useRef } from 'react'
import { Phone, CheckCircle, Globe, ArrowRight, Heart } from 'lucide-react'
import { useCountUp } from '../hooks/useAnimations'

function StatItem({ value, suffix = '', label }) {
  const ref = useRef(null)
  useCountUp(ref, value)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#C41E3A', lineHeight: 1, marginBottom: '0.5rem', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.125rem' }}>
        <span ref={ref}>0</span>
        <span>{suffix}</span>
      </div>
      <div style={{ fontSize: '0.9375rem', color: '#6B7280', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg, #ffffff)' }}>
      {/* Background gradient blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="floating-shape animate-float" style={{ position: 'absolute', top: '10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(196,30,58,0.06) 0%, transparent 70%)', borderRadius: '50%', transition: 'transform 0.3s ease' }} />
        <div className="floating-shape animate-float-reverse" style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,122,79,0.06) 0%, transparent 70%)', borderRadius: '50%', transition: 'transform 0.3s ease' }} />
        <div className="floating-shape animate-float" style={{ position: 'absolute', top: '40%', left: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(196,30,58,0.04) 0%, transparent 70%)', borderRadius: '50%', transition: 'transform 0.3s ease', animationDelay: '2s' }} />
        <div className="floating-shape" style={{ position: 'absolute', top: '20%', right: '15%', width: '80px', height: '80px', border: '2px solid rgba(196,30,58,0.12)', borderRadius: '20px', transform: 'rotate(20deg)', transition: 'transform 0.4s ease' }} />
        <div className="floating-shape" style={{ position: 'absolute', bottom: '30%', right: '8%', width: '50px', height: '50px', background: 'rgba(45,122,79,0.08)', borderRadius: '50%', transition: 'transform 0.5s ease' }} />
        <div className="floating-shape" style={{ position: 'absolute', top: '60%', left: '8%', width: '60px', height: '60px', border: '2px solid rgba(45,122,79,0.1)', borderRadius: '14px', transform: 'rotate(-15deg)', transition: 'transform 0.35s ease' }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '7rem 2rem 4rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span className="badge-red">Mental Health &amp; Humanitarian</span>
              <div style={{ width: '40px', height: '2px', background: '#C41E3A', borderRadius: '1px' }}></div>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, color: '#1A1A2E', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Reaching Out,<br />
              <span className="gradient-text">Healing Minds,</span><br />
              Empowering Lives
            </h1>

            <p style={{ fontSize: '1.125rem', color: '#4B5563', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '520px' }}>
              P-REACH OUT International bridges the gap between mental health challenges and real support — through counseling, education, outreach programs, and community empowerment across the globe.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <button className="btn-primary" onClick={() => scrollTo('contact')}>
                <Phone size={18} />
                Get Help Now
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('about')}>
                Learn More
                <ArrowRight size={18} />
              </button>
              <button className="btn-green" onClick={() => scrollTo('contact')}>
                <Heart size={18} />
                Donate
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { icon: <CheckCircle size={16} color="#2D7A4F" />, text: 'Confidential' },
                { icon: <CheckCircle size={16} color="#2D7A4F" />, text: 'Certified Counselors' },
                { icon: <Globe size={16} color="#2D7A4F" />, text: 'Global Reach' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: '#6B7280', fontWeight: 500 }}>
                  {b.icon}
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual card */}
          <div style={{ position: 'relative' }}>
            <div className="tilt-card" style={{ borderRadius: '28px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.14)', background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <img src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Mental health support" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(26,26,46,0.6) 100%)' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: 'white' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.375rem' }}>Our Mission</div>
                <div style={{ fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.3 }}>Breaking barriers to mental health care, one life at a time</div>
              </div>
            </div>

            <div className="tilt-card" style={{ position: 'absolute', top: '-1.5rem', left: '-2rem', background: 'white', borderRadius: '20px', padding: '1.25rem 1.5rem', boxShadow: '0 16px 48px rgba(0,0,0,0.12)', minWidth: '160px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#C41E3A', lineHeight: 1 }}>10K+</div>
              <div style={{ fontSize: '0.8125rem', color: '#6B7280', fontWeight: 500, marginTop: '0.25rem' }}>Lives Touched</div>
              <div style={{ width: '32px', height: '3px', background: '#C41E3A', borderRadius: '2px', marginTop: '0.75rem' }} />
            </div>

            <div className="tilt-card" style={{ position: 'absolute', bottom: '-1.5rem', right: '-2rem', background: 'white', borderRadius: '20px', padding: '1.25rem 1.5rem', boxShadow: '0 16px 48px rgba(0,0,0,0.12)', minWidth: '170px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2D7A4F' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2D7A4F' }}>Active Now</span>
              </div>
              <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#1A1A2E' }}>24/7 Support</div>
              <div style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '0.125rem' }}>Always here for you</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ marginTop: '5rem', background: 'linear-gradient(135deg, #F8F9FA, #FFFFFF)', borderRadius: '24px', padding: '2.5rem 3rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #F3F4F6', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          <StatItem value={10000} suffix="+" label="People Supported" />
          <StatItem value={50} suffix="+" label="Countries Reached" />
          <StatItem value={200} suffix="+" label="Certified Counselors" />
          <StatItem value={15} suffix="+" label="Years of Impact" />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #home > div > div:first-of-type { grid-template-columns: 1fr !important; }
          #home > div > div:first-of-type > div:last-of-type { display: none; }
          #home > div > div:last-of-type { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
