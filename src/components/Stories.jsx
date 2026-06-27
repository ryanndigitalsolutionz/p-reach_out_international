import { useState } from 'react'
import { Star, CheckCircle, ArrowRight } from 'lucide-react'

const STORIES = [
  {
    name: 'Sarah M.',
    location: 'Kenya',
    age: '28',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: "P-REACH OUT gave me the tools to understand my anxiety. After six months of counseling, I went from barely leaving my house to starting my own business. Their counselors didn't just listen — they helped me build a completely new relationship with myself.",
    condition: 'Anxiety & PTSD',
    duration: '6 months',
    outcome: 'Business Owner',
    stars: 5,
  },
  {
    name: 'David K.',
    location: 'United States',
    age: '35',
    image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: "I was skeptical about online therapy, but the P-REACH OUT counselors made me feel completely understood. The group healing circles helped me realize I wasn't alone. Eighteen months later, my depression is managed and I'm thriving.",
    condition: 'Depression',
    duration: '18 months',
    outcome: 'Mental Wellness',
    stars: 5,
  },
  {
    name: 'Amara J.',
    location: 'Nigeria',
    age: '22',
    image: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: "Growing up, mental health wasn't something we talked about. The REACH Schools program at my university changed everything. Now I volunteer as a peer counselor — I've seen this organization transform entire communities.",
    condition: 'Social Anxiety',
    duration: '3 months',
    outcome: 'Peer Counselor',
    stars: 5,
  },
  {
    name: 'Marcus T.',
    location: 'United Kingdom',
    age: '41',
    image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: "After losing my brother, I was completely lost. The grief counseling program met me exactly where I was. The compassion and expertise of the team is unlike anything I've experienced. They saved my life — literally.",
    condition: 'Grief & Loss',
    duration: '9 months',
    outcome: 'Full Recovery',
    stars: 5,
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
      ))}
    </div>
  )
}

export default function Stories() {
  const [active, setActive] = useState(0)
  const story = STORIES[active]

  return (
    <section id="stories" style={{ background: '#1A1A2E', paddingTop: '6rem', paddingBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(196,30,58,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(45,122,79,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C41E3A', marginBottom: '1rem', display: 'block' }}>Success Stories</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Real People,<br />
            <span style={{ color: '#C41E3A' }}>Real Transformations</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '540px', margin: '0 auto' }}>
            Behind every number is a human story. Here are just a few of the thousands of lives transformed through P-REACH OUT.
          </p>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(196,30,58,0.5)', margin: '0 auto' }}>
                <img src={story.image} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '44px', height: '44px', background: '#C41E3A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #1A1A2E' }}>
                <CheckCircle size={22} color="white" fill="white" />
              </div>
            </div>

            <div style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{story.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', marginBottom: '1rem' }}>{story.location}, Age {story.age}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Stars count={story.stars} />
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { label: 'Condition', value: story.condition },
                { label: 'Program Duration', value: story.duration },
                { label: 'Outcome', value: story.outcome },
              ].map(m => (
                <div key={m.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '10px', padding: '0.625rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#4CAF7A' }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '5rem', color: 'rgba(196,30,58,0.3)', lineHeight: 0.5, marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>"</div>
            <p style={{ fontSize: '1.375rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, marginBottom: '2rem', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {story.quote}
            </p>
            <div style={{ height: '3px', width: '60px', background: '#C41E3A', borderRadius: '2px', marginBottom: '2rem' }} />
            <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Start Your Journey
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', paddingBottom: '4rem' }}>
          {STORIES.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: active === i ? 'rgba(196,30,58,0.2)' : 'rgba(255,255,255,0.06)', border: active === i ? '1.5px solid rgba(196,30,58,0.6)' : '1.5px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '0.75rem 1.25rem', cursor: 'pointer', transition: 'all 0.25s ease' }}
            >
              <img src={s.image} alt={s.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: active === i ? 'white' : 'rgba(255,255,255,0.7)' }}>{s.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{s.location}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
