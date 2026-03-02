import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      <Navbar />
      <Home />
    </div>
  )
}

export default App