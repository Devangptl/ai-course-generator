import React, { useContext } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserInputContext } from '@/app/_contax/UserInputContext'



const TopicDescription = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)

    const handleInputChange = (fieldName , value) =>{
        setUserCourseInput(prev =>({
            ...prev,
            [fieldName]:value
        }) )
    }

    
    return (
        <div className='mx-14 lg:mx-36'>
            <div className='mt-5 '>
                <label> Write the topic for which you want to genetare a course (e.g., Python Course, Yoga, etc.):</label>
                <Input placeholder="Topic" defaultValue={userCourseInput?.topic} className="mt-1" onChange={(e)=>handleInputChange("topic" , e.target.value)} />
            </div>
            <div className='mt-5 '>
                <label>Tell us more about your course, what you to include in the course (Optional)</label>
                <Textarea placeholder="About your course" defaultValue={userCourseInput?.description} className="mt-1" onChange={(e)=>handleInputChange("description" , e.target.value)} />
            </div>
        </div>
    )
}

export default TopicDescription