import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 flex justify-between items-center p-1'>
        <p className="text-2xl text-center ml-4">
        <span className='text-green-700'>&lt;i</span>
        <span className='text-white'>Pass</span>
        <span className='text-green-700'>/&gt;</span>
      </p>
        <li className='flex gap-5 ml-4 text-white mr-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">ContactUs</a>
        </li>
    </nav>
  )
}

export default Navbar
