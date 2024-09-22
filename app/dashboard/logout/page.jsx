'use client'
import React, { useState } from 'react'
import { useClerk } from '@clerk/nextjs'
import AlertDialogLogout from './_components/AlertDialogLogout'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Logout = () => {
  const { signOut } = useClerk()
  const [openAlert , setOpenAlert] = useState(false)
  return (
    <div>

      <Button onClick={()=>setOpenAlert(true)} > Logout </Button>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { signOut({ redirectUrl: '/' }); setOpenAlert(false) }}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Logout

