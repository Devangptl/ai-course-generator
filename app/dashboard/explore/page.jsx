"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import { UserCourseListContext } from '@/app/_contax/UserCourseListContext'
import { Button } from '@/components/ui/button'

const Explore = () => {

  const [allCourse, setAllCourse] = useState([])
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    GetCourse()
  }, [pageIndex])

  const GetCourse = async () => {
    const res = await db.select().from(CourseList)
      .limit(9)
      .offset(pageIndex*9)


    setAllCourse(res)
    // console.log(res);
  }

  return (
    <div>
      <div className=''>
        <h2 className='text-xl font-bold '>Explore More Projects</h2>
        <p>Explore more projects build with AI by other users </p>

        <div className='grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-3 '>
          {
            allCourse?.length > 0 ? allCourse?.map((item, index) => (
              <CourseCard dissplayUser={true} course={item} key={index} refreshData={() => { GetCourse() }} />
            ))
              :
              userCourseList.map((item, index) => (
                <div key={index} className='w-full rounded-lg bg-slate-200 animate-pulse h-[200px]'>
                    
                </div>
              ))
          }
        </div>
        <div className='flex items-center justify-between'>
          {pageIndex!=0&&<Button onClick={()=>setPageIndex(pageIndex-1)}>Previous Page</Button>}
           {allCourse?.length==2 && <Button onClick={()=>setPageIndex(pageIndex+1)}>Next Page</Button>} 
        </div>
      </div>
    </div>
  )
}

export default Explore