import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <main className='flex items-center justify-center h-screen w-full '>
      <SignIn />
    </main>
  )
}

export default page
