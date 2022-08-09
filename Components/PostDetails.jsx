import { ArrowLeftIcon, MusicNoteIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import React from 'react';
import Feed from './Feed';
import Axios from 'axios';

export default function PostDetails(props) {

    const [list, setList] = React.useState([]);

    const getPost = () => {
        Axios.get(`http://localhost:3105' + 'tweet/postDetails`, {
            idPost : {idPost}
        })
        .then((res) => {
            setList(res.data);
        }).catch((err) => {
            console.log(err);
        })
    };

    React.useEffect(()=> {
        // getPost();
        console.log(list);
        console.log(props.params);
    }, []);

  return (
    <div className='xl:ml-[300px] border-x border-secondaryHover xl:min-w-[672px] sm:ml-[70px] flex-grow max-w-2xl'>
        <div className='flex py-2 px-3 justify-between sticky top-0 z-50 bg-neutral border-b border-secondaryHover'>
            <div className='flex items-center justify-center space-x-3'>
                <Link href='/home'>
                    <div className='hoverMouse flex items-center justify-center px-0 ml-auto w-10 h-10'>
                        <ArrowLeftIcon className='h-6'/>
                    </div>
                </Link>
                <h2 className='text-lg sm:text-xl font-bold cursor-default'>Home</h2>
            </div>
            <div className='hoverMouse flex items-center justify-center px-0 ml-auto w-10 h-10'><MusicNoteIcon className='h-6'/></div>
        </div>
        {list.map((val) => {
            return <Feed key={val.idPost} post={val}/>
        })}
        <h1>POST</h1>
    </div>
  )
}
