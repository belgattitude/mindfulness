import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { fullProgrammeFragment, type FetchProgramme } from '@/api/programmes';
import { Button } from '@/components/Button';
import { MarkdownText } from '@/components/MarkdownText';
import { useFragment } from '@/gql/fragment-masking';
import { getStrapiMedia } from '@/lib/strapi';
import { ProseContent } from '../ProseContent';
import { PageContent } from '@/components/PageContent';

type Props = {
  programme: FetchProgramme;
  className?: string;
};

export const ProgrammePage: FC<Props> = (props) => {
  const { className = '', programme } = props;
  const data = useFragment(fullProgrammeFragment, programme);

  if (!data) {
    return <p>NotFound</p>;
  }

  // const cover = page.cover ? getStrapiMedia(page.cover) : '';
  return (
    <PageContent title={'Programme'}>
      <ProseContent>
        <h1 className={'mb-5 text-2xl'}>{data.title}</h1>
        <div className={'w-full flex-none'}>
          <Image
            alt={`Photo ${
              data.cover.data?.attributes?.alternativeText ??
              `programme ${data.title}`
            }`}
            width={1200}
            height={400}
            priority={true}
            className="relative mt-2 h-[200px] object-cover"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={getStrapiMedia(data.cover) ?? ''}
          />
        </div>

        <div>
          <MarkdownText
            className=""
            text={data.description ?? data.summary ?? ''}
          />
        </div>
      </ProseContent>
      <div>
        <div className={'flex w-full flex-row justify-start gap-2'}>
          <div>
            <Link href={'/agenda'}>
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */}
              <Button>Consultez l'agenda</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContent>
  );
};
