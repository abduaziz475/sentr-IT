import { useMemo, useRef, useState } from 'react'
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BriefcaseBusiness, Check, ChevronDown, CircleDollarSign, Clock3, Database, Download, Eye, FileText, Filter, Globe2, Layers3, Menu, Moon, MoreHorizontal, Plus, Search, ShieldCheck, ShoppingBag, Sun, TrendingUp, Upload, Users, Wallet, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { navTitles } from '../data/navigation'
import { ChannelChart, GrowthChart, OrdersChart, RevenueChart } from '../components/Charts'
import { useData } from '../hooks/useData'

const money = (value) => new Intl.NumberFormat('uz-UZ').format(value || 0) + ' so‘m'
const shortMoney = (value) => `${(value / 1000000).toFixed(1)} mln`
const today = () => new Date().toISOString().slice(0, 10)

function StatCard({ label, value, change, icon: Icon, tone = 'mint', detail }) {
  return <article className="metric-card"><div className="metric-top"><span className={`metric-icon metric-${tone}`}><Icon size={18} /></span><span className={`metric-change ${change?.startsWith('-') ? 'negative' : ''}`}>{change?.startsWith('-') ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{change}</span></div><div className="metric-value">{value}</div><div className="metric-label">{label}</div>{detail && <div className="metric-detail">{detail}</div>}</article>
}

function Panel({ title, subtitle, action, children, className = '' }) {
  return <section className={`data-panel ${className}`}><div className="panel-heading"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>
}

function EmptyState({ title, description }) {
  return <div className="empty-state"><span><FileText size={19} /></span><strong>{title}</strong><p>{description}</p></div>
}

function SecuritySettings({ role, onLogout }) {
  const { data, updateCredentials, notify } = useData()
  const account = data.credentials[role]
  const [currentCode, setCurrentCode] = useState('')
  const [newCode, setNewCode] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const [newEmail, setNewEmail] = useState(account.email)
  const [showCodes, setShowCodes] = useState(false)

  function saveSecurity(event) {
    event.preventDefault()
    if (currentCode !== account.code) return notify('Joriy access code noto‘g‘ri', 'error')
    if (newCode && newCode.length < 6) return notify('Yangi kod kamida 6 belgidan iborat bo‘lsin', 'error')
    if (newCode && newCode !== confirmCode) return notify('Yangi kodlar mos kelmadi', 'error')
    if (!newCode && newEmail.trim() === account.email) return notify('Email yoki yangi access code kiriting', 'error')
    updateCredentials(role, { ...(newCode ? { code: newCode } : {}), email: newEmail.trim() })
    setCurrentCode(''); setNewCode(''); setConfirmCode('')
    notify('Xavfsizlik ma’lumotlari yangilandi')
  }

  return <div className="security-layout"><div className="security-main"><Panel title="Kirish ma’lumotlari" subtitle="Email va access code o‘zgarishlari darhol saqlanadi."><form className="form-grid security-form" onSubmit={saveSecurity}><label className="field-label field-span">Joriy access code<div className="input-wrap"><input type={showCodes ? 'text' : 'password'} value={currentCode} onChange={(event) => setCurrentCode(event.target.value)} autoComplete="current-password" required placeholder="Joriy kodingiz" /><button type="button" className="input-action" onClick={() => setShowCodes(!showCodes)} aria-label="Kod ko‘rinishini almashtirish"><Eye size={16} /></button></div></label><label className="field-label">Yangi email<input value={newEmail} onChange={(event) => setNewEmail(event.target.value)} autoComplete="email" /></label><label className="field-label">Yangi access code<div className="input-wrap"><input type={showCodes ? 'text' : 'password'} value={newCode} onChange={(event) => setNewCode(event.target.value)} autoComplete="new-password" placeholder="Kamida 6 belgi" /><button type="button" className="input-action" onClick={() => setShowCodes(!showCodes)} aria-label="Kod ko‘rinishini almashtirish"><Eye size={16} /></button></div></label><label className="field-label field-span">Yangi kodni tasdiqlang<input type={showCodes ? 'text' : 'password'} value={confirmCode} onChange={(event) => setConfirmCode(event.target.value)} autoComplete="new-password" placeholder="Yangi kodni qayta kiriting" /></label><div className="form-footer field-span"><span><ShieldCheck size={15} /> Ma’lumotlaringiz xavfsiz saqlanadi</span><button className="button button-primary" type="submit">O‘zgarishlarni saqlash <ArrowRight size={15} /></button></div></form></Panel>
      <Panel title="Faol sessiyalar" subtitle="Hisobingizga ulangan qurilmalar."><div className="session-row"><span className="session-device"><span className="session-device-icon">W</span><span><strong>Windows · Chrome</strong><small>Joriy sessiya · Toshkent, UZ</small></span></span><span className="session-status"><i /> Faol</span></div><div className="session-row"><span className="session-device"><span className="session-device-icon">M</span><span><strong>Mobil qurilma</strong><small>Oxirgi faollik: 2 kun oldin</small></span></span><span className="session-location">Toshkent</span></div><button className="button button-outline button-danger" onClick={() => { notify('Barcha sessiyalardan chiqildi'); onLogout() }}>Barcha sessiyalardan chiqish <ArrowRight size={15} /></button></Panel></div>
    <div className="security-side"><Panel title="Hisob holati"><div className="security-score"><span className="security-score-icon"><ShieldCheck size={22} /></span><strong>Yaxshi himoyalangan</strong><p>Asosiy xavfsizlik sozlamalari faol.</p><div className="security-meter"><i /></div><small>Himoya darajasi <b>Yuqori</b></small></div><div className="security-meta"><span>Rol</span><strong>{account.role}</strong><span>Oxirgi kirish</span><strong>{account.lastLogin}</strong><span>Access code</span><strong>•••••••••</strong></div></Panel><Panel title="Oxirgi kirishlar"><div className="login-history"><div><span className="history-dot" /><span><strong>Windows · Chrome</strong><small>{account.lastLogin} · Toshkent</small></span><Check size={14} /></div><div><span className="history-dot muted" /><span><strong>Mobil qurilma</strong><small>2 kun oldin · Toshkent</small></span><Check size={14} /></div></div></Panel></div></div>
}

function AdminManagement() {
  const { data, updateCredentials, notify } = useData()
  const [email, setEmail] = useState(data.credentials.admin.email)
  const admin = data.credentials.admin
  return <div className="admin-manage-grid"><Panel title="Admin account" subtitle="User Adminning kirish huquqi va hisob ma’lumotlari."><div className="account-profile"><span className="account-avatar">A</span><div><strong>{admin.name}</strong><small>{admin.role} · {admin.active ? 'Faol' : 'Faolsiz'}</small></div><span className={`status-pill ${admin.active ? 'status-active' : 'status-paused'}`}>{admin.active ? 'Faol' : 'Faolsiz'}</span></div><div className="account-details"><div><span>Email</span><strong>{admin.email}</strong></div><div><span>Oxirgi kirish</span><strong>{admin.lastLogin}</strong></div><div><span>Ruxsat darajasi</span><strong>Admin · cheklangan</strong></div><div><span>Access code</span><strong>•••••••••</strong></div></div><div className="account-actions"><button className="button button-outline" onClick={() => { updateCredentials('admin', { active: !admin.active }); notify(admin.active ? 'Admin hisobi faolsizlantirildi' : 'Admin hisobi faollashtirildi') }}>{admin.active ? 'Hisobni faolsizlantirish' : 'Hisobni faollashtirish'}</button><button className="button button-outline" onClick={() => { updateCredentials('admin', { code: '123456789' }); notify('Admin access code standart kodga qaytarildi') }}>Kodni standart holatga qaytarish</button></div></Panel><Panel title="Admin emailini o‘zgartirish" subtitle="Yangi email keyingi login uchun faol bo‘ladi."><form className="inline-edit-form" onSubmit={(event) => { event.preventDefault(); if (!email.trim()) return; updateCredentials('admin', { email: email.trim() }); notify('Admin emaili yangilandi') }}><label className="field-label">Hisob emaili<input value={email} onChange={(event) => setEmail(event.target.value)} required /></label><div className="security-note"><ShieldCheck size={15} /><span>Director tomonidan boshqariladi. Admin bu maydonni o‘zgartira olmaydi.</span></div><button className="button button-primary" type="submit">Emailni saqlash <ArrowRight size={15} /></button></form></Panel></div>
}

function WebsiteEditor() {
  const { data, updateSite, updateData, notify } = useData()
  const [site, setSite] = useState(data.site)
  const [stats, setStats] = useState(data.stats)
  function save(event) { event.preventDefault(); updateSite(site); updateData({ stats }); notify('Sayt kontenti va statistikalar yangilandi') }
  return <form onSubmit={save} className="website-editor"><Panel title="Bosh sahifa kontenti" subtitle="Landing sahifada ko‘rinadigan asosiy matnlarni tahrirlang."><div className="form-grid"><label className="field-label field-span">Asosiy sarlavha<input value={site.headline} onChange={(event) => setSite({ ...site, headline: event.target.value })} required /></label><label className="field-label field-span">Qisqa tavsif<textarea rows="3" value={site.description} onChange={(event) => setSite({ ...site, description: event.target.value })} required /></label><label className="field-label">Telefon<input value={site.phone} onChange={(event) => setSite({ ...site, phone: event.target.value })} /></label><label className="field-label">Aloqa emaili<input value={site.email} onChange={(event) => setSite({ ...site, email: event.target.value })} /></label><label className="field-label">Telegram<input value={site.telegram} onChange={(event) => setSite({ ...site, telegram: event.target.value })} /></label><label className="field-label">Manzil<input value={site.address} onChange={(event) => setSite({ ...site, address: event.target.value })} /></label></div></Panel><Panel title="Ommaviy statistika" subtitle="Landing sahifadagi metrikalar Data Provider orqali yangilanadi."><div className="stats-editor">{stats.map((stat, index) => <label className="stat-edit-row" key={stat.label}><span><strong>{stat.label}</strong><small>O‘zgarish: {stat.change}</small></span><input type="number" min="0" value={stat.value} onChange={(event) => setStats(stats.map((item, itemIndex) => itemIndex === index ? { ...item, value: Number(event.target.value) } : item))} /><input className="suffix-input" value={stat.suffix} onChange={(event) => setStats(stats.map((item, itemIndex) => itemIndex === index ? { ...item, suffix: event.target.value } : item))} aria-label={`${stat.label} suffix`} /></label>)}</div><button className="button button-primary" type="submit">Kontentni nashr qilish <ArrowRight size={15} /></button></Panel></form>
}

function DataTools() {
  const { data, updateData, notify } = useData()
  const fileRef = useRef(null)
  const counts = ['users', 'orders', 'products', 'services', 'notifications', 'activity'].map((key) => ({ key, count: data[key]?.length || 0 }))
  function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `novatech-data-${today()}.json`; link.click(); URL.revokeObjectURL(link.href)
    notify('Data Provider snapshot yuklab olindi')
  }
  function importData(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try { const parsed = JSON.parse(reader.result); if (!parsed.credentials || !parsed.site || !parsed.users) throw new Error('format'); updateData(parsed); notify('Ma’lumotlar muvaffaqiyatli import qilindi') }
      catch { notify('JSON fayl formati noto‘g‘ri', 'error') }
      event.target.value = ''
    }
    reader.readAsText(file)
  }
  return <div className="data-tools"><Panel title="Data Provider" subtitle="Boshqaruv markazidagi barcha ma’lumotlar localStorage’da saqlanadi."><div className="provider-status"><span className="provider-status-icon"><Database size={20} /></span><div><strong>Local data layer faol</strong><small>Oxirgi saqlanish avtomatik · Brauzer xotirasi</small></div><span className="provider-live"><i /> Sinxron</span></div><div className="collection-grid">{counts.map(({ key, count }) => <div className="collection-item" key={key}><span>{key}</span><strong>{count}</strong><small>records</small></div>)}</div><div className="provider-actions"><button className="button button-outline" onClick={exportData}><Download size={16} /> JSON eksport</button><button className="button button-outline" onClick={() => fileRef.current?.click()}><Upload size={16} /> JSON import</button><input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={importData} /></div></Panel><Panel title="Tizim holati" subtitle="NovaTech local data provider versiyasi 1.0"><div className="provider-info-list"><div><span>Saqlash usuli</span><strong>localStorage</strong></div><div><span>Ruxsat darajasi</span><strong>Director only</strong></div><div><span>Ma’lumotlar hajmi</span><strong>{(new Blob([JSON.stringify(data)]).size / 1024).toFixed(1)} KB</strong></div></div><div className="provider-note"><ShieldCheck size={16} /><span>Demo ma’lumotlari shu brauzer qurilmasida saqlanadi. Production muhitida server-side database va access control talab qilinadi.</span></div></Panel></div>
}

