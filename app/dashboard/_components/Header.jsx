import { ThemeMode } from '@/app/_components/ThemeMode'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='sticky top-0 flex items-center justify-between p-4 transition-all bg-white shadow-md bg-opacity-65 px-7'>
        <Link href={"/dashboard"} ><Image src={"/logoIcon.png"} width={33} height={100} alt='logoIcon'/></Link>
       <div className='flex items-center gap-3'>
        <UserButton/>
        <ThemeMode />
       </div>
    </div>
  )
}

export default Header