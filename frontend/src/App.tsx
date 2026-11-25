import HomePage from '@/pages/HomePage'
import ResultsPage from '@/pages/ResultsPage'

function App() {
  if (window.location.pathname === '/results') {
    return <ResultsPage />
  }

  return <HomePage />
}

export default App