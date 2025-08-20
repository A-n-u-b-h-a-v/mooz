import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      
      setIsLoading(true);

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })
const upcomingCalls = calls
  ?.filter((call: Call) => {
    const startsAt = call.state?.startsAt;
    return startsAt && new Date(startsAt).getTime() > now.getTime();
  })
  .sort((a: Call, b: Call) => {
    const aTime = a.state?.startsAt ? new Date(a.state.startsAt).getTime() : Infinity;
    const bTime = b.state?.startsAt ? new Date(b.state.startsAt).getTime() : Infinity;
    return aTime - bTime;
  });

  
  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading }
  
};