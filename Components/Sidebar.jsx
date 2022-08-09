import Image from "next/image";
import React from "react";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import {
  HiHome,
  HiOutlineHome,
  HiHashtag,
  HiOutlineHashtag,
  HiBell,
  HiOutlineBell,
  HiInbox,
  HiOutlineInbox,
  HiBookmark,
  HiOutlineBookmark,
  HiClipboard,
  HiOutlineClipboard,
  HiUser,
  HiOutlineUser,
  HiDotsHorizontal,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import Axios from "axios";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

export default function Sidebar(props) {
  const [data, setData] = React.useState([]);


  const btnLogout = () => {
    
  }

  React.useEffect(() => {
    let token = localStorage.getItem("diskchord");
    if (token) {
      Axios.get("http://localhost:3105/auth/keep", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.data.idusers) {
            localStorage.setItem("diskchord", res.data.token);
            delete res.data.token;
            setData(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []); //keepLogin

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full justify-between">
      <div>
        {/* LOGO */}
        <Link href="/home">
          <div className="hoverMouse flex items-center justify-center hover:bg-blue-50 xl:px-1 w-[52px] h-[52px]">
            <Image
              src="/dochub-brands.png"
              alt="logo"
              width="30"
              height="30"
              className="m-auto"
            />
          </div>
        </Link>

        {/* Menu */}
        <div className="mt-4 mb-2.5 xl:items-start">
          {data.status === "Unverified" ? (
            <></>
          ) : (
            <>
              <SidebarMenu
                text="Home"
                Icon={props.active == "home" ? HiHome : HiOutlineHome}
                active={props.active == "home" ? true : false}
                link="home"
              />
              <SidebarMenu
                text="Explore"
                Icon={props.active == "explore" ? HiHashtag : HiOutlineHashtag}
                active={props.active == "explore" ? true : false}
              />
              <SidebarMenu
                text="Notifications"
                Icon={props.active == "notifications" ? HiBell : HiOutlineBell}
              />
              <SidebarMenu
                text="Messages"
                Icon={props.active == "messages" ? HiInbox : HiInbox}
              />
              <SidebarMenu
                text="Bookmarks"
                Icon={
                  props.active == "bookmark" ? HiBookmark : HiOutlineBookmark
                }
              />
              <SidebarMenu
                text="Lists"
                Icon={
                  props.active == "lists" ? HiClipboard : HiOutlineClipboard
                }
              />
            </>
          )}
          <SidebarMenu
            text="Profile"
            Icon={props.active == "profile" ? HiUser : HiOutlineUser}
            active={props.active == "profile" ? true : false}
            link="profile"
          />
          {data.status === "Unverified" ? (
            <></>
          ) : (
            <>
              <SidebarMenu
                text="More"
                Icon={
                  props.active == "more"
                    ? HiDotsHorizontal
                    : HiOutlineDotsHorizontal
                }
              />
            </>
          )}
        </div>
        {/* POST */}
        {data.status === "Unverified" ? (
          <></>
        ) : (
          <>
            <button className="bg-blue-400 text-neutral rounded-full w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline">
              Post
            </button>
          </>
        )}
      </div>

      {/* PROFILE */}
      <div className="hoverMouse text-gray-700 flex items-center justify-center xl:justify-start space-x-1 w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center justify-center xl:justify-start space-x-1 w-[75%]">
            <Image
              src={
                data.user_profilepicture
                  ? data.user_profilepicture
                  : "/default.jpg"
              }
              alt="profile-img"
              width="40"
              height="40"
              className="rounded-full"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{data.name}</h4>
              <p>@{data.username}</p>
            </div>
          </div>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              size="md"
              color="whiteAlpha"
              style={{width:'5px', padding:'0px'}}
              align='center'
              className='mx-auto'
            >
              {/* <div className="flex items-center justify-center p-0 w-[20px] mx-auto"> */}
                <DotsHorizontalIcon className="h-8 m-0 hidden xl:inline mx-auto" />
              {/* </div> */}
            </MenuButton>
            <MenuList>
              <Link href="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuItem onClick={btnLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}
