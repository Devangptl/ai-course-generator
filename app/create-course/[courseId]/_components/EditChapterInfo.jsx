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

export const EditChapterInfo = ({course,index , refreshData}) => {

    const [name , setName] = useState()
    const [about , setAbout] = useState()

    const Chapter = course?.courseOutput?.chapters

    useEffect(()=>{
        setName(Chapter[index]?.chapter_name)
        setAbout(Chapter[index]?.about)
    },[course])

    const onUpdateHandler = async() =>{
        course.courseOutput.chapters[index].chapter_name=name;
        course.courseOutput.chapters[index].about=about;
        
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
                        <DialogTitle>Edit Chapter Details</DialogTitle>
                        <DialogDescription>
                            <div className='mt-3'>
                                <label > Course Title</label>
                                <Input onChange={(e)=>setName(e?.target.value)} defaultValue={Chapter[index].chapter_name}/>
                            </div>
                            <div>
                                <label> Description</label>
                                <Textarea onChange={(e)=>setAbout(e?.target.value)} className="h-40"defaultValue={Chapter[index].about}/>
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

