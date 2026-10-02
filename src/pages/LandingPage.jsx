import { useState } from 'react'
import { ArrowDownRight, ArrowRight, BarChart3, Check, ChevronRight, Cloud, Code2, Headphones, Layers3, Menu, Moon, PenTool, ShieldCheck, Smartphone, Sparkles, Sun, X } from 'lucide-react'
import { useData } from '../hooks/useData'

const serviceIcons = { code: Code2, smartphone: Smartphone, 'pen-tool': PenTool, cloud: Cloud }

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="NovaTech bosh sahifa"><span className="brand-symbol">N</span><span>Nova<span>Tech</span></span></a>
}

function PreviewChart() {
  return <div className="preview-chart" aria-label="Daromad o‘sishi grafigi"><svg viewBox="0 0 460 150" role="img" aria-label="Oxirgi 6 oydagi o‘sish"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#38d6c0" stopOpacity=".28" /><stop offset="100%" stopColor="#38d6c0" stopOpacity="0" /></linearGradient></defs><path d="M0 118 C35 110 42 90 77 98 S128 75 155 83 S207 58 231 68 S271 46 305 54 S354 25 382 34 S426 18 460 7 V150 H0Z" fill="url(#chartFill)"/><path d="M0 118 C35 110 42 90 77 98 S128 75 155 83 S207 58 231 68 S271 46 305 54 S354 25 382 34 S426 18 460 7" fill="none" stroke="#42d6c2" strokeWidth="3" strokeLinecap="round"/><circle cx="382" cy="34" r="5" fill="#42d6c2" stroke="#0b1925" strokeWidth="3" /></svg><div className="preview-months"><span>May</span><span>Jun</span><span>Jul</span><span>Avg</span><span>Sen</span><span>Okt</span></div></div>
}

