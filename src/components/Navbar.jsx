// Global Navbar — only appears after scrolling past hero (slides in with spring)
import { useState, useEffect } from 'react'

const LINKS = [
  { label:'World',     href:'#hero'        },
  { label:'Challenge', href:'#challenge'   },
  { label:'Solution',  href:'#challenge'   },
  { label:'Gameplay',  href:'#how-it-works'},
  { label:'Features',  href:'#features'   },
  { label:'Team',      href:'#team'       },
  { label:'Contact',   href:'#contact'    },
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [hov, setHov]         = useState(null)

  useEffect(()=>{
    // Show only after user scrolls past 80% of viewport height (past hero)
    const check = ()=> setVisible(window.scrollY > window.innerHeight * 0.8)
    check()
    window.addEventListener('scroll', check, { passive:true })
    return ()=> window.removeEventListener('scroll', check)
  },[])

  const go = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior:'smooth' }) }

  if (!visible) return null

  return (
    <header style={{
      position:'fixed', top:'12px', left:'50%',
      transform:'translateX(-50%)',
      zIndex:1000,
      width:'min(96vw, 1180px)',
      animation:'slideDownNav 0.4s cubic-bezier(0.34,1.46,0.64,1) both',
    }}>
      <nav style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0.58rem 1.5rem',
        borderRadius:'var(--r-pill)',
        background:'rgba(247,244,234,0.96)',
        backdropFilter:'blur(18px)',
        WebkitBackdropFilter:'blur(18px)',
        border:'1px solid rgba(255,255,255,0.82)',
        boxShadow:`
          0 5px 26px rgba(0,0,0,0.10),
          0 0   0 1.5px rgba(93,187,99,0.22)
        `,
        gap:'0.6rem',
      }}>
        {/* Logo */}
        <a href="#hero" onClick={e=>go(e,'#hero')}
          style={{ display:'flex', alignItems:'center', gap:'0.42rem', textDecoration:'none', flexShrink:0 }}>
          <div style={{
            width:'36px', height:'36px', borderRadius:'10px',
            background:'linear-gradient(135deg,#5DBB63,#3A9A41)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.1rem', boxShadow:'0 3px 10px rgba(93,187,99,0.4)',
          }}>🌿</div>
          <div style={{ lineHeight:1.05 }}>
            <div style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:'0.92rem', color:'#5DBB63' }}>The Word</div>
            <div style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:'0.96rem', color:'#3A9A41' }}>Garden 🌸</div>
          </div>
        </a>

        {/* Links */}
        <div style={{ display:'flex', gap:'0', alignItems:'center' }} className="gn-links">
          {LINKS.map(l=>(
            <a key={l.label} href={l.href} onClick={e=>go(e,l.href)}
              onMouseEnter={()=>setHov(l.label)}
              onMouseLeave={()=>setHov(null)}
              style={{
                fontFamily:"'Nunito',sans-serif", fontSize:'0.85rem', fontWeight:700,
                color: hov===l.label ? '#3A9A41' : '#2C3E2D',
                textDecoration:'none',
                padding:'0.36rem 0.66rem', borderRadius:'50px',
                background: hov===l.label ? 'rgba(93,187,99,0.12)' : 'transparent',
                transition:'all 0.17s ease', whiteSpace:'nowrap',
              }}>{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" onClick={e=>go(e,'#contact')} className="btn-primary"
          style={{ padding:'0.54rem 1.3rem', fontSize:'0.85rem' }}>
          Begin Adventure
        </a>
      </nav>
      <style>{`@media(max-width:768px){.gn-links{display:none!important}}`}</style>
    </header>
  )
}
