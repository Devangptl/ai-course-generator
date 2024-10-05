"use client"
import Footer from '@/app/_components/Footer'
import Header from '@/app/_components/Header'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const Course = ({ params }) => {

    const [course, setCourse] = useState([])
    useEffect(() => {
        params && GetCourse()
    }, [params])

    const GetCourse = async () => {
        const res = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))

        setCourse(res[0])
        // console.log(res);
    }

    return (
        <div>
            <Header />
            <div className='px-10 md:px-20 lg:px-44'>
                <CourseBasicInfo course={course} courseCount ={course?.courseViews} edit={false} />
                <CourseDetails course={course}/>
                <ChapterList course={course} edit={false}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Course