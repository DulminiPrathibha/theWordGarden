import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      zIndex: 1000,
      background: 'rgba(255,255,255,0.05)',
    }}>
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #4ade80, #7dd3fc, #fde68a)',
          transformOrigin: 'left center',
          scaleX: 0,
          boxShadow: '0 0 10px rgba(74,222,128,0.8)',
        }}
      />
    </div>
  )
}
