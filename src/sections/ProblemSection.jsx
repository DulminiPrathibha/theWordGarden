// Challenge (left) + Dual-Device (right) — matches reference layout exactly
import img6 from '../assets/6.png'
import flowerPink from '../assets/Pink_Flower.png'
import sparkle from '../assets/Sparkle.png'

const stats = [
  { value:'1 in 5', label:'Children affected by dyslexia',       emoji:'😟', bg:'#FFF2DC', numColor:'#F4A137' },
  { value:'70%',    label:'Report anxiety in school settings',    emoji:'💔', bg:'#FFF0F8', numColor:'#F47AB0' },
  { value:'60%',    label:'Feel isolated in traditional classrooms', emoji:'🌧️', bg:'#E8F4FF', numColor:'#5BA4CF' },
  { value:'3x',     label:'More likely to drop out without support', emoji:'⚠️', bg:'#F2EEFF', numColor:'#9B7ED4' },
]

const solutionItems = [
  { icon:'🤝', label:'Cooperative\nNot Competitive',    bg:'#E6F7E8', iconBg:'#5DBB63' },
  { icon:'🛡️', label:'Emotionally Safe\nAlways',        bg:'#FFF0F8', iconBg:'#F47AB0' },
  { icon:'🎨', label:'Multisensory\nLearning',           bg:'#E8F4FF', iconBg:'#5BA4CF' },
  { icon:'💬', label:'Social Connection\n& Support',    bg:'#F2EEFF', iconBg:'#9B7ED4' },
]

export default function ChallengeDualSection() {
  return (
    <section
      id="challenge"
      style={{
        background: 'linear-gradient(180deg, var(--cream) 0%, var(--cream-warm) 100%)',
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorations */}
      <img src={flowerPink} alt="" className="deco float-b hide-sm"
        style={{ top: '5%', right: '2%', width: '60px', opacity: 0.7 }} />
      <img src={sparkle} alt="" className="deco twinkle hide-sm"
        style={{ bottom: '10%', left: '2%', width: '36px', opacity: 0.6 }} />
      <div className="deco" style={{ top: '12%', left: '5%', fontSize: '1.4rem',
        animation: 'floatY 5s ease-in-out infinite', opacity: 0.42 }}>🌸</div>
      <div className="deco hide-sm" style={{ bottom: '15%', right: '5%', fontSize: '1.2rem',
        animation: 'floatY 4s ease-in-out infinite 1.5s', opacity: 0.42 }}>✨</div>

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'start',
        }} className="challenge-dual-grid">

          {/* ─── LEFT: Challenge + Solution ─── */}
          <div>
            {/* Challenge heading */}
            <div className="eyebrow reveal" style={{ marginBottom: '0.2rem' }}>
              <span>🌸</span> The Challenge
            </div>
            <p className="reveal" style={{ color: '#7A8E7B', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              Dyslexia is more than a reading difficulty.
            </p>

            {/* 4 stat cards — single horizontal row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem', marginBottom: '2.25rem' }} className="stats-row-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`card-base reveal reveal-delay-${i+1}`}
                  style={{
                    background: s.bg,
                    padding: '1.1rem',
                    textAlign: 'center',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                  }}
                >
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{s.emoji}</div>
                  <div style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '1.55rem', fontWeight: 700,
                    color: s.numColor, lineHeight: 1, marginBottom: '0.25rem',
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#4A5E4B', fontWeight: 600, lineHeight: 1.3 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Our Solution ─── */}
            <div className="eyebrow reveal" style={{ marginBottom: '0.2rem' }}>
              <span>🌿</span> Our Solution
            </div>
            <p className="reveal" style={{
              color: '#4A5E4B', fontSize: '0.88rem', lineHeight: 1.7,
              marginBottom: '1.25rem', fontWeight: 500,
            }}>
              The Word Garden combines cooperative multiplayer gameplay with multisensory
              literacy tasks in a safe, non-competitive environment.
            </p>

            {/* 4 circular icon cards in a row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
              {solutionItems.map((item, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i+1}`}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '0.5rem', padding: '0.9rem 0.5rem',
                    background: item.bg, borderRadius: '16px',
                    border: '1.5px solid rgba(0,0,0,0.05)',
                    textAlign: 'center',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: item.iconBg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.3rem',
                    boxShadow: `0 4px 12px ${item.iconBg}66`,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 700, color: '#2C3E2D',
                    lineHeight: 1.3, whiteSpace: 'pre-line',
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Dual Device ─── */}
          <div className="reveal reveal-delay-2">
            <div style={{
              background: 'white',
              borderRadius: '28px',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              boxShadow: '0 8px 36px rgba(0,0,0,0.09)',
              border: '1.5px solid rgba(0,0,0,0.04)',
            }}>
              {/* Heading */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  fontWeight: 700, color: '#2C3E2D', marginBottom: '0.2rem',
                }}>
                  Dual-Device, Dual Purpose
                </div>
                <div style={{ fontSize: '0.84rem', color: '#7A8E7B', fontWeight: 600 }}>
                  Collaborate together. Learn at your own pace.
                </div>
              </div>

              {/* Image 6 — no hard box */}
              <div style={{
                background: 'linear-gradient(135deg, #EDF8FF 0%, #EDFFF3 100%)',
                borderRadius: '18px',
                padding: '0.75rem',
                marginBottom: '1rem',
                position: 'relative',
              }}>
                <img
                  src={img6}
                  alt="PC and mobile dual device setup"
                  style={{
                    width: '100%', objectFit: 'contain', display: 'block',
                    filter: 'drop-shadow(0 8px 20px rgba(0,80,40,0.12))',
                  }}
                />
                {/* Arrows overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.6rem',
                  color: '#5DBB63',
                  textShadow: '0 2px 8px rgba(93,187,99,0.4)',
                  pointerEvents: 'none',
                }}>
                  ⟷
                </div>
              </div>

              {/* PC/Mobile labels */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { emoji:'🖥️', label:'PC', desc:'Explore, collaborate,\nand build together', bg:'#E6F7E8', color:'#3A9A41' },
                  { emoji:'📱', label:'Mobile', desc:'Private literacy tasks\nwith multisensory support', bg:'#E8F4FF', color:'#5BA4CF' },
                ].map((d, i) => (
                  <div key={i} style={{
                    background: d.bg, borderRadius: '14px', padding: '0.85rem',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{d.emoji}</div>
                    <div style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 700, fontSize: '0.95rem', color: d.color, marginBottom: '0.2rem',
                    }}>{d.label}</div>
                    <div style={{ fontSize: '0.72rem', color: '#7A8E7B', lineHeight: 1.4, fontWeight: 600 }}>
                      {d.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { icon:'🔒', label:'Private Practice', sub:'No peer visibility' },
                  { icon:'🔄', label:'Real-time Sync',   sub:'Seamless experience' },
                  { icon:'🎙️', label:'Voice Chat',       sub:'Stay connected' },
                ].map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0.35rem 0.8rem', borderRadius: '50px',
                    background: '#FFF8E0', border: '1.5px solid rgba(244,161,55,0.2)',
                    fontSize: '0.74rem', fontWeight: 700, color: '#4A5E4B',
                  }}>
                    <span>{p.icon}</span>
                    <div>
                      <div style={{ lineHeight: 1.2 }}>{p.label}</div>
                      <div style={{ color: '#7A8E7B', fontWeight: 500, fontSize: '0.65rem' }}>{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .challenge-dual-grid { grid-template-columns: 1fr !important; }
          .stats-row-4 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
