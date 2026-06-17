import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_RESUME } from './utils/index.js'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScorePanel from './components/ScorePanel'
import PreviewPanel from './components/preview'
import {
  PersonalForm, SummaryForm, EducationForm,
  SkillsForm, ProjectsForm, ExperienceForm, AchievementsForm
} from './components/form'
import { Toast } from './components/ui'

const TABS = [
  { id:'personal',     label:'Personal',    icon:'👤' },
  { id:'summary',      label:'Summary',     icon:'✍️' },
  { id:'education',    label:'Education',   icon:'🎓' },
  { id:'skills',       label:'Skills',      icon:'🛠️' },
  { id:'projects',     label:'Projects',    icon:'🚀' },
  { id:'experience',   label:'Experience',  icon:'💼' },
  { id:'achievements', label:'Achievements',icon:'🏆' },
]

export default function App() {
  const [resume, setResume]     = useLocalStorage('rfp-resume', DEFAULT_RESUME)
  const [template, setTemplate] = useLocalStorage('rfp-template', 'modern')
  const [darkMode, setDarkMode] = useLocalStorage('rfp-dark', true)
  const [activeTab, setActiveTab] = useState('personal')
  const [showHero, setShowHero]   = useState(true)
  const [exporting, setExporting] = useState(false)
  const [toast, setToast]         = useState(null)
  const [mobileView, setMobileView] = useState('form') // 'form' | 'preview'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function update(section, value) {
    setResume(r => ({ ...r, [section]: value }))
  }

  async function handleExport() {
    setExporting(true)
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default
      const el = document.getElementById('resume-preview')
      if (!el) { alert('Preview not found. Make sure the resume preview is visible.'); return }

      await html2pdf().set({
        margin:       [10, 10, 10, 10],
        filename:     `${resume.personal.name || 'resume'}-resume.pdf`,
        image:        { type:'jpeg', quality:0.98 },
        html2canvas:  { scale:2, useCORS:true, backgroundColor:'#ffffff' },
        jsPDF:        { unit:'mm', format:'a4', orientation:'portrait' },
      }).from(el).save()

      showToast('PDF downloaded successfully!')
    } catch (e) {
      console.error(e)
      alert('PDF generation failed. Try switching to Preview tab first.')
    } finally {
      setExporting(false)
    }
  }

  if (showHero) {
    return (
      <div style={{ minHeight:'100vh' }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onExport={handleExport} exporting={exporting} />
        <Hero onStart={() => setShowHero(false)} />
        {/* Footer */}
        <footer style={{ textAlign:'center', padding:'24px', borderTop:'1px solid var(--border)',
          background:'var(--surface)', fontSize:12, color:'var(--text3)' }}>
          <span style={{ color:'var(--text2)' }}>Shivansh Saxena</span>
          {' · '}
          <a href="mailto:shivanshsaxena127@gmail.com" style={{ color:'var(--sky)' }}>
            shivanshsaxena127@gmail.com
          </a>
          {' · '}
          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer"
            style={{ color:'var(--violet)', fontWeight:600 }}>Built for Digital Heroes</a>
        </footer>
        {toast && <Toast msg={toast} />}
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onExport={handleExport} exporting={exporting} />

      <div style={{ maxWidth:1400, margin:'0 auto', width:'100%', padding:'20px 20px 40px', flex:1 }}>

        {/* Mobile toggle */}
        <div style={{ display:'none', marginBottom:14 }} className="mobile-toggle">
          {['form','preview'].map(v => (
            <button key={v} onClick={() => setMobileView(v)} style={{
              flex:1, padding:'9px', borderRadius:7, fontWeight:600, fontSize:12,
              border:`1px solid ${mobileView===v ? 'var(--sky)' : 'var(--border2)'}`,
              background: mobileView===v ? 'var(--sky-glow)' : 'var(--surface)',
              color: mobileView===v ? 'var(--sky)' : 'var(--text2)',
              textTransform:'capitalize',
            }}>{v === 'form' ? '✏️ Edit' : '👁 Preview'}</button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'260px 1fr 260px', gap:18, alignItems:'start' }} className="main-grid">

          {/* LEFT — tabs + score */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }} className={`left-col ${mobileView !== 'form' ? 'hide-mobile' : ''}`}>
            {/* Tab nav */}
            <div style={{ background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', overflow:'hidden' }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  width:'100%', padding:'11px 16px', textAlign:'left',
                  display:'flex', alignItems:'center', gap:10,
                  border:'none', borderBottom:'1px solid var(--border)',
                  background: activeTab===t.id ? 'var(--sky-glow)' : 'transparent',
                  color: activeTab===t.id ? 'var(--sky)' : 'var(--text2)',
                  fontSize:13, fontWeight: activeTab===t.id ? 600 : 400,
                  transition:'all var(--transition)', cursor:'pointer',
                }}>
                  <span>{t.icon}</span>
                  {t.label}
                  {activeTab===t.id && (
                    <div style={{ marginLeft:'auto', width:4, height:4, borderRadius:'50%', background:'var(--sky)' }} />
                  )}
                </button>
              ))}
            </div>
            <ScorePanel resume={resume} />
          </div>

          {/* CENTER — active form */}
          <div className={mobileView !== 'form' ? 'hide-mobile' : ''}>
            <div className="fade-in" key={activeTab}>
              {activeTab === 'personal'     && <PersonalForm     data={resume.personal}     onChange={v => update('personal', v)} />}
              {activeTab === 'summary'      && <SummaryForm      data={resume.summary}      onChange={v => update('summary', v)} />}
              {activeTab === 'education'    && <EducationForm    data={resume.education}    onChange={v => update('education', v)} />}
              {activeTab === 'skills'       && <SkillsForm       data={resume.skills}       onChange={v => update('skills', v)} />}
              {activeTab === 'projects'     && <ProjectsForm     data={resume.projects}     onChange={v => update('projects', v)} />}
              {activeTab === 'experience'   && <ExperienceForm   data={resume.experience}   onChange={v => update('experience', v)} />}
              {activeTab === 'achievements' && <AchievementsForm data={resume.achievements} onChange={v => update('achievements', v)} />}
            </div>
          </div>

          {/* RIGHT — preview */}
          <div className={mobileView !== 'preview' ? 'hide-mobile-preview' : ''}>
            <PreviewPanel resume={resume} template={template} setTemplate={setTemplate} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign:'center', padding:'20px 24px', borderTop:'1px solid var(--border)',
        background:'var(--surface)', fontSize:12, color:'var(--text3)' }}>
        <span style={{ color:'var(--text2)' }}>Shivansh Saxena</span>
        {' · '}
        <a href="mailto:shivanshsaxena127@gmail.com" style={{ color:'var(--sky)', textDecoration:'none' }}>
          shivanshsaxena127@gmail.com
        </a>
        {' · '}
        <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer"
          style={{ color:'var(--violet)', fontWeight:700, textDecoration:'none' }}>
          Built for Digital Heroes
        </a>
      </footer>

      {toast && <Toast msg={toast} />}

      <style>{`
        @media (max-width: 1024px) {
          .main-grid { grid-template-columns: 220px 1fr !important; }
          .hide-mobile-preview { display: none !important; }
        }
        @media (max-width: 700px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .mobile-toggle { display: flex !important; gap: 8px; }
          .hide-mobile { display: none !important; }
          .hide-mobile-preview { display: none; }
          .hide-mobile-preview.show { display: block !important; }
          .left-col { flex-direction: row !important; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  )
}
