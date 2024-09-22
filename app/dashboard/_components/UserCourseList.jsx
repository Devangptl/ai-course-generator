"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_contax/UserCourseListContext'

const UserCourseList = () => {

    const [courseList, setCourseList] = useState([])
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)
  

    const { user } = useUser()

    useEffect(() => {
        user && getUserCourses()
    }, [user])

    const getUserCourses = async () => {
        
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))

        // console.log(result);
        setCourseList(result)
        setUserCourseList(result)
       
    }

    return (
        <div className='mt-10'>
            <h2 className='text-xl font-bold '>My AI Courses</h2>

            {/* {!courseList?.length == 0 ?  */}
            <div className='grid grid-cols-1 gap-5 my-3 md:grid-cols-2 lg:grid-cols-3 '>
                {
                    courseList?.length > 0 ? courseList?.map((item, index) => (
                        <CourseCard course={item} key={index} refreshData={() => { getUserCourses() }} />
                    ))
                        :
                        userCourseList.map((item, index) => (
                            <div key={index} className='w-full rounded-lg bg-slate-200 animate-pulse h-[200px]'>

                            </div>
                        ))
                }
            </div>
                 {/* :
                 <div className='text-center my-28'>
                     <h2 className='text-lg'> No course available yet!  </h2>
                     <h2 className='text-3xl text-primary'>Create your AI course</h2>
                 </div>
                } */}
        </div>
    )
}

export default UserCourseList