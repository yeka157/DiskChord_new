import React from 'react';
import Head from 'next/head';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useToast } from '@chakra-ui/react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function Index(props) {
  const [visibility, setVisibility] = React.useState('password');
  const [show, setShow] = React.useState('password');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [checkRepeat, setCheckRepeat] = React.useState("");
  const [passwordStrength, setPasswordStrength] = React.useState();
  const toast = useToast();
  const router = useRouter();

  const btnShow = () => {
    if (show === 'password') {
      setShow('text');
    } else if (show === 'text') {
      setShow('password');
    }
  }

  const btnHide = () => {
    if (visibility === 'password') {
      setVisibility('text');
    } else if (visibility === 'text') {
      setVisibility('password');
    }
  }

  const btnSubmit = async() => {
    try {
      let resetJwt = localStorage.getItem('resetJwt');
      console.log(resetJwt);
      if (password != repeatPassword) {
        toast({
          title : 'Both password and repeat password must match',
          description : 'Password must match',
          status : 'error',
          duration : 3000,
          isClosable : true
        })
      } else if (password === repeatPassword) {
        if (props.token === resetJwt) {
          let res = await Axios.post('http://localhost:3105/auth/reset', {
            password
          }, {
            headers : {
              'Authorization' : `Bearer ${props.token}`
            }
          })
          if (res.data.success) {
            localStorage.removeItem('resetJwt');
            toast({
              title : 'Success',
              description : 'Password successfully updated',
              status : 'success',
              duration : 3000,
              isClosable : true
            })
            router.replace('/');
          }
        } else {
          console.log(resetJwt);
          console.log(props.token);
          toast({
            title : 'Link expired',
            description : 'Reset Password Link Expired, Please Re-send reset password email',
            status : 'error',
            duration : 3000,
            isClosable : true
          })
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (repeatPassword) {
      if (repeatPassword != password) {
        setCheckRepeat("password must match");
      } else {
        setCheckRepeat("");
      }
    } else if (!repeatPassword) {
      setCheckRepeat("");
    }
  }, [repeatPassword, password]);

  React.useEffect(() => {
    var PasswordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (password.match(PasswordFormat)) {
      setPasswordStrength("Medium");
      if (password.length >= 12) {
        setPasswordStrength("Strong");
      }
    } else {
      if (!password) {
        setPasswordStrength("");
      } else {
        setPasswordStrength("Weak");
      }
    }
  }, [password]);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="title" content="DiskChord" />
        <meta name="description" content="Social Media Next JS" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diskchord.com/" />
        <meta
          property="og:title"
          content="DiskChord — Share your life music experience"
        />
        <meta property="og:description" content="Social Media Next JS" />
        <meta
          property="og:image"
          content="https://i.ibb.co/MMnYxyj/dochub-brands.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://diskchord.com/" />
        <meta
          property="twitter:title"
          content="DiskChord — Share your life music experience"
        />
        <meta property="twitter:description" content="Social Media Next JS" />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/MMnYxyj/dochub-brands.png"
        />

        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <title>DiskChord</title>
      </Head>
      <div 
        className='flex items-center h-screen' 
        style={{backgroundImage : `url(/bg1-mirror.png)`, backgroundSize:`cover`, maxWidth : '100%'}}
      >
        <div className='flex flex-col items-center justify-center space-y-9 h-[80%] container mx-auto bg-white opacity-80 border shadow-md border-slate-200 relative'>
          <h1 className='absolute top-20 text-4xl'>Reset Password</h1>
          <div className='w-[50%] flex flex-col items-center justify-center space-y-10'>
            <div className='w-full flex flex-col items-center justify-center relative'>
              <p className='w-[35%] px-4 text-base'>New Password : </p>
              <input type={show} className='w-[35%] rounded-full bg-bgInput border-gray-400' onChange={(e) => setPassword(e.target.value)}/>
              <span className='bg-transparent border-0 rounded-full absolute cursor-pointer top-7 right-64 py-2 px-4' onClick={btnShow}>
              {show === "password" ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
              </span>
              <small className='my-1 w-[35%] px-4 h-[20px] text-sm'>Password strength : {
                passwordStrength === "Weak" ? (
                  <small className='text-red-500 font-bold inline text-sm'>{passwordStrength}</small>
                ) : passwordStrength === "Medium" ? (
                  <small className='text-yellow-400 font-bold inline text-sm'>{passwordStrength}</small>
                ) : (
                  <small className='text-green-400 font-bold inline text-sm'>{passwordStrength}</small>
                )
                
              }</small>
            </div>
            <div className='w-full flex flex-col items-center justify-center relative'>
              <p className='w-[35%] px-4 text-base'>Confirm New Password : </p>
              <input type={visibility} className='w-[35%] rounded-full bg-bgInput border-gray-400' onChange={(e) => setRepeatPassword(e.target.value)}/>
              <span className='bg-transparent border-0 rounded-full absolute cursor-pointer top-7 right-64 py-2 px-4' onClick={btnHide}>
              {visibility === "password" ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
              </span>
              <small className='my-1 w-[35%] px-4 text-red-500 font-bold h-[20px]'>{checkRepeat}</small>
            </div>
          <button 
            className='w-40 h-12 bg-blue-400 text-white px-4 py-1.5 rounded-full font-semibold shadow-md hover:brightness-90'
            onClick={btnSubmit}
          >
            Submit
          </button>
          </div>
        </div>
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
  return {
    props : {
      obj : {},
      token : context.params.token
    }
  }
}