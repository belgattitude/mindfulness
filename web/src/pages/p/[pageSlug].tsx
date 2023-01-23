import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { CustomPage } from '@/components/CustomPage';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { fetchPage } from '../../api/pages.api';
import { queryClientConfig } from '../../config/query-client.config';

type Props = {
  /**
   * Page slug
   */
  slug: string;
};

export default function EventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { slug } = props;
  const { data, isLoading, error } = useQuery({
    queryKey: ['page', slug],
    queryFn: async () => fetchPage({ slug }),
    staleTime: 30_000, // prefetched data might have just been produced. No need to refetch on first page load
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
        <div>{data?.attributes && <CustomPage page={data.attributes} />}</div>
      </div>
    </>
  );
}

const schema = z.object({
  pageSlug: z.string().min(3).max(255),
});

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const queryClient = new QueryClient(queryClientConfig);

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
      // Next.js will attempt to re-generate the page at most
      // revalidate: 3_600,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
