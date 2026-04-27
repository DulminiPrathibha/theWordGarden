// PresentationsSection.jsx — Presentations section for The Word Garden
import { useEffect, useRef } from 'react'

// Main illustration
import mainScene  from '../assets/Main_Character_Presentation_Scene.png'

// Presentation list icons
import iconYellow from '../assets/Proposal_Presentation_Yellow_Icon.png'
import iconGreen  from '../assets/Progress_Presentation_Green_Icon.png'
import iconPurple from '../assets/Progress_Presentation_Purple_Color.png'
import iconBlue   from '../assets/Final_Presentation_Blue_Icon.png'

// Decorations — P1 left, P2 right
import p1img from '../assets/P1.png'
import p2img from '../assets/P2.png'

// Tip strip
import tipImg from '../assets/Tip_Section.png'

/* ── Presentation card data ──────────────────────────────────────────────── */
const PRESENTATIONS = [
  {
    icon: iconYellow,
    label: 'Proposal Presentation',
    bg: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    shadow: 'rgba(251,191,36,0.35)',
    file: '/presentations/25-26J-421_Proposal_Presentation.pptx',
    pending: false,
  },
  {
    icon: iconGreen,
    label: 'Progress Presentation‑1',
    bg: 'linear-gradient(135deg,#dcfce7,#86efac)',
    shadow: 'rgba(74,222,128,0.35)',
    file: '/presentations/25-26J-421_PP1_Presentation.pptx',
    pending: false,
  },
  {
    icon: iconPurple,
    label: 'Progress Presentation‑2',
    bg: 'linear-gradient(135deg,#ede9fe,#c4b5fd)',
    shadow: 'rgba(167,139,250,0.35)',
    file: '/presentations/25-26J-421_PP2_Presentation.pdf',
    pending: false,
  },
  {
    icon: iconBlue,
    label: 'Final Presentation',
    bg: 'linear-gradient(135deg,#dbeafe,#93c5fd)',
    shadow: 'rgba(147,197,253,0.35)',
    file: null,
    pending: true,
  },
]

/* ── Download helper ─────────────────────────────────────────────────────── */
function triggerDownload(file) {
  if (!file) return
  const a = document.createElement('a')
  a.href = file
  a.download = file.split('/').pop()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/* ── Single presentation row card ───────────────────────────────────────── */
function PresCard({ item }) {
  const isPending = item.pending

  return (
    <div
      className="pres-animate"
      title={isPending ? 'Coming soon' : 'Download Presentation'}
      onClick={() => !isPending && triggerDownload(item.file)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.85rem 0.9rem',
        borderRadius: '14px',
        opacity: isPending ? 0.68 : 1,
        cursor: isPending ? 'not-allowed' : 'pointer',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (isPending) return
        e.currentTarget.style.transform = 'translateX(5px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.82)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {/* Icon square */}
      <div style={{
        width: '52px', height: '52px',
        borderRadius: '14px',
        background: item.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: `0 4px 14px ${item.shadow}`,
      }}>
        <img
          src={item.icon}
          alt={item.label}
          style={{ width: '34px', height: '34px', objectFit: 'contain' }}
        />
      </div>

      {/* Label */}
      <span style={{
        fontFamily: "'Nunito',sans-serif",
        fontWeight: 600, fontSize: '0.97rem',
        color: '#2C3E2D', flex: 1,
      }}>
        {item.label}
      </span>

      {/* Action badge */}
      {isPending ? (
        <span style={{
          fontSize: '0.7rem', fontWeight: 800,
          background: '#f1f5f9', color: '#64748b',
          borderRadius: '50px', padding: '0.22rem 0.65rem',
          flexShrink: 0, letterSpacing: '0.02em',
        }}>Pending</span>
      ) : (
        <span style={{
          fontSize: '0.72rem', fontWeight: 800,
          background: item.bg,
          color: '#1a3a1e',
          borderRadius: '50px', padding: '0.22rem 0.7rem',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          boxShadow: `0 2px 8px ${item.shadow}`,
          whiteSpace: 'nowrap',
        }}>
          ⬇ Download
        </span>
      )}
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function PresentationsSection() {
  const secRef = useRef(null)

  useEffect(() => {
    const els = secRef.current?.querySelectorAll('.pres-animate')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = e.target.dataset.pending === 'true' ? '0.68' : '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' })

    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="presentations"
      ref={secRef}
      style={{
        background: 'linear-gradient(180deg,#faf8f0 0%,#f4f9f0 100%)',
        padding: 'clamp(4rem,7vw,6rem) 0 clamp(3rem,5vw,5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative: P1 — left side ── */}
      <img src={p1img} alt="" style={{
        position: 'absolute', left: '0', top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(80px,10vw,140px)', zIndex: 0,
        opacity: 0.92, pointerEvents: 'none',
      }} />

      {/* ── Decorative: P2 — right side ── */}
      <img src={p2img} alt="" style={{
        position: 'absolute', right: '0', top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(80px,10vw,140px)', zIndex: 0,
        opacity: 0.92, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── MAIN TWO-COLUMN LAYOUT ── */}
        <div className="pres-main-row" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem,4vw,3rem)',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>

          {/* LEFT: Main illustration */}
          <div className="pres-animate" style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
            <img
              src={mainScene}
              alt="Book character presenting beside a board"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 36px rgba(0,0,0,0.12))',
                display: 'block',
                mixBlendMode: 'multiply',
              }}
            />
          </div>

          {/* RIGHT: Content area */}
          <div style={{ paddingRight: 'clamp(0px,5vw,3rem)' }}>

            {/* Breadcrumb pill */}
            <div className="pres-animate" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: '#e8f5e9', borderRadius: '50px',
              padding: '0.28rem 0.9rem', marginBottom: '1rem',
              fontSize: '0.76rem', fontWeight: 700, color: '#3A9A41',
            }}>
              🌿 You are here:{' '}
              <span style={{ color: '#2C7A30', fontWeight: 800 }}>Presentations</span>
            </div>

            {/* Title */}
            <h2 className="pres-animate" style={{
              fontFamily: "'Fredoka',sans-serif",
              fontSize: 'clamp(1.9rem,3.5vw,2.9rem)',
              fontWeight: 700, color: '#1a3a1e',
              lineHeight: 1.15, marginBottom: '0.35rem',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              Presentations (Slides){' '}
              <span style={{ fontSize: '1.6rem' }}>🌸</span>
            </h2>

            {/* Orange wavy underline */}
            <div className="pres-animate" style={{ marginBottom: '1rem' }}>
              <svg width="120" height="11" viewBox="0 0 120 11" fill="none">
                <path d="M2 7 C22 2,44 11,66 5 C88 0,106 9,118 4"
                  stroke="#F4A137" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>

            {/* Description */}
            <p className="pres-animate" style={{
              fontSize: '0.94rem', color: '#4A5E4B',
              lineHeight: 1.72, fontWeight: 500,
              marginBottom: '1.4rem', maxWidth: '380px',
            }}>
              Click any presentation below to instantly download the slides.
            </p>

            {/* ── PRESENTATION LIST ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {PRESENTATIONS.map((item, i) => (
                <div key={i}>
                  <PresCard item={item} />
                  {i < PRESENTATIONS.length - 1 && (
                    <div style={{
                      borderBottom: '1.5px dashed rgba(93,187,99,0.22)',
                      margin: '0 0.6rem',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media(max-width:860px){
          .pres-main-row{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
