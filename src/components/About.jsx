import { Lightbulb, HandHeart, Sprout, Globe, Check, ArrowRight, ShieldCheck } from 'lucide-react'

const VALUES = [
  { Icon: Lightbulb, title: 'Awareness', desc: 'Educating communities to recognize and understand mental health challenges without stigma.', color: '#B45309', bg: '#FEF3C7' },
  { Icon: HandHeart, title: 'Support', desc: 'Connecting individuals to professional counselors, peer support, and crisis resources.', color: '#C41E3A', bg: '#FEE2E2' },
  { Icon: Sprout, title: 'Empowerment', desc: 'Equipping communities with tools, resources, and knowledge to thrive and heal.', color: '#2D7A4F', bg: '#E8F5EE' },
  { Icon: Globe, title: 'Outreach', desc: 'Bringing mental health services to underserved regions through humanitarian missions.', color: '#1A6FBF', bg: '#DBEAFE' },
]

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg-soft, #F8F9FA)', paddingTop: '5rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Who We Are</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#615a5a', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            More Than an Organization —<br />
            <span className="gradient-text">A Global Movement</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
            P-REACH OUT International was founded on the belief that mental health is a fundamental human right. We bridge the gap between crisis and care through evidence-based programs and compassionate outreach.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          {/* Left: image collage */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="tilt-card" style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '3/4' }}>
                <img src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Counseling session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="tilt-card" style={{ borderRadius: '20px', overflow: 'hidden', flex: 1 }}>
                  <img src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Community outreach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="tilt-card" style={{ background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>98%</div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', marginTop: '0.375rem', fontWeight: 500 }}>Client satisfaction rate</div>
                </div>
              </div>
            </div>
            {/* Badge overlay */}
            <div style={{ position: 'absolute', bottom: '-1rem', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: '16px', padding: '1rem 1.5rem', boxShadow: '0 16px 48px rgba(0,0,0,0.12)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', background: '#E8F5EE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} color="#2D7A4F" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1A1A2E' }}>WHO Aligned Standards</div>
                <div style={{ fontSize: '0.8125rem', color: '#6B7280' }}>Globally recognized practices</div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="reveal reveal-delay-2">
            <span className="section-label">Our Story</span>
            <h3 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#1A1A2E', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Founded in Care, Driven by Purpose
            </h3>
            <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              P-REACH OUT International began as a grassroots initiative to address the silent epidemic of mental health neglect in underserved communities. Today, we operate across multiple continents delivering life-changing programs.
            </p>
            <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.8, marginBottom: '2rem' }}>
              Our multidisciplinary team of psychologists, counselors, social workers, and advocates works tirelessly to ensure that geography, language, and economic barriers never stand between someone and the help they need.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                'Evidence-based counseling and therapy programs',
                'Community mental health education campaigns',
                'Crisis intervention and 24/7 helpline support',
                'Partnerships with 80+ global health organizations',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '22px', height: '22px', background: '#E8F5EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>
                    <Check size={12} color="#2D7A4F" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Our Mission &amp; Vision
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Values grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {VALUES.map((v, i) => (
            <div key={v.title} className={`reveal reveal-delay-${i + 1} tilt-card card`} style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: v.bg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: v.color }}>
                <v.Icon size={28} />
              </div>
              <h4 style={{ fontWeight: 700, fontSize: '1.0625rem', color: '#1A1A2E', marginBottom: '0.625rem' }}>{v.title}</h4>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div:nth-of-type(2) { grid-template-columns: 1fr !important; }
          #about > div > div:last-of-type { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #about > div > div:last-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
