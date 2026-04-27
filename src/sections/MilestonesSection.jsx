// MilestonesSection.jsx — Journey Map style for The Word Garden
import { useEffect, useRef, useState } from 'react'
import smilingstar from '../assets/Smiling_Star.png'
import pinkFlower from '../assets/Pink_Flower.png'

/* ── Milestone data (strict order per brief) ────────────────────────────── */
const MILESTONES = [
  {
    num: 1, icon: '📋',
    title: 'Proposal Presentation',
    date: '9 September 2025',
    desc: 'Presented the project proposal and outlined objectives, scope, and research direction to the evaluation panel.',
    status: 'Completed',
    color: '#86efac', colorDark: '#22c55e', bg: '#f0fdf4',
  },
  {
    num: 2, icon: '📄',
    title: 'Proposal Report',
    date: '19 September 2025',
    desc: 'Submitted the detailed written proposal report for review, including literature survey and methodology.',
    status: 'Completed',
    color: '#fde68a', colorDark: '#f59e0b', bg: '#fffbeb',
  },
  {
    num: 3, icon: '📊',
    title: 'Progress Presentation‑1',
    date: '6 January 2026',
    desc: 'Presented initial progress at 50% completion, demonstrating core features and early results.',
    status: 'Completed',
    color: '#fda4af', colorDark: '#f43f5e', bg: '#fff1f2',
  },
  {
    num: 4, icon: '✅',
    title: 'Check List 1',
    date: '11 January 2026',
    desc: 'Completed and submitted all required checklist items as per project submission guidelines for Phase 1.',
    status: 'Completed',
    color: '#6ee7b7', colorDark: '#10b981', bg: '#f0fdf9',
  },
  {
    num: 5, icon: '🚀',
    title: 'Progress Presentation‑2',
    date: '9 March 2026',
    desc: 'Showcased 90% project completion with nearly all features implemented, tested, and demonstrated.',
    status: 'Completed',
    color: '#c4b5fd', colorDark: '#8b5cf6', bg: '#f5f3ff',
  },
  {
    num: 6, icon: '📰',
    title: 'Research Paper',
    date: '17 January 2026',
    desc: 'Prepared and submitted the research paper documenting findings, methodology, and outcomes for academic review.',
    status: 'Completed',
    color: '#7dd3fc', colorDark: '#2563eb', bg: '#eff6ff',
  },
  {
    num: 7, icon: '📝',
    title: 'Check List 2',
    date: '16 March 2026',
    desc: 'Completed and submitted all required checklist items as per project submission guidelines for Phase 2.',
    status: 'Completed',
    color: '#86efac', colorDark: '#16a34a', bg: '#f0fdf4',
  },
  {
    num: 8, icon: '🌐',
    title: 'Project Website',
    date: '26 April 2026',
    desc: 'Launched the official project showcase website presenting all research, features, team details, and documents.',
    status: 'Completed',
    color: '#5eead4', colorDark: '#14b8a6', bg: '#f0fdfa',
  },
  {
    num: 9, icon: '🎤',
    title: 'Final Presentation & Viva',
    date: '28 April 2026',
    desc: 'Presenting the complete project to the evaluation panel, showcasing all features, research outcomes, and live Q&A.',
    status: 'In Progress',
    color: '#fde68a', colorDark: '#f59e0b', bg: '#fffbeb',
  },
  {
    num: 10, icon: '📓',
    title: 'Final Reports',
    date: '13 May 2026',
    desc: 'Preparing and submitting individual and group final reports with all findings, analysis, and conclusions.',
    status: 'In Progress',
    color: '#fda4af', colorDark: '#fb7185', bg: '#fff1f2',
  },
  {
    num: 11, icon: '📒',
    title: 'Research Log Book',
    date: '6 May 2026',
    desc: 'Maintaining and submitting the logbook with regular progress updates, meeting notes, and activity records.',
    status: 'In Progress',
    color: '#c4b5fd', colorDark: '#7c3aed', bg: '#f5f3ff',
  },
]

/* ── Status badge colours ───────────────────────────────────────────────── */
const STATUS_STYLE = {
  Completed:    { bg: '#dcfce7', color: '#15803d', label: '✓ Completed' },
  'In Progress': { bg: '#fef3c7', color: '#b45309', label: '⏳ In Progress' },
  Pending:      { bg: '#f1f5f9', color: '#64748b', label: '○ Pending' },
}

/* ── SVG layout — 11 nodes, snake path ─────────────────────────────────── */
// Larger viewBox for better readability
const VIEWBOX_W = 900
const VIEWBOX_H = 380

// 11 node positions: snake pattern across 5 cols × 3 rows
// Row 1 (top): nodes 1–5 left→right   y≈70
// Row 2 (mid): node 6 far-right        y≈190
// Row 3 (bot): nodes 7–11 right→left  y≈310
const NODE_POS = [
  { x:  75, y:  70 }, // 1
  { x: 225, y:  70 }, // 2
  { x: 375, y:  70 }, // 3
  { x: 525, y:  70 }, // 4
  { x: 675, y:  70 }, // 5
  { x: 825, y: 190 }, // 6  — far right, bridge row
  { x: 675, y: 310 }, // 7
  { x: 525, y: 310 }, // 8
  { x: 375, y: 310 }, // 9
  { x: 225, y: 310 }, // 10
  { x:  75, y: 310 }, // 11
]

function buildPathD(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    // Smooth cubic bezier — control points at midpoint x, original y
    const cx1 = p0.x + (p1.x - p0.x) * 0.55
    const cy1 = p0.y
    const cx2 = p0.x + (p1.x - p0.x) * 0.45
    const cy2 = p1.y
    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`
  }
  return d
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function MilestonesSection() {
  const secRef = useRef(null)
  const [selected, setSelected] = useState(0)
  const [animKey, setAnimKey]   = useState(0)

  const ms = MILESTONES[selected]

  function selectNode(idx) {
    if (idx === selected) return
    setSelected(idx)
    setAnimKey(k => k + 1)
  }
  function goPrev() { if (selected > 0) selectNode(selected - 1) }
  function goNext() { if (selected < MILESTONES.length - 1) selectNode(selected + 1) }

  /* Scroll reveal */
  useEffect(() => {
    const els = secRef.current?.querySelectorAll('.ms2-reveal')
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
      el.style.transform = 'translateY(28px)'
      el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const pathD       = buildPathD(NODE_POS)
  const statusStyle = STATUS_STYLE[ms.status] || STATUS_STYLE.Pending

  return (
    <section
      id="milestones"
      ref={secRef}
      style={{
        background: 'linear-gradient(180deg,#faf8f0 0%,#f4f9f0 100%)',
        padding: 'clamp(4rem,7vw,6rem) 0 clamp(3rem,5vw,5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative: Smiling Star — top-left ── */}
      <img src={smilingstar} alt="" style={{
        position: 'absolute', left: 'clamp(10px,2vw,28px)', top: '4%',
        width: 'clamp(64px,8vw,105px)', zIndex: 0,
        opacity: 0.82, pointerEvents: 'none',
        animation: 'floatY 5s ease-in-out infinite',
      }} />

      {/* ── Decorative: Pink Flower — bottom-right ── */}
      <img src={pinkFlower} alt="" style={{
        position: 'absolute', right: 'clamp(6px,1.5vw,20px)', bottom: '2%',
        width: 'clamp(60px,8vw,100px)', zIndex: 0,
        opacity: 0.75, pointerEvents: 'none',
        animation: 'floatY 6s ease-in-out 1.2s infinite',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <div className="ms2-reveal" style={{ marginBottom: '2.4rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            background: '#e8f5e9', borderRadius: '50px',
            padding: '0.28rem 0.9rem', marginBottom: '0.85rem',
            fontSize: '0.76rem', fontWeight: 700, color: '#3A9A41',
          }}>
            🌱 You are here: <span style={{ color: '#2C7A30', fontWeight: 800 }}>Milestones</span>
          </div>

          <h2 style={{
            fontFamily: "'Fredoka',sans-serif",
            fontSize: 'clamp(2.2rem,4vw,3.2rem)',
            fontWeight: 700, color: '#1a3a1e',
            lineHeight: 1.1, marginBottom: '0.3rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
          }}>
            Milestones <span style={{ fontSize: '1.8rem' }}>🌸</span>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
            <svg width="150" height="11" viewBox="0 0 150 11" fill="none">
              <path d="M2 7 C28 2,55 11,80 5 C105 0,128 9,148 4"
                stroke="#F4A137" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <p style={{
            fontSize: '0.93rem', color: '#4A5E4B',
            lineHeight: 1.72, fontWeight: 500, maxWidth: '480px', margin: '0 auto',
          }}>
            Click any milestone on the path to explore what we've achieved and what's coming next on our research adventure.
          </p>
        </div>

        {/* ── Main layout: Map + Panel ── */}
        <div className="ms2-main" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2rem',
          alignItems: 'stretch',
        }}>

          {/* ══ LEFT: Journey path map ══ */}
          <div className="ms2-reveal" style={{
            background: 'rgba(255,255,255,0.72)',
            borderRadius: '28px',
            border: '2px dashed rgba(93,187,99,0.28)',
            padding: 'clamp(1.4rem,2.8vw,2.2rem)',
            boxShadow: '0 8px 36px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>

            {/* SVG Path + Nodes */}
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <svg
                viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                style={{
                  width: '100%',
                  minWidth: '400px',
                  height: 'auto',
                  display: 'block',
                  minHeight: '320px',
                }}
              >
                {/* Dashed path trail — thicker for visibility */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#5DBB63"
                  strokeWidth="6.5"
                  strokeDasharray="14 9"
                  strokeLinecap="round"
                  opacity="0.52"
                />

                {/* Ambient emoji decorations */}
                <text x="300" y="165" fontSize="18" opacity="0.38" textAnchor="middle">🌸</text>
                <text x="600" y="165" fontSize="16" opacity="0.32" textAnchor="middle">☁️</text>
                <text x="150" y="200" fontSize="15" opacity="0.30" textAnchor="middle">🌿</text>
                <text x="750" y="290" fontSize="14" opacity="0.28" textAnchor="middle">🌼</text>

                {/* Milestone nodes */}
                {MILESTONES.map((m, i) => {
                  const pos      = NODE_POS[i]
                  const isActive = i === selected
                  const isDone   = m.status === 'Completed'
                  const isIP     = m.status === 'In Progress'

                  // Node colour based on status
                  const nodeFill = isDone ? m.color : isIP ? '#fde68a' : '#e2e8f0'
                  const nodeActive = isDone ? m.colorDark : isIP ? '#f59e0b' : '#94a3b8'

                  return (
                    <g
                      key={m.num}
                      style={{ cursor: 'pointer' }}
                      onClick={() => selectNode(i)}
                    >
                      {/* Outer glow ring when active */}
                      {isActive && (
                        <circle
                          cx={pos.x} cy={pos.y} r="34"
                          fill={nodeFill}
                          opacity="0.32"
                          style={{ animation: 'ms2Pulse 1.8s ease-in-out infinite' }}
                        />
                      )}

                      {/* Main circle — larger r=25 */}
                      <circle
                        cx={pos.x} cy={pos.y} r="25"
                        fill={isActive ? nodeActive : nodeFill}
                        stroke="white"
                        strokeWidth={isActive ? 4 : 2.5}
                        style={{
                          filter: isActive
                            ? `drop-shadow(0 5px 12px ${nodeActive}99)`
                            : 'drop-shadow(0 2px 6px rgba(0,0,0,0.11))',
                          transition: 'all 0.3s ease',
                        }}
                      />

                      {/* Icon — bigger */}
                      <text
                        x={pos.x} y={pos.y + 6}
                        textAnchor="middle"
                        fontSize="16"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >{m.icon}</text>

                      {/* Number badge */}
                      <circle
                        cx={pos.x + 18} cy={pos.y - 18} r="11"
                        fill={isDone ? '#22c55e' : isIP ? '#f59e0b' : '#94a3b8'}
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={pos.x + 18} y={pos.y - 14}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fill="white"
                        fontFamily="Fredoka, sans-serif"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >{String(m.num).padStart(2, '0')}</text>

                      {/* Label below — slightly bigger font */}
                      <text
                        x={pos.x} y={pos.y + 42}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill={isActive ? '#1a3a1e' : '#4A5E4B'}
                        fontFamily="Nunito, sans-serif"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >{m.title.length > 15 ? m.title.slice(0, 14) + '…' : m.title}</text>

                      {/* Date */}
                      <text
                        x={pos.x} y={pos.y + 55}
                        textAnchor="middle"
                        fontSize="7"
                        fill="#7A8E7B"
                        fontFamily="Nunito, sans-serif"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >{m.date.split(' ').slice(1).join(' ')}</text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Legend row */}
            <div style={{
              display: 'flex', gap: '1.2rem', flexWrap: 'wrap',
              justifyContent: 'center', marginTop: '0.9rem',
              paddingTop: '0.8rem', borderTop: '1.5px dashed rgba(93,187,99,0.2)',
            }}>
              {[
                { dot: '#22c55e', label: 'Completed' },
                { dot: '#f59e0b', label: 'In Progress' },
                { dot: '#94a3b8', label: 'Pending' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.dot }} />
                  <span style={{ fontSize: '0.72rem', color: '#4A5E4B', fontWeight: 600 }}>{l.label}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{ width: 20, height: 3, background: 'repeating-linear-gradient(90deg,#86efac 0,#86efac 10px,transparent 10px,transparent 18px)', borderRadius: 2 }} />
                <span style={{ fontSize: '0.72rem', color: '#4A5E4B', fontWeight: 600 }}>Journey Path</span>
              </div>
            </div>
          </div>

          {/* ══ RIGHT: Detail panel ══ */}
          <div className="ms2-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              key={animKey}
              style={{
                background: ms.bg,
                borderRadius: '24px',
                padding: '1.6rem 1.5rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.09)',
                border: `2px solid ${ms.color}88`,
                animation: 'ms2PanelIn 0.38s cubic-bezier(0.34,1.4,0.64,1) both',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
                background: `linear-gradient(90deg,${ms.color},${ms.colorDark})`,
                borderRadius: '24px 24px 0 0',
              }} />

              {/* Milestone counter label */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                background: 'rgba(255,255,255,0.65)', borderRadius: '50px',
                padding: '0.2rem 0.75rem', fontSize: '0.72rem',
                fontWeight: 700, color: '#4A5E4B',
                marginBottom: '1rem', marginTop: '0.3rem',
              }}>
                🗺️ Milestone {ms.num} of {MILESTONES.length}
              </div>

              {/* Icon circle */}
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: `linear-gradient(135deg,${ms.color},${ms.colorDark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.7rem',
                boxShadow: `0 6px 20px ${ms.colorDark}44`,
                marginBottom: '1rem',
              }}>{ms.icon}</div>

              {/* Date */}
              <div style={{
                fontSize: '0.78rem', color: '#7A8E7B',
                fontWeight: 700, letterSpacing: '0.04em',
                marginBottom: '0.25rem', textTransform: 'uppercase',
              }}>{ms.date}</div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Fredoka',sans-serif",
                fontSize: 'clamp(1.25rem,2.2vw,1.6rem)',
                fontWeight: 700, color: '#1a3a1e',
                lineHeight: 1.15, marginBottom: '0.75rem',
              }}>{ms.title}</h3>

              {/* Description */}
              <p style={{
                fontSize: '0.86rem', color: '#4A5E4B',
                lineHeight: 1.72, fontWeight: 500,
                marginBottom: '1.1rem',
              }}>{ms.desc}</p>

              {/* Status badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                background: statusStyle.bg, color: statusStyle.color,
                borderRadius: '50px', padding: '0.3rem 0.9rem',
                fontSize: '0.78rem', fontWeight: 800,
                marginBottom: '1.4rem',
              }}>{statusStyle.label}</div>

              {/* Navigation buttons */}
              <div style={{ display: 'flex', gap: '0.7rem' }}>
                <button
                  onClick={goPrev}
                  disabled={selected === 0}
                  style={{
                    flex: 1, padding: '0.7rem 0.5rem',
                    borderRadius: '50px',
                    border: '2px solid rgba(0,0,0,0.10)',
                    background: 'rgba(255,255,255,0.85)',
                    color: selected === 0 ? '#aaa' : '#1a3a1e',
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 700, fontSize: '0.88rem',
                    cursor: selected === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                  }}
                  onMouseEnter={e => { if (selected !== 0) e.currentTarget.style.borderColor = ms.colorDark }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.10)' }}
                >
                  ← Prev
                </button>

                <button
                  onClick={goNext}
                  disabled={selected === MILESTONES.length - 1}
                  style={{
                    flex: 2, padding: '0.7rem 1rem',
                    borderRadius: '50px',
                    border: 'none',
                    background: selected === MILESTONES.length - 1
                      ? '#e0e0e0'
                      : `linear-gradient(135deg,${ms.color},${ms.colorDark})`,
                    color: selected === MILESTONES.length - 1 ? '#aaa' : 'white',
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800, fontSize: '0.88rem',
                    cursor: selected === MILESTONES.length - 1 ? 'not-allowed' : 'pointer',
                    boxShadow: selected === MILESTONES.length - 1 ? 'none' : `0 5px 18px ${ms.colorDark}44`,
                    transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                  }}
                  onMouseEnter={e => { if (selected !== MILESTONES.length - 1) e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                >
                  Next Step →
                </button>
              </div>

              {/* Progress dots */}
              <div style={{
                display: 'flex', gap: '5px', justifyContent: 'center',
                marginTop: '1.2rem', flexWrap: 'wrap',
              }}>
                {MILESTONES.map((m2, i) => (
                  <button
                    key={i}
                    onClick={() => selectNode(i)}
                    title={m2.title}
                    style={{
                      width: i === selected ? '20px' : '8px',
                      height: '8px',
                      borderRadius: '50px',
                      border: 'none',
                      background: i === selected
                        ? ms.colorDark
                        : m2.status === 'Completed'
                          ? '#86efac'
                          : m2.status === 'In Progress'
                            ? '#fde68a'
                            : 'rgba(0,0,0,0.13)',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.28s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframes + responsive ── */}
      <style>{`
        @keyframes ms2PanelIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ms2Pulse {
          0%,100% { opacity: 0.32; }
          50%      { opacity: 0.16; }
        }
        @media (max-width: 900px) {
          .ms2-main { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .ms2-main { gap: 1.2rem !important; }
        }
      `}</style>
    </section>
  )
}
