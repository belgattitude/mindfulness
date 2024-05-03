import { fetchAboutPage } from '@/api/about.api';
import { MarkdownText } from '@/components/MarkdownText';
import { PageContent } from '@/components/PageContent';
import { ProseContent } from '@/components/ProseContent';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function About() {
  const data = await fetchAboutPage();
  return (
    <PageContent>
      <ProseContent>
        {data && (
          <MarkdownText
            text={data.about?.data?.attributes?.description ?? ''}
          />
        )}
      </ProseContent>
    </PageContent>
  );
}
