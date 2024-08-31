import { fetchAboutPage } from '@/api/about.api';
import { MarkdownText } from '@/components/MarkdownText';
import { PageContent } from '@/components/PageContent';
import { ProseContent } from '@/components/ProseContent';

export const dynamic = 'force-dynamic';

export default async function About() {
  const data = await fetchAboutPage();
  return (
    <PageContent title={'A mon propos'}>
      <ProseContent>
        {data && (
          <MarkdownText
            className={'text-title-color-800'}
            text={data.about?.data?.attributes?.description ?? ''}
          />
        )}
      </ProseContent>
    </PageContent>
  );
}
