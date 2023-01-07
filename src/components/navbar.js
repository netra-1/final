import React from 'react';
import { HiMenuAlt3, HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDashboard, MdNotificationsActive, MdDinnerDining, MdDesignServices } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { BiDrink, BiCalendarEvent, BiChat } from "react-icons/bi";
import { GiVikingLonghouse, GiStairsCake } from "react-icons/gi";
import { FaUserShield, FaUserFriends } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {useState} from 'react';
import Body from './body';
import AdminLogin from './manager/login/login';
import ResetPassword from './staff/reset_password/reset_password';

const Navbar =()=>{

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path)

  const LogOut=()=>{
    localStorage.clear();
    window.location.replace('/login');
}
    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        { name: "Staffs", link: "/staff", icon: FaUserShield },
        { name: "Users", link: "/customer", icon: FaUserFriends },
        { name: "Venue", link: "/all_venue", icon: GiVikingLonghouse, margin: true },
        { name: "Theme", link: "/theme", icon: HiOutlineLightBulb },
        { name: "Cakes", link: "/cake", icon: GiStairsCake },
        { name: "Drinks", link: "/drink", icon: BiDrink },
        // { name: "Food Menu", link: "/food", icon: MdDinnerDining },
        { name: "Decoration", link: "/decoration", icon: MdDesignServices },
        { name: "Announcement", link: "/announcement", icon: MdNotificationsActive, margin: true },
        { name: "Logout", link: "/announcement", icon: MdNotificationsActive },
      ];

      const staff_menus = [
        { name: "Dashboard", link: "/staff_dashboard", icon: MdOutlineDashboard },
        { name: "Users", link: "/customer", icon: FaUserFriends },
        { name: "Events", link: "/event", icon: BiCalendarEvent },
        { name: "Chat", link: "/staff/chat", icon: BiChat },
        { name: "Settings", link: "/staff/profile", icon: RiSettings4Line, margin: true },
      ];

    const [open, setOpen] = useState(true);

    var menu;

    //admin header
    if (localStorage.getItem('token') && localStorage.getItem('category')=="MANAGER"){
        menu = (
          <>
          <div className="flex">
          <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {/* {(()=>{
                    if(menu?.name == "Logout"){
                      return(
                        <>
                          {menu?.name}
                        </>
                      )
                    } else{
                      return(
                        <>
                          {menu?.name}
                        </>
                      )
                    }
                  })} */}
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
            <button onClick={()=>{LogOut()}} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Logout
            </button>
          </div>
        </div>
        <div className="flex-auto text-xl text-gray-900 font-semibold">
          {
            <Body />
          }
        </div>
        </div>
        </>
        )
    } 
    else if (localStorage.getItem('token') && localStorage.getItem('category')=="STAFF"){
      menu = (
        <>
        <div className="flex">
        <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {staff_menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          <button onClick={()=>{LogOut()}} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Logout
          </button>
          
        </div>
      </div>
      <div className="m-3 flex-auto text-xl text-gray-900 font-semibold">
        {
          <Body />
        }
      </div>
      </div>
      </>
      )
  }
    
    else if(path=="login"){
      menu = (
        <>
      <div className="flex-auto text-xl text-gray-900 font-semibold">
        {
          <AdminLogin />
        }
      </div>
      </>
      )
    }
    else if(path=="reset_password"){
      menu = (
        <>
      <div className="flex-auto text-xl text-gray-900 font-semibold">
        {
          <ResetPassword />
        }
      </div>
      </>
      )
    }

    return(
      <>
        {menu}
      </>
    )
}

export default Navbar;