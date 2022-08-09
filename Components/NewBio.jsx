import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';

export default function NewBio(props) {

  return (
    <div className='mt-7 mx-3'>
        <div className='flex space-x-3 justify-between items-center'>
            <div className='flex items-center space-x-3'>
            <img 
                src={props.user.user_profilepicture ? props.users.user_profilepicture : '/default.jpg'} 
                alt="profile-img" 
                className='p-1 w-32 h-32 cursor-pointer hover:brightness-90 rounded-full'
                style={{border:'2px solid black'}}
            />
            <h1 className='text-2xl font-bold'>
                @{props.user.username}
            </h1>
            </div>
            <div className=''>
                {props.user.status === "Unverified" ? 
                <button className='my-2.5 mx-1.5 w-25 h-9 rounded-full bg-secondaryHover text-secondary px-4 py-1.5 font-semibold hover:brightness-90 shadow-md'>Verify Account</button>
                : <></>
                }
                <button className='my-2.5 mx-1.5 w-25 h-9 rounded-full bg-secondaryHover text-secondary px-4 py-1.5 font-semibold hover:brightness-90 shadow-md'>Edit Profile</button>
            </div>
        </div>
        <div className='space-y-3 mt-2.5'>
            <h1 className='font-bold text-md sm:text-lg'>@{props.user.username}</h1>
            <p className='font-light text-md sm:text-md'>{props.user.name}</p>
            <h6 className='font-light text-md sm:text-md'>{props.user.user_bio}</h6>
            <p className='font-light text-md sm:text-md flex items-center'><span className='mr-1.5'><HiOutlineMail/></span> Email : {props.user.email}</p>
        </div>
    </div>
  )
}
