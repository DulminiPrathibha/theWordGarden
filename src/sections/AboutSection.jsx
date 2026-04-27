// AboutSection.jsx — "About us" section for The Word Garden
import { useEffect, useRef, useState } from 'react'

// Team member photos
import photoKaviru    from '../assets/KaviruBandara.jpeg'
import photoPrathibha from '../assets/PrathibhaSamarasekara.png'
import photoPiyumal   from '../assets/PiyumalRanasinghe.jpeg'
import photoPesala    from '../assets/PesalaGunasekara.jpg'

// Supervisor photos
import photoDidula  from '../assets/DidulaChamara.jpeg'
import photoKasun   from '../assets/KasunKarunananayaka.jpeg'
import photoNushkan from '../assets/NushkanNisme.jpeg'

// Component Images
import imgKaviru    from '../assets/kaviru.png'
import imgPrathibha from '../assets/prathibha.png'
import imgPiyumal   from '../assets/piyumal.png'
import imgPesala    from '../assets/pesala.png'

// Decorations — Sparkle top-left, Treasure Chest right-middle
import sparkle       from '../assets/Sparkle.png'
import treasureChest from '../assets/Treasure_Chest.png'

/* ── Data ───────────────────────────────────────────────────────────────── */
const RESEARCHERS = [
  { photo: photoKaviru,    name: 'Kaviru Bandara',         email: 'kavirumahim@gmail.com',       componentImg: imgKaviru },
  { photo: photoPrathibha, name: 'Prathibha Samarasekara', email: 'dulminiprathibha@gmail.com',  componentImg: imgPrathibha },
  { photo: photoPiyumal,   name: 'Piyumal Ranasinghe',     email: 'sadeepapiyumal530@gmail.com', componentImg: imgPiyumal },
  { photo: photoPesala,    name: 'Pesala Gunasekara',       email: 'pesalagunasekara@gmail.com', componentImg: imgPesala },
]

const SUPERVISORS = [
  { photo: photoDidula,  name: 'Mr. Didula Chamara',      email: 'didula.c@sliit.lk' },
  { photo: photoKasun,   name: 'Dr. Kasun Karunanayaka',  email: 'ktk@ucsc.cmb.ac.lk' },
  { photo: photoNushkan, name: 'Mr. Nushkan Nisme',        email: 'nushkan.n@sliit.lk' },
]

/* ── Researcher card ─────────────────────────────────────────────────────── */
function ResearcherCard({ p, onClick }) {
  return (
    <div
      className="about-animate"
      onClick={() => onClick(p)}
      style={{
        background: 'white',
        borderRadius: '22px',
        border: '1.5px solid rgba(93,187,99,0.14)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        padding: '1.6rem 1.2rem 1.3rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 18px 44px rgba(0,0,0,0.11)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
      }}
    >
      {/* Circular photo — 25% larger: 90 → 115px */}
      <div style={{
        width: '115px', height: '115px',
        borderRadius: '50%', overflow: 'hidden',
        border: '3.5px solid #e8f5e9',
        boxShadow: '0 6px 18px rgba(93,187,99,0.24)',
        marginBottom: '1rem', flexShrink: 0,
      }}>
        <img src={p.photo} alt={p.name} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        }} />
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
        fontSize: '1rem', color: '#1a3a1e', marginBottom: '0.22rem',
      }}>{p.name}</div>

      {/* Role */}
      <div style={{
        fontSize: '0.77rem', color: '#5DBB63', fontWeight: 700,
        marginBottom: '0.7rem', letterSpacing: '0.02em',
      }}>Researcher</div>

      {/* Email */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.35rem',
        fontSize: '0.69rem', color: '#7A8E7B', fontWeight: 500,
        width: '100%', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '0.82rem', flexShrink: 0 }}>✉️</span>
        <span style={{ wordBreak: 'break-all' }}>{p.email}</span>
      </div>
    </div>
  )
}

/* ── Supervisor card ─────────────────────────────────────────────────────── */
function SupervisorCard({ p }) {
  return (
    <div
      className="about-animate"
      style={{
        background: 'white',
        borderRadius: '22px',
        border: '1.5px solid rgba(244,161,55,0.18)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        padding: '1.4rem 1.4rem 1.3rem',
        display: 'flex', alignItems: 'center', gap: '1.2rem',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.10)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
      }}
    >
      {/* Circular photo — 25% larger: 76 → 96px */}
      <div style={{
        width: '96px', height: '96px',
        borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
        border: '3.5px solid #fef3c7',
        boxShadow: '0 5px 16px rgba(244,161,55,0.26)',
      }}>
        <img src={p.photo} alt={p.name} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
          fontSize: '1rem', color: '#F4A137', marginBottom: '0.18rem',
        }}>{p.name}</div>
        <div style={{
          fontSize: '0.75rem', color: '#92400e', fontWeight: 700,
          marginBottom: '0.55rem', letterSpacing: '0.02em',
        }}>Supervisor</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          fontSize: '0.69rem', color: '#7A8E7B', fontWeight: 500,
        }}>
          <span style={{ flexShrink: 0 }}>✉️</span>
          <span style={{ wordBreak: 'break-all' }}>{p.email}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Pill label ──────────────────────────────────────────────────────────── */
function PillLabel({ icon, text, bg, color, border }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: bg, border: `1.5px solid ${border}`,
      borderRadius: '50px', padding: '0.4rem 1.2rem',
      fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
      fontSize: '0.92rem', color,
      boxShadow: '0 3px 12px rgba(0,0,0,0.06)',
    }}>
      <span style={{ fontSize: '1.1rem' }}>{icon}</span> {text}
    </div>
  )
}

