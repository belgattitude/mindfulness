import { css } from '@emotion/react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import type { FC } from 'react';
import { AboutCard } from '@/components/about/AboutCard';
import { AboutCardBox } from '@/components/about/AboutCardBox';
import { ArrayUtils } from '@/lib/array';

type Props = {
  // Add whatever extra you need
};

const imgBackgrounds = {
  radial: css`
    background: radial-gradient(
      ellipse 100% 100% at right center,
      transparent 30%,
      #000
    );
    content: '""';
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  `,
  none: css``,
  linear: css`
    background: linear-gradient(
      180deg,
      #00000061 0,
      #00000061 3.5%,
      rgba(0, 0, 0, 0.379) 7%,
      rgba(0, 0, 0, 0.377) 10.35%,
      rgba(0, 0, 0, 0.375) 13.85%,
      rgba(0, 0, 0, 0.372) 17.35%,
      rgba(0, 0, 0, 0.369) 20.85%,
      rgba(0, 0, 0, 0.366) 24.35%,
      rgba(0, 0, 0, 0.364) 27.85%,
      rgba(0, 0, 0, 0.361) 31.35%,
      rgba(0, 0, 0, 0.358) 34.85%,
      rgba(0, 0, 0, 0.355) 38.35%,
      rgba(0, 0, 0, 0.353) 41.85%,
      rgba(0, 0, 0, 0.351) 45.35%,
      #00000059 48.85%,
      rgba(0, 0, 0, 0.353) 52.35%,
      #0000005c 55.85%,
      rgba(0, 0, 0, 0.371) 59.35%,
      rgba(0, 0, 0, 0.385) 62.85%,
      rgba(0, 0, 0, 0.402) 66.35%,
      #0000006b 69.85%,
      #00000070 73.35%,
      #00000075 76.85%,
      #0000007a 80.35%,
      rgba(0, 0, 0, 0.498) 83.85%,
      rgba(0, 0, 0, 0.515) 87.35%,
      rgba(0, 0, 0, 0.529) 90.85%,
      #0000008a 94.35%,
      rgba(0, 0, 0, 0.547) 97.85%,
      #0000008c
    );
    content: '""';
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  `,
} as const;

const IntroText: FC = () => {
  return (
    <div className="prose lg:prose-xl container mx-auto p-6 text-2xl">
      <p>News - Cours en ligne et Ateliers ponctuels chez Shanti Home</p>
      <blockquote>"Un nuage ne meurt jamais" Thich Nhat Hanh</blockquote>
      <p>
        A l'image du nuage qui devient pluie ou neige, la vie se forme, se
        déforme, se transforme.
      </p>
      <p>
        De la même manière, le lien tissé avec vous au travers des cours
        hebdomadaires va changer de forme. Installée récemment en France, tous
        mes cours réguliers ont désormais basculé en ligne via zoom: hatha yoga,
        méditation et yoga nidra.
      </p>
      <p>
        Vous retrouverez l'agenda des cours en ligne dans la page Cours chez Soi
        sous l'onglet Prochaines Activités. Les cours de yoga à Shanti Home
        seront quant à eux assurés les mardis soir par Tatiana Nozdrenkova et
        les vendredis matin par Giorgia Bruzzese del Pozzo. Aussi je continue à
        proposer des ateliers à Shanti Home les dimanches lors de mes retours à
        Bruxelles, les prochains le 4 Déc, l'un en matinée l'autre l'après-midi,
        et des retraites de 6 jours en nature en Dordogne et en Drôme.
      </p>
      <p>
        Ce dernier trimestre 2022 sera aussi l'occasion de s'initier au Dialogue
        Conscient au travers d'un atelier découverte et/ou d'une journée de
        pratique à Bruxelles. Au plaisir de continuer à nourrir ensemble notre
        pratique et vous accueillir en personne ou à l'écran. Sandrine
      </p>
    </div>
  );
};

const testImages = [
  'https://images.unsplash.com/photo-1416230789844-1998de481fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
  'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1552838671-4c793a745d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1515339760107-1952b7a08454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  'https://images.unsplash.com/photo-1566041510632-30055e21a9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1615716175507-64c47c317d58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1600172454132-ada7faa101cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
];

export default function TestPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <NextSeo />

      <div className={'fixed top-0 left-0 -z-50'}>
        <Image
          alt={'Page background image'}
          src={ArrayUtils.getRandom(testImages)}
          // src={'/images/sunrise.webp'}
          className={'opacity-70'}
          width={2000}
          height={800}
          quality={85}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="mx-15 container mx-auto pt-[20px]">
        <div className={'grid-row grid gap-5 md:grid-cols-3'}>
          <AboutCardBox className={'mb-5 flex bg-[#c9ded2] md:col-span-2'}>
            <IntroText />
          </AboutCardBox>
          <AboutCardBox className={'mb-5 flex md:col-span-1'}>
            <AboutCard className={'mx-auto border bg-[#85aa9c]/10'} />
          </AboutCardBox>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  return {
    props: {},
  };
};
