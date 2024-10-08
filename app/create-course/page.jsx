"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from 'react-icons/hi2'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_contax/UserInputContext'
import { GenerateCourseLayout_AI } from '@/configs/AiModel'
import LoadingDialog from './_components/LoadingDialog'
import { db } from '@/configs/db.jsx'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { CourseList } from '@/configs/schema'
import { useRouter } from 'next/navigation'
const CreateCourse = () => {
    const StepperOptions = [
        {
            id: 1,
            name: "Category",
            icon: <HiMiniSquares2X2 />
        },
        {
            id: 2,
            name: "Topic & Desc",
            icon: <HiLightBulb />
        },
        {
            id: 3,
            name: "Options",
            icon: <HiClipboardDocumentCheck />
        },
    ]

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

    const [loading, setLoading] = useState(false)

    const [activeIndex, setActiveIndex] = useState(0)

    const {user} = useUser()

    const router = useRouter()

    useEffect(() => {
        // console.log(userCourseInput);

    }, [userCourseInput])

    const checkStatus = () => {
        if (userCourseInput?.length == 0) {
            return true
        }
        if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
            return true
        }
        if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
            return true
        }
        if (activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapter == undefined)) {
            return true
        }
        return false
    }

    const GenerateCourseLayout = async () => {
        setLoading(true)
        const BASIC_PROMPT = "Generate A Course Tutorial on Following Detail with field as Course Name, Description, Along with Chapter Name, about , Duration:"
        const USER_INPUT_PROMPT = ' Category : ' + userCourseInput?.category + ', Topic : ' + userCourseInput?.topic + ', Level:' + userCourseInput?.level + ' , Duration : ' + userCourseInput?.duration + ', No of Chapter : ' + userCourseInput?.noOfChapter + ''
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT
        console.log(FINAL_PROMPT)

        const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT)
        // console.log(result.response?.text());
        // console.log(JSON.parse(result.response?.text()));
        setLoading(false)
        SaveCourseLayoutInDb(JSON.parse(result.response?.text()))

    }

    const SaveCourseLayoutInDb = async(courseLayout) =>{
        var id = uuid4()
        setLoading(true)
        const result = await db.insert(CourseList).values({
            courseId : id,
            name : userCourseInput?.topic,
            level : userCourseInput?.level,
            category : userCourseInput?.category,
            noOfChapter: userCourseInput?.noOfChapter,
            courseOutput : courseLayout,
            createdBy : user?.primaryEmailAddress?.emailAddress,
            userName : user?.fullName,
            userProfileImage : user?.imageUrl,
        })

        // console.log("Finish");
        router.replace('/create-course/' + id)
        setLoading(false)
    }


    return (
        <div>
            {/* stepper */}
            <div className='flex flex-col items-center justify-center mt-10 '>
                <h2 className='text-4xl font-medium text-primary'>Create Course</h2>

                <div className='flex mt-10'>
                    {
                        StepperOptions.map((item, index) => (
                            <div key={index} className='flex items-center'>
                                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                    <div className={`p-3 text-white  rounded-full ${activeIndex >= index ? "bg-black" : "bg-gray-200" }`} >
                                        {item.icon}
                                    </div>
                                    <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                                </div>
                                {
                                    index !== StepperOptions?.length - 1 &&
                                    <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px]  ${activeIndex - 1 >= index ? "bg-black" : "bg-gray-300"} `}></div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='px-10 mt-10 md:px-20 lg:px-44'>

                {/* components  */}
                {activeIndex == 0 ? <SelectCategory /> :
                    activeIndex == 1 ? <TopicDescription /> :
                        activeIndex == 2 ? <SelectOption /> : null}
                {/* next previous button */}

                <div className='flex justify-between mt-10'>
                    <Button disabled={activeIndex == 0} variant="outline" onClick={() => setActiveIndex(activeIndex - 1)} >Previous</Button>
                    {activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)} >Next</Button>}
                    {activeIndex == 2 && <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()} >Generate Course Layout</Button>}
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CreateCourse