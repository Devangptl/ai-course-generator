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

const UserResponse = ({ courseId }) => {

    const [comment, setComment] = useState("")
    const [commentData, setCommentData] = useState([])

    const { user } = useUser()

    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }
    const SaveCommentsDb = async (e) => {
        e.preventDefault();
        const result = await db.insert(Comments).values({
            courseId: courseId,
            user: user,
            content: comment,
            likes: 1,
        }).returning()
        setCommentData((prevData) => [...prevData, result[0]]);
        setComment('')

    }

    // const SaveCommentsReplieDb = async (commentId, e) => {
    //     e.preventDefault();
    //     const result = await db.insert(CommentReplies).values({
    //         commentId: commentId,
    //         user: user,
    //         content: commetReplie,
    //         likes: 1,
    //     }).returning()
    //     // setTempCommentReplie(result[0])
    //     setCommentReplie("")
    // }

    const getComments = async (courseId) => {
        const res = await db.select().from(Comments).where(eq(Comments.courseId, courseId), eq(Comments.user, user))
        setCommentData(res)

    }

    const deleteComment = async (id) => {
        await db.delete(Comments).where(eq(Comments.id, id));
        setCommentData(prevItems => { return prevItems.filter(item => item !== id) });
        getComments(courseId)
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
                            <form onSubmit={SaveCommentsDb} className="grid gap-2">
                                <Textarea
                                    type="text"
                                    value={comment}
                                    onChange={handleChangeComment}
                                    placeholder="Write your comment..."
                                    className="p-3 text-sm border rounded-md shadow-sm resize-none focus:outline-primary bg-background"
                                />
                                <Button type="submit" className="justify-center">Submit</Button>
                            </form>

                            {
                                commentData.length <= 0 ?
                                    //  <div className='flex items-center justify-center h-full text-xl text-center'>Comment not found</div> 
                                   
                                        <div className="flex items-center justify-center mt-10">
                                            <div className="text-center">
                                                <h1 className="mb-4 text-3xl font-bold text-gray-800">Not Commented Yet</h1>
                                                <p className="text-gray-600 text-md ">
                                                There are no comments on this course yet. Be the first to share your thoughts!
                                                </p>
                                            </div>
                                    </div>
                                    :

                                    <div className="w-full pb-20 ">
                                        {commentData.slice(0).reverse().map((item, index) => {

                                            const createdAt = `${item.createdAt}`
                                            const cleanedDateString = createdAt.replace(/\s*\(.*?\)/, '');
                                            const publishedDate = moment(cleanedDateString);

                                            console.log(commentData.length);

                                            if (commentData.length <= 0) {
                                                return (<div> No comment found </div>)
                                            }


                                            return (

                                                <div key={index} className="flex-col w-full py-4 my-2 bg-white border-b-2 border-r-2 border-gray-200 sm:rounded-lg sm:shadow-sm ">
                                                    {/* comment section */}
                                                    <div className="flex justify-between w-full">
                                                        <Image src={item?.user?.imageUrl} className="border-2 border-gray-300 rounded-full h-9 w-9" alt="Emily's avatar" width={20} height={20} />
                                                        <div className="flex-col flex-1 mt-1">
                                                            <div className="flex items-center flex-1 px-4 text-sm font-bold leading-tight capitalize ">{item?.user?.fullName.toLowerCase()}
                                                                <span className="ml-2 text-xs font-normal text-gray-500">{publishedDate.fromNow()} </span>
                                                            </div>
                                                            <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                                                {item?.content}
                                                            </div>
                                                            {/* <div className="flex items-center flex-1 mt-4 ml-3">
                                                        <form onSubmit={(e) => SaveCommentsReplieDb(item?.commentId, e)} className="relative flex">
                                                            <input
                                                                // value={commetReplie}
                                                                onChange={(e)=>handleChage(e)}
                                                                id="comment"
                                                                name="comment"
                                                                type="text"
                                                                placeholder='Replie'
                                                                className="py-1 text-sm transition-colors border-b border-gray-300 focus:border-b-1 focus:border-primary focus:outline-none peer bg-inherit"
                                                            />

                                                            <button type='submit' className='px-2 pt-2 text-sm cursor-pointer text-primary'>Send</button>
                                                        </form>
                                                    </div> */}
                                                        </div>

                                                        {item.user.id == user?.id && <div className='relative w-10 h-10 px-4 pt-2 mt-1 overflow-hidden cursor-pointer group hover:bg-red-600flex text-primary' onClick={() => deleteComment(item.id)}>
                                                            <svg
                                                                viewBox="0 0 1.625 1.625"
                                                                className="absolute -top-7 fill-[#0b9da5] delay-100 group-hover:top-[12px] group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                                                                height="10"
                                                                width="10"
                                                            >
                                                                <path
                                                                    d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                                                                ></path>
                                                                <path
                                                                    d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                                                                ></path>
                                                                <path
                                                                    d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                                                                ></path>
                                                            </svg>
                                                            <svg
                                                                width="10"
                                                                fill="#0b9da5"
                                                                viewBox="0 0 39 7"
                                                                className="duration-500 origin-right group-hover:rotate-90"
                                                            >
                                                                <line strokeWidth="4" stroke="#0b9da5" y2="5" x2="39" y1="5"></line>
                                                                <line
                                                                    strokeWidth="3"
                                                                    stroke="#0b9da5"
                                                                    y2="1.5"
                                                                    x2="26.0357"
                                                                    y1="1.5"
                                                                    x1="12"
                                                                ></line>
                                                            </svg>
                                                            <svg width="10" fill="#0b9da5" viewBox="0 0 33 39" className="">
                                                                <mask fill="#0b9da5" id="path-1-inside-1_8_19">
                                                                    <path
                                                                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                                    ></path>
                                                                </mask>
                                                                <path
                                                                    mask="url(#path-1-inside-1_8_19)"
                                                                    fill="#0b9da5"
                                                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                                                ></path>
                                                                <path strokeWidth="4" stroke="#0b9da5" d="M12 6L12 29"></path>
                                                                <path strokeWidth="4" stroke="#0b9da5" d="M21 6V29"></path>
                                                            </svg>
                                                        </div>}
                                                    </div>

                                                    {/* replay section */}
                                                    {/* <UserResponseReplie commentId={item.commentId} tempCommentReplie={tempCommentReplie} /> */}

                                                </div>
                                            )
                                        })}
                                    </div>}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default UserResponse