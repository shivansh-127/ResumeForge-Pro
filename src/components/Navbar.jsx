import { Btn } from './ui/index.jsx'

export default function Navbar({ darkMode, setDarkMode, onExport, exporting }) {
  return (
    <nav style={{
      position:'sticky', top:0, zIndex:100,
      background: darkMode ? 'rgba(10,14,26,.92)' : 'rgba(240,244,248,.92)',
      backdropFilter:'blur(16px)',
      borderBottom:'1px solid var(--border)',
    }}>
      <div style={{
        maxWidth:1400, margin:'0 auto', padding:'0 24px',
        height:58, display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:30, height:30, borderRadius:7,
            background:'linear-gradient(135deg,#0ea5e9,#818cf8)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Space Grotesk', fontWeight:800, color:'#fff', fontSize:14,
          }}>R</div>
          <div>
            <span style={{ fontFamily:'Space Grotesk', fontWeight:700, fontSize:15, color:'var(--text)' }}>
              ResumeForge
            </span>
            <span style={{ fontFamily:'Space Grotesk', fontWeight:400, fontSize:15, color:'var(--sky)' }}>
              {' '}Pro
            </span>
          </div>
          <span style={{
            fontSize:10, fontWeight:700, letterSpacing:'0.08em',
            padding:'2px 7px', borderRadius:99,
            background:'var(--sky-glow)', color:'var(--sky)',
            border:'1px solid rgba(56,189,248,.2)',
            textTransform:'uppercase',
          }}>Beta</span>
        </div>

        {/* Actions */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <a
            href="https://digitalheroesco.com"
            target="_blank" rel="noopener noreferrer"
            style={{
              padding:'6px 14px', borderRadius:7,
              background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color:'#fff', fontWeight:700, fontSize:11,
              textDecoration:'none', whiteSpace:'nowrap',
              border:'none', transition:'opacity var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity='.82'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
          >
            Built for Digital Heroes
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
            style={{
              width:34, height:34, borderRadius:7,
              border:'1px solid var(--border2)', background:'var(--surface2)',
              color:'var(--text2)', fontSize:15,
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all var(--transition)',
            }}
          >{darkMode ? '☀️' : '🌙'}</button>

          <Btn
            onClick={onExport}
            disabled={exporting}
            style={{ opacity: exporting ? .6 : 1, cursor: exporting ? 'wait' : 'pointer', whiteSpace:'nowrap' }}
          >
            {exporting
              ? <><span style={{ width:13,height:13,border:'2px solid #fff4',borderTop:'2px solid #fff',borderRadius:'50%',animation:'spin .8s linear infinite',display:'inline-block' }}/> Generating…</>
              : '⬇ Download PDF'
            }
          </Btn>
        </div>
      </div>
    </nav>
  )
}
