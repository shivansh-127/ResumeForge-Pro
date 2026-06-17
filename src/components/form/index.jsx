import { useState } from 'react'
import { Input, Textarea, Btn, SectionHeader, Tag, Card, Divider } from '../ui/index.jsx'
import { uid } from '../../utils/index.js'

// ── Personal Info ─────────────────────────────────────────────────────────────
export function PersonalForm({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <Card>
      <SectionHeader icon="👤" title="Personal Information" subtitle="This appears at the top of your resume" />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }} className="form-grid">
        <Input label="Full Name *"      value={data.name}      onChange={e=>set('name',e.target.value)}      placeholder="Shivansh Saxena" />
        <Input label="Email *"          value={data.email}     onChange={e=>set('email',e.target.value)}     placeholder="you@email.com"   type="email" />
        <Input label="Phone"            value={data.phone}     onChange={e=>set('phone',e.target.value)}     placeholder="+91 98765 43210" />
        <Input label="Location"         value={data.location}  onChange={e=>set('location',e.target.value)}  placeholder="New Delhi, India" />
        <Input label="LinkedIn URL"     value={data.linkedin}  onChange={e=>set('linkedin',e.target.value)}  placeholder="linkedin.com/in/username" />
        <Input label="GitHub URL"       value={data.github}    onChange={e=>set('github',e.target.value)}    placeholder="github.com/username" />
        <Input label="Portfolio / Website" value={data.portfolio} onChange={e=>set('portfolio',e.target.value)} placeholder="yoursite.dev" style={{ gridColumn:'span 2' }} />
      </div>
      <style>{`@media(max-width:560px){.form-grid{grid-template-columns:1fr!important}.form-grid input[style*="span"]{grid-column:1!important}}`}</style>
    </Card>
  )
}

// ── Summary ───────────────────────────────────────────────────────────────────
export function SummaryForm({ data, onChange }) {
  const len = data.trim().length
  return (
    <Card>
      <SectionHeader icon="✍️" title="Professional Summary" subtitle="3–4 lines about who you are and what you bring" />
      <Textarea
        value={data}
        onChange={e => onChange(e.target.value)}
        rows={4}
        placeholder="Passionate full-stack developer with 2+ years of experience building scalable web applications using React, Node.js, and cloud platforms. Eager to contribute to innovative teams solving real-world problems..."
      />
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
        <span style={{ fontSize:11, color:'var(--text3)' }}>Aim for 50–200 characters</span>
        <span style={{ fontSize:11, color: len>30 ? 'var(--emerald)' : 'var(--rose)' }}>{len} chars</span>
      </div>
    </Card>
  )
}

// ── Education ─────────────────────────────────────────────────────────────────
export function EducationForm({ data, onChange }) {
  function add() {
    onChange([...data, { id:uid(), degree:'', college:'', duration:'', cgpa:'' }])
  }
  function remove(id) { onChange(data.filter(e => e.id !== id)) }
  function update(id, k, v) { onChange(data.map(e => e.id===id ? {...e,[k]:v} : e)) }

  return (
    <Card>
      <SectionHeader icon="🎓" title="Education" subtitle="Most recent first" />
      {data.length === 0 && (
        <div style={{ textAlign:'center', padding:'20px 0', color:'var(--text3)', fontSize:13 }}>
          No education added yet. Click below to add.
        </div>
      )}
      {data.map((ed, i) => (
        <div key={ed.id} style={{ marginBottom:16 }}>
          {i > 0 && <Divider />}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:600, color:'var(--text3)' }}>Education #{i+1}</span>
            <Btn size="sm" variant="danger" onClick={()=>remove(ed.id)}>Remove</Btn>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="form-grid">
            <Input label="Degree / Course" value={ed.degree}  onChange={e=>update(ed.id,'degree',e.target.value)}  placeholder="B.Tech Computer Science" />
            <Input label="College / University" value={ed.college} onChange={e=>update(ed.id,'college',e.target.value)} placeholder="IIT Delhi" />
            <Input label="Duration" value={ed.duration} onChange={e=>update(ed.id,'duration',e.target.value)} placeholder="2021 – 2025" />
            <Input label="CGPA / %" value={ed.cgpa} onChange={e=>update(ed.id,'cgpa',e.target.value)} placeholder="8.5 / 10" />
          </div>
        </div>
      ))}
      <Btn variant="ghost" size="sm" onClick={add} style={{ marginTop:4 }}>+ Add Education</Btn>
    </Card>
  )
}

