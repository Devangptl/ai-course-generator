import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const Filtter = () => {
    return (
        <div className=' sticky top-16 transition-all  bg-white bg-opacity-65 gap-3 flex items-center  p-4 shadow-md px-7'>
           Filtter
            <div>
                <Select>
                    <SelectTrigger className="w-[180px] outline-none ">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default Filtter