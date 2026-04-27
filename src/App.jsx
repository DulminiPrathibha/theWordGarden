import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// Sections (main single-page layout)
import HeroSection          from './sections/HeroSection'
import DomainSection        from './sections/DomainSection'
import MilestonesSection    from './sections/MilestonesSection'
import DocumentsSection     from './sections/DocumentsSection'
import PresentationsSection from './sections/PresentationsSection'
import AboutSection         from './sections/AboutSection'
import ContactSection       from './sections/ContactSection'
import AudioPlayer          from './components/AudioPlayer'

// Pages
import ComingSoonPage from './pages/ComingSoonPage'

/* ── Main single-page layout ─────────────────────────────────────────────── */
function MainLayout() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    )
    const init = () => document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    const t = setTimeout(init, 120)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  return (
    <div style={{ background: 'var(--cream)', fontFamily: "'Nunito', sans-serif" }}>
      <main>
        <HeroSection />
        <DomainSection />
        <MilestonesSection />
        <DocumentsSection />
        <PresentationsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <AudioPlayer />

      {/* ── Site footer ── */}
      <footer style={{
        textAlign: 'center',
        padding: '2.2rem 1.5rem 1.6rem',
        marginTop: '0',
      }}>
        <p style={{
          fontSize: '0.78rem',
          color: 'rgba(166,124,82,0.82)',
          lineHeight: 1.55,
          fontWeight: 400,
          fontFamily: "'Nunito', sans-serif",
          margin: 0,
          animation: 'footerFade 1.2s ease both',
        }}>
          Multi-Device Cooperative Game Architecture for Emotionally Safe Dyslexia Intervention.
          <br />
          © 2026 The Word Garden Research Group, Built for final year research evaluation.
        </p>
        <style>{`
          @keyframes footerFade {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </footer>
    </div>
  )
}

/* ── Root with routes ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <Routes>
      <Route path="/"             element={<MainLayout />} />
      <Route path="/coming-soon"  element={<ComingSoonPage />} />
    </Routes>
  )
}