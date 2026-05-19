import { useState } from 'react'
import Home from './pages/Home.jsx'
import HanoiPage from './pages/HanoiPage.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'simulation') {
    return <HanoiPage onBack={() => setPage('home')} />
  }

  return <Home onStart={() => setPage('simulation')} />
}
