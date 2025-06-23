import React from 'react'
import UI_img from "../../assets/Images/main.png"
const AuthLayout=({ children }) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pb-12'>
        <h2 className='text-lg font-medium text-black'>Task Manager</h2>
        { children }
      </div>

      <div className='hidden md:flex w-[40vw] h-screen items-center bg-blue-500 justify-center overflow-hidden p-8 '>
        <img src={UI_img} alt="" className='w-64 lg:w-[90%]'/>
      </div>
    </div>
  )
}

export default AuthLayout
