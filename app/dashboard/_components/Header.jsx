import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4 shadow-sm px-7'>
        <Link href={"/dashboard"} ><Image src={"/logoIcon.png"} width={33} height={100}/></Link>
        <UserButton/>
    </div>
  )
}

export default Header