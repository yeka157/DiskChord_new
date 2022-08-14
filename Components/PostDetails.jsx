import { ArrowLeftIcon, MusicNoteIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import React from 'react';
import Feed from './Feed';
import Axios from 'axios';
import Comment from './Comment';
import TweetReply from './TweetReply';

export default function PostDetails(props) {

    const [list, setList] = React.useState([]);
    const [listComment, setListComment] = React.useState([]);

    const getPost = async() => {
        try {
            let res = await Axios.get(`http://localhost:3105/tweet/postDetails/${props.params}`)
            // console.log(res.data);
            setList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getComment = async() => {
        try {
            let res = await Axios.get(`http://localhost:3105/comment/${props.params}`);
            // console.log(res);
            setListComment(res.data);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(()=> {
        getPost();
        getComment();
        console.log(props.params);
        console.log(listComment);
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
        {listComment.map((val) => {
            return <Comment key={val.idPost} post={val}/>
        })}
        <div className='flex justify-end mt-2'>
        <button 
            className='bg-blue-400 text-white font-bold px-2 py-1 rounded-full hover:brightness-90'
        >
            Show More
        </button>
        </div>
        <TweetReply id={list.idPost}/>
    </div>
  )
}
