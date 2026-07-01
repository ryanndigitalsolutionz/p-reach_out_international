import { useState } from 'react'
import {
  Wind, CloudRain, ShieldAlert, Zap, Puzzle, RefreshCw,
  RotateCcw, Activity, Users, CircleDashed, Leaf, Layers,
  Waves, Eye, Ghost, Moon, Scale, Unlock, Feather,
  Heart, AlertCircle, Fingerprint, Palette, Star, Brain, Search, ChevronDown, ChevronUp, ArrowRight
} from 'lucide-react'

const CATEGORIES = [
  { name: 'Anxiety Disorders', Icon: Wind, color: '#B45309', bg: '#FEF3C7', desc: 'Conditions characterized by excessive fear, worry, and related behavioral disturbances.', articles: 12 },
  { name: 'Depression', Icon: CloudRain, color: '#1A6FBF', bg: '#DBEAFE', desc: 'Mood disorders involving persistent feelings of sadness, emptiness, and loss of interest.', articles: 18 },
  { name: 'PTSD', Icon: ShieldAlert, color: '#C41E3A', bg: '#FEE2E2', desc: 'Post-traumatic stress disorder triggered by experiencing or witnessing traumatic events.', articles: 14 },
  { name: 'ADHD', Icon: Zap, color: '#6B21A8', bg: '#F3E8FF', desc: 'Attention-deficit/hyperactivity disorder affecting focus, impulse control, and activity levels.', articles: 10 },
  { name: 'Autism Spectrum Disorder', Icon: Puzzle, color: '#0891B2', bg: '#CFFAFE', desc: 'A neurodevelopmental condition affecting communication, social interaction, and behavior patterns.', articles: 11 },
  { name: 'Bipolar Disorder', Icon: RefreshCw, color: '#2D7A4F', bg: '#E8F5EE', desc: 'A condition causing extreme mood swings including emotional highs (mania) and lows (depression).', articles: 9 },
  { name: 'OCD', Icon: RotateCcw, color: '#B45309', bg: '#FEF3C7', desc: 'Obsessive-compulsive disorder involving unwanted thoughts and repetitive behaviors.', articles: 8 },
  { name: 'Panic Disorder', Icon: Activity, color: '#C41E3A', bg: '#FEE2E2', desc: 'Recurrent unexpected panic attacks and persistent fear of future attacks.', articles: 7 },
  { name: 'Social Anxiety', Icon: Users, color: '#1A6FBF', bg: '#DBEAFE', desc: 'Intense fear of social situations and scrutiny by others that interferes with daily life.', articles: 13 },
  { name: 'Generalized Anxiety', Icon: CircleDashed, color: '#6B21A8', bg: '#F3E8FF', desc: 'Persistent, excessive worry about various aspects of life that is difficult to control.', articles: 11 },
  { name: 'Eating Disorders', Icon: Leaf, color: '#2D7A4F', bg: '#E8F5EE', desc: 'Conditions marked by abnormal eating habits that negatively impact health and well-being.', articles: 9 },
  { name: 'Schizophrenia', Icon: Layers, color: '#0891B2', bg: '#CFFAFE', desc: 'A serious mental disorder affecting thinking, feelings, and behavior in profound ways.', articles: 8 },
  { name: 'Borderline Personality', Icon: Waves, color: '#C41E3A', bg: '#FEE2E2', desc: 'Characterized by unstable moods, behavior, and relationships with intense fear of abandonment.', articles: 10 },
  { name: 'Narcissistic Personality', Icon: Eye, color: '#B45309', bg: '#FEF3C7', desc: 'A pattern of grandiosity, need for admiration, and lack of empathy toward others.', articles: 6 },
  { name: 'Dissociative Disorders', Icon: Ghost, color: '#6B21A8', bg: '#F3E8FF', desc: 'Disruptions in consciousness, memory, identity, or perception of the environment.', articles: 7 },
  { name: 'Sleep Disorders', Icon: Moon, color: '#1A6FBF', bg: '#DBEAFE', desc: 'Conditions that impair sleep quality, timing, and duration affecting daily functioning.', articles: 12 },
  { name: 'Stress Disorders', Icon: Scale, color: '#2D7A4F', bg: '#E8F5EE', desc: 'Conditions stemming from excessive stress that affect mental and physical health.', articles: 15 },
  { name: 'Addiction & Substance Use', Icon: Unlock, color: '#C41E3A', bg: '#FEE2E2', desc: 'Compulsive use of substances or engagement in behaviors despite harmful consequences.', articles: 16 },
  { name: 'Grief & Loss', Icon: Feather, color: '#1A6FBF', bg: '#DBEAFE', desc: 'Emotional suffering following bereavement, significant loss, or major life transitions.', articles: 10 },
  { name: 'Trauma', Icon: Heart, color: '#B45309', bg: '#FEF3C7', desc: 'Psychological wounds from distressing events that can have lasting effects on mental health.', articles: 14 },
  { name: 'Phobias', Icon: AlertCircle, color: '#6B21A8', bg: '#F3E8FF', desc: 'Intense irrational fears of specific objects, situations, or activities that cause avoidance.', articles: 9 },
  { name: 'Personality Disorders', Icon: Fingerprint, color: '#0891B2', bg: '#CFFAFE', desc: 'Long-term patterns of inner experience and behavior that deviate markedly from expectations.', articles: 11 },
  { name: 'Mood Disorders', Icon: Palette, color: '#2D7A4F', bg: '#E8F5EE', desc: 'A broad category of mental illness affecting emotional state and mood regulation.', articles: 13 },
  { name: 'Childhood Mental Disorders', Icon: Star, color: '#C41E3A', bg: '#FEE2E2', desc: 'Mental health conditions that emerge and are diagnosed during childhood or adolescence.', articles: 17 },
  { name: 'Neurodevelopmental Disorders', Icon: Brain, color: '#1A6FBF', bg: '#DBEAFE', desc: 'Conditions that affect brain development and functioning, often manifesting early in life.', articles: 12 },
]

