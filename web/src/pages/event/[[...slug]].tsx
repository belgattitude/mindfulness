import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { RetraiteCard } from '@/components/RetraiteCard';
import { eventsApi, fetchEvents } from '@/features/events/events.api';

type Props = {
  // Add whatever extra you need
};

const limit = 10;

export default function EventPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data, error } = useQuery({
    queryKey: ['allEvents', limit],
    queryFn: async () => fetchEvents({ limit }),
  });

  return (
    <>
      <NextSeo />

      <div className="container text-2xl mx-auto p-6 prose lg:prose-xl">
        {data && (
          <div>
            {data.retraites?.data?.map(
              (e, i) =>
                // e?.id && <RetraiteCard retraite={e} key={`retraite-${e.id}`} />
                e?.attributes && (
                  <RetraiteCard
                    retraite={e.attributes}
                    key={`retraite-${e.id}`}
                  />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['allEvents', limit],
    queryFn: async () => fetchEvents({ limit }),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
