// AudioPlayer.jsx — Global background audio with toggle for The Word Garden
import { useEffect, useRef, useState } from 'react'
import bgAudio from '../assets/audio/Audio.mp3'

const TARGET_VOL = 0.25   // final background volume
const FADE_STEP  = 0.02   // volume step per interval tick
const FADE_MS    = 80     // ms between ticks → ~1s fade-in

export default function AudioPlayer() {
  const audioRef  = useRef(null)
  const fadeTimer = useRef(null)

  // Read persisted preference (default = true → will play after first click)
  const [isPlaying, setIsPlaying] = useState(
    () => localStorage.getItem('audioEnabled') !== 'false'
  )
  const [hasInteracted, setHasInteracted] = useState(false)

  /* ── Fade-in helper ─────────────────────────────────────────────────────── */
  function fadeIn(audio) {
    clearInterval(fadeTimer.current)
    audio.volume = 0
    audio.play().catch(() => {})
    let vol = 0
    fadeTimer.current = setInterval(() => {
      vol = Math.min(vol + FADE_STEP, TARGET_VOL)
      audio.volume = vol
      if (vol >= TARGET_VOL) clearInterval(fadeTimer.current)
    }, FADE_MS)
  }

  /* ── Start on first user interaction ───────────────────────────────────── */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0

    // Restore preference: if user had turned it off, don't auto-play
    const enabled = localStorage.getItem('audioEnabled') !== 'false'

    const handleFirstInteraction = () => {
      setHasInteracted(true)
      if (enabled) fadeIn(audio)
      document.removeEventListener('click',     handleFirstInteraction)
      document.removeEventListener('keydown',   handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    document.addEventListener('click',      handleFirstInteraction)
    document.addEventListener('keydown',    handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click',      handleFirstInteraction)
      document.removeEventListener('keydown',    handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      clearInterval(fadeTimer.current)
    }
  }, [])

  /* ── Toggle play / pause ────────────────────────────────────────────────── */
  function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      fadeIn(audio)
      setIsPlaying(true)
      localStorage.setItem('audioEnabled', 'true')
    } else {
      clearInterval(fadeTimer.current)
      audio.pause()
      setIsPlaying(false)
      localStorage.setItem('audioEnabled', 'false')
    }
  }

  /* ── Button hover state ─────────────────────────────────────────────────── */
  const [hovered, setHovered] = useState(false)

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} loop preload="auto" src={bgAudio} />

      {/* Toggle button — fixed bottom-right */}
      <button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={isPlaying && hasInteracted ? 'Mute music' : 'Play music'}
        aria-label="Toggle background music"
        style={{
          position: 'fixed',
          bottom: 'clamp(16px,3vw,28px)',
          right:  'clamp(16px,3vw,28px)',
          zIndex: 9999,
          width:  '48px',
          height: '48px',
          borderRadius: '50%',
          border: '2px solid rgba(93,187,99,0.35)',
          background: hovered
            ? 'rgba(255,255,255,0.98)'
            : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: hovered
            ? '0 8px 28px rgba(93,187,99,0.28)'
            : '0 4px 16px rgba(0,0,0,0.10)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          transition: 'transform 0.22s ease, box-shadow 0.22s ease, background 0.18s ease',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          padding: 0,
          lineHeight: 1,
        }}
      >
        {/* Icon: playing = 🔊, paused/not-started = 🔇 */}
        {isPlaying && hasInteracted ? '🔊' : '🔇'}

        {/* Subtle animated ring when playing */}
        {isPlaying && hasInteracted && (
          <span style={{
            position: 'absolute',
            inset: '-5px',
            borderRadius: '50%',
            border: '2px solid rgba(93,187,99,0.28)',
            animation: 'audioRing 2s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
        )}
      </button>

      {/* Keyframe for pulsing ring */}
      <style>{`
        @keyframes audioRing {
          0%,100% { transform: scale(1);   opacity: 0.6; }
          50%      { transform: scale(1.22); opacity: 0;   }
        }
      `}</style>
    </>
  )
}
