import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/Button';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import type { FetchProgramme } from '../../api/programmes';
import { fullProgrammeFragment } from '../../api/programmes';

type Props = {
  children?: never;
  programme: FetchProgramme;
  className?: string;
};

export const ProgrammeCard: FC<Props> = (props) => {
  const { className = '' } = props;
  const data = useFragment(fullProgrammeFragment, props.programme);
  return (
    <div
      className={twMerge(
        clsx('flex flex-col gap-5 pt-5 md:flex-row'),
        className
      )}
    >
      <div className={'flex-none md:w-[300px]'}>
        <Link href={`/p/i/${data.slug}`}>
          <Image
            alt={`Photo ${
              data.cover.data?.attributes?.alternativeText ??
              `programme ${data.title}`
            }`}
            width={1000}
            height={800}
            priority={true}
            className="relative h-[200px] rounded object-cover"
            style={{
              objectFit: 'cover',
            }}
            src={getStrapiMedia(data.cover) ?? ''}
          />
        </Link>
      </div>

      <div className={twMerge('mb-5 border-2 p-5', className)}>
        <h1>{data.title}</h1>

        <MarkdownText text={data.description ?? ''} />

        <Link href={`/p/i/${data.slug}`} legacyBehavior={true}>
          <Button>Détail</Button>
        </Link>

        <Link href={'/events'} legacyBehavior={true}>
          <Button>Consultez l'agenda</Button>
        </Link>
      </div>
    </div>
  );
};
