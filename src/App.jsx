import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar.jsx'
import './App.css'
import Manager from './components/Manager.jsx'
import Footer from './components/Footer.jsx'
import { FaCopy } from "react-icons/fa";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <div className=''>
      <Manager/>
      </div>
      <Footer/>
    </>
  )
}

export default App
