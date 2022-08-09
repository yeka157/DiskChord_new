import React from 'react'

export default function Comment() {
  return (
    <div className=''>
      <div className='flex p-3  py-1 cursor-pointer border-y border-secondaryHover'>
          {/* foto */}
          <img src="/default.jpg" alt="profile-img" className='aspect-square h-11 w-11 rounded-full mr-4 hover:brightness-90 cursor-pointer'/>

          <div className='w-full'>
            <div className='flex items-center space-x-1.5 whitespace-nowrap'>
              <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>Name</h4>
              <span className='text-sm sm:text-[15px]'>@username</span>
              <span className='text-sm sm:text-[15px]'>timestamp</span>
            </div>
            <p className='text-gray-700 text-[15px] sm:text-[16px] mb-2'>Comments</p>
          </div>
      </div>
    </div>
  )
}
