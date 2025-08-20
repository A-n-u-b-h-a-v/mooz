import { StreamVideoProvider } from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "MooZ",
  description: "Video Conferencing App",
  icons:{
    icon:"/icons/logo.svg",
  }
};


const MeetingLayout = ({children} : {children: ReactNode}) => {
  return (
    <StreamVideoProvider>
      {children}
    </StreamVideoProvider>
  )
}

export default MeetingLayout
