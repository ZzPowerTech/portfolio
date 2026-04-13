// src/App.tsx
import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Repos } from './components/Repos'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Repos />
      </main>
      <Footer />
    </>
  )
}

export default App
