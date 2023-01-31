import { css } from '@emotion/react';
import { clsx } from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchPage } from '../api/pages.api';
import { fullPageFragment } from '../api/pages.api';
import { ProgrammeCard } from './ProgrammeCard';

export const CustomPage: FC<{ page: FetchPage }> = (props) => {
  const page = useFragment(fullPageFragment, props.page);
  if (!page) {
    return <p>NotFound</p>;
  }
  const cover = page.cover ? getStrapiMedia(page.cover) : '';
  return (
    <div className={'prose mx-auto max-w-[1000px] bg-white p-[45px]'}>
      {cover && (
        <Image
          className={clsx({
            ['fixed top-[40px] left-0 h-full -z-50 w-full object-cover']: [
              'mindfulness',
            ].includes(page.slug),
          })}
          src={cover}
          width={1200}
          height={900}
          priority={true}
          alt={'Img'}
        />
      )}
      <h1
        className={''}
        css={css`
          background: linear-gradient(
            90deg,
            rgba(33, 169, 192, 1) 0%,
            rgba(113, 223, 208, 1) 70%,
            rgba(113, 223, 208, 1) 100%
          );
          //background-image: url('/videos/grass-anim.webp');
          //background-size: cover;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
      >
        {page.title}
      </h1>

      <MarkdownText text={page.introduction ?? ''} />

      <h1>Programmes et cycles</h1>

      {page.programmes &&
        page.programmes.data.map((programme) => {
          return (
            programme.attributes && (
              <ProgrammeCard
                className={'bg-white'}
                key={programme.id}
                programme={programme.attributes}
              />
            )
          );
        })}
    </div>
  );
};
