import { Btn } from './ui/index.jsx'

export default function Hero({ onStart }) {
  return (
    <section style={{
      textAlign:'center', padding:'72px 24px 56px',
      maxWidth:700, margin:'0 auto',
    }}>
      <div className="fade-up" style={{ animationDelay:'0ms' }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:6,
          padding:'5px 14px', borderRadius:99,
          background:'var(--sky-glow)', color:'var(--sky)',
          border:'1px solid rgba(56,189,248,.2)',
          fontSize:11, fontWeight:700, letterSpacing:'0.06em',
          textTransform:'uppercase', marginBottom:22,
        }}>
          ✦ ATS-Friendly · 3 Templates · PDF Export
        </div>
      </div>

      <h1 className="fade-up" style={{
        fontFamily:'Space Grotesk', fontWeight:700,
        fontSize:'clamp(26px,5vw,50px)',
        color:'var(--text)', lineHeight:1.12,
        marginBottom:18, letterSpacing:'-0.025em',
        animationDelay:'60ms',
      }}>
        Build Professional Developer<br />
        <span style={{
          background:'linear-gradient(90deg,#38bdf8,#818cf8)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
        }}>Resumes in Minutes</span>
      </h1>

      <p className="fade-up" style={{
        fontSize:'clamp(13px,2vw,16px)', color:'var(--text2)',
        maxWidth:480, margin:'0 auto 32px', lineHeight:1.7,
        animationDelay:'120ms',
      }}>
        Create ATS-friendly resumes, switch between professional templates,
        and export polished PDFs ready for recruiters — all free, no sign-up.
      </p>

      <div className="fade-up" style={{ animationDelay:'180ms' }}>
        <Btn size="lg" onClick={onStart} style={{
          boxShadow:'0 4px 24px rgba(14,165,233,.35)',
          background:'linear-gradient(135deg,#0ea5e9,#818cf8)',
          fontSize:14,
        }}>
          ✦ Create My Resume
        </Btn>
      </div>

      {/* Feature pills */}
      <div className="fade-up" style={{
        display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center',
        marginTop:32, animationDelay:'240ms',
      }}>
        {['Free forever','No sign-up','Data stays on device','PDF download','Live preview','Resume score'].map(f => (
          <span key={f} style={{
            fontSize:11, padding:'4px 12px', borderRadius:99,
            background:'var(--surface2)', color:'var(--text3)',
            border:'1px solid var(--border)',
          }}>{f}</span>
        ))}
      </div>
    </section>
  )
}