export default function Library() {
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filtered = CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  )
  const displayed = showAll || search ? filtered : filtered.slice(0, 12)

  return (
    <section id="library" style={{ background: 'var(--bg-soft, #F8F9FA)', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Mental Health Library</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#615a5a', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Understand Every Condition,<br />
            <span className="gradient-text">Find Every Answer</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto 2rem' }}>
            Our comprehensive library covers 25+ mental health conditions with expert-reviewed articles, symptom guides, and treatment resources.
          </p>

          <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
            <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search conditions, symptoms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '14px', border: '2px solid #E5E7EB', fontSize: '0.9375rem', outline: 'none', background: 'white', color: '#1A1A2E', transition: 'border-color 0.2s', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
              onFocus={e => e.target.style.borderColor = '#C41E3A'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {displayed.map((cat, i) => (
            <div
              key={cat.name}
              className={`reveal reveal-delay-${(i % 4) + 1} tilt-card`}
              style={{ background: 'white', borderRadius: '20px', padding: '1.75rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transition: 'all 0.25s ease', position: 'relative', overflow: 'hidden', border: '1px solid #F3F4F6' }}

            >
              {/* Image placeholder area with Lucide icon */}
              <div style={{ width: '100%', height: '120px', background: `linear-gradient(135deg, ${cat.bg}, ${cat.bg}cc)`, borderRadius: '12px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <cat.Icon size={48} color={cat.color} strokeWidth={1.4} />
                <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(255,255,255,0.85)', borderRadius: '6px', padding: '0.15rem 0.5rem', fontSize: '0.7rem', fontWeight: 600, color: '#6B7280' }}>
                  Image Coming Soon
                </div>
              </div>

              <h4 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1A1A2E', marginBottom: '0.5rem', lineHeight: 1.3 }}>{cat.name}</h4>
              <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', lineHeight: 1.55, marginBottom: '1rem' }}>{cat.desc}</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: cat.color, background: cat.bg, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  {cat.articles} articles
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: cat.color, fontSize: '0.8125rem', fontWeight: 600 }}>
                  Read more
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {!search && filtered.length > 12 && (
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button className="btn-secondary" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : `View All ${CATEGORIES.length} Conditions`}
              {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
            <Search size={48} color="#D1D5DB" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p style={{ fontSize: '1.125rem' }}>No conditions found for "{search}"</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1100px) { #library > div > div:nth-of-type(2) { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { #library > div > div:nth-of-type(2) { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { #library > div > div:nth-of-type(2) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
