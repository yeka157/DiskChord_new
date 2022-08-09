import React from "react";
import Link from 'next/link';
export default function SidebarMenu(props) {
  return (
    <Link href={`/${props.link}`}>
      <div className="hoverMouse flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
        <props.Icon size={28} />
        <span className={`${props.active && "font-bold"} hidden xl:inline`}>
          {props.text}
        </span>
      </div>
    </Link>
  );
}
