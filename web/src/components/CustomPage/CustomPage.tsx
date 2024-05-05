import type { FC } from 'react';
import { fullPageFragment, type FetchPage } from '@/api/pages.api';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { ProgrammeListItem } from './ProgrammeListItem';
import { PageContent } from '@/components/PageContent';
import { getStrapiMedia } from '@/lib/strapi';
import { PageBackgroundImg } from '@/components/PageBackgroundImg';

export const CustomPage: FC<{ page: FetchPage }> = (props) => {
  const page = useFragment(fullPageFragment, props.page);
  if (!page) {
    return <p>NotFound</p>;
  }
  const cover = page.cover ? getStrapiMedia(page.cover) : null;
  return (
    <div>
      {cover !== null && <PageBackgroundImg url={cover} />}
      <PageContent title={'Mes activités'}>
        <h1 className={'hidden text-3xl'}>{page.title}</h1>

        <MarkdownText
          className={'prose-lg my-5 text-title-color-800'}
          text={page.introduction ?? ''}
        />
        <h1 className={'pt-5 text-3xl text-title-color-800'}>
          Programmes et cycles
        </h1>

        {page.programmes?.data.map((programme) => {
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
      </PageContent>
    </div>
  );
};
