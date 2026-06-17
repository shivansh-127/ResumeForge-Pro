import { TEMPLATES } from '../../utils/index.js'
import { ModernTemplate, MinimalTemplate, CorporateTemplate } from './Templates'

const TEMPLATE_MAP = {
  modern:    ModernTemplate,
  minimal:   MinimalTemplate,
  corporate: CorporateTemplate,
}

export default function PreviewPanel({ resume, template, setTemplate }) {
  const TemplateComp = TEMPLATE_MAP[template] || ModernTemplate

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* Template switcher */}
      <div style={{
        background:'var(--surface)', border:'1px solid var(--border)',
        borderRadius:'var(--radius)', padding:'14px 16px',
      }}>
        <p style={{ fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase',
          letterSpacing:'0.06em', marginBottom:10 }}>Template</p>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={()=>setTemplate(t.id)} style={{
              flex:1, minWidth:80, padding:'8px 10px', borderRadius:7,
              border:`1.5px solid ${template===t.id ? t.accent : 'var(--border2)'}`,
              background: template===t.id ? `${t.accent}18` : 'var(--surface2)',
              color: template===t.id ? t.accent : 'var(--text2)',
              fontSize:11, fontWeight: template===t.id ? 700 : 400,
              transition:'all var(--transition)', cursor:'pointer',
              display:'flex', flexDirection:'column', alignItems:'center', gap:4,
            }}>
              <div style={{
                width:28, height:36, borderRadius:3,
                border:`1.5px solid ${template===t.id ? t.accent : 'var(--border2)'}`,
                background: template===t.id ? `${t.accent}20` : 'var(--surface3)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:8, fontWeight:700, color: template===t.id ? t.accent : 'var(--text3)',
              }}>
                {t.id === 'modern' ? '◼' : t.id === 'minimal' ? '≡' : '▣'}
              </div>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div style={{
        border:'1px solid var(--border)',
        borderRadius:'var(--radius)', overflow:'hidden',
        boxShadow:'var(--shadow-lg)',
        background:'#fff',
      }}>
        <div style={{
          background:'var(--surface2)', borderBottom:'1px solid var(--border)',
          padding:'8px 14px', display:'flex', alignItems:'center', gap:6,
        }}>
          {['#fb7185','#fbbf24','#34d399'].map(c => (
            <div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c }} />
          ))}
          <span style={{ fontSize:11, color:'var(--text3)', marginLeft:6 }}>Resume Preview</span>
        </div>
        <div style={{ overflowY:'auto', maxHeight:'80vh' }}>
          <TemplateComp resume={resume} />
        </div>
      </div>
    </div>
  )
}
