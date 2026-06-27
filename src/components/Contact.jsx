import { useState } from 'react'
import { Phone, MessageCircle, Mail, MapPin, AlertOctagon, Clock, CheckCircle, Send, Loader, ArrowRight } from 'lucide-react'

const CONTACT_OPTIONS = [
  { Icon: Phone, title: 'Crisis Hotline', detail: '+1-800-REACH-OUT', sub: 'Available 24/7, all languages', color: '#C41E3A', bg: '#FEE2E2' },
  { Icon: MessageCircle, title: 'Online Chat', detail: 'Start a Session', sub: 'Connect with a counselor now', color: '#2D7A4F', bg: '#E8F5EE' },
  { Icon: Mail, title: 'Email Us', detail: 'help@preachout.org', sub: 'Response within 24 hours', color: '#1A6FBF', bg: '#DBEAFE' },
  { Icon: MapPin, title: 'Visit Us', detail: '25 Healing Way, Suite 100', sub: 'New York, NY | Nairobi | London', color: '#6B21A8', bg: '#F3E8FF' },
]

const SUBJECTS = ['General Inquiry', 'Book a Session', 'Crisis Support', 'Volunteer Interest', 'Partnership', 'Donation', 'Media Inquiry']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1500)
  }

  return (
    <section id="contact" style={{ background: 'var(--bg-soft, #F8F9FA)', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Contact Us</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            We're Here.<br />
            <span className="gradient-text">Reach Out Anytime.</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', lineHeight: 1.75, maxWidth: '540px', margin: '0 auto' }}>
            Whether you need immediate help, want to learn more, or wish to support our mission — we'd love to hear from you.
          </p>
        </div>

        {/* Contact options */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '4rem' }}>
          {CONTACT_OPTIONS.map((opt, i) => (
            <div key={opt.title} className={`reveal reveal-delay-${i + 1} tilt-card card`} style={{ padding: '1.75rem', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '56px', height: '56px', background: opt.bg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: opt.color }}>
                <opt.Icon size={26} strokeWidth={1.8} />
              </div>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '0.375rem' }}>{opt.title}</h4>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: opt.color, marginBottom: '0.25rem' }}>{opt.detail}</div>
              <div style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{opt.sub}</div>
            </div>
          ))}
        </div>

        {/* Form + info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div className="reveal card" style={{ padding: '2.5rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '72px', height: '72px', background: '#E8F5EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle size={36} color="#2D7A4F" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1A1A2E', marginBottom: '0.875rem' }}>Message Received</h3>
                <p style={{ color: '#6B7280', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Thank you for reaching out. A member of our team will respond within 24 hours. If you're in crisis, please call our 24/7 hotline immediately.
                </p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontWeight: 800, fontSize: '1.375rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Send Us a Message</h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.9375rem', marginBottom: '2rem' }}>All conversations are strictly confidential.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem' }}>Full Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '2px solid #E5E7EB', fontSize: '0.9375rem', outline: 'none', transition: 'border-color 0.2s', color: '#1A1A2E' }} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem' }}>Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '2px solid #E5E7EB', fontSize: '0.9375rem', outline: 'none', transition: 'border-color 0.2s', color: '#1A1A2E' }} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem' }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '2px solid #E5E7EB', fontSize: '0.9375rem', outline: 'none', background: 'white', color: form.subject ? '#1A1A2E' : '#9CA3AF', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}>
                      <option value="" disabled>Select a subject</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem' }}>Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help you..." style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '2px solid #E5E7EB', fontSize: '0.9375rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6, color: '#1A1A2E', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#C41E3A'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                  </div>

                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', opacity: loading ? 0.75 : 1 }} disabled={loading}>
                    {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</> : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Right: Info panel */}
          <div className="reveal reveal-delay-2">
            <div style={{ background: 'linear-gradient(135deg, #C41E3A, #9B1629)', borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertOctagon size={28} color="white" />
              </div>
              <div>
                <h4 style={{ fontWeight: 800, color: 'white', fontSize: '1.125rem', marginBottom: '0.5rem' }}>In Crisis Right Now?</h4>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  If you or someone you know is in immediate danger, please call our crisis line or emergency services now.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn-outline-white" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>Call Crisis Line</button>
                  <button style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Live Chat</button>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} color="#C41E3A" /> Office Hours
              </h4>
              {[
                { day: 'Monday – Friday', time: '8:00 AM – 8:00 PM EST' },
                { day: 'Saturday', time: '9:00 AM – 5:00 PM EST' },
                { day: 'Sunday', time: '10:00 AM – 4:00 PM EST' },
                { day: 'Crisis Hotline', time: '24/7, All Languages' },
              ].map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid #F3F4F6', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6B7280' }}>{h.day}</span>
                  <span style={{ fontWeight: 600, color: h.day === 'Crisis Hotline' ? '#2D7A4F' : '#1A1A2E' }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '1rem' }}>Connect With Us</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(s => (
                  <button key={s} style={{ padding: '0.5rem 0.875rem', background: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#C41E3A'; e.currentTarget.style.borderColor = '#C41E3A'; }} onMouseLeave={e => { e.currentTarget.style.background = '#F8F9FA'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.borderColor = '#E5E7EB'; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) { #contact > div > div:nth-of-type(3) { grid-template-columns: 1fr !important; } #contact > div > div:nth-of-type(2) { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { #contact > div > div:nth-of-type(2) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
