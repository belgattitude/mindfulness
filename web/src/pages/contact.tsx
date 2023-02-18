import { css } from '@emotion/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { AboutCardBox } from '@/components/about/AboutCardBox';
import { MarkdownText } from '@/components/MarkdownText';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { fetchContactPage } from '../api/contact.api';
import { queryClientConfig } from '../config/query-client.config';

type Props = {
  // Add whatever extra you need
};

const ContactIntro: FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => fetchContactPage(),
  });

  if (error) {
    return <ReactQueryErrorBox e={error} />;
  }

  if (isLoading) {
    return <ReactQueryLoader />;
  }
  return (
    <div className="prose lg:prose-xl border-3 mx-auto bg-white/90 text-gray-700">
      {data && (
        <MarkdownText
          text={data.contact?.data?.attributes?.description ?? ''}
        />
      )}
    </div>
  );
};

const ContactPage: FC = () => {
  return (
    <div className="container mx-auto flex">
      <AboutCardBox className={'font-family-brand mb-5'}>
        <ContactIntro />
      </AboutCardBox>
    </div>
  );
};

export default function ContactRoute(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <NextSeo />

      <ContactPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  _context
) => {
  const queryClient = new QueryClient(queryClientConfig);

  await queryClient.prefetchQuery({
    queryKey: ['contact'],
    queryFn: async () => fetchContactPage(),
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
