// ─── Default empty resume ─────────────────────────────────────────────────────
export const DEFAULT_RESUME = {
  personal: {
    name: '', email: '', phone: '', location: '',
    linkedin: '', github: '', portfolio: '',
  },
  summary: '',
  education: [],
  skills: [],
  projects: [],
  experience: [],
  achievements: '',
}

// ─── Templates ────────────────────────────────────────────────────────────────
export const TEMPLATES = [
  { id: 'modern',      label: 'Modern Developer',     accent: '#0ea5e9' },
  { id: 'minimal',     label: 'Minimal ATS',          accent: '#374151' },
  { id: 'corporate',   label: 'Professional Corporate', accent: '#7c3aed' },
]

// ─── ID generator ─────────────────────────────────────────────────────────────
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

// ─── Resume score ─────────────────────────────────────────────────────────────
export function calcScore(resume) {
  const checks = [
    { key: 'name',        pass: !!resume.personal.name.trim(),          label: 'Full name added',             weight: 10 },
    { key: 'email',       pass: !!resume.personal.email.trim(),         label: 'Email address added',         weight: 10 },
    { key: 'phone',       pass: !!resume.personal.phone.trim(),         label: 'Phone number added',          weight: 5  },
    { key: 'location',    pass: !!resume.personal.location.trim(),      label: 'Location added',              weight: 5  },
    { key: 'linkedin',    pass: !!resume.personal.linkedin.trim(),      label: 'LinkedIn URL added',          weight: 8  },
    { key: 'github',      pass: !!resume.personal.github.trim(),        label: 'GitHub URL added',            weight: 8  },
    { key: 'summary',     pass: resume.summary.trim().length > 30,      label: 'Professional summary written',weight: 12 },
    { key: 'skills',      pass: resume.skills.length >= 4,              label: '4+ skills added',             weight: 12 },
    { key: 'projects',    pass: resume.projects.length >= 1,            label: 'At least 1 project added',   weight: 15 },
    { key: 'experience',  pass: resume.experience.length >= 1,          label: 'Work experience added',       weight: 10 },
    { key: 'education',   pass: resume.education.length >= 1,           label: 'Education added',             weight: 8  },
    { key: 'achievement', pass: resume.achievements.trim().length > 10, label: 'Achievements/certifications added', weight: 7 },
  ]

  const earned  = checks.reduce((s, c) => s + (c.pass ? c.weight : 0), 0)
  const total   = checks.reduce((s, c) => s + c.weight, 0)
  const score   = Math.round((earned / total) * 100)

  let strength, color
  if      (score >= 85) { strength = 'Excellent'; color = '#34d399' }
  else if (score >= 65) { strength = 'Strong';    color = '#38bdf8' }
  else if (score >= 40) { strength = 'Good';      color = '#fbbf24' }
  else                  { strength = 'Beginner';  color = '#fb7185' }

  const missing = checks.filter(c => !c.pass).map(c => c.label)

  return { score, strength, color, checks, missing }
}

// ─── ATS insights ─────────────────────────────────────────────────────────────
export function atsInsights(resume) {
  return [
    { ok: !!resume.personal.linkedin.trim(), msg: 'Add LinkedIn profile URL',       tip: 'Recruiters verify candidates on LinkedIn. Missing it hurts credibility.' },
    { ok: !!resume.personal.github.trim(),   msg: 'Add GitHub profile URL',         tip: 'Essential for developer roles — lets recruiters see your actual code.' },
    { ok: resume.projects.length >= 1,       msg: 'Add at least one project',       tip: 'Projects are the #1 differentiator for freshers with no experience.' },
    { ok: resume.skills.length >= 5,         msg: 'Add 5+ relevant skills',         tip: 'ATS systems keyword-match your skills against job descriptions.' },
    { ok: resume.summary.trim().length > 50, msg: 'Write a professional summary',   tip: 'A 3-line summary tells recruiters who you are in under 10 seconds.' },
    { ok: resume.experience.length >= 1,     msg: 'Add work/internship experience', tip: 'Even short internships demonstrate real-world exposure.' },
    { ok: resume.achievements.trim().length > 10, msg: 'List certifications',       tip: 'Certifications validate skills independently of experience.' },
    { ok: !!resume.personal.phone.trim(),    msg: 'Add phone number',               tip: 'Recruiters prefer to call directly for initial screening.' },
  ]
}
