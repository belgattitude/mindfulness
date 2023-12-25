import { AboutCardBox } from '@/components/About/AboutCardBox';
import { AboutCard } from '@/components/About/AboutCard';
import { MyActivitiesCard } from '@/components/Sections/MyActivitiesCard';
import { fetchHome } from '@/api/home.api';
import { MarkdownText } from '@/components/MarkdownText';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function Home() {
  const homeData = await fetchHome();
  return (
    <div className="container mx-auto">
      <div className={'grid-row grid gap-5 md:grid-cols-12'}>
        <AboutCardBox
          className={'flex px-5 font-family-brand md:col-span-8 md:px-0'}
        >
          <div className="border-3 prose mx-auto bg-white/90 text-gray-700 lg:prose-xl">
            {homeData && <MarkdownText text={homeData.introduction} />}
          </div>
        </AboutCardBox>
        <AboutCardBox className={'mb-5 flex flex-col md:col-span-4 '}>
          <AboutCard className={'mx-auto bg-brand-color/60'} />
        </AboutCardBox>
      </div>
      <div>
        <MyActivitiesCard className={'mt-5 p-5'} />
      </div>
    </div>
  );
}
