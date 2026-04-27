// Hero Section v5 — rebuilt navbar: frosted pill on sky, Logo.png, white links, gold CTA
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import heroVideo from '../assets/hero_video.mp4'
import img1 from '../assets/1.png'
import logo from '../assets/Logo.png'
import flowerPink from '../assets/Pink_Flower.png'
import sparkle from '../assets/Sparkle.png'
import plant from '../assets/Plant.png'

/* ─── Floating particle (purely CSS, no libraries) ─────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 3 + Math.floor(((i * 37 + 11) % 7)),           // 3–9px
  left: `${5 + (i * 53 % 88)}%`,
  delay: `${(i * 0.4) % 6}s`,
  duration: `${7 + (i * 31 % 8)}s`,
  opacity: 0.18 + (i % 5) * 0.07,
  color: ['#5DBB63', '#F4A137', '#F47AB0', '#5BA4CF', '#FFD44F'][i % 5],
}))

/* ─── Nav links ─────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Domain', href: '#domain' },
  { label: 'Milestones', href: '#milestones' },
  { label: 'Documents', href: '#documents' },
  { label: 'Presentations', href: '#presentations' },
  { label: 'About us', href: '#about' },
  { label: 'Contact us', href: '#contact' },
]
const handleScroll = (id) => {
  const sectionId = id.startsWith('#') ? id.substring(1) : id;
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ─── HERO NAVBAR — fully transparent, sits directly on the image ──────────────
   • position: absolute — inside <section id="hero">
   • Full width — logo left, links center, CTA right
   • NO background, NO border, NO blur, NO shadow on navbar itself
   • Shadow ONLY on the CTA button
   ──────────────────────────────────────────────────────────────── */
function HeroNav() {
  const [hov, setHov] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 50) {
        navRef.current.classList.add('scrolled')
      } else {
        navRef.current.classList.remove('scrolled')
      }
    }
    onScroll() // Initial check
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={navRef} className="navbar">
      <nav
        aria-label="Main navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          /* FULLY TRANSPARENT — no box visible */
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 0,
          padding: '0',
          gap: '0',
        }}
      >
        {/* ── LEFT: Logo.png — no box, no background ── */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); handleScroll('home') }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        >
          <img
            src={logo}
            alt="The Word Garden"
            style={{ height: '52px', width: 'auto', display: 'block' }}
          />
        </a>

        {/* ── CENTRE: Nav links — white, clean, no container ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hnav-links">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              onClick={e => { e.preventDefault(); handleScroll(l.href) }}
              onMouseEnter={() => setHov(l.label)}
              onMouseLeave={() => setHov(null)}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#ffffff',
                opacity: hov === l.label ? 1 : 0.92,
                textDecoration: 'none',
                transform: hov === l.label ? 'translateY(-1px)' : 'none',
                transition: 'opacity 0.15s ease, transform 0.15s ease',
                /* subtle shadow makes white readable on any bg */
                textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* ── RIGHT: CTA — shadow on button only, NOT on navbar ── */}
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); handleScroll('contact') }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 22px',
            borderRadius: '999px',
            /* soft orange-gold gradient */
            background: 'linear-gradient(135deg, #f6c453 0%, #f4a137 100%)',
            color: '#2b2b2b',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'transform 0.18s ease',
            boxShadow: '0 3px 10px rgba(246,196,83,0.45)',
          }}
        >
          Begin Adventure
        </a>
      </nav>

      {/* Hide links on narrow screens, keep logo + CTA */}
      <style>{`@media(max-width:860px){.hnav-links{display:none!important}}`}</style>
    </div>
  )
}

/* ─── Floating Particles ─────────────────────────────────────────────────────── */
function Particles() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          bottom: '-12px',
          left: p.left,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: '50%',
          background: p.color,
          opacity: p.opacity,
          animation: `particleDrift ${p.duration} ease-in-out ${p.delay} infinite`,
          filter: 'blur(1px)',
        }} />
      ))}
    </div>
  )
}

