import { zodReq } from '@nextvalid/zod-request';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { NextSeo } from 'next-seo';
import { z } from 'zod';
import { EventCard } from '@/components/EventCard';
import { EventDetail } from '@/components/EventDetail';
import { fetchEvent } from '../../api/events.api';

type Props = {
  slug: string;
};

export default function EventPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { slug } = props;
  const { data, error } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => fetchEvent({ slug }),
  });

  return (
    <>
      <NextSeo />

      <div className="container text-2xl mx-auto p-6 prose lg:prose-xl">
        {data && (
          <div>
            {data.attributes && <EventDetail event={data.attributes} />}
          </div>
        )}
      </div>
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
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
