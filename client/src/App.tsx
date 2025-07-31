import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';

function App() {
  return (
    <>
    <div className='bg-blue-300 t'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>


    </div>
    </>
  )
}

export default App
