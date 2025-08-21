"use client"
import DatenTime from '@/components/DatenTime'
import MeetingTypeList from '@/components/MeetingTypeList'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call } from '@stream-io/video-react-sdk'

const Home = () => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "No start time";
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const { upcomingCalls } = useGetCalls()
  const nextCall = upcomingCalls && upcomingCalls.length > 0 ? upcomingCalls[0] : null

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">

          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base '>
            {nextCall ? (
              <span className='w-full whitespace-nowrap '>
                {`Next call at: ${formatDate((nextCall as Call)?.state.startsAt) ?? "No start time"}`}
              </span>
            ) : (
              <span>No upcoming calls</span>
            )}
          </h2>

          <div className="flex flex-col gap-2">
            <DatenTime />
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