/* ─── Main Hero ──────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const bgRef = useRef(null)
  const navigate = useNavigate()

  /* Subtle parallax — background moves at 0.3× scroll speed */
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            const y = window.scrollY * 0.28
            bgRef.current.style.transform = `translateY(${y}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="home" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      /* bottom padding to accommodate the wave overlap */
      paddingBottom: '100px',
    }}>

      {/* ── BG VIDEO — full bleed, parallax wrapper, img1 as poster fallback ── */}
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-5% 0',
        zIndex: 0,
        willChange: 'transform',
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={img1}
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            filter: 'brightness(0.88)',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
          {/* Fallback: browsers that can't play video see the poster image */}
        </video>
      </div>

      {/* ── LEFT GRADIENT — Issue 1 fix: VERY subtle, almost invisible ──
           Max 12% opacity — just enough for text contrast, image stays vivid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `linear-gradient(
          to right,
          rgba(0,0,0,0.12)  0%,
          rgba(0,0,0,0.06) 25%,
          rgba(0,0,0,0.00) 55%
        )`,
      }} />

      {/* ── Floating particles ── */}
      <Particles />

      {/* ── Floating PNG decorations ── */}
      <img src={flowerPink} alt="" className="deco float-a" style={{
        bottom: '14%', left: '1.2%', width: 'clamp(44px,5.5vw,78px)', zIndex: 3,
      }} />
      <img src={plant} alt="" className="deco float-c" style={{
        bottom: '1%', right: '1.5%', width: 'clamp(52px,6.5vw,96px)', zIndex: 3,
      }} />
      <img src={sparkle} alt="" className="deco twinkle" style={{
        top: '28%', left: '42%', width: 'clamp(18px,2.5vw,32px)', zIndex: 3, opacity: 0.72,
      }} />
      <img src={sparkle} alt="" className="deco twinkle" style={{
        top: '16%', right: '26%', width: '22px', zIndex: 3, opacity: 0.58, animationDelay: '1.5s',
      }} />
      {[{ e: '🌸', t: '21%', l: '52%', d: '0s' }, { e: '⭐', t: '40%', l: '60%', d: '1.2s' }, { e: '🍃', t: '64%', l: '46%', d: '0.6s' }]
        .map(({ e, t, l, d }, i) => (
          <div key={i} style={{
            position: 'absolute', top: t, left: l,
            fontSize: 'clamp(0.85rem,1.6vw,1.3rem)',
            animation: `floatY ${4 + i * 0.7}s ease-in-out ${d} infinite`,
            opacity: 0.48, zIndex: 3, pointerEvents: 'none', userSelect: 'none',
          }}>{e}</div>
        ))}

      {/* ── Embedded navbar ── */}
      <HeroNav />

      {/* ── TEXT CONTENT ── */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '90px' }}>
        <div style={{ maxWidth: 'clamp(300px,42%,520px)', position: 'relative' }}>

          {/* Soft atmospheric mist behind text for readability */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            right: '-20%',
            bottom: '-10%',
            background: 'radial-gradient(circle at 30% center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.02) 60%, transparent 100%)',
            zIndex: -1,
            pointerEvents: 'none',
            borderRadius: '50%',
          }} />

          {/* Big 3-line heading */}
          <h1 className="reveal reveal-delay-1 heading-xl" style={{
            marginBottom: '1rem',
            textShadow: '0 2px 12px rgba(255,255,255,0.4)',
          }}>
            A World<br />
            Where{' '}<span className="text-green">Words</span><br />
            <span className="text-orange" style={{
              filter: 'drop-shadow(0 3px 10px rgba(244,161,55,0.3))',
            }}>Grow Confidence</span>
          </h1>

          {/* Description */}
          <p className="reveal reveal-delay-2" style={{
            fontSize: 'clamp(0.88rem,1.7vw,1.02rem)',
            color: '#1a2e1b',
            lineHeight: 1.78,
            maxWidth: '400px', marginBottom: '1.75rem', fontWeight: 600,
            textShadow: '0 1px 8px rgba(255,255,255,0.5)',
          }}>
            A cooperative literacy adventure game designed for children
            with dyslexia to learn, play, and grow together in a safe,
            joyful world.
          </p>

          {/* Buttons */}
          <div className="reveal reveal-delay-3" style={{
            display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.6rem',
          }}>
            <button className="btn-primary"
              onClick={() => navigate('/coming-soon')}
              style={{ padding: '0.9rem 1.85rem', fontSize: '0.97rem' }}>
              Explore the World 🌿
            </button>
            <a
              href="https://drive.google.com/file/d/1jK3jQTw9f9XMjnim9InuTIWAkMBD-fG_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#F4A137,#e08920)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '0.6rem', flexShrink: 0,
              }}>▶</span>
              Watch Trailer
            </a>
          </div>

        </div>
      </div>

      {/* ── ORGANIC WAVE BOTTOM ── */}
      {/* Single asymmetric bezier — natural, not repetitive */}
      <div style={{
        position: 'absolute', bottom: -2, left: 0, right: 0, zIndex: 5,
        lineHeight: 0, pointerEvents: 'none',
      }}>
        {/* Subtle shadow strip above the wave for depth */}
        <div style={{
          position: 'absolute', bottom: '65%', left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.055), transparent)',
          zIndex: 0,
        }} />
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 'clamp(65px,11vw,120px)', position: 'relative', zIndex: 1 }}>
          {/* Single smooth organic curve — asymmetric, not sine-wave */}
          <path
            d="M0,72 C200,20 400,100 680,52 C880,16 1100,88 1440,38 L1440,120 L0,120 Z"
            fill="var(--cream)"
          />
        </svg>
      </div>

    </section>
  )
}
