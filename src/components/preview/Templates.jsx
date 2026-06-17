// ─── Shared helpers ───────────────────────────────────────────────────────────
function Link({ href, label }) {
  if (!href?.trim()) return null
  const display = href.replace(/^https?:\/\//, '')
  return <span style={{ marginRight:12 }}>🔗 <a href={href.startsWith('http')?href:`https://${href}`} style={{ color:'inherit' }}>{label || display}</a></span>
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 1 — Modern Developer (sky accent, left-sidebar name block)
// ═══════════════════════════════════════════════════════════════════════════════
export function ModernTemplate({ resume }) {
  const { personal: p, summary, education, skills, projects, experience, achievements } = resume
  const accent = '#0ea5e9'

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
        <div style={{ width:3, height:18, background:accent, borderRadius:2, flexShrink:0 }} />
        <h2 style={{ fontSize:13, fontWeight:700, color:'#1e293b', textTransform:'uppercase',
          letterSpacing:'0.08em', margin:0 }}>{title}</h2>
        <div style={{ flex:1, height:1, background:'#e2e8f0', marginLeft:4 }} />
      </div>
      {children}
    </div>
  )

  return (
    <div id="resume-preview" style={{ background:'#fff', color:'#1e293b', fontFamily:"'Inter',sans-serif",
      fontSize:11.5, lineHeight:1.55, padding:'32px 36px', minHeight:840, width:'100%' }}>
      {/* Header */}
      <div style={{ marginBottom:22, paddingBottom:18, borderBottom:`2px solid ${accent}` }}>
        <h1 style={{ fontSize:26, fontWeight:800, color:'#0f172a', marginBottom:4, fontFamily:'Space Grotesk' }}>
          {p.name || 'Your Name'}
        </h1>
        <div style={{ display:'flex', flexWrap:'wrap', gap:4, fontSize:11, color:'#475569', marginBottom:6 }}>
          {p.email    && <span style={{ marginRight:10 }}>✉ {p.email}</span>}
          {p.phone    && <span style={{ marginRight:10 }}>📞 {p.phone}</span>}
          {p.location && <span style={{ marginRight:10 }}>📍 {p.location}</span>}
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', fontSize:11, color:accent }}>
          {p.linkedin  && <Link href={p.linkedin}  label="LinkedIn" />}
          {p.github    && <Link href={p.github}    label="GitHub" />}
          {p.portfolio && <Link href={p.portfolio} label="Portfolio" />}
        </div>
      </div>

      {/* Summary */}
      {summary.trim() && (
        <Section title="Summary">
          <p style={{ color:'#334155', lineHeight:1.65 }}>{summary}</p>
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Technical Skills">
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {skills.map(s => (
              <span key={s} style={{ padding:'3px 9px', borderRadius:4,
                background:`${accent}15`, color:'#0369a1',
                border:`1px solid ${accent}30`, fontSize:11, fontWeight:500 }}>{s}</span>
            ))}
          </div>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map(ex => (
            <div key={ex.id} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                <div>
                  <span style={{ fontWeight:700, fontSize:12, color:'#0f172a' }}>{ex.role}</span>
                  {ex.company && <span style={{ color:'#475569' }}> · {ex.company}</span>}
                </div>
                <span style={{ color:'#64748b', fontSize:10.5 }}>{ex.duration}</span>
              </div>
              {ex.description && (
                <div style={{ color:'#334155', paddingLeft:0, whiteSpace:'pre-line', fontSize:11 }}>
                  {ex.description}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map(pr => (
            <div key={pr.id} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                <span style={{ fontWeight:700, fontSize:12, color:'#0f172a' }}>{pr.name}</span>
                <span style={{ color:accent, fontSize:10.5 }}>
                  {pr.github && <a href={pr.github.startsWith('http')?pr.github:`https://${pr.github}`} style={{ color:accent, marginRight:8 }}>GitHub</a>}
                  {pr.live && <a href={pr.live.startsWith('http')?pr.live:`https://${pr.live}`} style={{ color:accent }}>Live</a>}
                </span>
              </div>
              {pr.tech && <p style={{ color:'#64748b', fontSize:10.5, marginBottom:2, fontStyle:'italic' }}>Tech: {pr.tech}</p>}
              {pr.description && <p style={{ color:'#334155', fontSize:11 }}>{pr.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map(ed => (
            <div key={ed.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:12, color:'#0f172a' }}>{ed.degree}</div>
                <div style={{ color:'#475569' }}>{ed.college}</div>
              </div>
              <div style={{ textAlign:'right', color:'#64748b', fontSize:10.5 }}>
                <div>{ed.duration}</div>
                {ed.cgpa && <div style={{ color:accent, fontWeight:600 }}>CGPA: {ed.cgpa}</div>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Achievements */}
      {achievements.trim() && (
        <Section title="Achievements & Certifications">
          <div style={{ color:'#334155', whiteSpace:'pre-line', fontSize:11 }}>{achievements}</div>
        </Section>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 2 — Minimal ATS (pure text, zero decoration — max ATS compatibility)
// ═══════════════════════════════════════════════════════════════════════════════
export function MinimalTemplate({ resume }) {
  const { personal: p, summary, education, skills, projects, experience, achievements } = resume

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:18 }}>
      <h2 style={{ fontSize:12, fontWeight:700, color:'#111', textTransform:'uppercase',
        letterSpacing:'0.1em', borderBottom:'1px solid #000', paddingBottom:3, marginBottom:10 }}>
        {title}
      </h2>
      {children}
    </div>
  )

  return (
    <div id="resume-preview" style={{ background:'#fff', color:'#111', fontFamily:"Georgia,'Times New Roman',serif",
      fontSize:11.5, lineHeight:1.6, padding:'36px 40px', minHeight:840, width:'100%' }}>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:20, paddingBottom:14, borderBottom:'2px solid #000' }}>
        <h1 style={{ fontSize:22, fontWeight:700, marginBottom:6, fontFamily:'Arial,sans-serif' }}>
          {p.name || 'Your Name'}
        </h1>
        <div style={{ fontSize:11, color:'#333' }}>
          {[p.email, p.phone, p.location].filter(Boolean).join(' | ')}
        </div>
        {(p.linkedin || p.github || p.portfolio) && (
          <div style={{ fontSize:11, color:'#555', marginTop:3 }}>
            {[p.linkedin, p.github, p.portfolio].filter(Boolean).join(' | ')}
          </div>
        )}
      </div>

      {summary.trim() && (
        <Section title="Professional Summary">
          <p style={{ fontFamily:'Arial,sans-serif', color:'#222' }}>{summary}</p>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p style={{ fontFamily:'Arial,sans-serif' }}>{skills.join(' • ')}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map(ex => (
            <div key={ex.id} style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <strong style={{ fontFamily:'Arial,sans-serif' }}>{ex.role}{ex.company ? ` — ${ex.company}` : ''}</strong>
                <span style={{ fontFamily:'Arial,sans-serif', fontSize:10.5 }}>{ex.duration}</span>
              </div>
              {ex.description && <div style={{ fontFamily:'Arial,sans-serif', whiteSpace:'pre-line', fontSize:11, color:'#222', marginTop:3 }}>{ex.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map(pr => (
            <div key={pr.id} style={{ marginBottom:12 }}>
              <div style={{ fontFamily:'Arial,sans-serif' }}>
                <strong>{pr.name}</strong>{pr.tech ? ` | ${pr.tech}` : ''}
                {pr.github && ` | ${pr.github}`}
                {pr.live && ` | ${pr.live}`}
              </div>
              {pr.description && <div style={{ fontFamily:'Arial,sans-serif', fontSize:11, color:'#222', marginTop:2 }}>{pr.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map(ed => (
            <div key={ed.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <div style={{ fontFamily:'Arial,sans-serif' }}>
                <strong>{ed.degree}</strong>{ed.college ? ` — ${ed.college}` : ''}
                {ed.cgpa ? ` | CGPA: ${ed.cgpa}` : ''}
              </div>
              <span style={{ fontFamily:'Arial,sans-serif', fontSize:10.5 }}>{ed.duration}</span>
            </div>
          ))}
        </Section>
      )}

      {achievements.trim() && (
        <Section title="Achievements & Certifications">
          <div style={{ fontFamily:'Arial,sans-serif', whiteSpace:'pre-line', fontSize:11 }}>{achievements}</div>
        </Section>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE 3 — Professional Corporate (violet accent, two-column header)
// ═══════════════════════════════════════════════════════════════════════════════
export function CorporateTemplate({ resume }) {
  const { personal: p, summary, education, skills, projects, experience, achievements } = resume
  const accent = '#7c3aed'

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:18 }}>
      <div style={{ background:accent, color:'#fff', padding:'4px 12px', borderRadius:'4px 4px 0 0',
        fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8, display:'inline-block' }}>
        {title}
      </div>
      {children}
    </div>
  )

  return (
    <div id="resume-preview" style={{ background:'#fff', color:'#1e1b4b', fontFamily:"'Inter','Arial',sans-serif",
      fontSize:11.5, lineHeight:1.55, minHeight:840, width:'100%' }}>
      {/* Header band */}
      <div style={{ background:`linear-gradient(135deg,${accent},#4f46e5)`, padding:'24px 32px', color:'#fff', marginBottom:22 }}>
        <h1 style={{ fontSize:24, fontWeight:800, marginBottom:6, fontFamily:'Space Grotesk' }}>
          {p.name || 'Your Name'}
        </h1>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 20px', fontSize:10.5, opacity:.92 }}>
          {p.email    && <span>✉ {p.email}</span>}
          {p.phone    && <span>📞 {p.phone}</span>}
          {p.location && <span>📍 {p.location}</span>}
          {p.linkedin && <span>in {p.linkedin.replace(/^https?:\/\//, '')}</span>}
          {p.github   && <span>⌥ {p.github.replace(/^https?:\/\//, '')}</span>}
          {p.portfolio&& <span>🌐 {p.portfolio.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      <div style={{ padding:'0 32px 32px' }}>
        {summary.trim() && (
          <Section title="Professional Summary">
            <p style={{ color:'#312e81', fontStyle:'italic', lineHeight:1.65 }}>{summary}</p>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Core Competencies">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'4px 12px' }}>
              {skills.map(s => (
                <div key={s} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11 }}>
                  <div style={{ width:5,height:5,borderRadius:'50%',background:accent,flexShrink:0 }}/>
                  {s}
                </div>
              ))}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Professional Experience">
            {experience.map(ex => (
              <div key={ex.id} style={{ marginBottom:12, paddingLeft:12,
                borderLeft:`2px solid ${accent}30` }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                  <div>
                    <span style={{ fontWeight:700, color:'#1e1b4b' }}>{ex.role}</span>
                    {ex.company && <span style={{ color:'#6d28d9' }}> · {ex.company}</span>}
                  </div>
                  <span style={{ color:'#64748b', fontSize:10.5, fontStyle:'italic' }}>{ex.duration}</span>
                </div>
                {ex.description && (
                  <div style={{ color:'#374151', whiteSpace:'pre-line', fontSize:11 }}>{ex.description}</div>
                )}
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Key Projects">
            {projects.map(pr => (
              <div key={pr.id} style={{ marginBottom:12, paddingLeft:12,
                borderLeft:`2px solid ${accent}30` }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                  <span style={{ fontWeight:700, color:'#1e1b4b' }}>{pr.name}</span>
                  <span style={{ fontSize:10.5, color:'#6d28d9' }}>
                    {pr.github && <a href={pr.github.startsWith('http')?pr.github:`https://${pr.github}`} style={{ color:'#6d28d9', marginRight:8 }}>Code</a>}
                    {pr.live && <a href={pr.live.startsWith('http')?pr.live:`https://${pr.live}`} style={{ color:'#6d28d9' }}>Demo</a>}
                  </span>
                </div>
                {pr.tech && <p style={{ color:'#7c3aed', fontSize:10.5, marginBottom:2, fontWeight:500 }}>Stack: {pr.tech}</p>}
                {pr.description && <p style={{ color:'#374151', fontSize:11 }}>{pr.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map(ed => (
              <div key={ed.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <div>
                  <div style={{ fontWeight:700 }}>{ed.degree}</div>
                  <div style={{ color:'#6d28d9', fontSize:11 }}>{ed.college}</div>
                </div>
                <div style={{ textAlign:'right', fontSize:10.5 }}>
                  <div style={{ color:'#64748b' }}>{ed.duration}</div>
                  {ed.cgpa && <div style={{ color:accent, fontWeight:700 }}>{ed.cgpa}</div>}
                </div>
              </div>
            ))}
          </Section>
        )}

        {achievements.trim() && (
          <Section title="Achievements & Certifications">
            <div style={{ color:'#374151', whiteSpace:'pre-line', fontSize:11 }}>{achievements}</div>
          </Section>
        )}
      </div>
    </div>
  )
}
