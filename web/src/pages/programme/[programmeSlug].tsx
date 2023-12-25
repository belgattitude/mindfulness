import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { fetchProgramme } from '@/api/programmes';
import { ProgrammePage } from '@/components/Programme/ProgrammePage';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { reactQueryConfig } from '@/config/react-query.config';

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
  const queryClient = new QueryClient(reactQueryConfig);

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
