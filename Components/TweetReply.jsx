import React from 'react'

export default function TweetReply() {
  return (
    <div className='flex border-b border-secondaryHover p-3 space-x-3'>
      <img src="/default.jpg" alt="profile-img" className='aspect-square h-11 w-11 rounded-full cursor-pointer hover:brightness-90'/>

      <div className='w-full divide-y divider-gray-300'>
        <input type="text" className='w-full border-none focus:ring-0 text-md placeholder-gray-700'
        placeholder='Write your thoughts...' 
        maxLength='300'/>
        <div className='flex items-center justify-end pt-2.5'>
          <button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50 disabled:hover:brightness-100'>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

