// DocumentsSection.jsx — Documents section for The Word Garden
import { useEffect, useRef } from 'react'
import branch    from '../assets/Branch.png'
import tipImg    from '../assets/Tip_Section.png'
import docIllust from '../assets/Documentation.png'

// Document card icon images
import iconCharter    from '../assets/Green_Project_Chater_Image.png'
import iconProposal   from '../assets/Yellow_Proposal_Document_Image.png'
import iconChecklist  from '../assets/Pink_Checklist_Document_Image.png'
import iconFinal      from '../assets/Purple_Final_Document_Image.png'
import iconResearch   from '../assets/Blue_Research_paper_Image.png'

/* ── Document cards data ──────────────────────────────────────────────────── */
const DOCS = [
  {
    num: '01',
    icon: iconCharter,
    title: 'Project Charter',
    desc: 'Contains the project overview, objectives, scope and team details.',
    bg: 'linear-gradient(160deg,#f0fdf4 0%,#dcfce7 100%)',
    border: 'rgba(74,222,128,0.30)',
    badge: '#4ade80',
    badgeText: '#14532d',
    btnBg: '#dcfce7',
    btnColor: '#16a34a',
    btnBorder: 'rgba(74,222,128,0.45)',
    eye: '👁',
    link: 'https://drive.google.com/drive/folders/1IHTTgc9CUrEZiua_Akok-rRWH3cZa6xS?usp=sharing',
  },
  {
    num: '02',
    icon: iconProposal,
    title: 'Proposal Document',
    desc: 'Includes the problem statement, proposed solution and methodology.',
    bg: 'linear-gradient(160deg,#fffbeb 0%,#fef9c3 100%)',
    border: 'rgba(251,191,36,0.30)',
    badge: '#fbbf24',
    badgeText: '#78350f',
    btnBg: '#fef3c7',
    btnColor: '#d97706',
    btnBorder: 'rgba(251,191,36,0.45)',
    eye: '👁',
    link: 'https://drive.google.com/drive/folders/1Z3Vr02Z88jj90uQCEUzEde0AVrZLqgh_?usp=sharing',
  },
  {
    num: '03',
    icon: iconChecklist,
    title: 'Check List Documents',
    desc: 'Collection of all checklists used throughout the project.',
    bg: 'linear-gradient(160deg,#fff1f2 0%,#ffe4e6 100%)',
    border: 'rgba(251,113,133,0.28)',
    badge: '#fb7185',
    badgeText: '#881337',
    btnBg: '#ffe4e6',
    btnColor: '#e11d48',
    btnBorder: 'rgba(251,113,133,0.40)',
    eye: '👁',
    link: 'https://drive.google.com/drive/folders/1-F-HN8zXWEzbyixiu0kuzGtG2ORdmSuD?usp=sharing',
  },
  {
    num: '04',
    icon: iconFinal,
    title: 'Final Document',
    desc: 'Final submission documents (4 docs with the main).',
    bg: 'linear-gradient(160deg,#f5f3ff 0%,#ede9fe 100%)',
    border: 'rgba(167,139,250,0.28)',
    badge: '#a78bfa',
    badgeText: '#3b0764',
    btnBg: '#ede9fe',
    btnColor: '#7c3aed',
    btnBorder: 'rgba(167,139,250,0.40)',
    eye: '👁',
    link: 'https://drive.google.com/drive/folders/1qZNU_dcIFaOW3FRYf2Qj9SHNPbp935Iq?usp=sharing',
  },
  {
    num: '05',
    icon: iconResearch,
    title: 'Research Paper',
    desc: 'Prepare and submit the research paper of the project.',
    bg: 'linear-gradient(160deg,#eff6ff 0%,#dbeafe 100%)',
    border: 'rgba(96,165,250,0.30)',
    badge: '#60a5fa',
    badgeText: '#1e3a5f',
    btnBg: '#dbeafe',
    btnColor: '#1d4ed8',
    btnBorder: 'rgba(96,165,250,0.45)',
    eye: '👁',
    link: 'https://drive.google.com/drive/folders/1Px4WdDl0dh0wM6VSBI3z48c-ewpsuphz?usp=sharing',
  },
]

