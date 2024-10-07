"use client"
import Footer from '@/app/_components/Footer'
import Header from '@/app/_components/Header'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const Course = ({ params }) => {

    const [course, setCourse] = useState([])
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        params && GetCourse()
    }, [params])

    const {user} = useUser()
    
    const GetCourse = async () => {
        setLoading(true)
        const res = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))

        setCourse(res[0])
        setLoading(false)
        // console.log(res);
    }

    return (
        <div>
            <Header />
            <div className='px-10 md:px-20 lg:px-44'>
                <CourseBasicInfo loading={loading} user={user} course={course} courseLikes={course?.likes} courseCount ={course?.courseViews} edit={false} />
                <CourseDetails course={course}/>
                <ChapterList course={course} edit={false}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Course