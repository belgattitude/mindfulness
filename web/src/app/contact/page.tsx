import { fetchContactPage } from '@/api/contact.api';
import { MarkdownText } from '@/components/MarkdownText';
import { ProseContent } from '@/components/ProseContent';

import { PageContent } from '@/components/PageContent';
export const dynamic = 'force-dynamic';

export default async function About() {
  const data = await fetchContactPage();
  return (
    <PageContent title={'Contact'}>
      <ProseContent>
        {data && (
          <MarkdownText
            text={data.contact?.data?.attributes?.description ?? ''}
          />
        )}
      </ProseContent>
    </PageContent>
  );
}
