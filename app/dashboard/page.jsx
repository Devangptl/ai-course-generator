import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { AddCourse } from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const page = () => {
  return (
    <div>
       <AddCourse/>
       <UserCourseList/>
    </div>
  )
}

export default page