/* ── Single document card ─────────────────────────────────────────────────── */
function DocCard({ doc, style }) {
  return (
    <div
      className="doc-animate"
      style={{
        background: doc.bg,
        borderRadius: '22px',
        border: `1.5px solid ${doc.border}`,
        padding: '1.4rem 1.2rem 1.1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.10)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
      }}
    >
      {/* Number badge — top right */}
      <div style={{
        position: 'absolute', top: '0.9rem', right: '0.9rem',
        width: '30px', height: '30px', borderRadius: '50%',
        background: doc.badge, color: doc.badgeText,
        fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
        fontSize: '0.78rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 3px 10px ${doc.badge}55`,
      }}>{doc.num}</div>

      {/* Icon image */}
      <img
        src={doc.icon}
        alt={doc.title}
        style={{
          width: 'clamp(70px,9vw,95px)',
          height: 'clamp(70px,9vw,95px)',
          objectFit: 'contain',
          marginBottom: '0.85rem',
          filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.13))',
        }}
      />

      {/* Title */}
      <div style={{
        fontFamily: "'Fredoka',sans-serif",
        fontWeight: 700, fontSize: '1.02rem',
        color: '#1a3a1e', marginBottom: '0.45rem',
      }}>{doc.title}</div>

      {/* Description */}
      <p style={{
        fontSize: '0.77rem', color: '#6b7e6c',
        lineHeight: 1.55, fontWeight: 500,
        margin: '0 0 1rem', flex: 1,
      }}>{doc.desc}</p>

      {/* Small plant decoration — bottom corner */}
      <div style={{
        position: 'absolute', bottom: '0.5rem', right: '0.6rem',
        fontSize: '1.1rem', opacity: 0.22, pointerEvents: 'none',
      }}>🌿</div>

      {/* View Document button */}
      <a
        href={doc.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.52rem 1.1rem',
          borderRadius: '50px',
          background: doc.btnBg,
          color: doc.btnColor,
          border: `1.5px solid ${doc.btnBorder}`,
          fontFamily: "'Fredoka',sans-serif",
          fontWeight: 700, fontSize: '0.82rem',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          width: '100%', justifyContent: 'center', boxSizing: 'border-box',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.04)'
          e.currentTarget.style.boxShadow = `0 6px 18px ${doc.badge}33`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <span style={{ fontSize: '0.88rem' }}>{doc.eye}</span>
        View Document
      </a>
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function DocumentsSection() {
  const secRef = useRef(null)

  useEffect(() => {
    const els = secRef.current?.querySelectorAll('.doc-animate')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' })

    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(26px)'
      el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="documents"
      ref={secRef}
      style={{
        background: 'linear-gradient(180deg,#f4f9f0 0%,#faf8f0 100%)',
        padding: 'clamp(4rem,7vw,6rem) 0 clamp(3rem,5vw,5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative: Branch — bottom-left ── */}
      <img src={branch} alt="" style={{
        position: 'absolute', left: '0', bottom: '0',
        width: 'clamp(90px,12vw,155px)', zIndex: 0,
        opacity: 0.88, pointerEvents: 'none',
        transform: 'scale(0.95)',
        transformOrigin: 'bottom left',
      }} />

      {/* ── Decorative: Tip_Section — top-right ── */}
      <img src={tipImg} alt="" style={{
        position: 'absolute', top: '0', right: '0',
        width: 'clamp(70px,9vw,115px)', zIndex: 0,
        opacity: 0.95, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── TOP ROW: Header left + Illustration right ── */}
        <div className="docs-top-row" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2.5rem',
        }}>

          {/* LEFT: Title area */}
          <div className="doc-animate">
            {/* Breadcrumb pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: '#e8f5e9', borderRadius: '50px',
              padding: '0.28rem 0.88rem', marginBottom: '1rem',
              fontSize: '0.76rem', fontWeight: 700, color: '#3A9A41',
            }}>
              🌿 You are here:{' '}
              <span style={{ color: '#2C7A30', fontWeight: 800 }}>Documents</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Fredoka',sans-serif",
              fontSize: 'clamp(2.4rem,4.5vw,3.6rem)',
              fontWeight: 700, color: '#1a3a1e',
              lineHeight: 1.1, marginBottom: '0.35rem',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              Documents <span style={{ fontSize: '1.9rem' }}>🌸</span>
            </h2>

            {/* Orange wavy underline */}
            <div style={{ marginBottom: '1.1rem' }}>
              <svg width="150" height="11" viewBox="0 0 150 11" fill="none">
                <path d="M2 7 C28 2,55 11,80 5 C105 0,130 9,148 4"
                  stroke="#F4A137" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '0.96rem', color: '#4A5E4B',
              lineHeight: 1.75, maxWidth: '400px', fontWeight: 500,
            }}>
              Here you can explore all the key documents we created throughout our project journey.
            </p>
          </div>

          {/* RIGHT: Documentation illustration — bare, no box */}
          <div className="doc-animate" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            marginTop: '12px',
          }}>
            <img
              src={docIllust}
              alt="Documentation"
              style={{
                width: '100%',
                maxWidth: 'clamp(305px, 33vw, 365px)',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.09))',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* ── Section label ── */}
        <div className="doc-animate" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          marginBottom: '1.4rem',
        }}>
          <span style={{ fontSize: '1.2rem' }}>🌿</span>
          <span style={{
            fontFamily: "'Fredoka',sans-serif",
            fontWeight: 700, fontSize: '1.18rem', color: '#1a3a1e',
          }}>Project Documents</span>
        </div>

        {/* ── 5 document cards — 3 top row + 2 centred bottom row ── */}
        <div style={{ marginBottom: '1.8rem' }}>
          {/* Row 1 — first 3 cards */}
          <div className="docs-grid-top" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1.1rem',
            marginBottom: '1.1rem',
          }}>
            {DOCS.slice(0, 3).map((doc, i) => <DocCard key={i} doc={doc} />)}
          </div>
          {/* Row 2 — last 2 cards centred */}
          <div className="docs-grid-bot" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '1.1rem',
            maxWidth: 'calc(66.67% - 0.37rem)',
            margin: '0 auto',
          }}>
            {DOCS.slice(3).map((doc, i) => <DocCard key={i + 3} doc={doc} />)}
          </div>
        </div>

      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media(max-width:1000px){
          .docs-grid-top{grid-template-columns:1fr 1fr!important}
          .docs-grid-bot{grid-template-columns:1fr 1fr!important;max-width:100%!important}
        }
        @media(max-width:860px){
          .docs-top-row{grid-template-columns:1fr!important}
          .docs-grid-top{grid-template-columns:1fr 1fr!important}
          .docs-grid-bot{grid-template-columns:1fr 1fr!important;max-width:100%!important}
        }
        @media(max-width:520px){
          .docs-grid-top{grid-template-columns:1fr!important}
          .docs-grid-bot{grid-template-columns:1fr!important;max-width:100%!important}
        }
      `}</style>
    </section>
  )
}
