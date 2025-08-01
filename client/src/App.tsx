import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <div className='bg-blue-300 t'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>


    </div>
    </>
  )
}

export default App
