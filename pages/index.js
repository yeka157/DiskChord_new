import { Divider, Checkbox, useToast, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { FaDochub, FaFacebook, FaReddit } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import React from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Home() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [textInput, setTextInput] = React.useState('');
  const [button, setButton] = React.useState(true);
  const [visibility, setVisibility] = React.useState('password');
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [throttle, setThrottle] = React.useState(false);
  const [forgot, setForgot] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState('');
  const [buttonReset, setButtonReset] = React.useState(true);

  const router = useRouter();
  const toast = useToast();

  const btnLogin = async() => {
    try {
      setThrottle(true); // disable and throttle
      setTimeout(async() => {
        try {
          let res = await Axios.post('http://localhost:3105/auth/login', {
            email,
            username,
            password
          });
          if (res.data.idusers) {
            localStorage.setItem('diskchord', res.data.token);
            router.replace('/home');
          } else {
            toast({
              title : 'Wrong password',
              description : 'Wrong username or password',
              status : 'error',
              duration : 3000,
              isClosable : true
            })
          }
          setTextInput('');
          setPassword('');
          setEmail('');
          setUsername('');
          setThrottle(false);
        } catch (error) {
          console.log(error);
        }
      }, 2500);
    } catch (error) {
      console.log(error);
      toast({
        title : 'Error Login',
        description : 'Error Login',
        status : 'error',
        duration : 3000,
        isClosable : true
      })
      setButton(false);
    }
  }

  const btnShow = () => {
    if (visibility === "password") {
      setVisibility("text");
    } else if (visibility === "text") {
      setVisibility("password");
    }
  }

  const btnForgot = () => {
    console.log("test");
    if (forgot) {
      setForgot(false);
      setTextInput('');
      setPassword('');
    } else if (!forgot) {
      setForgot(true);
      setForgotEmail('');
    }
  }

  const btnSendReset = async() => {
    try {
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (forgotEmail.match(mailFormat)) {
        let res = await Axios.post(`http://localhost:3105/auth/sendEmail`, {
          email : forgotEmail
        });
        if (res.data.success) {
          localStorage.setItem('resetJwt', res.data.token);
          toast({
            title : 'Email sent',
            description : 'Please check your email',
            status : 'success',
            duration : 3000,
            isClosable : true
          })
          setForgotEmail('');
          setForgot(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    let text = textInput.replace(/^\s+|\s+$/gm, "");
    let text1 = password.replace(/^\s+|\s+$/gm, "");
    if (text && text1) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [textInput, password]);

  React.useEffect(()=> {
    let token = localStorage.getItem('diskchord');
    if (token) {
      Axios.get('http://localhost:3105/auth/keep', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.idusers) {
          setData(res.data);
        }
      })
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 2000);
  }, [loading]);

  React.useEffect(() => {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (textInput.match(mailFormat)){
      setEmail(textInput);
      setUsername('');
    } else {
      setUsername(textInput);
      setEmail('');
    }
  }, [textInput, email, username]);

  React.useEffect(() => {
    let text = forgotEmail.replace(/^\s+|\s+$/gm, "");
    if (text) {
      setButtonReset(false);
    } else {
      setButtonReset(true);
    }
  })

  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <meta name="title" content="DiskChord" />
        <meta name='description' content='Social Media Next JS' />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diskchord.com/" />
        <meta property="og:title" content="DiskChord — Share your life music experience" />
        <meta property="og:description" content="Social Media Next JS" />
        <meta property="og:image" content="https://i.ibb.co/MMnYxyj/dochub-brands.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://diskchord.com/" />
        <meta property="twitter:title" content="DiskChord — Share your life music experience" />
        <meta property="twitter:description" content="Social Media Next JS" />
        <meta property="twitter:image" content="https://i.ibb.co/MMnYxyj/dochub-brands.png" />

        <meta name='theme-color' content='#000000' />
        <link rel="icon" href="/favicon.ico" />
        <title>DiskChord</title>
      </Head>
      {loading ? (
        <div className='flex items-center justify-center h-screen w-full'>
          <Spinner
            size='xl' 
            thickness='4px' 
            speed='0.7s' 
            emptyColor='gray.200' 
            color='blue.400'/>
        </div>
      ) : 
        data.idusers ? (
      <div className='flex items-center justify-center min-h-screen'>
        <h1 className='text-6xl'>404 Error Page Not Found</h1> 
      </div>
      ) : (
      <div style={{ backgroundImage: `url(/bg1-mirror.png)`, backgroundSize: 'cover', overflow: 'hidden', maxWidth: '100%' }} className='h-screen flex items-center'>
        <div className='container mx-auto h-[75vh] lg:max-w-[1320px] lg:min-w-[1320px]'>
          <div className='h-full lg:grid grid-cols-3 flex flex-col'>
            <div className='bg-white lg:col-span-2 col-span-3'>
              <div className='absolute hidden lg:block cursor-pointer'>
                <div className='flex items-center m-3'>
                  <FaDochub size={30} color='#3182CE' />
                  <h3 className='text-xl text-third font-semibold'>DiskChord</h3>
                </div>
              </div>
              <div className='flex items-center h-full justify-center'>
                <div className='mx-auto text-center w-full space-y-5'>
                  <h1 className='text-5xl font-bold text-secondary'>Login to Your Account</h1>
                  <h4 className='text-lg text-secondary font-normal'>Login using social networks</h4>
                  <div className='flex items-center justify-center my-5 space-x-2'>
                    <FaFacebook size={30} color='#4267B2' className='cursor-pointer' />
                    <FcGoogle size={30} className='cursor-pointer' />
                    <FaReddit size={30} color='#FF4500' className='cursor-pointer' />
                  </div>
                  <div className='flex justify-center items-center my-3'>
                    <div className='w-[75%] flex justify-center items-center space-x-2'>
                      <Divider borderColor='#040615' />
                      <p>OR</p>
                      <Divider borderColor='#040615' />
                    </div>
                  </div>
                  {forgot ? (
                    <>
                    <div className='flex flex-col items-center space-y-3.5'>
                      <input type='text' placeholder='Email' value={forgotEmail} className='rounded-full bg-bgInput w-full md:w-[50%] border-gray-400' onChange={(e) => {setForgotEmail(e.target.value)}}/>
                    </div>
                    <div className='space-x-5'>
                    <button className='bg-telegram hover:brightness-90 w-32 h-12 rounded-full text-neutral font-bold disabled:opacity-50 disabled:hover:brightness-100'
                      onClick={btnSendReset} disabled={buttonReset}
                      >
                      Send
                    </button>
                    <button className='w-32 h-12 rounded-full bg-facebook text-neutral font-bold hover:brightness-90' onClick={btnForgot}>Back</button>
                    </div>
                    </>
                  ) : (
                    <>
                    <div className='flex flex-col items-center space-y-3.5'>
                      <input type='text' placeholder='Username or Email' value={textInput} className='rounded-full bg-bgInput w-full md:w-[50%] border-gray-400' onChange={(e) => {setTextInput(e.target.value)}} />
                      <div className='w-full relative'>
                        <input type={visibility} placeholder='Password' value={password} className='rounded-full bg-bgInput w-full md:w-[50%] border-gray-400' onChange={(e) => {setPassword(e.target.value)}} />
                        <span className='bg-transparent border-0 rounded-full absolute cursor-pointer top-1 right-56 py-2 px-4' onClick={btnShow}>
                          {visibility === "password" ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                        </span>
                      </div>
                      <Checkbox className='text-start px-2.5 w-full md:w-[50%] text-sm'>Keep me signed in</Checkbox>
                      <p className='text-end px-2.5 w-full md:w-[50%] text-sm hover:underline hover:text-primary cursor-pointer' onClick={btnForgot}>Forgot Password?</p>
                    </div>
                    {throttle ? <><Spinner size='md' thickness='4px' speed='0.7s' emptyColor='gray.200' color='blue.400'/></> : 
                      <button className='bg-telegram hover:brightness-90 w-40 h-12 rounded-full text-neutral font-bold disabled:opacity-50 disabled:hover:brightness-100' 
                      onClick={btnLogin} disabled={button}>Sign In</button>
                    }
                    </>
                  )
                }
                </div>
              </div>
            </div>
            <div className='bg-bglight bg-opacity-75 col-span-1'>
              {/* responsive utk mobile yg bagian ini harusnya ada dibawah belum jalan, yg bagian login jga masih nabrak klo mobile */}
              <div className='flex items-center justify-center flex-col h-full space-y-4 mt-10 xl:mt-0'>
                <h1 className='text-4xl font-bold text-center text-primary'>New Here?</h1>
                <h4 className='text-base px-16 mx-10 text-center text-primary'>Sign up and discover a great amount of new opportunities!</h4>
                <Link href='/register'>
                  <button className='bg-facebook rounded-full w-40 h-12 text-white hover:brightness-90 font-bold'>Join Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
      }
    </div>
  )
}
