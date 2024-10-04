"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { HiOutlinePuzzlePiece } from 'react-icons/hi2';
import { EditCourseBasicInfo } from './EditCourseBasicInfo';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebaseConfig';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { toast } from 'sonner';
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";

const CourseBasicInfo = ({ course, refreshData, edit = true, loading }) => {
    // console.log(course);
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;
    const [selectedFile, setSelectedFile] = useState()

    useEffect(() => {
        if (course) {
            setSelectedFile(course?.courseBanner)
        }
    }, [course])

    const onFileSelected = async (event) => {

        const file = event.target.files[0]
        // console.log(file);
        setSelectedFile(URL.createObjectURL(file))

        const fileName = Date.now() + ".jpg"

        const storageRef = ref(storage, "ai-course/" + fileName)

        await uploadBytes(storageRef, file).then((snapshot) => {

            toast.success("Image Upload Successfully");
        }).then(res => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {

                await db.update(CourseList).set({
                    courseBanner: downloadUrl
                }).where(eq(CourseList.id, course?.id))
            })
        })


    }

    return (
        <div className='p-10 mt-10 border shadow-sm rounded-xl'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                {!loading ? <div>
                    <h2 className='text-3xl font-bold'>{course?.courseOutput?.course_name} {edit ? <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} /> : ""} </h2>
                    <p className='mt-3 text-sm text-gray-400 '>{course?.courseOutput?.description}</p>
                    <h2 className='flex items-center gap-2 mt-2 font-medium  text-[#0b9da5]'> <HiOutlinePuzzlePiece /> {course?.category}</h2>
                    {!edit && <Link href={"/course/" + course?.courseId + "/start"}>
                        <Button className="w-full mt-5 bg-[#0b9da5] hover:bg-[#0a7e85]" >Start</Button>
                    </Link>}
                </div>
                    :
                    <div className='w-full rounded-lg bg-slate-200 animate-pulse h-[full]'>

                    </div>
                }
                <div>
                    <label htmlFor='upload-image'>
                        <Image src={selectedFile ? selectedFile : "/placeholder.png"} width={300} height={300} alt={"placeholder"} className='  h-[250px] cursor-pointer rounded-xl object-cover  w-full ' />
                    </label>
                    <input type='file' disabled={edit ? "" : "disabled"} id='upload-image' className='opacity-0' onChange={onFileSelected} />
                    {!edit && <div className={"flex items-center justify-center gap-4 text-[20px]"}>
                        <p className={"font-medium  text-[#0b9da5] mr-5"}>Share your course : </p>
                        <button
                            className={"hover:text-primary duration-300 text-[24px]"}
                            onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(course?.courseOutput?.course_name)}`, 'test', params)}
                            href={""}><FaLinkedin />
                        </button>
                        <button
                            className={"hover:text-primary duration-300 text-[24px]"}
                            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(course?.courseOutput?.course_name)}&via=YourTwitterHandle`, 'test', params)}
                            href={""}><FaXTwitter />
                        </button>
                        <button
                            className={"hover:text-primary duration-300 text-[24px]"}
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(course?.courseOutput?.course_name)}`, 'test', params)}
                            href={""}><BsFacebook />
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default CourseBasicInfo