// ── Skills ────────────────────────────────────────────────────────────────────
export function SkillsForm({ data, onChange }) {
  const [input, setInput] = useState('')

  function add() {
    const s = input.trim()
    if (s && !data.includes(s)) { onChange([...data, s]); setInput('') }
  }
  function onKey(e) { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() } }

  const suggestions = ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB',
    'PostgreSQL', 'Git', 'Docker', 'AWS', 'Tailwind CSS', 'Next.js', 'Express.js', 'Java', 'C++']
    .filter(s => !data.includes(s))

  return (
    <Card>
      <SectionHeader icon="🛠️" title="Skills" subtitle="Type and press Enter or comma to add" />
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <Input
          value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
          placeholder="e.g. React, Node.js, Python…" style={{ flex:1 }}
        />
        <Btn onClick={add} style={{ flexShrink:0 }}>Add</Btn>
      </div>

      {data.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:14 }}>
          {data.map(s => <Tag key={s} label={s} onRemove={()=>onChange(data.filter(x=>x!==s))} />)}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <p style={{ fontSize:11, color:'var(--text3)', marginBottom:7 }}>Suggestions:</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {suggestions.slice(0,8).map(s => (
              <button key={s} onClick={()=>onChange([...data,s])} style={{
                padding:'3px 10px', borderRadius:99, fontSize:11,
                border:'1px dashed var(--border2)', background:'transparent',
                color:'var(--text3)', cursor:'pointer',
                transition:'all var(--transition)',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--sky)';e.currentTarget.style.color='var(--sky)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text3)'}}
              >+ {s}</button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

// ── Projects ──────────────────────────────────────────────────────────────────
export function ProjectsForm({ data, onChange }) {
  function add()        { onChange([...data, { id:uid(), name:'', description:'', tech:'', github:'', live:'' }]) }
  function remove(id)   { onChange(data.filter(p => p.id !== id)) }
  function update(id,k,v){ onChange(data.map(p => p.id===id ? {...p,[k]:v} : p)) }

  return (
    <Card>
      <SectionHeader icon="🚀" title="Projects" subtitle="Showcase your best work — most impactful first" />
      {data.length === 0 && (
        <div style={{ textAlign:'center', padding:'20px 0', color:'var(--text3)', fontSize:13 }}>
          Projects are the #1 differentiator for freshers. Add at least one.
        </div>
      )}
      {data.map((p, i) => (
        <div key={p.id} style={{ marginBottom:16 }}>
          {i > 0 && <Divider />}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:600, color:'var(--text3)' }}>Project #{i+1}</span>
            <Btn size="sm" variant="danger" onClick={()=>remove(p.id)}>Remove</Btn>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="form-grid">
              <Input label="Project Name" value={p.name} onChange={e=>update(p.id,'name',e.target.value)} placeholder="Portfolio Website" />
              <Input label="Technologies Used" value={p.tech} onChange={e=>update(p.id,'tech',e.target.value)} placeholder="React, Node.js, MongoDB" />
            </div>
            <Textarea label="Description" rows={3} value={p.description}
              onChange={e=>update(p.id,'description',e.target.value)}
              placeholder="Built a full-stack portfolio website with dark mode, contact form, and project showcase. Implemented JWT authentication and deployed on Vercel." />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="form-grid">
              <Input label="GitHub Link" value={p.github} onChange={e=>update(p.id,'github',e.target.value)} placeholder="github.com/user/project" />
              <Input label="Live Link" value={p.live} onChange={e=>update(p.id,'live',e.target.value)} placeholder="project.vercel.app" />
            </div>
          </div>
        </div>
      ))}
      <Btn variant="ghost" size="sm" onClick={add} style={{ marginTop:4 }}>+ Add Project</Btn>
    </Card>
  )
}

// ── Experience ────────────────────────────────────────────────────────────────
export function ExperienceForm({ data, onChange }) {
  function add()         { onChange([...data, { id:uid(), company:'', role:'', duration:'', description:'' }]) }
  function remove(id)    { onChange(data.filter(e => e.id !== id)) }
  function update(id,k,v){ onChange(data.map(e => e.id===id ? {...e,[k]:v} : e)) }

  return (
    <Card>
      <SectionHeader icon="💼" title="Work Experience" subtitle="Internships count too — be specific about impact" />
      {data.length === 0 && (
        <div style={{ textAlign:'center', padding:'20px 0', color:'var(--text3)', fontSize:13 }}>
          No experience yet? Add internships, freelance projects, or part-time work.
        </div>
      )}
      {data.map((ex, i) => (
        <div key={ex.id} style={{ marginBottom:16 }}>
          {i > 0 && <Divider />}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:600, color:'var(--text3)' }}>Experience #{i+1}</span>
            <Btn size="sm" variant="danger" onClick={()=>remove(ex.id)}>Remove</Btn>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }} className="form-grid">
              <Input label="Company" value={ex.company} onChange={e=>update(ex.id,'company',e.target.value)} placeholder="Google, Startup XYZ" />
              <Input label="Role / Position" value={ex.role} onChange={e=>update(ex.id,'role',e.target.value)} placeholder="Frontend Developer Intern" />
            </div>
            <Input label="Duration" value={ex.duration} onChange={e=>update(ex.id,'duration',e.target.value)} placeholder="June 2024 – Aug 2024" />
            <Textarea label="Description" rows={3} value={ex.description}
              onChange={e=>update(ex.id,'description',e.target.value)}
              placeholder="• Developed 3 reusable React components used across 5 product pages&#10;• Reduced page load time by 40% through lazy loading and code splitting&#10;• Collaborated with design team to implement pixel-perfect UI" />
          </div>
        </div>
      ))}
      <Btn variant="ghost" size="sm" onClick={add} style={{ marginTop:4 }}>+ Add Experience</Btn>
    </Card>
  )
}

// ── Achievements ──────────────────────────────────────────────────────────────
export function AchievementsForm({ data, onChange }) {
  return (
    <Card>
      <SectionHeader icon="🏆" title="Achievements & Certifications" subtitle="Hackathons, courses, awards, publications" />
      <Textarea
        value={data}
        onChange={e => onChange(e.target.value)}
        rows={5}
        placeholder="• AWS Certified Cloud Practitioner (2024)&#10;• Winner — HackIndia 2024 (1st place out of 200 teams)&#10;• Meta Frontend Developer Certificate — Coursera (2023)&#10;• Published paper on ML-based fraud detection — IJCSE Vol. 12"
      />
      <p style={{ fontSize:11, color:'var(--text3)', marginTop:6 }}>
        Use bullet points (•) for each item. Each line becomes a separate point on your resume.
      </p>
    </Card>
  )
}
