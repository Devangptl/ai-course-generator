"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import { UserCourseListContext } from '@/app/_contax/UserCourseListContext'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {eq} from "drizzle-orm";

const Explore = () => {

  const [allCourse, setAllCourse] = useState([])
  const [category,setCategory] = useState("All")
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)
  const [limitData ,setlimitData] = useState(9)
  const handleSelect = (value) => {
    setCategory(value);// Log the selected value
  };

  useEffect(() => {
    const GetCourse = async () => {
      const res = await db.select().from(CourseList).where(category === "All" ? "" : eq(CourseList.category,category))
          .limit(limitData)
      setAllCourse(res)
    }
    GetCourse()
  }, [limitData,category])

  return (
    <div>
      <div className=''>
        <h2 className='text-xl font-bold '>Explore More Projects</h2>
        <p>Explore more projects build with AI by other users </p>
        <div className='sticky flex items-center gap-3 p-4 transition-all bg-white shadow-md  top-16 bg-opacity-65 px-7'>
          Filtter
          <div>
            <Select onValueChange={handleSelect}>
              <SelectTrigger  className="w-[180px] outline-none ">
                <SelectValue value={category} placeholder="All"/>
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-3 '>
          {
            allCourse?.length > 0 ? allCourse?.map((item, index) => (
                    <CourseCard dissplayUser={true} course={item} key={index} refreshData={() => {
                      GetCourse()
                    }}/>
                ))
                :
                userCourseList.map((item, index) => (
                    <div key={index} className='w-full rounded-lg bg-slate-200 animate-pulse h-[200px]'>

                    </div>
                ))
          }
        </div>
        <div className='flex items-center justify-between'>
          {allCourse.length >= limitData && <Button onClick={() => {
            setlimitData(limitData + 9)
          }}>Next Page</Button>}
        </div>
      </div>
    </div>
  )
}

export default Explore