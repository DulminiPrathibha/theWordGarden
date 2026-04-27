import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Island = ({ children, style, glowColor = '#4ade80' }) => (
  <div style={{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'float 6s ease-in-out infinite',
    ...style,
  }}>
    {/* Island body */}
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '50% / 30%',
      background: 'linear-gradient(180deg, #1a4a22 0%, #16a34a 30%, #0d2b12 100%)',
      boxShadow: `0 0 40px ${glowColor}33, 0 20px 60px rgba(0,0,0,0.5)`,
      position: 'relative',
      overflow: 'visible',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '1rem',
    }}>
      {/* Grass top */}
      <div style={{
        position: 'absolute',
        top: -8,
        left: '10%',
        right: '10%',
        height: '16px',
        borderRadius: '50%',
        background: `linear-gradient(90deg, #4ade80, #86efac, #4ade80)`,
        filter: 'blur(2px)',
      }} />
      {children}
    </div>
    {/* Bottom shadow fade */}
    <div style={{
      width: '60%',
      height: '20px',
      background: `radial-gradient(ellipse, ${glowColor}44 0%, transparent 70%)`,
      marginTop: '-6px',
    }} />
  </div>
)

const PortalRing = ({ size, color, style }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    border: `3px solid ${color}`,
    boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}22`,
    animation: 'portal-pulse 3s ease-in-out infinite',
    position: 'absolute',
    ...style,
  }}>
    <div style={{
      position: 'absolute',
      inset: '8px',
      borderRadius: '50%',
      border: `2px solid ${color}66`,
      animation: 'portal-pulse 3s ease-in-out infinite',
      animationDelay: '0.5s',
    }} />
    <div style={{
      position: 'absolute',
      inset: '20px',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
    }} />
  </div>
)

export default function WorldSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const islandsRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      })

      // Islands entrance
      gsap.from(islandsRef.current.querySelectorAll('.island-item'), {
        opacity: 0,
        y: 80,
        scale: 0.8,
        stagger: 0.2,
        duration: 1.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: islandsRef.current,
          start: 'top 75%',
        },
      })

      // Parallax on islands
      gsap.to(islandsRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Text
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const worlds = [
    {
      label: 'The Meadow Isle',
      emoji: '🌸',
      desc: 'Where letters first bloom',
      color: '#4ade80',
      delay: '0s',
      size: { w: 220, h: 120 },
    },
    {
      label: 'Crystal Peak',
      emoji: '💎',
      desc: 'Puzzle-solving heights',
      color: '#7dd3fc',
      delay: '1.5s',
      size: { w: 260, h: 140 },
    },
    {
      label: 'The Word Forge',
      emoji: '✨',
      desc: 'Where words are crafted',
      color: '#fde68a',
      delay: '0.8s',
      size: { w: 200, h: 110 },
    },
  ]

  return (
    <section
      id="world"
      ref={sectionRef}
      className="garden-section"
      style={{
        background: 'linear-gradient(180deg, #071220 0%, #071a0b 40%, #0a2e14 100%)',
        padding: '8rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(74,222,128,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        {/* Heading */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-eyebrow">The Game World</p>
          <h2 className="section-title" style={{ color: '#f0fdf4' }}>
            Floating Islands of{' '}
            <span className="gradient-text">Wonder</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            The Word Garden is a living, breathing fantasy world where floating islands
            each hold unique literacy adventures, connected by shimmering portals and
            explored together with friends.
          </p>
        </div>

        {/* Islands Scene */}
        <div
          ref={islandsRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            marginBottom: '5rem',
            flexWrap: 'wrap',
            position: 'relative',
            minHeight: '280px',
          }}
        >
          {/* Portals between islands */}
          <PortalRing size="70px" color="#4ade80" style={{ left: '22%', top: '40%', zIndex: 2 }} />
          <PortalRing size="60px" color="#7dd3fc" style={{ right: '22%', top: '35%', zIndex: 2 }} />

          {worlds.map((world, i) => (
            <div
              key={i}
              className="island-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                animationDelay: world.delay,
              }}
            >
              <Island
                glowColor={world.color}
                style={{
                  width: world.size.w,
                  height: world.size.h,
                  animationDelay: world.delay,
                }}
              >
                <div style={{
                  textAlign: 'center',
                  padding: '0.5rem',
                  zIndex: 1,
                  position: 'relative',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{world.emoji}</div>
                </div>
              </Island>

              {/* Label card */}
              <div className="glass" style={{
                borderRadius: '16px',
                padding: '0.75rem 1.25rem',
                textAlign: 'center',
                minWidth: '160px',
                border: `1px solid ${world.color}33`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: world.color,
                  marginBottom: '0.25rem',
                  letterSpacing: '0.03em',
                }}>
                  {world.label}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(240,253,244,0.55)',
                  fontStyle: 'italic',
                }}>
                  {world.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* World Facts */}
        <div
          ref={textRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {[
            { stat: '3+', label: 'Unique Islands', color: '#4ade80' },
            { stat: '∞', label: 'Collaborative Stories', color: '#7dd3fc' },
            { stat: '100%', label: 'Emotionally Safe', color: '#fde68a' },
          ].map((item, i) => (
            <div key={i} className="glass" style={{
              borderRadius: '20px',
              padding: '1.75rem',
              textAlign: 'center',
              border: `1px solid ${item.color}22`,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: item.color,
                textShadow: `0 0 30px ${item.color}66`,
                marginBottom: '0.5rem',
              }}>
                {item.stat}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(240,253,244,0.6)',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
