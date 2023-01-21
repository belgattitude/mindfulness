import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { EventCard } from '@/components/EventCard';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { useFragment } from '@/gql/fragment-masking';
import { PublicationState } from '@/gql/graphql';
import { fetchEvents } from '../../api/events.api';
import type { FetchProgramme } from '../../api/programmes';
import { fetchProgrammes, fullProgrammeFragment } from '../../api/programmes';
import { queryClientConfig } from '../../config/query-client.config';

type Props = {
  // add
};

const limit = 20;
// const dateMin = dayjs().subtract(10, 'month').toDate();

const ProgrammeCard: FC<{ programme: FetchProgramme }> = (props) => {
  const data = useFragment(fullProgrammeFragment, props.programme);
  return <div>{data.title}</div>;
};

export default function EventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['programmes', limit],
    queryFn: async () =>
      fetchProgrammes({
        limit,
        // publicationState: PublicationState.Live,
      }),
    useErrorBoundary: false,
  });

  if (error) {
    return <ReactQueryErrorBox e={error} />;
  }

  if (isLoading) {
    return <ReactQueryLoader />;
  }

  return (
    <>
      <NextSeo />

      <div className={'prose container mx-auto flex flex-col'}>
        <div className="">
          MINDFULNESS OU PLEINE CONSCIENCE Mindfulness ou Pleine Conscience fut
          initiée dans le domaine de la santé par Jon Kabat-Zinn pour la
          réduction du stress (Mindfulness Based Stress Reduction, MBSR) et
          signifie « diriger son attention d’une certaine manière, c’est-à-dire
          délibérément, au moment présent, sans jugement de valeur » sur
          l'expérience vécue. ("Où tu vas, tu es", Jon Kabat-Zinn).
        </div>

        <div>
          {data && (
            <div>
              {data.programmes?.data?.map(
                (p, i) =>
                  p?.attributes && (
                    <ProgrammeCard key={p.id} programme={p.attributes} />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const queryClient = new QueryClient(queryClientConfig);

  await queryClient.prefetchQuery({
    queryKey: ['programmes', limit],
    queryFn: async () => fetchProgrammes({ limit }),
    retry: false,
  });

  return {
    props: {
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
