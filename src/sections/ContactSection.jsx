// ContactSection.jsx — "Contact us" section for The Word Garden
import { useEffect, useRef, useState } from 'react'

import plant        from '../assets/Plant.png'
import flowerPink   from '../assets/Pink_Flower.png'
import sparkle      from '../assets/Sparkle.png'
import cloud        from '../assets/Cloud.png'
import character    from '../assets/ContactUsGreenCharacter.png'
import letterbox    from '../assets/LetterBox.png'

/* ── Input field component ───────────────────────────────────────────────── */
function Field({ icon, label, type = 'text', placeholder, name, isTextarea }) {
  const [focused, setFocused] = useState(false)
  const base = {
    width: '100%',
    background: focused ? '#fff' : '#f9fafb',
    border: `1.5px solid ${focused ? '#5DBB63' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: '12px',
    padding: isTextarea ? '0.75rem 1rem' : '0.7rem 1rem',
    fontSize: '0.88rem',
    color: '#2C3E2D',
    fontFamily: "'Nunito',sans-serif",
    outline: 'none',
    resize: isTextarea ? 'vertical' : undefined,
    minHeight: isTextarea ? '120px' : undefined,
    transition: 'border 0.2s, box-shadow 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(93,187,99,0.15)' : '0 1px 4px rgba(0,0,0,0.05) inset',
    boxSizing: 'border-box',
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
      <label style={{
        display: 'flex', alignItems: 'center', gap: '0.35rem',
        fontSize: '0.82rem', fontWeight: 700, color: '#3A9A41',
        fontFamily: "'Fredoka',sans-serif",
      }}>
        <span>{icon}</span> {label}
      </label>
      {isTextarea
        ? <textarea
            name={name} placeholder={placeholder} style={base}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          />
        : <input
            type={type} name={name} placeholder={placeholder} style={base}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          />
      }
    </div>
  )
}

/* ── Info row ─────────────────────────────────────────────────────────────── */
function InfoRow({ icon, label, title, subtitle, noDivider }) {
  return (
    <>
      <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', padding: '0.2rem 0' }}>
        {/* Circle icon */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'linear-gradient(135deg,#dcfce7,#86efac)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', flexShrink: 0,
          boxShadow: '0 3px 10px rgba(74,222,128,0.25)',
        }}>{icon}</div>

        <div style={{ flex: 1 }}>
          {label && (
            <div style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
              color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.22rem',
            }}>{label}</div>
          )}
          <div style={{
            fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
            fontSize: '0.97rem', color: '#1a3a1e', lineHeight: 1.35,
            marginBottom: subtitle ? '0.18rem' : 0,
          }}>{title}</div>
          {subtitle && (
            <div style={{ fontSize: '0.77rem', color: '#7A8E7B', fontWeight: 500, lineHeight: 1.45 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {!noDivider && (
        <div style={{ borderBottom: '1.5px dashed rgba(93,187,99,0.22)', margin: '0.75rem 0' }} />
      )}
    </>
  )
}

/* ── Google Apps Script endpoint ─────────────────────────────────────────── */
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwK-5H2h2x_ALT_9wPFl7YbhIIBEbGsl2vx5hL13YVd280PrqAFhlsVFINVbo9mdXgaVw/exec'

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function ContactSection() {
  const secRef  = useRef(null)
  const formRef = useRef(null)
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    const els = secRef.current?.querySelectorAll('.ct-animate')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' })
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={secRef}
      style={{
        background: 'linear-gradient(180deg,#faf8f0 0%,#f4f9f0 100%)',
        padding: 'clamp(4rem,7vw,6rem) 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Clouds ── */}
      <img src={cloud} alt="" style={{
        position:'absolute', top:'4%', left:'6%',
        width:'clamp(80px,10vw,130px)', opacity:0.75, zIndex:0, pointerEvents:'none',
        animation:'floatY 6s ease-in-out infinite',
      }}/>
      <img src={cloud} alt="" style={{
        position:'absolute', top:'6%', right:'7%',
        width:'clamp(60px,8vw,110px)', opacity:0.65, zIndex:0, pointerEvents:'none',
        animation:'floatY 7s ease-in-out 1.5s infinite',
      }}/>
      <img src={cloud} alt="" style={{
        position:'absolute', top:'2%', right:'28%',
        width:'clamp(40px,5vw,70px)', opacity:0.45, zIndex:0, pointerEvents:'none',
        animation:'floatY 5s ease-in-out 0.8s infinite',
      }}/>

      {/* ── Floating pastel dots ── */}
      {[
        {top:'12%',left:'18%',c:'#86efac',s:10},
        {top:'18%',left:'30%',c:'#fca5a5',s:8},
        {top:'10%',right:'22%',c:'#c4b5fd',s:11},
        {top:'20%',right:'15%',c:'#fcd34d',s:7},
        {top:'8%', right:'40%',c:'#6ee7b7',s:9},
      ].map((d,i)=>(
        <div key={i} style={{
          position:'absolute', top:d.top, left:d.left, right:d.right,
          width:`${d.s}px`, height:`${d.s}px`, borderRadius:'50%',
          background:d.c, opacity:0.55, zIndex:0, pointerEvents:'none',
        }}/>
      ))}

      {/* ── Left plant vine ── */}
      <img src={plant} alt="" style={{
        position:'absolute', left:'-8px', top:'20%',
        width:'clamp(60px,8vw,110px)', zIndex:0,
        opacity:0.8, pointerEvents:'none',
      }}/>
      <img src={flowerPink} alt="" style={{
        position:'absolute', left:'1%', top:'50%',
        width:'clamp(22px,3vw,40px)', zIndex:0,
        opacity:0.45, pointerEvents:'none',
      }}/>

      {/* ── Right plant vine ── */}
      <img src={plant} alt="" style={{
        position:'absolute', right:'-8px', top:'18%',
        width:'clamp(60px,8vw,110px)', zIndex:0,
        opacity:0.75, pointerEvents:'none', transform:'scaleX(-1)',
      }}/>
      <img src={flowerPink} alt="" style={{
        position:'absolute', right:'1%', top:'48%',
        width:'clamp(22px,3vw,40px)', zIndex:0,
        opacity:0.45, pointerEvents:'none',
      }}/>

      <div className="container" style={{ position:'relative', zIndex:1 }}>

        {/* ── CENTERED HEADER ── */}
        <div className="ct-animate" style={{ textAlign:'center', marginBottom:'2.6rem' }}>
          <h2 style={{
            fontFamily:"'Fredoka',sans-serif",
            fontSize:'clamp(2.4rem,4.5vw,3.5rem)',
            fontWeight:700, color:'#1a3a1e',
            lineHeight:1.1, marginBottom:'0.35rem',
            display:'inline-flex', alignItems:'center', gap:'0.4rem',
          }}>
            Contact us <span style={{fontSize:'1.9rem'}}>🌸</span>
          </h2>

          {/* Wavy underline */}
          <div style={{display:'flex',justifyContent:'center',marginBottom:'0.9rem'}}>
            <svg width="130" height="11" viewBox="0 0 130 11" fill="none">
              <path d="M2 7 C24 2,48 11,72 5 C96 0,118 9,128 4"
                stroke="#F4A137" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <p style={{
            fontSize:'0.95rem', color:'#4A5E4B', lineHeight:1.72,
            fontWeight:500, maxWidth:'500px', margin:'0 auto',
          }}>
            We'd love to hear from you! Send us a message and we'll get
            back to you as soon as possible.
          </p>
        </div>

        {/* ── 2-COLUMN MAIN LAYOUT ── */}
        <div className="ct-main-row" style={{
          display:'grid', gridTemplateColumns:'1fr 0.7fr',
          gap:'clamp(1rem,3vw,2rem)', marginBottom:'1.5rem',
        }}>

          {/* ── LEFT: Contact form ── */}
          <div className="ct-animate" style={{
            background:'white',
            borderRadius:'28px',
            border:'1.5px solid rgba(93,187,99,0.14)',
            boxShadow:'0 6px 28px rgba(0,0,0,0.07)',
            padding:'clamp(1.5rem,3vw,2.2rem)',
          }}>
            <form
              ref={formRef}
              onSubmit={async e => {
                e.preventDefault()
                if (loading || sent) return

                const fd = new FormData(formRef.current)
                const payload = {
                  name:    fd.get('name')?.trim()    ?? '',
                  email:   fd.get('email')?.trim()   ?? '',
                  subject: fd.get('subject')?.trim() ?? '',
                  message: fd.get('message')?.trim() ?? '',
                }

                setLoading(true)
                setError('')

                try {
                  // Apps Script requires no-cors OR a CORS-enabled deployment
                  // We use no-cors so fetch never throws on redirect; treat any
                  // response (including opaque) as success.
                  await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode:   'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                  })
                  setSent(true)
                  formRef.current?.reset()
                } catch (err) {
                  console.error('Contact form error:', err)
                  setError('Something went wrong. Please try again.')
                } finally {
                  setLoading(false)
                }
              }}
            >
              {/* Row 1: Name + Email */}
              <div style={{ display:'flex', gap:'1rem', marginBottom:'1rem' }}>
                <Field icon="👤" label="Your Name"     name="name"    placeholder="Enter your name"  />
                <Field icon="✉️" label="Email Address" name="email"   placeholder="Enter your email" type="email" />
              </div>

              {/* Row 2: Subject */}
              <div style={{ marginBottom:'1rem' }}>
                <Field icon="📋" label="Subject" name="subject" placeholder="Enter the subject" />
              </div>

              {/* Row 3: Message */}
              <div style={{ marginBottom:'1.3rem' }}>
                <Field icon="💬" label="Message or Query" name="message"
                  placeholder="Type your message here..." isTextarea />
              </div>

              {/* Error banner */}
              {error && (
                <div style={{
                  marginBottom: '0.9rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '10px',
                  background: '#fff1f2',
                  border: '1.5px solid rgba(251,113,133,0.35)',
                  color: '#be123c',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  fontFamily: "'Nunito',sans-serif",
                }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Send button */}
              <button
                type="submit"
                disabled={loading || sent}
                style={{
                  width:'100%', padding:'0.88rem 1.5rem',
                  borderRadius:'14px',
                  background: sent
                    ? '#4ade80'
                    : loading
                      ? 'rgba(26,94,32,0.55)'
                      : 'linear-gradient(135deg,#1a5e20,#2d8a35)',
                  color:'white',
                  fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:'1.05rem',
                  border:'none',
                  cursor: loading || sent ? 'default' : 'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'0.55rem',
                  transition:'transform 0.2s, box-shadow 0.2s, background 0.25s',
                  boxShadow:'0 4px 16px rgba(26,94,32,0.30)',
                  opacity: loading ? 0.8 : 1,
                }}
                onMouseEnter={e => {
                  if (loading || sent) return
                  e.currentTarget.style.transform='scale(1.02)'
                  e.currentTarget.style.boxShadow='0 8px 24px rgba(26,94,32,0.40)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform='scale(1)'
                  e.currentTarget.style.boxShadow='0 4px 16px rgba(26,94,32,0.30)'
                }}
              >
                {sent    ? '✅ Message Sent!'
                 : loading ? <><span style={{fontSize:'0.95rem'}}>⏳</span> Sending…</>
                 : <><span>Send Message</span><span>✈️</span></>}
              </button>

              {/* Success note */}
              {sent && (
                <p style={{
                  marginTop: '0.75rem',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  color: '#15803d',
                  fontWeight: 600,
                  fontFamily: "'Nunito',sans-serif",
                }}>
                  🌿 Thank you! We'll get back to you as soon as possible.
                </p>
              )}
            </form>
          </div>

          {/* ── RIGHT: Contact info card ── */}
          <div className="ct-animate" style={{
            background:'linear-gradient(160deg,#fffbeb 0%,#faf8f0 100%)',
            borderRadius:'28px',
            border:'1.5px solid rgba(244,161,55,0.18)',
            boxShadow:'0 6px 28px rgba(0,0,0,0.07)',
            padding:'clamp(1.3rem,3vw,2rem)',
            display:'flex', flexDirection:'column', gap:'0.1rem',
          }}>
            {/* Pill label */}
            <div style={{ marginBottom:'1.2rem' }}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'0.4rem',
                background:'#fef9c3',
                border:'1.5px solid rgba(244,161,55,0.28)',
                borderRadius:'50px', padding:'0.4rem 1.1rem',
                fontFamily:"'Fredoka',sans-serif", fontWeight:700,
                fontSize:'0.88rem', color:'#92400e',
                boxShadow:'0 3px 10px rgba(244,161,55,0.14)',
              }}>
                <span style={{fontSize:'1rem'}}>💬</span> General Contact Info
              </div>
            </div>

            <InfoRow
              icon="✉️"
              label="EMAIL"
              title="thewordgarden421@gmail.com"
            />
            <InfoRow
              icon="📍"
              label="INSTITUTION"
              title="Sri Lanka Institute of Information Technology (SLIIT)"
              subtitle="New Kandy Road, Malabe, Sri Lanka"
            />
            <InfoRow
              icon="👥"
              title="Team Word Garden"
              subtitle="Cultivating Literacy in an Emotionally Safe World"
              noDivider
            />
          </div>
        </div>

        {/* ── BOTTOM AREA: character + quote + letterbox ── */}
        <div style={{
          display:'grid', gridTemplateColumns:'auto 1fr auto',
          gap:'1.5rem', alignItems:'flex-end',
        }}>

          {/* Bottom-left: book character */}
          <img src={character} alt="Book character with envelope" style={{
            width:'clamp(90px,12vw,155px)', objectFit:'contain',
            filter:'drop-shadow(0 8px 18px rgba(0,0,0,0.12))',
            mixBlendMode:'multiply',
          }}/>

          {/* Center: quote strip */}
          <div className="ct-animate" style={{
            background:'linear-gradient(135deg,#e8f5e9 0%,#f0fdf4 100%)',
            borderRadius:'22px',
            padding:'1rem 1.6rem',
            display:'flex', alignItems:'center', gap:'0.9rem',
            boxShadow:'0 4px 18px rgba(0,0,0,0.05)',
            border:'1.5px solid rgba(93,187,99,0.20)',
            alignSelf:'stretch', justifyContent:'center',
          }}>
            <span style={{fontSize:'1.6rem', flexShrink:0}}>💚</span>
            <div>
              <div style={{
                fontFamily:"'Fredoka',sans-serif", fontWeight:700,
                fontSize:'0.98rem', color:'#1a6b24', lineHeight:1.45,
              }}>
                Your message matters to us.<br/>
                <span style={{fontSize:'0.88rem', fontWeight:600, color:'#3A9A41'}}>
                  We will respond as soon as possible!
                </span>
              </div>
            </div>
            <span style={{fontSize:'1.2rem', flexShrink:0}}>🌿</span>
          </div>

          {/* Bottom-right: letterbox */}
          <img src={letterbox} alt="Mailbox" style={{
            width:'clamp(90px,12vw,150px)', objectFit:'contain',
            filter:'drop-shadow(0 8px 18px rgba(0,0,0,0.12))',
            mixBlendMode:'multiply',
          }}/>
        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media(max-width:860px){
          .ct-main-row{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
