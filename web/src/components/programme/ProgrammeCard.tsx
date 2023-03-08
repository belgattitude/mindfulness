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
        clsx('prose-lg border-5 my-5 flex flex-col gap-5 py-5 md:flex-row'),
        className
      )}
    >
      <div className={'flex-none md:w-[250px]'}>
        <Link href={`/p/i/${data.slug}`}>
          <Image
            alt={`Photo ${
              data.cover.data?.attributes?.alternativeText ??
              `programme ${data.title}`
            }`}
            width={500}
            height={500}
            priority={true}
            className="relative mt-2 h-[250px] object-cover md:rounded-full"
            style={{
              objectFit: 'cover',
            }}
            src={getStrapiMedia(data.cover) ?? ''}
          />
        </Link>
      </div>

      <div className={twMerge('', className)}>
        <h1 className={'text-title-color-600 mb-5 text-2xl'}>{data.title}</h1>

        <MarkdownText
          className=""
          text={(data.description ?? '').slice(0, 100)}
        />

        <div className={'flex w-full flex-row justify-start gap-2'}>
          <div>
            <Link href={`/p/i/${data.slug}`} legacyBehavior={true}>
              <Button>Détail</Button>
            </Link>
          </div>
          <div>
            <Link href={'/events'} legacyBehavior={true}>
              <Button>Consultez l'agenda</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
