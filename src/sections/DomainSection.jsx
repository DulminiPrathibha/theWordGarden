// DomainSection.jsx — "Domain" page section for The Word Garden
import { useEffect, useRef, useState } from 'react'
import cloud from '../assets/Cloud.png'
import lantern from '../assets/Lantern.png'
import tipImg from '../assets/Tip_Section.png'

/* ── 6 domain topic cards ─────────────────────────────────────────────────── */
const CARDS = [
  {
    icon: '📖',
    title: 'Literature Survey',
    desc: 'We explored existing tools and research on dyslexia to understand what works and what’s missing.',
    bg: 'linear-gradient(135deg,#4ade80,#22c55e)',
    modalDesc: 'We reviewed current dyslexia interventions like GraphoGame, Lexia, and Nessy. Most focus heavily on phonics practice but overlook emotional safety and motivation. We also found that many tools are single-user, which can make learning feel isolating. This helped us realize the need for a more engaging, supportive, and social learning experience.',
  },
  {
    icon: '🔍',
    title: 'Research Gap',
    desc: 'We identified key gaps in current solutions that guided our project direction.',
    bg: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
    modalDesc: 'Through our research, we found three major gaps. First, most systems are single-player and lack collaboration. Second, emotional aspects like anxiety and confidence are often ignored. Third, multisensory learning is not fully utilized across devices. These gaps inspired us to design a cooperative and emotionally supportive solution.',
  },
  {
    icon: '❓',
    title: 'Research Problem',
    desc: 'We defined the core challenge our project aims to solve.',
    bg: 'linear-gradient(135deg,#f9a8d4,#ec4899)',
    modalDesc: 'Children with dyslexia often struggle not just with reading, but also with confidence and anxiety. Existing tools focus mainly on skill-building while ignoring emotional well-being. Our challenge was to create a system that supports both literacy development and emotional safety at the same time.',
  },
  {
    icon: '🎯',
    title: 'Research Objectives',
    desc: 'We set clear goals to guide what we wanted to achieve.',
    bg: 'linear-gradient(135deg,#c4b5fd,#8b5cf6)',
    modalDesc: 'Our main goal was to design a cooperative learning experience that improves literacy while reducing anxiety. We aimed to create a safe environment where children can practice without fear, use multisensory techniques, and stay motivated through collaboration instead of competition.',
  },
  {
    icon: '⚙️',
    title: 'Methodology',
    desc: 'We designed and built our solution step by step.',
    bg: 'linear-gradient(135deg,#7dd3fc,#3b82f6)',
    modalDesc: 'We followed a structured approach starting with research and design, then developing a dual-device system using Unreal Engine and Flutter. We tested the system technically and validated it with experts to ensure it aligns with real-world needs before moving to user testing.',
  },
  {
    icon: '🖥️',
    title: 'Technologies Used',
    desc: 'We used modern tools to bring our idea to life.',
    bg: 'linear-gradient(135deg,#5eead4,#14b8a6)',
    modalDesc: 'Our system combines multiple technologies. The PC side uses Unreal Engine for the game environment, while the mobile app is built using Flutter. Firebase handles communication between devices, and voice chat enables collaboration. Together, these technologies create a seamless interactive experience.',
  },
]

