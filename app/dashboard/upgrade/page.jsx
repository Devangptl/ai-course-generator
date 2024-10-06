"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { IoMdCheckmark } from "react-icons/io";

const Upgrade = () => {

  const MonthData = [
    {
      id: 1,
      title: "Access to All Courses",
      icon: <IoMdCheckmark />,
      days:true,
      monthly:true 
    },
    {
      id: 2,
      title: "Free Source Code",
      icon: <IoMdCheckmark />,
      days:true,
      monthly:true
    },
    {
      id: 3,
      title: "Free App Membership",
      icon: <IoMdCheckmark />,
      days:false,
      monthly:true
    },
    {
      id: 4,
      title: "Email & Instagram DM support",
      icon: <IoMdCheckmark />,
      days:false,
      monthly:false
    },
  ]

  return (
    <div className='flex items-center justify-center '>
      <Tabs defaultValue="monthly" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="days">Days</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="days">
          <Card className="px-5">
            <CardHeader>
              <CardTitle className="text-3xl text-center">₹130<span className='text-sm font-medium'>/15 days</span> </CardTitle>
              <CardContent>
                <div className='mt-4'>
                  {MonthData.map((item, index) => (
                    <div key={index} className={`flex items-center gap-2 py-1 text-black ${!item?.days? 'line-through text-gray-400' : ""}`}>
                      <p className={`text-primary ${!item?.days? ' invisible' : ""} `}> {item?.icon} </p> 
                     <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter>
              <Button className="w-full rounded-full" >Get Started</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card className="px-5">
            <CardHeader>
              <CardTitle className="text-3xl text-center">₹230<span className='text-sm font-medium'>/month</span> </CardTitle>
              <CardContent>
                <div className='mt-4'>
                  {MonthData.map((item, index) => (
                    <div key={index} className={`flex items-center gap-2 py-1 text-black ${!item?.monthly? 'line-through text-gray-400' : ""}`}>
                      <p className={`text-primary ${!item?.monthly? ' invisible' : ""} `}> {item?.icon} </p> 
                     <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter>
              <Button className="w-full rounded-full" >Get Started</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="yearly">
          <Card className="px-5">
            <CardHeader>
              <CardTitle className="text-3xl text-center">₹2400<span className='text-sm font-medium'>/Year</span> </CardTitle>
              <CardContent>
                <div className='mt-4'>
                  {MonthData.map((item, index) => (
                    <div key={index} className='flex items-center gap-2 py-1 text-black'>
                      <span className='text-primary'> {item?.icon} </span>
                      {item.title}
                    </div>
                  ))}
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter>
              <Button className="w-full rounded-full" >Get Started</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Upgrade
