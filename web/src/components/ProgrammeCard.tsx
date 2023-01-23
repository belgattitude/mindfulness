import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { Button } from '@/components/Button';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchProgramme } from '../api/programmes';
import { fullProgrammeFragment } from '../api/programmes';

export const ProgrammeCard: FC<{ programme: FetchProgramme }> = (props) => {
  const data = useFragment(fullProgrammeFragment, props.programme);
  const cover = getStrapiMedia(data.cover);
  return (
    <div className={'mb-5 border-2 p-5'}>
      {cover && <Image src={cover} width={800} height={600} alt={'Img'} />}
      <h1>{data.title}</h1>

      <MarkdownText text={data.description ?? ''} />

      <Link href={'/events'} legacyBehavior={true}>
        <Button>Consultez l'agenda</Button>
      </Link>
    </div>
  );
};
