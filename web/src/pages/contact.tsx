import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { AboutCardBox } from '@/components/About/AboutCardBox';
import { MarkdownText } from '@/components/MarkdownText';
import { ReactQueryErrorBox } from '@/components/ReactQueryErrorBox';
import { ReactQueryLoader } from '@/components/ReactQueryLoader';
import { fetchContactPage } from '../api/contact.api';
import { reactQueryConfig } from '@/config/react-query.config';

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
    <div className="border-3 prose mx-auto bg-white/90 text-gray-700 lg:prose-xl">
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
      <AboutCardBox className={'mb-5 font-family-brand'}>
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
  const queryClient = new QueryClient(reactQueryConfig);

  await queryClient.prefetchQuery({
    queryKey: ['contact'],
    queryFn: async () => fetchContactPage(),
    retry: false,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // Next.js will attempt to re-generate the page at most
      revalidate: 3600,
    },
  };
};
