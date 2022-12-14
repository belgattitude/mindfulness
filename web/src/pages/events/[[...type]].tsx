import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type {
  InferGetServerSidePropsType,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { EventCard } from '@/components/EventCard';
import { fetchEvents } from '../../api/events.api';

type Props = {
  dateMin: string;
};

const limit = 10;
// const dateMin = dayjs().subtract(10, 'month').toDate();

export default function EventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { dateMin } = props;
  const { data, error } = useQuery({
    queryKey: ['events', limit, dateMin],
    queryFn: async () => fetchEvents({ limit, dateMin }),
  });

  return (
    <>
      <NextSeo />

      <div className="prose lg:prose-xl container mx-auto p-6 text-2xl">
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

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const dateMin = dayjs().subtract(10, 'month').toDate();
  const strDateMin = dateMin.toString();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['events', limit, strDateMin],
    queryFn: async () => fetchEvents({ limit, dateMin: strDateMin }),
  });
  return {
    props: {
      dateMin: strDateMin,
      dehydratedState: dehydrate(queryClient),
      // Next.js will attempt to re-generate the page at most
      revalidate: 3_600,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
