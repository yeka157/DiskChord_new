import React from 'react';
import Head from 'next/head';


export default function index() {
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
      
    </div>
  )
}
