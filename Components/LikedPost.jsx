import { ArrowLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react'
import NewBio from './NewBio';
import Tabs from './Tabs';
import Axios from 'axios';
import Feed from './Feed';
export default function LikedPost(props) {
    const [list, setList] = React.useState([]);
    const [data, setData] = React.useState([]);

    const getPost = async() => {
        try {
            let token = localStorage.getItem('diskchord');
            let res = await Axios.get(`http://localhost:3105/tweet/liked`, {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            setList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const refreshUser = () => {
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
      }

    
    React.useEffect(() => {
        getPost();
    }, []);

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

  return (
    <div className="xl:ml-[300px] border-x border-secondaryHover xl:min-w-[672px] sm:ml-[70px] flex-grow max-w-2xl">
      <div className="flex py-2 px-3 justify-start items-center sticky top-0 z-50 bg-opacity-90 bg-white border-secondaryHover border-b space-x-10">
        <div className="flex space-x-10 items-center">
          <div className="hoverMouse flex items-center justify-center px-0 ml-auto w-10 h-10">
            {data.status === "Unverified" ? 
            <ArrowLeftIcon className="h-6" /> :
            <Link href="/home">
              <ArrowLeftIcon className="h-6" />
            </Link>
            }
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold cursor-pointer sm:text-xl">
              {data.name}
            </h2>
            <h4 className="text-sm font-light cursor-pointer sm:text-md">
              @{data.username}
            </h4>
          </div>
        </div>
      </div>
      <NewBio user={data} function={refreshUser}/>
      <Tabs active={props.open}/>
      {/* <Bio /> */}
      {list.map((val) => {
        return <Feed key={val.idPost} post={val} user={data} function={getPost}/>
      })}
    </div>
  )
}
