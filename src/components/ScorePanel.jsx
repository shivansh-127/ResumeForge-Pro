import { calcScore, atsInsights } from '../utils/index.js'
import { Card } from './ui/index.jsx'

function ScoreRing({ score, color, strength }) {
  const r = 44, circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <div style={{ position:'relative', width:110, height:110 }}>
        <svg width={110} height={110} style={{ transform:'rotate(-90deg)' }}>
          <circle cx={55} cy={55} r={r} fill="none" stroke="var(--border2)" strokeWidth={10} />
          <circle
            cx={55} cy={55} r={r} fill="none"
            stroke={color} strokeWidth={10}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
            style={{ transition:'stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div style={{
          position:'absolute', inset:0,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        }}>
          <span style={{ fontSize:26, fontWeight:800, fontFamily:'Space Grotesk', color }}>{score}</span>
          <span style={{ fontSize:10, color:'var(--text3)', fontWeight:600 }}>/ 100</span>
        </div>
      </div>
      <div style={{
        padding:'4px 14px', borderRadius:99,
        background: `${color}18`, color, fontSize:13, fontWeight:700,
        border:`1px solid ${color}40`,
      }}>
        {strength}
      </div>
    </div>
  )
}

export default function ScorePanel({ resume }) {
  const { score, color, strength, checks, missing } = calcScore(resume)
  const insights = atsInsights(resume)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* Score card */}
      <Card>
        <p style={{ fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase',
          letterSpacing:'0.06em', marginBottom:16 }}>Resume Strength</p>
        <ScoreRing score={score} color={color} strength={strength} />

        <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:8 }}>
          {checks.map(c => (
            <div key={c.key} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
              <span style={{
                width:16, height:16, borderRadius:'50%', flexShrink:0,
                background: c.pass ? '#05966920' : 'var(--surface3)',
                border: `1.5px solid ${c.pass ? '#059669' : 'var(--border2)'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:9, color: c.pass ? '#059669' : 'var(--text3)',
                marginTop:1,
              }}>{c.pass ? '✓' : '·'}</span>
              <span style={{ fontSize:11, color: c.pass ? 'var(--text2)' : 'var(--text3)', lineHeight:1.5 }}>
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ATS Insights */}
      <Card>
        <p style={{ fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase',
          letterSpacing:'0.06em', marginBottom:14 }}>ATS Insights</p>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {insights.map((item, i) => (
            <div key={i} style={{
              display:'flex', gap:10, padding:'10px 12px', borderRadius:8,
              background: item.ok ? 'rgba(5,150,105,.06)' : 'rgba(251,113,133,.06)',
              border:`1px solid ${item.ok ? 'rgba(5,150,105,.2)' : 'rgba(251,113,133,.15)'}`,
              alignItems:'flex-start',
            }}>
              <span style={{ fontSize:13, flexShrink:0 }}>{item.ok ? '✅' : '⚠️'}</span>
              <div>
                <div style={{
                  fontSize:11, fontWeight:600,
                  color: item.ok ? '#059669' : 'var(--rose)',
                  marginBottom: item.ok ? 0 : 3,
                }}>
                  {item.ok ? 'Done: ' + item.msg : item.msg}
                </div>
                {!item.ok && (
                  <div style={{ fontSize:11, color:'var(--text3)', lineHeight:1.5 }}>{item.tip}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Built by */}
      <Card style={{ textAlign:'center' }}>
        <p style={{ fontSize:11, color:'var(--text3)', marginBottom:4 }}>Built by</p>
        <p style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:2 }}>Shivansh Saxena</p>
        <a href="mailto:shivanshsaxena127@gmail.com" style={{
          fontSize:11, color:'var(--sky)', textDecoration:'none',
        }}>shivanshsaxena127@gmail.com</a>
        <div style={{ marginTop:12 }}>
          <a
            href="https://digitalheroesco.com"
            target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-block', padding:'6px 14px', borderRadius:7,
              background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color:'#fff', fontWeight:700, fontSize:11, textDecoration:'none',
            }}
          >Built for Digital Heroes</a>
        </div>
      </Card>
    </div>
  )
}
