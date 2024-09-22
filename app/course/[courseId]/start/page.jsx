"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import Image from 'next/image'
import Header from '@/app/dashboard/_components/Header'


const CourseStart = ({ params }) => {

    const [course, setCourse] = useState([])
    const [selectChapter, setSelectChapter] = useState()
    const [chapterContent, setChapterContent] = useState(0)
    const [indexId, setIndexId] = useState(-1)

    useEffect(() => {
        GetCourse()
        GetSelectedChapterContent(indexId)

    }, [indexId])


    const GetCourse = async () => {
        const res = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))

        // console.log(res);

        setCourse(res[0])
    }

    const GetSelectedChapterContent = async (chapterId) => {
        setIndexId(chapterId)
        const res = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId), eq(Chapters.courseId, course?.courseId)))

        setChapterContent(res[0])
        // console.log(res);

    }

    return (
        <div>

            <div className='fixed z-10 hidden shadow-lg md:w-72 md:block'>
                <h2 className='p-4 text-lg font-medium text-white bg-primary' >{course?.courseOutput?.course_name}</h2>
                <ScrollArea className='w-full h-screen  scroll-smooth appearance-none pb-[50px] '>
                    {course?.courseOutput?.chapters.map((chapter, index) => {

                        return (

                            <div key={index} onClick={() => { setSelectChapter(chapter); GetSelectedChapterContent(index) }} className={` ${selectChapter?.chapter_name == chapter?.chapter_name ? "bg-cyan-50 sticky top-0 transition-all   " : ""} duration-300 cursor-pointer hover:bg-cyan-50  `}>
                                <ChapterListCard chapter={chapter} index={index} />
                            </div>
                        )
                    }
                    )}
                </ScrollArea>
            </div>

            <div className='md:ml-72' >
                {!chapterContent == 0 ? <div className=''>
                    <div className='fixed w-[calc(100%-288px)] bg-cyan-200 bg-opacity-75 z-[10] shadow-lg'>
                        <Header />
                    </div>
                    <div className='p-10 pt-[110px]'>

                        <div className='flex items-center justify-between'>
                            <div className={`${!course?.courseOutput?.chapters[indexId - 1] ? "block" : "hidden"}`} >
                                <Button onClick={() => window.location.reload()} ><HiMiniChevronLeft className='text-2xl' /> Home </Button>
                            </div>
                            <div className={`${!course?.courseOutput?.chapters[indexId - 1] ? "hidden" : "block"}`} >

                                <Button disabled={!course?.courseOutput?.chapters[indexId - 1]} onClick={() => { setSelectChapter(course?.courseOutput?.chapters[indexId - 1]); GetSelectedChapterContent(indexId - 1) }}><HiMiniChevronLeft className='text-2xl' /> Previous {course?.courseOutput?.chapters[indexId - 1]?.chapter_name} </Button>
                            </div>
                            <Button disabled={!course?.courseOutput?.chapters[indexId + 1]} onClick={() => { setSelectChapter(course?.courseOutput?.chapters[indexId + 1]); GetSelectedChapterContent(indexId + 1) }} className="">Next {course?.courseOutput?.chapters[indexId + 1]?.chapter_name} <HiMiniChevronRight className='text-2xl' /> </Button>
                        </div>
                        <ChapterContent chapter={selectChapter} content={chapterContent} />

                        <div className='flex items-center justify-between'>
                            <div className={`${!course?.courseOutput?.chapters[indexId - 1] ? "block" : "hidden"}`} >
                                <Button onClick={() => window.location.reload()} ><HiMiniChevronLeft className='text-2xl' /> Home </Button>
                            </div>
                            <div className={`${!course?.courseOutput?.chapters[indexId - 1] ? "hidden" : "block"}`} >

                                <Button disabled={!course?.courseOutput?.chapters[indexId - 1]} onClick={() => { setSelectChapter(course?.courseOutput?.chapters[indexId - 1]); GetSelectedChapterContent(indexId - 1) }}><HiMiniChevronLeft className='text-2xl' /> Previous {course?.courseOutput?.chapters[indexId - 1]?.chapter_name} </Button>
                            </div>
                            <Button disabled={!course?.courseOutput?.chapters[indexId + 1]} onClick={() => { setSelectChapter(course?.courseOutput?.chapters[indexId + 1]); GetSelectedChapterContent(indexId + 1) }} className="">Next {course?.courseOutput?.chapters[indexId + 1]?.chapter_name} <HiMiniChevronRight className='text-2xl' /> </Button>
                        </div>

                    </div>
                </div>
                    : <div className='flex flex-col items-start gap-4 p-10 px-20 '>

                        <Image className='w-full rounded-md ' src={course?.courseBanner} width={600} height={200} />
                        <p className='text-xl font-semibold '>{course?.courseOutput?.course_name}</p>

                        <Button className="" onClick={() => { setSelectChapter(course?.courseOutput?.chapters[indexId + 1]); GetSelectedChapterContent(indexId + 1) }}>
                            Start the course
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CourseStart