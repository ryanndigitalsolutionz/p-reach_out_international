import { ArrowRight } from 'lucide-react'

const PROGRAMS = [
  {
    title: 'REACH Schools Initiative',
    category: 'Education',
    catColor: '#6B21A8',
    catBg: '#F3E8FF',
    desc: 'Embedding mental health education into K-12 and university curriculums across 20+ countries. Equipping students and educators with tools for emotional wellness.',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
    stats: [{ n: '500+', label: 'Schools' }, { n: '200K+', label: 'Students' }],
  },
  {
    title: 'Community Healing Circles',
    category: 'Community',
    catColor: '#2D7A4F',
    catBg: '#E8F5EE',
    desc: 'Culturally sensitive group healing sessions led by trained facilitators, bringing together survivors of trauma, grief, and crisis for peer support.',
    image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800',
    stats: [{ n: '1200+', label: 'Circles Run' }, { n: '45K+', label: 'Participants' }],
  },
  {
    title: 'Crisis Hotline Network',
    category: 'Emergency',
    catColor: '#C41E3A',
    catBg: '#FEE2E2',
    desc: 'A 24/7 multilingual crisis intervention hotline staffed by certified counselors, reaching individuals in their darkest moments with compassionate support.',
    image: 'https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=800',
    stats: [{ n: '24/7', label: 'Available' }, { n: '35+', label: 'Languages' }],
  },
  {
    title: 'Humanitarian Field Missions',
    category: 'Global',
    catColor: '#1A6FBF',
    catBg: '#DBEAFE',
    desc: 'Deploying mental health professionals to conflict zones, refugee camps, and disaster areas to provide immediate psychological first aid and long-term support.',
    image: 'https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=800',
    stats: [{ n: '30+', label: 'Countries' }, { n: '5K+', label: 'Aided' }],
  },
]

export default function Programs() {
  return (
    <section id="programs" style={{ background: '#ffffff', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="reveal">
            <span className="section-label">Our Programs</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '0.75rem' }}>
              Turning Compassion<br />
              <span className="gradient-text">Into Action</span>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#6B7280', lineHeight: 1.7, maxWidth: '480px' }}>
              Each program is designed to create lasting change — not just temporary relief.
            </p>
          </div>
          <div className="reveal reveal-delay-2">
            <button className="btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Volunteer With Us
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {PROGRAMS.map((p, i) => (
            <div key={p.title} className={`reveal reveal-delay-${(i % 2) + 1} tilt-card card`} style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(26,26,46,0.5) 100%)' }} />
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: p.catBg, color: p.catColor, padding: '0.3rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 700 }}>
                  {p.category}
                </span>
              </div>

              <div style={{ padding: '1.75rem' }}>
                <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1A1A2E', marginBottom: '0.75rem', lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.65, marginBottom: '1.5rem' }}>{p.desc}</p>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', padding: '1rem', background: '#F8F9FA', borderRadius: '12px' }}>
                  {p.stats.map(s => (
                    <div key={s.label}>
                      <div style={{ fontWeight: 800, fontSize: '1.375rem', color: '#C41E3A' }}>{s.n}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#9CA3AF', fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }} onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '4rem', padding: '2.5rem 3rem', background: '#F8F9FA', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: '#1A1A2E', marginBottom: '0.25rem' }}>Become a Partner Organization</div>
            <div style={{ color: '#6B7280', fontSize: '0.9375rem' }}>Join our global network of humanitarian and health organizations.</div>
          </div>
          <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Become a Partner
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { #programs > div > div:nth-of-type(2) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
