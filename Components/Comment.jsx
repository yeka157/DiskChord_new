import React from 'react';
import moment from 'moment';

export default function Comment(props) {
  
  moment().format();

  return (
    <div className=''>
      <div className='flex p-3  py-1 cursor-pointer border-y border-secondaryHover'>
          {/* foto */}
          <img 
            src={props.post.user_profilepicture ? props.post.user_profilepicture : '/default.jpg'}
            alt="profile-img" 
            className='aspect-square h-11 w-11 rounded-full mr-4 hover:brightness-90 cursor-pointer'
          />

          <div className='w-full'>
            <div className='flex items-center space-x-1.5 whitespace-nowrap'>
              <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{props.post.name}</h4>
              <span className='text-sm sm:text-[15px]'>@{props.post.username} - </span>
              <span className='text-sm sm:text-[15px]'>{moment(props.post.date).fromNow()}</span>
            </div>
            <p className='text-gray-700 text-[15px] sm:text-[16px] mb-2'>{props.post.text}</p>
          </div>
      </div>
    </div>
  )
}
