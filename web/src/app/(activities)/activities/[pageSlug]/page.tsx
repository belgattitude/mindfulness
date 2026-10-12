import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPageParams } from "@/api/pages.rest";
import { CustomPage } from "@/components/CustomPage/CustomPage";
import { reactQueryConfig } from "@/config/react-query.config";
import { getPageMetadata } from "@/lib/metadata/page-metadata";
import { getPageIntroductionText } from "@/lib/text/text.utils";
import { getGetPagesQueryOptions, getPages } from "@/openapi/page/page";

interface Props {
  params: Promise<{
    pageSlug: string;
  }>;
}

export const dynamic = "force-dynamic";

/** Title and introduction for the link previews, the image is opengraph-image.tsx */
export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { pageSlug } = await props.params;
  const response = await getPages(getPageParams({ slug: pageSlug }));
  const page = response.data?.[0];
  if (!page) {
    return { title: "Activité introuvable" };
  }
  return getPageMetadata({
    title: page.title,
    description: getPageIntroductionText(page.introduction),
    path: `/activities/${pageSlug}`,
    hasOwnImage: true,
  });
};

const ActivityRoute = async (props: Props) => {
  const { pageSlug } = await props.params;

  // Fetched on the server (to answer a 404 for an unknown slug), the client
  // component reads it from the cache
  const pageParams = getPageParams({ slug: pageSlug });
  const queryClient = new QueryClient(reactQueryConfig);
  const data = await queryClient.fetchQuery(
    getGetPagesQueryOptions(pageParams)
  );
  if (!data.data?.length) {
    notFound();
  }

  return (
    <div className="mt-5 flex flex-1 lg:mt-1 xl:mt-0">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CustomPage params={pageParams} now={dayjs().toISOString()} />
      </HydrationBoundary>
    </div>
  );
};

export default ActivityRoute;
