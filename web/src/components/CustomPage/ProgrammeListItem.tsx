import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/Button/Button';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import {
  fullProgrammeFragment,
  type FetchProgramme,
} from '../../api/programmes';

type Props = {
  children?: never;
  programme: FetchProgramme;
  className?: string;
};

export const ProgrammeListItem: FC<Props> = (props) => {
  const { className = '' } = props;
  const data = useFragment(fullProgrammeFragment, props.programme);
  return (
    <div
      className={twMerge(
        clsx('border-5 prose-lg my-5 flex flex-col gap-5 py-5 md:flex-row'),
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
        <h1 className={'mb-5 text-2xl text-title-color-600'}>{data.title}</h1>

        <MarkdownText
          className=""
          text={data.summary ?? data.description ?? ''}
        />

        <div className={'flex w-full flex-row justify-start gap-2'}>
          <div>
            <Link href={`/programme/${data.slug}`} legacyBehavior={true}>
              <Button>Détail</Button>
            </Link>
          </div>
          <div>
            <Link href={'/agenda'} legacyBehavior={true}>
              <Button>Consultez l'agenda</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
