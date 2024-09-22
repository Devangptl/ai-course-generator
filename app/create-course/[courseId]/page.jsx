"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'

const CourseLayout = ({ params }) => {

    const { user } = useUser()

    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)
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

    const GererateChapterContent = () => {
        setLoading(true)
        const chapters = course?.courseOutput?.chapters

        chapters.forEach(async (chapter, index) => {

            const PROMPT = "Explain the concept in Detail on Topic:" + course?.name + ", Chapter:" + chapter?.chapter_name + ", in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code format) if applicable"
            // console.log(PROMPT);

            try {
                let videoId = ''
                await service.getVideos(course?.name + ":" + chapter?.chapter_name).then(res => {
                    // console.log(res);
                    videoId = res[0]?.id.videoId

                })

                console.log(videoId);
                

                const result = await GenerateChapterContent_AI.sendMessage(PROMPT)
                // console.log(result);
                const content = await JSON.parse(result?.response?.text())

                await db.insert(Chapters).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    content: content,
                    videoId: videoId
                })

               
            } catch (error) {
                setLoading(false)
                console.log((error));

            }
            await db.update(CourseList).set({
                publish: true
            })

            setLoading(false)
            router.replace('/create-course/' + course?.courseId + '/finish')


        })
    }

    return (
        <div className='mt-10 md:px-20 lg:px-44'>
            <h2 className='text-2xl font-bold text-center'>
                Course Layout
            </h2>

            <LoadingDialog loading={loading} />
            <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
            <CourseDetails course={course} />
            <ChapterList course={course} refreshData={() => GetCourse()} />

            <Button onClick={GererateChapterContent} className="my-10 bg-[#0b9da5] hover:bg-[#0a7e85] ">Generate Course Content</Button>

        </div>
    )
}

export default CourseLayout