import { fetchPage } from '@/api/pages.api';
import { CustomPage } from '@/components/CustomPage/CustomPage';

type Props = {
  params: {
    pageSlug: string;
  };
};

export const dynamic = 'force-dynamic';

export default async function ActivityRoute(props: Props) {
  const { pageSlug } = props.params;
  const data = await fetchPage({
    slug: pageSlug,
  });
  return (
    <div className={'container mx-auto flex flex-col'}>
      {data?.attributes && <CustomPage page={data.attributes} />}
    </div>
  );
}