/* ── Modal component ──────────────────────────────────────────────────────── */
function CardModal({ card, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    /* Overlay */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'modalOverlayIn 0.22s ease both',
      }}
    >
      {/* Modal box — stop propagation so click inside doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg,#f8fdf5 0%,#fffef8 100%)',
          borderRadius: '24px',
          padding: 'clamp(1.5rem,4vw,2rem)',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07)',
          border: '1.5px solid rgba(93,187,99,0.15)',
          animation: 'modalBoxIn 0.25s cubic-bezier(0.34,1.46,0.64,1) both',
          position: 'relative',
        }}
      >
        {/* Top row: icon + close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          {/* Icon */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: card.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.13)',
          }}>{card.icon}</div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: '34px', height: '34px', borderRadius: '50%',
              border: '1.5px solid rgba(0,0,0,0.10)',
              background: 'rgba(0,0,0,0.04)',
              cursor: 'pointer', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#5a6b5c', transition: 'background 0.18s',
              lineHeight: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.10)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)' }}
            aria-label="Close"
          >✕</button>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Fredoka',sans-serif",
          fontSize: '1.45rem', fontWeight: 700,
          color: '#1a3a1e', marginBottom: '0.75rem',
        }}>{card.title}</h3>

        {/* Expanded description */}
        <p style={{
          fontSize: '0.9rem', color: '#4a5e4b',
          lineHeight: 1.78, fontWeight: 500, margin: 0,
        }}>{card.modalDesc}</p>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes modalOverlayIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes modalBoxIn {
          from { opacity: 0; transform: scale(0.94) }
          to   { opacity: 1; transform: scale(1) }
        }
      `}</style>
    </div>
  )
}

/* ── Card component ───────────────────────────────────────────────────────── */
function DomainCard({ card, onClick }) {
  return (
    <div
      className="d-card reveal"
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '1rem 1rem 1rem 0.95rem',
        boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
        border: '1.5px solid rgba(0,0,0,0.04)',
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.11)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.07)'
      }}
    >
      {/* Coloured icon square */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: card.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', flexShrink: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.14)',
      }}>
        {card.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
          fontSize: '0.97rem', color: '#1a3a1e', marginBottom: '0.2rem',
        }}>{card.title}</div>
        <div style={{
          fontSize: '0.75rem', color: '#7A8E7B',
          lineHeight: 1.5, fontWeight: 500,
        }}>{card.desc}</div>
      </div>

      {/* Arrow circle */}
      <div
        className="d-arrow"
        style={{
          width: '28px', height: '28px', borderRadius: '50%',
          border: '2px solid #5DBB63', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#5DBB63', fontSize: '1rem', flexShrink: 0,
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#5DBB63'
          e.currentTarget.style.color = 'white'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#5DBB63'
        }}
      >›</div>
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function DomainSection() {
  const secRef = useRef(null)
  const [activeCard, setActiveCard] = useState(null)

  useEffect(() => {
    const els = secRef.current?.querySelectorAll('.d-animate')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="domain"
      ref={secRef}
      style={{
        background: 'linear-gradient(180deg,#f4f9f0 0%,#faf8f0 100%)',
        padding: 'clamp(4rem,7vw,6rem) 0 clamp(3rem,5vw,5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Cloud — top-left decoration ── */}
      <img src={cloud} alt="" style={{
        position: 'absolute', left: '-20px', top: '2%',
        width: 'clamp(110px,14vw,190px)', zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* ── Lantern — bottom-right decoration ── */}
      <img src={lantern} alt="" style={{
        position: 'absolute', right: '2%', bottom: '4%',
        width: 'clamp(70px,9vw,120px)', zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── TOP ROW: Header + Our Goal ── */}
        <div className="d-top-row" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2.2rem',
        }}>

          {/* LEFT — title area */}
          <div className="d-animate">
            {/* Breadcrumb */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: '#e8f5e9', borderRadius: '50px',
              padding: '0.28rem 0.88rem', marginBottom: '1rem',
              fontSize: '0.76rem', fontWeight: 700, color: '#3A9A41',
            }}>
              🌿 You are here:{' '}
              <span style={{ color: '#2C7A30', fontWeight: 800 }}>Domain</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Fredoka',sans-serif",
              fontSize: 'clamp(2.4rem,4.5vw,3.6rem)',
              fontWeight: 700, color: '#1a3a1e',
              lineHeight: 1.1, marginBottom: '0.35rem',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              Domain <span style={{ fontSize: '1.9rem' }}>🌸</span>
            </h2>

            {/* Wavy orange underline */}
            <div style={{ marginBottom: '1.1rem' }}>
              <svg width="118" height="11" viewBox="0 0 118 11" fill="none">
                <path d="M2 7 C20 2,40 11,60 5 C80 0,100 9,116 4"
                  stroke="#F4A137" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '0.96rem', color: '#4A5E4B',
              lineHeight: 1.75, maxWidth: '380px', fontWeight: 500,
            }}>
              Our project thinking covers what we explored, what we discovered, and how it shaped our solution.
            </p>
          </div>

          {/* RIGHT — Our Goal card */}
          <div className="d-animate" style={{
            background: 'linear-gradient(135deg,#f0fdf4 0%,#fefce8 100%)',
            borderRadius: '24px',
            padding: '1.5rem 1.6rem',
            boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
            border: '1.5px solid rgba(93,187,99,0.18)',
            display: 'flex', alignItems: 'center', gap: '1.1rem',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Target icon */}
            <div style={{
              width: '54px', height: '54px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#fee2e2,#fecaca)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.75rem', flexShrink: 0,
              boxShadow: '0 4px 14px rgba(239,68,68,0.18)',
            }}>🎯</div>

            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: "'Fredoka',sans-serif",
                fontSize: '1.18rem', fontWeight: 700,
                color: '#1a3a1e', marginBottom: '0.4rem',
              }}>Our Goal</h3>
              <p style={{
                fontSize: '0.83rem', color: '#5a7a5b',
                lineHeight: 1.65, margin: 0, fontWeight: 500,
              }}>
                Through a strong understanding of the domain, we aim to build a
                meaningful solution that creates real impact and supports every learner.
              </p>
            </div>

            {/* Tip_Section.png — bottom-right, inside card */}
            <img
              src={tipImg}
              alt=""
              style={{
                position: 'absolute',
                right: '16px',
                bottom: '12px',
                width: '90px',
                height: 'auto',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          </div>
        </div>

        {/* ── 6 CARDS GRID ── */}
        <div className="d-cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1.05rem',
          marginBottom: '1.6rem',
        }}>
          {CARDS.map((card, i) => (
            <div key={i} className="d-animate">
              <DomainCard card={card} onClick={() => setActiveCard(card)} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      {activeCard && (
        <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
      )}

      {/* ── Responsive ── */}
      <style>{`
        @media(max-width:900px){
          .d-top-row{grid-template-columns:1fr!important}
          .d-cards-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:560px){
          .d-cards-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
