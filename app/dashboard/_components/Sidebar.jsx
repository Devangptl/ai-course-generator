"use client"
import { UserCourseListContext } from '@/app/_contax/UserCourseListContext';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { HiOutlineHome, HiOutlineSquare3Stack3D, HiOutlineShieldCheck, HiOutlinePower } from "react-icons/hi2";

const Sidebar = () => {

  const {userCourseList , setUserCourseList} = useContext(UserCourseListContext)

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard"
    },
    {
      id: 1,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore"
    },
    {
      id: 1,
      name: "Upgrade",
      icon: <HiOutlineShieldCheck />,
      path: "/dashboard/upgrade"
    },
    {
      id: 1,
      name: "Logout",
      icon: <HiOutlinePower />,
      path: "/dashboard/logout"
    },
  ]

  const path = usePathname()

  return (
    <div className='fixed h-full p-5 shadow-md md:w-64'>
      <div className='flex items-center justify-center'>
        <Link href={"/"}>
          <Image src={"/logo2.png"} width={147} height={100} alt='logo' className='drop-shadow-2xl' />
        </Link>
      </div>
      <hr className='my-3' />

      <div>
        {
          Menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <div className={`${item.path == path && "bg-gray-100 text-black"} flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-md m-3`} >
                <div className='md:text-2xl'>{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </Link>
          ))
        }
      </div>

      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={(userCourseList?.length/5)*100} />
        <h2 className='my-3 text-sm font-semibold'>{userCourseList?.length} Out of 5 Course created</h2>
        <Link href={"/dashboard/upgrade"} className='text-xs text-gray-500 '>Upgrade your plan for unlimited course generate</Link>
      </div>
    </div>
  )
}

export default Sidebar