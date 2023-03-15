import { css } from '@emotion/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { AboutCard } from '@/components/About/AboutCard';
import { AboutCardBox } from '@/components/About/AboutCardBox';
import { MarkdownText } from '@/components/MarkdownText';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { MyActivitiesCard } from '@/components/Sections/MyActivitiesCard';
import { fetchAboutPage } from '../api/about.api';
import { fetchContactPage } from '../api/contact.api';
import { fetchHome } from '../api/home.api';
import { queryClientConfig } from '../config/query-client.config';

type Props = {
  // Add whatever extra you need
};

const AboutIntro: FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: async () => fetchAboutPage(),
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
        <MarkdownText text={data.about?.data?.attributes?.description ?? ''} />
      )}
    </div>
  );
};

const AboutPage: FC = () => {
  return (
    <div className="container mx-auto flex">
      <AboutCardBox className={'font-family-brand mb-5'}>
        <AboutIntro />
      </AboutCardBox>
    </div>
  );
};

export default function AboutRoute(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <NextSeo />

      <AboutPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  _context
) => {
  const queryClient = new QueryClient(queryClientConfig);

  await queryClient.prefetchQuery({
    queryKey: ['about'],
    queryFn: async () => fetchAboutPage(),
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