export default function LandingPage({ onLogin }) {
  const { data, setTheme, notify, addRecord } = useData()
  const [menuOpen, setMenuOpen] = useState(false)
  const [contact, setContact] = useState({ name: '', email: '', message: '' })

  function submitContact(event) {
    event.preventDefault()
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) return
    addRecord('messages', { ...contact, id: `M-${Date.now()}`, time: new Date().toLocaleString('uz-UZ') })
    notify('Xabaringiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.')
    setContact({ name: '', email: '', message: '' })
  }

  return (
    <div className="landing-page" id="top">
      <div className="landing-orbit orbit-one" /><div className="landing-orbit orbit-two" />
      <header className="public-header">
        <div className="public-nav shell">
          <Brand />
          <button className="icon-button mobile-nav-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Navigatsiyani ochish">{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Asosiy navigatsiya">
            <a href="#top" onClick={() => setMenuOpen(false)}>Bosh sahifa</a><a href="#services" onClick={() => setMenuOpen(false)}>Xizmatlar</a><a href="#about" onClick={() => setMenuOpen(false)}>Biz haqimizda</a><a href="#advantages" onClick={() => setMenuOpen(false)}>Afzalliklar</a><a href="#contact" onClick={() => setMenuOpen(false)}>Aloqa</a>
          </nav>
          <div className="nav-actions"><button className="icon-button theme-toggle" onClick={() => setTheme(data.theme === 'dark' ? 'light' : 'dark')} aria-label="Rang rejimini almashtirish">{data.theme === 'dark' ? <Sun /> : <Moon />}</button><button className="button button-primary button-small" onClick={onLogin}>Kirish <ArrowRight size={15} /></button></div>
        </div>
      </header>

      <main>
        <section className="hero-section shell">
          <div className="hero-copy reveal-up">
            <div className="eyebrow"><span className="eyebrow-pulse" /> Raqamli o‘sish uchun texnologiya</div>
            <h1>{data.site.headline}</h1>
            <p className="hero-description">{data.site.description}</p>
            <div className="hero-actions"><a className="button button-primary" href="#contact">Loyihani boshlash <ArrowRight size={17} /></a><a className="button button-quiet" href="#services">Xizmatlarimiz <ArrowDownRight size={16} /></a></div>
            <div className="hero-proof"><div className="avatar-stack"><span>MK</span><span>JA</span><span>DS</span><span>+</span></div><div><strong>Bizneslar bizga ishonadi</strong><small>4.9/5 mijozlar bahosi</small></div><div className="proof-stars">★★★★★</div></div>
          </div>
          <div className="hero-visual reveal-up delay-one">
            <div className="visual-glow" />
            <div className="dashboard-preview">
              <div className="preview-topline"><div className="preview-brand"><span className="brand-symbol">N</span><strong>NovaTech</strong></div><span className="preview-period">Oxirgi 6 oy <ChevronRight size={13} /></span></div>
              <div className="preview-title-row"><div><small>Umumiy daromad</small><strong>124,850,000 <span>UZS</span></strong></div><span className="change-pill"><ArrowDownRight size={13} /> 18.6%</span></div>
              <PreviewChart />
              <div className="preview-bottom"><div><span className="preview-icon mint"><Layers3 size={15} /></span><div><small>Faol loyihalar</small><strong>24</strong></div></div><div><span className="preview-icon blue"><BarChart3 size={15} /></span><div><small>O‘sish</small><strong>+32.8%</strong></div></div></div>
            </div>
            <div className="floating-card float-revenue"><span className="float-icon"><Sparkles size={17} /></span><span><small>O‘sish ko‘rsatkichi</small><strong>+32.8%</strong></span><span className="float-bars"><i /><i /><i /><i /><i /><i /></span></div>
            <div className="floating-card float-secure"><span className="secure-icon"><ShieldCheck size={17} /></span><span><strong>Ma’lumotlar himoyalangan</strong><small>Faol himoya · 24/7</small></span><Check size={15} className="secure-check" /></div>
            <div className="visual-caption"><span className="live-dot" /> Real vaqtda biznes tahlili</div>
          </div>
        </section>

        <section className="trust-strip shell" id="advantages"><span className="trust-label">Biznesingiz o‘sishining ishonchli hamkori</span><div className="trust-logos"><span><Layers3 size={15} /> atlas</span><span><Sparkles size={15} /> finbridge</span><span><Cloud size={15} /> greenmarket</span><span><BarChart3 size={15} /> northstar</span></div></section>

        <section className="stats-section shell" aria-label="NovaTech statistikasi">{data.stats.map((stat, index) => { const Icon = [BarChart3, Layers3, Sparkles, Headphones][index]; return <div className="public-stat" key={stat.label}><span className="public-stat-icon"><Icon size={18} /></span><div><strong>{stat.value.toLocaleString('uz-UZ')}{stat.suffix}</strong><span>{stat.label}</span></div></div> })}</section>

        <section className="section-block shell" id="services">
          <div className="section-heading"><div><span className="section-kicker">Nima taklif qilamiz</span><h2>O‘sish uchun kerakli <span>texnologiyalar.</span></h2><p>G‘oyadan ishga tushirishgacha, biznesingizga mos yechimlar bir joyda.</p></div><a className="text-link" href="#contact">Barcha xizmatlar <ArrowRight size={16} /></a></div>
          <div className="service-grid">{data.services.map((service, index) => { const Icon = serviceIcons[service.icon] || Code2; return <article className="service-card" key={service.id}><div className={`service-icon service-color-${index % 4}`}><Icon size={20} /></div><div className="service-card-number">0{index + 1}</div><h3>{service.title}</h3><p>{service.description}</p><a href="#contact" className="service-link">Batafsil <ArrowRight size={15} /></a></article> })}</div>
        </section>

        <section className="about-section" id="about"><div className="shell about-grid"><div className="about-visual"><div className="about-grid-pattern" /><div className="about-orbit"><span /><span /><span /><div className="orbit-center"><span className="brand-symbol">N</span></div></div><div className="about-tag"><ShieldCheck size={15} /> Ishonchli hamkorlik</div></div><div className="about-copy"><span className="section-kicker">Biz haqimizda</span><h2>Murakkab jarayonlarni <span>sodda qilamiz.</span></h2><p>NovaTech — texnologiyani biznes maqsadlariga xizmat qildirish uchun yaratilgan hamkor. Biz yechimlarni chiroyli ko‘rinishi uchungina emas, kundalik ishda natija berishi uchun quramiz.</p><div className="about-points"><div><Check size={16} /><span><strong>Strategik yondashuv</strong><small>Har bir yechim aniq biznes maqsadiga bog‘langan.</small></span></div><div><Check size={16} /><span><strong>Hamkorlikka tayangan jarayon</strong><small>Ochiq muloqot va o‘lchanadigan natijalar.</small></span></div></div><a href="#contact" className="button button-outline">Jamoa bilan tanishing <ArrowRight size={16} /></a></div></div></section>

        <section className="section-block shell testimonial-section"><div className="section-heading"><div><span className="section-kicker">Mijozlar fikri</span><h2>Natijani ular <span>yaxshiroq aytadi.</span></h2></div><div className="testimonial-index">01 <span>/</span> 03</div></div><div className="testimonial-grid">{data.testimonials.map((item) => <article className="testimonial-card" key={item.name}><div className="testimonial-stars">★★★★★</div><blockquote>“{item.quote}”</blockquote><div className="testimonial-author"><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.title}</small></div></div></article>)}</div></section>

        <section className="contact-section" id="contact"><div className="shell contact-grid"><div className="contact-copy"><span className="section-kicker">Keyingi qadam</span><h2>G‘oyangizni birga <span>amalga oshiramiz.</span></h2><p>Loyihangiz haqida qisqacha yozing. Jamoamiz bir ish kuni ichida sizga javob beradi.</p><div className="contact-details"><a href={`tel:${data.site.phone}`}><span className="contact-detail-icon"><Headphones size={17} /></span><span><small>Telefon</small><strong>{data.site.phone}</strong></span></a><a href={`mailto:${data.site.email}`}><span className="contact-detail-icon"><Code2 size={17} /></span><span><small>Email</small><strong>{data.site.email}</strong></span></a><div><span className="contact-detail-icon"><Cloud size={17} /></span><span><small>Manzil</small><strong>{data.site.address}</strong></span></div></div><a href={`https://t.me/${data.site.telegram.replace('@', '')}`} target="_blank" rel="noreferrer" className="telegram-link">Telegram orqali yozing <ArrowRight size={15} /></a></div><form className="contact-form" onSubmit={submitContact}><div className="form-heading"><strong>Suhbatni boshlaymiz</strong><span>Odatda 1 ish kunida javob beramiz</span></div><label>Ismingiz<input value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} placeholder="Ism va familiya" required /></label><label>Email manzilingiz<input type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} placeholder="name@company.uz" required /></label><label>Loyiha haqida<textarea rows="3" value={contact.message} onChange={(event) => setContact({ ...contact, message: event.target.value })} placeholder="Qanday yordam bera olamiz?" required /></label><button className="button button-primary form-submit" type="submit">Xabar yuborish <ArrowRight size={16} /></button><small className="form-privacy"><ShieldCheck size={13} /> Ma’lumotlaringiz xavfsiz saqlanadi.</small></form></div></section>
      </main>

      <footer className="public-footer"><div className="shell footer-main"><Brand /><p>Biznes uchun puxta o‘ylangan raqamli yechimlar.</p><nav><a href="#services">Xizmatlar</a><a href="#about">Biz haqimizda</a><a href="#contact">Aloqa</a><button onClick={onLogin}>Admin panel <ArrowRight size={14} /></button></nav><span className="footer-social"><a href={`https://t.me/${data.site.telegram.replace('@', '')}`} aria-label="Telegram">tg</a><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a></span></div><div className="shell footer-bottom"><span>© 2026 NovaTech. Barcha huquqlar himoyalangan.</span><span>O‘zbekistonda ishlab chiqilgan <span className="footer-heart">●</span></span></div></footer>
    </div>
  )
}