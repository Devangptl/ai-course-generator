import React from 'react'
import { HiOutlineBookOpen, HiOutlineChartBar, HiOutlineClock, HiOutlinePlayCircle } from 'react-icons/hi2'

const CourseDetails = ({course,loading}) => {
  return (
    <div className='p-6 mt-3 border shadow-sm rounded-xl'>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-4'>
            <div className='flex gap-2'>
                <HiOutlineChartBar className='text-4xl text-[#0b9da5]'/>
                <div>
                    <h2 className='text-xs text-gray-500'>Skill Level</h2>
                   {!loading? <h2 className='text-lg font-medium'>{course?.level}</h2> :  <div className='w-[90px] rounded-md mt-1 bg-slate-200 animate-pulse h-[17px]'></div>}
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineClock className='text-4xl text-[#0b9da5]'/>
                <div>
                    <h2 className='text-xs text-gray-500'>Duration</h2>
                    {!loading?<h2 className='text-lg font-medium'>{course?.courseOutput?.duration} minuets</h2> :  <div className='w-[90px] mt-1 rounded-md bg-slate-200 animate-pulse h-[17px]'></div>}
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineBookOpen className='text-4xl text-[#0b9da5]'/>
                <div>
                    <h2 className='text-xs text-gray-500'>No Of Chapter</h2>
                    {!loading?<h2 className='text-lg font-medium'>{course?.courseOutput?.chapters.length}</h2>:  <div className='w-[90px] mt-1 rounded-md bg-slate-200 animate-pulse h-[17px]'></div>}
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlinePlayCircle className='text-4xl text-[#0b9da5]'/>
                <div>
                    <h2 className='text-xs text-gray-500'>Video Include</h2>
                    {!loading? <h2 className='text-lg font-medium'>{course?.includeVideo}</h2>:  <div className='w-[90px] mt-1 rounded-md bg-slate-200 animate-pulse h-[17px]'></div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetails