"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const FinishScreen = ({ params }) => {

  const { user } = useUser()

  const [course, setCourse] = useState([])
  const router = useRouter()
  // console.log(course);


  useEffect(() => {
    params && GetCourse()
  }, [params, user])
  const GetCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, params?.courseId), eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))

    setCourse(result[0])

  }

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
      <h2 className='my-3 font-bold text-center text-2xl text-[#0b9da5]'>Congrats! Your course is Ready</h2>

      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className='mt-3'>Course URL:</h2>
      <h2 className='flex items-center justify-between p-2 mb-3 text-gray-400 border rounded'>{process.env.NEXT_PUBLIC_HOST_NAME}course/{course?.courseId} <HiOutlineClipboardDocumentCheck className='hover:text-[#0b9da5] cursor-pointer h-5 w-5' onClick={async () => await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME + "course/" + course?.courseId)} /> </h2>
      <div className='flex items-center justify-between '>
      
      <Link href={"/dashboard"}> <Button className="">Home</Button></Link>
      <Link target='_blank' href={`${process.env.NEXT_PUBLIC_HOST_NAME}course/${course?.courseId}`}> <Button className="">Go to Your Course </Button></Link>
      </div>
    </div>
  )
}

export default FinishScreen
