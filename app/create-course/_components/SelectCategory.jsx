import { UserInputContext } from '@/app/_contax/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

const SelectCategory = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

    const handleCategoryChange = (category) => {
        setUserCourseInput(prev => ({
            ...prev,
            category: category
        }))
    }
    return (
        <div className='px-10 md:px-20'>
            <h2 className='py-4 '>Select the Course Category</h2>
            <div className='grid grid-cols-3 gap-10 '>

                {
                    CategoryList.map((item, index) => (
                        <div onClick={() => handleCategoryChange(item.name)} className={`flex flex-col items-center p-5 border cursor-pointer rounded-xl hover:border-black hover:bg-gray-100 ${userCourseInput?.category == item.name && "border-black bg-gray-100 "}`}>
                            <Image width={50} height={50} src={item.icon} />
                            <h2>{item.name}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectCategory