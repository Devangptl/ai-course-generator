import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeMode } from './ThemeMode'

const Header = () => {
  return (
    <div className='sticky top-0 flex items-center justify-between p-5 transition-all bg-white shadow-md bg-opacity-70 '>
      <Image src={"/logo2.png"} width={200} height={100} alt='logo icon' />

      <div className='flex items-center gap-3'>
        <Link href={"/dashboard"} >
          <Button>Get Started</Button>
        </Link>
        <ThemeMode />
      </div>
    </div>
  )
}

export default Header