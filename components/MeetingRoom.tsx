import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './ui/Loader';
import { useRouter } from 'next/navigation';

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setshowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    <Loader />
  }
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />
      default:
        return <SpeakerLayout participantsBarPosition="left" />
    }
  }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'><CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)]  ml-2', { "show-block": showParticipants })}>
          <CallParticipantsList onClose={() => {
            setshowParticipants(false);
          }} />
        </div>
      </div>
      <div className='fixed bottom-0 flex justify-center items-center w-full left-0 right-0 gap-5 ps-8 flex-wrap'>
        <CallControls onLeave={()=>{
          router.push('/');
        }} />
        <DropdownMenu>

          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-dark-3 px-4 py-2 hover:bg-[#4c535b]'> <LayoutList size={20} className='text-white' /></DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, idx) => (
              <div key={idx}>
                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                  setlayout(item.toLowerCase().replace("-", " ") as CallLayoutType);
                }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>

            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => {
          setshowParticipants((prev) => !prev)
        }}>
          <div className='cursor-pointer rounded-2xl bg-dark-3 px-4 py-2 hover:bg-[#4c535b]'>
            <User size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom
