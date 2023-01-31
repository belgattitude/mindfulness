import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/Button';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchProgramme } from '../api/programmes';
import { fullProgrammeFragment } from '../api/programmes';

type Props = {
  children?: never;
  programme: FetchProgramme;
  className?: string;
};

export const ProgrammeCard: FC<Props> = (props) => {
  const { className = '' } = props;
  const data = useFragment(fullProgrammeFragment, props.programme);
  const cover = getStrapiMedia(data.cover);
  return (
    <div className={twMerge('mb-5 border-2 p-5', className)}>
      {cover && (
        <Image
          className={'max-h-[800px] w-full object-cover'}
          src={cover}
          width={800}
          height={600}
          style={{
            objectFit: 'cover',
          }}
          alt={'Img'}
        />
      )}
      <h1>{data.title}</h1>

      <MarkdownText text={data.description ?? ''} />

      <Link href={`/p/i/${data.slug}`} legacyBehavior={true}>
        <Button>Détail</Button>
      </Link>

      <Link href={'/events'} legacyBehavior={true}>
        <Button>Consultez l'agenda</Button>
      </Link>
    </div>
  );
};
