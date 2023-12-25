import { css } from '@emotion/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { AboutCard } from '@/components/About/AboutCard';
import { AboutCardBox } from '@/components/About/AboutCardBox';
import { MarkdownText } from '@/components/MarkdownText';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { MyActivitiesCard } from '@/components/Sections/MyActivitiesCard';
import { fetchHome } from '../api/home.api';
import { reactQueryConfig } from '@/config/react-query.config';

type Props = {
  // Add whatever extra you need
};

const HomeIntro: FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: async () => fetchHome(),
  });

  if (error) {
    return <ReactQueryErrorBox e={error} />;
  }

  if (isLoading) {
    return <ReactQueryLoader />;
  }
  return (
    <div className="border-3 prose mx-auto bg-white/90 text-gray-700 lg:prose-xl">
      {data && <MarkdownText text={data.introduction} />}
    </div>
  );
};

const HomePage: FC = () => {
  return (
    <div className="container mx-auto">
      <div className={'grid-row grid gap-5 md:grid-cols-12'} css={css``}>
        <AboutCardBox
          className={'flex px-5 font-family-brand md:col-span-8 md:px-0'}
        >
          <HomeIntro />
        </AboutCardBox>
        <AboutCardBox className={'mb-5 flex flex-col md:col-span-4 '}>
          <AboutCard className={'mx-auto bg-brand-color/60'} />
        </AboutCardBox>
      </div>
      <div>
        <MyActivitiesCard className={'mt-5 p-5'} />
      </div>
    </div>
  );
};

export default function HomeRoute(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <NextSeo />
      <HomePage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  _context
) => {
  const queryClient = new QueryClient(reactQueryConfig);

  await queryClient.prefetchQuery({
    queryKey: ['home'],
    queryFn: async () => fetchHome(),
    retry: false,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // Next.js will attempt to re-generate the page at most
      // revalidate: 3_600,
    },
  };
};
