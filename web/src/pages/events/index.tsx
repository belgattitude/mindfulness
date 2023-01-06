import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { RetraiteCard } from '@/components/RetraiteCard';
import { eventsApi } from '@/features/events/events.api';

type Props = {
  // Add whatever extra you need
};

const url = process.env.NEXT_PUBLIC_STRAPI_API_URL + '/graphql';
const getEvents = async (params: { limit: number }) => {
  return request(url, eventsApi.allRetraites, params);
};

const limit = 10;

export default function TestPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data, error } = useQuery({
    queryKey: ['allEvents', limit],
    queryFn: async () => getEvents({ limit }),
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
    queryFn: async () => getEvents({ limit }),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
