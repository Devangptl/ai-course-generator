import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='sticky top-0 transition-all bg-white bg-opacity-70 shadow-md flex items-center justify-between p-5 '>
      <Image src={"/logo2.png"} width={200}  height={100} alt='logo icon'/>
      <Link href={"/dashboard"} >
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}

export default Header