import { css } from '@emotion/react';
import type { FC } from 'react';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import type { FetchPage } from '../../api/pages.api';
import { fullPageFragment } from '../../api/pages.api';
import { ProgrammeListItem } from './ProgrammeListItem';

export const ProgrammesPage: FC<{ page: FetchPage }> = (props) => {
  const page = useFragment(fullPageFragment, props.page);
  if (!page) {
    return <p>NotFound</p>;
  }
  // const cover = page.cover ? getStrapiMedia(page.cover) : '';
  return (
    <div className={'font-family-brand mx-auto mt-5  bg-white'}>
      <h1
        className={'hidden text-xl'}
        css={css`
          background: linear-gradient(
            90deg,
            #a9dac3 0%,
            #a9dac3 70%,
            rgba(113, 223, 208, 1) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
      >
        {page.title}
      </h1>

      <MarkdownText
        className={'prose-lg text-title-color-800 my-5'}
        text={page.introduction ?? ''}
      />
      <h1 className={'text-title-color-800 hidden pt-5 text-3xl'}>
        Programmes et cycles
      </h1>

      {page.programmes &&
        page.programmes.data.map((programme) => {
          return (
            programme.attributes && (
              <ProgrammeListItem
                className={'rounded-xl bg-white'}
                key={programme.id}
                programme={programme.attributes}
              />
            )
          );
        })}
    </div>
  );
};
