import React from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { useToast } from '@chakra-ui/react';

export default function Index(props) {
  const toast = useToast();
  const Router = useRouter();

  const btnVerify = async() => {
    try {
      let verificationJwt = localStorage.getItem('verification');
      if (props.token === verificationJwt) {
        let res = await Axios.get(`http://localhost:3105/auth/verify`, {
          headers : {
            'Authorization' : `Bearer ${props.token}`
          }
        })
        console.log(props.token);
        if (res.data.idusers) {
          localStorage.removeItem('verification');
          localStorage.setItem('diskchord', res.data.token);
          Router.replace('/home');
        }
      } else {
        toast({
          title : 'Link expired',
          description : 'Verification Link Expired, Please Re-send verification email',
          status : 'error',
          duration : 3000,
          isClosable : true
        })
      }
    } catch (error) {
      toast({
        title : 'Verification Error',
        description : 'Link expired, Please Request Another Verification Link in Your Profile',
        status : 'error',
        duration : 3000,
        isClosable : true
      })
      console.log(error);
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