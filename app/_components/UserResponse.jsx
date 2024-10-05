import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { FaRegComment } from "react-icons/fa";
import { ScrollArea } from '@/components/ui/scroll-area';
import uuid4 from 'uuid4';
import { db } from '@/configs/db';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { CommentReplies, Comments } from '@/configs/schema';
import Image from 'next/image';
import { eq } from 'drizzle-orm';
import moment from 'moment';
import UserResponseReplie from './UserResponseReplie';


const UserResponse = ({ courseId }) => {

    const [comment, setComment] = useState("")
    const [commentData, setCommentData] = useState([])
    const [commetReplie, setCommentReplie] = useState("")
    const [tempCommentReplie,setTempCommentReplie] = useState([])
    const { user } = useUser()
    
    const SaveCommentsDb = async (id) => {
        const result = await db.insert(Comments).values({
            courseId: courseId,
            user: user,
            content: comment,
            likes: 1,
        })
    }

    const handleChage = (e) => {
        setCommentReplie(e.target.value)
    }
    console.log(tempCommentReplie);
    
    const SaveCommentsReplieDb = async (commentId) => {
        const result = await db.insert(CommentReplies).values({
            commentId: commentId,
            user: user,
            content: commetReplie,
            likes: 1,
        }).returning()
        setTempCommentReplie(result)
        setCommentReplie("")
    }

    const getComments = async (courseId) => {
        const res = await db.select().from(Comments).where(eq(Comments.courseId, courseId))
        setCommentData(res)
    }

    const deleteComment = async(id) =>{
        await db.delete(Comments).where(eq(Comments.id, id));
    }
    useEffect(() => {
        getComments(courseId)
    }, [courseId])

    return (
        <div>
            <Sheet>
                <SheetTrigger><FaRegComment /></SheetTrigger>
                <SheetContent>
                    <SheetHeader className={"mt-[-10px] pb-[10px]"}>
                        <SheetTitle>Response</SheetTitle>
                    </SheetHeader>
                    <ScrollArea>
                        <div className='h-screen py-4 appearance-none scroll-smooth'>
                            <div className="grid gap-2">
                                <Textarea
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment..."
                                    className="p-3 text-sm border rounded-md shadow-sm resize-none focus:outline-primary bg-background"
                                />
                                <Button onClick={SaveCommentsDb} className="justify-center">Submit</Button>
                            </div>
                            <div className="w-full pb-20 ">
                                {commentData.map((item, index) => {

                                    const createdAt = `${item.createdAt}`
                                    const cleanedDateString = createdAt.replace(/\s*\(.*?\)/, '');
                                    const publishedDate = moment(cleanedDateString);

                                    return (

                                        <div key={index} className="flex-col w-full py-4 my-2 bg-white border-b-2 border-r-2 border-gray-200 sm:rounded-lg sm:shadow-sm ">
                                            {/* comment section */}
                                            <div className="flex flex-row w-full">
                                                <Image src={item?.user?.imageUrl} className="w-12 h-12 border-2 border-gray-300 rounded-full" alt="Emily's avatar" width={20} height={20} />
                                                <div className="flex-col mt-1">
                                                    <div className="flex items-center flex-1 px-4 font-bold leading-tight">{item?.user?.fullName}
                                                        <span className="ml-2 text-xs font-normal text-gray-500">{publishedDate.fromNow()} </span>
                                                    </div>
                                                    <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                                        {item?.content}
                                                    </div>
                                                    <div class="flex items-center flex-1 ml-3 mt-4">
                                                        <div class="relative flex">
                                                            <input
                                                                onChange={(e) => handleChage(e)}
                                                                id="comment"
                                                                name="comment"
                                                                type="text"
                                                                placeholder='Replie'
                                                                class="border-b border-gray-300 text-sm py-1 focus:border-b-1 focus:border-primary transition-colors focus:outline-none peer bg-inherit"
                                                            />
                                                           
                                                            <div className='px-2 pt-2 text-sm cursor-pointer text-primary' onClick={() => SaveCommentsReplieDb(item.commentId)}>Send</div>
                                                        </div>
                                                    </div>
                                                    <p className='cursor-pointer ' onClick={()=>deleteComment(item.id)}>Detele</p>
                                                </div>
                                            </div>

                                            {/* replay section */}
                                            <UserResponseReplie commentId={item.commentId} tempCommentReplie={tempCommentReplie} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default UserResponse