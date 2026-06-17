// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({ label, hint, error, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {label && (
        <label style={{ fontSize:11, fontWeight:600, color:'var(--text2)',
          textTransform:'uppercase', letterSpacing:'0.06em' }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          padding:'9px 12px', borderRadius:'var(--radius-sm)',
          border:`1px solid ${error ? 'var(--rose)' : 'var(--border2)'}`,
          background:'var(--surface2)', color:'var(--text)',
          fontSize:13, width:'100%', outline:'none',
          transition:'border-color var(--transition), box-shadow var(--transition)',
          ...props.style,
        }}
        onFocus={e => { e.target.style.borderColor='var(--sky)'; e.target.style.boxShadow='0 0 0 3px var(--sky-glow)' }}
        onBlur={e  => { e.target.style.borderColor=error?'var(--rose)':'var(--border2)'; e.target.style.boxShadow='none' }}
      />
      {hint  && <span style={{ fontSize:11, color:'var(--text3)' }}>{hint}</span>}
      {error && <span style={{ fontSize:11, color:'var(--rose)'  }}>{error}</span>}
    </div>
  )
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export function Textarea({ label, hint, rows=4, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {label && (
        <label style={{ fontSize:11, fontWeight:600, color:'var(--text2)',
          textTransform:'uppercase', letterSpacing:'0.06em' }}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        {...props}
        style={{
          padding:'9px 12px', borderRadius:'var(--radius-sm)',
          border:'1px solid var(--border2)',
          background:'var(--surface2)', color:'var(--text)',
          fontSize:13, width:'100%', outline:'none', resize:'vertical',
          transition:'border-color var(--transition), box-shadow var(--transition)',
          ...props.style,
        }}
        onFocus={e => { e.target.style.borderColor='var(--sky)'; e.target.style.boxShadow='0 0 0 3px var(--sky-glow)' }}
        onBlur={e  => { e.target.style.borderColor='var(--border2)'; e.target.style.boxShadow='none' }}
      />
      {hint && <span style={{ fontSize:11, color:'var(--text3)' }}>{hint}</span>}
    </div>
  )
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Btn({ variant='primary', size='md', children, style:s, ...props }) {
  const base = {
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    gap:6, borderRadius:'var(--radius-sm)', fontWeight:600,
    border:'none', transition:'all var(--transition)', fontFamily:'inherit',
  }
  const sizes = { sm:{ padding:'5px 12px', fontSize:11 }, md:{ padding:'8px 18px', fontSize:13 }, lg:{ padding:'11px 26px', fontSize:14 } }
  const variants = {
    primary:  { background:'var(--sky-dark)', color:'#fff' },
    ghost:    { background:'transparent', color:'var(--text2)', border:'1px solid var(--border2)' },
    danger:   { background:'transparent', color:'var(--rose)', border:'1px solid var(--rose)' },
    success:  { background:'#059669', color:'#fff' },
  }
  return (
    <button
      {...props}
      style={{ ...base, ...sizes[size], ...variants[variant], ...s }}
      onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='translateY(-1px)' }}
      onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)' }}
    >
      {children}
    </button>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style:s }) {
  return (
    <div style={{
      background:'var(--surface)', border:'1px solid var(--border)',
      borderRadius:'var(--radius)', padding:'20px 22px',
      ...s,
    }}>{children}</div>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
        <span style={{ fontSize:16 }}>{icon}</span>
        <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>{title}</h3>
      </div>
      {subtitle && <p style={{ fontSize:12, color:'var(--text3)', marginLeft:24 }}>{subtitle}</p>}
    </div>
  )
}

// ─── Tag (skill chip) ─────────────────────────────────────────────────────────
export function Tag({ label, onRemove }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5,
      padding:'4px 10px', borderRadius:99,
      background:'var(--surface3)', color:'var(--sky)',
      border:'1px solid var(--border2)', fontSize:12, fontWeight:500,
    }}>
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ background:'none', border:'none', color:'var(--text3)',
            fontSize:13, lineHeight:1, padding:0, display:'flex' }}
        >×</button>
      )}
    </span>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider() {
  return <div style={{ height:1, background:'var(--border)', margin:'6px 0' }} />
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ msg, onDone }) {
  return (
    <div
      className="scale-in"
      style={{
        position:'fixed', bottom:28, right:28, zIndex:999,
        background:'var(--surface3)', border:'1px solid var(--emerald)',
        borderRadius:'var(--radius)', padding:'12px 20px',
        color:'var(--emerald)', fontSize:13, fontWeight:600,
        boxShadow:'var(--shadow-lg)',
        display:'flex', alignItems:'center', gap:10,
      }}
    >
      <span>✓</span> {msg}
    </div>
  )
}
