"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'


export const EditCourseBasicInfo = ({course , refreshData}) => {

    const [name , setName] = useState()
    const [description , setDescription] = useState()

    useEffect(()=>{
        setName(course?.courseOutput?.course_name)
        setDescription(course?.courseOutput?.description)
    },[course])

    const onUpdateHandler = async() =>{
        course.courseOutput.course_name=name;
        course.courseOutput.description=description;
        
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id , course?.id ))
        .returning({id:CourseList.id})

        // console.log(result);
        refreshData(true)
        
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger> <HiPencilSquare/> </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Course Title & Description</DialogTitle>
                        <DialogDescription>
                            <div className='mt-3'>
                                <label > Course Title</label>
                                <Input onChange={(e)=>setName(e?.target.value)} defaultValue={course?.courseOutput?.course_name}/>
                            </div>
                            <div>
                                <label> Description</label>
                                <Textarea onChange={(e)=>setDescription(e?.target.value)} className="h-40" defaultValue={course?.courseOutput?.description}/>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button onClick= {onUpdateHandler}>
                                Update
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
