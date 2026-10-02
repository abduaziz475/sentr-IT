import { lazy, Suspense, useState } from 'react'
import { DataProvider } from './context/DataProvider'
import { useData } from './hooks/useData'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import './styles/app.css'

const Dashboard = lazy(() => import('./pages/Dashboard'))

function AppContent() {
  const { session, toast, logout } = useData()
  const [screen, setScreen] = useState('landing')

  return (
    <>
      {session ? <Suspense fallback={<div className="app-loading"><span className="loading-mark">N</span><span>Workspace yuklanmoqda</span><i /></div>}><Dashboard role={session.role} onLogout={() => { logout(); setScreen('landing') }} /></Suspense> : screen === 'login' ? <LoginPage onBack={() => setScreen('landing')} onSuccess={() => setScreen('landing')} /> : <LandingPage onLogin={() => setScreen('login')} />}
      {toast && <div className={`toast toast-${toast.tone}`} role="status"><span className="toast-indicator" />{toast.message}</div>}
    </>
  )
}

export default function App() {
  return <DataProvider><AppContent /></DataProvider>
}
