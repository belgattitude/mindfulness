import { fetchPage } from '@/api/pages.api';
import { CustomPage } from '@/components/CustomPage/CustomPage';

type Props = {
  params: Promise<{
    pageSlug: string;
  }>;
};

export const dynamic = 'force-dynamic';

export default async function ActivityRoute(props: Props) {
  const { pageSlug } = await props.params;
  const data = await fetchPage({
    slug: pageSlug,
  });

  return (
    <div className={'mt-5 flex flex-1 lg:mt-1 xl:mt-0'}>
      {data?.attributes && <CustomPage page={data.attributes} />}
    </div>
  );
}
