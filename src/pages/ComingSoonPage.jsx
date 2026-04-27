// ComingSoonPage.jsx — Standalone Coming Soon page for The Word Garden
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import comingSoon from '../assets/ComingSoon.png'
import logo from '../assets/Logo.png'

export default function ComingSoonPage() {
  const navigate = useNavigate()

  // Update page title
  useEffect(() => {
    document.title = 'Coming Soon — The Word Garden'
    return () => { document.title = 'The Word Garden' }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg,#f4f9f0 0%,#faf8f0 50%,#f0f9ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Nunito', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Soft background blobs ── */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-80px',
        width: '340px', height: '340px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(93,187,99,0.10) 0%,transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', right: '-60px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(244,161,55,0.08) 0%,transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Top bar: Logo + Back button ── */}
      <div style={{
        width: '100%', maxWidth: '1200px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(1.2rem,3vw,2rem) clamp(1rem,4vw,2.5rem)',
        position: 'relative', zIndex: 1,
        boxSizing: 'border-box',
      }}>
        {/* Logo */}
        <img
          src={logo}
          alt="The Word Garden"
          style={{ height: '44px', width: 'auto', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.5rem 1.2rem',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(93,187,99,0.30)',
            color: '#1a6b24',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700, fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 3px 12px rgba(93,187,99,0.14)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(93,187,99,0.22)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 3px 12px rgba(93,187,99,0.14)'
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* ── Hero image ── */}
      <main style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem,2vw,1.5rem) clamp(1rem,4vw,2.5rem) clamp(2rem,4vw,3rem)',
        position: 'relative', zIndex: 1,
        boxSizing: 'border-box',
      }}>
        <img
          src={comingSoon}
          alt="Coming Soon — The Word Garden"
          style={{
            width: '100%',
            maxWidth: '1100px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            borderRadius: '24px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.09)',
            animation: 'csFadeIn 0.8s ease both',
          }}
        />

        {/* ── Tagline ── */}
        <p style={{
          marginTop: 'clamp(1.2rem,2.5vw,2rem)',
          fontSize: 'clamp(0.88rem,1.5vw,1.05rem)',
          color: '#7A8E7B',
          fontWeight: 600,
          textAlign: 'center',
          letterSpacing: '0.015em',
          animation: 'csFadeIn 1s ease 0.3s both',
        }}>
          🌱 Something magical is growing… stay tuned!
        </p>

        {/* ── Back to home CTA ── */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: 'clamp(1rem,2vw,1.5rem)',
            padding: '0.75rem 2rem',
            borderRadius: '50px',
            background: 'linear-gradient(135deg,#1a5e20,#2d8a35)',
            color: 'white',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700, fontSize: '1rem',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(26,94,32,0.28)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            animation: 'csFadeIn 1s ease 0.5s both',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 8px 26px rgba(26,94,32,0.38)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(26,94,32,0.28)'
          }}
        >
          🏡 Return to Word Garden
        </button>
      </main>

      {/* Keyframes */}
      <style>{`
        @keyframes csFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  )
}
