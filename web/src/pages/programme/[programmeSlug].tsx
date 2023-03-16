import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { fetchProgramme } from '@/api/programmes';
import { ProgrammePage } from '@/components/Programme/ProgrammePage';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { queryClientConfig } from '@/config/query-client.config';

type Props = {
  slug: string;
};

export default function ProgrammeRoute(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { slug } = props;
  const { data, isLoading, error } = useQuery({
    queryKey: ['programme', slug],
    queryFn: async () => fetchProgramme({ slug }),
    // prefetched data is made available through the server, on the client it might already look
    // outdated... as we use revalidation with events for this age, it's possible to set stale time
    // to max
    // staleTime: Number.MAX_SAFE_INTEGER,
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
      <div className={'container mx-auto flex flex-col'}>
        {data?.attributes && <ProgrammePage programme={data.attributes} />}
      </div>
    </>
  );
}

const schema = z.object({
  programmeSlug: z.string().min(3).max(255),
});

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const queryClient = new QueryClient(queryClientConfig);

  const { programmeSlug: slug } = schema.parse(context.params);

  await queryClient.prefetchQuery({
    queryKey: ['programme', slug],
    queryFn: async () => fetchProgramme({ slug }),
    retry: false,
  });

  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
    },
  };
};