// @ts-nocheck

"use client"
import React, { useEffect, useState } from 'react'
import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import { CallRecording } from '@stream-io/node-sdk';
import { Call } from '@stream-io/video-react-sdk';
import Loader from './ui/Loader';
import { toast } from 'sonner';
import MeetingCard from './MeetingCard';


const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
    const { endedCalls, upcomingCalls, Callrecordings ,isLoading} = useGetCalls();
    const router = useRouter();
    const [recordings, setrecordings] = useState<CallRecording[]>([]);
    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls;
            case "upcoming":
                return upcomingCalls;
            case "recordings":
                return recordings;
            default:
                return [];
        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case "ended":
                return "No past calls found";
            case "upcoming":
                return "No upcoming calls found";
            case "recordings":
                return "No recordings found";
            default:
                return "No calls found";
        }
    }
    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

     useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        Callrecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setrecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, Callrecordings]);

    if (isLoading) return <Loader />
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {
                calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                    <MeetingCard
                        key={(meeting).id}
                        icon={
                            type === "ended" ? "/icons/previous.svg" : type === "upcoming" ? "/icons/upcoming.svg" : "/icons/recording.svg"
                        }
                        title={(meeting).state?.custom?.description?.substring(0, 20) || meeting?.fileName?.substring(0, 20) || "Personal "}
                        date={(meeting).state?.startsAt.toLocaleString() || (meeting).state.start_time.toLocaleString()}
                        isPreviousMeeting={type === "ended"}
                        buttonIcon1={type === "recording" ? "/icons/play.svg" : undefined}
                        buttonText={type === "recording" ? "Play Recording" : "Start"}
                        link={type === "recording" ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${(meeting).id}`}
                        handleClick={type === "recordings" ? () => {
                            router.push(`${meeting.url}`);
                        } : () => {
                            router.push(`/meetings/${(meeting).id}`);
                        }}
                    />

                ))
                    : (<h1>{noCallsMessage} </h1>)}
        </div>
    )
}

export default CallList
