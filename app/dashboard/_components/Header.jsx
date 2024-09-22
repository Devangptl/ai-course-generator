import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-6 shadow-sm px-7'>
        <Image src={"/logo.png"} width={90} height={100}/>
        <UserButton/>
    </div>
  )
}

export default Header