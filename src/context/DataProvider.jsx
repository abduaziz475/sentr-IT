import { useEffect, useMemo, useState } from 'react'
import { seedData } from '../data/seed'
import { DataContext } from './dataContext'

const STORAGE_KEY = 'novatech-workspace-v1'
const SESSION_KEY = 'novatech-session-v1'
function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return saved ? { ...seedData, ...saved } : seedData
  } catch {
    return seedData
  }
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData)
  const [session, setSession] = useState(loadSession)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    document.documentElement.dataset.theme = data.theme
  }, [data])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const value = useMemo(() => ({
    data,
    session,
    toast,
    notify: (message, tone = 'success') => setToast({ message, tone }),
    updateData: (patch) => setData((current) => ({ ...current, ...patch })),
    updateSite: (patch) => setData((current) => ({ ...current, site: { ...current.site, ...patch } })),
    setTheme: (theme) => setData((current) => ({ ...current, theme })),
    addRecord: (collection, record) => setData((current) => ({ ...current, [collection]: [record, ...current[collection]] })),
    updateRecord: (collection, id, patch) => setData((current) => ({
      ...current,
      [collection]: current[collection].map((record) => record.id === id ? { ...record, ...patch } : record),
    })),
    login: (email, code, remember = false) => {
      const normalizedEmail = email.trim().toLowerCase()
      const role = ['admin', 'director'].find((key) => {
        const account = data.credentials[key]
        return account.active && account.email.trim().toLowerCase() === normalizedEmail && account.code === code
      })
      if (!role) return false
      const nextSession = { role, name: data.credentials[role].name, since: new Date().toISOString() }
      setSession(nextSession)
      if (remember) localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
      else sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
      setData((current) => ({
        ...current,
        credentials: { ...current.credentials, [role]: { ...current.credentials[role], lastLogin: new Date().toLocaleString('uz-UZ') } },
        activity: [{ id: `a${Date.now()}`, user: current.credentials[role].name, action: 'tizimga kirdi', target: 'Kirish', time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }) }, ...current.activity],
      }))
      return true
    },
    logout: () => {
      setSession(null)
      sessionStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(SESSION_KEY)
    },
    updateCredentials: (role, patch) => setData((current) => ({
      ...current,
      credentials: { ...current.credentials, [role]: { ...current.credentials[role], ...patch } },
    })),
  }), [data, session, toast])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
