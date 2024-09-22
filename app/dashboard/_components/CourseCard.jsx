import Image from 'next/image'
import React from 'react'
import { HiMiniEllipsisVertical, HiOutlineBookOpen } from 'react-icons/hi2'
import DropdownOption from './DropdownOption'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

const CourseCard = ({ course, refreshData, dissplayUser = false }) => {

    const handleOnDelete = async () => {
        const res = await db.delete(CourseList)
            .where(eq(CourseList.id, course?.id))
            .returning({ id: CourseList?.id })

        const resChapter = await db.delete(Chapters)
        .where(eq(Chapters.courseId,course?.courseId))
        .returning({courseId:Chapters.courseId})

        if (res) {
            refreshData()
        }
        if(resChapter){
            refreshData()
        }
    }

    return (
        <div className='p-2 transition-all duration-300 border rounded-lg shadow-sm cursor-pointer hover:border-primary hover:shadow-lg'>
            <Link href={"/course/" + course?.courseId}> <Image src={course?.courseBanner} width={300} height={200} className='w-full h-[200px] object-cover rounded-lg ' /></Link>
            <div className='flex flex-col gap-2 p-2'>
                <div className='flex items-center justify-between gap-2 text-lg font-medium '> <h2 className='truncate'>{course?.courseOutput?.course_name}</h2>
                     {!dissplayUser&& <span> <DropdownOption handleOnDelete={() => { handleOnDelete() }}> <HiMiniEllipsisVertical /></DropdownOption> </span>}
                </div>

                <p className=''> {course?.category} </p>

                <div className='flex items-center justify-between'>
                    <h2 className='flex items-center gap-2 p-1 text-sm rounded-sm bg-cyan-50 text-primary'>
                        <HiOutlineBookOpen />
                        {course?.noOfChapter}
                    </h2>
                    <h2 className='p-1 text-sm rounded-sm bg-cyan-50 text-primary '>
                        {course?.level}
                    </h2>
                </div>

                {
                    dissplayUser &&
                    <div className='flex items-center gap-2'>
                        <Image className='w-8 h-8 rounded-full' src={course?.userProfileImage} width={35} height={35} alt='' />
                        <h2 className='text-sm'>{course?.userName}</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default CourseCard