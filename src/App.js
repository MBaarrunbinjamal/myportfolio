import Hero from './components/Hero'
import Header from './components/Header'
import About from './components/About'
import AnimatedBackground from './AnimatedBackground'
import './App.css'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Hero>
        <Header />
      </Hero>
<AnimatedBackground />
     <About />
     <Skills/>
     <Projects/>
     <Achievements/>
     <Contact/>
     <Footer/>
    </>
  )
}

export default App