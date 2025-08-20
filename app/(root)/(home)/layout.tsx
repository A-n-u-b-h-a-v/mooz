import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MooZ",
  description: "Video Conferencing App",
  icons:{
    icon:"/icons/logo.svg",
  }
};
const HomeLayout = ({children}:{children: ReactNode}) => {
  return (
    <main className='relative'>
        <Navbar/>
        <div className='flex'>
            <Sidebar/>
            <section className='flex min-h h-screen flex-1 flex-col px-6 pt-28 max-md-pb-14 sm:px-14'>
                <div>
                    <div className='w-full'>
                        {children}
                    </div>
                </div>
            </section>
            

        </div>
    </main >
  )
}

export default HomeLayout
