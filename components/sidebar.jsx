'use client';
import React, { useState } from 'react' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBoxOpen, faCirclePlus, faUsersGear,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NProgress from 'nprogress';

const itemsMenu = [
      { name: "Dashboard", icon: faChartLine,link:"/Dashboard" },
      { name: "Products", icon: faBoxOpen,link:"/Dashboard/Products" },
      { name: "Add Product", icon: faCirclePlus, link:"/Dashboard/Products/addProducts" },
      { name: "Users", icon: faUsersGear,link:"/Dashboard/Users" },
      { name: "Logout", icon: faRightFromBracket,link:"/" },
];


export const Sidebar = () => {

      const path=usePathname();
      
      return (
      <div className="sidebar">

            <h3>My Store</h3>

            <ul>
            {itemsMenu.map((ele,index)=>{
                  const isActive=path;
                  return(
                  <Link key={ele.name} href={ele.link} className="link" onClick={()=>{NProgress.start()}} > 
                  <li  className={`nav-item ${isActive=== ele.link ? `active` : ""}`}>
                  <FontAwesomeIcon icon={ele.icon} className="sidebar-icon" />
                  <span>{ele.name}</span>
                  </li>
                  </Link>
                  )
            })}
            </ul>
      </div>
      )
}
