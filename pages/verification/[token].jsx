import React from 'react';
import { useRouter } from 'next/router';

export default function Index(props) {
  
  const Router = useRouter();

  const btnVerify = async() => {
    try {
      if (props.token) {
        let res = await Axios.get(`http://localhost:3105/auth/verify`, {
          headers : {
            'Authorization' : `Bearer ${props.token}`
          }
        })
      }  
    } catch (error) {
      
    }
  }


  return (
    <div 
      className='flex items-center h-screen'
      style={{backgroundImage : `url(/bg1-mirror.png)`, backgroundSize:'cover', maxWidth:'100%'}}
    >
      <div className='flex flex-col items-center justify-center space-y-9 h-[50%] w-[50%] mx-auto bg-white opacity-80'>
        <h1 className='text-5xl'>Verify Your Account</h1>
        <button 
          onClick={btnVerify} 
          className='w-46 h-12 bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90'
        >
          Click here to Verify
        </button>
      </div>
    </div>
  )
}

export async function getStaticPaths (context) {
  return {
    paths : [{params : {token : '1'}}],
    fallback : true
  }
}

export async function getStaticProps (context) {
  console.log(context);
  console.log(context.params.token);
  return {
    props : {
      obj : {},
      token : context.params.token
    }
  }
}