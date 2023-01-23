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
    <div>
      {cover && <Image src={cover} width={800} height={600} alt={'Img'} />}
      <h1>{page.title}</h1>

      <MarkdownText text={page.introduction ?? ''} />

      <h1>Programmes et cycles</h1>

      {page.programmes &&
        page.programmes.data.map((program) => {
          return (
            program.attributes && (
              <ProgrammeCard programme={program.attributes} />
            )
          );
        })}
    </div>
  );
};
