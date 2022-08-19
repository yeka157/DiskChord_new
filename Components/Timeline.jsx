import { MusicNoteIcon } from '@heroicons/react/outline';
import React from 'react';
import Feed from './Feed';
import Tweet from './Tweet';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Timeline() {
    const [list, setList] = React.useState([]);
    const [post, setPost] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);

    const getPost = () => {
        Axios.get('http://localhost:3105' + '/tweet/all')
        .then((res) => {
            setList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const getMorePost = async() => {
        try {
            // console.log(list.length);
            let res = await Axios.post('http://localhost:3105' + '/tweet/more', {
                offset : list.length,
                limit : 10
            })
            console.log(res.data);
            if (res.data.length > 0) {
                setList([...list, ...res.data]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(()=> {
        getPost();
    }, []);

    const refreshPost = async() => {
        try {
            let res = await Axios.post('http://localhost:3105' + '/tweet/more', {
                offset : 0,
                limit : list.length
            })
            if (res.data.length > 0) {
                setList(res.data);
                console.log("berhasil");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className='xl:ml-[300px] border-x border-secondaryHover xl:min-w-[672px] sm:ml-[70px] flex-grow max-w-2xl'>
        <div className='flex py-2 px-3 justify-between sticky top-0 z-50 bg-neutral border-b border-secondaryHover'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hoverMouse flex items-center justify-center px-0 ml-auto w-10 h-10'><MusicNoteIcon className='h-6'/></div>
        </div>
        <Tweet function={refreshPost}/>
        {/* <button onClick={getMorePost} className='my-5 bg-slate-700 text-neutral'>TESTING</button> */}
        <InfiniteScroll 
            dataLength={list.length} 
            next={getMorePost} 
            hasMore={hasMore} 
            loader={<h3 style={{'fontWeight' : '700', 'textAlign' : 'center', 'margin' : '10px 0'}}> Loading...</h3>} 
            endMessage={<h4 style={{'fontWeight' : '700', 'textAlign' : 'center', 'margin' : '10px 0'}}>You&apos;ve reached the bottom of the timeline</h4>}
        >
        {list.map((val) => {
            return (
                    <Feed key={val.idPost} post={val} function={refreshPost}/>
            )
        })}
        </InfiniteScroll>
    </div>
  )
}
