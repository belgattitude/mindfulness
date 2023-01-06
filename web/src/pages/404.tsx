import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
  };
};

export default function Custom404(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Head>
        <title>Page non trouvée</title>
      </Head>
      <div className="flex flex-col items-center justify-center bg-white">
        <h1
          data-testid="not-found-title"
          className="text-5xl text-black md:text-4xl lg:text-5xl"
        >
          Page non trouvée
        </h1>
        <p className="mt-5 text-center text-xl no-underline hover:underline">
          <Link href={'/'}>Retournez à la page d'accueil.</Link>
        </p>
      </div>
    </>
  );
}
