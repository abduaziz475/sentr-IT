import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Moon, ShieldCheck, Sun } from 'lucide-react'
import { useData } from '../hooks/useData'

export default function LoginPage({ onBack, onSuccess }) {
  const { data, login, setTheme, notify } = useData()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [remember, setRemember] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    window.setTimeout(() => {
      const valid = login(email, code, remember)
      setSubmitting(false)
      if (!valid) {
        notify('Email yoki access code noto‘g‘ri', 'error')
        return
      }
      notify('Xush kelibsiz. Boshqaruv paneli ochilmoqda.')
      onSuccess()
    }, 360)
  }

  return <main className="login-screen">
    <section className="login-story"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Bosh sahifa</button><div className="login-story-content"><a className="brand brand-light" href="#top" onClick={(event) => { event.preventDefault(); onBack() }}><span className="brand-symbol">N</span><span>Nova<span>Tech</span></span></a><div className="login-story-art"><div className="login-art-ring ring-a" /><div className="login-art-ring ring-b" /><div className="login-art-glow" /><div className="login-art-panel"><div className="art-panel-head"><span className="brand-symbol">N</span><span>Business intelligence</span><span className="live-dot" /></div><div className="art-panel-total"><small>Oylik tushum</small><strong>+32.8%</strong><span>O‘tgan oyga nisbatan</span></div><div className="art-panel-bars">{[34, 50, 42, 67, 48, 76, 61, 91, 73, 100, 82, 116].map((height, index) => <i key={index} style={{ height }} />)}</div><div className="art-panel-footer"><span>Yangi foydalanuvchilar</span><strong>+248</strong></div></div><div className="login-art-float"><ShieldCheck size={16} /><span>Xavfsiz boshqaruv</span><span className="art-float-check">✓</span></div></div><div className="login-story-text"><span className="section-kicker">NovaTech workspace</span><h1>Biznesni boshqarish — <span>aniq va ishonchli.</span></h1><p>Jamoangiz, loyihalaringiz va biznes natijalaringizni bitta xavfsiz makonda boshqaring.</p><div className="login-trust"><span><LockKeyhole size={14} /> Himoyalangan kirish</span><span><span className="live-dot" /> Tizim faol</span></div></div></div><div className="login-story-foot"><span>© 2026 NovaTech</span><span>Yordam: {data.site.email}</span></div></section>
    <section className="login-panel"><div className="login-panel-top"><span className="login-mobile-brand"><span className="brand-symbol">N</span> NovaTech</span><button className="icon-button theme-toggle" onClick={() => setTheme(data.theme === 'dark' ? 'light' : 'dark')} aria-label="Rang rejimini almashtirish">{data.theme === 'dark' ? <Sun /> : <Moon />}</button></div><div className="login-card-wrap"><div className="login-card"><span className="login-card-icon"><LockKeyhole size={20} /></span><span className="section-kicker">Xush kelibsiz</span><h2>Workspace'ga kirish</h2><p className="login-intro">Hisobingiz ma’lumotlarini kiriting.</p><form onSubmit={handleSubmit}><label>Email manzili<div className="input-wrap"><input type="text" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email yoki account ID" required /><span className="input-prefix">@</span></div></label><label>Access code<div className="input-wrap"><input type={showCode ? 'text' : 'password'} autoComplete="current-password" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Kirish kodingiz" required /><button type="button" className="input-action" onClick={() => setShowCode(!showCode)} aria-label={showCode ? 'Kodni yashirish' : 'Kodni ko‘rsatish'}>{showCode ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label><div className="login-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Bu qurilmada eslab qolish</span></label><span className="secure-caption"><ShieldCheck size={13} /> Secure</span></div><button className="button button-primary login-submit" type="submit" disabled={submitting}>{submitting ? <span className="button-spinner" /> : <>Tizimga kirish <ArrowRight size={16} /></>}</button></form><div className="login-separator"><span /> <small>himoyalangan sessiya</small> <span /></div><div className="login-help">Kirishda muammo bormi? <a href={`mailto:${data.site.email}`}>Yordam so‘rash</a></div></div><button className="login-back-mobile" onClick={onBack}><ArrowLeft size={15} /> Bosh sahifaga qaytish</button></div><div className="login-panel-foot"><span>Maxfiylik</span><span>Foydalanish shartlari</span><span>© NovaTech 2026</span></div></section>
  </main>
}