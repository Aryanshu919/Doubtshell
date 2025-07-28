import './App.css'
import { HeroSection } from './components/HeroSection'
import MiddleSection from './components/MiddleSection'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <div className='bg-blue-300 t'>
      <Navbar/>
      <HeroSection/>
      <MiddleSection/>
      
    </div>
    <div className='bg-green-400 h-screen'>

    </div>

    </>
  )
}

export default App