function RecordModal({ type, onClose, onSave }) {
  const fields = type === 'users' ? [{ key: 'name', label: 'To‘liq ism', required: true }, { key: 'email', label: 'Email', required: true }, { key: 'role', label: 'Rol', initial: 'Mijoz' }] : type === 'orders' ? [{ key: 'customer', label: 'Mijoz', required: true }, { key: 'product', label: 'Loyiha yoki xizmat', required: true }, { key: 'amount', label: 'Qiymat (so‘m)', input: 'number', required: true }] : [{ key: 'title', label: type === 'services' ? 'Xizmat nomi' : 'Mahsulot nomi', required: true }, { key: 'category', label: 'Kategoriya', initial: type === 'services' ? 'Consulting' : 'Web' }, { key: 'price', label: 'Qiymat (so‘m)', input: 'number', required: true }]
  const [form, setForm] = useState(Object.fromEntries(fields.map((field) => [field.key, field.initial || ''])))
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><div className="record-modal" role="dialog" aria-modal="true" aria-labelledby="record-title"><div className="modal-heading"><div><span className="section-kicker">Yangi yozuv</span><h2 id="record-title">{type === 'users' ? 'Foydalanuvchi qo‘shish' : type === 'orders' ? 'Buyurtma yaratish' : type === 'services' ? 'Xizmat qo‘shish' : 'Mahsulot qo‘shish'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Yopish"><X size={19} /></button></div><form onSubmit={(event) => { event.preventDefault(); onSave(form) }}><div className="modal-fields">{fields.map((field) => <label className="field-label" key={field.key}>{field.label}<input type={field.input || 'text'} min={field.input === 'number' ? 0 : undefined} required={field.required} value={form[field.key]} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} /></label>)}</div><div className="modal-footer"><button type="button" className="button button-quiet" onClick={onClose}>Bekor qilish</button><button className="button button-primary" type="submit"><Plus size={15} /> Yozuvni saqlash</button></div></form></div></div>
}

function DataTable({ kind, records, query, filter, updateRecord }) {
  const filtered = records.filter((row) => {
    const matchQuery = Object.values(row).join(' ').toLowerCase().includes(query.toLowerCase())
    const matchFilter = filter === 'all' || String(row.status || '').toLowerCase() === filter.toLowerCase()
    return matchQuery && matchFilter
  })
  const columns = kind === 'users' ? [['ID', 'id'], ['Foydalanuvchi', 'name'], ['Email', 'email'], ['Rol', 'role'], ['Holat', 'status'], ['Qo‘shilgan', 'joined']] : kind === 'orders' ? [['Buyurtma', 'id'], ['Mijoz', 'customer'], ['Loyiha', 'product'], ['Qiymat', 'amount'], ['Holat', 'status'], ['Sana', 'date']] : [['ID', 'id'], ['Nomi', 'title'], ['Kategoriya', 'category'], ['Qiymat', kind === 'services' ? 'price' : 'price'], ['Holat', 'status']]
  const statuses = ['Kutilmoqda', 'Jarayonda', 'Tasdiqlangan', 'Yakunlangan', 'Faol', 'Qoralama', 'Faolsiz']
  if (!records.length) return <EmptyState title="Hozircha yozuv yo‘q" description="Yangi yozuv qo‘shilganda u shu ro‘yxatda ko‘rinadi." />
  return <div className="table-scroll"><table className="business-table"><thead><tr>{columns.map(([columnLabel, key]) => <th key={key}>{columnLabel}</th>)}<th aria-label="Amallar" /></tr></thead><tbody>{filtered.map((row) => <tr key={row.id}>{columns.map(([, key]) => <td key={key}>{key === 'name' || key === 'customer' ? <span className="person-cell"><span className="person-avatar">{(row[key] || '?').slice(0, 1)}</span><span><strong>{row[key]}</strong></span></span> : key === 'amount' || key === 'price' ? <strong>{money(Number(row[key]))}</strong> : key === 'status' ? <select className={`status-select status-${String(row[key]).replaceAll(' ', '-').toLowerCase()}`} value={row[key]} onChange={(event) => updateRecord(kind, row.id, { status: event.target.value })} aria-label={`${row.id} holatini o‘zgartirish`}>{statuses.map((status) => <option key={status}>{status}</option>)}</select> : <span>{row[key]}</span>}</td>)}<td><button className="icon-button row-action" title="Holatni almashtirish" onClick={() => { const nextStatus = row.status === 'Faol' ? 'Faolsiz' : row.status === 'Faolsiz' ? 'Faol' : row.status === 'Yakunlangan' ? 'Jarayonda' : 'Yakunlangan'; updateRecord(kind, row.id, { status: nextStatus }) }}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table>{!filtered.length && <div className="table-empty">Qidiruv bo‘yicha natija topilmadi.</div>}</div>
}

export default function Dashboard({ role, onLogout }) {
  const { data, session, setTheme, addRecord, updateRecord, updateData, notify } = useData()
  const isDirector = role === 'director'
  const [active, setActive] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [range, setRange] = useState('7 kun')
  const unreadCount = data.notifications.filter((item) => item.unread).length
  const totalRevenue = data.orders.reduce((sum, item) => sum + Number(item.amount || 0), 0)
  const profit = totalRevenue - data.expenses
  const title = navTitles[active] || 'Dashboard'
  const searchableCollections = ['users', 'orders', 'products', 'services'].includes(active)
  const records = data[active] || []
  const chartActions = <select className="range-select" value={range} onChange={(event) => setRange(event.target.value)} aria-label="Davrni tanlash"><option>7 kun</option><option>30 kun</option><option>6 oy</option><option>12 oy</option></select>

  const pageDescription = useMemo(() => ({ dashboard: isDirector ? 'Biznesingiz bo‘yicha asosiy ko‘rsatkichlar va joriy faollik.' : 'Bugungi ish holati va jamoangizning so‘nggi faolligi.', users: 'Mijozlar va jamoa a’zolarini boshqaring.', orders: 'Buyurtmalar holati va bajarilish jarayonini kuzating.', products: 'Mahsulot va xizmatlar katalogini yangilang.', security: 'Hisobingizga kirish va sessiyalarni boshqaring.', website: 'Ommaviy landing sahifada ko‘rinadigan ma’lumotlarni tahrirlang.', 'admin-management': 'User Admin hisobiga va ruxsatlariga egalik qiling.', 'data-provider': 'Saqlangan ma’lumotlaringizni ko‘ring, import qiling yoki eksport qiling.', analytics: 'Biznes o‘sishi va jamoa faolligini tahlil qiling.', revenue: 'Daromadlar oqimini va oylik natijalarni kuzating.', expenses: 'Xarajatlar va operatsion natijalarni nazorat qiling.', notifications: 'Muhim yangilanishlar va tizim xabarlarini ko‘ring.', activity: 'Paneldagi oxirgi amallar tarixini tekshiring.', messages: 'Mijozlardan kelgan murojaatlarni ko‘rib chiqing.' }[active] || 'Boshqaruv sozlamalari va ish maydoningiz.'), [active, isDirector])
  const [displayDate] = useState(() => new Date().toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))

  function createRecord(form) {
    const collection = active === 'dashboard' ? 'users' : active
    const prefix = collection === 'users' ? 'U' : collection === 'orders' ? 'ORD' : collection === 'services' ? 'S' : 'P'
    const record = { ...form, id: `${prefix}-${Date.now().toString().slice(-5)}`, ...(collection === 'users' ? { status: 'Faol', joined: today() } : collection === 'orders' ? { amount: Number(form.amount), status: 'Kutilmoqda', date: today() } : { title: form.title, price: Number(form.price), status: 'Faol' }) }
    addRecord(collection, record); setModal(false); notify('Yangi yozuv muvaffaqiyatli qo‘shildi')
  }

  function markAllRead() {
    updateData({ notifications: data.notifications.map((item) => ({ ...item, unread: false })) })
    notify('Barcha bildirishnomalar o‘qildi')
  }

  function downloadOrdersReport() {
    const rows = [['Buyurtma', 'Mijoz', 'Loyiha', 'Qiymat UZS', 'Holat', 'Sana'], ...data.orders.map((order) => [order.id, order.customer, order.product, order.amount, order.status, order.date])]
    const csv = rows.map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `novatech-orders-${today()}.csv`
    link.click()
    URL.revokeObjectURL(url)
    notify('Buyurtmalar hisoboti yuklab olindi')
  }

  function renderOverview() {
    const metrics = isDirector ? [
      { label: 'Jami foydalanuvchilar', value: data.users.length.toLocaleString('uz-UZ'), change: '+12.8%', icon: Users, tone: 'mint', detail: `${data.users.filter((user) => user.status === 'Faol').length} faol foydalanuvchi` },
      { label: 'Jami buyurtmalar', value: data.orders.length.toLocaleString('uz-UZ'), change: '+8.4%', icon: ShoppingBag, tone: 'blue', detail: `${data.orders.filter((order) => order.status === 'Kutilmoqda').length} kutilmoqda` },
      { label: 'Umumiy daromad', value: shortMoney(totalRevenue), change: '+18.6%', icon: CircleDollarSign, tone: 'violet', detail: 'Bu oy · UZS' },
      { label: 'Xarajatlar', value: shortMoney(data.expenses), change: '-4.2%', icon: Wallet, tone: 'amber', detail: 'Bu oy · UZS' },
      { label: 'Sof foyda', value: shortMoney(profit), change: '+22.1%', icon: TrendingUp, tone: 'mint', detail: 'Daromad − xarajatlar' },
      { label: 'Faol foydalanuvchilar', value: String(data.users.filter((user) => user.status === 'Faol').length), change: '+6.3%', icon: Activity, tone: 'blue', detail: 'Jami hisoblar ichida' },
      { label: 'Yangi foydalanuvchilar', value: '248', change: '+14.2%', icon: ArrowUpRight, tone: 'violet', detail: 'Shu oyda qo‘shildi' },
      { label: 'Kutilayotgan buyurtma', value: String(data.orders.filter((order) => ['Kutilmoqda', 'Jarayonda'].includes(order.status)).length), change: 'Ko‘rib chiqish', icon: Clock3, tone: 'amber', detail: 'Harakat talab qilinadi' },
    ] : [
      { label: 'Foydalanuvchilar', value: data.users.length.toLocaleString('uz-UZ'), change: '+12.8%', icon: Users, tone: 'mint', detail: `${data.users.filter((user) => user.status === 'Faol').length} faol` },
      { label: 'Buyurtmalar', value: data.orders.length.toLocaleString('uz-UZ'), change: '+8.4%', icon: ShoppingBag, tone: 'blue', detail: `${data.orders.filter((order) => order.status === 'Kutilmoqda').length} yangi` },
      { label: 'Loyihalar qiymati', value: shortMoney(totalRevenue), change: '+18.6%', icon: CircleDollarSign, tone: 'violet', detail: 'Barcha buyurtmalar' },
      { label: 'Mahsulotlar', value: String(data.products.length), change: 'Katalog', icon: Layers3, tone: 'amber', detail: 'Faol takliflar' },
    ]
    return <>
      <div className={`metrics-grid ${isDirector ? 'metrics-director' : ''}`}>{metrics.map((metric) => <StatCard key={metric.label} {...metric} />)}</div>
      <div className="dashboard-chart-grid"><Panel title="Daromad dinamikasi" subtitle="Oylik natijalar · mln UZS" action={chartActions}><div className="chart-legend"><span><i className="legend-mint" /> Daromad</span><span className="chart-live"><i /> Live</span></div><RevenueChart height={228} /></Panel><Panel title="O‘sish tahlili" subtitle="Foydalanuvchilar va buyurtmalar" action={<button className="icon-button" onClick={() => setActive(isDirector ? 'analytics' : 'statistics')} aria-label="Statistikani ochish"><ArrowRight size={16} /></button>}><div className="chart-legend"><span><i className="legend-blue" /> Foydalanuvchilar</span><span><i className="legend-amber" /> Buyurtmalar</span></div><GrowthChart height={228} /></Panel></div>
      <div className="dashboard-bottom-grid"><Panel title="So‘nggi buyurtmalar" subtitle="Yaqinda yangilangan" action={<button className="text-link compact-link" onClick={() => setActive('orders')}>Barchasi <ArrowRight size={14} /></button>}><div className="compact-orders">{data.orders.slice(0, 4).map((order) => <div className="compact-order" key={order.id}><span className="order-mini-icon"><ShoppingBag size={15} /></span><span className="compact-order-info"><strong>{order.customer}</strong><small>{order.id} · {order.product}</small></span><span className="compact-order-value">{shortMoney(order.amount)}</span><span className={`status-pill status-${order.status.toLowerCase()}`}>{order.status}</span></div>)}</div></Panel><Panel title="Faollik" subtitle="So‘nggi tizim amallari" action={<button className="icon-button" onClick={() => setActive(isDirector ? 'activity' : 'notifications')} aria-label="Faollikni ko‘rish"><ArrowRight size={16} /></button>}><div className="activity-list">{data.activity.slice(0, 4).map((item) => <div className="activity-row" key={item.id}><span className="activity-avatar">{item.user.slice(0, 1)}</span><span><strong>{item.user}</strong><small>{item.action} · <b>{item.target}</b></small></span><time>{item.time}</time></div>)}</div></Panel></div>
      {isDirector && <Panel title="Tezkor amallar" subtitle="Ko‘p ishlatiladigan boshqaruv vositalari"><div className="quick-actions-grid">{[['users', 'Add user', Users], ['products', 'Add product', Layers3], ['services', 'Add service', BriefcaseBusiness], ['website', 'Edit website', Globe2], ['admin-management', 'Manage admin', ShieldCheck], ['security', 'Security settings', ShieldCheck]].map(([page, label, Icon]) => <button className="quick-action" key={label} onClick={() => { setActive(page); if (['users', 'products', 'services'].includes(page)) setModal(true) }}><Icon size={16} /><span>{label}</span><ArrowRight size={14} /></button>)}</div></Panel>}
    </>
  }

  function renderContent() {
    if (active === 'dashboard') return renderOverview()
    if (active === 'security') return <SecuritySettings role={role} onLogout={onLogout} />
    if (active === 'admin-management' && isDirector) return <AdminManagement />
    if (active === 'website' && isDirector) return <WebsiteEditor />
    if (active === 'data-provider' && isDirector) return <DataTools />
    if (active === 'analytics' || active === 'statistics' || active === 'revenue' || active === 'expenses') return <><div className="metrics-grid"><StatCard label="Umumiy daromad" value={shortMoney(totalRevenue)} change="+18.6%" icon={CircleDollarSign} /><StatCard label="Xarajatlar" value={shortMoney(data.expenses)} change="-4.2%" icon={Wallet} tone="amber" /><StatCard label="Sof foyda" value={shortMoney(profit)} change="+22.1%" icon={TrendingUp} tone="blue" /><StatCard label="Konversiya" value="8.42%" change="+1.8%" icon={Activity} tone="violet" /></div><div className="dashboard-chart-grid"><Panel title="Daromad dinamikasi" subtitle="Oylik tushum · mln UZS" action={chartActions}><RevenueChart height={275} /></Panel><Panel title="Foydalanuvchi o‘sishi" subtitle="Yangi ro‘yxatdan o‘tganlar"><GrowthChart height={275} /></Panel></div><div className="dashboard-chart-grid"><Panel title="Buyurtmalar hajmi" subtitle="Oylik taqsimot"><OrdersChart height={225} /></Panel><Panel title="Foydalanuvchi kanallari" subtitle="Tashrif manbalari"><ChannelChart /></Panel></div></>
    if (active === 'notifications') return <Panel title="Bildirishnomalar" subtitle={`${unreadCount} ta o‘qilmagan xabar`} action={<button className="button button-outline button-small" onClick={markAllRead}><Check size={14} /> Barchasini o‘qildi</button>}><div className="notification-list">{data.notifications.map((item) => <button key={item.id} className={`notification-row ${item.unread ? 'notification-unread' : ''}`} onClick={() => updateRecord('notifications', item.id, { unread: false })}><span className="notification-icon"><Bell size={16} /></span><span className="notification-copy"><strong>{item.title}</strong><small>{item.detail}</small></span><span className="notification-time">{item.time}</span>{item.unread && <i className="notification-dot" />}</button>)}{!data.notifications.length && <EmptyState title="Yangi bildirishnoma yo‘q" description="Yangi xabar kelganda shu yerda ko‘rinadi." />}</div></Panel>
    if (active === 'activity') return <Panel title="Faollik jurnali" subtitle="Administratorlar va foydalanuvchilarning oxirgi amallari"><div className="activity-log">{data.activity.map((item) => <div key={item.id} className="activity-log-row"><span className="activity-avatar">{item.user.slice(0, 1)}</span><div><strong>{item.user}</strong><p>{item.action} <b>{item.target}</b></p></div><time>{item.time}</time></div>)}</div></Panel>
    if (active === 'settings') return <div className="settings-grid"><Panel title="Ko‘rinish sozlamalari" subtitle="Ish maydoningizni o‘zingizga moslang."><div className="theme-setting"><span className="theme-setting-icon">{data.theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}</span><span><strong>{data.theme === 'dark' ? 'Dark mode' : 'Light mode'}</strong><small>Tanlovingiz avtomatik saqlanadi.</small></span><button className={`toggle-switch ${data.theme === 'dark' ? 'toggle-on' : ''}`} onClick={() => setTheme(data.theme === 'dark' ? 'light' : 'dark')} aria-label="Rang rejimini almashtirish"><i /></button></div><div className="settings-divider" /><div className="settings-row"><span><strong>Hisob nomi</strong><small>{data.credentials[role].name}</small></span><span className="status-pill status-active">Faol</span></div><div className="settings-row"><span><strong>Kirish emaili</strong><small>{data.credentials[role].email}</small></span><button className="text-link compact-link" onClick={() => setActive('security')}>Tahrirlash <ArrowRight size={14} /></button></div></Panel><Panel title="Yordam va ma’lumot" subtitle="NovaTech workspace"><div className="help-contact"><span className="support-large"><CircleDollarSign size={19} /></span><strong>Yordam markazi</strong><p>Paneldan foydalanish bo‘yicha savolingiz bormi? Biz yordam berishga tayyormiz.</p><a className="button button-outline" href={`mailto:${data.site.email}`}>Yordamga yozish <ArrowRight size={14} /></a></div></Panel></div>
    if (active === 'messages') return <Panel title="Mijozlar xabarlari" subtitle="Sayt orqali yuborilgan so‘rovlar."><div className="message-list">{(data.messages || []).map((item) => <div className="message-row" key={item.id}><span className="person-avatar">{item.name.slice(0, 1)}</span><div><strong>{item.name}</strong><small>{item.email} · {item.time}</small><p>{item.message}</p></div><button className="icon-button" onClick={() => { updateData({ messages: data.messages.filter((message) => message.id !== item.id) }); notify('Xabar arxivlandi') }} aria-label="Xabarni arxivlash"><X size={16} /></button></div>)}{!data.messages?.length && <EmptyState title="Hozircha xabar yo‘q" description="Saytdagi aloqa formasi orqali kelgan murojaatlar shu yerda ko‘rinadi." />}</div></Panel>
    if (searchableCollections) return <Panel title={title} subtitle={pageDescription} action={<div className="table-tools"><label className="filter-select"><Filter size={14} /><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Holat bo‘yicha filtrlash"><option value="all">Barcha holat</option><option value="Faol">Faol</option><option value="Kutilmoqda">Kutilmoqda</option><option value="Jarayonda">Jarayonda</option><option value="Yakunlangan">Yakunlangan</option></select><ChevronDown size={13} /></label><button className="button button-primary button-small" onClick={() => setModal(true)}><Plus size={15} /> Yangi qo‘shish</button></div>}><DataTable kind={active} records={records} query={search} filter={filter} updateRecord={updateRecord} /></Panel>
    return <Panel title={title} subtitle={pageDescription}><EmptyState title="Ko‘rsatkichlar yangilanmoqda" description="Ma’lumotlar provider orqali sinxronlanadi." /></Panel>
  }

  return <div className={`dashboard-app ${isDirector ? 'director-app' : 'admin-app'}`}>
    <Sidebar role={role} active={active} onNavigate={setActive} onLogout={onLogout} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} unreadCount={unreadCount} />
    <main className="dashboard-main"><header className="dashboard-topbar"><div className="topbar-left"><button className="icon-button mobile-menu-trigger" onClick={() => setMobileOpen(true)} aria-label="Navigatsiyani ochish"><Menu size={19} /></button><div className="breadcrumb"><span>{isDirector ? 'Director panel' : 'Admin panel'}</span><span>/</span><strong>{title}</strong></div></div><div className="topbar-actions"><label className="global-search"><Search size={15} /><input placeholder="Qidirish..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Qidirish" /><kbd>⌘ K</kbd></label><span className="topbar-divider" /><button className="icon-button theme-toggle" onClick={() => setTheme(data.theme === 'dark' ? 'light' : 'dark')} aria-label="Rang rejimini almashtirish">{data.theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><div className="notification-wrap"><button className="icon-button topbar-notification" onClick={() => setShowNotifications(!showNotifications)} aria-label="Bildirishnomalar"><Bell size={17} />{unreadCount > 0 && <i />}</button>{showNotifications && <div className="notification-popover"><div className="popover-head"><strong>Bildirishnomalar</strong><button onClick={markAllRead}>Barchasini o‘qish</button></div>{data.notifications.slice(0, 3).map((item) => <button key={item.id} className="popover-item" onClick={() => { setActive('notifications'); setShowNotifications(false) }}><span className="notification-icon"><Bell size={14} /></span><span><strong>{item.title}</strong><small>{item.time}</small></span>{item.unread && <i />}</button>)}</div>}</div><button className="profile-button" onClick={() => setActive('settings')}><span className={`profile-avatar ${role}`}>{session?.name?.slice(0, 1) || 'A'}</span><span className="profile-copy"><strong>{session?.name || (isDirector ? 'Director' : 'User Admin')}</strong><small>{isDirector ? 'Director' : 'Administrator'}</small></span><ChevronDown size={14} /></button></div></header>
      <div className="dashboard-content"><div className="page-heading"><div><span className="page-date">{displayDate}</span><h1>{active === 'dashboard' ? `Xush kelibsiz, ${session?.name?.split(' ')[0] || (isDirector ? 'Director' : 'Admin')}` : title}</h1><p>{pageDescription}</p></div>{active === 'dashboard' && <div className="page-heading-actions"><button className="button button-outline button-small" onClick={downloadOrdersReport}><Download size={14} /> Hisobot</button><button className="button button-primary button-small" onClick={() => { setActive('users'); setModal(true) }}><Plus size={15} /> Yangi qo‘shish</button></div>}</div>{renderContent()}<footer className="dashboard-footer"><span>NovaTech Business Platform <b>·</b> v2.4.0</span><span><i /> Barcha ma’lumotlar sinxron</span></footer></div>
    </main>
    {modal && <RecordModal type={active} onClose={() => setModal(false)} onSave={createRecord} />}
  </div>
}
