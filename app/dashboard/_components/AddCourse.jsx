"use client"
import { UserCourseListContext } from '@/app/_contax/UserCourseListContext'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useContext } from 'react'

export const AddCourse = () => {

    const { user } = useUser()
    const {userCourseList , setUserCourseList} = useContext(UserCourseListContext)

    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-2xl '>Hello,
                    <span className='font-bold capitalize '> {user?.fullName.toLowerCase()} </span>
                </h2>
                <p className='text-sm text-gray-500'>Create new course with AI, Share with friends and Earn from it</p>
            </div>
           
            <Link href={ userCourseList.length >= 5 ? "/dashboard/upgrade": "/create-course"} >
                <Button>+ Create AI Course</Button>
            </Link>
        </div>
    )
}


