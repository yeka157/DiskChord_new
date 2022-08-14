import Head from "next/head";
import React from "react";
import DirectMessage from "../../Components/DirectMessage";
import Sidebar from "../../Components/Sidebar";
import Timeline from "../../Components/Timeline";
import Axios from 'axios';
import Link from 'next/link';
import { Spinner } from "@chakra-ui/react";

export default function Index() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
    }, 1000);
  })

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
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <Spinner 
            size='xl' 
            thickness="4px" 
            speed="0.7s" 
            emptyColor="gray.200" 
            color="blue.400" 
          />
        </div>
      ) : data.status === "Unverified" ? (
      <>
      <div className="flex flex-col items-center justify-center space-y-3 min-h-screen max-w-7xl mx-auto">
        <h1 className="text-5xl text-center">You can only use this page after you verify your account</h1>
        <Link href='/profile'>
          <button className="bg-blue-400 text-neutral rounded-full w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg ">Go to profile</button>
        </Link>
      </div>
      </>
      ) : (
      <>
      <section className="flex min-h-screen max-w-7xl mx-auto">
        <Sidebar active="home"/>
        <Timeline/>
      </section>
      <DirectMessage/>
      </>
      )
      }
    </div>
  );
}
