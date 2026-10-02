import { BarChart3, Bell, BriefcaseBusiness, ChartNoAxesCombined, CircleDollarSign, Database, FileClock, Globe2, Headphones, LayoutDashboard, LogOut, MessageSquare, Package, PanelLeftClose, PanelLeftOpen, Settings, ShieldCheck, ShoppingBag, Users, Wallet, X } from 'lucide-react'

const adminGroups = [
  { label: 'ISH MAYDONI', items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'users', label: 'Foydalanuvchilar', icon: Users }, { id: 'orders', label: 'Buyurtmalar', icon: ShoppingBag }] },
  { label: 'BIZNES', items: [{ id: 'products', label: 'Mahsulotlar', icon: Package }, { id: 'statistics', label: 'Statistika', icon: BarChart3 }, { id: 'messages', label: 'Xabarlar', icon: MessageSquare }, { id: 'notifications', label: 'Bildirishnomalar', icon: Bell }] },
  { label: 'SOZLAMALAR', items: [{ id: 'settings', label: 'Sozlamalar', icon: Settings }, { id: 'security', label: 'Xavfsizlik', icon: ShieldCheck }] },
]

const directorGroups = [
  { label: 'BOSHQARUV', items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'users', label: 'Foydalanuvchilar', icon: Users }, { id: 'admin-management', label: 'Admin boshqaruvi', icon: ShieldCheck }, { id: 'products', label: 'Mahsulotlar', icon: Package }, { id: 'services', label: 'Xizmatlar', icon: BriefcaseBusiness }, { id: 'orders', label: 'Buyurtmalar', icon: ShoppingBag }] },
  { label: 'MOLIYA VA TAHLIL', items: [{ id: 'revenue', label: 'Daromad', icon: CircleDollarSign }, { id: 'expenses', label: 'Xarajatlar', icon: Wallet }, { id: 'analytics', label: 'Analitika', icon: ChartNoAxesCombined }] },
  { label: 'TIZIM', items: [{ id: 'website', label: 'Sayt kontenti', icon: Globe2 }, { id: 'data-provider', label: 'Data Provider', icon: Database }, { id: 'notifications', label: 'Bildirishnomalar', icon: Bell }, { id: 'activity', label: 'Faollik jurnali', icon: FileClock }, { id: 'settings', label: 'Sozlamalar', icon: Settings }, { id: 'security', label: 'Xavfsizlik', icon: ShieldCheck }] },
]

export default function Sidebar({ role, active, onNavigate, onLogout, collapsed, onCollapse, mobileOpen, onMobileClose, unreadCount }) {
  const groups = role === 'director' ? directorGroups : adminGroups
  return <>
    {mobileOpen && <button className="sidebar-scrim" onClick={onMobileClose} aria-label="Menyuni yopish" />}
    <aside className={`app-sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
      <div className="sidebar-brand"><a href="#dashboard" onClick={(event) => { event.preventDefault(); onNavigate('dashboard') }} className="brand brand-light"><span className="brand-symbol">N</span>{!collapsed && <span>Nova<span>Tech</span></span>}</a><button className="icon-button sidebar-collapse" onClick={onCollapse} aria-label="Sidebarni yig‘ish">{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</button><button className="icon-button sidebar-mobile-close" onClick={onMobileClose} aria-label="Menyuni yopish"><X size={18} /></button></div>
      <div className="workspace-switch"><span className={`workspace-avatar ${role}`}>{role === 'director' ? 'D' : 'A'}</span>{!collapsed && <span className="workspace-info"><strong>{role === 'director' ? 'Director workspace' : 'User Admin'}</strong><small>{role === 'director' ? 'Full access' : 'Admin panel'} <span className="workspace-caret">⌄</span></small></span>}{!collapsed && <span className="workspace-online" />}</div>
      <nav className="sidebar-navigation" aria-label="Boshqaruv navigatsiyasi">{groups.map((group) => <div className="nav-group" key={group.label}><span className="nav-group-title">{collapsed ? '···' : group.label}</span>{group.items.map(({ id, label, icon: Icon }) => <button key={id} className={`side-nav-item ${active === id ? 'side-nav-active' : ''}`} onClick={() => { onNavigate(id); onMobileClose() }} title={collapsed ? label : undefined}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{id === 'notifications' && unreadCount > 0 && <em className="nav-unread">{unreadCount}</em>}</button>)}</div>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-support"><span className="support-icon"><Headphones size={16} /></span>{!collapsed && <span><strong>Yordam kerakmi?</strong><small>Biz bilan bog‘laning</small></span>}</div><button className="side-nav-item logout-item" onClick={onLogout} title={collapsed ? 'Chiqish' : undefined}><LogOut size={17} /><span>Chiqish</span></button><div className="sidebar-version">{collapsed ? 'v2' : <><span>NovaTech Platform</span><small>Version 2.4.0</small></>}</div></div>
    </aside>
  </>
}