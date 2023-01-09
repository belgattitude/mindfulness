import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { EventCard } from '@/components/EventCard';
import { fetchEvents } from '../../api/events.api';

type Props = {
  dateMin: string;
};

const limit = 10;
// const dateMin = dayjs().subtract(10, 'month').toDate();
const dateMin = dayjs().subtract(10, 'month').toDate();
const strDateMin = dateMin.toString();

export default function EventsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { dateMin } = props;
  const { data, error } = useQuery({
    queryKey: ['events', limit, dateMin],
    queryFn: async () => fetchEvents({ limit, dateMin }),
  });

  return (
    <>
      <NextSeo />

      <div className="container text-2xl mx-auto p-6 prose lg:prose-xl">
        {data && (
          <div>
            {data.events?.data?.map(
              (e, i) =>
                e?.attributes && (
                  <EventCard event={e.attributes} key={`event-${e.id}`} />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  _context
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['events', limit, strDateMin],
    queryFn: async () => fetchEvents({ limit, dateMin: strDateMin }),
  });
  return {
    props: {
      dateMin: strDateMin,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
