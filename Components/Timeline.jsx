import { MusicNoteIcon } from '@heroicons/react/outline';
import React from 'react';
import Feed from './Feed';
import Tweet from './Tweet';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';
export default function Timeline() {
    const [list, setList] = React.useState([]);

    const getPost = () => {
        Axios.get('http://localhost:3105' + '/tweet/all')
        .then((res) => {
            setList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    };


    React.useEffect(()=> {
        getPost();
    }, []);

    
  return (
    <div className='xl:ml-[300px] border-x border-secondaryHover xl:min-w-[672px] sm:ml-[70px] flex-grow max-w-2xl'>
        <div className='flex py-2 px-3 justify-between sticky top-0 z-50 bg-neutral border-b border-secondaryHover'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hoverMouse flex items-center justify-center px-0 ml-auto w-10 h-10'><MusicNoteIcon className='h-6'/></div>
        </div>
        <Tweet function={getPost}/>
        {list.map((val) => {
            return (
            <Link key={val.idPost} href={'/post/' + val.idPost}>
                <div className='m-0 p-0'>
                    <Feed key={val.idPost} post={val}/>
                </div>
            </Link>
            )
        })}
    </div>
  )
}
