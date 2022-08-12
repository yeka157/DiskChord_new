import React from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  
  const Router = useRouter();

  const btnVerify = () => {

  }

  return (
    <div>
        <h1>Verify Your Account</h1>
        <button onClick={btnVerify}>Click here to Verify</button>
    </div>
  )
}
