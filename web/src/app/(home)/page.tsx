import { AboutCardBox } from '@/components/About/AboutCardBox';
import { AboutCard } from '@/components/About/AboutCard';
import { MyActivitiesCard } from '@/components/Sections/MyActivitiesCard';
import { fetchHome } from '@/api/home.api';
import { MarkdownText } from '@/components/MarkdownText';
import { ProseContent } from '@/components/ProseContent';
import { PageContent } from '@/components/PageContent';

export const dynamic = 'force-dynamic';

export default async function HomeRoute() {
  const homeData = await fetchHome();
  return (
    <PageContent>
      <div className={'grid-row grid gap-5 md:grid-cols-12'}>
        <ProseContent className={'md:col-span-8 md:px-0'}>
          <div className="">
            {homeData && <MarkdownText text={homeData.introduction} />}
          </div>
        </ProseContent>
        <AboutCardBox className={'mb-5 flex flex-col md:col-span-4'}>
          <AboutCard className={'bg-brand-color/60'} />
        </AboutCardBox>
      </div>
      <div>
        <MyActivitiesCard className={'mt-5 p-5'} />
      </div>
    </PageContent>
  );
}
