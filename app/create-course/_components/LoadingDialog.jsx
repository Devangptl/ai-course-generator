import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'


const LoadingDialog = ({loading}) => {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                            <div className='flex flex-col items-center py-10'>
                                <Image src={"/progress.gif"} width={100} height={100} />
                                <h2>Please wait... Ai Working on your course</h2>
                            </div>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default LoadingDialog