import { zodReq } from '@nextvalid/zod-request';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { EventDetail } from '@/components/EventDetail';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { fetchEvent } from '../../api/events.api';

type Props = {
  slug: string;
};

export default function EventPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { slug } = props;
  const { data, error, isLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => fetchEvent({ slug }),
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
      {data?.attributes && <EventDetail event={data.attributes} />}
    </>
  );
}

const schema = z.object({
  slug: z.string().min(3).max(255),
});

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // @todo try/catch ... nextvalid
  const { slug } = schema.parse(context.params);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['event', slug],
    queryFn: async () => fetchEvent({ slug }),
  });
  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
      // @todo when invalidation lands we can set it up
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      // revalidate: 10
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
