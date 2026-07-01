import { Heart, Users, Monitor, AlertTriangle, BookOpen, MapPin, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    Icon: Heart,
    title: 'Individual Counseling',
    desc: 'One-on-one sessions with licensed therapists tailored to your unique mental health journey and personal goals.',
    color: '#C41E3A',
    bg: '#FEE2E2',
    tag: 'Most Popular',
  },
  {
    Icon: Users,
    title: 'Group Therapy',
    desc: 'Structured group sessions that foster connection, shared healing, and community resilience.',
    color: '#2D7A4F',
    bg: '#E8F5EE',
    tag: 'Community',
  },
  {
    Icon: Monitor,
    title: 'Online Therapy',
    desc: 'Secure, confidential virtual sessions accessible from anywhere in the world, anytime.',
    color: '#1A6FBF',
    bg: '#DBEAFE',
    tag: '24/7 Available',
  },
  {
    Icon: AlertTriangle,
    title: 'Crisis Intervention',
    desc: 'Immediate, compassionate support during acute mental health crises with trained crisis counselors.',
    color: '#B45309',
    bg: '#FEF3C7',
    tag: 'Emergency',
  },
  {
    Icon: BookOpen,
    title: 'Mental Health Education',
    desc: 'Workshops, webinars, and resources to build mental health literacy in schools and workplaces.',
    color: '#6B21A8',
    bg: '#F3E8FF',
    tag: 'Education',
  },
  {
    Icon: MapPin,
    title: 'Community Outreach',
    desc: 'On-the-ground programs bringing mental health awareness and services to underserved communities.',
    color: '#0891B2',
    bg: '#CFFAFE',
    tag: 'Humanitarian',
  },
]

export default function Services() {
  const scrollToContact = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="services" style={{ background: 'var(--bg, #ffffff)', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">What We Offer</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#615a5a', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Comprehensive Mental Health<br />
            <span className="gradient-text">Services &amp; Support</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto' }}>
            From one-on-one counseling to large-scale community programs, our services meet people where they are and guide them toward healing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem', marginBottom: '3rem' }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${(i % 3) + 1} tilt-card card`} style={{ padding: '2.25rem', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: s.bg, color: s.color, padding: '0.2rem 0.7rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                {s.tag}
              </div>

              <div style={{ width: '60px', height: '60px', background: s.bg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: s.color }}>
                <s.Icon size={28} strokeWidth={1.8} />
              </div>

              <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1A1A2E', marginBottom: '0.75rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.65, marginBottom: '1.5rem' }}>{s.desc}</p>

              <button onClick={scrollToContact} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.875rem', color: s.color, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
                Book Session
                <ArrowRight size={16} />
              </button>

              <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', background: s.bg, borderRadius: '50%', opacity: 0.4 }} />
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="reveal" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)', borderRadius: '28px', padding: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem', lineHeight: 1.2 }}>Not sure where to start?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '480px' }}>
              Our intake team will guide you to the right service. Take our free mental health assessment today.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={scrollToContact}>Take Assessment</button>
            <button className="btn-outline-white" onClick={scrollToContact}>Talk to Someone</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { #services > div > div:nth-of-type(2) { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { #services > div > div:nth-of-type(2) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
