import React from "react";
import Link from "next/link";

export default function Tabs(props) {
  return (
    <div className="border-b border-secondaryHover">
      <div className="flex items-center justify-between">
        <Link href="/profile">
          <div className="text-center w-[50%] hover:bg-gray-50 cursor-pointer">
            <h1 className={`${props.active === "tweet" && "font-bold"} py-2.5`}>
              Tweets
            </h1>
          </div>
        </Link>
        <Link href='/profile/likes'>
          <div className="text-center w-[50%] hover:bg-gray-50 cursor-pointer">
            <h1 className={`${props.active === "likes" && "font-bold"} py-2.5`}>
              Likes
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
