import React from 'react'
import { HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2'
import { EditChapterInfo } from './EditChapterInfo'

const ChapterList = ({ course ,refreshData ,edit=true}) => {
    return (
        <div className='mt-3'>
            <h2 className='text-xl font-medium'>Chapters</h2>
            <div className='m-2 '>
                {course?.courseOutput?.chapters.map((chapter, index) => (
                    <div className='flex items-center justify-between p-5 mb-2 border rounded-lg'>
                        <div className='flex items-center gap-5'>
                            <h2 className='bg-[#0b9da5] flex-none h-10 w-10 text-center rounded-full text-white p-2'>{index + 1} </h2>
                            <div>
                                <h2 className='flex items-center gap-2 text-lg font-medium '> {chapter?.chapter_name}{edit ? <EditChapterInfo course={course} index={index} refreshData={()=> refreshData(true) } /> :""}</h2>
                                <p className='text-sm text-gray-500'>{chapter?.about}</p>
                                <p className='flex items-center gap-2 text-[#0b9da5] '> <HiOutlineClock /> {chapter?.duration} minutes</p>
                            </div>
                        </div>
                        <HiOutlineCheckCircle className='flex-none text-4xl text-gray-300'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList