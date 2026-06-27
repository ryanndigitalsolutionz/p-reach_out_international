import { Check } from 'lucide-react'

const TEAM = [
  {
    name: 'Dr. Aisha Okonkwo',
    role: 'Founder & Executive Director',
    bio: 'Clinical psychologist with 20+ years in global mental health policy and humanitarian missions across 40 countries.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    creds: 'PhD Clinical Psychology, Harvard',
    specialty: 'Trauma & Resilience',
  },
  {
    name: 'Dr. Marcus Thompson',
    role: 'Director of Clinical Services',
    bio: 'Board-certified psychiatrist specializing in complex PTSD, mood disorders, and evidence-based therapy protocols.',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600',
    creds: 'MD Psychiatry, Johns Hopkins',
    specialty: 'PTSD & Mood Disorders',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Head of Education Programs',
    bio: 'Former WHO consultant who has designed mental health curricula implemented in 500+ schools globally.',
    image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600',
    creds: 'EdD Mental Health Education, Oxford',
    specialty: 'Youth Mental Wellness',
  },
  {
    name: 'James Osei-Bonsu',
    role: 'Director of Outreach',
    bio: 'Social work veteran who has led community healing programs in conflict zones across Africa and Southeast Asia.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    creds: 'MSW Columbia University',
    specialty: 'Community Empowerment',
  },
  {
    name: 'Dr. Elena Vasquez',
    role: 'Senior Counselor',
    bio: 'Bilingual counselor specializing in anxiety, depression, and cultural identity issues with deep expertise in CBT.',
    image: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=600',
    creds: 'PsyD Counseling, UCLA',
    specialty: 'Anxiety & Identity',
  },
  {
    name: 'Dr. Benjamin Achebe',
    role: 'Research Director',
    bio: 'Published researcher in global mental health disparities with 50+ peer-reviewed papers and policy impact.',
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600',
    creds: 'PhD Public Health, Stanford',
    specialty: 'Mental Health Research',
  },
]

export default function Team() {
  return (
    <section id="team" style={{ background: '#ffffff', paddingTop: '6rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Our Team</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            World-Class Experts,<br />
            <span className="gradient-text">Guided by Compassion</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: 1.75, maxWidth: '540px', margin: '0 auto' }}>
            Our team brings together leading mental health professionals, researchers, and advocates united by a single purpose: healing humanity.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {TEAM.map((member, i) => (
            <div key={member.name} className={`reveal reveal-delay-${(i % 3) + 1} tilt-card card`} style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,26,46,0.7) 100%)' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.95)', color: '#C41E3A', borderRadius: '8px', padding: '0.25rem 0.625rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  {member.specialty}
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#1A1A2E', marginBottom: '0.25rem' }}>{member.name}</h3>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#C41E3A', marginBottom: '0.75rem' }}>{member.role}</div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.65, marginBottom: '1rem' }}>{member.bio}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.875rem', background: '#F8F9FA', borderRadius: '10px' }}>
                  <div style={{ width: '20px', height: '20px', background: '#E8F5EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={11} color="#2D7A4F" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: 500 }}>{member.creds}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '4rem', background: 'linear-gradient(135deg, #E8F5EE, #F8F9FA)', borderRadius: '24px', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', border: '1px solid #D1FAE5' }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1A1A2E', marginBottom: '0.625rem' }}>Join Our Team of Healers</h3>
            <p style={{ color: '#6B7280', fontSize: '1rem', lineHeight: 1.6, maxWidth: '500px' }}>
              We're always looking for passionate mental health professionals, counselors, and volunteers to expand our mission.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-green" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Apply as Counselor</button>
            <button className="btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Volunteer</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { #team > div > div:nth-of-type(2) { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { #team > div > div:nth-of-type(2) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
