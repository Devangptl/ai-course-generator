import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'

const ChapterListCard = ({chapter,index}) => {
  return (
    <div className='grid items-center grid-cols-5 gap-3 p-4 border-b'>
        <div>
            <h2 className='w-8 h-8 p-1 text-center text-white rounded-full bg-primary'> {index + 1} </h2>
        </div>
        <div className='col-span-4'>
            <h2> {chapter?.chapter_name} </h2>
            <h2 className='flex items-center gap-1 text-sm text-primary'> <HiOutlineClock/> {chapter?.duration} minutes </h2>
        </div>
    </div>
  )
}

export default ChapterListCard