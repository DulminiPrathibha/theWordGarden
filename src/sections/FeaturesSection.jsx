// Features Strip — "What Makes The Word Garden Special"
import speechBubble from '../assets/Speech_Bubble.png'
import timerClock   from '../assets/Timer_Clock.png'
import smilingstar  from '../assets/Smiling_Star.png'
import shield       from '../assets/Shield.png'
import plant        from '../assets/Plant.png'
import sparkle      from '../assets/Sparkle.png'
import girlChar     from '../assets/Girl_Character.png'

const features = [
  { img: speechBubble, title: 'Voice Communication', desc: 'Talk and listen only\n(No avatars)', bg: '#E8F4FF', tint: '#5BA4CF' },
  { emoji: '⏰',        title: 'No Timers',           desc: 'Learn without\npressure',         bg: '#FFF2DC', tint: '#F4A137' },
  { img: smilingstar,  title: 'Positive Feedback',   desc: 'Encouraging and\nnon-punitive',    bg: '#FFF0F8', tint: '#F47AB0' },
  { img: shield,       title: 'Beautiful World',     desc: 'A safe space to\nexplore and grow', bg: '#E6F7E8', tint: '#5DBB63' },
  { emoji: '🧒',       title: 'For Ages 8–12',       desc: 'Designed with\nchildren, for children', bg: '#F2EEFF', tint: '#9B7ED4' },
]

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        background: 'linear-gradient(180deg, #F8FFF8 0%, #FFFBEF 100%)',
        padding: 'clamp(3.5rem, 7vw, 5.5rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative girl character floating on left */}
      <img src={girlChar} alt="" className="deco float-b hide-sm"
        style={{ bottom: 0, left: '0%', width: 'clamp(90px,10vw,150px)', zIndex: 1 }} />
      <img src={plant} alt="" className="deco float-c hide-sm"
        style={{ bottom: 0, right: '0%', width: 'clamp(60px,7vw,100px)', zIndex: 1 }} />
      <img src={sparkle} alt="" className="deco twinkle"
        style={{ top: '12%', right: '5%', width: '30px', opacity: 0.65 }} />
      <div className="deco" style={{
        top: '8%', left: '5%', fontSize: '1.2rem',
        animation: 'floatY 5s ease-in-out infinite', opacity: 0.5,
      }}>🌼</div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="heading-lg reveal">
            What Makes{' '}
            <span className="text-green">The Word Garden</span>{' '}
            Special
          </h2>
        </div>

        {/* Feature cards */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i+1}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '0.65rem', padding: '1.5rem 1.1rem',
                background: f.bg, borderRadius: '22px',
                border: `1.5px solid ${f.tint}20`,
                minWidth: '135px', flex: '1', maxWidth: '195px',
                textAlign: 'center',
                transition: 'transform 0.28s ease, box-shadow 0.28s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.11)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon — white circle, no rectangular box */}
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 18px ${f.tint}44`,
              }}>
                {f.img
                  ? <img src={f.img} alt={f.title} style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                  : <span style={{ fontSize: '1.8rem' }}>{f.emoji}</span>
                }
              </div>
              <div style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 700, fontSize: '0.9rem', color: f.tint, lineHeight: 1.2,
              }}>
                {f.title}
              </div>
              <div style={{
                fontSize: '0.74rem', color: '#7A8E7B', lineHeight: 1.4,
                fontWeight: 600, whiteSpace: 'pre-line',
              }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
