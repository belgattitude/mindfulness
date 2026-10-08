import { fetchPage } from "@/api/pages.api";
import { CustomPage } from "@/components/CustomPage/CustomPage";

interface Props {
  params: Promise<{
    pageSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

const ActivityRoute = async (props: Props) => {
  const { pageSlug } = await props.params;
  const data = await fetchPage({
    slug: pageSlug,
  });

  return (
    <div className="mt-5 flex flex-1 lg:mt-1 xl:mt-0">
      {data && <CustomPage page={data} />}
    </div>
  );
};

export default ActivityRoute;
