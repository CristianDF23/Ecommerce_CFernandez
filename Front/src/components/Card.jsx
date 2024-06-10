import React from 'react'
import logo from '../assets/logo.png'
const Card = ({numberCard, CVC, date}) => {
  return (
    <div className='w-full h-72 flex flex-col items-center mt-3'>
        <div className='w-5/6 h-full border rounded-3xl bg-gradient-to-tl from-yellow-500 via-yellow-200 to-yellow-100'>
            <header className='flex justify-between p-4 border-b'>
                <h3 className='font-semibold text-2xl text-blue-900'>CSport</h3>
                <img className='w-10' src={logo} alt="" />
            </header>
            <main>  
                <h2>{numberCard}</h2>
            </main>
        </div>
    </div>
  )
}

export default Card