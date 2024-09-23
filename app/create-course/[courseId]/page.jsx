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
import { toast } from 'sonner'
import emailjs from '@emailjs/browser';

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
        toast.success("Generate course content successfully");
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

                // console.log(videoId);


                const result = await GenerateChapterContent_AI.sendMessage(PROMPT)
                // console.log(result);
                const content = await JSON.parse(result?.response?.text())

                await db.insert(Chapters).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    content: content,
                    videoId: videoId
                })
                
                var templateParams = {
                    to_name:user?.fullName ,
                    from_name: 'aicoursegenerator@gmail.com',
                    message:`Congrats! Your course generate Successfully \n Your course Link : ${process.env.NEXT_PUBLIC_HOST_NAME}course/${course?.courseId} `
                  };
                  
                emailjs.send('service_q388cf8', 'template_dojcize', templateParams ,{publicKey: '0wEqZMEab4P5338jF',}).then(
                    (response) => {
                      
                    },
                    (error) => {
                      console.log('FAILED...', error);
                    },
                  );


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
            <CourseBasicInfo course={course} refreshData={() => GetCourse()} loading={loading} />
            <CourseDetails course={course} loading={loading} />
            <ChapterList course={course} refreshData={() => GetCourse()} loading={loading} />

            <Button onClick={GererateChapterContent} className="my-10 bg-[#0b9da5] hover:bg-[#0a7e85] ">Generate Course Content</Button>

        </div>
    )
}

export default CourseLayout