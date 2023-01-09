import { css } from '@emotion/react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

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

export default function TestPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  // const img =
  //  'https://zenyoga.be/wp-content/uploads/2022/04/zen-yoga-paper-background-large.jpg';
  // const img =
  // 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A1337%2Fuploads%2Fphoto_moulin_2002_orig_6a5dd7bda0.png&w=1080&q=75';
  const img =
    'http://www.sandrinerauter.be/uploads/4/3/7/7/43775673/background-images/254942895.jpg';
  // const img =
  //  'https://images.unsplash.com/photo-1671379827325-2fa2dc475840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80';
  // const img =
  //  'https://images.unsplash.com/photo-1671379827325-2fa2dc475840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=1399&h=594';
  // const img =
  //  'https://images.unsplash.com/photo-1666457383842-a2e6a748dcac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80';
  return (
    <>
      <NextSeo />

      <div className="w-full">
        <div
          className="w-full relative"
          css={css`
            height: 55vh;
            &:before {
              ${imgBackgrounds.radial}
            }
          `}
        >
          <img
            css={css`
              position: sticky;
              top: 0;
            `}
            className="h-full w-full object-cover"
            src={img}
          />
          <div
            css={css`
              //font-family: 'Ubuntu Condensed';
              //font-family: 'Yanone Kaffeesatz', 'Comic Sans MS';
              font-family: var(--font-handwritten); // 'Inter', 'Comic Sans MS';
              font-weight: 700;
              //letter-spacing: 0.1rem;
            `}
            className="p-5 text-white z-10 absolute text-xl md:text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className={'font-normal'}>Bienvenue</h1>
            <p
              css={css`
                //font-family: 'Ubuntu Condensed';
                //font-family: 'Yanone Kaffeesatz', 'Comic Sans MS';
                font-family: var(--font-inter); // 'Inter', 'Comic Sans MS';
                //font-variation-settings: 'opsz' 48, 'wght' 700, 'wdth' 25,
                //  'slnt' -12, 'ital' 1;
                //font-weight: 700;
                text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
                // letter-spacing: 0.1rem;
              `}
            >
              Vous trouverez sur ce site toutes les informations concernant mes
              activités de Yoga et de Mindfulness - Pleine Conscience qui
              s'adressent autant aux particuliers qu'aux organisations.
            </p>
          </div>
        </div>
      </div>

      <div className="container text-2xl mx-auto p-6 prose lg:prose-xl">
        <p>News - Cours en ligne et Ateliers ponctuels chez Shanti Home</p>
        <blockquote>"Un nuage ne meurt jamais" Thich Nhat Hanh</blockquote>
        <p>
          A l'image du nuage qui devient pluie ou neige, la vie se forme, se
          déforme, se transforme.
        </p>
        <p>
          De la même manière, le lien tissé avec vous au travers des cours
          hebdomadaires va changer de forme. Installée récemment en France, tous
          mes cours réguliers ont désormais basculé en ligne via zoom: hatha
          yoga, méditation et yoga nidra.
        </p>
        <p>
          Vous retrouverez l'agenda des cours en ligne dans la page Cours chez
          Soi sous l'onglet Prochaines Activités. Les cours de yoga à Shanti
          Home seront quant à eux assurés les mardis soir par Tatiana
          Nozdrenkova et les vendredis matin par Giorgia Bruzzese del Pozzo.
          Aussi je continue à proposer des ateliers à Shanti Home les dimanches
          lors de mes retours à Bruxelles, les prochains le 4 Déc, l'un en
          matinée l'autre l'après-midi, et des retraites de 6 jours en nature en
          Dordogne et en Drôme.
        </p>
        <p>
          Ce dernier trimestre 2022 sera aussi l'occasion de s'initier au
          Dialogue Conscient au travers d'un atelier découverte et/ou d'une
          journée de pratique à Bruxelles. Au plaisir de continuer à nourrir
          ensemble notre pratique et vous accueillir en personne ou à l'écran.
          Sandrine
        </p>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  return {
    props: {},
  };
};
