import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { fetchPage } from '@/api/pages.api';
import { CustomPage } from '@/components/CustomPage/CustomPage';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { reactQueryConfig } from '@/config/react-query.config';

type Props = {
  /**
   * Page slug
   */
  slug: string;
};

export default function PageRoute(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { slug } = props;
  const { data, isLoading, error } = useQuery({
    queryKey: ['page', slug],
    queryFn: async () => fetchPage({ slug }),
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
        {data?.attributes && <CustomPage page={data.attributes} />}
      </div>
    </>
  );
}

const schema = z.object({
  pageSlug: z.string().min(3).max(255),
});

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const queryClient = new QueryClient(reactQueryConfig);

  const { pageSlug: slug } = schema.parse(context.params);

  await queryClient.prefetchQuery({
    queryKey: ['page', slug],
    queryFn: async () => fetchPage({ slug }),
    retry: false,
  });

  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
