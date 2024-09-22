import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="text-black bg-gray-50">
            <div className="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:items-center">
                <div className="max-w-3xl mx-auto text-center">
                    <h1
                        className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-5xl"
                    >
                        AI Course Generator

                        <span className="text-3xl text-black sm:block"> Coustom Learning Phats, Powered by AI </span>
                    </h1>

                    <p className="max-w-xl mx-auto mt-4 sm:text-md/relaxed">
                        Unlock personalized education with AI-driven course creation. Tailor your learning journey to fit unique goals and pace
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Link href={"/dashboard"} >
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero