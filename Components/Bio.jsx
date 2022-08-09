import {
  CakeIcon,
  CalendarIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import React from "react";
import Feed from "./Feed";
import Axios from 'axios';
export default function Bio() {

  const [data, setData] = React.useState([]);

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
    }
  })
  return (
    <div className="flex space-x-3 ">
      <div className="">
        <div className="w-full h-[30%]">
          <img
            src="https://images.unsplash.com/photo-1658195771962-93726079f35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="banner-img"
            className="w-full h-full cursor-pointer hover:brightness-90"
          />
        </div>
        <div className="">
          <div className="flex justify-between">
            <img
              src={data.user_profilepicture ? data.user_profilepicture : '/default.jpg'}
              alt="profile-img"
              className="h-32 w-32 rounded-full cursor-pointer hover:brightness-90 relative bottom-[64px] left-2 p-0 border-2 border-black" 
              style={{border:'5px solid white'}}
            />
            <div>
            {data.status === "Unverified" ? 
            <button className="my-2.5 mx-1.5 w-30 h-12 rounded-full bg-secondaryHover text-secondary px-4 py-1.5 font-semibold hover:brightness-90 shadow-md">
              Verify Account
            </button>
            :
            <></>
            }
            <button className="my-2.5 mx-1.5 w-30 h-12 rounded-full bg-secondaryHover text-secondary px-4 py-1.5 font-semibold hover:brightness-90 shadow-md">
              Edit profile
            </button>
            </div>
          </div>
          <div className="space-y-3 relative bottom-16">
            <div className="space-y-1 mx-2.5">
              <h1>{data.name}</h1>
              <h4>@{data.username}</h4>
            </div>
            <div className="flex items-center justify-start space-x-3">
              <div className="flex items-center space-x-1">
                <LocationMarkerIcon className="h-10 text-gray-600 p-2.5" />
                <h4 className="text-gray-600 text-sm font-base hover:underline cursor-pointer">
                  Bandung, Indonesia
                </h4>
              </div>
              <div className="flex items-center space-x-1">
                <CakeIcon className="h-10 text-gray-600 p-2.5" />
                <h4 className="text-gray-600 text-sm font-base">
                  Born, 31 May 2000
                </h4>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-10 text-gray-600 p-2.5" />
                <h4 className="text-gray-600 text-sm font-base">
                  Joined July 2022
                </h4>
              </div>
            </div>
            <div className="flex items-center justify-start mx-2.5 space-x-2">
              <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                <h1 className="text-gray-700 font-base">
                  <span className="text-secondary font-bold cursor-pointer">
                    52
                  </span>{" "}
                  Following
                </h1>
              </div>
              <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                <h1 className="text-gray-700 font-base">
                  <span className="text-secondary font-bold cursor-pointer">
                    60
                  </span>{" "}
                  Followers
                </h1>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly h-10 relative bottom-16">
            <div className="w-[25%] h-full flex items-center justify-center text-center hover:bg-gray-200 cursor-pointer border-b border-gray-400 ">
              Tweet
            </div>
            <div className="w-[25%] h-full flex items-center justify-center text-center hover:bg-gray-200 cursor-pointer border-b border-gray-400 ">
              Tweet & replies
            </div>
            <div className="w-[25%] h-full flex items-center justify-center text-center hover:bg-gray-200 cursor-pointer border-b border-gray-400 ">
              Media
            </div>
            <div className="w-[25%] h-full flex items-center justify-center text-center hover:bg-gray-200 cursor-pointer border-b border-gray-400 ">
              Likes
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