/* ── Researcher Modal ────────────────────────────────────────────────────── */
function ResearcherModal({ p, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'modalFade 0.22s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg,#f8fdf5 0%,#fffef8 100%)',
          borderRadius: '20px',
          padding: '1.5rem',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          border: '1.5px solid rgba(93,187,99,0.15)',
          animation: 'modalScale 0.3s cubic-bezier(0.34,1.46,0.64,1) both',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'white', border: 'none',
            width: '36px', height: '36px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1.4rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 10, color: '#4A5E4B',
          }}
        >
          ✕
        </button>
        
        <h3 style={{
          fontFamily: "'Fredoka',sans-serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
          color: '#1a3a1e', textAlign: 'center', marginBottom: '1.2rem',
          paddingRight: '30px', paddingLeft: '30px',
        }}>
          {p.name} — Research Component
        </h3>

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src={p.componentImg} 
            alt={p.name} 
            style={{ 
              maxWidth: '100%', maxHeight: 'calc(90vh - 100px)', 
              objectFit: 'contain', borderRadius: '12px' 
            }} 
          />
        </div>
      </div>
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const secRef = useRef(null)
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    const els = secRef.current?.querySelectorAll('.about-animate')
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
      el.style.transform = 'translateY(26px)'
      el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={secRef}
      style={{
        background: 'linear-gradient(180deg,#f4f9f0 0%,#faf8f0 100%)',
        padding: 'clamp(4rem,7vw,6rem) 0 clamp(3rem,5vw,5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative: Sparkle — top-left ── */}
      <img src={sparkle} alt="" style={{
        position: 'absolute', left: 'clamp(16px,2.5vw,36px)', top: '3%',
        width: 'clamp(48px,6vw,78px)', zIndex: 0,
        opacity: 0.75, pointerEvents: 'none',
        animation: 'floatY 4.5s ease-in-out infinite',
      }} />

      {/* ── Decorative: Treasure Chest — right-middle ── */}
      <img src={treasureChest} alt="" style={{
        position: 'absolute', right: '0', top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(80px,10vw,130px)', zIndex: 0,
        opacity: 0.82, pointerEvents: 'none',
        animation: 'floatY 6s ease-in-out 1s infinite',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── CENTERED HEADER ── */}
        <div className="about-animate" style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <h2 style={{
            fontFamily: "'Fredoka',sans-serif",
            fontSize: 'clamp(2.4rem,4.5vw,3.6rem)',
            fontWeight: 700, color: '#1a3a1e',
            lineHeight: 1.1, marginBottom: '0.35rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          }}>
            About us <span style={{ fontSize: '1.8rem' }}>🌸</span>
          </h2>

          {/* Wavy underline */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg width="120" height="11" viewBox="0 0 120 11" fill="none">
              <path d="M2 7 C22 2,44 11,66 5 C88 0,106 9,118 4"
                stroke="#F4A137" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <p style={{
            fontSize: '0.96rem', color: '#4A5E4B',
            lineHeight: 1.72, fontWeight: 500,
            maxWidth: '560px', margin: '0 auto',
          }}>
            Meet the passionate minds behind this project.<br />
            We are a team of innovators, learners, and problem solvers working together
            to create a meaningful impact.
          </p>
        </div>

        {/* ── MAIN RESEARCH TEAM ── */}
        <div className="about-animate" style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
          <PillLabel
            icon="👥" text="Main Research Team"
            bg="#e8f5e9" border="rgba(93,187,99,0.30)" color="#1a6b24"
          />
        </div>

        <div className="about-researcher-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '1.1rem',
          marginBottom: '2.4rem',
        }}>
          {RESEARCHERS.map((p, i) => <ResearcherCard key={i} p={p} onClick={setActiveModal} />)}
        </div>

        {/* ── SUPERVISORS ── */}
        <div className="about-animate" style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
          <PillLabel
            icon="🎓" text="Supervisors"
            bg="#fef3c7" border="rgba(244,161,55,0.30)" color="#92400e"
          />
        </div>

        <div className="about-supervisor-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1.1rem',
          marginBottom: '2rem',
        }}>
          {SUPERVISORS.map((p, i) => <SupervisorCard key={i} p={p} />)}
        </div>

        {/* ── BOTTOM QUOTE STRIP ── */}
        <div className="about-animate" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
            background: 'linear-gradient(135deg,#e8f5e9 0%,#fefce8 100%)',
            borderRadius: '50px',
            padding: '0.8rem 2rem',
            boxShadow: '0 4px 18px rgba(93,187,99,0.14)',
            border: '1.5px solid rgba(93,187,99,0.22)',
          }}>
            <span style={{ fontSize: '1.2rem' }}>🌿</span>
            <span style={{
              fontFamily: "'Fredoka',sans-serif",
              fontWeight: 700, fontSize: '1.05rem', color: '#1a6b24',
            }}>
              Together, we learn, we create, and we grow.
            </span>
            <span style={{ fontSize: '1.2rem' }}>🌸</span>
          </div>
        </div>

      </div>

      {activeModal && <ResearcherModal p={activeModal} onClose={() => setActiveModal(null)} />}

      {/* ── Responsive ── */}
      <style>{`
        @keyframes modalFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media(max-width:960px){
          .about-researcher-grid { grid-template-columns: repeat(2,1fr)!important }
        }
        @media(max-width:760px){
          .about-supervisor-grid{grid-template-columns:1fr!important}
          .about-researcher-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:520px){
          .about-researcher-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
