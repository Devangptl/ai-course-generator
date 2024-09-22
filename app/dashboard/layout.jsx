"use client"
import React, { useState } from 'react'
import Slidebar from './_components/Sidebar'
import Header from './_components/Header'
import { UserCourseListContext } from '../_contax/UserCourseListContext'
import Footer from '../_components/Footer'

const DashboardLayout = ({ children }) => {

    const [userCourseList , setUserCourseList] = useState([])

    return (
        <UserCourseListContext.Provider value={{userCourseList , setUserCourseList}}>
            <div className=''>

                <div className='hidden md:w-64 md:block'>
                    <Slidebar />
                </div>

                <div className='md:ml-64'>
                    <Header />
                    <div className='p-10'>
                        {children}
                    </div>
                    <Footer/>
                </div>
            </div>
        </UserCourseListContext.Provider>
    )
}

export default DashboardLayout