import { AboutCardBox } from '@/components/About/AboutCardBox';
import { fetchAboutPage } from '@/api/about.api';
import { MarkdownText } from '@/components/MarkdownText';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function About() {
  const data = await fetchAboutPage();
  return (
    <div className="container mx-auto flex">
      <AboutCardBox className={'mb-5 font-family-brand'}>
        <div className="border-3 prose mx-auto bg-white/90 text-gray-700 lg:prose-xl">
          {data && (
            <MarkdownText
              text={data.about?.data?.attributes?.description ?? ''}
            />
          )}
        </div>
      </AboutCardBox>
    </div>
  );
}
