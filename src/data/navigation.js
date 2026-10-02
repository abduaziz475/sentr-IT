const adminGroups = [
  { label: 'ISH MAYDONI', items: [{ id: 'dashboard', label: 'Dashboard' }, { id: 'users', label: 'Foydalanuvchilar' }, { id: 'orders', label: 'Buyurtmalar' }] },
  { label: 'BIZNES', items: [{ id: 'products', label: 'Mahsulotlar' }, { id: 'statistics', label: 'Statistika' }, { id: 'messages', label: 'Xabarlar' }, { id: 'notifications', label: 'Bildirishnomalar' }] },
  { label: 'SOZLAMALAR', items: [{ id: 'settings', label: 'Sozlamalar' }, { id: 'security', label: 'Xavfsizlik' }] },
]

const directorGroups = [
  { label: 'BOSHQARUV', items: [{ id: 'dashboard', label: 'Dashboard' }, { id: 'users', label: 'Foydalanuvchilar' }, { id: 'admin-management', label: 'Admin boshqaruvi' }, { id: 'products', label: 'Mahsulotlar' }, { id: 'services', label: 'Xizmatlar' }, { id: 'orders', label: 'Buyurtmalar' }] },
  { label: 'MOLIYA VA TAHLIL', items: [{ id: 'revenue', label: 'Daromad' }, { id: 'expenses', label: 'Xarajatlar' }, { id: 'analytics', label: 'Analitika' }] },
  { label: 'TIZIM', items: [{ id: 'website', label: 'Sayt kontenti' }, { id: 'data-provider', label: 'Data Provider' }, { id: 'notifications', label: 'Bildirishnomalar' }, { id: 'activity', label: 'Faollik jurnali' }, { id: 'settings', label: 'Sozlamalar' }, { id: 'security', label: 'Xavfsizlik' }] },
]

export const navTitles = Object.fromEntries([...adminGroups, ...directorGroups].flatMap((group) => group.items.map(({ id, label }) => [id, label])))

export function getNavGroups(role) {
  return role === 'director' ? directorGroups : adminGroups
}