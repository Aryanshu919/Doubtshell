import './App.css'
import { HeroSection } from './components/HeroSection'
import MiddleSection from './components/MiddleSection'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <div className='bg-blue-300 t'>
        <Navbar/>
        <HeroSection/>
        <MiddleSection/>
        <Footer />

    </div>
    </>
  )
}

export default App
