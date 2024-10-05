import { db } from '@/configs/db'
import { CommentReplies } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const UserResponseReplie = ({ commentId }) => {
    const [commentReplieData, setCommentReplieData] = useState([])
    const [limitData, setlimitData] = useState(1)

    const getComments = async (commentId) => {
        const res = await db.select().from(CommentReplies).where(eq(CommentReplies.commentId, commentId)).limit(limitData)
        setCommentReplieData(res)
    }

    useEffect(() => {
        getComments(commentId)
    }, [commentId, limitData])

    return (
        <div className=''>
            {/* <hr className="my-2 ml-16 border-gray-200" /> */}
            {commentReplieData.map((item, index) => {

                const createdAt = `${item.createdAt}`
                const cleanedDateString = createdAt.replace(/\s*\(.*?\)/, '');
                const publishedDate = moment(cleanedDateString);

                return (

                    <div className="flex flex-row pt-6 md-10 md:ml-16">
                        <Image src={item?.user?.imageUrl} className="w-12 h-12 border-2 border-gray-300 rounded-full" alt="Emily's avatar" width={20} height={20} />

                        <div className="flex-col mt-1">
                            <div className="flex items-center flex-1 px-4 font-bold leading-tight">{item?.user?.fullName}
                                <span className="ml-2 text-xs font-normal text-gray-500">{publishedDate.fromNow()} </span>
                            </div>
                            <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                {item?.content}
                            </div>
                        </div>
                    </div>
                )
            })}
            
            {commentReplieData.length >= limitData && <p className='pt-5 text-sm cursor-pointer text-primary md:ml-16' onClick={() => {
                            setlimitData(limitData + 2)
                        }}>Show More</p>}
        </div>
    )
}

export default UserResponseReplie










// {commentReplieData.map((item, index) => {

//     const createdAt = `${item.createdAt}`
//     const cleanedDateString = createdAt.replace(/\s*\(.*?\)/, '');
//     const publishedDate = moment(cleanedDateString);

//     return (

//         <div key={index} className="flex-col w-full py-4 my-2 bg-white border-b-2 border-r-2 border-gray-200 sm:rounded-lg sm:shadow-sm ">
//             {/* comment section */}
//             <div className="flex flex-row justify-between w-full">
//                 <Image src={item?.user?.imageUrl} className="w-12 h-12 border-2 border-gray-300 rounded-full" alt="Emily's avatar" width={20} height={20} />
//                 <div className="flex-col flex-1 mt-1">
//                     <div className="flex items-center flex-1 px-4 font-bold leading-tight">{item?.user?.fullName}
//                         <span className="ml-2 text-xs font-normal text-gray-500">{publishedDate.fromNow()} </span>
//                     </div>
//                     <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
//                         {item?.content}
//                     </div>
//                 </div>
//                 <div className='pr-3'>
//                     <svg className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700 " fill="none"
//                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                             d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
//                         </path>
//                     </svg>
//                 </div>
//             </div>
//         </div>
//     )
// })}