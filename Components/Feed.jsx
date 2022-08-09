import { DotsHorizontalIcon, HeartIcon, RefreshIcon, ReplyIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';
import Axios from 'axios';
import React from 'react';
import moment from 'moment';
import { HiDotsHorizontal, HiOutlineDotsHorizontal, HiHeart, HiOutlineHeart, HiRefresh, HiOutlineRefresh, HiReply, HiOutlineReply, HiShare, HiOutlineShare } from 'react-icons/hi';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
export default function Feed(props) {
    const [refresh, setRefresh] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [totalLike, setTotalLike] = React.useState(0);
    const [totalComment, setTotalComment] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [edit, setEdit] = React.useState(true);
    const [button, setButton] = React.useState(false);

    moment().format();
    
    const btnChangeGreen = () => {
        setRefresh(!refresh);
    }

    const btnLike = () => {
        if (!like) {
            Axios.post('http://localhost:3105/likes/add', {
                idPost : props.post.idPost,
                user_id : res.data.idusers
            }).then((res) => {
                setLike(!like);
                let total = totalLike
                setTotalLike(total++);
            })
        } else if (like) {
            Axios.post('http://localhost:3105/likes/unlike', {
                id : props.post.idPost,
                user_id : res.data.idusers
            }).then((res) => {
                setLike(!like);
                setTotalLike(totalLike--);
            })
        }
    }

    const btnEdit = () => {
        setEdit(!edit);
        setButton(true);
    }

    const btnSave = () => {
        setButton(false);
        setEdit(!edit);
    }

    const btnPostDetail = () => {

    }

    React.useEffect(() => {
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
        };
    });
    
  return (
    <div className='flex p-3 cursor-pointer border-b border-secondaryHover'>

        {/* PROFILE */}
        <img src={props.post.user_profilepicture ? props.post.user_profilepicture : '/default.jpg'} alt="user-img" className='aspect-square h-11 w-11 rounded-full mr-4 hover:brightness-90 cursor-pointer'/>


        {/* Content and everything */}
        <div className='w-full'>

            {/* header */}
            <div className='flex items-center justify-between'>

                {/* user info */}
                <div className='flex items-center space-x-1.5 whitespace-nowrap'>
                    <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{props.post.name}</h4>
                    <span className='text-sm sm:text-[15px]'>@{props.post.username} - </span>
                    <span className='text-sm sm:text-[15px]'>{moment(props.post.date).fromNow()}</span>
                </div>

                {/* options icon */}
                <DotsHorizontalIcon className='h-10 w-10 hoverMouse text-gray-500 p-2 hover:text-sky-400'/>
            </div>

            {/* post div */}
            <p className='text-gray-700 text-[15px] sm:text-[16px] mb-2' hidden={!edit}>{props.post.text}</p>
            <input type="text" hidden={edit} defaultValue={props.post.text} className='w-full border-b border-0 border-secondary focus:ring-0 placeholder-gray-700 tracking-wide text-gray-700 mb-2'/>
            { props.post.image && <img src={'http://localhost:3105' + props.post.image} alt="post-img" className='rounded-2xl mr-2 hover:brightness-90 cursor-pointer' /> }
            <div className='flex justify-between text-gray-600 p-2'>
                <HiOutlineReply className='hoverEmoji h-9 w-9 p-2 text-gray-600 hover:text-sky-400' onClick={btnPostDetail}/> 
                {refresh ?
                <HiRefresh className='text-green-400 hoverEmoji h-9 w-9 p-2' onClick={btnChangeGreen}/> :
                <HiOutlineRefresh className='hoverEmoji h-9 w-9 p-2 text-gray-600 hover:text-green-400' onClick={btnChangeGreen}/>
                 }
                {like ? 
                <div className='flex items-center justify-center cursor-pointer w-[50px]' onClick={btnLike}>
                    <p>{props.post.likes.length}</p>
                    <HiHeart className='text-red-500 hoverEmoji h-9 w-9 p-2'/> 
                </div>
                    :
                <div className='flex items-center justify-center cursor-pointer w-[50px]' onClick={btnLike}>
                    <p>{props.post.likes.length}</p>
                    <HiOutlineHeart className='hoverEmoji h-9 w-9 p-2 text-gray-600 hover:text-red-500'/>
                </div>
                 }
                <HiOutlineShare className='hoverEmoji h-9 w-9 p-2 text-gray-600 hover:text-sky-400'/>
                {data.idusers === props.post.user_id ? 
                button ?
                <AiOutlineSave className='hoverEmoji h-9 w-9 p-2 text-gray-600 hover:text-green-400' onClick={btnSave}/> 
                : 
                <AiOutlineEdit className='hoverEmoji h-9 w-9 p-2 text-gray-600 hover:text-green-400' onClick={btnEdit}/> 
                :
                <></>}
                {data.idusers === props.post.user_id && <AiOutlineDelete className='hoverEmoji h-9 w-9 p-2 text-gray-600 hover:text-red-500'/>}
            </div>
        </div>
    </div>
  )
}